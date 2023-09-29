// https://www.luiztools.com.br/post/tutorial-nodejs-com-mongodb-mongoose-express-ejs/

const passport = require('passport');
const session = require('express-session');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth')
var homeRouter = require('./routes/home')
var usersRouter = require('./routes/user');
var movieRouter = require('./routes/movie')
var catalogRouter = require('./routes/catalog')
var adminRoute = require('./routes/admin')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


require('./authenticator')(passport);
app.use(session({
  secret: 'acsydv78@#$%¨&VB@#Y¨&',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 12 * 60 * 60 * 1000 }
}))
app.use(passport.initialize());
app.use(passport.session());

function authMiddleware(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/login?fail=notLogged');
}

app.use('/', indexRouter)
app.use('/home', authMiddleware, homeRouter);
app.use('/user', authMiddleware, usersRouter);
app.use('/movie', authMiddleware, movieRouter)
app.use('/catalog', catalogRouter)
app.use('/admin', authMiddleware, adminRoute)
app.use('/auth', authRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;