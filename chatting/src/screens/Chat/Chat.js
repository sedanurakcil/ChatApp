import {View} from "react-native";
import React,{useRef,useEffect,useState} from 'react'
import { GiftedChat,InputToolbar ,Send} from 'react-native-gifted-chat'
import {socket} from '../../utils/socket'
import { useSelector} from "react-redux";
import axios from 'axios'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PrivateBubble from "../../components/PrivateBubble/PrivateBubble";


const Chat = ({route})=>{
    
    const[messages,setMessages]= useState([])
    const {userId} = route.params;
    const selfUser = useSelector(state=>state.selfUser)
    const roomId= useRef(null)
    const users = useSelector(state=>state.users)

    
    useEffect(()=>{
         // take the past messages
        getMessages(userId)

         // listen room 
        socket.on("receive_message", message =>{
            setMessages(previousMessages => GiftedChat.append(previousMessages, message))
        })
    },[])
   
    // create unique room id
    function createRoomId(){
        if(!roomId.current){
        roomId.current = (Math.random() + 1).toString(36).substring(7)
        }
    }

    async function getMessages(userId){
        try{
            // fetch all private rooms
            const {data} =  await axios.get(`http://192.168.1.106:3000/conversations/private?userId=${selfUser.id}`)

            const privateRooms = data.rooms


            if(privateRooms){
                    // filter room according to receive user id
                    const room = privateRooms.filter(room => room.participants.find(userIds => userIds == userId))

                    if(room.length > 0){
                        //set roomId and messages
                        roomId.current= room[0].roomId
                        setMessages(room[0].messages)
    
                    }
                    else{
                        createRoomId()

                    }
            
            }
            else{
                createRoomId()
            }
        }
        catch(err){
            console.log(err)
        }

        const isPublic = false // chatting is not private

        // join room after check room id
        socket.emit("join_room", roomId.current,selfUser.id,userId,isPublic,(back)=>{
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

    // change message bubble
    const renderBubble = (props) => <PrivateBubble {...props} />;
    
    return (

        <View style={{ flex: 1, backgroundColor: '#F1EDE4' }}>
            <GiftedChat
                showAvatarForEveryMessage={true}
                messages={messages}
                onSend={(messages)=>onSend(messages)}
                user={{
                        _id: selfUser.id,
                        }}
                renderAvatar={() => null}

                renderBubble={renderBubble}

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


export default Chat
