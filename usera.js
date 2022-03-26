const mongoose = require('mongoose');
	const Schema = mongoose.Schema;
	const Joi = require('joi');

	const userSchema = new Schema({
	  name: {
		type: String,
		required : true
	  },
	  email : {
		type: String,
		required : true
	 },
	  password : {
	   type: String,
	   required : true
	 }
		});

	const User = mongoose.model("user", userScheme);

	const validate = (user) => {
		const schema = Joi.object({
		name: Joi.string().required(),
		email : Joi.string().email().required(),
		password : Joi.string().required()
			})
			return schema.validate(user)
	}
	module.exports = { User, validate }
    const {User, validate} = require("../models/user")
    const express = require('express');
const router = express.Router();

router.post("/", asyne(req, res))=> {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.detaiis[O].message
    };

    const user = await new User(req.body).save();

    res.send(user)
}
catch (error) {
    res.send("An error occured");
    console.log(error);
}
);
        module.exporrts = router;


