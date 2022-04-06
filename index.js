const express = require('express');
const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;

const server = express()
   .use((req, res) => res.sendFile('/index.html', { root: __dirname }))
   .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
   console.log("new client connected");

   ws.on("message", data => {
      console.log(`Client has sent: ${data}`)
   });

   ws.on("close", () => {
      console.log("a client has disconnected");
   });

   ws.onerror = function () {
      console.log("Some Error occurred")
   }
});

console.log(`The WebSocket server is running on port ${PORT}`);
setInterval(() => {
   wss.clients.forEach((client) => {
      client.send(new Date().toTimeString());
   });
}, 1000);