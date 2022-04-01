const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const db = require("../models/user")
const UserV = require("../models/UserVerification")
const mongoose = require("mongoose")
const emailSender = require("../config/email")

const router = express.Router()
router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
router.use(cookiesParser());


router.post("/register", (req, res, next)=>{
    const { name, email, password, passwordConfirm} = req.body;//destructuring
    const user = new db.User({
        fullName: name,
        email: email, 
        password: password, 
        verified: false
    })
    const {error, value} = db.userValidate(user)
    if(error){
        return res.render("register", {message: error.message})    
    }

    let hashedPassword
    db.User.find({email: user.email})
    .then(async (result)=>{
        if(result.length > 0){
            return res.render("register", {message: "Tha email is already in use"})
        }//if
        else if(password !== passwordConfirm){
            return res.render("register", {
                message: "Please write your correct password when confirming it"
            })
        }//else if 
        hashedPassword = await bcrypt.hash(password, 8).then(
            console.log("hashed")
        ).catch((error)=>{
            console.log(error + "Password didnot hashed")
        })     
        user.password = hashedPassword
        user.save()
        .then((result) =>{
            //handle account verification 
            emailSender.sendVerEmail({_id: result._id, email: result.email})
        })
        .catch((error)=>{
            console.log("Error while saving the user")
            return res.render("register", {
                message: "Cannot register please try again later"
            })
        })
        return res.render("register", {
            sucMessage: "User Registered Succefully, please check your email to verify it"
        })//render
    })//then       
})//post 


//Talas
router.get("/user/verify/:userId/:uniqueString", (req, res)=>{
    //Talas

})

//Mayas 
router.post("/login", (req, res)=>{
    //mayas
})

module.exports = router
