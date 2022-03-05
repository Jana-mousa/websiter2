const express =require ('express');
const router=express.Router;
const {User ,uservalidate}=require('../model/user');
 const mongoose=require('mongoose');
 const _ =require('lodash'); 
 const bcrypt =require ('bcrypt');
 const Joi=require ('Joi');
router.post ('/' ,async(req,res)=>{
    const {error}=validate(req.body)
      if(error){
          return res.status(404).send(error.details[0].message);
      }
      let user =await User.findOne({ email : req.body.email})
      if (!user){
        return res.status(404).send('invalid email or password');
      }
      const checkpass= await bcrypt.compare(req.body.password,user.password);
      if (!checkpass){
        return res.status(404).send('invalid email or password');
      }
        res.send('ok')
});
function validate(req){
    const schema ={
        email:Joi.string().min(8).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    }
    return Joi.validate(req,schema)

}
