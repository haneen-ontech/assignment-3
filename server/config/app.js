// Hide Mongo URI
var dotenv = require('dotenv').config(); // Load env variables

// Assigning variables to our downloaded modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// configuring Databases
let mongoose = require('mongoose');
let DB = require('./db');

// configuring main routes 
var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
let projectsRouter = require('../routes/project');

// initializing express
var app = express();

// point mongoose to the DB URI
mongoose.connect(DB.mongoURI);
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind('console','Connection Error'));
mongoDB.once('open',()=>{
  console.log("Connected to DB:", mongoose.connection.name);
  console.log("Collections:", Object.keys(mongoose.connection.collections)); // test for connection to correct database and collection
});

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// assigning routes to end of website url
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);

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
  res.render('error', {title:'Error'});
});

module.exports = app;
