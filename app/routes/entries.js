var express = require('express');
var router = express.Router();
var models  = require('../models');
var moment = require('moment');
var roles = require('../config/authorisation')



// Check In
router.post('/in', roles.can('access dashboard'), function(req, res) {

	var newEntry = {
		ad_id: req.body.ad_id,
		date: moment().format('YYYY-MM-DD'),
		in: new Date()
	}

	models.Entry.create(newEntry)
		.then(entry => {
			// respond
			res.json(entry)
	})

})

// Check Out
router.post('/out', roles.can('access dashboard'), function(req, res) {
	
	// if (!req.user.loggedIn) {
	// 	res.status(401).send('Not Authorised');
	// } else {

	// find any incomplete entry


	var incompleteEntry = {
		ad_id: req.body.ad_id,
		date: moment().format('YYYY-MM-DD'),
		out: null
	};

	models.Entry.findOne({
		where: incompleteEntry
	})
	.then(entry => {


		if (entry) {
			// normal behaviour
			entry.update({
				out: new Date()
			}).then(() => {
				res.json(entry)
			})
		} else {
			// no incomplete entry
			// this should not happen, but correct for it, in case it does

			incompleteEntry.out = incompleteEntry.in = new Date();
			models.Entry.create(incompleteEntry)
				.then(entry => {
					// respond
					res.json(entry)
			})

		}

	})

})

// Check Out
router.get('/all_in_today', roles.can('access dashboard'), function(req, res) {
	
	// if (!req.user.loggedIn) {
	// 	res.status(401).send('Not Authorised');
	// } else {

	// find any incomplete entry


	var allInQuery = {
		date: moment().format('YYYY-MM-DD'),
		out: null
	};

	models.Entry.findAll({
		where: allInQuery
	})
	.then(entries => {

		// produce array of ad_id's who are in
		var responses = entries.map(entry => entry.ad_id)

		res.json(responses)

	})

})

module.exports = router;
