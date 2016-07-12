angular.module('select.services', [])

    .factory('Select', function () {
        var sel = [
            {
                id: 0,
                name: '自动酸洗线',
                lastText: '工艺AAAA',
                name1: '甲',
                lastText1: '1234',
                face: 'img/1.jpg'
            },
            {
                id: 1,
                name: '自动酸洗线',
                lastText: '工艺BBBB',
                name1: '甲',
                lastText1: '1234',
                face: 'img/1.jpg'
            }
        ];

        return {
            all: function () {
                return sel;
            },
            get: function (selId) {

                for (var i = 0; i < sel.length; i++) {


                    if (sel[i].id == parseInt(selId)) {

                        return sel[i];
                    }
                }
                return null;
            }
        };
    });
