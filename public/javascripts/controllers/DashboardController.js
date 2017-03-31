app.controller('DashboardContoller', function ($scope, $window, $document, $location, $mdDialog, UsersService, EntriesService) {



	var keepPolling = true;

	// User-generated data
	$scope.data = {
		users: []
	}


	// get all users
	UsersService.getAll()
		.then(users => {
			$scope.data.users = users
		})


	$scope.showConfirm = function(ev, user) {

		keepPolling = false;

		console.log(user)

		if (user.in) {
			// They are signing out
			var textContent = 'Would you like to sign out?';
			var okText = 'Sign out';
		} else {
			// They are signing in
			var textContent = 'Would you like to sign in?';
			var okText = 'Sign in';
		}
		

	    // Appending dialog to document.body to cover sidenav in docs app
	    var confirm = $mdDialog.confirm()
	          .title(user.displayName)
	          .textContent(textContent)
	          .targetEvent(ev)
	          .ok(okText)
	          .cancel('Cancel');

	    $mdDialog.show(confirm).then(function() {
	    	// confirmed
	    	keepPolling = true;
	    	return toggle(user)
	    }, function() {
	    	// cancelled
	    	keepPolling = true;
	    });
	  };

	var toggle = function(user){
		if (user.in) return EntriesService.signOut(user.id)
		else return EntriesService.signIn(user.id)
	}


	var pollEntryStatus = function() {
		EntriesService.getAllInToday().then(userIds => {
			for (var i = $scope.data.users.length - 1; i >= 0; i--) {
				var userIsIn = userIds.indexOf($scope.data.users[i].id) > -1
				$scope.data.users[i].in = userIsIn
			}
		})	
	}

	setInterval(function(){
		if (keepPolling) pollEntryStatus()
	}, 1000)
	
});