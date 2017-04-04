var express = require('express');
var router = express.Router();
var models  = require('../models');

var members = require('../lib/o365/members.js');
var roles = require('../config/authorisation')
var csv = require('express-csv')

// Return all absent
router.get('/all', roles.can('access admin'), function(req, res) {
	
	var allMembers = members.getAll()
	var allEntries = models.Entry.findAll({
		fields: ['ad_id'],
		where: {
			date: req.query.date // expects MySQL date
		}
	})


	Promise.all([allMembers, allEntries])
		.then(values => {
			var allMembers = values[0];
			var allEntries = values[1];

			var absenses = allMembers.filter(function(member){
				
				var entries = allEntries.filter(function(entry){
					console.log([entry.ad_id, member.id])
					return (entry.ad_id == member.id)
				})

				return entries.length == 0

			})

			res.json(absenses)
		})

})

module.exports = router;