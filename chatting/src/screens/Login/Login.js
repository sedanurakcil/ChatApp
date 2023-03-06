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
    const selfUser = useSelector(state=>state.selfUser)
 
    
    useEffect(()=>{

        if(!randomUser.current){
            fetchUsersData()    
        } 
        
    },[]) 


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

            
        
            setLoading(false)
            
        }catch(err){
           
            console.log(err.message)

        }
        
    };


    function onPress(){

        // Socket is initialized after user is login
        socket.on("connect",()=>{
            console.log("client connect")

            // notify, user is active 
            socket.emit("online",randomUser.current.id) 
        }) 

        //listen active user
        socket.on("user_active", userId=>{
            console.log("bir kullanici giriş yapti",userId)
            // change active user online prop true
            dispatch({type:'UPDATE_USERS_ITEM_ONLINE' ,payload:{userId :userId,online:true}}) 
            
        })

        // listen deactive user
        socket.on("user_disconnect",userId=>{
            console.log("bir kullanici çikiş yapti",userId)
            // set active user online prop false
            dispatch({type:'UPDATE_USERS_ITEM_ONLINE' ,payload:{userId:userId, online:false}}) 

        }) 
        navigation.navigate('TopTabs')
    }


    return(
        <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'black', fontWeight:'bold',margin:30}}>Selected User </Text>
            { loading  ?
                <ActivityIndicator/> :

                <Text style={{color:'black', fontWeight:'bold',margin:30,fontSize:25}}>{randomUser.current.username}</Text>
            }
            <Button title ='Login' onPress={onPress}/>

        </View>

    )

}

export default Login