var express = require('express');
var router = express.Router();
var models  = require('../models');
var moment = require('moment');
var roles = require('../config/authorisation')
var csv = require('express-csv')

var members = require('../lib/o365/members.js');

// Check In
router.post('/create', roles.can('access admin'), function(req, res) {

	var newAwol = {
		ad_id: req.body.ad_id,
		date: req.body.date //expect MySQL format
	}

	// check it does not already exist
	models.Awol.findOrCreate({
		where: newAwol,
		defaults: newAwol
	})
	.then(awol => {
		res.json(awol);
	})

})

// Check Out
router.post('/delete', roles.can('access admin'), function(req, res) {
	
	var deletableAwol = {
		ad_id: req.body.ad_id,
		date: req.body.date //expect MySQL format
	}

	models.Awol.findOne({
		where: deletableAwol
	})
	.then(awol => {

		if( awol ) {
			// create one
			return awol.destroy()
		}
	}).then(awol => {
		res.json(deletableAwol);
	})

})

// Export all
router.get('/all', roles.can('access admin'), function(req, res) {
	
	var lastMonthAwolQuery = {
		where: {
			date: {
				$gt: moment().subtract(1,'months').format('YYYY-MM-DD'),	
			}	
		},
		order: 'date ASC'
		
	}


	var getAllAwols = models.Awol.findAll(lastMonthAwolQuery)

	var getAllMembers = members.getAll()

	Promise.all([getAllAwols, getAllMembers])
		.then(values => {

			console.log(values)
			
			var allAwols = values[0]
			var allMembers = values[1]
			// once we have both, we need to decorate Awols with user data
			var awolsDecorated = []

			allAwols.forEach(function(awol){
				var userData = allMembers.find(member => {
					return member.id == awol.ad_id
				})

				// just in case o365 did not provide a member with this id
				if (userData) { 
					// add date
					userData.date = awol.date
					awolsDecorated.push(userData)
				}
				
			})

			// produce an array CSV 
			var awolsDecoratedCsv = awolsDecorated.map(function(member){
				return [
					member.date,
					member.displayName,
					member.mail
				]
			})
			res.csv(awolsDecoratedCsv)
		})
	
})

module.exports = router;
