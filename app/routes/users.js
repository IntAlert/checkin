var express = require('express');
var router = express.Router();

var auth = require('../lib/auth.js');
var graph = require('../lib/graph.js');
var config = require('../lib/config.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
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


});

module.exports = router;
