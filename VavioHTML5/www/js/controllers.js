angular.module('starter.controllers', [])

.config(function($compileProvider) {
	$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.controller('StartCtrl', function($scope, $location, Camera, Challenge, $stateParams) {
	$scope.test = 'Challenge predefined';

	if($stateParams.id) {
		$scope.test = 'Challenge predefined met iemand anders!';

		Challenge.getChallenge($stateParams.id).then(function(result) {
			$scope.challengeData = result;
		}, function(err) {
			$scope.error = err;
		});
	}

	$scope.startVideo = function() {
		Camera.start().then(function(imageURI) {
			$location.path('/result');
		}, function(err) {
			$scope.error = err;
		});
	};
})

.controller('ResultCtrl', function($scope, $location, $document, $ionicLoading, Camera, Upload, Challenge, Guid, $stateParams) {
	var video = Camera.returnVideo()[0].fullPath;
	var videoName = video.substr(video.lastIndexOf('/') +1);
	$scope.result = 'file://' + video
	var videoElement = $document[0].getElementById('video');

	var guid;

	$scope.$watch('result', function() {
		videoElement.src = $scope.result;
	});

	$scope.restartVideo = function() {
		Camera.start().then(function(imageURI) {
			video = Camera.returnVideo()[0].fullPath;
			videoName = video.substr(video.lastIndexOf('/') +1);
			$scope.result = 'file://' + video;
		}, function(err) {
			$scope.error = err;
		});
	};

	$scope.uploadVideo = function() {
		$ionicLoading.show({
			template: 'Uploading video...'
		});

		guid = Guid.generate();

		Upload.start({video: video, guid: guid}).then(function(result) {
			$ionicLoading.hide();
			$scope.shareVideo();
		}, function(err) {
			$ionicLoading.hide();
			$scope.error = err;
		});
	};

	$scope.shareVideo = function() {
		var challenged = {
			videoName: videoName,
			challengeText: Challenge.getChallengeText(),
			guid: guid
		};

		$ionicLoading.show({
			template: 'Challenge aan het aanmaken...'
		});

		Challenge.sendChallenge(challenged).then(function(challengeUrl) {
			$ionicLoading.hide();

			setTimeout(function() {
				window.location = 'whatsapp://send?text=Ik%20heb%20net%20een%20challenge%20voltooid%20op%20Vavio,%20doe%20mee!%20vavio://' + challengeUrl;
			}, 0);
		}, function(err) {
			$scope.error = err;
		});
	};
})

.controller('IndexCtrl', function($scope, $location, Random, Challenge) {
	$scope.result = Random.pickRandom().text;
	Challenge.setChallengeText($scope.result);

	$scope.start = function() {
		$location.path('/do-challenge');
	};

	$scope.reroll = function() {
		$scope.result = Random.pickRandom().text;
		Challenge.setChallengeText($scope.result);
	};
})

.controller('DoChallengeCtrl', function($scope, $location, Camera, Challenge) {
	$scope.currentChallenge = Challenge.getChallengeText();

	$scope.startVideo = function() {
		Camera.start().then(function(imageURI) {
			$location.path('/finished-challenge');
		}, function(err) {
			$scope.error = err;
		});
	};
})

.controller('FinishedChallengeCtrl', function($scope, $location, $ionicLoading, Camera, Upload, Challenge, Guid, $document, $stateParams) {
	$scope.currentChallenge = Challenge.getChallengeText();

	var video = Camera.returnVideo()[0].fullPath;
	var videoName = video.substr(video.lastIndexOf('/') +1);
	$scope.result = 'file://' + video
	var videoElement = $document[0].getElementById('video');

	var guid;

	$scope.$watch('result', function() {
		videoElement.src = $scope.result;
	});

	$scope.restartVideo = function() {
		Camera.start().then(function(imageURI) {
			video = Camera.returnVideo()[0].fullPath;
			videoName = video.substr(video.lastIndexOf('/') +1);
			$scope.result = 'file://' + video;
		}, function(err) {
			$scope.error = err;
		});
	};

	$scope.uploadVideo = function() {
		$ionicLoading.show({
			template: 'Uploading video...'
		});

		guid = Guid.generate();

		Upload.start({video: video, guid: guid}).then(function(result) {
			$ionicLoading.hide();
			$scope.shareVideo();
		}, function(err) {
			$ionicLoading.hide();
			$scope.error = err;
		});
	};

	$scope.shareVideo = function() {
		var challenged = {
			videoName: videoName,
			challengeText: Challenge.getChallengeText(),
			guid: guid
		};

		$ionicLoading.show({
			template: 'Challenge aan het aanmaken...'
		});

		Challenge.sendChallenge(challenged).then(function(challengeUrl) {
			$ionicLoading.hide();

			setTimeout(function() {
				window.location = 'whatsapp://send?text=Ik%20heb%20net%20een%20challenge%20voltooid%20op%20Vavio,%20doe%20mee!%20vavio://' + challengeUrl;
			}, 0);
		}, function(err) {
			$scope.error = err;
		});
	};
})

.controller('ShareChallengeCtrl', function($scope) {
	console.log('Share Challenge');
})

.controller('PickRandomCtrl', function($scope, $location, Camera, Random, Challenge) {
	$scope.result = Random.pickRandom().text;

	Challenge.setChallengeText($scope.result);

	$scope.startVideo = function() {
		Camera.start().then(function(imageURI) {
			$location.path('/result');
		}, function(err) {
			$scope.error = err;
		});
	};

})

.controller('AcceptCtrl', function($scope, $location, Challenge, Camera) {
	$scope.currentChallenge = Challenge.getChallengeText();

	Challenge.getChallenge().then(function(data) {
		console.log(data);
		$scope.challenger = data;
		$scope.video = 'http://vavio.borisbesemer.com/video/' + data.guid + '.MOV';
		angular.element(document.getElementById('challenge-video')).attr('src', $scope.video);
		Challenge.setChallengeText(data.challengeText);
	});

	$scope.start = function() {
		$location.path('/do-challenge');
	};

	$scope.startVideo = function() {
		Camera.start().then(function(imageURI) {
			$location.path('/result');
		}, function(err) {
			$scope.error = err;
		});
	};
});
