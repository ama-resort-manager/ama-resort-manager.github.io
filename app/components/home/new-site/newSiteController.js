app.controller('newSiteController', 
	['$http','$scope','$state', 
	function($http,$scope,$state){

		$scope.step1 = {
			action: 'Login'
		};
		$scope.genders = ['Mr','Ms','Mx'];
		
		$state.go('newSite.step1');

	}]);