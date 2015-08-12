angular.module('battlescript.services', [])

// Home Factory
.factory('Home',function ($http){
  return {}
})

// Dashboard Factory
.factory('Dashboard',function ($http){
  var getUsers = function(){
    return $http({
      method: 'GET',
      url: '/api/users/getusers'
    })
    .then(function(resp){
      return resp;
    });
  };

  return {
    getUsers : getUsers
  };
})

// Auth factory
.factory('Auth', function ($http, $location, $window) {
  
  // signs users in
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      // Saving a global username to be used throughout app
      $window.localStorage.setItem('username', resp.config.data.username);
      return resp.data.token;
    });
  };

  // signs users up
  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      // Saving a global username to be used throughout app
      $window.localStorage.setItem('username', resp.config.data.username);
      return resp.data.token;
    });
  };

  // helper to check if users are authorized
  var isAuth = function () {
    return !!$window.localStorage.getItem('battlepro');
  };

  // signs out users
  var signout = function (user) {
    $window.localStorage.setItem('username', undefined);
    $window.localStorage.removeItem('battlepro');
    $location.path('/signin');

    console.log('this is user!!!', user)
    console.log('inside signout factory')
    
    return $http({
      method: 'POST',
      url: '/api/users/signout',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });

  };

  // return all funcs as an obj
  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
})

// The battle factory
.factory('Battle', function($http) {

  // gets a battle
  var getBattle = function() {
    return $http({
      method: 'GET',
      url: '/api/duels/getduel',
    }).then(function(res) {
      return res.data;
    });
  };

  // attempts a battle
  var attemptBattle = function(projectId, solutionId, code) {
    return $http({
      method: 'POST',
      url: '/api/duels/attemptduel',
      data: {
        code: code,
        projectId: projectId,
        solutionId: solutionId
      }
    }).then(function(res) {
      return res.data;
    });
  };

  // return all funcs as an obj
  return {
    getBattle: getBattle,
    attemptBattle: attemptBattle
  }
})

// The search factory (if we need it)
.factory('Search', function ($http){
  
  // gets results
  var getResults = function(searchData, callback){
    $http({
      method: 'POST',
      url: '/api/search',
      data: searchData
    })
    .then(function(resp){
      console.log("got respons");
      callback(resp.data);
    });
  };

  // return all funcs as an obj
  return {
    getResults: getResults
  }

})

// The preference factory (if we need it)
.factory('Preference', function ($http){
  
  // save preferences
  var save = function(preferences, callback){
    $http({
      method: 'POST',
      url: '/api/search/preferences',
      data: preferences
    })
    .then(function(resp){
      console.log("GOT RESPONSE FROM SERVER!")
      callback(resp.data);
    });
  };

  return {
    save: save
  }

})

.factory('SocketHolder', function(){
  var playerOne = window.localStorage.getItem('username');
  var socket = io('http://localhost:8000', {query: "username=" + playerOne});

  var emitOnline = function() {
    console.log('online')
    socket.emit('online');
    
  }

  return {
    socket: socket,
    playerOne: playerOne,
    emitOnline: emitOnline
  }
});
