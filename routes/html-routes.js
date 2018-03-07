var db = require("../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        db.Question.findAll({}).then(result => {
            var hbsObject = {
                questions: result,
                user: req.user
            };
            res.render("index", hbsObject);
        });
    });

    app.get("/questions/:id", function (req, res) {
        db.Question.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Answer],
            order: [[db.Answer, 'upvotes', 'desc']]
        }).then(result => {
            result.Answers.forEach( (element, index, array) =>{
                db.Upvote.count({
                    where: {AnswerId: element.id}
                }).then( count => {
                  array[index].upvoteCount = count;
                });
            });
            console.log(result.Answers[0]);
            var hbsObject = {
                question: {
                    title: result.title,
                    text: result.text,
                    id: result.id
                },
                answers: result.Answers,
                user: req.user
            };
            res.render("singleQuestion", hbsObject);
        });
    });
}
