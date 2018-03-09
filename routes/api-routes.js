var db = require("../models");

module.exports = function (app) {
    // Only logged in users can post new questions
    app.post("/api/questions", isLoggedIn, function (req, res) {
        db.Question.create({
            title: req.body.title,
            text: req.body.text,
            UserId: req.user.id
        }).then(dbQuestion => {
            // redirect to the new question page
            res.redirect('/questions/'+dbQuestion.id);
            // res.json(dbQuestion);
        });
    });

    app.post("/api/questions/:id/answer", isLoggedIn, function (req, res) {
        db.Answer.create({
            text: req.body.text,
            UserId: req.user.id,
            QuestionId: req.params.id
        }).then(dbAnswer => {
            // redirect to the new question page
            res.redirect('/questions/'+req.params.id);
            // res.json(dbAnswer);
        });
    });

    app.put("/api/questions/:id/:answer/upvote", isLoggedIn, function (req, res) {

        db.Upvote.findAll({
            where: {
                AnswerId: req.params.answer
            }
        }).then((dqUpvote) => {
            console.log(dqUpvote);
            var shouldUpvote = true;
            dqUpvote.forEach(element => {
                if (element.UserId === req.user.id) {
                    shouldUpvote = false;
                }
            });

            if (shouldUpvote) {
                db.Upvote.create({
                    UserId: req.user.id,
                    AnswerId: req.params.answer
                }).then(upvoteRes => {
                    db.Answer.update({
                        upvotes: db.Sequelize.literal('upvotes + 1')
                    },
                    {
                        where: { id: req.params.answer }
                    }
                    ).then(dbAnswer => {
                        // redirect to the new question page
                        res.json('success');
                        // res.json(dbAnswer);
                    });

                    // res.json(dbAnswer);
                });
            }

            else {
                res.json("FAILED.. UPVOTE");
            }
            // res.json(dqUpvote);
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

    app.get("/api/user", function (req, res) {
        console.log(req.user);
        res.json(req.user);
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/signin');
    }
}
