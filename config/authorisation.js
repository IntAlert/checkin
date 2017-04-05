var ConnectRoles = require('connect-roles');

// Authorisation
var roles = new ConnectRoles();

// logged in public users can only access public stuff
roles.use('access dashboard', function (req) {
  return req.user && req.user.isLoggedIn
})

// // admin
roles.use('access admin', function (req) {
  return req.user && req.user.isAdmin
})

module.exports = roles;