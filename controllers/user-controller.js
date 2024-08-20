
const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken")
const User= require("../models/user-model.js")
const signup= async(req,res)=>{
try {

    const {username,email,password}= req.body;
    if(!username || !email || !password){
        return res.json({message:"Please fill all fields",success:false});

    }
  const exist= await User.findOne({email});
//   console.log(exist)
if(exist){
    return res.status(400).json({message:"Email already exists",success:false});
}

        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);
    const newUser= await User.create({
        username,email,password:hashedPassword
    })
    return res.json({message:"User registered successfully",success:true});

} catch (error) {

    return res.json({message:error.message,success:false});
    
}
}


const signin = async (req, res) => {



    try {
        const {email, password} = req.body;

        if (!email ||!password) {
            return res.json({message: "Please fill all fields", success: false});
        }
        const user= await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "User not found", success: false});
        }
        const match= await bcrypt.compare(password,user.password);
        if(!match) {
            return res.json({message: "Incorrect password", success: false});
        }
        const token= await jwt.sign({id:user._id},"secret");
       return res.cookie("token",token).json({message: "user authenticated",success: true,user});

        
    } catch (error) {
        return res.json({message:error.message,success:false});
        
    }
}


const logout = (req, res) => {


try {
   return res.cookie("token","",{maxAge:0}).json({message:"user logged out",success:true});
    
} catch (error) {
    return res.status(500).json({message:error.message,success:false});
}




}


const getProfile =async (req, res) => {

    try {
        const id= req.params.id;
        const user= await User.findById(id);
        return res.json({message:user,success:true});
        
    } catch (error) {
        
    }
}
const suggestions= async (req, res) => {
    try {

        const suggestedUsers= await User.find({_id:{$ne:req.id}}).select("-password");
        if(!suggestedUsers){
            return res.status(400).json({message:"No users found",success:false});
        }
        return res.status(200).json({suggestedUsers,success:true});


    } catch (error) {
    return res.status(500).json({message:error.message,success:false});

        
    }
}

const followUnfollow= async (req, res) => {

    try {
        const followkrnewala= req.id;
        const jiskofollowkarunga= req.params.id
        if(followkrnewala===jiskofollowkarunga){
            return res.status(400).json({message:"You can't follow yourself",success:false});
        }
        const user= await User.findById(followkrnewala);
        const targetUser=await User.findById(jiskofollowkarunga);
        if(!user || !targetUser){
            return res.status(400).json({message:"User not found",success:false});
        }

        const isFollowing= await user.following.includes(jiskofollowkarunga);
        if(isFollowing){
            //unfollow logic
            await Promise.all([
                User.updateOne({_id:followkrnewala},{$pull:{following:jiskofollowkarunga}}),
                User.updateOne({_id:jiskofollowkarunga},{$pull:{followers:followkrnewala}})
            ])
            return res.status(200).json({success:true, message:"user unfollowed successfully"})

        }
        else{
            //follow logic
            await Promise.all([
                User.updateOne({_id:followkrnewala},{$push:{following:jiskofollowkarunga}}),
                User.updateOne({_id:jiskofollowkarunga},{$push:{followers:followkrnewala}})
            ])
            return res.status(200).json({success:true, message:"user followed successfully"})

        }

        
    } catch (error) {
        return res.status(500).json({message:error.message,success:false});
    }
}

module.exports={
    signup,signin,logout, getProfile, suggestions, followUnfollow
}