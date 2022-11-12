const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");

var indexRouter = require("./routes/index")
var adminRouter = require("./routes/admin")
var listaRouter = require('./routes/lista');
var todoRouter = require('./routes/item');
var authRouter = require('./routes/auth').router;
var EstaAutenticado = require('./routes/auth').EstaAutenticado;
var estaAutenticadoBd = require('./routes/auth').estaAutenticadoBd;
var isAdmin = require('./routes/auth').isAdmin;


const app = express();


app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "palabra secreta",
  })
);

var { User } = require("./models");
const { emitKeypressEvents } = require('readline');
var GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
  clientID: "8155c32a3e5515cd7c33",
  clientSecret: "9a11256597ed2593497739a35191804530c959f3",
  callbackURL: "http://localhost:3000/auth/github/callback"
},
  function (accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate(
      {
        where: {
          githubId: profile.id
        },
      }).then((user, creado) => {
        emitKeypressEvents
        return cb(null, user);
      });
  }))

passport.serializeUser(function (user, done) {
  done(null, user);
})
passport.deserializeUser(function (user, done) {
  done(null, user);
})

app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');

app.use(logger('dev')); 
app.use(express.static("./public/js.js"));
app.use(express.static("./public/sweetAlert.js"));
app.use(express.static("./public/style.css"));
app.use(express.static("./static"));
app.use(express.static("./views")); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter)
app.use('/auth', authRouter)

/* con base de datos */

app.use("/todo", estaAutenticadoBd, todoRouter, listaRouter);
app.use("/admin", isAdmin, adminRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
