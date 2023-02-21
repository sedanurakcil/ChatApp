import {SafeAreaView,View,Text,TextInput,Button} from "react-native";
import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

import {useDispatch,useSelector} from 'react-redux'

const Chat = ({route})=>{

    const {userId} = route.params;
    const dispatch = useDispatch();
    const selfUser = useSelector(state=>state.selfUser)
    const conversations = useSelector(state=>state.conversations)
    const messages =  conversations[userId].messages

    function onSend(messages){

        dispatch({
            type:"private_message",
            data:{message:messages[0], conversationId:userId}
        });

        dispatch({
            type:"server/private_message",
            data:{message:messages[0], conversationId:userId}
        })




    }
    return (
        <View style = {{flex:1}}>
                <GiftedChat
                            renderUsernameOnMessage
                            messages={messages}
                            onSend={onSend}
                            user={{
                                    _id: selfUser.userId,
                                    }}
                    />

        </View>
           
    )    
    
}

export default Chat