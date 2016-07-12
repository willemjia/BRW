angular.module('sselect.services', [])

    .factory('SSelect', function () {
        var ssel = [
            {
                id: 1,
                name: '沈总',
                lastText1: '制令单号3',
                gang1: '好钢1',
                kuige1: '中等1',
                gongyi1: '精致1',
                panshu1: '5',
                rukutime1: '2016-5',
                zhongliang1: '11t',
                lastText2: '制令单号4',
                gang2: '坏钢1',
                kuige2: '中等1',
                gongyi2: '一般1',
                panshu2: '2',
                rukutime2: '2016-4',
                zhongliang2: '1t',
                face: 'img/1.jpg'
            }
        ];

        return {
            all: function () {
                return ssel;
            },
            get: function (ssellId) {

                for (var i = 0; i < ssel.length; i++) {


                    if (ssel[i].id == parseInt(ssellId)) {

                        return ssel[i];
                    }
                }
                return null;
            }
        };
    });
