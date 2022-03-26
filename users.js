const express =require('express');
const router = express.Router();
const { testUser} = require ('./user')
const mongoose = require('mongoose');
const parser = require('body-parser')
//const { FindOperators } = require('mongoose/node_modules/mongodb');
router.use(parser.urlencoded({ extended: true }))
mongoose.connect('mongodb://localhost:27017/authSystem')
.then(()=>{
    console.log("Connected")
})
.catch((e)=>{
    console.log("Failed" + e)
}) 
const _ = require('lodash');
const bcrypt = require('bcrypt');


router.post('/register' , async(req,res) =>{
  console.log("Body = ", req.body)
     let newUsertoAdd = await testUser.findOne({email : req.body.email});
     //console.log(newUser)//التحقق من الداتا بيس اذا موجود الايميل 
     if(newUsertoAdd != null){
     return res.status(404).send( 'User found in DataBase'); 
     }
     let newUser1 = _.pick((req.body),['fullName','email','password']);
     newUser1 = new testUser(newUser1);
      let newUser = new testUser(_.pick((req.body),['fullName','email','password'])); 
      const saltRounds = 10;
      const salt = bcrypt.genSalt(saltRounds)  ; //genSalt(saltRounds); 
      console.log("This is the password " + newUser.password)
      let test;
      //newUser.password = await bcrypt.hash(newUser.password, 8)  
      //newUser.password = 
      /*
      .then(()=>{console.log('hased')})
      .catch(()=>{console.log('cannot hash it')})
      */
      //console.log(await bcrypt.hash(newUser.password, 8))
      ifNull = testUser(newUsertoAdd);
      newUser.save()
      console.log('if null' + ifNull)
      console.log(newUser)
        res.render('login')
      })

  module.exports = router;


  /*//This file will simulate the data base 
////hashing the password
const saltRounds = 10;
const salt = await bcrypt.genSalt(saltRounds);
user.password = await bcrypt.hash(user.password, salt);
 */
