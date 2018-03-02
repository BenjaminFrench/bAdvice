var db = require("../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        db.Question.findAll({}).then(result => {
            var hbsObject = {
                questions: result
            };
            res.render("index", hbsObject);
        });
    });

    app.get("/questions/:id", function (req, res) {
        db.Question.findOne({
            where: {
                id: req.params.id
            }
        }).then(result => {
            var hbsObject = {
                title: result.title,
                text: result.text,
                id: result.id
            };
            res.render("singleQuestion", hbsObject);
        });
    });
}
