const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, { /* options */ });

const uuid = require('uuid');
 
const port = process.env.PORT || 3000;

const messagehandler= require("./handlers/message.handler")




const users = {};

function createUsersOnline(){
  const values = Object.values(users)
  const onlyWithUsernames = values.filter(u => u.username !== undefined)
  return onlyWithUsernames

}

function createUserAvatar(){
  const rand1 = Math.round(Math.random()*200 +100)
  const rand2 = Math.round(Math.random()*200 +100)
  return `https://placeimg.com/${rand1}/${rand2}/any`

}

io.on('connection', socket  => {

    users[socket.id]= {userId: uuid.v1()};
    console.log('a user connected', users[socket.id].userId);
   

    socket.on('disconnect',()=>{
      console.log("user disconnect",users[socket.id].userId)
      delete users[socket.id];
      io.emit("action",
           {type:"users_online", data:createUsersOnline()})
          
        });

    socket.on("action", action=>{
      switch(action.type){
        case "server/hello":
          console.log("Got hello event ",action.data)
          socket.emit("action",{type:"message",data:"Good Day"})
          break;

        case "server/join":
          console.log("Got join event",action.data)
          users[socket.id].username= action.data;
          users[socket.id].avatar = createUserAvatar()
          io.emit("action",{type:"users_online", data:createUsersOnline() })
          socket.emit("action",{type:"self_user",data:users[socket.id]})
          break;

        case "server/private_message":
          const conversationId = action.data.conversationId
          const from = users[socket.id].userId;
          const userValues = Object.values(users)
          const socketIds = Object.keys(users)

          for(let i = 0 ; i <userValues.length; i++){
            
            if(userValues[i].userId === conversationId){
              const socketId = socketIds[i]
              socket.to(socketId).emit("action",
              {
                type:"private_message",
                data:{
                  ...action.data,
                  conversationId:from 
                }
              })
              break;
            }
          }

        break

      }


    })
 });

    

  httpServer.listen(port, () => {
    console.log( `Server running at http://localhost:${port}/`);
  });