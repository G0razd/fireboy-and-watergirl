const canvasEl = document.querySelector('#game')
const canvas = canvasEl.getContext('2d')
const playersDiv = document.querySelector('#players')
const logDiv = document.querySelector('#log')
const chooseCharDiv = document.querySelector('#chooseChar')
const playButDiv = document.querySelector('#play')
const firegirl = new Image()
const waterboy = new Image()
firegirl.src = '../images/firegirl.png'
waterboy.src = '../images/waterboy.png'

function addPlayerToDiv(usrname)
{
   const spanEl = document.createElement('span')
   spanEl.classList += 'player'
   spanEl.id = usrname
   spanEl.innerText = usrname
   playersDiv.appendChild(spanEl)
}

function removePlayerFromDiv(usrname)
{
   document.getElementById(usrname).remove()
}

socket.emit('plrInfo', {username, room})


socket.on('otherUsernames', (usernames) => {
   usernames.forEach(({username: usrname}) => {
      addPlayerToDiv(usrname)
   })
})


socket.on('player+', (plrUsername) => {
   addPlayerToDiv(plrUsername)
})


socket.on('player-', (plrUsername) => {
   removePlayerFromDiv(plrUsername)
})


socket.on('chooseChars', () => {
   canvasEl.style.display = 'inline'
   chooseCharDiv.style.display = 'inline'
   playButDiv.style.display = 'none'
})


socket.on('startPlay', () => {
   const speed = 5
   let up, left, down, right
   let coordsChanged

   setInterval(() => {
      coordsChanged = 0

      if (up) {
         me.y -= speed
         coordsChanged = 1
      }
      if (left) {
         me.x -= speed
         coordsChanged = 1
      }
      if (down) {
         me.y += speed
         coordsChanged = 1
      }
      if (right) {
         me.x += speed
         coordsChanged = 1
      }

      if (coordsChanged)
         socket.emit('coords', {x: me.x, y: me.y})
      canvas.clearRect(0, 0, canvasEl.width, canvasEl.height)
      canvas.drawImage(me.image, me.x, me.y, 100, 100)
      canvas.drawImage(yo.image, yo.x, yo.y, 100, 100)
   }, 13)

   document.onkeydown = (key) => {
      switch (key.code)
      {
         case 'KeyW':
            up = 1;  break;
         case 'KeyA':
            left = 1;   break;
         case 'KeyS':
            down = 1;   break;
         case 'KeyD':
            right = 1;  break;
      }
   }

   document.onkeyup = (key) => {
      switch (key.code)
      {
         case 'KeyW':
            up = 0;  break;
         case 'KeyA':
            left = 0;   break;
         case 'KeyS':
            down = 0;   break;
         case 'KeyD':
            right = 0;  break;
      }
   }

   socket.on('coords', ({x: x, y: y}) => {
      yo.x = x;
      yo.y = y;
   })
})


socket.on('log', (msg) => {
   addLog(msg)
})

function addLog(msg)
{
   const date = new Date()
   const spanEl = document.createElement('span')
   spanEl.classList += 'logmsg'
   spanEl.innerText = 'log ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' - ' + msg
   logDiv.appendChild(spanEl)
}

function play()
{
   socket.emit('tryPlay')
}