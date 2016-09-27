var tabAboutModule = angular.module('starter.tabAbout', []);
//factory
tabAboutModule
  .factory('Me',function($http,$q){
  var getMe = function () {
    var deferred = $q.defer();
    var promise = deferred.promise;
    $http.get('api/me.json').success(function (resp) {
      deferred.resolve(resp);
    });
    return promise;
  };
  return {
    getMe: getMe
  }
})
  .factory('Question', function ($http, $q) {
    var getQuestion = function () {
      var deferred = $q.defer();
      var promise = deferred.promise;
      $http.get('api/question.json').success(function (resp) {
        deferred.resolve(resp);
      });
      return promise;
    };
    return {
      getQuestion: getQuestion,
      getQuestionOne:function (id) {
        return getQuestion().then(function (res) {
          for (var i = 0; i < res.length; i++) {
            if (res[i].id == id) {
              return res[i];
            }
          }
          return null;
        })
      },
    }
  })
  .factory('Version', function ($http, $q) {
    var getVersion = function () {
      var deferred = $q.defer();
      var promise = deferred.promise;
      $http.get('api/version.json').success(function (resp) {
        deferred.resolve(resp);
      });
      return promise;
    };
    return {
      getVersion: getVersion
    }
  })
;
//controller
tabAboutModule
  .controller('DashCtrl',function($rootScope,$scope,$state,Me){
    $scope.loginOut = function () {
      $rootScope.user=null;
      localStorage.setItem("autoLogin",false);
      $state.go('login');
    };
    $scope.me=[{
      "userName":$rootScope.user.username,
      "userImg":"img/user.png",
      "userNumber":$rootScope.user.username
    }];
 /* Me.getMe().then(function(resp){
    $scope.me = resp;
  });*/
  $scope.goSetup = function(){
    $state.go('setup');
  };
})
  .controller('setupCtrl',function($scope,$cordovaAppVersion,wwwVersion,appUpdate){
    $cordovaAppVersion.getVersionNumber().then(function (version) {
      $scope.version = version+'.'+wwwVersion;
    },function(){});
    $scope.update = function(){
      appUpdate.toUpdate(wwwVersion,'BRW',true);
    };
  })
  .controller('questionCtrl', function($scope,$state,Question) {
    Question.getQuestion().then(function(resp){
      $scope.question = resp;
    });
  })
  .controller('questionDetailCtrl', function($scope,$stateParams,Question) {
    $scope.title = $stateParams.title;
    Question.getQuestionOne($stateParams.id).then(function(resp){
      $scope.oneQuestion = resp;
    });
  })
  .controller('versionCtrl', function($scope,$state,$cordovaAppVersion,wwwVersion,Version) {
    var nowVersion=null;
    $cordovaAppVersion.getVersionNumber().then(function (version) {
      nowVersion = version+'.'+wwwVersion;
    },function(){});
    Version.getVersion().then(function(resp){
      resp[0].version=nowVersion;
      $scope.version = resp;
    });
  })
;

