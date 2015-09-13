app.config(['$stateProvider', function($stateProvider) {

    $stateProvider
      //
      // guest only states
      //
      .state('index', {
        url: '',
        templateUrl: '/app/components/welcome/welcome.html',
        controller: 'welcomeController',
        resolve: { guest: guest }
      })
      .state('welcome', {
        url: '/',
        templateUrl: '/app/components/welcome/welcome.html',
        controller: 'welcomeController',
        resolve: { guest: guest }
      })
      .state('login', {
        url: '/auth/login',
        templateUrl: '/app/components/auth/login.html',
        resolve: { guest: guest }
      })

      //
      // auth only states
      //

      .state('dashboard', {
        url: '/dashboard',
        templateUrl: '/app/components/dashboard/dashboard.html',
        resolve: { authenticate: authenticate }
      })
      .state('dashboard.updates', {
        url: '/dashboard/updates',
        templateUrl: '/app/components/dashboard/updates.html',
        controller: 'updatesController',
        resolve: { authenticate: authenticate }
      })
      .state('dashboard.messages', {
        url: '/dashboard',
        templateUrl: '/app/components/dashboard/dashboard.html',
        controller: 'dashboardController',
        resolve: { authenticate: authenticate }
      })
      .state('dashboard.userActivities', {
        url: '/dashboard/user-activities',
        templateUrl: '/app/components/dashboard/user-activities/user-activities.html',
        controller: 'userActivitiesController',
        resolve: { authenticate: authenticate }
      })

      // MASTER
      .state('siteSettings', {
        url: '/site-settings',
        templateUrl: '/app/components/master/settings/site-settings.html',
        controller: 'siteSettingsController',
        resolve: { authenticate: authenticate }
      })
      .state('usermanagement', {
        url: '/user-management',
        templateUrl: '/app/components/master/user-management/user-management.html',
        controller: 'userManagementController',
        resolve: { authenticate: authenticate }
      })
      .state('usermanagement.userRegistration', {
        url: '/user-management',
        templateUrl: '/app/components/master/user-management/user-registration/user-registration.html',
        controller: 'userRegistrationController',
        resolve: { authenticate: authenticate }
      })
      .state('usermanagement.userRoles', {
        url: '/user-roles',
        templateUrl: '/app/components/master/user-management/user-roles/user-roles.html',
        controller: 'userRoleController',
        resolve: { authenticate: authenticate }
      })

      // ADMIN
      .state('foodAndBeverages', {
        url: '/food-and-beverages',
        templateUrl: '/app/components/admin/food-and-beverages/food-and-beverages.html',
        controller: 'foodAndBeveragesController',
        resolve: { authenticate: authenticate }
      })
      .state('foodAndBeverages.category', {
        url: '/:categoryID',
        templateUrl: '/app/components/admin/food-and-beverages/categories/category.html',
        controller: 'menuCategoryController',
        resolve: { authenticate: authenticate }
      })
      .state('foodAndBeverages.menu', {
        url: '/menu/add',
        templateUrl: '/app/components/admin/food-and-beverages/menu/add-menu-form.html',
        controller: 'menuController',
        resolve: { authenticate: authenticate }
      })

      .state('profile', {
        url: '/profile',
        templateUrl: '/app/components/profile/index.html',
        controller: 'profileController',
        resolve: { authenticate: authenticate }
      })

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

app.run(function ($rootScope, $state, $log) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    // Redirect user to our login page
    if (error === "authOnly") {
      $state.go('login');
    } else{
      $state.go('dashboard');
    };
  });
});