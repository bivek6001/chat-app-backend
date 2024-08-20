const express=require("express");
const cors= require("cors");
const cookieParser= require("cookie-parser");
const {server,app}= require("./socket.js")
const connection= require("./db.js")
const userRoutes= require("./routers/user-router.js")
const messageRoutes= require("./routers/message-router.js")

// const app= express();
connection();
//middlewares
app.use(cors(
    {
        credentials:true,
        origin:"https://chat-app-frontend-8pkm.onrender.com" 
    }
));
app.use(express.json());
app.use(cookieParser());
app.use("/user",userRoutes);
app.use("/message",messageRoutes);



server.listen(9000,()=>{
    console.log("Server is running on port 9000");
})