app.controller('authController', 
	['$http','$scope', 
	function($http,$scope){

		$scope.authenticated = false;
		$scope.navbarCollapsed = true;// navbar manipulation

		$scope.navbarClose = function() {
			$scope.navbarCollapsed = true;
		};


	}]);