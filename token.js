const monogoose = require('mongoose');
	const Schema = mongoose.Schema;

	const tokenSchema = new Schema({
	  userld: {
		type: Schema.Types.Objectld,
		required : true,
		ref:"user"
	},
	  token : {
		type: String,
		required : true
	},

	  createdAt : {
		type: Date,
		default: Date.now,
		expires : 3600
	   }
		});

	module.expires = mongoose.model("token", tokenSchema)
