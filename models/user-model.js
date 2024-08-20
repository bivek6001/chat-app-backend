const mongoose = require('mongoose');
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
     
            type:String,
         required:true,
            unique:true
        
    },
    password:{
        type:String,
        required:true,

    },
    image:{
        type:String,
        default:"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724112000&semt=ais_hybrid"

    },
    bio:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        enum:["Male","Female","Other"]
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    post:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    bookmarks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }]




},{timestamps:true});

module.exports=mongoose.model('User',userSchema);