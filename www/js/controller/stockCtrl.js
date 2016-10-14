angular.module('stockController', [])
.controller('stockCtrl',function($scope,$state,services,  $ionicPopover, $rootScope){
  $scope.resp=[];//返回的数据
  $scope.run=true;//分页查询
  var isSelect=false;//是否是查询数据分页
  var requestCount={count:0};//上拉加载的条数
  $scope.flag2 = false;//返回按钮路由
  /******************************************************************
   * 处理数据
   ******************************************************************/
function getArray(EIinfoOut){
    var array=[];
    angular.forEach(EIinfoOut,function(data){
      var list=array[array.length-1];
      if(list!=null || list!=undefined) {
        if (data.USERNAME == (list[list.length - 1]).USERNAME) {
          array[array.length - 1].push(data);
        } else {
          var arr=[];
          arr.USERNAME=data.USERNAME;
          arr.push(data);
          array.push(arr);
        }
      } else{
        var arr=[];
        arr.USERNAME=data.USERNAME;
        arr.push(data);
        array.push(arr);
      }
    });
    return array;
  }

  /*************************************************************************
   * 隐藏列
   *************************************************************************/
  if ($rootScope.stock != null) {
    $scope.hide = $rootScope.stock;
  }

  /*************************************************************************
   * /获取查询结果，如果为空则不知查询的结果页，反之显示查询结果
   *************************************************************************/
  var resp = services.getter();
  if (resp != null) {
    isSelect=true;
    $scope.flag2 = true;
    if(resp.length>20){
      var EiInfoOut=getArray(resp.slice(0,20));
      $scope.resp = EiInfoOut;
      resp=resp.slice(20);
    }else{
      var EiInfoOut=getArray(resp);
      $scope.resp = EiInfoOut;
      $scope.run=false;
    }
  };
  /******************************************************************
   * 上拉加载
   ******************************************************************/
  $scope.loadMore=function(){
    if(isSelect){
      if(resp.length>20){
        var EiInfoOut=getArray(resp.slice(0,20));
        $scope.resp=$scope.resp.concat(EiInfoOut);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        resp=resp.slice(20);
      } else{
        var EiInfoOut=getArray(resp);
        $scope.resp=$scope.resp.concat(EiInfoOut);
        $scope.run=false;
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }
    }else {
      var jsTable1 = new EI.sDataTable();
      jsTable1.addColums("count");
      jsTable1.addOneRow(requestCount.count);
      requestCount.count += 20;
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = 'pmopmma2_app_inq';
      jsEIinfoIn.SysInfo.Sender = 'admin';
      jsEIinfoIn.add(jsTable1);
      services.toService(jsEIinfoIn).then(function (result) {
        var EIinfoOut = result.Tables[0].Table;
        if (EIinfoOut.length == 0) {
          $scope.run = false;
        }
        ;
        var array = getArray(EIinfoOut);
        $scope.resp = $scope.resp.concat(array);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }, function () {
      });
    }
  };

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
  //$scope.detail = function (data) {
  //  $rootScope.mingxi = data;
  //  $state.go('receive_bill_detailed');
  //}
})
  //.controller('receive_bill_detailedCtrl', function ($scope, $rootScope) {
  //  $scope.mingxi=$rootScope.mingxi;
  //})
  .controller('stockSearchCtrl', function ($scope, services, $state, $ionicPopup, $timeout) {
    $scope.req = {AREA: 'CP', USERNAME: null, INJUNCNUM: null, RECORDNAME: null};//查询参数
    var history = [];//存储查询历史数据

    /*************************************************************************
     * 查询、跳转到结果页面
     *************************************************************************/
    $scope.commit = function () {
      var jsTable1 = new EI.sDataTable();
      jsTable1.addColums("area", "username", "injuncnum", "recordName");
      jsTable1.addOneRow($scope.req.AREA, $scope.req.USERNAME, $scope.req.INJUNCNUM, $scope.req.RECORDNAME);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = 'pmopmma1_app_inq';
      jsEIinfoIn.SysInfo.Sender = 'admin';
      jsEIinfoIn.add(jsTable1);
      services.toService(jsEIinfoIn).then(function (resp) {
        var EIinfoOut = resp.Tables[0].Table;
        services.setter(EIinfoOut);
        $state.go("tab-stock");
      }, function () {
      });
    };
    /*************************************************************************
     * 以历史记录查询、跳转到结果页面
     *************************************************************************/
    $scope.hisSearch=function(data){
      var jsTable1 = new EI.sDataTable();
      jsTable1.addColums("area", "username", "injuncnum", "recordName");
      jsTable1.addOneRow(data.AREA, data.USERNAME, data.INJUNCNUM, data.RECORDNAME);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = 'pmopmma1_app_inq';
      jsEIinfoIn.SysInfo.Sender = 'admin';
      jsEIinfoIn.add(jsTable1);
      services.toService(jsEIinfoIn).then(function (resp) {
        var EIinfoOut = resp.Tables[0].Table;
        services.setter(EIinfoOut);
        $state.go("tab-stock");
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
    var jsTable1 = new EI.sDataTable();
    var jsEIinfoIn = new EI.EIinfo();
    jsEIinfoIn.SysInfo.SvcName = 'pmopmma3_app_inq';
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
      jsEIinfoIn.SysInfo.SvcName = 'pmopmma1_app_del';
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
          jsEIinfoIn.SysInfo.SvcName = 'pmopmma1_app_del';
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
  .controller('stock_hideCtrl', function ($scope, $rootScope, $state) {
    /*************************************************************************
     * 隐藏列
     *************************************************************************/
    $scope.data = {
      USERNAME: false,
      INJUNCNUM: false,
      STEELGRADE: false,
      STANDARD: false,
      CRAFTS: false,
      NUMBERS: false,
      WEIGHT: false,
      DATE: false,
    };

    $scope.commit = function () {
      $rootScope.stock = $scope.data;
      $state.go('tab-stock');
    }
})
