'use strict';
var Express = require('express');
var Session = require('express-session');
var Passport = require('passport');
var FacebookStrategy = require('passport-facebook');

var App = Express();
var port = 8080;

// middleware
App.use(Session({secret: 'Feidnow83i372ifADFGjuw823ueojygis'}));
App.use(Passport.initialize());
App.use(Passport.session());


Passport.use(new FacebookStrategy({
	clientID: '1556041261332848',
	clientSecret: '532f32b3dececb0264a0647982e70fc4',
	callbackURL: 'http://localhost:8080/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
	return done(null, profile);
}));

App.get('/auth/facebook', Passport.authenticate('facebook'));
App.get('/auth/facebook/callback', Passport.authenticate('facebook', {
		successRedirect: '/me',
		failureRedirect:'/failure'
	}));


Passport.serializeUser(function(user, done) {
	done(null, user);
});
Passport.deserializeUser(function(obj, done) {
	done(null, obj);
});


App.get('/me', function(req, res) {
	res.json(req.user);
});





App.listen(port, function() {
	// console.log('Now listening on port 8080');
});