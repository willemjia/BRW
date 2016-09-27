/**
 * Created by Edward on 2016/5/12 0012.
 */

/*.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
    TYM3
})*/
(function () {
    var BaseUrl='http://10.51.103.100:8099/';
    angular.module('starter')
    .constant('AUTH_EVENTS', {
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })
    .constant('WebApi',{
        LoginUrl: BaseUrl+'api/login',
        ServerUrl:BaseUrl+'api/call',
        RouterUrl: BaseUrl+'api/router'
    })
    .constant('ApplicationConfig',{
        CompanyCode:'BRGS',
        ApplicationName:'BRGSE1'
    })
    .constant('wwwVersion','0')

})();
