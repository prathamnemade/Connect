/*
  There are some minor modifications to the default Express setup
  Each is commented and marked with [SH] to make them easy to find
 */

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
// [SH] Require Passport
var passport = require('passport');
var schema=require('./graphql/index')
// [SH] Bring in the data model
require('./server/config/db');
// [SH] Bring in the Passport config after model is defined
// require('./api/config/passport');


// [SH] Bring in the routes for the API (delete the default routes)
// var routesApi = require('./api/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
const port = process.env.PORT || 5000;
app.set('port', port);
const graphqlHTTP = require("express-graphql");
// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());

// [SH] Use the API routes when path starts with /api
// app.use('/', routesApi);
app.use('/graphql', cors(), graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true
}));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
module.exports = app;