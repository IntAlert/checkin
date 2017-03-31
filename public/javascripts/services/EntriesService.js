app.factory('EntriesService', function($http) {

	var instance = {};

	instance.getStatuses = function() {
		return $http.get('/entries/statuses')
			.then(response => response.data)
	}

	instance.signIn = function(ad_id) {
		return $http.post('/entries/in', {
			ad_id: ad_id
		})
	}

	instance.signOut = function(ad_id) {
		return $http.post('/entries/out', {
			ad_id: ad_id
		})
	}

	return instance;

});