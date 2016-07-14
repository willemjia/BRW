angular.module('starter.services', [])

  .factory('services',function($http, $q, WebApi){
    var toService=function(jsEIinfoIn){
      var deferred=$q.defer();
      $http.post(WebApi.ServerUrl, jsEIinfoIn).then(function(response){
          var jsEIinfoOut = EI.EIInfoCStoJS(response.data);
          var messsage = jsEIinfoOut.SysInfo.Msg;
          if (jsEIinfoOut.SysInfo.Flag == 0) {
            deferred.resolve(jsEIinfoOut);
          } else {
            deferred.reject(messsage);
          }
        }
        , function (reason) {
          deferred.reject(reason);
        })
      return deferred.promise;
    }
    //定义参数对象
    var myObject = null;
    var _setter = function (data) {
      myObject = data;
    };
    var _getter = function () {
      return myObject;
    };
    return {
      toService:toService,
      setter: _setter,
      getter: _getter
    }
  })
