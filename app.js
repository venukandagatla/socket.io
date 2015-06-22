var express = require('express');

var app = express();
//var server = require('http').Server(app);


var s = app.listen(80);
var io = require('socket.io')(s);
var router = express.Router();
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

//io.on('connection', function (socket) {
//  socket.emit('news', { hello: 'world' });
//  socket.on('my other event', function (data) {
//    console.log(data);
//  });
//});

io.on('connection', function (socket) {
  io.emit('this', { will: 'be received by everyone'});

  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});