var db = require("../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        db.Question.findAll({
            include: [
                {model: db.User, attributes: ["username", "id"]}
            ]
        }).then(result => {
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
            include: [
                {model: db.User, attributes: ["username", "id"]},
                db.Answer
            ],
            order: [[db.Answer, 'upvotes', 'desc']]
        }).then(result => {

            var hbsObject = {
                question: {
                    title: result.title,
                    text: result.text,
                    id: result.id,
                    username: result.User.username
                },
                answers: result.Answers,
                user: req.user
            };
            res.render("singleQuestion", hbsObject);
        });
    });
}
