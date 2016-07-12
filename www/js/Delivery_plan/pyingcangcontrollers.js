angular.module('pyc.controllers', [])

    .controller('PycCrl', function ($scope, $ionicPopover, $ionicPopup, $ionicModal, $rootScope, $state) {
        $scope.data = {name: false, shijifahuo: false, riqi: false, jihuafahuo: false, jianshu: false};
        $scope.commit = function () {
            $rootScope.receive_bill = $scope.data;
            $state.go('tab-plan');
        }

    })
