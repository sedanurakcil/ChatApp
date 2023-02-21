import React,{useState} from 'react'
import {View,TextInput,Text,Button} from 'react-native'
import { useDispatch } from 'react-redux'

const JoinScreen = ({navigation}) => {

    const dispatch= useDispatch()

    const [username, setName]= useState("")
    return(
        <View style={{alignItems:'center',justifyContent:'center'}}>

            <Text style={{color:'black', fontWeight:'bold',margin:40}}>Users Join</Text>
            <TextInput placeholder = "Enter username" onChangeText={text=>setName(text)
            }/>
            <Button title ="Join Chat" 
                    onPress={
                            ()=>{dispatch({type:"server/join", data: username})
                            navigation.navigate("TopTabs")
                        }}
            />

        </View>

    )


}

export default JoinScreen