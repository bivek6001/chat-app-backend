const jwt= require("jsonwebtoken");


const authentication= async(req, res, next) => {

    try {
        const token= req.cookies.token
        if(!token){
            return res.status(401).json({
                message:"No token, authorization denied",success:false});
        }
        const decode= await jwt.verify(token,"secret");
        if(!decode){
            return res.status(401).json({
                message:"Token is not valid",success:false
            });
        }

        req.id= decode.id;
        next();

    } catch (error) {
        return res.status(500).json({
            message:error.message,success:false

        })
        
    }







}
module.exports =authentication;