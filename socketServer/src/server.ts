import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
const PORT = 8080;

interface ChatMessage {
    message: string;
    userId: string;
    timeStamp: Date;
}


const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket: Socket) => {
    console.log("a user connected", socket.id);
    socket.on('send_message', (data: {message: string})=>{
        const messageData:ChatMessage = {
            message: data.message,
            userId: socket.id,
            timeStamp: new Date()
        };
        io.emit('receive_message', messageData);
    });
    socket.on('disconnect', ()=>{
        console.log("user disconnected", socket.id);
    });
});

httpServer.listen(PORT, ()=>{
    console.log(`Socket Server is running at ${PORT}`);
})