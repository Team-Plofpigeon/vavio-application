// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives'])

.run(function($ionicPlatform, $location) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    });
})

.controller('MainController', function($scope, $location, Challenge) {
	$scope.reportCustomURL = function(url) {

        console.log(url);

            if(url.indexOf('/accept-challenge/') > -1 ) {
                console.log('accept challenge called');
                Challenge.setChallengeId(url.substr(url.lastIndexOf('/') +1 ));
                $location.path(url);
            } else {
                console.log('different url called');
                $location.path('/start-' + url);
            }

            $scope.$apply();

	};
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('index', {
    url: '/index',
    templateUrl: 'templates/index.html',
    controller: 'IndexCtrl'
  })

  .state('start-predefined', {
    url: '/start-predefined',
    templateUrl: 'templates/start-predefined.html',
    controller: 'StartCtrl'
  })

  .state('accept-challenge', {
    url: '/accept-challenge/:id',
    templateUrl: 'templates/accept-challenge.html',
    controller: 'AcceptCtrl'
  })

  .state('start-pick-three', {
      url: '/start-pick-three',
      templateUrl: 'templates/start-pick-three.html',
      controller: 'PickThreeCtrl'
  })

  .state('start-pick-random', {
    url: '/start-pick-random',
    templateUrl: 'templates/start-pick-random.html',
    controller: 'PickRandomCtrl'
  })

  .state('start-pick-random.challenge', {
    url: '/start-pick-random/:id',
    templateUrl: 'templates/start-pick-random.html',
    controller: 'PickRandomCtrl'
  })

  .state('result', {
    url: '/result',
    templateUrl: 'templates/result.html',
    controller: 'ResultCtrl'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/index');

});
