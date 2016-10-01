var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');

var routes = require('./routes/index');
var api = require('./routes/api');
var pp = require('./routes/payment-process');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//mongoose init
var options = config.mongoose.options;

switch (app.get('env')) {
	case 'development':
		mongoose.connect(config.mongoose.userURI, options, function(err) {
			if (err)
				console.log('Mongoose default connection error!' + err);
		});
		mongoose.Promise = global.Promise;
		break;
	default:
		throw new Error('Unknown execution environment: ' + app.get('env'));
}

//cards (type) init
var cardsInit = require('./cards-init.js');
cardsInit();

//users init
var usersInit = require('./users-init.js');
usersInit();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', routes);
app.use('/api', api);
app.use('/payment-process', pp);

// error handlers
app.use(function(req, res) {
	res.status(404).render('404', {
		status: '404',
		message: 'Oops - Page Not Found'
	});
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).render('500', {
		status: '500',
		message: 'Sorry - Server Error'
	});
});

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
