const express =require('express');
const router = express.Router();
const { User , userValidate } = require ('../model/user')
const mongoose = require('mongoose');
const _ = require('lodash');

const jwt=require('jsonwebtoken');



const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox4fa2919e28524bcbbb72f4160beb15c1.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});



router.post('/' , async(req,res) =>{

    const { error } = userValidate(req.body)
      if(error){
          return res.status(404).send( error.details[0].message);
         }
let user = await User.findOne({email:req.body.email})//التحقق من الداتا بيس اذا موجود الايميل 
if(error){
  return res.status(404).send( 'User found in DataBase');
 }

 
 const token=jwt.sign({fullname,email,password},process.evn.JWT_ACC_ACTIVATE,{expiresIn:'20m'})
 

 const data = {
    from:'noreply@hello.com',
    to:email,
    subject:'Account Activation Link',
    html:`
    <h2>Please click on given link to activate you account</h2>
    <p>${process.env.CLIENt_URL}/authentication/activate/${token}</p>
    `
};
mg.messages().send(data, function (error, body) {
    if(error){
    return res.json({
        error:err.message
    })
}
return res.json({massages:'Email has been sent, kindly activate your account'});
});


exports.activateAccount=(raq,res)=>{
  const {taken}=req.body;
  if(token){
      jwt.verify(token,process.env.JWT_ACC_ACTIVATE,function(err,decodedToken){
          if(err){
              return res.status(400).json({error:'Incorrect or Expired link.'})
          }

          const {namr,email,password}=decodedToken;
          user.finedOne({email}).exec((err,user)=>{
              if(user){
                  return res.status(400).json({error:"user whit this email already exists."});
              }
              let newUser=new user({fullname,email,password});
              newUser.save((err,success)=>{
               if(err){
                   console.log("Error in singup while account activation: ".err);
                   return res,status(400).json({error:'Error activating account'})
               }
               res.json({
                   massage:"Singup success!"
               })
              })
          })
      })

  }else{
      return res.json({error:"Something went wrong!!!"})
  }
}   




 
  });



  module.exports=router;
