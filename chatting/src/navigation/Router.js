import React  from 'react';
import {Image,View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TopTabs from './TopTabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Login  from '../screens/Login';
import Chat from '../screens/Chat/Chat';
import PublicChat from '../screens/PublicChat';
const Stack = createStackNavigator();

function LogoTitle({route,navigation}) {
  return (

    <View style={{flexDirection:'row'}}>

      <Icon style = {{marginTop:5}}name='arrow-left' size={25} onPress={()=>{navigation.goBack()} } color='white' />

      <Image
        style={{width: 40, height: 40, borderRadius:20}}
        source={{uri:route.params.avatar}}> 
       </Image>

    </View>
  );
}


const Router =() =>{

  return (
    
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false}} >
           
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="TopTabs" component={TopTabs}/>

              <Stack.Screen name="Chat" component={Chat} 
                            options={({ route,navigation }) => ({ 
                              headerTitle:route.params.userName,
                              headerLeft:()=> <LogoTitle route={route} navigation={navigation}/>,
                              headerShown:true,
                              headerTintColor:'white',
                              headerStyle: {
                                  backgroundColor:`#9370db`
                                },
                            })}/>
              <Stack.Screen 
                  name="PublicChat" 
                  component={PublicChat} 
                  options={({ route ,navigation}) =>

                       ({ headerTitle:route.params.roomName,
                          headerLeft:()=> <LogoTitle route={route} navigation={navigation}/>,
                          headerShown:true,
                          headerTintColor:'white',
                          headerStyle: {
                              backgroundColor:`#9370db`
                            },
                        })}
              />

           </Stack.Navigator>
         </NavigationContainer>
        
  );
  }

  export default Router