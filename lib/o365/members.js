var auth = require('./auth.js');
var graph = require('./graph.js');
var config = require('../../config/office365.js');

module.exports = {

	getAll: function() {

		return auth.getAccessToken().then(token =>  {
	
			return graph.getGroupUsers(token, config.groupId)
				
		});

	}
}