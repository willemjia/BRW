angular.module('yc.controllers', [])

    .controller('ycCrl', function ($scope, $ionicPopover, $ionicPopup, $ionicModal, $rootScope, $state) {
        $scope.data = {name1: false, name2: false, name3: false, name4: false};
        $scope.commit = function () {
            $rootScope.receive_bill = $scope.data;
            $state.go('tab-team');
        }

    })
