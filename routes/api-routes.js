var db = require("../models");

module.exports = function (app) {
    app.post("/api/questions", function (req, res) {
        db.Question.create({
            title: req.body.title,
            text: req.body.text,
            UserId: req.body.UserId
        }).then(dbQuestion => {
            res.json(dbQuestion);
        });
    });

    app.get("/api/questions", function (req, res) {
        db.Question.findAll().then((dqQuestion) => {
            console.log(dqQuestion);
            res.json(dqQuestion);
        });
    });

    app.get("/api/questions/:id", function (req, res) {
        db.Question.findOne({
            where: {
                id: req.params.id
            }
        }).then((dbQuestion) => {
            console.log(dbQuestion);
            res.json(dbQuestion);
        });
    });
}
