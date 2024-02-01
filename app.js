const express = require('express');
const http = require('http');
const socketIo = require('socket.io')

// create express app
const app = express();

// add namespaces
let namespaces = require('./data/namespaces');

// serve static files
app.use(express.static('public'))

// create http server
const httpServer = http.createServer(app);

// create a socket.io instance
const io = socketIo(httpServer);

io.on('connection', (socket) => {
    let data = namespaces.map(ns => {
        return (
            {
                nsTitle: ns.nsTitle, img: ns.img
            }
        )
    })

    socket.emit('namespace', data)
})

// Namespace {
//     id: 1,
//     nsTitle: 'DEVS',
//     img: '/images/coding.png',
//     rooms: [ [Room], [Room], [Room] ]
//   }

// listen for each namespace connection
namespaces.forEach(namespace => {
    io.of(`/${namespace.nsTitle}`).on('connection', (socket) => {
        console.log(socket.id)
    })
})



httpServer.listen(3000, console.log('app listening on port 3000'));
