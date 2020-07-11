const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
    res.render("../views/main.hbs");
});

module.exports = router;
