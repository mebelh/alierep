const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
    res.render("../views/main.hbs", {
        isMain: true,
    });
});

router.get("/inf", (req, res) => {
    res.render("../views/me-inf.hbs", {
        isInf: true,
        title: "Обо мне",
    });
});

module.exports = router;
