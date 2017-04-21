app.controller('DashboardContoller', function ($scope, $window, $document, $location, $mdDialog, $interval, UsersService, EntriesService) {


	// settings
	var UserPollInterval = 1000 * 60 * 60;
	var EntryStatusPollInterval = 3000;


	var keepPollingEntryStatuses = false;

	// User-generated data
	$scope.data = {
		users: []
	}


	// get all users
	function getUsers() {
		console.log('getting users')
		return UsersService.getAll()
		.then(users => {
			$scope.data.users = users
			return users
		})	
	}

	// get users for the first time
	// and then allow pollin statuses to start
	getUsers().then(users => {
		keepPollingEntryStatuses = true;
	})

	// refresh users every hour
	$interval(getUsers, UserPollInterval)


	// confirm toggle in/out
	$scope.showConfirm = function(ev, user) {

		keepPollingEntryStatuses = false;

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
	    	return toggle(user).then( () => {
	    		// allow polling to recommence once the change has been made
	    		// this prevents a race condition between the local data and poll results
	    		// which can cause a flicker between in/out
	    		keepPollingEntryStatuses = true;	
	    	})
	    }, function() {
	    	// cancelled
	    	keepPollingEntryStatuses = true;
	    });
	  };

	var toggle = function(user){

		// toggle the local copy
		user.in = ! user.in;

		// now call Entries service based on NEW state
		if (user.in) return EntriesService.signIn(user.id)
		else return EntriesService.signOut(user.id)
	}


	var pollEntryStatus = function() {
		EntriesService.getStatuses().then(statuses => {

			// append in/out status to the users array
			for (var i = $scope.data.users.length - 1; i >= 0; i--) {

				var statusToday = statuses.find(function(s){
					return s.ad_id == $scope.data.users[i].id
				})

				if (statusToday !== undefined) {
					// update status
					$scope.data.users[i].in = statusToday.in
					$scope.data.users[i].updatedAt = statusToday.updatedAt
				} else {
					// no status today
					$scope.data.users[i].in = false;
					$scope.data.users[i].updatedAt = null
				}
			}
		})	
	}

	// check entry status every second
	$interval(function(){
		if (keepPollingEntryStatuses) pollEntryStatus()
	}, EntryStatusPollInterval)
	
});