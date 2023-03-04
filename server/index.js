const bodyParser = require("body-parser");
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


const users = require('./src/utils/dummyUser');

const usersRouter = require('./src/routes/users');
const conversationRouter = require('./src/routes/conversations');

app.use(bodyParser.json({}));



const PORT = 3000 || 3001;

app.use('/users', usersRouter);
app.use('/conversations', conversationRouter);

const { privateConversations, communityConversations } = require('./src/utils/dummyConversation');

let isPublic; // hold whether the messaging is private or public 

// add message to server 
function post(message,roomId){

    const room = privateConversations[roomId] || communityConversations[roomId]; // Get community rooms by room id

    // if messaging is public, add sender user property to message
    if(isPublic){
        // find sender user in users
        const senderUser = users.find(user=> user.id === message.user._id)

        message.user.avatar = senderUser.avatar
        message.user.name = senderUser.username
    }

    room.messages.unshift(message);
    console.log("privateConversations",privateConversations)
    console.log("CommunityConversations",communityConversations[roomId])
    
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

function checkRoomPublic(roomId,roomName,selfUserId){

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

io.on('connection', socket  => {

    console.log('A user connected', socket.id)
    
    //listen  messages
    socket.on("send_message",(message,roomId) =>{
        socket.broadcast.to(roomId).emit("receive_message",message)
        post(message,roomId)
           
    })
 

    socket.on("join_room_private",(room,selfUserId,receiveId,isPublic,cb)=>{
        isPublic = isPublic
        checkRoomPrivate(room,selfUserId,receiveId)
        socket.join(room)
        cb("joined",room)
    })

        
    socket.on("join_room_public",(roomId, roomName, selfUserId,cb)=>{
        checkRoomPublic(roomId,roomName, selfUserId)
        socket.join(roomId)
        cb("joined",roomId)
    })



    socket.on('disconnect',()=>{
        console.log("user disconnect",socket.id)
    })
            
        


})


http.listen(PORT, () => console.log(`Socket app has been initiated on http://localhost:${PORT}/`));
