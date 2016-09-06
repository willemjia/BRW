/**
 * Created by willem on 2016/9/6.
 */
    angular
        .module('starter.loginService',[])
      .factory('loginService',function($http,$q,WebApi){
        var login=function(data){
          var _message='';

          var deferred=$q.defer();
          var jsTable1 = new EI.sDataTable();
          jsTable1.addColums("USERNAME", "PASSWORD", "COMPANYCODE", "ROOT", "FAVORITE", "APPNAME");
          jsTable1.addColum("LOGINONLY", "B");
          jsTable1.addOneRow(data.username, data.password, data.companyCode, "", "", 'BRGSE1',false);

          var jsEIinfoIn = new EI.EIinfo();
          jsEIinfoIn.SysInfo.SvcName = 'epesloginl';
          jsEIinfoIn.SysInfo.Sender = data.username;
          jsEIinfoIn.add(jsTable1);
          $http.post(WebApi.ServerUrl, jsEIinfoIn).then(function(response){
              var jsEIinfoOut = EI.EIInfoCStoJS(response.data);
              _message = jsEIinfoOut.SysInfo.Msg;
              if (jsEIinfoOut.SysInfo.Flag == 0) {
                deferred.resolve(jsEIinfoOut);
              } else {
                deferred.reject(_message);
              }
            }
            , function (reason) {
              deferred.reject(reason);
            })
          return deferred.promise;
        };
        return {
          login:login
        }
      })

