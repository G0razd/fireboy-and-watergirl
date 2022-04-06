const hostname = document.location.href.replace('http', 'ws');
const socket = new WebSocket(hostname);

socket.onopen = (event) => {
   socket.send('Conectat cu succes la server-ul WebSocket.');
}

socket.onmessage = (event) => {

}