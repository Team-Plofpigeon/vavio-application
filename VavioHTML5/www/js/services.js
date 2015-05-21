angular.module('starter.services', [])


.factory('Camera', ['$q', function($q) {
    var cameraSettings = {
        quality: 75,
        destinationType: 1,
        sourceType: 1,
        allowEdit: true,
        mediaType: 1,
        saveToPhotoAlbum: true
    };

    var resultingVideo;

    return {
        start: function() {
            var q = $q.defer();

            navigator.device.capture.captureVideo(function(result) {
                resultingVideo = result;

                q.resolve(result);
            }, function(err) {
                q.reject(err);
            }, {limit: 1});

            return q.promise;
        },
        returnVideo: function() {
            return resultingVideo || null;
        }
    }
}])

.factory('Upload', ['$q', function($q) {
    return {
        start: function(file) {
            var q = $q.defer();
            var options = new FileUploadOptions();


            options.fileKey = 'file';
            options.fileName = file.substr(file.lastIndexOf('/') + 1);
            options.mimeType = 'video/mp4';

            var transfer = new FileTransfer();


            transfer.upload(file, encodeURI('http://vavio.borisbesemer.com/upload'), function(success) {
                q.resolve(success);
            }, function(err) {
                q.reject(err);
            });

            return q.promise;
        }
    };
}])

.factory('Random', ['$q', function($q) {

    var challenges = [{
        id: 0,
        text: 'Hinkel op 1 been een trap op'
    },
    {
        id: 1,
        text: 'Ga armpje drukken met iemand'
    },
    {
        id: 2,
        text: 'Doe de weervoorspelling'
    },
    {
        id: 3,
        text: 'Speel op je air guitar'
    },
    {
        id: 4,
        text: 'Loop met je groep achteruit'
    }];

    return {
        pickRandom: function() {
            return challenges[Math.floor(Math.random()*challenges.length)];
        },
        remove: function(id) {
            challenges.splice(challenges.indexOf(id), 1);
        }
    };
}])

.factory('Challenge', ['$q', '$http', function($q, $http) {
    var challengeUrl = {};

    var challengeText = '';
    var challengeId;

    return {
        sendChallenge: function(challengeTest) {
            var q = $q.defer();

            console.log(challengeTest);

            $http({
                url: 'http://vavio.borisbesemer.com/challenge',
                method: 'POST',
                data: JSON.stringify(challengeTest),
                headers: {'Content-Type': 'application/json'}
            }).success(function(data, status, headers, config) {
                console.log(data);
                challengeUrl = '/accept-challenge/' + data.id;
                q.resolve(challengeUrl);
            }).error(function(data, status, headers, config) {
                q.reject(data);
            });

            return q.promise;
        },

        getChallenge: function() {
            var q = $q.defer();

            $http.get('http://vavio.borisbesemer.com/challenge/' + challengeId)
                .success(function(data, status, headers, config) {
                    console.log('challenge get success');
                    q.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    q.reject(data);
            });

            return q.promise;
        },

        setChallengeText: function(text) {
            challengeText = text;
        },

        getChallengeText: function() {
            return challengeText;
        },

        setChallengeId: function(id) {
            challengeId = id;
        }
    };
}]);
