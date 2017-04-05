var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Please log in' });
});

router.get('/fork', function(req, res, next) {
  res.render('fork', { title: 'Dashboard or Admin' });
});

module.exports = router;
