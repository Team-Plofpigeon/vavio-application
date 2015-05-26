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

.controller('ResultCtrl', function($scope, $location, $ionicLoading, Camera, Upload, Challenge, $stateParams) {
    var video = Camera.returnVideo()[0].fullPath;
	var videoName = video.substr(video.lastIndexOf('/') +1);
	$scope.result = 'file://' + video;

	$scope.uploadVideo = function() {
		$ionicLoading.show({
			template: 'Uploading...'
		});

        Upload.start(video).then(function(result) {
			$ionicLoading.hide();
			console.log('yes');
        }, function(err) {
			$ionicLoading.hide();
            $scope.error = err;
        });
	};

	$scope.shareVideo = function() {
		var challenged = {
			videoName: videoName,
			challengeText: Challenge.getChallengeText()
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

.controller('IndexCtrl', function($scope, $location) {
	$scope.start = function(param) {
		switch(param) {
			case 0:
				$location.path('/start-pick-random');
			break;
			case 1:
				$location.path('/start-predefined');
			break;
			case 2:
				$location.path('/do-challenge');
			break;
		}
	};
})

.controller('DoChallengeCtrl', function($scope) {
	console.log('Do Challenge');
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

.controller('AcceptCtrl', function($scope, $location, Challenge) {

	Challenge.getChallenge().then(function(data) {
		console.log(data);
		$scope.challenger = data;
	});

});
