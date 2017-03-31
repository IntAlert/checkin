app.controller('SwitchboardContoller', function ($scope, $window, $document, $location, UsersService, EntriesService) {


	// User-generated data
	$scope.data = {
		users: []
	}


	// get all users
	UsersService.getAll()
		.then(users => {
			$scope.data.users = users
		})


	$scope.toggle = function(user){
		if (user.in) EntriesService.signIn(user.id)
		else EntriesService.signOut(user.id)
	}


	var pollEntryStatus = function() {
		EntriesService.getAllInToday().then(userIds => {
			for (var i = $scope.data.users.length - 1; i >= 0; i--) {
				var userIsIn = userIds.indexOf($scope.data.users[i].id) > -1
				$scope.data.users[i].in = userIsIn
			}
		})	
	}

	setInterval(pollEntryStatus, 1000)
	

	
});