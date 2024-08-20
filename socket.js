const express= require("express")
const http= require("http")

const app= express()
const server= http.createServer(app)
const {Server}= require("socket.io")


let io= new Server(server,{
    cors: {
        origin: ["https://chat-app-frontend-8pkm.onrender.com"],
        methods: ["GET", "POST"]
    }
}
    
);
let userSocketMap= {
}
function getReceiverId(id){
    return userSocketMap[id];
 
}
io.on("connection",(socket)=>{
    console.log("User connected",socket.id);
    const userId=socket.handshake.query.userId
   if(userId!==undefined){
    userSocketMap[userId]=socket.id;
   }
   io.emit("getOnlineUser",Object.keys(userSocketMap));

   socket.on("disconnect",()=>{
    console.log("User disconnected",socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUser",Object.keys(userSocketMap));
   })
})

module.exports ={io,server,app,getReceiverId}