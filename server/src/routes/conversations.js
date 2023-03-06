const express = require('express');
const router = express.Router();

const { privateConversations, communityConversations } = require('../utils/dummyConversation');

router.get('/private', (request, response) => {
    const { userId } = request.query;

    const rooms = Object.values(privateConversations); // Get private rooms

    const userRooms = rooms.filter(room => room.participants.find(userIds => userIds === parseInt(userId))); // Filter user rooms by userId
    
    //filter participant of rooms and last message 
    const participantsMessage = userRooms.map(room => [room.participants.find(id => id != userId),room.messages[0]])


    response.json({rooms:userRooms, participantsMessage:participantsMessage}); // Return private user rooms and participants
});

router.get('/community', (request, response) => {
    const { userId } = request.query;

    const rooms = Object.values(communityConversations); // Get community rooms

    const userRooms = rooms.filter(room => room.participants.find(userIds => userIds === parseInt(userId)));  // Filter user rooms by userId

    response.json(userRooms); // Return community user rooms
});

router.get('/communityAll', (request, response) => {
    const rooms = Object.values(communityConversations); // Get community rooms
    response.json(rooms); // Return community rooms
});


router.post('/message', (req, res) => {
    
    const { message, userId, roomId } = req.body;

    const room = privateConversations[roomId] || communityConversations[roomId]; // Get community rooms by room id

    if (!room) res.status(500).send('The room does not exist'); // Throw error if room does not exist or not found

    const isUserParticipant = room.participants.find(userIds => userIds === userId); // Check weather or not user is one of the participant of the room

    if (!isUserParticipant) res.status(500).send('You are not part of this room'); // If not throw error

    // If everything goes well add message to messages array
    room.messages.push({
        userId,
        message,
        messageId: (Math.random() + 1).toString(36).substring(7),
        messageTime: new Date()
    });

    res.json(room); // Return room itself
});

module.exports = router;
