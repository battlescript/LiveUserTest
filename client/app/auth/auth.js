// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('battlescript.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth, SocketHolder) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('battlepro', token);
        $location.path('/');
      })
      .catch(function (error) {
        $scope.message = "Invalid Username or Password";
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('battlepro', token);
        $location.path('/');
      })
      .catch(function (error) {
        $scope.message = "Username Already Taken";
        console.error(error);
      });
  };

  $scope.logout = function() {
    console.log('calling log out');
    SocketHolder.socket.emit('logout');
    // Disconnect the socket on logout
    $scope.user.username = $window.localStorage.getItem('username');
    console.log("inside log out ", $scope.user)
    Auth.signout($scope.user)
    .then(function (token){    
      console.log('inside then: im signing out') 
      $window.localStorage.removeItem('battlepro');
      console.log('disconnecting!')
      $location.path('/signin');
    })
    .catch(function (error) {
        $scope.message = "Username Not Found";
        console.error(error);
    });
  };
});
