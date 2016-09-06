/**
 * Created by willem on 2016/9/6.
 */

angular
  .module('starter.login', [])
  .controller('loginController', function ($scope, $rootScope, $state,$ionicPopup,loginService) {
    $scope.user = {
      username: null,
      password: null,
      companyCode:'NJGS',
      applicationName:'BRGSE1'
    }
    $scope.login = function () {
          loginService.login($scope.user).then(function(resp){
            $rootScope.user=$scope.user;
            $state.go('menu');
          },function(reason){
            $ionicPopup.alert({
              //title: '提示',
              template:reason
            });
          })
      };
  });


