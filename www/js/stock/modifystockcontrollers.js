angular.module('modifystock.controllers', [])

    .controller('modifystockCtrl', function ($scope, $stateParams, Stock) {
        $scope.stock = Stock.get($stateParams.id);

    })
