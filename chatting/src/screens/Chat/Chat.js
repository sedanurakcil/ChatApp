import {View} from "react-native";
import React,{useRef,useEffect,useState} from 'react'
import { GiftedChat,InputToolbar ,Send} from 'react-native-gifted-chat'
import {socket} from '../../utils/socket'
import { useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PrivateBubble from "../../components/PrivateBubble/PrivateBubble";
import {createPrivateRoom} from "../../context/actions";


const Chat = ({route})=>{
    
    const[messages,setMessages]= useState([])
    const {userId} = route.params;
    const selfUser = useSelector(state=>state.selfUser)
    const roomId= useRef(null)
    const privateRooms = useSelector(state=> state.privateRooms)
    const dispatch = useDispatch()


    
    useEffect(()=>{
         // take the past messages
        getMessages(userId)

         // listen room 
        socket.on("receive_message", message =>{
            setMessages(previousMessages => GiftedChat.append(previousMessages, message))
            // add to message redux structure
            dispatch({type:"UPDATE_PRIVATE_MESSAGE",payload:{roomId:roomId.current,message:message}})
        })

    },[])

   
    // create unique room id and room
    function createRoom(){
        if(!roomId.current){
            roomId.current = (Math.random() + 1).toString(36).substring(7)
            console.log("createPrivateRoom")
            // call action that add room to private rooms in store
            dispatch(createPrivateRoom(roomId.current,selfUser.id,userId))
        }
    }

    function getMessages(userId){
        if(privateRooms.rooms){
            // filter room according to receive user id
            const room = privateRooms.rooms.filter(room => room.participants.find(userIds => userIds == userId))

            if(room.length > 0){
                //set roomId and messages
                roomId.current= room[0].roomId
                setMessages(room[0].messages)
            }
            else{
                createRoom()
            }
            
        }   
        else {
            //if there are no rooms, create a room
            createRoom()
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
        // add to message redux structure
        dispatch({type:"UPDATE_PRIVATE_MESSAGE",payload:{roomId:roomId.current,message:message}})
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
