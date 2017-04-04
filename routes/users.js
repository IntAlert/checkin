var express = require('express');
var router = express.Router();

var members = require('../lib/o365/members.js');
var roles = require('../config/authorisation');

router.get('/dashboard', roles.can('access dashboard'), (req, res) => {
		
	res.render('users/dashboard', { title: ' Please tap your name to sign in/out' });	

})

/* GET users listing. */
router.get('/all', roles.can('access dashboard'), function(req, res, next) {


	members.getAll()
		.then(function (users) {
				res.send(users);
		}, function (error) {
			console.error('>>> Error getting users: ' + error);
		});

});

module.exports = router;
