angular.module('pay_billCtrl', [])
/*******************************************************
 * 应付票据
 *********************************************************/
.controller('pay_billCtrl', function ($scope,$state, services, $ionicPopover, $rootScope) {
  $scope.flag2 = false;//返回按钮路由
  $scope.resp=[];//返回的数据
  $scope.run=true;//分页查询
  var isSelect=false;//是否是查询数据分页
  var requestCount={count:0};//上拉加载的条数


  /*************************************************************************
   * 隐藏列
   *************************************************************************/
  $scope.flag2 = false;
  if ($rootScope.pay_bill != null) {
    $scope.hide = $rootScope.pay_bill;
  }
  /*************************************************************************
   * /获取查询结果，如果为空则不知查询的结果页，反之显示查询结果
   *************************************************************************/
  var resp = services.getter();
  if (resp != null) {
    isSelect=true;
    $scope.flag2 = true;
    if(resp.length>20){
      $scope.resp = resp;
      resp=resp.slice(20);
    }else{
      $scope.resp = resp;
      $scope.run=false;
    }
  };
  /******************************************************************
   * 加载更多
   ******************************************************************/
  $scope.loadMore=function(){
    if(isSelect){
      if(resp.length>20){
        $scope.resp=$scope.resp.concat(resp.slice(0,20));
        $scope.$broadcast('scroll.infiniteScrollComplete');
        resp=resp.slice(20);
      } else{
        $scope.resp=$scope.resp.concat(resp);
        $scope.run=false;
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }
    }else {
      var jsTable1 = new EI.sDataTable();
      jsTable1.addColums("count");
      jsTable1.addOneRow(requestCount.count);
      requestCount.count += 20;
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = 'pmopf2_app_inq';
      jsEIinfoIn.SysInfo.Sender = 'admin';
      jsEIinfoIn.add(jsTable1);
      services.toService(jsEIinfoIn).then(function (result) {
        var EIinfoOut = result.Tables[0].Table;
        if (EIinfoOut.length == 0) {
          $scope.run = false;
        }
        $scope.resp = $scope.resp.concat(EIinfoOut);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }, function () {
      });
    }
  };

  /*************************************************************************
   * 点击返回按钮将myFactory清空
   *************************************************************************/
  $scope.state = function (){
    services.setter(null);
    $state.reload();
  }

  /*************************************************************************
   * 悬浮按钮
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

  /*************************************************************************
   * 关键词查询
   *************************************************************************/
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
  }
  /*************************************************************************
   * 点击某条数据进入详细信息
   *************************************************************************/
  $scope.detail = function (data) {
    $rootScope.mingxi = data;
    $state.go('pay_bill_detailed');
  }
})
  .controller('pay_bill_searchCtrl', function ($scope,services, $state, $ionicPopup, $timeout,$ionicLoading) {
    $scope.req = {DATE1: null, DATE2: null, USERNAME: null, RECORDNAME: null};//查询参数
    $scope.search = {date1: null, date2: null};//显示日期
    var history = [];//存储查询历史数据
    /****************************************************************
     *日期转换
     ****************************************************************/
    Date.prototype.Format = function (fmt) { //author: meizz
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    };
    /*************************************************************************
     * 日期插件
     *************************************************************************/
    var disabledDates = [
      new Date(1437719836326),
      new Date(),
      new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
      new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
      new Date("08-14-2015"), //Short format
      new Date(1439676000000) //UNIX format
    ];
    $scope.datepickerObject = {
      titleLabel: '请选择日期',  //Optional
      todayLabel: '今天',  //Optional
      closeLabel: '关闭',  //Optional
      setLabel: '确定',  //Optional
      setButtonType: 'button-assertive',  //Optional
      todayButtonType: 'button-assertive',  //Optional
      closeButtonType: 'button-assertive',  //Optional
      inputDate: new Date(),  //Optional
      mondayFirst: true,  //Optional
      disabledDates: disabledDates, //Optional
      templateType: 'popup', //Optional
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2012, 8, 2), //Optional
      to: new Date(2018, 8, 25),  //Optional
      callback: function (val) {  //Mandatory
        datePickerCallback(val);
      },
      dateFormat: 'yyyy-MM-dd', //Optional
      closeOnSelect: false //Optional
    };
    var datePickerCallback = function (val) {
      if (typeof(val) === 'undefined') {
        console.log('No date selected');
      } else {
        $scope.search.date1 = val;
        $scope.req.DATE1 = val.Format("yyyyMMdd");
      }
    };
    //日期插件
    $scope.datepickerObject2 = {
      titleLabel: '请选择日期',  //Optional
      todayLabel: '今天',  //Optional
      closeLabel: '关闭',  //Optional
      setLabel: '确定',  //Optional
      setButtonType: 'button-assertive',  //Optional
      todayButtonType: 'button-assertive',  //Optional
      closeButtonType: 'button-assertive',  //Optional
      inputDate: new Date(),  //Optional
      mondayFirst: true,  //Optional
      disabledDates: disabledDates, //Optional
      templateType: 'popup', //Optional
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2012, 8, 2), //Optional
      to: new Date(2018, 8, 25),  //Optional
      callback: function (val2) {  //Mandatory
        datePickerCallback2(val2);
      },
      dateFormat: 'yyyy-MM-dd', //Optional
      closeOnSelect: false //Optional
    };
    var datePickerCallback2 = function (val2) {
      if (typeof(val2) === 'undefined') {
        console.log('No date selected');
      } else {
        $scope.search.date2 = val2;
        $scope.req.DATE2 = val2.Format("yyyyMMdd");
      }
    };
    /*************************************************************************
     * 查询、跳转到结果页面
     *************************************************************************/
    $scope.commit = function () {
      /******************************************************************
       * 加载动画
       ******************************************************************/
      $ionicLoading.show({
        template: '正在查询',
        noBackdrop:true,
        duration:10000
      });
      var jsTable = new EI.sDataTable();
      jsTable.addColums("date1", "date2", "username", "recordName");
      jsTable.addOneRow($scope.req.DATE1, $scope.req.DATE2, $scope.req.USERNAME, $scope.req.RECORDNAME);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = 'pmopf1_app_inq';
      jsEIinfoIn.SysInfo.Sender = 'admin';
      jsEIinfoIn.add(jsTable);
      services.toService(jsEIinfoIn).then(function (resp) {
        var EIinfoOut = resp.Tables[0].Table;
        services.setter(EIinfoOut);
        $ionicLoading.hide();
        $state.go("pay_bill");
      }, function () {
      });
    };
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
                // 不允许用户关闭，除非输入 wifi 密码
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
        myPopup.close(); // 50秒后关闭弹窗
      }, 50000);
    };
    /*************************************************************************
     * 获取保存的查询历史
     *************************************************************************/
    var jsTable = new EI.sDataTable();
    var jsEIinfoIn = new EI.EIinfo();
    jsEIinfoIn.SysInfo.SvcName = 'pmopf3_app_inq';
    jsEIinfoIn.SysInfo.Sender = 'admin';
    jsEIinfoIn.add(jsTable);
    services.toService(jsEIinfoIn).then(function (resp) {
      var EIinfoOut=resp.Tables[0].Table;
      $scope.history = EIinfoOut;
      history = EIinfoOut;
    }, function () {
    })
    /*************************************************************************
     * 删除某条查询历史
     *************************************************************************/
    $scope.remove = function (req) {
      var jsTable = new EI.sDataTable();
      jsTable.addColums("RECORDNAME");
      jsTable.addOneRow(req);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = 'pmopf1_app_del';
      jsEIinfoIn.SysInfo.Sender = 'admin';
      jsEIinfoIn.add(jsTable);
      services.toService(jsEIinfoIn).then(function (resp) {
        $state.reload();
      }, function () {
      })
    }
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
          var jsTable = new EI.sDataTable();
          jsTable.addColums("RECORDNAME");
          jsTable.addOneRow(null);
          var jsEIinfoIn = new EI.EIinfo();
          jsEIinfoIn.SysInfo.SvcName = 'pmopf1_app_del';
          jsEIinfoIn.SysInfo.Sender = 'admin';
          jsEIinfoIn.add(jsTable);
          services.toService(jsEIinfoIn).then(function (resp) {
            $state.reload();
          }, function () {
          })
        } else {
          console.log('You are not sure');
        }
      });
    }
    /*************************************************************************
     * 以历史记录查询、跳转到结果页面
     *************************************************************************/
    $scope.hisSearch=function(data){
      /******************************************************************
       * 加载动画
       ******************************************************************/
      $ionicLoading.show({
        template: '正在查询',
        noBackdrop:true,
        duration:10000
      });
      var jsTable = new EI.sDataTable();
      jsTable.addColums("date1", "date2", "username", "recordName");
      jsTable.addOneRow(data.DATE1, data.DATE2, data.USERNAME, null);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = 'pmopf1_app_inq';
      jsEIinfoIn.SysInfo.Sender = 'admin';
      jsEIinfoIn.add(jsTable);
      services.toService(jsEIinfoIn).then(function (resp) {
        var EIinfoOut = resp.Tables[0].Table;
        services.setter(EIinfoOut);
        $ionicLoading.hide();
        $state.go("pay_bill");
      }, function () {
      });
    }
  })
  .controller('pay_bill_detailedCtrl', function ($scope,$rootScope) {
    $scope.mingxi=$rootScope.mingxi;
  })
  .controller('pay_bill_hideCtrl', function ($scope, $rootScope, $state) {
    $scope.data = {
      PAYREQUISITIONNUM: false,
      INVOICECODE: false,
      INVOICENUM: false,
      REPORTNUM: false,
      CONTRACNUM: false,
      APPLICATIONMONEY: false,
      INVOICEMONEY: false,
      PAYNUM: false,
      PAYDATE: false,
      PAYUSE: false,
      ORIGINMONEY: false,
      CURRENCIES: false,
      RENMINBI: false
    };
    $scope.commit = function () {
      $rootScope.pay_bill = $scope.data;
      $state.go('pay_bill');
    }
  })/**
 * Created by willemjia on 2016/7/14.
 */
