angular.module('starter.services', [])
  //======================贾文光======================================
  .factory('services', function ($http, $q, WebApi) {
    var getAll = function (data) {
      var deferred = $q.defer();//通过$q服务注册一个延迟对象 deferred
      var jsTable1 = new EI.sDataTable();
      jsTable1.addColums("count");
      jsTable1.addOneRow(data.count);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = data.serviceName;
      jsEIinfoIn.SysInfo.Sender = 'admin';
      jsEIinfoIn.add(jsTable1);
      $http.post(WebApi.ServerUrl, jsEIinfoIn).then(function (response) {
          var jsEIinfoOut = EI.EIInfoCStoJS(response.data);
          var messsage = jsEIinfoOut.SysInfo.Msg;
          if (jsEIinfoOut.SysInfo.Flag == 0) {
            deferred.resolve(jsEIinfoOut);
          } else {
            deferred.reject(messsage);
          }
        }
        , function (reason) {
          deferred.reject(reason);
        });
      return deferred.promise;
    };
    var searchHistory = function (data) {
      var deferred = $q.defer();
      var jsTable = new EI.sDataTable();
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = data.serviceName;
      jsEIinfoIn.SysInfo.Sender = "admin";
      jsEIinfoIn.add(jsTable);
      $http.post(WebApi.ServerUrl, jsEIinfoIn).then(function (response) {
        var EIinfoOut = new EI.EIInfoCStoJS(response.data);
        var _message = EIinfoOut.SysInfo.Msg;
        if (EIinfoOut.SysInfo.Flag == 0) {
          deferred.resolve(EIinfoOut);
        } else {
          deferred.reject(_message);
        }
      }, function (reason) {
        deferred.reject(reason);
      });
      return deferred.promise;
    };
    var remove = function (data) {
      var deferred = $q.defer();//通过$q服务注册一个延迟对象 deferred
      var jsTable = new EI.sDataTable();
      jsTable.addColums("recordName");
      jsTable.addOneRow(data.RECORDNAME);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = data.serviceName;
      jsEIinfoIn.SysInfo.Sender = "admin";
      jsEIinfoIn.add(jsTable);
      $http.post(WebApi.ServerUrl, jsEIinfoIn).then(function (response) {
        var EIinfoOut = new EI.EIInfoCStoJS(response.data);
        var _message = EIinfoOut.SysInfo.Msg;
        if (EIinfoOut.SysInfo.Flag == 0) {
          deferred.resolve(EIinfoOut);
        } else {
          deferred.reject(_message);
        }
      }, function (reason) {
        deferred.reject(reason);
      });
      return deferred.promise;
    };
    //定义参数对象
    var myObject = null;
    var _setter = function (data) {
      myObject = data;
    };
    var _getter = function () {
      return myObject;
    };
    return {
      getAll: getAll,
      searchHistory: searchHistory,
      remove: remove,
      setter: _setter,
      getter: _getter
    }
  })
  .factory('receive_bill', function ($http, $q, WebApi) {
    var search = function (data) {
      var deferred = $q.defer();
      var jsTable1 = new EI.sDataTable();
      jsTable1.addColums("date1", "date2", "username", "recordName");
      jsTable1.addOneRow(data.DATE1, data.DATE2, data.USERNAME, data.RECORDNAME);

      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = "pmopm1_app_inq";
      jsEIinfoIn.SysInfo.Sender = "admin";
      jsEIinfoIn.add(jsTable1);
      console.log(jsEIinfoIn);

      $http.post(WebApi.ServerUrl, jsEIinfoIn).then(function (response) {
        var EIinfoOut = new EI.EIInfoCStoJS(response.data);
        var _message = EIinfoOut.SysInfo.Msg;
        if (EIinfoOut.SysInfo.Flag == 0) {
          deferred.resolve(EIinfoOut);
        } else {
          deferred.reject(_message);
        }
      }, function (reason) {
        deferred.reject(reason);
      });
      return deferred.promise;
    };
    return {
      search: search
    }
  })
  .factory('receive_account', function ($http, $q, WebApi) {
    var search = function (data) {
      var deferred = $q.defer();//通过$q服务注册一个延迟对象 deferred
      var jsTable = new EI.sDataTable();
      jsTable.addColums("date1", "date2", "username", "recordName");
      jsTable.addOneRow(data.DATE1, data.DATE2, data.USERNAME, data.RECORDNAME);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = '';
      jsEIinfoIn.SysInfo.Sender = 'admin';
      jsEIinfoIn.add(jsTable);
      $http.post(WebApi.ServerUrl, jsEIinfoIn).then(function (response) {
        var jsEIinfoOut = EI.EIInfoCStoJS(response.data);
        var messsage = jsEIinfoOut.SysInfo.Msg;
        if (jsEIinfoOut.SysInfo.Flag == 0) {
          deferred.resolve(jsEIinfoOut);
        } else {
          deferred.reject(messsage);
        }
      }, function (reason) {
        return deferred.reject(reason);
      })
      return deferred.promise;
    };
    return {
      search: search
    }
  })
  .factory('pay_bill', function ($http, $q, WebApi) {
    var search = function (data) {
      var deferred = $q.defer();//通过$q服务注册一个延迟对象 deferred
      var jsTable = new EI.sDataTable();
      jsTable.addColums("date1", "date2", "username", "recordName");
      jsTable.addOneRow(data.DATE1, data.DATE2, data.USERNAME, data.RECORDNAME);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = '';
      jsEIinfoIn.SysInfo.Sender = 'admin';
      jsEIinfoIn.add(jsTable);
      $http.post(WebApi.ServerUrl, jsEIinfoIn).then(function (response) {
        var jsEIinfoOut = EI.EIInfoCStoJS(response.data);
        var messsage = jsEIinfoOut.SysInfo.Msg;
        if (jsEIinfoOut.SysInfo.Flag == 0) {
          deferred.resolve(jsEIinfoOut);
        } else {
          deferred.reject(messsage);
        }
      }, function (reason) {
        return deferred.reject(reason);
      })
      return deferred.promise;
    };

    return {
      search: search
    }
  })
  .factory('pay_account', function ($http, $q,WebApi) {
    var search = function (data) {
      var deferred = $q.defer();//通过$q服务注册一个延迟对象 deferred
      var jsTable = new EI.sDataTable();
      jsTable.addColums("date1", "date2", "username", "recordName");
      jsTable.addOneRow(data.DATE1, data.DATE2, data.USERNAME, data.RECORDNAME);
      var jsEIinfoIn = new EI.EIinfo();
      jsEIinfoIn.SysInfo.SvcName = '';
      jsEIinfoIn.SysInfo.Sender = 'admin';
      jsEIinfoIn.add(jsTable);
      $http.post(WebApi.ServerUrl, jsEIinfoIn).then(function (response) {
        var jsEIinfoOut = EI.EIInfoCStoJS(response.data);
        var messsage = jsEIinfoOut.SysInfo.Msg;
        if (jsEIinfoOut.SysInfo.Flag == 0) {
          deferred.resolve(jsEIinfoOut);
        } else {
          deferred.reject(messsage);
        }
      }, function (reason) {
        return deferred.reject(reason);
      })
      return deferred.promise;
    };

    return {
      search: search
    }
  })


  //    =================================蔚文彪===================================
  .factory('myFactory', function () {
    //定义参数对象
    var myObject = null;

    /**
     * 定义传递数据的setter函数
     * @param {type} xxx
     * @returns {*}
     * @private
     */
    var _setter = function (data) {
      myObject = data;
    };

    /**
     * 定义获取数据的getter函数
     * @param {type} xxx
     * @returns {*}
     * @private
     */
    var _getter = function () {
      return myObject;
    };

    // Public APIs
    // 在controller中通过调setter()和getter()方法可实现提交或获取参数的功能
    return {
      setter: _setter,
      getter: _getter
    };
  })

  .factory('flagFactory', function () {
    //定义参数对象
    var myObject = null;

    /**
     * 定义传递数据的setter函数
     * @param {type} xxx
     * @returns {*}
     * @private
     */
    var _setter = function (data) {
      myObject = data;
    };

    /**
     * 定义获取数据的getter函数
     * @param {type} xxx
     * @returns {*}
     * @private
     */
    var _getter = function () {
      return myObject;
    };

    // Public APIs
    // 在controller中通过调setter()和getter()方法可实现提交或获取参数的功能
    return {
      setter: _setter,
      getter: _getter
    };
  })


  //销售合同信息
  .factory('SaleService', function ($http, $q) {

    var orders = [
      {
        orderNum: 1,
        salesMan: '刘经理',
        billDate: '2016-04-07',
        orderCusName: '李总',
        recCusName: '小张',
        type: '钢铁',
        univalence: 5000,
        steelGrade: '1',
        standard: 'G',
        craft: 'B',
        criterion: 'C',
        orderWeight: 800,
        proWeight: 300,
        stockNum: 1000,
        stockDate: '2016-03-25',
        sendNum: 1500,
        lastSendDate: '2016-04-01',
        currentInventory: 2066,
        rawSupplier: '王老板',
        deliveryType: '空运',
        deliveryDate: '2016-03-26',
        clearMethods: '现金',
        comments: '可以',
        status: '待审核'
      },
      {
        orderNum: 2,
        salesMan: '刘经理',
        billDate: '2016-04-07',
        orderCusName: '张总',
        recCusName: '小张',
        type: '钢铁',
        univalence: 5000,
        steelGrade: '1',
        standard: 'A',
        craft: 'B',
        criterion: 'C',
        orderWeight: 800,
        proWeight: 300,
        stockNum: 1000,
        stockDate: '2016-03-25',
        sendNum: 1500,
        lastSendDate: '2016-04-01',
        currentInventory: 2066,
        rawSupplier: '王老板',
        deliveryType: '空运',
        deliveryDate: '2016-03-26',
        clearMethods: '现金',
        comments: '可以',
        status: '待审核'
      },
      {
        orderNum: 3,
        salesMan: '刘经理',
        billDate: '2016-04-07',
        orderCusName: '李总',
        recCusName: '小张',
        type: '钢铁',
        univalence: 5000,
        steelGrade: '1',
        standard: 'A',
        craft: 'B',
        criterion: 'C',
        orderWeight: 800,
        proWeight: 300,
        stockNum: 1000,
        stockDate: '2016-03-25',
        sendNum: 1500,
        lastSendDate: '2016-04-01',
        currentInventory: 2066,
        rawSupplier: '王老板',
        deliveryType: '空运',
        deliveryDate: '2016-03-26',
        clearMethods: '现金',
        comments: '可以',
        status: '待审核'
      },
      {
        orderNum: 4,
        salesMan: '刘经理',
        billDate: '2016-04-07',
        orderCusName: '李总',
        recCusName: '小张',
        type: '钢铁',
        univalence: 5000,
        steelGrade: '1',
        standard: 'A',
        craft: 'B',
        criterion: 'C',
        orderWeight: 800,
        proWeight: 300,
        stockNum: 1000,
        stockDate: '2016-03-25',
        sendNum: 1500,
        lastSendDate: '2016-04-01',
        currentInventory: 2066,
        rawSupplier: '王老板',
        deliveryType: '空运',
        deliveryDate: '2016-03-26',
        clearMethods: '现金',
        comments: '可以',
        status: '待审核'
      }
    ];
    var searchOrders = [
      {
        orderNum: 2,
        salesMan: '刘经理',
        billDate: '2016-04-07',
        orderCusName: '李总',
        recCusName: '小张',
        type: '钢铁',
        univalence: 5000,
        steelGrade: '1',
        standard: 'A',
        craft: 'B',
        criterion: 'C',
        orderWeight: 800,
        proWeight: 300,
        stockNum: 1000,
        stockDate: '2016-03-25',
        sendNum: 1500,
        lastSendDate: '2016-04-01',
        currentInventory: 2066,
        rawSupplier: '王老板',
        deliveryType: '空运',
        deliveryDate: '2016-03-26',
        clearMethods: '现金',
        comments: '可以',
        status: '待审核'
      },

      {
        orderNum: 4,
        salesMan: '刘经理',
        billDate: '2016-04-07',
        orderCusName: '李总',
        recCusName: '小张',
        type: '钢铁',
        univalence: 5000,
        steelGrade: '1',
        standard: 'A',
        craft: 'B',
        criterion: 'C',
        orderWeight: 800,
        proWeight: 300,
        stockNum: 1000,
        stockDate: '2016-03-25',
        sendNum: 1500,
        lastSendDate: '2016-04-01',
        currentInventory: 2066,
        rawSupplier: '王老板',
        deliveryType: '空运',
        deliveryDate: '2016-03-26',
        clearMethods: '现金',
        comments: '可以',
        status: '待审核'
      }
    ];
    var searches = [
      {
        id: 1,
        condition: '日期:2016-4-1',
        result: [
          {
            orderNum: 3,
            salesMan: '刘经理',
            billDate: '2016-04-07',
            orderCusName: '李总',
            recCusName: '小张',
            type: '钢铁',
            univalence: 5000,
            steelGrade: '1',
            standard: 'A',
            craft: 'B',
            criterion: 'C',
            orderWeight: 800,
            proWeight: 300,
            stockNum: 1000,
            stockDate: '2016-03-25',
            sendNum: 1500,
            lastSendDate: '2016-04-01',
            currentInventory: 2066,
            rawSupplier: '王老板',
            deliveryType: '空运',
            deliveryDate: '2016-03-26',
            clearMethods: '现金',
            comments: '可以',
            status: '待审核'
          },
          {
            orderNum: 4,
            salesMan: '刘经理',
            billDate: '2016-04-07',
            orderCusName: '李总',
            recCusName: '小张',
            type: '钢铁',
            univalence: 5000,
            steelGrade: '1',
            standard: 'A',
            craft: 'B',
            criterion: 'C',
            orderWeight: 800,
            proWeight: 300,
            stockNum: 1000,
            stockDate: '2016-03-25',
            sendNum: 1500,
            lastSendDate: '2016-04-01',
            currentInventory: 2066,
            rawSupplier: '王老板',
            deliveryType: '空运',
            deliveryDate: '2016-03-26',
            clearMethods: '现金',
            comments: '可以',
            status: '待审核'
          }
        ]
      },
      {
        id: 2, condition: '订单号：1',
        result: [
          {
            orderNum: 1,
            salesMan: '刘经理',
            billDate: '2016-04-07',
            orderCusName: '李总',
            recCusName: '小张',
            type: '钢铁',
            univalence: 5000,
            steelGrade: '1',
            standard: 'A',
            craft: 'B',
            criterion: 'C',
            orderWeight: 800,
            proWeight: 300,
            stockNum: 1000,
            stockDate: '2016-03-25',
            sendNum: 1500,
            lastSendDate: '2016-04-01',
            currentInventory: 2066,
            rawSupplier: '王老板',
            deliveryType: '空运',
            deliveryDate: '2016-03-26',
            clearMethods: '现金',
            comments: '可以',
            status: '待审核'
          }
        ]
      }

    ];
    var getOrders = function () {
      var deferred = $q.defer();
      var promise = deferred.promise;
      deferred.resolve(orders);
      return promise;
    }
    var showSearch = function () {
      var deferred = $q.defer();
      var promise = deferred.promise;
      deferred.resolve(searchOrders);
      return promise;
    }
    var getSearchHistory = function () {
      var deferred = $q.defer();
      var promise = deferred.promise;
      deferred.resolve(searches);
      return promise;
    }
    return {
      getOrders: getOrders,
      getSearchHistory: getSearchHistory,
      showSearch: showSearch,
      getOne: function (orderNum) {
        return getOrders().then(function (res) {
          for (var i = 0; i < res.length; i++) {
            if (res[i].orderNum === parseInt(orderNum)) {
              return res[i];
            }
          }
        });
        return null;
      },
      getOneHistory: function (id) {
        return getSearchHistory().then(function (res) {
          for (var i = 0; i < res.length; i++) {
            if (res[i].id === parseInt(id)) {
              return res[i].result;
            }
          }
        });
        return null;
      }

    };
  })


  //客户资金帐信息
  .factory('FundService', function ($http, $q) {

    var funds = [
      {
        cusName: '张总',
        accValue: 100000000,
        fundClear: 5000000,
        freeMoney: 3000000,
        totMoney: 400000,
        occupyMoney: 60000,
        totBalance: 50000,
        creditAmount: 10000,
        paidCredit: 50000,
        leftCredit: 50000

      },
      {
        cusName: '刘总',
        accValue: 100000000,
        fundClear: 5000000,
        freeMoney: 3000000,
        totMoney: 400000,
        occupyMoney: 60000,
        totBalance: 50000,
        creditAmount: 10000,
        paidCredit: 50000,
        leftCredit: 50000

      },
      {
        cusName: '李总',
        accValue: 100000000,
        fundClear: 5000000,
        freeMoney: 3000000,
        totMoney: 400000,
        occupyMoney: 60000,
        totBalance: 50000,
        creditAmount: 10000,
        paidCredit: 50000,
        leftCredit: 50000

      }

    ]

    var searchFunds = [
      {
        cusName: '张总',
        accValue: 100000000,
        fundClear: 5000000,
        freeMoney: 3000000,
        totMoney: 400000,
        occupyMoney: 60000,
        totBalance: 50000,
        creditAmount: 10000,
        paidCredit: 50000,
        leftCredit: 50000

      },
      {
        cusName: '刘总',
        accValue: 100000000,
        fundClear: 5000000,
        freeMoney: 3000000,
        totMoney: 400000,
        occupyMoney: 60000,
        totBalance: 50000,
        creditAmount: 10000,
        paidCredit: 50000,
        leftCredit: 50000

      }
    ];
    var searches = [
      {
        id: 1,
        condition: '客户名称：刘总',
        result: [
          {
            cusName: '刘总',
            accValue: 100000000,
            fundClear: 5000000,
            freeMoney: 3000000,
            totMoney: 400000,
            occupyMoney: 60000,
            totBalance: 50000,
            creditAmount: 10000,
            paidCredit: 50000,
            leftCredit: 50000

          },
          {
            cusName: '刘总',
            accValue: 100000000,
            fundClear: 5000000,
            freeMoney: 3000000,
            totMoney: 400000,
            occupyMoney: 60000,
            totBalance: 50000,
            creditAmount: 10000,
            paidCredit: 50000,
            leftCredit: 50000

          }
        ]
      },
      {
        id: 2, condition: '币种：美元',
        result: [
          {
            cusName: '刘总',
            accValue: 100000000,
            fundClear: 5000000,
            freeMoney: 3000000,
            totMoney: 400000,
            occupyMoney: 60000,
            totBalance: 50000,
            creditAmount: 10000,
            paidCredit: 50000,
            leftCredit: 50000

          }
        ]
      }

    ];
    var getFunds = function () {
      var deferred = $q.defer();
      var promise = deferred.promise;
      deferred.resolve(funds);
      return promise;
    }
    var showSearch = function () {
      var deferred = $q.defer();
      var promise = deferred.promise;
      deferred.resolve(searchFunds);
      return promise;
    }
    var getSearchHistory = function () {
      var deferred = $q.defer();
      var promise = deferred.promise;
      deferred.resolve(searches);
      return promise;
    }
    return {
      getFunds: getFunds,
      getSearchHistory: getSearchHistory,
      showSearch: showSearch,
      getOneHistory: function (id) {
        return getSearchHistory().then(function (res) {
          for (var i = 0; i < res.length; i++) {
            if (res[i].id === parseInt(id)) {
              return res[i].result;
            }
          }
        });
        return null;
      }

    };
  })


  //能源系统数据
  .factory('SourceService', function ($http, $q) {

    var sources = [
      {
        useDate: '2016-04-01',
        water: 4320,
        coal: 51653,
        gas: 7898,
        electric: 6655
      },
      {
        useDate: '2016-04-02',
        water: 4320,
        coal: 51653,
        gas: 7898,
        electric: 6655
      },
      {
        useDate: '2016-04-03',
        water: 4320,
        coal: 51653,
        gas: 7898,
        electric: 6655
      },
      {
        useDate: '2016-04-04',
        water: 4320,
        coal: 51653,
        gas: 7898,
        electric: 6655
      }

    ]
    var searchSources = [
      {
        useDate: '2016-04-01',
        water: 4320,
        coal: 51653,
        gas: 7898,
        electric: 6655
      },
      {
        useDate: '2016-04-02',
        water: 4320,
        coal: 51653,
        gas: 7898,
        electric: 6655
      }

    ]
    var searches = [
      {
        id: 1,
        condition: '日期:2016-04-01',
        result: [
          {
            useDate: '2016-04-01',
            water: 4320,
            coal: 51653,
            gas: 7898,
            electric: 6655
          }
        ]
      }

    ]
    var getSources = function () {
      var deferred = $q.defer();
      var promise = deferred.promise;
      deferred.resolve(sources);
      return promise;
    }
    var showSearch = function () {
      var deferred = $q.defer();
      var promise = deferred.promise;
      deferred.resolve(searchSources);
      return promise;
    }
    var getSearchHistory = function () {
      var deferred = $q.defer();
      var promise = deferred.promise;
      deferred.resolve(searches);
      return promise;
    }
    var addSource = function () {
      var deferred = $q.defer();
      var promise = deferred.promise;
      deferred.resolve();
      return promise;
    }
    return {
      getSources: getSources,
      addSource: addSource,
      getSearchHistory: getSearchHistory,
      showSearch: showSearch,
      getOne: function (useDate) {
        return getSources().then(function (res) {
          for (var i = 0; i < res.length; i++) {
            if (res[i].useDate === useDate) {
              return res[i];
              alert("=");
            }
          }
        });
        return null;
      },
      getOneHistory: function (id) {
        return getSearchHistory().then(function (res) {
          for (var i = 0; i < res.length; i++) {
            if (res[i].id === parseInt(id)) {
              return res[i].result;
            }
          }
        });
        return null;
      }

    };
  })
  .factory('myfactory', function () {
    //定义参数对象
    var myObject = null;

    /**
     * 定义传递数据的setter函数
     * @param {type} xxx
     * @returns {*}
     * @private
     */
    var _setter = function (data) {
      myObject = data;
    };

    /**
     * 定义获取数据的getter函数
     * @param {type} xxx
     * @returns {*}
     * @private
     */
    var _getter = function () {
      return myObject;
    };

    // Public APIs
    // 在controller中通过调setter()和getter()方法可实现提交或获取参数的功能
    return {
      setter: _setter,
      getter: _getter
    };
  });


;
