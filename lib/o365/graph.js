var request = require('request');
var Q = require('q');

// The graph module object.
var graph = {};

// @name getUsers
// @desc Makes a request to the Microsoft Graph for all users in the tenant.
// graph.getUsers = function (token) {
//   var deferred = Q.defer();

//   // Make a request to get all users in the tenant. Use $select to only get
//   // necessary values to make the app more performant.
//   request.get('https://graph.microsoft.com/v1.0/users?$select=id,displayName', {
//     auth: {
//       bearer: token
//     }
//   }, function (err, response, body) {
//     var parsedBody = JSON.parse(body);

//     if (err) {
//       deferred.reject(err);
//     } else if (parsedBody.error) {
//       deferred.reject(parsedBody.error.message);
//     } else {
//       // The value of the body will be an array of all users.
//       deferred.resolve(parsedBody.value);
//     }
//   });

//   return deferred.promise;
// };

graph.getGroupUsers = function (token, groupId) {
  var deferred = Q.defer();

  // Make a request to get all users in the tenant. Use $select to only get
  // necessary values to make the app more performant.
  request.get('https://graph.microsoft.com/v1.0/groups/' + groupId + '/members?$top=999', {
    auth: {
      bearer: token
    }
  }, function (err, response, body) {
    var parsedBody = JSON.parse(body);

    if (err) {
      deferred.reject(err);
    } else if (parsedBody.error) {
      deferred.reject(parsedBody.error.message);
    } else {
      // The value of the body will be an array of all users.
      deferred.resolve(parsedBody.value);
    }
  });

  return deferred.promise;
};

// graph.getMe = function (token) {
//   var deferred = Q.defer();

//   // Make a request to get all users in the tenant. Use $select to only get
//   // necessary values to make the app more performant.
//   var req = request.get('https://graph.microsoft.com/v1.0/me', {
//     auth: {
//       bearer: token
//     }
//   }, function (err, response, body) {
//     var parsedBody = JSON.parse(body);

//     // console.log(req)
//     console.log(parsedBody)

//     if (err) {
//       deferred.reject(err);
//     } else if (parsedBody.error) {
//       // console.log(req)
//       // console.log(parsedBody)

//       deferred.reject(parsedBody.error.message);
//     } else {
//       // The value of the body will be an array of all users.
//       deferred.resolve(parsedBody);
//     }
//   });

//   return deferred.promise;
// };

graph.getMyGroups = function (token) {
  var deferred = Q.defer();

  // Make a request to get all users in the tenant. Use $select to only get
  // necessary values to make the app more performant.
  var req = request.get('https://graph.microsoft.com/v1.0/me/memberOf', {
    auth: {
      bearer: token
    }
  }, function (err, response, body) {
    var parsedBody = JSON.parse(body);

    if (err) {
      deferred.reject(err);
    } else if (parsedBody.error) {

      deferred.reject(parsedBody.error.message);
    } else {
      // The value of the body will be an array of all users.
      deferred.resolve(parsedBody.value);
    }
  });

  return deferred.promise;
};

module.exports = graph;