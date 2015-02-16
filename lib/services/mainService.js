'use strict';
var Mongoose = require('mongoose');

var agent = require('../models/agent');

module.exports = {
	saveAgent: function(data){
		return agent.create(data);
	},
	removeAgent: function(id, callback) {
		return agent.remove({_id: id}, callback);
	}
};