angular.module('plan.controllers', [])

    .controller('planCtrl', function ($scope, Plan, $ionicPopover, myfactory, $rootScope) {

        /*  $scope.plans = Plan.all();*/
        var resp = myfactory.getter();
        if (resp == null) {
            $scope.plans = Plan.all();
        } else {
            $scope.state = true;
            $scope.plans = resp;
            myfactory.setter(null);
        }
        /*  隐藏*/
        if ($rootScope.receive_bill != null) {
            $scope.hide = $rootScope.receive_bill;

        }

        $scope.data = {
            criteria: '',
            //搜索联系人
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
        $scope.popover = $ionicPopover.fromTemplateUrl('my-popover1.html', {
            scope: $scope
        });
        // .fromTemplateUrl() 方法
        $ionicPopover.fromTemplateUrl('my-popover1.html', {
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
