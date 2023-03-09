import  io  from "socket.io-client";
let socket ;

const connect =(userId)=>{
    socket = io("http://192.168.1.106:3000",{
        query: { userId: userId }
      });

}
export {socket,connect}
