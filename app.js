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
// Room {
//     roomId: 3,
//     roomTitle: 'Reach Out',
//     namespace: 'developer',
//     privateRoom: false,
//     history: []
//   }


// listen for each namespace connection
namespaces.forEach(namespace => {
    io.of(`/${namespace.nsTitle}`).on('connection', (socket) => {
        let roomData = namespaces.find(data => namespace.nsTitle == data.nsTitle)
        socket.emit('data', roomData.rooms)
        socket.on('room', (jRoom, cb) => {

            socket.join(jRoom)
            // console.log(socket.adapter.nsp.name)
            let set = io.of(socket.adapter.nsp.name).in(jRoom).allSockets().then(data => {
                cb(data.size)
            });

        })
    })
})



httpServer.listen(3000, console.log('app listening on port 3000'));
