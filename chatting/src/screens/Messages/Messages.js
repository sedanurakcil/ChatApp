import {View,FlatList} from "react-native";
import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import UserCard from "../../components/UserCard/UserCard";


const Messages = ({navigation})=>{

    const conversationsAll = useSelector(state=>state.conversations)

       
        const values = Object.values(conversationsAll)
        const createdConversations = values.filter(c => c.messages.length !== 0)
        console.log("conv",createdConversations)
        const users = createdConversations.map(myFunction)
        console.log("users",users)

   

    function myFunction(conversations) {
        return conversations.user;
            }
    

    const renderUser =({item})=> <UserCard item = {item} onPress= {()=>{navigation.navigate("Chat",{name:item.username, userId: item.userId})}}/>

        return(
            <View style = {{flex:1}}>
                <FlatList
                    data= {users}
                    renderItem={renderUser} 
                    keyExtractor={item => item.userId}
                    />

            </View>
        )

}

export default Messages