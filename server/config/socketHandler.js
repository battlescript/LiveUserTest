var roomModel = require('../room/roomModel.js');
var userController = require('../users/userController.js');
var duelSocket = require('../config/duelSocket');

module.exports = function(socket, io){

  // For the first-login connection

  socket.on('online', function(){
    userController.currentUsers[socket.handshake.query.username] = {username: socket.handshake.query.username, id: socket.id};
    socket.emit('updateDash'); //to urslef
    socket.broadcast.emit('updateDash'); //to everyone
  })

  socket.on('disconnect', function(){
    delete userController.currentUsers[socket.handshake.query.username];
    socket.emit('updateDash');
    socket.broadcast.emit('updateDash');

  })


  socket.on('matchReady', function(){
    duelSocket(roomModel, socket);
  });


};