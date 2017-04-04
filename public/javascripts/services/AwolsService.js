app.factory('AwolsService', function($http) {

	var instance = {};

	instance.create = function(ad_id, date) {
		return $http.post('/awols/create', {
			ad_id: ad_id,
			date: moment(date).format('YYYY-MM-DD')
		})
		.then(response => response.data)
	}

	instance.delete = function(ad_id, date) {
		return $http.post('/awols/delete', {
			ad_id: ad_id,
			date: moment(date).format('YYYY-MM-DD')
		})
		.then(response => response.data)
	}

	instance.getByDate = function(date) {
		return $http.get('/awols/byDate', {
			params: {
				date: moment(date).format('YYYY-MM-DD')
			}
		})
		.then(response => response.data)
	}

	instance.getLastMonthCSV = function(date) {
		return $http.get('/awols/lastMonthCsv')
		.then(response => response.data)
	}

	return instance;

});