var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var catSchema = new Schema ({ //camel case for schema
	name : String,
	age : Number,
	cuteness : Number, 
	birthday : Date,
	friends : [{
		Id: {type: Schema.Types.ObjectId, ref: 'Cat'},
		name: String
	}],
	enemies : [{
		Id: {type: Schema.Types.ObjectId, ref: 'Dog'},
		name: String
	}]
});

module.exports = mongoose.model('Cat', catSchema); //capital letter for model

