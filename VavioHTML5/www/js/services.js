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
        text: 'Sta op je hoofd'
    },
    {
        id: 1,
        text: 'Stop iets in je mond'
    },
    {
        id: 2,
        text: 'Doe een dansje'
    },
    {
        id: 3,
        text: 'Sla iemand in elkaar'
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

.factory('PickThree', ['$q', function($q) {

    var what = [{
        text: 'Hinkel op je linker been'
    },
    {
        text: 'Doe een levend standbeeld na'
    },
    {
        text: 'Druk armpje'
    },
    {
        text: 'Wissel een kledingstuk'
    },
    {
        text: 'Speel luchtgitaar'
    },
    {
        text: 'Doe een dutje'
    },
    {
        text: 'Geef een staande ovatie'
    },
    {
        text: 'Zing een liedje'
    },
    {
        text: 'Loop de polonaise'
    },
    {
        text: 'Loop achterstevoren'
    },
    {
        text: 'Doe een impersonatie'
    },
    {
        text: 'Promoot je locatie'
    },
    {
        text: 'Geef een weersvoorspelling'
    },
    {
        text: 'Bedenk een rijmpje'
    }];

    var where = [{
        text: 'op een machine'
    },
    {
        text: 'op een terras'
    },
    {
        text: 'in een park'
    },
    {
        text: 'op een bankje'
    },
    {
        text: 'op een zebra pad'
    },
    {
        text: 'op een trap'
    },
    {
        text: 'in een gazon'
    },
    {
        text: 'op een stoel'
    },
    {
        text: 'op een fontein'
    },];

    var who = [{
        text: 'de kleinste persoon'
    },
    {
        text: 'de stoerste persoon'
    },
    {
        text: 'de oudste persoon'
    },
    {
        text: 'iemand met een bril'
    },
    {
        text: 'iemand met zwart haar'
    },
    {
        text: 'iemand waarvan de naam met een P begint'
    },
    {
        text: 'de grootste lambal'
    },
    {
        text: 'de grootste persoon'
    },
    {
        text: 'de knapste persoon'
    }];

    return {
        pickRandom: function() {
          return {
            what: what[Math.floor(Math.random()*what.length)],
            where: where[Math.floor(Math.random()*where.length)],
            who: who[Math.floor(Math.random()*who.length)]
          }
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
