const express = require('express')
const bodyParser = require('body-parser')
const session =  require("express-session")
const bcrypt = require('bcrypt')
const db = require("../models/user")
const UserV = require("../models/UserVerification")
const mongoose = require("mongoose")
const cookiesParser = require("cookie-parser")
require("dotenv").config()
const emailSender = require("../config/email")

const router = express.Router()
router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
router.use(cookiesParser());
//const pages = require('../routes/pages')
//router.use('/', require('../routes/pages'))

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))


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


router.post("/login", (req, res)=>{
     let {email, password} = req.body;
    db.User.find({email: email})
    .then(async result => { 
        console.log(result[0].email)  
        if(result[0].verified){
            if(await bcrypt.compare(password, result[0].password)){
                res.redirect(`/welcome/${result[0].fullName}`)
            }else{
                res.render("login", {failMessage:"Please make sure from your email or password"})   
            }//if for password comparison
        }else{//if for user verification     
            res.render("login", {failMessage:"Please check your email inbox to verify your account so you can log in successfully"})   
        } 
    })
    .catch((e) => {
        console.log("Error while retrieving the user" + e)
        res.render("login", {failMessage:"Please try to lo log in again"})
    })
})

module.exports = router
