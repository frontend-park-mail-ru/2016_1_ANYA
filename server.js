var express = require('express'),
    errorHandler = require('errorhandler'),
    app = express(),
	proxy = require('express-http-proxy');

var HOSTNAME = 'localhost',
    PORT = 8080,
    PUBLIC_DIR = __dirname + '/public_html';
var i = 0;

app.use(function (req, res, next) {
	var date = new Date();
	console.log('[' + date.toLocaleString() + '] [Request no.' + i++ + ']');
	next();
});

app
	.use('/', express.static(PUBLIC_DIR))
	.use(errorHandler());

app.listen(PORT, function () {
	console.log('Simple static server showing %s listening at http://%s:%s', PUBLIC_DIR, HOSTNAME, PORT);
});


app.use('/backend/', proxy('http://0.0.0.0:5282', {
    decorateRequest: function(req) {
        req.path = '/api' + req.path;
    },
	forwardPath: function(req, res) {
		return require('url').parse(req.url).path;
	}
}));
