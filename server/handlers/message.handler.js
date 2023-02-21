let currentMessageId =1


function createMessage(messageText,user){
    return {
      _id: currentMessageId++,
      text: messageText,
      createdAt: new Date(),
      user: {
        _id: user.userId,
        name: user.username,
        avatar: user.avatar,
      },
  }
  
  }


function handleMessage(socket,users){
    socket.on("message", messageText =>{
        const user = users[socket.id]
        const message = createMessage(messageText,user)
        console.log(message)
        socket.broadcast.emit("message",message)
        
   
    })
}

module.exports = {handleMessage}
