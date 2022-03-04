const express =require('express');
const router = express.Router();
const { User , userValidate } = require ('../data')
const mongoose = require('mongoose');


router.post('/' , async(req,res) =>{

    const { error } = userValidate(req.body)
      if(error){
          return res.status(404).send( error.details[0].message);
         }
       const user = new User({
           fullname:req.body.fullname,
           email:req.body.email,
           password:req.body.password
       });
      await user.save();
       res.send(user);
  });

  module.exports=router;