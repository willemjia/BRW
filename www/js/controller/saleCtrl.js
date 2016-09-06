angular.module('saleCtrl',[])
/*******************************************************
 * 销售合同进度
 *********************************************************/
.controller('SaleCtrl', function ($state, $ionicLoading,$timeout,$rootScope,services, $scope, $location, $ionicPopup, $ionicPopover) {
  $scope.resp=[];//返回的数据
  $scope.run=false;//上拉加载标志
  var requestCount={count:0};//上拉加载的条数
  $scope.flag2 = false;//返回按钮路由

  /******************************************************************
   * 添加字段
   ******************************************************************/
  function appendStatus(EiInfoOut){
    angular.forEach(EiInfoOut,function(item){
      switch(item.STATUS){
        case 'AT':
          item.STATUS_CHN='评审完毕';
          break;
        case 'CF':
          item.STATUS_CHN='已做拆分';
          break;
        case 'CH':
          item.STATUS_CHN='变更';
          break;
        case 'CL':
          item.STATUS_CHN='结案';
          break;
        case 'NA':
          item.STATUS_CHN='录入状态';
          break;
        case 'OP':
          item.STATUS_CHN='录入完毕';
          break;
        case 'PE':
          item.STATUS_CHN='财务审核通过';
          break;
        case 'RE':
          item.STATUS_CHN='审批处理完成';
          break;
        case 'ZF':
          item.STATUS_CHN='作废';
          break;
        default:
          item.STATUS_CHN='无';
          break;
      }
    });
    return EiInfoOut;
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
    jsEIinfoIn.SysInfo.SvcName = 'pmopso2_app_inq';
    jsEIinfoIn.SysInfo.Sender = 'admin';
    jsEIinfoIn.add(jsTable1);
    services.toService(jsEIinfoIn).then(function (result) {
      var EIinfoOut=result.Tables[0].Table;
      if(EIinfoOut.length==0){
        $scope.run=false;
      }
      var EIinfoOut2=appendStatus(EIinfoOut);
      $scope.resp=$scope.resp.concat(EIinfoOut2);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }, function () {
    });
  };

  /*************************************************************************
   * 隐藏列
   *************************************************************************/
  if ($rootScope.sale != null) {
    $scope.hide = $rootScope.sale;
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
    jsEIinfoIn.SysInfo.SvcName = 'pmopso2_app_inq';
    jsEIinfoIn.SysInfo.Sender = 'admin';
    jsEIinfoIn.add(jsTable1);
    services.toService(jsEIinfoIn).then(function (resp) {
      var EIinfoOut = resp.Tables[0].Table;
      var EIinfoOut2=appendStatus(EIinfoOut);
      $scope.resp = EIinfoOut2;
      $scope.run=true;
      $ionicLoading.hide();
    }, function () {
      $ionicLoading.hide();
      $scope.resp =[{
        'ORDERNUM':'54564564',
        'SALEMAN':'张三',
        'BILLDATE':'2016-26-58',
        'ORDERCUSNAME':'lisi',
        'RECCUSNAME':'wangwu',
        'TYPE':'钢',
        'UNIVALENCE':'215100',
        'STEELGRADE':'aa',
        'STANDARD':'优良',
        'CRAFTS':'优良',
        'NORM':'aa',
        'ORDERWEIGHT':'51kg',
        'FINPROWEI':'52kg',
        'FINWAREWEI':'52kg',
        'LASTWAREDATE':'2016-26-58',
        'FINSHIPNUM':'5465',
        'LASTSHIPDATE':'2016-05-05',
        'CURRFINNUM':'541',
        'RAWSUPPLY':'lisi',
        'DELIVERY':'现金',
        'DELIVERYDATE':'2016-08-21',
        'BILLWAY':'现金',
        'REMARK':'无',
        'STATUS':'未审核'
      },
        {
          'ORDERNUM':'54564564',
          'SALEMAN':'张三',
          'BILLDATE':'2016-26-58',
          'ORDERCUSNAME':'lisi',
          'RECCUSNAME':'wangwu',
          'TYPE':'钢',
          'UNIVALENCE':'215100',
          'STEELGRADE':'aa',
          'STANDARD':'优良',
          'CRAFTS':'优良',
          'NORM':'aa',
          'ORDERWEIGHT':'51kg',
          'FINPROWEI':'52kg',
          'FINWAREWEI':'52kg',
          'LASTWAREDATE':'2016-26-58',
          'FINSHIPNUM':'5465',
          'LASTSHIPDATE':'2016-05-05',
          'CURRFINNUM':'541',
          'RAWSUPPLY':'lisi',
          'DELIVERY':'现金',
          'DELIVERYDATE':'2016-08-21',
          'BILLWAY':'现金',
          'REMARK':'无',
          'STATUS':'未审核'
        }]
    });
    //=============================================================

     //============================================================

  } else {
    $scope.flag2 = true;
    var EiInfoOut=appendStatus(resp);
    $scope.resp = EiInfoOut;
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


  /*************************************************************************
   * 点击某条数据进入详细信息
   *************************************************************************/
  $scope.detail = function (data) {
    $rootScope.mingxi = data;
    //$state.go('sale-detail');
    $state.go('sale-check');
  }
})
  .controller('SaleDetailCtrl', function ($scope,$ionicPopover, $rootScope) {
    $scope.mingxi=$rootScope.mingxi;
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
  })
  .controller('SaleSearchCtrl', function ($scope, services, $state, $ionicPopup, $timeout) {
    $scope.req = {DATE1: null, DATE2: null,ORDERCUSNAME:null, ORDERNUM: null, RECORDNAME: null};//查询参数
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
      new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
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
        $scope.search.date1 = val;
        $scope.req.DATE1 = val.Format("yyyyMMdd");
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
        $scope.search.date2 = val2;
        $scope.req.DATE2 = val2.Format("yyyyMMdd");
      }
    };
    /*************************************************************************
     * 查询、跳转到结果页面
     *************************************************************************/
    $scope.commit = function () {
      var jsTable1 = new EI.sDataTable();
      jsTable1.addColums("date1", "date2","ordernum","username", "recordName");
      jsTable1.addOneRow($scope.req.DATE1, $scope.req.DATE2, $scope.req.ORDERNUM,$scope.req.ORDERCUSNAME, $scope.req.RECORDNAME);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = 'pmopso1_app_inq';
      jsEIinfoIn.SysInfo.Sender = 'admin';
      jsEIinfoIn.add(jsTable1);
      services.toService(jsEIinfoIn).then(function (resp) {
        var EIinfoOut = resp.Tables[0].Table;
        services.setter(EIinfoOut);
        $state.go("sale");
      }, function () {
      });
    };
    /*************************************************************************
     * 以历史记录查询、跳转到结果页面
     *************************************************************************/
    $scope.hisSearch=function(data){
      var jsTable1 = new EI.sDataTable();
      jsTable1.addColums("date1", "date2", "username", "recordName");
      jsTable1.addOneRow(data.DATE1, data.DATE2, data.USERNAME, null);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = 'pmopso1_app_inq';
      jsEIinfoIn.SysInfo.Sender = 'admin';
      jsEIinfoIn.add(jsTable1);
      services.toService(jsEIinfoIn).then(function (resp) {
        var EIinfoOut = resp.Tables[0].Table;
        services.setter(EIinfoOut);
        $state.go("sale");
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
    jsEIinfoIn.SysInfo.SvcName = 'pmopso3_app_inq';
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
      jsTable1.addColums("recordName");
      jsTable1.addOneRow(req);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = 'pmopso1_app_del';
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
          jsTable1.addColums("recordName");
          jsTable1.addOneRow(null);
          var jsEIinfoIn = new EI.EIinfo();
          jsEIinfoIn.SysInfo.SvcName = 'pmopso1_app_del';
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
  .controller('SaleHideCtrl', function ($scope, $rootScope, $state) {
    /*************************************************************************
     * 隐藏列
     *************************************************************************/
    $scope.data = {
      ORDERNUM: false,
      SALEMAN: false,
      BILLDATE: false,
      ORDERCUSNAME: false,
      RECCUSNAME: false,
      TYPE: false,
      UNIVALENCE: false,
      STEELGRADE: false,
      STANDARD: false,
      CRAFTS: false,
      NORM: false,
      ORDERWEIGHT: false,
      FINPROWEI: false,
      STAUTS:false
    };

    $scope.commit = function () {
      $rootScope.sale = $scope.data;
      $state.go('sale');
    }
  })
  .controller('saleCheckCtrl', function ($state, $scope, $rootScope, $ionicPopup) {
    $scope.data = {
      stockNum: $rootScope.mingxi.ORDERNUM,
      status: null,
      opinion: null
    };
    $scope.checkCommit = function (status) {
      if (status == 'OP' && $rootScope.mingxi.STATUS == 'OP') {
        $ionicPopup.alert({
          title: '错误',
          template: '待审核状态无法执行撤销操作！'
        });
      } else {
        $scope.data.status = status;
        var jsTable1 = new EI.sDataTable();
          jsTable1.addColums("stockNum", "status", "opinion");
        jsTable1.addOneRow($scope.data.stockNum, $scope.data.status, $scope.data.opinion);
        var jsEIinfoIn = new EI.EIinfo();
        jsEIinfoIn.SysInfo.SvcName = '';
        jsEIinfoIn.SysInfo.Sender = 'admin';
        jsEIinfoIn.add(jsTable1);
        services.toService(jsEIinfoIn).then(function (resp) {
          $state.go("sale");
        }, function () {
        })
      }

    }
  })/**
 * Created by willemjia on 2016/7/14.
 */
