app.factory('EntriesService', function($http) {

	var instance = {};

	instance.getAllInToday = function() {
		return $http.get('/entries/all_in_today')
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