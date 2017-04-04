app.controller('HeaderController', function ($scope, $interval) {

	// User-generated data
	$scope.currentTime = $scope.currentDate = ""

	$interval(function(){
		$scope.currentDate = moment().format('MMMM Do YYYY')
		$scope.currentTime = moment().format('hh:mm:ss a')
	}, 1000)


});