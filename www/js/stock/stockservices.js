angular.module('stock.services', [])
  .factory('Stock', function ($q, $http,WebApi,ApplicationConfig) {
    var getAll= function () {
      var deferred=$q.defer();
      var jsTable1 = new EI.sDataTable();
     /* jsTable1.addColums("USERID", "COMPANYCODE", "ROOT", "FAVORITE", "APPNAME");
      jsTable1.addOneRow("admin", ApplicationConfig.CompanyCode, "ngroot", "MYFAVORITE", ApplicationConfig.ApplicationName);
*/
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = "pmopmm_app_inq";//"epestree_inqa";
      jsEIinfoIn.SysInfo.Sender = "admin";
      jsEIinfoIn.add(jsTable1);

      $http.post(WebApi.ServerUrl,jsEIinfoIn)
        .then(function (response) {
          var jsEIinfoOut = EI.EIInfoCStoJS(response.data);
          var _message = jsEIinfoOut.SysInfo.Msg;
          if (jsEIinfoOut.SysInfo.Flag == 0) {
            deferred.resolve(jsEIinfoOut);
          }
          else {
            deferred.reject(_message);
          }
        },function (reason) {
          deferred.reject(reason);
        });

      return deferred.promise;
    }
    return {
      getAll:getAll
    }
  })
