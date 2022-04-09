const connection = io()
const playersDiv = document.querySelector('#players')

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

connection.emit('plrInfo', {username, room})

connection.on('otherUsernames', (usernames) => {
   usernames.forEach(usrname => {
      addPlayerToDiv(usrname)
   })
})

connection.on('player+', (plrUsername) => {
   addPlayerToDiv(plrUsername)
})

connection.on('player-', (plrUsername) => {
   removePlayerFromDiv(plrUsername)
})