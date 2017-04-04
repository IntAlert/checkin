var express = require('express');
var office365Config = require('../config/office365');
var passport = require('passport')
var AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2').Strategy;
var members = require('../lib/o365/members.js');

module.exports = function(app) {


	// determine callback URL
	if(process.env.NODE_ENV == 'development') {
		var callbackURL = 'http://127.0.0.1:3000/auth/callback';
	} else {
		var callbackURL = 'http://alertcheckin.azurewebsites.net/auth/callback';
	}
	



	passport.use(new AzureAdOAuth2Strategy({
	  clientID: office365Config.clientId,
	  clientSecret: office365Config.clientSecret,
	  callbackURL: callbackURL,
	  resource: 'https://graph.windows.net/',
	  tenant: office365Config.tenantId
	},
	function (accessToken, refresh_token, params, profile, done) {

		done(null, profile);

	}));

		
	passport.serializeUser(function(user, done) {
		
		done(null, 1);
	});

	passport.deserializeUser(function(id, done) {

		var user = {
			loggedIn: true
		}
		done(null, user);
	});


	app.use(passport.initialize());  // for uauthentication/authorization
	app.use(passport.session());  

	/* GET callback. */
	app.get('/auth/login', passport.authenticate('azure_ad_oauth2'));

	app.get('/auth/callback', 
	  passport.authenticate('azure_ad_oauth2', { failureRedirect: '/login' }),
	    function (req, res) {
	      // Successful authentication, redirect home.
	      // console.log(req);
	      res.redirect('/users/dashboard');
	});


}
