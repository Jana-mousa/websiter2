 const mongoose=require('mongoose')
 const express =require ('express');
const router = express.Router();
const {testUser}=require('./user');
 const _ =require('lodash'); 
 const bcrypt =require ('bcrypt');
 const Joi=require ('Joi');
 const parser = require('body-parser')
//const { FindOperators } = require('mongoose/node_modules/mongodb');
router.use(parser.urlencoded({ extended: true }))

router.post ('/login' ,async(req,res, next)=>{
    /*const {error}=validate(req.body)
      if(error){
          return res.status(404).send(error.details[0].message);
      }*/
      let user =await testUser.findOne({ email : req.body.email})
      if (!user){
        return res.status(404).send('invalid email or password');
      }
      const checkpass= await bcrypt.compare(req.body.password,user.password);
      if (!checkpass){
        return res.status(404).send('invalid email or password');
      }
        res.send('ok')
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
module.exports = router
