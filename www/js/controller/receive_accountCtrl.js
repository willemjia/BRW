angular.module('receive_accountCtrl',[])
/*******************************************************
 * 应收账款
 *********************************************************/
.controller('receive_accountCtrl', function ($scope,$state, services, $ionicPopover, $rootScope,$ionicLoading) {
  $scope.flag2 = false;//返回按钮路由
  $scope.resp=[];//返回的数据
  $scope.run=false;//上拉加载标志
  var requestCount={count:0};//上拉加载的条数


  /******************************************************************
   * 上拉加载
   ******************************************************************/
  $scope.loadMore=function(){
    requestCount.count+=20;
    var jsTable1 = new EI.sDataTable();
    jsTable1.addColums("count");
    jsTable1.addOneRow(requestCount.count);
    var jsEIinfoIn = new EI.EIinfo();
    jsEIinfoIn.SysInfo.SvcName = 'pmops2_app_inq';
    jsEIinfoIn.SysInfo.Sender = 'admin';
    jsEIinfoIn.add(jsTable1);
    services.toService(jsEIinfoIn).then(function (result) {
      var EIinfoOut=result.Tables[0].Table;
      if(EIinfoOut.length==0){
        $scope.run=false;
      }
      $scope.resp=$scope.resp.concat(EIinfoOut);
      for (var i = 0; i < $scope.resp.length; i++) {
        $scope.resp[i].key = ($scope.resp[i].USERNAME.substring(0, 1));
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }, function () {
    });
  };
  /*************************************************************************
   * 隐藏列
   *************************************************************************/
  if ($rootScope.receive_account != null) {
    $scope.hide = $rootScope.receive_account;
  }
  /*************************************************************************
   * 获取查询结果，如果为空则不是查询的结果页，反之显示查询结果
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
    jsEIinfoIn.SysInfo.SvcName = 'pmops2_app_inq';
    jsEIinfoIn.SysInfo.Sender = 'admin';
    jsEIinfoIn.add(jsTable1);
    services.toService(jsEIinfoIn).then(function (resp) {
      var EIinfoOut=resp.Tables[0].Table;
      $scope.resp = EIinfoOut;
      for (var i = 0; i < $scope.resp.length; i++) {
        $scope.resp[i].key = ($scope.resp[i].USERNAME.substring(0, 1));
      }
      $ionicLoading.hide();
      $scope.run=true;
    }, function () {
    });
  } else {
    $scope.flag2 = true;
    $scope.resp = resp;
    for (var i = 0; i < $scope.resp.length; i++) {
      $scope.resp[i].key = (resp[i].USERNAME.substring(0, 1));
    }
  }
  /*************************************************************************
   * 点击返回按钮，保存查询对象空间清空
   *************************************************************************/
  $scope.state = function () {
    services.setter(null);
    $state.reload();
  }
  /*************************************************************************
   * 浮动框
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
  /*************************************************************************
   * 关键词查询
   *************************************************************************/
  $scope.data = {
    criteria: '',
    //搜索联系人
    search: function () {
      this.criteria = ''
      if (this.name) {
        $scope.run=false;
        this.criteria = this.name;
      } else {
        this.criteria = '';
        $scope.run=true;
      }
    }
  }
  /*************************************************************************
   * 点击某一条数据转到详细信息页面
   *************************************************************************/
  $scope.detail = function (data) {
    $rootScope.mingxi = data;
    $state.go('receive_account_detailed');
  }
})
  .controller('receive_account_searchCtrl', function ($scope,services,  $state, $ionicPopup, $timeout) {
    $scope.req = {DATE1: null, DATE2: null, USERNAME: null, RECORDNAME: null};
    $scope.search = {date1: null, date2: null};
    var history = [];
    /*********************************************************************
     *日期转换
     *********************************************************************/
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
    /*********************************************************************
     *日期插件
     *********************************************************************/
    $scope.datepickerObject = {
      titleLabel: 'Title',  //Optional
      todayLabel: 'Today',  //Optional
      closeLabel: 'Close',  //Optional
      setLabel: 'Set',  //Optional
      setButtonType: 'button-assertive',  //Optional
      todayButtonType: 'button-assertive',  //Optional
      closeButtonType: 'button-assertive',  //Optional
      inputDate: new Date(),  //Optional
      mondayFirst: true,  //Optional
      disabledDates: disabledDates, //Optional
      weekDaysList: weekDaysList, //Optional
      monthList: monthList, //Optional
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

    var disabledDates = [
      new Date(1437719836326),
      new Date(),
      new Date(2015, 7, 10), //months are 0-based, this is August, 10!
      new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
      new Date("08-14-2015"), //Short format
      new Date(1439676000000) //UNIX format
    ];
    var weekDaysList = ["Sun", "Mon", "Tue", "Wed", "thu", "Fri", "Sat"];
    var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var datePickerCallback = function (val) {
      if (typeof(val) === 'undefined') {
        console.log('No date selected');
      } else {
        $scope.search.date1=val;
        $scope.req.DATE1 = val.Format('yyyyMMdd');
      }
    };
    //日期插件
    $scope.datepickerObject2 = {
      titleLabel: 'Title',  //Optional
      todayLabel: 'Today',  //Optional
      closeLabel: 'Close',  //Optional
      setLabel: 'Set',  //Optional
      setButtonType: 'button-assertive',  //Optional
      todayButtonType: 'button-assertive',  //Optional
      closeButtonType: 'button-assertive',  //Optional
      inputDate: new Date(),  //Optional
      mondayFirst: true,  //Optional
      disabledDates: disabledDates, //Optional
      weekDaysList: weekDaysList, //Optional
      monthList: monthList, //Optional
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
        $scope.search.date2=val2;
        $scope.req.DATE2 = val2.Format('yyyyMMdd');
      }
    };
    /*********************************************************************
     *查找并返回到页面
     *********************************************************************/
    $scope.commit = function () {
      var jsTable = new EI.sDataTable();
      jsTable.addColums("date1", "date2", "username", "recordName");
      jsTable.addOneRow($scope.req.DATE1, $scope.req.DATE2, $scope.req.USERNAME, $scope.req.RECORDNAME);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = 'pmops1_app_inq';
      jsEIinfoIn.SysInfo.Sender = 'admin';
      jsEIinfoIn.add(jsTable);
      services.toService(jsEIinfoIn).then(function (resp) {
        var EIinfoOut = resp.Tables[0].Table;
        services.setter(EIinfoOut);
        $state.go("receive_account");
      }, function () {
      });
    };
    /*********************************************************************
     *记住查询
     *********************************************************************/
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
    /*********************************************************************
     *查询历史记录
     *********************************************************************/
    var jsTable = new EI.sDataTable();
    var jsEIinfoIn = new EI.EIinfo();
    jsEIinfoIn.SysInfo.SvcName = 'pmops3_app_inq';
    jsEIinfoIn.SysInfo.Sender = 'admin';
    jsEIinfoIn.add(jsTable);
    services.toService(jsEIinfoIn).then(function (resp) {
      var jsEIinfoOut=resp.Tables[0].Table;
      $scope.history = jsEIinfoOut;
      history = jsEIinfoOut;
    }, function () {
    })
    /*********************************************************************
     *删除某条历史记录
     *********************************************************************/
    $scope.remove = function (req) {
      var jsTable = new EI.sDataTable();
      jsTable.addColums(RECORDNAME);
      jsTable.addOneRow(req);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = 'pmops1_app_del';
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
          jsTable.addColums(RECORDNAME);
          jsTable.addOneRow(null);
          var jsEIinfoIn = new EI.EIinfo();
          jsEIinfoIn.SysInfo.SvcName = 'pmops1_app_del';
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
      var jsTable = new EI.sDataTable();
      jsTable.addColums("date1", "date2", "username", "recordName");
      jsTable.addOneRow(data.DATE1, data.DATE2, data.USERNAME, null);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = 'pmops1_app_inq';
      jsEIinfoIn.SysInfo.Sender = 'admin';
      jsEIinfoIn.add(jsTable);
      services.toService(jsEIinfoIn).then(function (resp) {
        var EIinfoOut = resp.Tables[0].Table;
        services.setter(EIinfoOut);
        $state.go("receive_account");
      }, function () {
      });
    }
  })
  .controller('receive_account_detailedCtrl', function ($scope, $rootScope) {
    $scope.mingxi=$rootScope.mingxi;
  })
  .controller('receive_account_hideCtrl', function ($scope, $rootScope, $state) {
    $scope.data = {
      USERNAME: false,
      FORMINVOICENUM: false,
      DATE: false,
      INVOICENUM: false,
      INVOICECODE: false,
      CURRENCIES: false,
      BILLMONEY: false,
      VERIFICATIONMONEY: false,
      VERIFICATIONINGMONEY: false
    };
    $scope.commit = function () {
      $rootScope.receive_account = $scope.data;
      $state.go('receive_account');
    }
  })/**
 * Created by willemjia on 2016/7/14.
 */
