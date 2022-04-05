let canvas = document.querySelector('#game').getContext('2d');

canvas.fillStyle = "#FF0000";
canvas.font = "50px Comic Sans MS";
canvas.fillText("sarpele", 50, 300);
canvas.fillText("!", 50, 350);

// websocket
const socket = new WebSocket('ws://firegirl-and-waterboy-ws.herokuapp.com:8080');

socket.onopen = (event) => {
   console.log('client: m-am conectat');
   socket.send('m-am conectat!!');
}

socket.onmessage = (event) => {
   console.log(event.data);
}