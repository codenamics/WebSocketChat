let express = require('express')
let socket = require('socket.io')

let app = express()

let server = app.listen(process.env.PORT, () => {
    console.log('Server started')
})

app.use(express.static('public'))

let io = socket(server)

io.on('connection', (socket) => {
    console.log('Mafe socekt connection')

    socket.on('chat', (data) => {
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function (data) {
        console.log(data)
        socket.broadcast.emit('typing', data);
    });

})