if (Meteor.isClient) {
    angular.module('todoApp', ['angular-meteor']);

    angular.module('todoApp').controller('todoController', function($scope){
        $scope.app = "todoApp Meteor";
    });

}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
