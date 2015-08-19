var express         = require('express'),
    app             = express(),
    path            = require('path'),
    favicon         = require('serve-favicon'),
    logger          = require('morgan'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    partials        = require('express-partials'),
    methodOverride  = require('method-override'),
    session         = require('express-session');

var routes          = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//Autologout

app.use(function(req, res, next){
    if(req.session.user){
        
        console.log("Comprobación autologout...");

        var twoMinutes = 2 * 60 * 1000;
        
        var now = new Date().getTime();
        var difference;
        
        if(req.session.user.lastActivity === undefined){
            req.session.user.lastActivity = now;
        }
            
        difference = now - req.session.user.lastActivity;
        
        if(difference < twoMinutes){
            req.session.user.lastActivity = now;
            console.log("--> Autologout cancelado");
        }else{
            delete req.session.user;
            res.redirect(req.session.redir.toString()); // redirección a path anterior a login
            console.log("--> Autologout aceptado");
        }
    }
    
    next();
});

// Helpers dinamicos:
app.use(function(req, res, next) {

  // si no existe lo inicializa
  if (!req.session.redir) {
    req.session.redir = '/';
  }
  // guardar path en session.redir para despues de login
  if (!req.path.match(/\/login|\/logout|\/user/)) {
    req.session.redir = req.path;
  }

  // Hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
});

app.use('/', routes);

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
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});

module.exports = app;

console.log('Listening on port: 5000');

