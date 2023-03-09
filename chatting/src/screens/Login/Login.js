import React,{useEffect,useState} from 'react'
import {View,Text,Button, ActivityIndicator} from 'react-native'
import { useDispatch,useSelector } from 'react-redux'
import {socket,connect}  from '../../utils/socket'
import { fetchUsers,fetchPrivateConv} from '../../context/actions'

const Login = ({navigation}) => {

    const dispatch = useDispatch()
    const selfUser = useSelector(state=>state.selfUser)
    const [loading,setLoading] = useState(true)
 
    
    useEffect(()=>{
        // fetch users and add redux structure
        dispatch(fetchUsers())
    },[]) 
    

    useEffect(()=>{
        // fetch private conversation and add redux structure
        if(selfUser){
            dispatch(fetchPrivateConv(selfUser.id))
            setLoading(false)
        }
    },[selfUser])

    
    function onPress(){
        // Socket is initialized after user is login and notify user is active 
        if(selfUser){
            connect(selfUser.id)
        }
        
        //listen active user
        socket.on("user_active", userId=>{
            // change active user online prop true
            dispatch({type:'UPDATE_USERS_ITEM_ONLINE' ,payload:{userId :userId,online:true}}) 
            
        })

        // listen deactive user
        socket.on("user_disconnect",userId=>{
            // set active user online prop false
            dispatch({type:'UPDATE_USERS_ITEM_ONLINE' ,payload:{userId:userId, online:false}}) 

        }) 

        navigation.navigate('TopTabs')
    }


    return(
        <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'black', fontWeight:'bold',margin:30}}>Selected User </Text>
            { loading  ?
                <ActivityIndicator/>
                :

                 <Text style={{color:'black', fontWeight:'bold',margin:30,fontSize:25}}>{selfUser.username}</Text>
            }
            <Button title ='Login' onPress={onPress}/>

        </View>

    )

}

export default Login