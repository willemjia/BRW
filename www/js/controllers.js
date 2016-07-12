angular.module('starter.controllers', [])

  /* .controller('DashCtrl', function ($scope) {
   })*/

  /* .controller('ChatsCtrl', function ($scope, Chats) {
   // With the new view caching in Ionic, Controllers are only called
   // when they are recreated or on app start, instead of every page change.
   // To listen for when this page is active (for example, to refresh data),
   // listen for the $ionicView.enter event:
   //
   //$scope.$on('$ionicView.enter', function(e) {
   //});

   $scope.chats = Chats.all();
   $scope.remove = function (chat) {
   Chats.remove(chat);
   };
   })

   .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
   $scope.chat = Chats.get($stateParams.chatId);
   })

   .controller('AccountCtrl', function ($scope) {
   $scope.settings = {
   enableFriends: true
   };

   })
   */

  //销售合同进度
  .controller('SaleCtrl', function ($state, $rootScope, $scope, flagFactory, myFactory, SaleService, $location, $ionicPopup, $ionicPopover) {
    var flag = flagFactory.getter();
    if (flag == null) {
      $rootScope.sale_flag = {
        salesMan: false,
        recCusName: false,
        type: false,
        univalence: false,
        steelGrade: false,
        standard: false,
        craft: false,
        criterion: false,
        orderWeight: false,
        proWeight: false,
        stockNum: false,
        stockDate: false,
        sendNum: false,
        lastSendDate: false,
        currentInventory: false,
        rawSupplier: false,
        deliveryType: false,
        deliveryDate: false,
        clearMethods: false,
        comments: false
      };
    } else {
      $rootScope.sale_flag = flag;
      flagFactory.setter(null);
    }
    //判断是否加载所有

    var resp = myFactory.getter();
    if (resp == null) {
      SaleService.getOrders().then(function (result) {
        $scope.orders = result;
        console.log($scope.orders);
      });
    } else {
      $scope.orders = resp;
      console.log($scope.orders);
      myFactory.setter(null);
    }

    /**
     * 详细信息
     * @type {null}
     */
    $scope.detail = function (data) {
      $rootScope.mingxi = data;
      $state.go("sale-detail");
    };

    $scope.condition = {
      orderNum: null,
      orderCusName: null,
      billDateStart: null,
      billDateEnd: null
    };
    $scope.dateRange = ['时间段', '等于', '不等于', '大于', '小于', '大于等于', '小于等于', '全部'];
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


    $scope.flag = false;
    $scope.data = {
      criteria: '',
      //搜索联系人
      search: function () {
        this.criteria = ''
        if (this.name) {
          $scope.flag = true;
          this.criteria = this.name;
        } else {
          this.criteria = '';
          $scope.flag = false;
        }
      }
    };


    $scope.showSearch = function () {
      SaleService.showSearch().then(function (result) {
        $scope.searchResult = result;
        myFactory.setter($scope.searchResult);
        console.log($scope.searchResult);
        $state.go('sale');
      });
    }

    $scope.hide = function () {
      flagFactory.setter($rootScope.sale_flag);
      console.log($rootScope.sale_flag);
      $state.go('sale');
    }
    /* SaleService.getOne($location.search().orderNum).then(function (result) {
     $scope.order = result;
     console.log(result);
     });*/

    SaleService.getSearchHistory().then(function (result) {
      $scope.searchHistory = result;
      console.log($scope.searchHistory);
    });
    $scope.getOneHistory = function (id) {
      SaleService.getOneHistory(id).then(function (result) {
        $scope.historySale = result;
        myFactory.setter($scope.historySale);
        $state.go('sale');
        console.log(result);
      });
    }
    //日期插件
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
        console.log(val);
        $scope.condition.billDateStart = val;
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
        console.log(val2);
        $scope.condition.billDateEnd = val2;
      }
    };
   /* $scope.commit = function () {
      console.log($scope.req);
      receive_bill.search($scope.req).then(function (resp) {
        state.go();
      }, function () {
      });
    };*/
    $scope.remeber = function () {
      $scope.req.isRemeber = true;
    };
  })


  //客户资金帐信息
  .controller('FundCtrl', function ($state, $rootScope, $scope, flagFactory, myFactory, FundService, $location, $ionicPopup, $ionicPopover) {
    var flag = flagFactory.getter();
    if (flag == null) {
      $rootScope.fund_flag = {
        cusName: false,
        accValue: false,
        fundClear: false,
        freeMoney: false,
        totMoney: false,
        occupyMoney: false,
        totBalance: false,
        creditAmount: false,
        paidCredit: false,
        leftCredit: false,
      };
    } else {
      $rootScope.fund_flag = flag;
      flagFactory.setter(null);
    }
    //判断是否加载所有

    var resp = myFactory.getter();
    console.log($scope.resp);
    if (resp == null) {
      FundService.getFunds().then(function (result) {
        $scope.funds = result;
        console.log($scope.funds);
      });
    } else {
      $scope.funds = resp;
      console.log($scope.funds);
      myFactory.setter(null);
    }

    $scope.condition = {
      cusName: null,
      moneyType: null
    };
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


    $scope.flag = false;
    $scope.data = {
      criteria: '',
      //搜索联系人
      search: function () {
        this.criteria = ''
        if (this.name) {
          $scope.flag = true;
          this.criteria = this.name;
        } else {
          this.criteria = '';
          $scope.flag = false;
        }
      }
    };


    $scope.showSearch = function () {
      FundService.showSearch().then(function (result) {
        $scope.searchResult = result;
        myFactory.setter($scope.searchResult);
        console.log($scope.searchResult);
        $state.go('fund');
      });
    }
    $scope.hide = function () {
      flagFactory.setter($rootScope.fund_flag);
      console.log($rootScope.fund_flag);
      $state.go('fund');
    }
    FundService.getSearchHistory().then(function (result) {
      $scope.searchHistory = result;
      console.log($scope.searchHistory);
    });
    $scope.getOneHistory = function (id) {
      FundService.getOneHistory(id).then(function (result) {
        $scope.historyFund = result;
        myFactory.setter($scope.historyFund);
        $state.go('fund');
        console.log(result);
      });
    }


  })
  .controller('saleCheckCtrl', function ($state, $scope, $rootScope, $ionicPopup) {
    $scope.data = {
      stockNum: $rootScope.mingxi.orderNum,
      status: null,
      opinion: null
    };
    $scope.checkCommit = function (status) {
      if (status == 'C' && $rootScope.mingxi.status == '待审核') {
        $ionicPopup.alert({
          title: '错误',
          template: '待审核状态无法执行撤销操作！'
        });
      } else {
        $scope.data.status = status;
        $state.go("sale");
      }

    }
  })

  //能源系统数据
  .controller('SourceCtrl', function ($state, $rootScope, $scope, flagFactory, myFactory, SourceService, $location, $ionicPopup, $ionicPopover) {
    var flag = flagFactory.getter();
    if (flag == null) {
      $rootScope.source_flag = {
        water: false,
        coal: false,
        gas: false,
        electric: false
      };
    } else {

      $rootScope.source_flag = flag;
      flagFactory.setter(null);
    }


    //判断是否加载所有
    var resp = myFactory.getter();
    console.log($scope.resp);
    if (resp == null) {
      SourceService.getSources().then(function (result) {
        console.log(result);
        $scope.sources = result;
      });
    } else {
      $scope.sources = resp;
      console.log($scope.sources);
      myFactory.setter(null);
    }


    $scope.source2 = {
      useDate: null,
      water: null,
      coal: null,
      gas: null,
      electric: null
    };
    $scope.condition = {
      useDateStart: null,
      useDateEnd: null
    };
    $scope.dateRange = ['时间段', '等于', '不等于', '大于', '小于', '大于等于', '小于等于', '全部'];
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


    $scope.flag = false;
    $scope.data = {
      criteria: '',
      //搜索联系人
      search: function () {
        this.criteria = ''
        if (this.name) {
          $scope.flag = true;
          this.criteria = this.name;
        } else {
          this.criteria = '';
          $scope.flag = false;
        }
      }
    };


    $scope.showSearch = function () {
      SourceService.showSearch().then(function (result) {
        $scope.searchResult = result;
        myFactory.setter($scope.searchResult);
        console.log($scope.searchResult);
        $state.go('source');
      });
    }

    $scope.addSource = function () {
      SourceService.addSource().then(function (result) {
        $state.go('source');
      });
    }
    $scope.hide = function () {
      flagFactory.setter($rootScope.source_flag);
      console.log($rootScope.source_flag);
      $state.go('source');
    }
    SourceService.getOne($location.search().useDate).then(function (result) {
      $scope.source1 = result;
      console.log(result);
    });

    SourceService.getSearchHistory().then(function (result) {
      $scope.searchHistory = result;
      console.log($scope.searchHistory);
    });
    $scope.getOneHistory = function (id) {
      SourceService.getOneHistory(id).then(function (result) {
        $scope.historySource = result;
        myFactory.setter($scope.historySource);
        $state.go('source');
        console.log(result);
      });
    }
    //日期插件
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
        console.log(val);
        $scope.source1.useDate = val;
        $scope.source2.useDate = val;
        $scope.condition.useDateStart = val;

      }
    };
    //日期插件
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
        console.log(val);
        $scope.source2.useDate = val;
        $scope.condition.useDateStart = val;

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
        console.log(val2);
        $scope.condition.useDateEnd = val2;
      }
    };
    $scope.commit = function () {
      console.log($scope.req);
      receive_bill.search($scope.req).then(function (resp) {
        state.go();
      }, function () {
      });
    };
    $scope.remeber = function () {
      $scope.req.isRemeber = true;
    };


  })



  //    ==================贾文光=============================================

  .controller('receive_billCtrl', function ($scope,$state, receive_bill, $ionicPopover, $rootScope, myFactory) {
    $scope.resp=[];//返回的数据
    $scope.run=false;//上拉加载标志
    var requestCount={count:0};//上拉加载的条数
    $scope.flag2 = false;//返回按钮路由

    /******************************************************************
     * 上拉加载
     ******************************************************************/
    $scope.loadMore=function(){
      requestCount.count+=100;
      receive_bill.getAll(requestCount).then(function (result) {
        var EIinfoOut=result.Tables[0].Table;
         if(EIinfoOut.length==0){
         $scope.run=false;
         }
        $scope.resp=$scope.resp.concat(EIinfoOut);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }, function () {
      });
    };

      /*************************************************************************
       * 隐藏列
       *************************************************************************/
    if ($rootScope.receive_bill != null) {
      $scope.hide = $rootScope.receive_bill;
    }

    /*************************************************************************
     * /获取查询结果，如果为空则不知查询的结果页，反之显示查询结果
     *************************************************************************/
    var resp = myFactory.getter();
    if (resp == null) {
      receive_bill.getAll(requestCount).then(function (resp) {
        var EIinfoOut = resp.Tables[0].Table;
        $scope.resp = EIinfoOut;
        $scope.run=true;
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
      myFactory.setter(null);
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
      $state.go('receive_bill_detailed');
    }
  })
  .controller('receive_bill_detailedCtrl', function ($scope, $rootScope) {
   $scope.mingxi=$rootScope.mingxi;
  })
  .controller('receive_bill_searchCtrl', function ($scope, receive_bill, $state, $ionicPopup, $timeout, myFactory) {
    //$scope.req = {date1: null, date2: null, username: null, recordName: null};//查询参数
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
      console.log($scope.req);
      receive_bill.search($scope.req).then(function (resp) {
        var EIinfoOut = resp.Tables[0].Table;
        myFactory.setter(EIinfoOut);
        $state.go("receive_bill");
      }, function () {
      });
    };
    /*************************************************************************
     * 以历史记录查询、跳转到结果页面
     *************************************************************************/
    $scope.hisSearch=function(data){
      data.RECORDNAME=null;
        receive_bill.search(data).then(function (resp) {
          var EIinfoOut = resp.Tables[0].Table;
          myFactory.setter(EIinfoOut);
          $state.go("receive_bill");
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
      }, 20000);
    };
    /*************************************************************************
     * 获取保存的查询历史
     *************************************************************************/
    receive_bill.searchHistory().then(function (resp) {
      var EIinfoOut=resp.Tables[0].Table;
      $scope.history = EIinfoOut;
      history = EIinfoOut;
    }, function () {
    });
    /*************************************************************************
     * 删除某条查询历史
     *************************************************************************/
    $scope.remove = function (req) {
      var data={RECORDNAME:req};
      receive_bill.remove(data).then(function (resp) {
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
          var req={RECORDNAME:null};
          receive_bill.remove(req).then(function (resp) {
            $state.reload();
          }, function () {
          })
        } else {
          console.log('You are not sure');
        }
      });
    }

  })
  .controller('receive_bill_hideCtrl', function ($scope, $rootScope, $state) {
    /*************************************************************************
     * 隐藏列
     *************************************************************************/
    $scope.data = {
      NUMBER: false,
      DATE: false,
      USERNAME: false,
      WAY: false,
      NATURE: false,
      USE: false,
      RECEIVEMONEY: false,
      DISCOUNTMONEY: false,
      TURNORBACKMONEY: false,
      VERIFICATION: false,
      CURRENCIES: false,
      EXCHANGE: false,
      CURRENCIESMONEY: false
    };

    $scope.commit = function () {
      $rootScope.receive_bill = $scope.data;
      $state.go('receive_bill');
    }
  })
  .controller('receive_bill_historyCtrl', function ($scope, receive_bill, $ionicPopup,myFactory,$state) {
    /*************************************************************************
     * 获取保存的查询历史
     *************************************************************************/
    receive_bill.searchHistory().then(function (resp) {
      var EIinfoOut=resp.Tables[0].Table;
      $scope.history = EIinfoOut;
      history = EIinfoOut;
    }, function () {
    });
    /*************************************************************************
     * 删除某条查询历史
     *************************************************************************/
    $scope.remove = function (req) {
      var data={RECORDNAME:req};
      receive_bill.remove(data).then(function (resp) {
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
          var req={RECORDNAME:null};
          receive_bill.remove(req).then(function (resp) {
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
      var req={DATE1:data.DATE1,DATE2:data.DATE2,USERNAME:data.USERNAME,RECORDNAME:null};
      receive_bill.search(req).then(function (resp) {
        var EIinfoOut = resp.Tables[0].Table;
        myFactory.setter(EIinfoOut);
        $state.go("receive_bill");
      }, function () {
      });
    }
  })
  .controller('receive_accountCtrl', function ($scope, receive_account, $ionicPopover, $rootScope) {
    $scope.flag2 = false;//返回按钮路由
    $scope.resp=[];//返回的数据
    $scope.run=false;//上拉加载标志
    var requestCount={count:0};//上拉加载的条数

    /******************************************************************
     * 上拉加载
     ******************************************************************/
    $scope.loadMore=function(){
      requestCount.count+=100;
      receive_account.getAll(requestCount).then(function (result) {
        var EIinfoOut=result.Tables[0].Table;
        if(EIinfoOut.length==0){
          $scope.run=false;
        }
        $scope.resp=$scope.resp.concat(EIinfoOut);
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
    var resp = receive_account.getter();
    if (resp == null) {
      receive_account.getAll(requestCount).then(function (resp) {
        var EIinfoOut=resp.Tables[0].Table;
        $scope.resp = EIinfoOut;
        for (var i = 0; i < $scope.resp.length; i++) {
          $scope.resp[i].key = (resp[i].USERNAME.substring(0, 1));
        }
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
      receive_account.setter(null);
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
  .controller('receive_account_searchCtrl', function ($scope, receive_account, $state, $ionicPopup, $timeout) {
    $scope.req = {date1: null, date2: null, username: null, recordName: null};
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
    //日期插件
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
        $scope.search.date1=val;
        $scope.req.date1 = val.format('yyyyMMdd');
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
        $scope.req.date2 = val2.format('yyyyMMdd');
      }
    };
    $scope.commit = function () {
      console.log($scope.req);
      receive_account.search($scope.req).then(function (resp) {
        var EIinfoOut = resp.Tables[0].Table;
        receive_account.setter(EIinfoOut);
        $state.go("receive_account");
      }, function () {
      });
    };
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
          $scope.req.recordName = res;
        }
      });
      $timeout(function () {
        myPopup.close(); // 20秒后关闭弹窗
      }, 20000);
    };

    receive_account.searchHistory().then(function (resp) {
      var jsEIinfoOut=resp.Tables[0].Table;
      $scope.history = jsEIinfoOut;
      history = jsEIinfoOut;
    }, function () {
    })

    $scope.remove = function (req) {
      var data={RECORDNAME:req};
      receive_account.remove(data).then(function (resp) {
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
          var req={RECORDNAME:null};
          receive_account.remove(req).then(function (resp) {
            $state.reload();
          }, function () {
          })
        } else {
          console.log('You are not sure');
        }
      });
    }
  })
  .controller('receive_account_detailedCtrl', function ($scope, $location, receive_account) {
    $scope.data = {id: $location.search().id};
    receive_account.getAll().then(function (resp) {
      for (var i = 0; i < resp.length; i++) {
        if (resp[i].id == $scope.data.id) {
          $scope.info = resp[i];
          console.log(resp[i]);
        }
      }
    }, function () {
    });
  })
  .controller('receive_account_historyCtrl', function ($scope, receive_account, $ionicPopup) {
    receive_account.searchHistory().then(function (resp) {
      $scope.history = resp;
    }, function () {
    })
    $scope.remove = function (req) {
      receive_account.remove(req).then(function (resp) {
        $state.reload();
      }, function () {
      })
    }
    $scope.removeAll = function () {
      // 一个确认对话框
      var confirmPopup = $ionicPopup.confirm({
        title: '确定要删除吗？',
        template: '删了可就找不回来了！'
      });
      confirmPopup.then(function (res) {
        if (res) {
          var req={recordName:null}
          receive_account.remove(req).then(function (resp) {
            $state.reload();
          }, function () {
          })
        } else {
          console.log('You are not sure');
        }
      });
    }
  })
  .controller('receive_account_hideCtrl', function ($scope, $rootScope, $state) {
    $scope.data = {
      username: false,
      formInvoiceNum: false,
      date: false,
      invoiceNum: false,
      invoiceCode: false,
      currencies: false,
      billMoney: false,
      verificationMoney: false,
      verificationingMoney: false
    };
    $scope.commit = function () {
      ;
      $rootScope.receive_account = $scope.data;
      $state.go('receive_account');
    }
  })
  .controller('pay_billCtrl', function ($scope, pay_bill, $ionicPopover, $rootScope) {
    $scope.resp=[];
    $scope.run=true;//判断是否要上拉加载
    var requestCount={count:0};
    $scope.loadMore=function(){
      requestCount.count+=100;
      pay_bill.getAll(requestCount).then(function (result) {
       /* if(result.Tables[0].Table.length==0){
          $scope.run=false;
        }*/
        $scope.resp=$scope.resp.concat(result);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }, function () {
      });

    };
    /*$scope.$on('stateChangeSuccess', function() {
      $scope.loadMore();
    });*/

    $scope.flag2 = false;
    if ($rootScope.pay_bill != null) {
      $scope.hide = $rootScope.pay_bill;
      console.log($scope.hide);
    }
    var resp = pay_bill.getter();
    if (resp == null) {
      pay_bill.getAll(requestCount).then(function (resp) {
        console.log(resp);
        $scope.resp = resp;
      }, function () {
      });
    } else {
      $scope.flag2 = true;
      $scope.resp = resp;
    }
    $scope.state = function () {
      pay_bill.setter(null);
    }

    //浮动框
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
    $scope.flag = false;
    $scope.data = {
      criteria: '',
      //搜索联系人
      search: function () {
        this.criteria = ''
        if (this.name) {
          $scope.flag = true;
          this.criteria = this.name;
        } else {
          this.criteria = '';
          $scope.flag = false;
        }
      }
    }

  })
  .controller('pay_bill_searchCtrl', function ($scope, pay_bill, $state, $ionicPopup, $timeout) {
    $scope.req = {dateRange: null, date1: null, date2: null, username: null, recordName: null};
    $scope.dateRange = ['时间段', '等于', '不等于', '大于', '小于', '大于等于', '小于等于', '全部'];
    //日期插件
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
        console.log(val);
        $scope.req.date1 = val;
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
        console.log(val2);
        $scope.req.date2 = val2;
      }
    };
    $scope.commit = function () {
      console.log($scope.req);
      pay_bill.search($scope.req).then(function (resp) {
        pay_bill.setter(resp);
        $state.go("pay_bill");
      }, function () {
      });
    };
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
                return $scope.data.wifi;
              }
            }
          }
        ]
      });
      myPopup.then(function (res) {
        if (res) {
          $scope.req.recordName = res;
          console.log($scope.req.recordName);
        }
      });
      $timeout(function () {
        myPopup.close(); // 10秒后关闭弹窗
      }, 10000);
    };

    pay_bill.searchHistory().then(function (resp) {
      $scope.history = resp;
    }, function () {
    })

    $scope.remove = function (req) {
      pay_bill.remove(req).then(function (resp) {
        $state.reload();
      }, function () {
      })
    }
    $scope.removeAll = function () {
      pay_bill.removeAll().then(function (resp) {
        $state.reload();
      }, function () {
      })
    }
  })
  .controller('pay_bill_detailedCtrl', function ($scope, $location, pay_bill) {
    $scope.data = {id: $location.search().id};
    console.log($scope.data);
    pay_bill.getAll().then(function (resp) {
      for (var i = 0; i < resp.length; i++) {
        if (resp[i].id == $scope.data.id) {
          $scope.info = resp[i];
          console.log(resp[i]);
        }
      }
    }, function () {
    });
  })
  .controller('pay_bill_hideCtrl', function ($scope, $rootScope, $state) {
    $scope.data = {
      payRequisitionNum: false,
      invoiceCode: false,
      invoiceNum: false,
      reportNum: false,
      contractNum: false,
      applicationMoney: false,
      invoiceMoney: false,
      payNum: false,
      payDate: false,
      payUse: false,
      originMoney: false,
      currencies: false,
      renmingbi: false
    };
    $scope.commit = function () {
      $rootScope.pay_bill = $scope.data;
      $state.go('pay_bill');
    }
  })
  .controller('pay_bill_historyCtrl', function ($scope, pay_bill, $ionicPopup) {
    pay_bill.searchHistory().then(function (resp) {
      $scope.history = resp;
    }, function () {
    })
    $scope.remove = function (req) {
      pay_bill.remove(req).then(function (resp) {
        $state.reload();
      }, function () {
      })
    }
    $scope.removeAll = function () {
      // 一个确认对话框
      var confirmPopup = $ionicPopup.confirm({
        title: '确定要删除吗？',
        template: '删了可就找不回来了！'
      });
      confirmPopup.then(function (res) {
        if (res) {
          pay_bill.removeAll().then(function (resp) {
            $state.reload();
          }, function () {
          })
        } else {
          console.log('You are not sure');
        }
      });
    }
  })
  .controller('pay_accountCtrl', function ($scope, pay_account, $ionicPopover, $rootScope) {
    $scope.flag2 = false;
    if ($rootScope.pay_account != null) {
      $scope.hide = $rootScope.pay_account;
      console.log($scope.hide);
    }
    var resp = pay_account.getter();
    if (resp == null) {
      pay_account.getAll().then(function (resp) {
        console.log(resp);
        $scope.resp = resp;
        for (var i = 0; i < $scope.resp.length; i++) {
          $scope.resp[i].key = (resp[i].username.substring(0, 1));
        }
      }, function () {
      });
    } else {
      $scope.flag2 = true;
      $scope.resp = resp;
      for (var i = 0; i < $scope.resp.length; i++) {
        $scope.resp[i].key = (resp[i].username.substring(0, 1));
      }
    }
    $scope.state = function () {
      pay_account.setter(null);
    }
    //浮动框
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
    $scope.flag = false;
    $scope.data = {
      criteria: '',
      //搜索联系人
      search: function () {
        this.criteria = ''
        if (this.name) {
          $scope.flag = true;
          this.criteria = this.name;
        } else {
          this.criteria = '';
          $scope.flag = false;
        }
      }
    }
  })
  .controller('pay_account_detailedCtrl', function ($scope, $location, pay_account) {
    $scope.data = {id: $location.search().id};
    pay_account.getAll().then(function (resp) {
      for (var i = 0; i < resp.length; i++) {
        if (resp[i].id == $scope.data.id) {
          $scope.info = resp[i];
          console.log(resp[i]);
        }
      }
    }, function () {
    });
  })
  .controller('pay_account_searchCtrl', function ($scope, pay_account, $ionicPopup, $timeout, $state) {
    $scope.req = {dateRange: null, date1: null, date2: null, username: null, recordName: null};
    $scope.dateRange = ['时间段', '等于', '不等于', '大于', '小于', '大于等于', '小于等于', '全部'];
    //日期插件
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
        console.log(val);
        $scope.req.date1 = val;
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
        console.log(val2);
        $scope.req.date2 = val2;
      }
    };
    $scope.commit = function () {
      console.log($scope.req);
      pay_account.search($scope.req).then(function (resp) {
        pay_account.setter(resp);
        $state.go("pay_account");
      }, function () {
      });
    };
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
                return $scope.data.wifi;
              }
            }
          }
        ]
      });
      myPopup.then(function (res) {
        if (res) {
          $scope.req.recordName = res;
          console.log($scope.req.recordName);
        }
      });
      $timeout(function () {
        myPopup.close(); // 10秒后关闭弹窗
      }, 10000);
    };

    pay_account.searchHistory().then(function (resp) {
      $scope.history = resp;
    }, function () {
    })

    $scope.remove = function (req) {
      pay_account.remove(req).then(function (resp) {
        $state.reload();
      }, function () {
      })
    }
    $scope.removeAll = function () {
      pay_account.removeAll().then(function (resp) {
        $state.reload();
      }, function () {
      })
    }
  })
  .controller('pay_account_hideCtrl', function ($scope, $rootScope, $state) {
    $scope.data = {
      username: false,
      invoiceManageNum: false,
      invoiceNature: false,
      invoiceCode: false,
      invoiceNum: false,
      currencies: false,
      billNum: false,
      invoiceMoney: false,
      applicationMoney: false,
      payMoney: false,
      surplusMoney: false,
      status: false
    };
    $scope.commit = function () {
      $rootScope.pay_account = $scope.data;
      $state.go('pay_account');
    }
  })
  .controller('pay_account_historyCtrl', function ($scope, pay_account, $ionicPopup) {
    pay_account.searchHistory().then(function (resp) {
      $scope.history = resp;
    }, function () {
    })
    $scope.remove = function (req) {
      pay_account.remove(req).then(function (resp) {
        $state.reload();
      }, function () {
      })
    }
    $scope.removeAll = function () {
      // 一个确认对话框
      var confirmPopup = $ionicPopup.confirm({
        title: '确定要删除吗？',
        template: '删了可就找不回来了！'
      });
      confirmPopup.then(function (res) {
        if (res) {
          pay_account.removeAll().then(function (resp) {
            $state.reload();
          }, function () {
          })
        } else {
          console.log('You are not sure');
        }
      });
    }
  })
//=====================================================================================

;
