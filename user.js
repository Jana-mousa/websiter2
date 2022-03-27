const mongoose = require('mongoose');
const Joi = require('joi')

mongoose.connect('mongodb://localhost:27017/authSystem')
.then(()=>{
    console.log("Connected")
})
.catch((e)=>{
    console.log("Failed" + e)
}) //Promis

// mongoose.model vs mongoose schems
const testUser = mongoose.model('testUser', new mongoose.Schema({
    fullName:{
        type: String, 
        required: true, 
        minlength: 3,
        maxlength: 100,
    },
    email:{
        type: String, 
        required: true, 
        unique: true,     
    },
    password:{
        type: String, 
        required: true, 
        minlength: 8,
        maxlength: 1000,//password has a huge maxLength to be able to hash it to prevent hacking
    }
}))

function userValidate(user){
    const myschema = Joi.object(
     {
        fullName: Joi.string().min(3).max(100).required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8)
    }
    )
    return myschema.validate(user)
    //ValidationError(user, schema);
}
let models = mongoose.modelNames()
exports.testUser = testUser; 
exports.userValidate = userValidate;
