var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var mongo_config = require('./config/mongo-config');
var dbConnector = require('./models/dbConnector')
var routes = require('./routes/index');
var users = require('./routes/users');
// var resourcesAPI = require('./routes/resourcesAPI');
var facilitiesAPI = require('./routes/facilitiesAPI');
var SpacesAPI = require('./routes/SpacesAPI');

var app = express();

var connector = new dbConnector(mongo_config);

connector.initializeDb(function(){
    // check
})



// var admin = express();
// admin.on('mount', function (parent) {
//   console.log('Admin Mounted');
//   console.log(parent); // refers to the parent app
// });

// admin.get('/', function (req, res) {
//   res.send('Admin Homepage');
// });

// app.use('/admin', admin);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.post('/', function(res, req, next){
    req.on('data', function(data){
        body += data;
        console.log('data update!!');
        console.log(req.body);
        console.log(body);
    })
    req.on('end', function(){
        console.log('request end');
        console.log(req.body);
        console.log(body);
        
    })
    next();
})

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

app.use('/Spaces', SpacesAPI());
app.use('/Facilities', facilitiesAPI());
app.use('/', routes);
app.use('/users', users);


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
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
