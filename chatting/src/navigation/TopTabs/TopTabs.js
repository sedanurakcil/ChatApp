import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


import Users from '../../screens/Users';
import Messages from '../../screens/Messages';
import Community from '../../screens/Community';



const TopTabs = ()=>{

    return(
      <Tab.Navigator>

      <Tab.Screen name='Users' component={Users}/>
      <Tab.Screen name='Messages' component={Messages}/>
      <Tab.Screen name='Community' component={Community}/>
 
    </Tab.Navigator>

    )
  }

 

export default TopTabs