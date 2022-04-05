const WebSocket = require('ws');
const ws = new WebSocket.Server({ port: 8080 });

ws.on('connection', (wsConnection) => {
   wsConnection.on('message', (message) => {
      console.log(`server received from client: ${message}`);
   });

   wsConnection.on('close', () => {
      console.log(`client left`)
   })

   wsConnection.send('server: conexiunea s-a stabilit');
});