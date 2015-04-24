angular.module('starter.controllers', [])

.config(function($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.controller('DashCtrl', function($scope) {
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('StartCtrl', function($scope, $location, Camera) {
    $scope.test = 'Werkt deze?';

    $scope.startVideo = function() {
        Camera.start().then(function(imageURI) {
            console.log(imageURI);
            $location.path('/result');
        }, function(err) {
            console.log(err);
        });
    };
})

.controller('TestCtrl', function($scope, Camera) {
    $scope.test = 'Werkt deze ook?';

    $scope.startVideo = function() {
        Camera.start();
    };
})

.controller('ResultCtrl', function($scope, Camera) {
    $scope.result = 'file://' + Camera.returnVideo()[0].fullPath;
});
