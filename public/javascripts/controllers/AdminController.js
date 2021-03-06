app.controller('AdminController', function ($scope, $window, $document, $location, $mdDialog, AbsencesService, AwolsService) {


	$scope.data = {
		date: new Date(),
		loading: true,
		usersAbsent: []
	}


	$scope.$watch('data.date', () => {

		$scope.data.loading = true;

		AbsencesService.getByDate($scope.data.date)
			.then((absences) => {
				$scope.data.usersAbsent = absences;
				$scope.data.loading = false;
			})

	})

	$scope.updateAwolStatus = function(user) {
		var dateMySQL = moment($scope.data.date).format('YYYY-MM-DD');
		if (user.awol) {
			AwolsService.create(user.id, dateMySQL)
		} else {
			AwolsService.delete(user.id, dateMySQL)
		}
	}

	$scope.downloadLastMonthCSV = function() {

		$window.location.href = AwolsService.getLastMonthCSVLink()

	}

	$scope.markAllAsAwol = function() {
		var dateMySQL = moment($scope.data.date).format('YYYY-MM-DD');
		for (var i = 0; i < $scope.data.usersAbsent.length; i++) {
			$scope.data.usersAbsent[i].awol = true
			AwolsService.create($scope.data.usersAbsent[i].id, dateMySQL)
		}
	}

});