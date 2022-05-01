const nodemailer = require('nodemailer')
const {v4: uuidv4} = require("uuid")
const bcrypt = require("bcrypt") 
const dotenv = require('dotenv').config()          
const UserVerification = require('../models/UserVerification')

function sendVerEmail(email){
    //url to be used in the email 
    currentURL = "http://localhost:3000/"
    const uniqueString = uuidv4();

    //nodemailer staff 
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth:{
            user: "haseebarama@gmail.com",
            pass: "dana-12354",     
        }
    })  
    transporter.verify((error, success) =>{
        if(error){
            console.log("Failed to send Email" + error);
        }else{
            console.log("Email sent successfully")
        }
    })

//Step 2
    let mailOption = {
        from: 'Admin',       
        to: email, 
        subject: 'Reset Password Request', 
        html: `<p>Please click below to be able to reset your password, once you open this link it wont be valid anymore. </p>
         <a href = ${currentURL + "resetRequest/"+ email + "/" + uniqueString}> Click here </a>`
    };
    //hash the unique string

    hasheduniqueString = bcrypt.hash(uniqueString, 10)
    .then((hasheduniqueString) => {
        // seet values in 
        const newUserVer = new UserVerification({
            userId: _id, 
            uniqueString: hasheduniqueString, 
            createdAt: Date.now(),
            expiresAt: Date.now() + 2660000000,
        })
        newUserVer.save()
        .then(()=>{
            //step 3 
            transporter.sendMail(mailOption, function(err, data){
                if(err){
                    console.log("Error! " + err)
                }else{
                   console.log("Done !!!!!")
                }
            })
        })//then
    })
    .catch((e)=>{
        console.log("Error while hashing uuid ")
        res.render("newPassword", {message: "Please request another verification email"})
    })

}

module.exports = {sendVerEmail}