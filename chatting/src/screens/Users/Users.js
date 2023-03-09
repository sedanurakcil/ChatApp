import {View,Text,FlatList,Image} from "react-native";
import React from 'react'
import UserCard from "../../components/UserCard/UserCard";
import {useSelector} from 'react-redux'

const Users = ({navigation})=>{

    const users = useSelector(s=>s.users)
    const selfUser = useSelector(s=>s.selfUser)


    function renderUser ({item}){
        return(
           <UserCard item = {item} onPress= {()=>{navigation.navigate('Chat',{userName:item.username,userId :item.id,avatar:item.avatar})}}/>
        )

    }
    
    return(
        <View style = {{flex:1}}>
            <FlatList
                data = {users}
                renderItem = {renderUser}
                keyExtractor= {(item)=> item.id}/>
            <Text style={{margin :20,color:'black',fontWeight:'bold'}}>{selfUser.username}</Text>

        </View>
    )
    

}

export default Users



