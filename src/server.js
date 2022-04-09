const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const PORT = process.env.PORT || 3000
const app = express()
app.get('*', (req, res) => {
   res.sendFile(req.path, { root: __dirname })
})

const server = http.createServer(app)
const io = new socketio.Server(server)

const users = []

io.on('connection', (socket) => {
   let username
   let room
   const id = socket.id

   socket.on('plrInfo', ({username: usrname, room: rom}) => {
      username = usrname
      room = rom

      users.push({username, room, id})
      socket.join(room)
      socket.in(room).emit('player+', username)

      const otherUsernames = []
      users.forEach(user => {
         if (user.room === room)
            otherUsernames.push(user.username)
      })

      socket.emit('otherUsernames', otherUsernames)
   })

   socket.on('disconnect', () => {
      const index = users.findIndex( ({username: usrname, room: rom, id: id}) => (room === rom && username === usrname) )
      users.splice(index, 1)
      socket.in(room).emit('player-', username)
   })
})

server.listen(parseInt(PORT), () => {
   console.log(`Server-ul functioneaza pe portul ${PORT}.`)
})