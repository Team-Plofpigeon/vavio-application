var express = require('express');
var multer = require('multer');
var _ = require('lodash');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

var challenges = [];

var challengeList = [];

app.use(multer({dest: './upload/'}));

app.get('/', function (req, res) {
	res.send('Hello Boris!');
});

// Accept custom user defined challenge
app.post('/customchallenge', function (req, res) {
	console.log('custom challenge wordt aangevraagd');
	console.log(req.body);
	// Push custom challenge to array
	challenges.push(req.body);
	res.send(200).end();
});

app.post('/upload', function(req, res) {
	// Hier moet ie wat doen met de upload
	console.log('url wordt aangevraagd');
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
		challengeText: req.body.challengeText
	}

	challengeList.push(result);

	var responseId = _.findIndex(challengeList, {videoName: req.body.videoName});
	res.status(200).send({id: responseId, challenge: req.body.type}).end();



});

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
