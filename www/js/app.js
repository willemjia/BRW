// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionicAppUpdate','angular-echarts','ngEcharts','starter.tabAbout','starter.login','starter.loginService','menu','fundCtrl','pay_accountCtrl','pay_billCtrl','receive_billCtrl','receive_accountCtrl',
  'saleCtrl','sourceCtrl','starter.services','stockController', 'ionic-datepicker','starter','team.controllers','planCtrl'])
    .run(function ($ionicPlatform,$state,$ionicPopup,appUpdate,wwwVersion) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            };
          $ionicPlatform.registerBackButtonAction(function () {
            function showConfirm() {
              var confirmPopup = $ionicPopup.confirm({
                title: '<strong>退出应用?</strong>',
                template: '你确定要退出应用吗?',
                okText: '退出',
                cancelText: '取消'
              });

              confirmPopup.then(function (res) {
                if (res) {
                  ionic.Platform.exitApp();
                }
                else {
                  // Don't close
                }
              });
            }
            if ($state.current.name == "menu" ||$state.current.name == "login") {
              showConfirm();
            } else {
              navigator.app.backHistory();
            }
          }, 100);
          appUpdate.toUpdate(wwwVersion,'BRW',false);
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');

        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');


        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
//===========================================================================
            // setup an abstract state for the tabs directive
          .state('login', {
            url: '/login',
            cache: false,
            templateUrl: 'templates/login.html',
            controller: 'loginController'
          })

            .state('menu', {
                url: '/menu',
                cache: false,
                templateUrl: 'templates/menu.html',
                controller:'DashCtrl'
            })
          .state('setup', {
            url: '/app/melists/setup',
            templateUrl: 'templates/melists-setup.html',
            controller:"setupCtrl"
          })
          .state('question', {
            url: '/dash/question',
            templateUrl: 'templates/dash-question.html',
            controller:"questionCtrl"
          })
          .state('questionDetail', {
            url: '/dash/question/questionDetail',
            params:{"id":null,"title":null},
            templateUrl: 'templates/question-detail.html',
            controller:"questionDetailCtrl"
          })
          .state('version', {
            url: '/dash/version',
            templateUrl: 'templates/dash-version.html',
            controller:"versionCtrl"
          })
            .state('sale', {
                url: '/sale',
                cache: false,
                templateUrl: 'templates/sale.html',
                controller: 'SaleCtrl'
            })
          .state('sale-check', {
            url: 'sale-check',
            cache: false,
            templateUrl: 'templates/sale-check.html',
            controller: 'saleCheckCtrl'
          })
            .state('sale-detail', {
                url: 'sale-detail',
                cache: false,
                templateUrl: 'templates/sale-detail.html',
                controller: 'SaleDetailCtrl'
            })
            .state('sale-search', {
                url: '/sale/search',
                cache: false,
                templateUrl: 'templates/sale-search.html',
                controller: 'SaleSearchCtrl'
            })
            .state('sale-hide', {
                url: '/sale/hide',
                cache: false,
                templateUrl: 'templates/sale-hide.html',
                controller: 'SaleHideCtrl'
            })
            .state('sale-history', {
                url: '/sale/history',
                cache: false,
                templateUrl: 'templates/sale-history.html',
                controller: 'SaleSearchCtrl'
            })

            .state('fund', {
                url: '/fund',
                cache: false,
                templateUrl: 'templates/fund.html',
                controller: 'FundCtrl'
            })
            .state('fund-search', {
                url: '/fund-search',
                cache: false,
                templateUrl: 'templates/fund-search.html',
                controller: 'FundSearchCtrl'
            })
            .state('fund-hide', {
                url: '/fund-hide',
                cache: false,
                templateUrl: 'templates/fund-hide.html',
                controller: 'FundHideCtrl'
            })
            .state('fund-history', {
                url: '/fund-history',
                cache: false,
                templateUrl: 'templates/fund-history.html',
                controller: 'FundSearchCtrl'
            })

            .state('source', {
                url: '/source',
                cache: false,
                templateUrl: 'templates/source.html',
                controller: 'SourceCtrl'
            })
            .state('source-search', {
                url: '/source-search',
                cache: false,
                templateUrl: 'templates/source-search.html',
                controller: 'SourceSearchCtrl'
            })
            .state('source-hide', {
                url: '/source-hide',
                cache: false,
                templateUrl: 'templates/source-hide.html',
                controller: 'SourceHideCtrl'
            })
            .state('source-history', {
                url: '/source-history',
                cache: false,
                templateUrl: 'templates/source-history.html',
                controller: 'SourceSearchCtrl'
            })

            .state('source-add', {
                url: '/source-add',
                cache: false,
                templateUrl: 'templates/source-add.html',
                controller: 'SourceAddCtrl'
            })
            .state('source-detail', {
                url: 'source-detail',
                cache: false,
                templateUrl: 'templates/source-detail.html',
                controller: 'SourceDetailCtrl'
            })


            .state('receive_bill', {
                cache: false,
                url: '/receive_bill',
                templateUrl: 'templates/receive_bill.html',
                controller: 'receive_billCtrl'
            })
            .state('receive_account', {
                cache: false,
                url: '/receive_account',
                templateUrl: 'templates/receive_account.html',
                controller: 'receive_accountCtrl'
            })
            .state('pay_account', {
                cache: false,
                url: '/pay_account',
                templateUrl: 'templates/pay_account.html',
                controller: 'pay_accountCtrl'
            })
            .state('pay_bill', {
                cache: false,
                url: '/pay_bill',
                templateUrl: 'templates/pay_bill.html',
                controller: 'pay_billCtrl'
            })
            .state('receive_bill_search', {
                cache: false,
                url: '/receive_bill_search',
                templateUrl: 'templates/receive_bill_search.html',
                controller: 'receive_bill_searchCtrl'
            })
            .state('receive_bill_hide', {
                cache: false,
                url: '/receive_bill_hide',
                templateUrl: 'templates/receive_bill_hide.html',
                controller: 'receive_bill_hideCtrl'
            })
            .state('receive_bill_history', {
                cache: false,
                url: '/receive_bill_history',
                templateUrl: 'templates/receive_bill_history.html',
                //controller: 'receive_bill_historyCtrl'
                controller: 'receive_bill_searchCtrl'
            })
            .state('receive_bill_detailed', {
                cache: false,
                url: '/receive_bill_detailed/?id',
                templateUrl: 'templates/receive_bill_detailed.html',
                controller: 'receive_bill_detailedCtrl'
            })
            .state('receive_account_detailed', {
                cache: false,
                url: '/receive_account_detailed/?id',
                templateUrl: 'templates/receive_account_detailed.html',
                controller: 'receive_account_detailedCtrl'
            })
            .state('receive_account_search', {
                cache: false,
                url: '/receive_account_search',
                templateUrl: 'templates/receive_account_search.html',
                controller: 'receive_account_searchCtrl'
            })
            .state('receive_account_hide', {
                cache: false,
                url: '/receive_account_hide',
                templateUrl: 'templates/receive_account_hide.html',
                controller: 'receive_account_hideCtrl'
            })
            .state('receive_account_history', {
                cache: false,
                url: '/receive_account_history',
                templateUrl: 'templates/receive_account_history.html',
                controller: 'receive_account_searchCtrl'
            })
            .state('pay_account_detailed', {
                cache: false,
                url: '/pay_account_detailed/?id',
                templateUrl: 'templates/pay_account_detailed.html',
                controller: 'pay_account_detailedCtrl'
            })
            .state('pay_bill_search', {
                cache: false,
                url: '/pay_bill_search',
                templateUrl: 'templates/pay_bill_search.html',
                controller: 'pay_bill_searchCtrl'
            })
            .state('pay_bill_detailed', {
                cache: false,
                url: '/pay_bill_detailed/?id',
                templateUrl: 'templates/pay_bill_detailed.html',
                controller: 'pay_bill_detailedCtrl'
            })
            .state('pay_bill_hide', {
                cache: false,
                url: '/pay_bill_hide',
                templateUrl: 'templates/pay_bill_hide.html',
                controller: 'pay_bill_hideCtrl'
            })
            .state('pay_bill_history', {
                cache: false,
                url: '/pay_bill_history',
                templateUrl: 'templates/pay_bill_history.html',
                controller: 'pay_bill_searchCtrl'
            })
            .state('pay_account_search', {
                cache: false,
                url: '/pay_account_search',
                templateUrl: 'templates/pay_account_search.html',
                controller: 'pay_account_searchCtrl'
            })
            .state('pay_account_hide', {
                cache: false,
                url: '/pay_account_hide',
                templateUrl: 'templates/pay_account_hide.html',
                controller: 'pay_account_hideCtrl'
            })
            .state('pay_account_history', {
                cache: false,
                url: '/pay_account_history',
                templateUrl: 'templates/pay_account_history.html',
                controller: 'pay_account_searchCtrl'
            })


            //班组设备产量
            .state('tab-team', {
                cache: false,
                url: '/team',
                templateUrl: 'templates/tab-team.html',
                controller: 'TeamCtrl'

            })
//班组设备产量展开图
            .state('team-detail', {
                cache: false,
                url: '/modifyteam?id',
                templateUrl: "templates/team-detail.html",
                controller: "modifyteamCtrl"
            })
//发货计划
            .state('tab-plan', {
                cache: false,
                url: '/plan',
                templateUrl: 'templates/tab-plan.html',
                controller: 'PlanCtrl'
            })
//发货计划展开图
            .state('modifyplan', {
                cache: false,
                url: '/modifyplan',
                templateUrl: "templates/plan-detail.html",
                controller: "modifyplanCtrl"
            })
//库明细
            .state('tab-stock', {
                cache: false,
                url: '/stock',
                        templateUrl: 'templates/tab-stock.html',
                        controller: 'stockCtrl'
            })
          .state('stock_search', {
            cache: false,
            url: '/stock',
            templateUrl: 'templates/stock_search.html',
            controller: 'stockSearchCtrl'
          })
          .state('stock_hide', {
            cache: false,
            url: '/stock',
            templateUrl: 'templates/stock_hide.html',
            controller: 'stock_hideCtrl'
          })
          .state('stock_history', {
            cache: false,
            url: '/stock',
            templateUrl: 'templates/stock_history.html',
            controller: 'stockSearchCtrl'
          })
          /*  //发货计划展开图
            .state('modifystock', {
                cache: false,
                url: '/modifystock?id',
                templateUrl: "templates/stock-detail.html"
                //controller: "modifystockCtrl"
            })*/
//select班组浮动
            .state('select', {
                cache: false,
                url: '/select',
                templateUrl: "templates/team-select.html",
                controller: "teamSearchCtrl"
            })
            .state('select1', {
                cache: false,
                url: '/select1',
                templateUrl: "templates/team-select1.html",
                controller: "teamSearchCtrl"
            })
            .state('yingcuang', {
                cache: false,
                url: '/yingcuang',
                templateUrl: "templates/team-yingcuang.html",
                controller: "teamHideCtrl"
            })
//select发货计划浮动
            .state('plan_search', {
                cache: false,
                url: '/pselect',
                templateUrl: "templates/plan_search.html",
                controller: "PlanSearchCtrl"
            })
            .state('plan_history', {
                cache: false,
                url: '/pselect1',
                templateUrl: "templates/plan_history.html",
                controller: "PlanSearchCtrl"
            })
            .state('pyingcuang', {
                cache: false,
                url: '/pyingcuang',
                templateUrl: "templates/plan-yingcuang.html",
                controller: "PlanHideCtrl"
            })
        .state('plan_report', {
          cache: false,
          url: '/plan_report/:username',
          templateUrl: "templates/plan_report.html",
          controller: "PlanReportCtrl"
        });
//select库明细浮动
          /*  .state('sselect', {
                cache: false,
                url: '/sselect',
                templateUrl: "templates/stock-select.html"
                //controller: "Sselect"
            })
            .state('sselect1', {
                cache: false,
                url: '/sselect1',
                templateUrl: "templates/stock-select1.html"
                //controller: "Sselect1"
            })
            .state('syingcuang', {
                cache: false,
                url: '/syingcuang',
                templateUrl: "templates/stock-yingcuang.html"
                //controller: "SycCrl"
            })*/
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

    });
