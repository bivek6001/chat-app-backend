const mongoose=require('mongoose');

async function connection(){
    try{
        await mongoose.connect("mongodb+srv://bivekwangkhem6001:9101142599r@cluster0.kobyj.mongodb.net/")
        console.log('Connected to MongoDB');


    }catch(e){
        console.error('Connection Error:', e.message);
        
    }
    
}

module.exports = connection;