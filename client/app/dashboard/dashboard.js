angular.module('battlescript.dashboard', [])

.controller('DashboardController', function ($scope, Dashboard, SocketHolder) {
  $scope.getUsers = function($event){
    $event.preventDefault();
  }


  var socket = SocketHolder.socket;

  socket.on('updateDash', function(){
    Dashboard.getUsers().then(function(users){
      $scope.userData = users.data;
    })
  });


});