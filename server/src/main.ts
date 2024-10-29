import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

// only allow request from client on port 5173
const io = new Server(server, { cors: { origin: 'http://localhost:5173' } });
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('geloo');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  // on method to LISTEN/RETRIEVE on specific message key
  socket.on('message', (msg) => {
    console.log('message -> ', msg);
    // emit method to SEND message on specific message key
    io.emit('message', msg);
  });
  io.on('disconnect', () => {
    console.log('disconnected!');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
