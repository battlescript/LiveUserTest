angular.module('battlescript.dashboard', [])

.controller('DashboardController', function ($scope, Dashboard, SocketHolder) {
  $scope.getUsers = function($event){
    $event.preventDefault();
  }


  var socket = SocketHolder.socket;

  // Every time we need to update the dash, this is emitted....

  // We could have an intervaled get.. That's up to you guys
  socket.on('updateDash', function(){
    Dashboard.getUsers().then(function(users){
      $scope.userData = users.data;
    })
  });


});