angular.module('stock.controllers', [])

    .controller('StockCtrl', function ($scope, Stock, $ionicPopover, myfactory, $rootScope) {
        /*  $scope.stocks = Stock.all();*/
        var resp = myfactory.getter();
        var array=[];
        var names=[];
        if (resp == null) {
          Stock.getAll().then(function (data) {
            var EIinfoOut=data.Tables[0].Table;
            angular.forEach(EIinfoOut,function(data){
              var list=array[array.length-1];
              if(list!=null || list!=undefined) {
                if (data.NAME == (list[list.length - 1]).NAME) {
                  array[array.length - 1].push(data);
                } else {
                  var arr=[];
                  //array.push({"NAME":data.NAME});
                  arr.NAME=data.NAME;
                  arr.push(data);
                  array.push(arr);
                }
              } else{
                var arr=[];
                //array.push({"NAME":data.NAME});
                arr.NAME=data.NAME;
                arr.push(data);
                array.push(arr);
                }

            })
            $scope.stocks =array;
            $scope.names=names;
          }, function (error) {
          });
        } else {
            $scope.state = true;
            $scope.stocks = resp;
            myfactory.setter(null);
        }

        /*  隐藏*/
        if ($rootScope.receive_bill != null) {
            $scope.hide = $rootScope.receive_bill;
        }


        $scope.data = {
            criteria: '',
            search: function () {
                this.criteria = ''
                if (this.name) {
                    this.criteria = this.name;
                } else {
                    this.criteria = '';
                }
            }
        }

        /*浮动*/
        $scope.popover = $ionicPopover.fromTemplateUrl('my-popover2.html', {
            scope: $scope
        });
        // .fromTemplateUrl() 方法
        $ionicPopover.fromTemplateUrl('my-popover2.html', {
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
    })
