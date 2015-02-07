var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Firebase = require('firebase');

var routes = require('./routes/index');
var users = require('./routes/users');
var demo = require('./routes/demo');
var landing = require('./routes/landing');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/demo', demo);
app.use('/landing', landing);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var commandStack = {
    "left" : 0,
    "right" : 0,
    "up" : 0,
    "down": 0
};

var myFirebaseRef = new Firebase("https://fbhack.firebaseio.com/");
    
// myFirebaseRef.set({
//     command: "left"         //TODO: add game server id to be able to launch multiple instance at the same time.
// });

myFirebaseRef.child('command').on("child_added", function(command) {
    // alert(snapshot.val());  // Alerts "San Francisco"
    commandStack[command.val().command]++;
});

var aggregateCommand = function () {
    console.log("heartbeat");
    var max = "left";
    for (var key in commandStack){
        if (commandStack[key] > commandStack[max])
            max = key;
    }
    commandStack = {
        "left" : 0,
        "right" : 0,
        "up" : 0,
        "down": 0
    };
    myFirebaseRef.set({
        serverCommand: max //TODO: add game server id to be able to launch multiple instance at the same time.
    });
}

setInterval(aggregateCommand, 2000);

/// error handlers

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
