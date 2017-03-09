app.factory('UsersService', function($http) {

	var instance = {};

	instance.getAll = function() {
		return $http.get('/users')
			.then(function(response){

				return sortLastAndFirst(response.data);

			}, function(){
				alert("users download error")
			});	
	}

	return instance;

});


const sortLastAndFirst = function(users) {
	return users.sort((a,b) => {
		return a.givenName >= b.givenName ? 1 : -1
	})
}