var createError = require('http-errors');
var express = require('express');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors"); // Add this line
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
// Express
var app = express();

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.mongo_url, {
    
}).then(console.log("connected to Mongo")).catch(err => console.log(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());
// Routes
// app.use('/', (req, res, next) => {
//   res.render('index', {title : 'Chat 1123'});
// });
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);


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