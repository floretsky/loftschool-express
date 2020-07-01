var express = require('express');
var app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

app.use(cookieParser('secret key'));
app.use(session({ cookie: { maxAge: 3600 * 24 } }));
app.use(flash());

app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'source/template'));
app.set('view engine', 'pug');

// router
app.use('/', require('./routes/index'));

// public folder
app.use(express.static(__dirname + '/public'));

// catch 404 and forward to error handler
app.use(function (_, _, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, _, res, _) {
  // render the error page
  res.status(err.status || 500);
  res.render('_error', { message: err.message, error: err });
});

app.listen(3000, function () {
  console.log('Express app is listening on port 3000!');
});
