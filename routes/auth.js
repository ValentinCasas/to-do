const express = require("express");
var router = express.Router();
var passport = require("passport");
const todoController = require("../controllers/auth");
const { User } = require("../models");

router.get("/github", passport.authenticate("github"));
router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/auth/error" }),
    function (req, res) {
        res.redirect(301, "/todo")
    });

router.post("/error", todoController.error);
router.get("/logout", todoController.cerrarSesion)


/* autenticacion por base de datos */

router.post("/signin", todoController.signIn);
router.post("/signup", todoController.signUp);


var isAdmin = async function (req, res, next) {

    const users = await User.findAll({ where: { sessionId: req.sessionID } });
    if (users[0].cargo == "admin") {
        return next();
    } else {
        res.redirect("/todo")
    }
}


var estaAutenticadoBd = (req, res, next) => {
    console.log(req.isAuthenticated() + "---" + req.user)
    console.log(req);
    if (req.session.isLoggedIn) return next();
    res.redirect("/");
}

var EstaAutenticado = (req, res, next) => {
    console.log(req.isAuthenticated() + "---" + req.user)
    if (req.user) return next();
    res.redirect("/");
}

module.exports.isAdmin = isAdmin;
module.exports.estaAutenticadoBd = estaAutenticadoBd;
module.exports.EstaAutenticado = EstaAutenticado;
module.exports.router = router;