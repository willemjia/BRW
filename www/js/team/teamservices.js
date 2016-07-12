angular.module('team.services', [])

    .factory('Team', function () {
        var teams = [
            {
                id: 0,
                name: '自动酸洗线',
                lastText: '工艺AAAA',
                name1: '甲',
                lastText1: '8000',
                name2: '乙',
                lastText2: '2341',
                name3: '丙',
                lastText3: '3421',
                name4: '丁',
                lastText4: '4321',
                face: 'img/1.jpg'
            },
            {
                id: 1,
                name: '自动酸洗线',
                lastText: '工艺BBBB',
                name1: '甲',
                lastText1: '1234',
                name2: '乙',
                lastText2: '2341',
                name3: '丙',
                lastText3: '8000',
                name4: '丁',
                lastText4: '4321',
                face: 'img/1.jpg'
            },
            {
                id: 2,
                name: '人工酸洗线',
                lastText: '工艺AAAA',
                name1: '甲',
                lastText1: '1234',
                name2: '乙',
                lastText2: '2341',
                name3: '丙',
                lastText3: '3421',
                name4: '丁',
                lastText4: '8000',
                face: 'img/1.jpg'
            },
            {
                id: 3,
                name: '人工酸洗线',
                lastText: '工艺BBBB',
                name1: '甲',
                lastText1: '1234',
                name2: '乙',
                lastText2: '8000',
                name3: '丙',
                lastText3: '3421',
                name4: '丁',
                lastText4: '4321',
                face: 'img/1.jpg'
            }
        ];

        return {
            all: function () {
                return teams;
            },
            get: function (teamId) {

                for (var i = 0; i < teams.length; i++) {


                    if (teams[i].id == parseInt(teamId)) {

                        return teams[i];
                    }
                }
                return null;
            }
        };
    });
