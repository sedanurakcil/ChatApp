import {View,} from "react-native";
import React,{useRef,useEffect,useState} from 'react'
import { GiftedChat,InputToolbar ,Send} from 'react-native-gifted-chat'
import {socket} from '../../utils/socket'
import { useSelector} from "react-redux";
import axios from 'axios'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PrivateBubble from "../../components/PrivateBubble/PrivateBubble";



const PublicChat = ({route})=>{
    
    const[messages,setMessages]= useState([])
    const {roomName} = route.params;
    const selfUser = useSelector(state=>state.selfUser)
    const users = useSelector(state=>state.users)
    const roomId = useRef(null)


    useEffect(()=>{
        getMessages()

        // listen room
        socket.on("receive_message", message =>{

             // find the sender user in users
            const senderUser = users.find(user=> user.id === message.user._id)

            // add the sender user property to message
            message.user.avatar = senderUser.avatar
            message.user.name= senderUser.username
            console.log(message)
           
            setMessages(previousMessages => GiftedChat.append(previousMessages, message))
        })

    },[])


    // create unique room id
    function createRoomId(){
        if(!roomId.current){
        roomId.current = (Math.random() + 1).toString(36).substring(7)
        }
    }

    async function getMessages(){

        try{
            // get community rooms 
            const {data} =  await axios.get(`http://192.168.1.106:3000/conversations/communityAll`)
             
            // find the selected room  by roomName
            const room = data.find(room => room.roomName === roomName)

           
           // If there is a room, check if this user is a member of the room
            if(room){

                // take roomId
                roomId.current = room.roomId

                const isUserParticipant = room.participants.find(userIds => userIds === selfUser.id);

                // if yes, get the past messages
                if(isUserParticipant){
                    setMessages(room.messages)
                }    

            }
            else{
                //If there is no room, create a new room id
                createRoomId()
            }
        }catch(err){
            console.log(err.message)
        } 
        
        socket.emit("join_room_public", roomId.current,roomName, selfUser.id,(back)=>{
            console.log(back)
        })

    }
   

    // send message to server 
    function onSend(messages){

        const message= {
            _id:(Math.random() + 1).toString(36).substring(7),
            text: messages[0].text,
            createdAt: new Date(),
            user: {
              _id: selfUser.id,
            }}
        
        socket.emit("send_message", message,roomId.current)
        setMessages(previousMessages => GiftedChat.append(previousMessages, message))
        
    }

    


    return (
        <View style = {{flex:1}}>
            <GiftedChat
                showAvatarForEveryMessage={true}
                renderUsernameOnMessage
                messages={messages}
                onSend={(messages)=>onSend(messages)}
                user={{
                        _id: selfUser.id,
                        }}

                
                renderBubble={(props) => {
                    return <PrivateBubble {...props} />;
                }}


                renderInputToolbar={(props) => (
                    <InputToolbar {...props} containerStyle={{ backgroundColor: '#FFFFFF', paddingTop:3}} />
                  )}

                renderSend={(props) => (
                    <Send {...props} style={{backgroundColor:'#FFFFFF'}}>
                        <Icon name="send" style={{ fontSize:30 , color: '#9370db',marginBottom:7, }}/>
                    </Send>

                    )}
            /> 
        </View>
           
    )    
    
}

export default PublicChat
