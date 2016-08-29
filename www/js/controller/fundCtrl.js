angular.module('fundCtrl',[])
  /*******************************************************
   * 客户资金帐信息
   *********************************************************/
  .controller('FundCtrl', function ($state, $rootScope, $scope,services, $ionicLoading,$location, $ionicPopup, $ionicPopover) {
    $scope.resp=[];//返回的数据
    $scope.run=false;//上拉加载标志
    var requestCount={count:0};//上拉加载的条数
    $scope.flag2 = false;//返回按钮路由
    /*******************************************************
     * 加减乘除
     *********************************************************/
    function sub(a, b){
      var c, d, e;
      try {
        c = a.toString().split(".")[1].length;
      } catch (f) {
        c = 0;
      }
      try {
        d = b.toString().split(".")[1].length;
      } catch (f) {
        d = 0;
      }
      return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
    }
    function mul(a, b) {
      var c = 0,
        d = a.toString(),
        e = b.toString();
      try {
        c += d.split(".")[1].length;
      } catch (f) {}
      try {
        c += e.split(".")[1].length;
      } catch (f) {}
      return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
    }
    /******************************************************************
     * 上拉加载
     ******************************************************************/
    $scope.loadMore=function(){
      requestCount.count+=20;
      var jsTable1 = new EI.sDataTable();
      jsTable1.addColums("count");
      jsTable1.addOneRow(requestCount.count);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = 'pmopb2_app_inq';
      jsEIinfoIn.SysInfo.Sender = 'admin';
      jsEIinfoIn.add(jsTable1);
      services.toService(jsEIinfoIn).then(function (result) {
        var EIinfoOut=result.Tables[0].Table;
        if(EIinfoOut.length==0){
          $scope.run=false;
        }
        $scope.resp=$scope.resp.concat(EIinfoOut);
        angular.forEach($scope.resp,function(data){
          data.ACCVALUE=sub(data.TOTMONEY,data.TOTBALANCE);
          data.FUNDCLEAR=sub(data.ACCVALUE,data.OCCCUPYMONEY);
          data.FREEMONEY=sub(sub(data.FUNDCLEAR,data.ORDERAMT),data.BILLOWEAMT);
          data.PAIDCREDIT=data.FREEMONEY>0?0:-data.FREEMONEY;
          data.LEFTCREDIT=sub(data.CREDITAMOUNT,data.PAIDCREDIT);
        })
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }, function () {
      });
    };

    /*************************************************************************
     * 隐藏列
     *************************************************************************/
    if ($rootScope.fund != null) {
      $scope.hide = $rootScope.fund;
    }

    /*************************************************************************
     * /获取查询结果，如果为空则不知查询的结果页，反之显示查询结果
     *************************************************************************/
    var resp = services.getter();
    if (resp == null) {
      /******************************************************************
       * 加载动画
       ******************************************************************/
      $ionicLoading.show({
        template: 'Loading...',
        noBackdrop:true,
        duration:10000
      });
      var jsTable1 = new EI.sDataTable();
      jsTable1.addColums("count");
      jsTable1.addOneRow(requestCount.count);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = 'pmopb2_app_inq';
      jsEIinfoIn.SysInfo.Sender = 'admin';
      jsEIinfoIn.add(jsTable1);
      services.toService(jsEIinfoIn).then(function (resp) {
        var EIinfoOut = resp.Tables[0].Table;
        $scope.resp = EIinfoOut;
        angular.forEach($scope.resp,function(data){
          data.ACCVALUE=sub(data.TOTMONEY,data.TOTBALANCE);
          data.FUNDCLEAR=sub(data.ACCVALUE,data.OCCCUPYMONEY);
          data.FREEMONEY=sub(sub(data.FUNDCLEAR,data.ORDERAMT),data.BILLOWEAMT);
          data.PAIDCREDIT=data.FREEMONEY>0?0:-data.FREEMONEY;
          data.LEFTCREDIT=sub(data.CREDITAMOUNT,data.PAIDCREDIT);
        })
        $scope.run=true;
        $ionicLoading.hide();
      }, function () {
      });
    } else {
      $scope.flag2 = true;
      $scope.resp = resp;
    }
    /*************************************************************************
     * 点击返回按钮将myFactory清空
     *************************************************************************/
    $scope.state = function () {
      services.setter(null);
      $state.reload();
    }

    /*************************************************************************
     * 关键词查询
     *************************************************************************/
      //$scope.flag = false;
    $scope.data = {
      criteria: '',
      //搜索联系人
      search: function () {
        $scope.run=false;
        this.criteria = ''
        if (this.name) {
          this.criteria = this.name;
        } else {
          this.criteria = '';
          $scope.run=true;
        }
      }
    };

    /*************************************************************************
     * 浮动菜单
     *************************************************************************/
    $scope.popover = $ionicPopover.fromTemplateUrl('my-popover.html', {
      scope: $scope
    });
    // .fromTemplateUrl() 方法
    $ionicPopover.fromTemplateUrl('my-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
    $scope.openPopover = function ($event) {
      $scope.popover.show($event);
    };
    $scope.closePopover = function () {
      $scope.popover.hide();
    };
    // 清除浮动框
    $scope.$on('$destroy', function () {
      $scope.popover.remove();
    });
//        // 在隐藏浮动框后执行
//        $scope.$on('popover.hidden', function() {
//            // 执行代码
//        });
//        // 移除浮动框后执行
//        $scope.$on('popover.removed', function() {
//            // 执行代码
//        });
    /* /!*************************************************************************
     * 点击某条数据进入详细信息
     *************************************************************************!/
     $scope.detail = function (data) {
     $rootScope.mingxi = data;
     $state.go('fund-detail');
     }*/
  })
  .controller('FundSearchCtrl', function ($scope, services, $state, $ionicPopup, $timeout) {
    $scope.req = {CUSNAME: null, CURRENCIES: null,RECORDNAME:null};//查询参数
    var history = [];//存储查询历史数据
    /*************************************************************************
     * 查询、跳转到结果页面
     *************************************************************************/
    $scope.commit = function () {
      var jsTable1 = new EI.sDataTable();
      jsTable1.addColums("CUSNAME", "CURRENCIES","RECORDNAME");
      jsTable1.addOneRow($scope.req.CUSNAME, $scope.req.CURRENCIES,$scope.req.RECORDNAME);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = 'pmopb1_app_inq';
      jsEIinfoIn.SysInfo.Sender = 'admin';
      jsEIinfoIn.add(jsTable1);
      services.toService(jsEIinfoIn).then(function (resp) {
        var EIinfoOut = resp.Tables[0].Table;
        services.setter(EIinfoOut);
        $state.go("fund");
      }, function () {
      });
    };
    /*************************************************************************
     * 以历史记录查询、跳转到结果页面
     *************************************************************************/
    $scope.hisSearch=function(data){
      var jsTable1 = new EI.sDataTable();
      jsTable1.addColums("CUSNAME", "CURRENCIES","RECORDNAME");
      jsTable1.addOneRow(data.CUSNAME, data.CURRENCIES, null);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = 'pmopb1_app_inq';
      jsEIinfoIn.SysInfo.Sender = 'admin';
      jsEIinfoIn.add(jsTable1);
      services.toService(jsEIinfoIn).then(function (resp) {
        var EIinfoOut = resp.Tables[0].Table;
        services.setter(EIinfoOut);
        $state.go("fund");
      }, function () {
      });
    }
    /*************************************************************************
     * 保存查询记录
     *************************************************************************/
    $scope.showPopup = function () {
      $scope.data = {}
      // 自定义弹窗
      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.wifi">',
        title: '请设置一个便于识别的个性标题',
        subTitle: '',
        scope: $scope,
        buttons: [
          {text: 'Cancel'},
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!$scope.data.wifi) {
                // 不允许用户关闭，除非输入
                e.preventDefault();
              } else {
                var f = true;
                angular.forEach(history, function (item) {
                  if (item.RECORDNAME == $scope.data.wifi) {
                    f = false;
                  }
                });
                if (!f) {
                  e.preventDefault();
                  $ionicPopup.alert({
                    title: '警告',
                    template: '标题重复或为空，请重新输入！'
                  });
                } else {
                  return $scope.data.wifi;
                }
              }
            }
          }
        ]
      });
      myPopup.then(function (res) {
        if (res) {
          $scope.req.RECORDNAME = res;
        }
      });
      $timeout(function () {
        myPopup.close(); // 20秒后关闭弹窗
      }, 50000);
    };
    /*************************************************************************
     * 获取保存的查询历史
     *************************************************************************/
    var jsTable1 = new EI.sDataTable();
    var jsEIinfoIn = new EI.EIinfo();
    jsEIinfoIn.SysInfo.SvcName = 'pmopb3_app_inq';
    jsEIinfoIn.SysInfo.Sender = 'admin';
    jsEIinfoIn.add(jsTable1);
    services.toService(jsEIinfoIn).then(function (resp) {
      var EIinfoOut=resp.Tables[0].Table;
      $scope.history = EIinfoOut;
      history = EIinfoOut;
    }, function () {
    });
    /*************************************************************************
     * 删除某条查询历史
     *************************************************************************/
    $scope.remove = function (req) {
      var jsTable1 = new EI.sDataTable();
      jsTable1.addColums("RECORDNAME");
      jsTable1.addOneRow(req);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = 'pmopb1_app_del';
      jsEIinfoIn.SysInfo.Sender = 'admin';
      jsEIinfoIn.add(jsTable1);
      services.toService(jsEIinfoIn).then(function (resp) {
        $state.reload();
      }, function () {
      })
    };
    /*************************************************************************
     * 删除所有查询历史
     *************************************************************************/
    $scope.removeAll = function () {
      // 一个确认对话框
      var confirmPopup = $ionicPopup.confirm({
        title: '确定要全部删除吗？',
        template: '删了可就找不回来了！'
      });
      confirmPopup.then(function (res) {
        if (res) {
          var jsTable1 = new EI.sDataTable();
          jsTable1.addColums("RECORDNAME");
          jsTable1.addOneRow(null);
          var jsEIinfoIn = new EI.EIinfo();
          jsEIinfoIn.SysInfo.SvcName = 'pmopb1_app_del';
          jsEIinfoIn.SysInfo.Sender = 'admin';
          jsEIinfoIn.add(jsTable1);
          services.toService(jsEIinfoIn).then(function (resp) {
            $state.reload();
          }, function () {
          })
        } else {
          console.log('You are not sure');
        }
      });
    }

  })
  .controller('FundHideCtrl', function ($scope, $rootScope, $state) {
    /*************************************************************************
     * 隐藏列
     *************************************************************************/
    $scope.data = {
      CUSNAME: false,
      ACCVALUE: false,
      FUNDCLEAR: false,
      FREEMONEY: false,
      TOTMONEY: false,
      OCCCUPYMONEY: false,
      TOTBALANCE: false,
      CREDITAMOUNT: false,
      PAIDCREDIT: false,
      LEFTCREDIT: false
    };

    $scope.commit = function () {
      $rootScope.fund = $scope.data;
      $state.go('fund');
    }
  })
