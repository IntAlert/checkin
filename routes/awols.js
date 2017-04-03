var express = require('express');
var router = express.Router();
var models  = require('../models');
var moment = require('moment');
var roles = require('../config/authorisation')



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
		date: {
			$gt: moment().subtract(1,'months').format('YYYY-MM-DD'),	
		}
	}

	models.Awol.findAll({
		where: lastMonthAwolQuery
	})
	.then(awols => {
		res.json(awols)
	})
})

module.exports = router;
