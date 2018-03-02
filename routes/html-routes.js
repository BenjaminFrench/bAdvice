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
            include: [db.Answer]
        }).then(result => {
            var hbsObject = {
                question: {
                    title: result.title,
                    text: result.text,
                    id: result.id
                },
                answers: result.Answers,
            };
            res.render("singleQuestion", hbsObject);
        });
    });
}
