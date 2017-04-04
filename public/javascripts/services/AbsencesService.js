app.factory('AbsencesService', function($http) {

	var instance = {};

	instance.getByDate = function(date) {
		return $http.get('/absences/all', {
			date: moment(date).format('YYYY-MM-DD')
		})
		.then(response => response.data)
	}

	return instance;

});