angular.module('modifyplan.controllers', [])

    .controller('modifyplanCtrl', function ($scope, $stateParams, Plan) {
        $scope.plans = Plan.get();
        console.log("--------------");
        console.log($scope.plans[1].jihuafahuo1 + $scope.plans[1].jihuafahuo2);
        /* var arr=[];
         arr.push({id:1});
         arr.push({id:2});
         alert("==>"+arr[0].id);
         alert("==>"+arr[1].id);*/
        var i = 0;
        $scope.myDataSource = {
            chart: {
                basefont: "黑体",
                basefontsize: 14,
                bgColor: "#FFFFFF",
                alignCaptionWithCanvas: 0,
                plotgradientcolor: " ",
                showalternatehgridcolor: 0,
                showplotborder: 0,
                labeldisplay: "WRAP",
                divlinecolor: "CCCCCC",
                showcanvasborder: "0",
                palettecolors: "34495e ",
                plotSpacePercent: 25,
                yAxisMinValue: 240,
                yAxisMaxValue: 280,
                yAxisValuesStep: 1,
                canvasborderalpha: 0,
                canvasbordercolor: "CCCCCC",
                canvasborderthickness: 1,
                legendshado: "1",
                legendborderalpha: "0",
                showplotborder: 0,
                legendShadow: 0,
                plotSpacePercent: 50,
                palettecolors: "#f8bd19,#008ee4,#33bdda,#e44a00,#6baa01,#583e78",
                showborder: 0

            },

            categories: [
                {
                    font: "Arial",
                    fontsize: "14",
                    category: [
                        {
                            "label": $scope.plans[i].name
                        },
                        {
                            "label": $scope.plans[i + 1].name
                        }
                    ]
                }
            ],
            dataset: [
                {
                    seriesname: "计划发货量",
                    color: "#0000FF5",
                    //c10001
                    alpha: "180",
                    showvalues: 1,
                    dashed: 0,
                    data: [
                        {
                            value: $scope.plans[i].jihuafahuo1 + $scope.plans[i].jihuafahuo2
                        },
                        {
                            value: $scope.plans[i + 1].jihuafahuo1 + $scope.plans[i + 1].jihuafahuo2
                        }
                    ]
                },
                {
                    seriesname: "实际发货量",
                    color: "#FF0000",
                    //030e3b
                    showvalues: 1,
                    alpha: "90",
                    data: [
                        {
                            value: $scope.plans[i].shijifahuo1 + $scope.plans[i].shijifahuo2
                        },
                        {
                            value: $scope.plans[i + 1].shijifahuo1 + $scope.plans[i + 1].shijifahuo2
                        }
                    ]
                }
            ]

        }
    })
