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

   // android buttons
   if (window.navigator.userAgent.toLowerCase().indexOf('android') !== -1)
   {
      const butSize = 8/100 * window.innerWidth

      const butUp = document.createElement('button')
      butUp.classList = 'android_button'
      butUp.style.left = butSize + butSize/2
      butUp.style.bottom = butSize + butSize + butSize/2
      butUp.style.width = butSize
      butUp.style.height = butSize
      butUp.onmousedown = () => {up = 1}
      butUp.onmouseup = () => {up = 0}
      butUp.innerText = '^'
      document.body.appendChild(butUp)

      const butLeft = document.createElement('button')
      butLeft.classList = 'android_button'
      butLeft.style.left = butSize/2
      butLeft.style.bottom = butSize + butSize/2
      butLeft.style.width = butSize
      butLeft.style.height = butSize
      butLeft.onmousedown = () => {left = 1}
      butLeft.onmouseup = () => {left = 0}
      butLeft.innerText = '<'
      document.body.appendChild(butLeft)

      const butDown = document.createElement('button')
      butDown.classList = 'android_button'
      butDown.style.left = butSize + butSize/2
      butDown.style.bottom = butSize/2
      butDown.style.width = butSize
      butDown.style.height = butSize
      butDown.onmousedown = () => {down = 1}
      butDown.onmouseup = () => {down = 0}
      butDown.innerText = 'd'
      document.body.appendChild(butDown)

      const butRight = document.createElement('button')
      butRight.classList = 'android_button'
      butRight.style.left = butSize + butSize + butSize/2
      butRight.style.bottom = butSize + butSize/2
      butRight.style.width = butSize
      butRight.style.height = butSize
      butRight.onmousedown = () => {right = 1}
      butRight.onmouseup = () => {right = 0}
      butRight.innerText = '>'
      document.body.appendChild(butRight)
   }

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