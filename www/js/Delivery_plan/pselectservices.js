angular.module('pselect.services', [])

    .factory('PSelect', function () {
        var psel = [
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
            }
        ];

        return {
            all: function () {
                return psel;
            },
            get: function (pselId) {

                for (var i = 0; i < psel.length; i++) {


                    if (psel[i].id == parseInt(pselId)) {

                        return psel[i];
                    }
                }
                return null;
            }
        };
    });
