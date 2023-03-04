import React,{useEffect, useState,useRef} from 'react'
import {View,TextInput,Text,Button, ActivityIndicator} from 'react-native'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';
import {socket} from '../../utils/socket'

const Login = ({navigation}) => {

    const dispatch = useDispatch()
    const randomUser = useRef(null)
    const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(true)
    const [isReady, setIsReady] = useState(false)
    const selfUser = useSelector(state=>state.selfUser)
 
    
    useEffect(()=>{
        if(!randomUser.current){
            fetchUsersData() 
             
        }
         
    },[]) 

    // trigger when user selected and navigation 
    useFocusEffect(
        React.useCallback(() => {
            if(selfUser){
                fetchPrivateConv(randomUser) 
                fetchCommunityConv(randomUser)       
            } 
          
        }, [isReady])
      );


    const  fetchUsersData = async ()=>{
        try{
            // get users from server
            const {data} =  await axios.get('http://192.168.1.106:3000/users')
            let users = data

            //select random user
            randomUser.current = users[Math.floor(Math.random() * users.length)];
            
            // add self user and users to redux structure
            dispatch({type:'SET_SELF_USER' ,payload:{selfUser :randomUser.current} }) 
            
            // filter users by selected user 
            users =  users.filter(user => user.id !== randomUser.current.id)

            dispatch({type:'SET_USERS' ,payload:{users:users}}) 
            
            setIsReady(true)
        }catch(err){
           
            console.log(err.message)

        }
        // Socket is initialized after random user is selected
        socket.on("connect",()=>{
            console.log("client connect")
            
        })  
        
    };

    const  fetchPrivateConv = async (randomUser)=>{
        try{
            // get private conv from server
            const {data} =  await axios.get(`http://192.168.1.106:3000/conversations/private?userId=${randomUser.current.id}`)
            
            // add private conv and participant to redux
            dispatch({type:'SET_PRIVATE_ROOMS' ,payload:{privateRooms:data.rooms}})
            dispatch({type:'SET_PRIVATE_PARTICIPANTS' ,payload:{privateParticipants:data.participant}}) 

            setLoading(false)

        }catch(err){
          
            console.log(err.message)
        }
        
    };

    const  fetchCommunityConv = async (randomUser)=>{
        try{
            // get community conv from server
            const {data} =  await axios.get(`http://192.168.1.106:3000/conversations/community?userId=${randomUser.current.id}`)

            // add private conv and participant to redux
            dispatch({type:'SET_COMMUNITY_ROOMS' ,payload:{communityRooms:data}})
            
            setLoading1(false) 

        }catch(err){
          
            console.log(err.message)
        }
        
    };


    return(
        <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'black', fontWeight:'bold',margin:30}}>Selected User </Text>
            { loading && loading1 ?
                <ActivityIndicator/> :

                <Text style={{color:'black', fontWeight:'bold',margin:30,fontSize:25}}>{randomUser.current.username}</Text>
            }
            <Button title ='Login' onPress={()=>{navigation.navigate('TopTabs')}}/>

        </View>

    )

}

export default Login