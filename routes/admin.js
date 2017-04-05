var express = require('express');
var router = express.Router();
var roles = require('../config/authorisation')

/* GET home page. */
router.get('/', roles.can('access admin'), function(req, res, next) {
  
  res.render('admin/index', {title: "Admin: Absences"});

});

module.exports = router;
