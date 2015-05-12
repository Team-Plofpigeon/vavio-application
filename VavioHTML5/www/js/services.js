angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Camera', ['$q', function($q) {
    var cameraSettings = {
        quality: 75,
        destinationType: 1,
        sourceType: 1,
        allowEdit: true,
        mediaType: 1
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
            console.log('Hai?');

            transfer.upload(file, encodeURI('http://node.borisbesemer.com:3000/upload'), function(success) {
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
        text: 'de kleinste persoon die met je mee is'
    },
    {
        text: 'de stoerste persoon van jullie'
    },
    {
        text: 'een man ouder dan 60'
    },
    {
        text: 'een vrouw met een bril'
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
        text: 'een persoon groter dan 1,95'
    },
    {
        text: 'een persoon die op een bekend iemand lijkt'
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
}]);
