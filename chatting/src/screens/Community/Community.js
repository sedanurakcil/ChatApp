import {View,FlatList,} from "react-native";
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import RoomCard from "../../components/RoomCard";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { Container,Input,Button,ButtonText,InnerContainer} from './Community.style'



const Community = ({navigation})=>{

    const [communityRooms, setCommunityRooms]= useState([])
    const selfUser= useSelector(state=>state.selfUser)
    const [roomName, setRoomName] = useState("")

    // fetch the rooms when page is changed
    useFocusEffect(
        React.useCallback(() => {
            fetchCommunityConv()
          
        }, [])
      );

      
    const  fetchCommunityConv = async ()=>{
        try{
            // get community rooms that user joined 
            const {data} =  await axios.get(`http://192.168.1.106:3000/conversations/community?userId=${selfUser.id}`)
             
            setCommunityRooms(data)

        }catch(err){
            console.log(err.message)
        }  
    };
    

    const renderRooms=({item})=> <RoomCard item = {item} onPress={()=>{navigation.navigate('PublicChat',{roomName:item.roomName, avatar:item.avatar})}}/>

   

    function onPressJoin(){
        navigation.navigate('PublicChat',{roomName:roomName,avatar:null})
        console.log("roomName",roomName)

    }


    return(
        <Container>

            <FlatList
                data={communityRooms}
                renderItem= {renderRooms}/>

            <InnerContainer>
                    <Input
                            onChangeText={(name)=>setRoomName(name.toUpperCase())}
                            placeholder="Enter room name"
                            value={roomName}
                            
                        />
                    
                    <Button onPress={onPressJoin}>
                        <ButtonText>JOIN OR CREATE ROOM</ButtonText>
                    </Button>
            </InnerContainer>

        </Container>
    )

}

export default Community