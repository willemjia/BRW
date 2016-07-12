angular.module('pselect.controllers', [])

    .controller('pselect', function ($scope, $ionicPopover, $ionicPopup, PSelect, $ionicModal, myfactory, $state) {
        $scope.req = {dateRange: null, date1: null, date2: null, username: null, isRemeber: false};
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
            /* $scope.aaas= PSelect.all($scope.req);
             $scope.openModal1();*/

            $scope.aaas = PSelect.all($scope.req);
            myfactory.setter($scope.aaas);
            $state.go("tab.plan");
        };
        $scope.remeber = function () {
            $scope.req.isRemeber = true;
        };


    })
