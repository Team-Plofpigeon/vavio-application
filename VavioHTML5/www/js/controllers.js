angular.module('starter.controllers', [])

.config(function($compileProvider) {
	$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})


.controller('StartCtrl', function($scope, $location, Camera) {
	$scope.test = 'Werkt deze?';

	$scope.startVideo = function() {
		Camera.start().then(function(imageURI) {
			$location.path('/result');
		}, function(err) {
			$scope.error = err;
		});
	};
})

.controller('ResultCtrl', function($scope, $location, $ionicLoading, Camera, Upload) {
    var video = Camera.returnVideo()[0].fullPath;
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
		window.location = 'whatsapp://send?text=Ik%20heb%20net%20een%20challenge%20voltooid%20op%20Vavio,%20doe%20mee!%20vavio://pick-random';
	};
})

.controller('IndexCtrl', function($scope, $location) {
	$scope.start = function(param) {
		switch(param) {
			case 0:
				$location.path('/start-pick-three');
			break;
			case 1:
				$location.path('/start-pick-random');
			break;
			case 2:
				$location.path('/start-predefined');
			break;
		}
	}
})

.controller('PickThreeCtrl', function($scope, $location, Camera) {
	$scope.startVideo = function() {
		Camera.start().then(function(imageURI) {
			$location.path('/result');
		}, function(err) {
			$scope.error = err;
		});
	};
})

.controller('PickRandomCtrl', function($scope, $location, Camera, Random) {
	$scope.result = Random.pickRandom().text;
});
