var express = require('express');
var router = express.Router();
var models  = require('../models');

var members = require('../lib/o365/members.js');
var roles = require('../config/authorisation')
var csv = require('express-csv')

// Return all absent
router.get('/all', roles.can('access admin'), function(req, res) {
	
	var promises = [
		members.getAll(),
		models.Entry.findAll({
			fields: ['ad_id'],
			where: {
				date: req.query.date // expects MySQL date
			}
		}),
		models.Awol.findAll({
			where: {
				date: req.query.date // expects MySQL
			}
		})
	];


	Promise.all(promises)
		.then(values => {
			var allMembers = values[0];
			var allEntries = values[1];
			var allAwols = values[2];

			// get absences my filtering entries for lack of member id
			var absences = allMembers.filter(function(member){
				
				var entries = allEntries.filter(function(entry){
					console.log([entry.ad_id, member.id])
					return (entry.ad_id == member.id)
				})

				return entries.length == 0

			})

			// get awol ad_ids
			var awolAdIds = allAwols.map(awol => awol.ad_id);

			// append awol status
			var absencesWithAwolStatus = absences.map(absence => {
				absence.awol = (awolAdIds.indexOf(absence.id) > -1)
				return absence
			})

			res.json(absencesWithAwolStatus)
		})
		.catch(function(err) {
		  console.log(err.message);
		});

})

module.exports = router;