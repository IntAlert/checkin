app.controller('SwitchboardContoller', function ($scope, $window, $document, $location, UsersService) {


	// User-generated data
	$scope.data = {
		users: []
	}

	UsersService.getAll()
		.then(users => {
			console.log(users)
			$scope.data.users = users
		})

	$scope.$watch('data.users', function(){


		// console.log($scope.data)


	}, true)

	$scope.doSomething = function(){
		// console.log('harrow')
	}

	
});