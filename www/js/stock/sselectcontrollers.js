angular.module('sselect.controllers', [])

    .controller('Sselect', function ($scope, $ionicPopover, $ionicPopup, SSelect, $ionicModal, myfactory, $state) {
        $scope.req = { username: null, danno: null, isRemeber: false};
        $scope.stocktype = ['成品库', '原料库', '码头库'];

        $scope.commit = function () {
            console.log($scope.req);
            /*$scope.aaas= SSelect.all($scope.req);
             $scope.openModal1();*/
            $scope.aaas = SSelect.all($scope.req);
            myfactory.setter($scope.aaas);
            $state.go("tab-stock");
        };
        $scope.remeber = function () {
            $scope.req.isRemeber = true;
        };

    })
