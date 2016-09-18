/**
 * Created by willem on 2016/9/6.
 */

angular
  .module('starter.login', [])
  .controller('loginController', function ($scope, $rootScope, $state,$ionicPopup,loginService) {
    $scope.user = {
      username: null,
      password: null,
      remberPass:false,
      autoLogin:false,
      companyCode:'NJGS',
      applicationName:'BRGSE1'
    };
    $scope.submit = function () {
      loginService.login($scope.user).then(function(resp){
        $rootScope.user=$scope.user;
        //存储localStorage，key值：username，value：用户名
        localStorage.setItem("username",$scope.user.username);
        if($scope.user.remberPass){
          //存储localStorage，key值：password，value：密码
          localStorage.setItem("password",$scope.user.password);
          localStorage.setItem("remberPass",$scope.user.remberPass);
        }else{
          localStorage.setItem("password",'');
          localStorage.setItem("remberPass",false);
        }
        if($scope.user.autoLogin){
          localStorage.setItem("autoLogin",$scope.user.autoLogin);
          localStorage.setItem("password",$scope.user.password);
          localStorage.setItem("remberPass",true);
        }
        $state.go('menu');
      },function(reason){
        $ionicPopup.alert({
          //title: '提示',
          template:reason
        });
      })
    };


    //循环遍历，取key值username和password的value
    for(var i=localStorage.length - 1 ; i >=0; i--){
      if(localStorage.key(i)=="username"){
        $scope.user.username=localStorage.getItem(localStorage.key(i));
      }
      if(localStorage.key(i)=="password"){
        $scope.user.password=localStorage.getItem(localStorage.key(i));
      }
      if(localStorage.key(i)=="remberPass"){
        if(localStorage.getItem(localStorage.key(i))=='true'){
          $scope.user.remberPass=true;
        }else{
          $scope.user.remberPass=false;
        }
      }
      if(localStorage.key(i)=="autoLogin"){
        if(localStorage.getItem(localStorage.key(i))=='true'){
          $scope.user.localStorage=true;
        }else{
          $scope.user.localStorage=false;
        }
        if($scope.user.autoLogin){
          $scope.submit();
        }

      }
    }

  });


