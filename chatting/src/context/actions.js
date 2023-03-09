import axios from 'axios';

export const  fetchUsers = ()=>{
    return async (dispatch)=>{
        dispatch({type:"GET_START"}) 
        try{
            // get users from server
            const {data} =  await axios.get('http://192.168.1.106:3000/users')
            let users = data

            //select random user
            const randomUser= users[Math.floor(Math.random() * users.length)];
            
            // add self user and users to redux structure
            dispatch({type:'SET_SELF_USER' ,payload:randomUser }) 
            
            // filter users by selected user 
            users =  users.filter(user => user.id !== randomUser.id)

            dispatch({type:"GET_USERS_SUCCESS" ,payload:users}) 
            
        }catch(error){
        
            dispatch({type:"GET_ERROR" ,payload:error.message}) 
        }}
    
};

// get private conv from server
export const  fetchPrivateConv = (selfUserId)=>{
    return async (dispatch)=>{
        dispatch({type:"GET_START"}) 
        try{
            const {data} =  await axios.get(`http://192.168.1.106:3000/conversations/private?userId=${selfUserId}`)

            // fetch all private rooms that have selfUser's id in their participants
            dispatch({type:"GET_PRIVATE_ROOMS_SUCCESS" ,payload:data}) 
            console.log("loginprivateCONV",data)


        }catch(error){
            dispatch({type:"GET_ERROR" ,payload:error.message}) 
        }
    }    
}

// create room for private conversations
export const createPrivateRoom = (roomId,selfUserId,receiveId)=>{
        return (dispatch)=>{
            let  room_property =  { 
                participants: [selfUserId, receiveId],
                messages: [],
                roomId : roomId
            }
        console.log("actionss",room_property)
        dispatch({type:"CREATE_PRIVATE_ROOM" ,payload:room_property}) 
        }
}


