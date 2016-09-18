angular.module('starter.services', [])

  .factory('services',function($http, $q,$rootScope, WebApi){
    var toService=function(jsEIinfoIn){
      var deferred=$q.defer();
      jsEIinfoIn.Tables[0].addColums("companyCode");
      if(jsEIinfoIn.Tables[0].Rows[0]!=null || jsEIinfoIn.Tables[0].Rows[0]!=undefined){
        jsEIinfoIn.Tables[0].Rows[0].push($rootScope.user.companyCode);
      }else{
        jsEIinfoIn.Tables[0].addOneRow($rootScope.user.companyCode);
      }
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
