import {io, Socket} from 'socket.io-client';

export interface ChatMessage {
    message: string;
    userId: string;
    timeStamp: Date;
}
interface ServerToClientEvents {
    receive_message: (message: ChatMessage) => void;
}

interface ClientToServerEvents {
    send_message: (message: {message: string}) => void;
}
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8080';

// Initialize socket with connection options for better reliability on free tier hosting
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 20000,
    autoConnect: true,
    forceNew: true
});

// Add connection event listeners for better debugging
socket.on('connect', () => {
    console.log('Connected to socket server');
});

socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
});

socket.on('disconnect', (reason) => {
    console.log('Disconnected from socket server:', reason);
});

// Force immediate connection attempt to "heat up" the Render server
socket.connect();

export default socket;

