
angular.module("mainApp", [
  'ui.router'
])

angular.module("mainApp")
.controller("homeController", function($scope, $http){
  console.log('buttsweat')
})


angular.module("mainApp")
.config(function($stateProvider, $urlRouterProvider, $locationProvider){

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: 'views/home.html',
      controller: 'homeController',
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
})
