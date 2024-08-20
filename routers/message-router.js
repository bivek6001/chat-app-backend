const express=require('express');
const router= express.Router();
const {getMessage,sendMessage}= require("../controllers/message-controller.js")
const authentication= require("../middlewares/authentication.js");

router.post("/send/:id",authentication,sendMessage);
router.get("/get/:id",authentication,getMessage);



module.exports = router;