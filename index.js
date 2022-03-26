const express = require('express');
const app = express();
//const db = require('./db')
const mongoose = require('mongoose');
const Joi = require('joi');
const users = require("./users")
const bcrypt = require('bcrypt');
const _ = require('lodash');
const ejs = require('ejs')
const authe = require('./autho')
mongoose.connect('mongodb://localhost:27017/authSystem')
.then(()=>{
    console.log("Connected")
})
.catch((e)=>{
    console.log("Failed" + e)
}) //Promis

//mongoose.set('useCreateIndex',true);

app.use(express.json());
app.use('/api/users',users);
app.use('/api/users',authe);
app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    res.render("register");
});
    
app.get('/login',(req,res)=>{
    res.render("login");
});

app.get('/api/users',(req,res)=>{
    res.send("hello");
});

/*app.post('/api/users/register',(req,res)=>{
    
   /* const users={
        fullname:req.body.fullname,
        email:req.body.email,
        password:req.body.password

    }
    userss.push(users);
    res.send(userss);
});*/


const port = process.env.port || 3000;
app.listen(port,()=> console.log('App working on port '+port+'...'));
