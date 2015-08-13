var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var dogSchema = new Schema ({ //camel case for schema
	name : String,
	age : Number,
	cuteness : Number, 
	birthday : Date,
	friends : [{
		Id: {type: Schema.Types.ObjectId, ref: 'Dog'},
		name: String
	}],
	enemies : [{
		Id: {type: Schema.Types.ObjectId, ref: 'Cat'},
		name: String
	}]
});

module.exports = mongoose.model('Dog', dogSchema); //capital letter for model

