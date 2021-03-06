var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session')


var app = express();

// Load routes
var routes = require('./routes/index');
var users = require('./routes/users');
var entries = require('./routes/entries');
var absences = require('./routes/absences');
var awols = require('./routes/awols');

var auth = require('./routes/auth');
var admin = require('./routes/admin');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'alert-sign-in',
  keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2, process.env.COOKIE_KEY_3]
}))

// load Auth
auth(app)


// routes
app.use('/', routes);
app.use('/users', users);
app.use('/entries', entries);
app.use('/awols', awols);
app.use('/admin', admin);
app.use('/absences', absences);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log('err-debug');
    console.dir(err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log('err-prod');
  console.dir(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
