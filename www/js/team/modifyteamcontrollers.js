angular.module('modifyteam.controllers', [])

    .controller('modifyteamCtrl', function ($scope, $stateParams, Team) {

        $scope.team = Team.get($stateParams.id);
        $scope.myDataSource = {
            chart: {
                bgColor: "#ffffff",
                baseFontSize: 12,
                showvalues: 1,
                showpercentvalues: 1,
                showborder: 0,
                showplotborder: 0,
                showlegend: 0,
                legendborder: 0,
                legendposition: "bottom",
                enablesmartlabels: 1,
                use3dlighting: 0,
                showshadow: 0,
                legendbgcolor: "#CCCCCC",
                legendbgalpha: 20,
                legendborderalpha: 0,
                legendshadow: 0,
                legendnumcolumns: 3,
                palettecolors: "#DB70DB,#00FF00,#FF0000,#0000FF"
            },

            data: [
                {
                    "label": '班组' + $scope.team.name1,
                    "value": $scope.team.lastText1
                },
                {
                    "label": '班组' + $scope.team.name2,
                    "value": $scope.team.lastText2
                },
                {
                    "label": '班组' + $scope.team.name3,
                    "value": $scope.team.lastText3
                },
                {
                    "label": '班组' + $scope.team.name4,
                    "value": $scope.team.lastText4
                }
            ]


        };

    })
