app.controller('DashboardContoller', function ($scope, $window, $document, $location, $mdDialog, $interval, UsersService, EntriesService) {



	var keepPolling = true;

	// User-generated data
	$scope.data = {
		users: []
	}


	// get all users

	function getUsers() {
		UsersService.getAll()
		.then(users => {
			$scope.data.users = users
		})	
	}

	getUsers()

	$interval(getUsers, 1000 * 60 * 60)
	


	$scope.showConfirm = function(ev, user) {

		keepPolling = false;

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
		EntriesService.getStatuses().then(statuses => {
			for (var i = $scope.data.users.length - 1; i >= 0; i--) {

				var statusToday = statuses.filter(function(s){
					return s.ad_id == $scope.data.users[i].id
				})

				if (statusToday.length) {
					// update status
					$scope.data.users[i].in = statusToday[0].in
					$scope.data.users[i].updatedAt = statusToday[0].updatedAt
				} else {
					// no status today
					$scope.data.users[i].in = false;
					$scope.data.users[i].updatedAt = null
				}
			}
		})	
	}

	setInterval(function(){
		if (keepPolling) pollEntryStatus()
	}, 1000)
	
});