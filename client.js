const WebSocket = require('ws');
const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', function (event) {
   socket.send('Hello Server!');
});

socket.addEventListener('message', function (event) {
   console.log('Message from server ', event.data);
});

socket.addEventListener('close', function (event) {
   console.log('The connection has been closed');
});