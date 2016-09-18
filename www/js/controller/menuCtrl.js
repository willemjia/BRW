/**
 * Created by willem on 2016/9/6.
 */

    angular
        .module('menu',[])
      .controller('menuCtrl',function($scope,$rootScope,$state){
        $scope.loginOut = function () {
          $rootScope.user=null;
          localStorage.setItem("autoLogin",false);
          $state.go('login');
        }
      })


