angular.module('plan.services', [])

    .factory('Plan', function () {
        var plans = [
            {
                id: 0,
                name: '客户名称A',
                jiahua1: '计划单号1',
                shijifahuo1: 123,
                riqi1: '2016-5',
                jihuafahuo1: 231,
                jianshu1: 22,
                jiahua2: '计划单号2',
                shijifahuo2: 224,
                riqi2: '2016-6',
                jihuafahuo2: 241,
                jianshu2: 13,
            },
            {
                id: 1,
                name: '客户名称B',
                jiahua1: '计划单号3',
                shijifahuo1: 334,
                riqi1: '2016-4',
                jihuafahuo1: 341,
                jianshu1: 25,
                jiahua2: '计划单号4',
                shijifahuo2: 331,
                riqi2: '2016-6',
                jihuafahuo2: 111,
                jianshu2: 16,
            }
        ];

        return {
            all: function () {
                return plans;
            },
            get: function () {


                console.log(plans);
                return plans;


            }
        };
    });
