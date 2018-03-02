var db = require("../models");

module.exports = function (app) {
    app.post("/api/burgers", function (req, res) {
        db.Burger.create({
            burger_name: req.body.name,
            devoured: false
        }).then(dbBurger => {
            res.json(dbBurger);
        });
    });

    app.put("/api/burgers/:id", function (req, res) {
        var condition = "id=" + req.params.id;

        console.log("condition", condition);

        db.Burger.update({
            devoured: true
        },
        {
            where: {
                id: req.params.id
            }
        }).then((dbBurger) => {
            res.json(dbBurger);
        });
    });

    app.get("/api/burgers/reset", function (req, res) {
        db.Burger.findAll().then((results) => {
            console.log(results);
            results.forEach(element => {
                element.update({ devoured: false });
            });
            res.json("Success");
        });
    });
}
