app.controller('mainController', 
	['$http','$scope','$mdSidenav',
	function($http,$scope,$mdSidenav){

		$scope.showSideNav = false;

		$scope.toggleSidenav = function(menuId) {
		    $mdSidenav(menuId).toggle();
		};

	}]);