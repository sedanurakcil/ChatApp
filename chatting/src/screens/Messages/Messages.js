import {View,FlatList} from "react-native";
import React, {useState } from 'react'
import UserCard from "../../components/UserCard/UserCard";
import {useSelector} from 'react-redux'
import { useFocusEffect } from "@react-navigation/native";
import axios from 'axios'


const Messages = ({navigation})=>{

    const [usersFilter, setUsersFilter]= useState([])
    // get users 
    const users= useSelector(u=>u.users)
    const selfUser = useSelector(s=>s.selfUser)

    // fetch the rooms when page is changed
    useFocusEffect(
        React.useCallback(() => {
            fetchPrivateConv()
          
        }, [])
      );
    
    const  fetchPrivateConv = async ()=>{
        try{
            // get private conv from server
            const {data} =  await axios.get(`http://192.168.1.106:3000/conversations/private?userId=${selfUser.id}`)
            
        
            // get participants and  last messages in rooms
            const privateParticipantsMessage= data.participantsMessage

            setUsersFilter([])

            // filter users  by messaged user
            for(i= 0; i<privateParticipantsMessage.length;i++){
                let temp = null
                temp = users.find(user => user.id === privateParticipantsMessage[i][0])
                temp.message = privateParticipantsMessage[i][1] // add last messages
                setUsersFilter( prev => [...prev, temp])
                
            } 
  

        }catch(err){
          
            console.log(err.message)
        }
        
    };
    
 
    
    function renderUser ({item}){
        return(
           <UserCard item = {item} isMessagedUser = {true} onPress= {()=>{navigation.navigate('Chat',{userName:item.username,userId :item.id,avatar:item.avatar})}}/>
        )
          

    }

    return(
        <View style = {{flex:1}}>
            <FlatList
                data = {usersFilter}
                renderItem = {renderUser}
                /> 
        </View>
    )
    

}

export default Messages