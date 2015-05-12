angular.module('starter.directives', [])

.controller('ChallengeField', ['$scope', function($scope) {
  $scope.data = {
    maxLength: 80,
    count: 0,
    class: "black"
  };

  $scope.updateCount = function() {
    var count = this.challengeField.length;
    $scope.data.count = count;
    if (count >= 60 && count < 70) {
      $scope.data.class = "yellow";
    } else if (count >= 70 && count < 80) {
      $scope.data.class = "orange";
    } else if (count == 80) {
      $scope.data.class = "red";
    } else {
      $scope.data.class = "black";
    }
  };
}])

.directive('challengeField', function() {
  return {
    templateUrl: 'templates/directives/challenge-field.html'
  };
});
