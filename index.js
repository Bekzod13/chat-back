const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
    }
});

io.on("connection", (socket)=> {
    console.log('user connected',socket.id);

    socket.on("join_room", (data)=> {
        socket.join(data);
    });

    socket.on("send_message", (data)=>{
        socket.to(data.room).emit("receive_message", data);
    })

    socket.on("dissconnect", ()=> {
        console.log("User dissconnected", socket.id);
    });
})

server.listen(8000, ()=>{
    console.log('server is running ');
});