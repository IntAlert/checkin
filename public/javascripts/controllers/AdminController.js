app.controller('AdminController', function ($scope, $window, $document, $location, $mdDialog, $q, AbsencesService, AwolsService) {


	$scope.data = {
		date: new Date(),
		loading: true,
		usersAbsent: []
	}


	$scope.$watch('data.date', () => {

		console.log('loading')
		$scope.data.loading = true;

		$q.all({
			absences: AbsencesService.getByDate($scope.data.date),
			awols: AwolsService.getByDate($scope.data.date)
		}).then(values => {

			// append awol value to each absence
			$scope.data.usersAbsent = values.absences.map(absence => {
				absence.awol = (values.awols.indexOf(absence.id) > -1)
				return absence
			})

			$scope.data.loading = false;

		})
	})

});