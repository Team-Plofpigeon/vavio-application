var express = require('express');
var multer = require('multer');

var app = express();

app.use(multer({dest: './upload/'}));

app.get('/', function (req, res) {
	res.send('Hello Boris!');
});

app.post('/upload', function(req, res) {
	// Hier moet ie wat doen met de upload
	console.log('url wordt aangevraagd');
	console.log(req.body);
	var form = {
		body: req.body,
		files: req.files
	};
	res.send(form);
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
