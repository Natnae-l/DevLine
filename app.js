const express = require('express');
const http = require('http');
const socketIo = require('socket.io')

// create express app
const app = express();

// serve static files
app.use(express.static('public'))

// create http server
const httpServer = http.createServer(app);

// create a socket.io instance
const io = socketIo(httpServer);

httpServer.listen(3000, console.log('app listening on port 3000'));
