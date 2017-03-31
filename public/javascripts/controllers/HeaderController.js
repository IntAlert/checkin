app.controller('HeaderController', function ($scope) {

	// User-generated data
	$scope.time = $scope.date = ""

	setInterval(function(){
		$scope.date = moment().format('MMMM Do YYYY')
		$scope.time = moment().format('hh:mm:ss a')
	}, 1000)


});