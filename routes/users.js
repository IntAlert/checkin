var express = require('express');
var router = express.Router();

var auth = require('../lib/o365/auth.js');
var graph = require('../lib/o365/graph.js');
var config = require('../config/office365.js');
var roles = require('../config/authorisation')

router.get('/dashboard', roles.can('access dashboard'), (req, res) => {
		
	res.render('users/dashboard', { title: ' Please tap your name to sign in/out' });	

})

/* GET users listing. */
router.get('/all', roles.can('access dashboard'), function(req, res, next) {


	auth.getAccessToken().then(token =>  {
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


});

module.exports = router;