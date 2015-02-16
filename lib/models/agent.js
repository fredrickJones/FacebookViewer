'use strict';
var Mongoose = require('mongoose'),
	Schema = Mongoose.Schema;

var schema = new Schema({
	name: {type: String, required: true, unique: true},
	age: {type: Number, min: 16, max: 45},
	nationality: {type: String, enum: ['British', 'English', 'Irish', 'Welch', 'Scottish']},
	occupation: String,
	licenseToKill: {type: Boolean, default: true},
	weapons: [{
		kind: { type: String, required: true },
		name: { type: String, required: true },
		numberOfRounds: { type: Number, required: true }
	}]
})

module.exports = Mongoose.model('Agent', schema);
})