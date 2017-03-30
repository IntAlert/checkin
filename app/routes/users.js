var express = require('express');
var router = express.Router();

var auth = require('../lib/auth.js');
var graph = require('../lib/graph.js');
var config = require('../config/office365.js');


router.get('/dashboard', function(req, res) {
	
	if (!req.user.loggedIn) {
		res.status(401).send('Not Authorised');
	} else {
		res.render('users/dashboard', { title: 'International-Alert Sign In Book' });	
	}

})

/* GET users listing. */
router.get('/all', function(req, res, next) {

	if (!req.user.loggedIn) {
		res.status(401).send('Not Authorised');
	} else {

	  auth.getAccessToken().then(function (token) {
	  // Get all of the users in the tenant.
		graph.getGroupUsers(token, config.groupId)
			.then(function (users) {
			// 		// Create an event on each user's calendar.
					res.send(users);
				}, function (error) {
					console.error('>>> Error getting users: ' + error);
				});
			}, function (error) {
			// 	console.error('>>> Error getting access token: ' + error);
			});
	}

});

module.exports = router;
