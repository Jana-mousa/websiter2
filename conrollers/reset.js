const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")  
const db = require("../config/db") 
const methodOverride = require("method-override")  
router.use(methodOverride("_method"))   
const db = require("../models/user")
const UserV = require("../models/UserVerification")            
passEmail = require('../config/passwordRequest')  



router.get("/user/verify/:userId/:uniqueString", (req, res)=>{
    let {userId, uniqueString} = req.params;
    UserV.find({userId})
    .then((result) => {    
        if(result.length > 0){
            //user ver record existsso we proceed
            const {expiresAt} = result[0];
            const hashedUni = result[0].uniqueString;
            if(expiresAt < Date.now()){
                //record has expired so we delete it 
                UserV.deleteOne({userId})
                .then(result =>{
                    db.User.deleteOne({_id: userId})
                    then(()=>{
                        res.render("register", {message: "Please try to sign up again because the link expired"})    
                    })
                    .catch((e)=>{
                        console.log("Error while deleting the record")
                    })
                })
            }else{
                //Valid verification record 
                bcrypt.compare(uniqueString, hashedUni)
                .then(result => {
                    if(result){
                        //string is valid and this is the verification 
                        db.User.updateOne({_id: userId}, {verified: true})
                        .then(()=>{
                            console.log("Updated succede")
                            UserV.deleteOne({userId})
                            .then(()=>{
                                res.render('login')
                            })
                            .catch((e)=>{
                                console.log("Didnot update the ver record" + e)
                                res.render("register", {message: "Check your inbox again please"}) 
                            })
                        })
                        .catch((e)=>{
                        console.log("Didnot update the ver record" + e)
                        res.render("register", {message: "Check your inbox again please"})    
                    }) 
                    }else{  
                        res.render("register", {message: "Check your inbox again please"})    
                    }
                })
                .catch((e) => {
                    console.log("Error while comparing the hashed unique string")
                    res.render("register", {message: "Please try to sign up again hashed string"})    
                })
            }       
        }else{
        res.render("register", {message: "Please try to sign up again"})    
        }
    })
    .catch((e)=>{
        console.log("Error while verification in its router "+ e)
        res.render("register", {message: "Please try to sign up again"})
    })

})
