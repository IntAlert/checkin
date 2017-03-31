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
router.get('/statuses', roles.can('access dashboard'), function(req, res) {
	

	// find most recent statuses today, if any


	var query = {
		where: {
			date: moment().format('YYYY-MM-DD'),	
		},
		order: [
			// (*) this makes sure that we can easily
			// return latest status
			['updatedAt', 'DESC'] 
		]
	};

	models.Entry.findAll(query)
	.then(entries => {

		var entriesDeduped = []

		// remove double entries
		// in favour of most recent
		// see (*) above

		var idsSeen = []

		entries.map(entry => {
			if (idsSeen.indexOf(entry.ad_id) == -1) {
				// we only want the most recent status for the day
				entriesDeduped.push(entry)
			}
			idsSeen.push(entry.ad_id)
		})


		// prepare response
		// could have been done above but this is more obv
		var response = entriesDeduped.map(entry => {
			return {
				ad_id: entry.id,
				in: (entry.out == null),
				updatedAt: entry.updatedAt
			}
		})

		res.json(response)

	})

})

module.exports = router;
