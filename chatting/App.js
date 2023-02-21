import React  from 'react';

import Router from './src/navigation/Router';

import { legacy_createStore as createStore,applyMiddleware} from 'redux'
import createSocketIoMiddleware from 'redux-socket.io';
import {Provider} from 'react-redux'
import io from 'socket.io-client'

const socket= io("http://192.168.1.106:3000")

const socketIoMiddleware = createSocketIoMiddleware(socket,"server/")

function reducer(state={conversations:{}},action){

  switch(action.type){

    case 'message':
      return{...state, message:action.data }

    case "users_online":

      const conversations= {...state.conversations}
      const usersOnline = action.data

      for(let i = 0; i<usersOnline.length; i++){
        const userId = usersOnline[i].userId
        // conversation ın kendi id si olacak
        if(conversations[userId]=== undefined){
           conversations[userId] = {
            messages: [],
            user:usersOnline[i]
           }
        }

      }
      return{...state, usersOnline,conversations }
    

    case "private_message":
      
      const conversationId = action.data.conversationId;

      return{
        ...state,
        conversations:{
          ...state.conversations,
          [conversationId]:{
            ...state.conversations[conversationId],
            messages:[
              action.data.message,
              ...state.conversations[conversationId].messages

            ]
          }

        }
      }

    case "self_user":
      return{...state, selfUser:action.data }

    default:
      return state;
  }
}

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer)

store.subscribe(()=>{
  console.log("new state", store.getState())
})

store.dispatch({type:"server/hello", data:"HELLO"})

const App =() =>{

  
  return (
    <Provider store = {store}>
          <Router/>
         </Provider>
  );
  }

  export default App