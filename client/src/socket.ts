import { io } from 'socket.io-client';

// URL where the server running
const URL = 'http://localhost:3000';

export const socket = io(URL);
