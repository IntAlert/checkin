var ConnectRoles = require('connect-roles');

// Authorisation
var roles = new ConnectRoles();

// anonymous users can only access the home page
// roles.use(function (req, action) {
//   if (!req.isAuthenticated()) return action === 'access home page';
// })

// logged in public users can only access public stuff
roles.use('access dashboard', function (req) {
  return req.user && req.user.loggedIn
})

// // admin
roles.use('access admin', function (req) {

  return req.user && req.user.isAdmin
})

// roles.use('access admin app unapproved', function (req) {
//   return req.isAuthenticated() && req.user.is_admin
// })

module.exports = roles;