import {View,Text,FlatList,Image} from "react-native";
import React from 'react'
import UserCard from "../../components/UserCard/UserCard";

import { useSelector } from "react-redux"

const Users = ({navigation})=>{

    const usersOnline = useSelector(state => state.usersOnline)
    console.log( "usersOnline" ,usersOnline)

    const renderUser =({item})=> <UserCard item = {item} onPress= {()=>{navigation.navigate("Chat",{name:item.username, userId: item.userId})}}/>

    return(
        <View style = {{flex:1}}>
            <FlatList
                data= {usersOnline}
                renderItem={renderUser} 
                keyExtractor={item => item.userId}
                />

        </View>
    )
    

}

export default Users



