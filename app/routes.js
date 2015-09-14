app.config(['$stateProvider','$locationProvider', function($stateProvider,$locationProvider) {

    $stateProvider
      //
      // guest only states
      //
      .state('home', {
        url: '',
        templateUrl: '/app/components/home/home.html',
        controller: 'homeController'
      })
      .state('home.slash', {
        url: '/',
        templateUrl: '/app/components/home/home.html',
        controller: 'homeController'
      })
      
      .state('newSite', {
        url: '/new-site',
        templateUrl: '/app/components/home/new-site/new-site.html',
        controller: 'newSiteController'
      })
      .state('newSite.step1', {
        url: '/step1',
        templateUrl: '/app/components/home/new-site/step1.html'
      })
      

      //
      // auth only states
      //
      

      ;

      // use the HTML5 History API
      $locationProvider.html5Mode(true);


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