'use strict';
var Mongoose = require('mongoose');

var mainService = require('../services/mainService');

module.exports = {
	saveAgent: function(data) {
		mainService.saveAgent(data).then(function(resp) {
			console.log(resp);
		}, function(err) {
			console.log(err);
		});
	},
	removeAgent: function(id) {
		mainService.removeAgent(id, function(err, resp) {
			console.log(resp);
		});
	};
};