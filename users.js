const express =require('express');
const router = express.Router();
const { User , userValidate } = require ('../model/user')
const mongoose = require('mongoose');
const _ = require('lodash');


router.post('/' , async(req,res) =>{

    const { error } = userValidate(req.body)
      if(error){
          return res.status(404).send( error.details[0].message);
         }
let user = await User.findOne({email:req.body.email})//التحقق من الداتا بيس اذا موجود الايميل 
if(error){
  return res.status(404).send( 'User found in DataBase');
 }
 user = new User( _.pick(req.body),['fullname','email','password']);
  await user.save();
    res.send(_.pick(user,['fullname','email','gender']));
  });

  module.exports=router;