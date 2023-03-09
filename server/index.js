const bodyParser = require("body-parser");
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const usersRouter = require('./src/routes/users');
const conversationRouter = require('./src/routes/conversations');

app.use(bodyParser.json({}));

const PORT = 3000 || 3001;

app.use('/users', usersRouter);
app.use('/conversations', conversationRouter);

const { privateConversations, communityConversations } = require('./src/utils/dummyConversation');
const users = require('./src/utils/dummyUser');

function post(message,roomId,checkPublic){

    const room = privateConversations[roomId] || communityConversations[roomId]; // Get community rooms by room id

    // if messaging is public, add sender user property to message
    if(checkPublic){
        // find sender user in users
        const senderUser = users.find(user=> user.id === message.user._id)

        message.user.avatar = senderUser.avatar
        message.user.name = senderUser.username
    }
    room.messages.unshift(message); 
}

function checkRoomPrivate (roomId,selfUserId,receiveId){
    const room = privateConversations[roomId]  // Get community rooms by room id
    // if dont have room create room 
    if (!room) {
        let  romm_property =  { 
             participants: [selfUserId, receiveId],
             messages: [],
             roomId : roomId
         }
         privateConversations[roomId] = romm_property;  
     }
}

function checkRoomPublic(roomId,selfUserId,roomName){
    const room = communityConversations[roomId]  // Get community rooms by room id
    // if dont have room create room 
    if (!room) {
        let  room_property =  { 
             participants: [selfUserId],
             messages: [],
             roomId : roomId,
             roomName: roomName,
             avatar:'https://ui-avatars.com/api/?name=' + roomName
             
         }
         communityConversations[roomId] = room_property   
     }
     else{
        // if room exists, Check weather or not user is one of the participant of the room  
        const isUserParticipant = room.participants.find(id => id === selfUserId); 

        // if not, add the user id to participants
        if(!isUserParticipant){
            room.participants.push(selfUserId)
        }
     }
}

//update online property when user connect 
function updateUserOnline(userId,socket){

    let foundIndex = users.findIndex(user=> user.id == userId) // find active user's index in users
    if(foundIndex != -1){
        users[foundIndex].socketId =socket.id//add socket id to active user
        users[foundIndex].online = true;
    }
    console.log('active',users[foundIndex])
        
 }
    


io.on('connection', socket  => {

    const userId = socket.handshake.query.userId;
    if(userId){
        updateUserOnline(userId,socket) 
        socket.broadcast.emit("user_active",userId)// Notify other users that  user is active
    }
    
    let checkPublic; // hold whether the messaging is private or public 
    
    //listen  messages
    socket.on("send_message",(message,roomId) =>{
        // send the received message to the sockets in the room 
        socket.broadcast.to(roomId).emit("receive_message",message)
        post(message,roomId,checkPublic) // add message to server
           
    })
 
    // public chat param3 = roomName
    // private chat param3= receiveId
    socket.on("join_room",(room,selfUserId,param3,isPublic,cb)=>{
        checkPublic = isPublic
        if(isPublic){
            checkRoomPublic(room,selfUserId,param3) // if chat is public check public rooms
        }
        else{
            checkRoomPrivate(room,selfUserId,param3) // if chat is private check private rooms
        }
        socket.join(room)// If everything goes well join user to room
        cb("joined",room)
    })



    socket.on('disconnect',()=>{
        //  If user disconnects, find user's index in users by socket id
        let foundIndex = users.findIndex(user=> user.socketId === socket.id);

        if(foundIndex != -1){
            //delete user's socket id and set online false
            users[foundIndex].online = false 
            users[foundIndex].socketId = null
            socket.broadcast.emit("user_disconnect",users[foundIndex].id)// notify other users that user left

        }  
        console.log('deactive',users[foundIndex])  
           
    })
            

})


http.listen(PORT,() => console.log(`Socket app has been initiated on http://localhost:${PORT}/`));
