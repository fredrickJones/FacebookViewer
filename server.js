'use strict';
// modules
var Express = require('express'),
	Session = require('express-session'),
	Passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy,
	Mongoose = require('mongoose'),
	BodyParser = require('body-parser'),
	MongoJS = require('mongojs');

// files
var fakeData = require('./seed-data'),
	controller = require('./lib/controllers/mainCtrl'),
	agent = require('./lib/models/agentModel');

// environment variables
var app = Express();
var port = 8080;
var mongoURI = 'localhost:27017/facebook-mongo';

// middleware
app.use(Session({secret: 'Feidnow83i372ifADFGjuw823ueojygis'}));
app.use(Passport.initialize());
app.use(Passport.session());

app.use(BodyParser.json());

// save agent
controller.saveAgent(fakeData.agents[1]);

app.post('/api/agent', function(req,res) {
	agent.create(req.body).then(function(resp) {
		res.json(resp);
	}, function(err) {
		res.status(500).json(err);
	});
});

agent.remove({_id: ''}, function(err, resp) {

});
controller.removeAgent('');

Passport.use(new FacebookStrategy({
	clientID: '1556041261332848',
	clientSecret: '532f32b3dececb0264a0647982e70fc4',
	callbackURL: 'http://localhost:8080/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
	return done(null, profile);
}));

Passport.serializeUser(function(user, done) {
	done(null, user);
});

Passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

var isAuthed = function(req, res, next) {
	if(!req.isAuthenticated()) {
		res.redirect('/failure');
	} else {
		next();
	}
};

// endpoints
app.get('/me', isAuthed, function(req, res) {
	res.json(req.user);
});

app.get('/auth/facebook', Passport.authenticate('facebook'));

app.get('/auth/facebook/callback', Passport.authenticate('facebook', {
		successRedirect: '/me',
		failureRedirect:'/failure'
	}));



Mongoose.connect(mongoURI);

Mongoose.connection.once('open', function() {
	// console.log('connected to mongo via ' + mongoURI);
});

app.listen(port, function() {
	// console.log('Now listening on port 8080');
});