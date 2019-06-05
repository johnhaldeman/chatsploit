var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var logoutRouter = require('./routes/logout');
var profileRouter = require('./routes/profile');
var loginRouter = require('./routes/login')
var chatsploitRouter = require('./routes/chatsploit')
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var sql = require("./sql");

var authdb = require('./authdb');

var app = express();

passport.use(new Strategy(
  function(username, password, cb) {
    authdb.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  authdb.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static('public'))

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/logout', logoutRouter);
app.use('/profile', profileRouter);
app.use('/login', loginRouter);
app.use('/chatsploit', chatsploitRouter);

app.use(passport.initialize());
app.use(passport.session());

sql.connect();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
