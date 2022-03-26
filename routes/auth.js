const { Router } = require("express");
const express=require("express");
const rotuer=express.Router();
 const{signup,activateAccount}=reguire("../rotur/users");

 Router.post('/signup-activate',activateAccount)

 module.exports=router;

