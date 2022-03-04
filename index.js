const express = require('express');
const app = express();
//const db = require('./db')
const mongoose = require('mongoose');
const Joi=require('joi');
const users = require("./routes/users")
//const bcrypt = require('bcrypt');
//const _= require('lodesh');
const httpServer=express();
mongoose.connect('mongodb://localhost:27017/' ,{
userNewUrlparser:true,
useUnifiedTopology:true
})
.then(()=> console.log("connected to DataBase..."))
.catch((error) => console.error('Error: '+error));
//mongoose.set('useCreateIndex',true);

const userss=[
{ fullname: "jana mousa", email : "janamousa@gmail.com" , password : "12345678" , grnder : "f"},
{fullname: "lamees mousa", email : "lameesmousa@gmail.com" , password : "129875678", grnder : "f"},
{fullname: "aseel mousa", email : "aseelmousa@gmail.com" , password : "345345678", grnder : "f"}

];


app.use(express.json());
app.use('/api/users',users);


app.get('/',(req,res)=>{
res.send("webbbbbb");
});

app.get('/api/users',(req,res)=>{
    res.send(userss);
});
app.post('/api/users',(req,res)=>{
    const users={
        fullname:req.body.fullname,
        email:req.body.email,
        password:req.body.password

    }
    userss.push(users);
    res.send(users);
});
const port = process.env.port || 3000;
app.listen(port,()=> console.log('App working on port '+port+'...'));
//rrrrr