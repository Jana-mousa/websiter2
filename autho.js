 const mongoose=require('mongoose')
 const express =require ('express');
const app = express();
const {testUser}=require('./user');
 const _ =require('lodash'); 
 const bcrypt =require ('bcrypt');
 const Joi=require ('Joi');
 const parser = require('body-parser')
//const { FindOperators } = require('mongoose/node_modules/mongodb');
//router.use(parser.urlencoded({ extended: true }))

app.post ('/login' ,async(req,res, next)=>{
    /*const {error}=validate(req.body)
      if(error){
          return res.status(404).send(error.details[0].message);
      }*/
      let user =await testUser.findOne({ email : req.body.email})
      if (!user){
        return res.status(404).send('invalid email or password');
      }
      let checkpass;
     if(req.body.password===user.password){
      checkpass = true;
     }
      if (!checkpass){
        return res.status(404).send('invalid email or password');
      }
        res.send('Welcome to your page')
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
module.exports = app
