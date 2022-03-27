const express =require ('express');
const router=express.Router();
const {User ,uservalidate}=require('../model/user');
 const mongoose=require('mongoose');
 const _ =require('lodash'); 
 const bcrypt =require ('bcrypt');
 const Joi=require ('Joi');
 const parser = require('body-parser')
 
 router.use(parser.urlencoded({ extended: true }))
 
router.post ('/login' ,async(req,res)=>{
    /*const {error}=validate(req.body)
      if(error){
          return res.status(404).send(error.details[0].message);
      }*/
      let user =await User.findOne({ email : req.body.email})
      if (!user){
        return res.status(404).send('invalid email or password');
      }
      let checkpass = false;
      if(req.body.password === user.password){
             checkpass = true; 
      }
      if (!checkpass){
        return res.status(404).send('invalid email or password');
      }
        res.send('Login succeded!')
});
/*
function validate(req){
    const schema ={
        email:Joi.string().min(8).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    }
    return Joi.validate(req,schema)

}
*/
