const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth")
const { User } = require("../models");


exports.error = function (req, res) {
    res.send("ocurrio un error al validar github");
}

exports.cerrarSesion = function (req, res, next) {
    req.session.destroy();
    /* req.logout(function (err) { if (err) { return next(err); } }) */
    res.redirect("/");
}


/* autenticacion por Base de Datos */

exports.signIn = async (req, res, next) => {

    let { mail, password } = req.body;

    let = sessionId = req.sessionID;
    await User.update({ sessionId: sessionId }, { where: { mail: mail } });

    const user = await User.findAll({ where: { mail: mail } });

    if (user.length == 1) {
        const validado = await bcrypt.compare(password, user[0].password);
        if (validado) {
            console.log("autenticado!")
            req.session.isLoggedIn = true;
            res.redirect("/todo")
        } else {
            res.redirect("/")
        }
    } else {
        res.redirect("/");
    }

}


exports.signUp = async (req, res) => {
    let { mail, name, cargo } = req.body;

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    await User.findOne({ where: { mail: mail } })
        .then(user => {
            console.log(user)
            if (!user) {
                User.create({
                    mail: mail,
                    password: password,
                    nombre: name,
                    cargo: cargo
                })

            }
            res.redirect("/")
        })


}











/* autenticacion por token */

/* exports.signIn = (req, res) => {

    let { mail, password } = req.body;

    User.findOne({
        where: {
            mail: mail
        }
    }).then(user => {
        if (!user) {
            res.status(404).json({ msg: "usuario no encontrado" })
        } else {
            if (bcrypt.compareSync(password, user.password)) {
                let token = jwt.sign({ user: user }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });

                res.redirect("/todo")

            } else {
                res.status(401).json({ msg: "contraseña incorrecta" })
            }
        }
    }).catch(err => { res.status(500).json(err) })

}

exports.signUp = async (req, res) => {

    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

    User.findOrCreate(
        {
            where: {
                mail: req.body.mail,
                password: password,
            },
        }).then(user => {
            let token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expires
            })

            res.redirect("/")


        })

} */

