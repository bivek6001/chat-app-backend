const express=require('express');
const router= express.Router();
const {signup,signin,logout, getProfile, suggestions, followUnfollow}= require("../controllers/user-controller.js")
const authentication= require("../middlewares/authentication.js");

router.post("/signup",signup);
router.post("/signin",signin);
// router.get("/logout",logout);
// router.get("/profile/:id",authentication,getProfile);
router.get("/suggested",authentication,suggestions);
// router.post("/followorunfollow/:id",authentication,followUnfollow);
// router.get()


module.exports=router;