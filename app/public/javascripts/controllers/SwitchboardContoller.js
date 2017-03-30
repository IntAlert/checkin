app.controller('SwitchboardContoller', function ($scope, $window, $document, $location, UsersService, EntriesService) {


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

	$scope.toggle = function(user){
		if (user.in) EntriesService.signIn(user.id)
		else EntriesService.signOut(user.id)
	}

	
});