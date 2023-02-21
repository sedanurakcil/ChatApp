import React  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TopTabs from './TopTabs';

import JoinScreen from '../screens/JoinScreen/JoinScreen';
import Chat from '../screens/Chat/Chat';
const Stack = createStackNavigator();




const Router =() =>{

  return (
    
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='JoinScreen'>
          
            <Stack.Screen name="TopTabs" component={TopTabs} />
            <Stack.Screen name="JoinScreen" component={JoinScreen} />
            <Stack.Screen options={({ route }) => ({ title: route.params.name ,headerShown:true})}
                          name="Chat" component={Chat} />

           </Stack.Navigator>
         </NavigationContainer>
        
  );
  }

  export default Router