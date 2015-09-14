app.config(['$stateProvider', function($stateProvider) {

    $stateProvider
      //
      // guest only states
      //
      .state('home', {
        url: '',
        templateUrl: '/app/components/home/home.html',
        controller: 'homeController'
      })
      

      //
      // auth only states
      //
      

      ;

    function guest($q, $http) {
      var deferred = $q.defer();

        $http.get('/php/api/auth/check')
          .then(function(data) {
            if (data.data.status === false) {
              deferred.resolve();
            } else{
              // Reject the authentication promise to prevent the state from loading
              deferred.reject('guestOnly');
            };
          });

      return deferred.promise;
    };

    function authenticate($q, $http) {
      var deferred = $q.defer();

        $http.get('/php/api/auth/check')
          .then(function(data) {
            if (data.data.status === true) {
              deferred.resolve();
            } else{
              // Reject the authentication promise to prevent the state from loading
              deferred.reject('authOnly');
            };
          });

      return deferred.promise;
    };

}]);

// app.run(function ($rootScope, $state, $log) {
//   $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
//     // Redirect user to our login page
//     if (error === "authOnly") {
//       $state.go('login');
//     } else{
//       $state.go('dashboard');
//     };
//   });
// });