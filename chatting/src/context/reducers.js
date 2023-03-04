
import React from 'react'

function reducers(state,action){
    
    switch(action.type){

        case "SET_SELF_USER":
            const{selfUser}= action.payload;
                return {...state, selfUser:selfUser}

        case "REMOVE_SELF_USER":

            return {...state, selfUser: null}
        
        case "SET_USERS":
            const{users}= action.payload;
                return {...state, users:users}

        case "SET_PRIVATE_ROOMS":
            const{privateRooms}= action.payload;
                 return {...state, privateRooms:privateRooms}
        
        case "SET_PRIVATE_PARTICIPANTS":
            const{privateParticipants}= action.payload;
                    return {...state, privateParticipants:privateParticipants}
        
        case "SET_COMMUNITY_ROOMS":
            const{communityRooms}= action.payload;
                 return {...state, communityRooms:communityRooms}

    
        default:
            return state

    }
}

export default reducers