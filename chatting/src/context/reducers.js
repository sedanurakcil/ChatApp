
import React from 'react'

function reducers(state,action){
    
    switch(action.type){

        case "GET_START":
            return {...state, message:"",}
        
        case "SET_SELF_USER":
           return {...state, selfUser:action.payload}

        case "REMOVE_SELF_USER":

            return {...state, selfUser: null}
        
        case "GET_USERS_SUCCESS":
            return {...state, users: action.payload}

        case "GET_ERROR":
            return {...state, message:action.payload}


        case "GET_PRIVATE_ROOMS_SUCCESS":
            return {...state, privateRooms:action.payload}
        
        case  "CREATE_PRIVATE_ROOM":
            return {...state,
                    privateRooms:{
                        ...state.privateRooms,
                        rooms:[...state.privateRooms.rooms, action.payload],
                    },
            };

        case "UPDATE_USERS_ITEM_ONLINE":
            const {userId,online} = action.payload;
            // find user index in users array
            let foundIndex = state.users.findIndex(user => user.id == userId)
            // if there is user, update 
            if(foundIndex != -1){
                let users_update = [...state.users];
                users_update[foundIndex]= {...users_update[foundIndex], online:online}
                return {...state, users:users_update}

            }
            else{
                return state
            }
            
        
        case "UPDATE_PRIVATE_MESSAGE":
            const {roomId,message} = action.payload;
            
            // find the room that add message
            let foundIndexRoom = state.privateRooms.rooms.findIndex(room => room.roomId == roomId) 
            // if has room , copy the rooms and update  
            if(foundIndexRoom != -1){
                let rooms_update = [...state.privateRooms.rooms]
                rooms_update[foundIndexRoom] = {...rooms_update[foundIndexRoom], messages: [message, ...rooms_update[foundIndexRoom].messages]}
                // add the updated rooms to state
                return {...state,
                    privateRooms:{
                        ...state.privateRooms,
                        rooms:rooms_update,
                    },
                };

            }

            else{
                return state
            }

        
        case "SET_COMMUNITY_ROOMS":
            const{communityRooms}= action.payload;
                 return {...state, communityRooms:communityRooms}

    
        default:
            return state

    }
}

export default reducers