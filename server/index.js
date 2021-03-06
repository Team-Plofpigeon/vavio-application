var express = require('express');
var multer = require('multer');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

var challenges = [];

var challengeList = [];

var videoMiddleware = multer({
	dest: './upload/',
	rename: function(fieldname, filename, req, res) {
		return req.body.guid;
	}
});

app.get('/', function (req, res) {
	res.send('Hello Boris! v2');
});

// Accept custom user defined challenge
app.post('/customchallenge', function (req, res) {
	console.log('custom challenge wordt aangevraagd');
	console.log(req.body);
	// Push custom challenge to array
	challenges.push(req.body);
	res.send(200).end();
});

app.post('/upload', videoMiddleware, function(req, res) {
	// Hier moet ie wat doen met de upload
	console.log('url wordt aangevraagd');
	console.log(req.body);
	var form = {
		body: req.body,
		files: req.files
	};
	res.send(form);
});

app.post('/challenge', function(req, res) {
	console.log(req.body);

	var result = {
		videoName: req.body.videoName,
		challengeText: req.body.challengeText,
		guid: req.body.guid
	};

	challengeList.push(result);

	var responseId = _.findIndex(challengeList, {guid: req.body.guid});
	res.status(200).send({id: responseId, challenge: req.body.type}).end();



});

app.get('/video-list', function(req, res) {
	fs.readdir(path.resolve(__dirname + '/../upload/'), function(err, files) {
		res.send(files).end();
	});
});

app.use('/video', express.static(path.join(__dirname, '/../upload')));

app.get('/challenge/:id', function(req, res) {
	console.log('get challenge called!');
	var response = challengeList[req.params.id];

	console.log(response);

	res.status(200).send(response).end();
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
