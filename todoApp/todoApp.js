Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
    var myApp = angular.module('todoApp', ['angular-meteor']);

    myApp.controller('todoController', function($scope, $meteor){
        $scope.app = "todoApp Meteor";
        $scope.tasks = $meteor.collection(Tasks);
        $scope.status = ['Complete', 'Incomplete'];

        $scope.addTask = function(task){
            Tasks.insert(angular.copy(task));
            delete task;
        };
        $scope.removeAllTask = function(){
            Meteor.call('removeAllTask');
        };
        $scope.removeSelected = function(){
            Meteor.call('removeSelected');
        };
    });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
      if (Tasks.find().count()===0){
          var tasks = [
              {name: "School", hour: "15:00", status: "Incomplete"},
              {name: "Make Dinner", hour: "20:00", status: "Complete"}
          ];
          for (var i=0;i<tasks.length;i++){
              Tasks.insert(tasks[i]);
          }
          console.log("populate Tasks Collection");
      }

      return Meteor.methods({
          removeAllTask: function() {
              return Tasks.remove({})
          },
          removeSelected: function(task){
              return Tasks.remove({ selections: true })
          }
      });
  });
}
