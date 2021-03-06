
angular.module("mainApp", [
  'ui.router',
  'ngFileUpload'
])

angular.module("mainApp")
.controller("homeController", function($scope, $http){

})

angular.module("mainApp").controller('ImageCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                data: {file: file}
            });

            file.upload.then(function (response) {
              console.log(response)
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                                         evt.loaded / evt.total));
            });
        }
    }
}]);

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
