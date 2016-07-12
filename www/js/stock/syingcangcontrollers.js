angular.module('syc.controllers', [])

    .controller('SycCrl', function ($scope, $ionicPopover, $ionicPopup, $ionicModal, $state, $rootScope) {
        $scope.data = {name: false, lastText: false, gang: false, kuige: false, gongyi: false
        };
        $scope.commit = function () {
            $rootScope.receive_bill = $scope.data;
            $state.go('tab-stock');
        }


    })
