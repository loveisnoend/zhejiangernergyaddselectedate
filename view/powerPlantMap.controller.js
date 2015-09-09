sap.ui.controller("com.zhenergy.pcbi.view.powerPlantMap", {

/**
* Called when a controller detail_01 instantiated and its View controls (if available) are already created.
* Can be used to modify thdetail_01e View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.zhenergy.bi.view.powerPlantMap
*/
	onInit: function() {
        this.getView().addEventDelegate({
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onAfterShow: jQuery.proxy(function(evt) {
				this.onAfterShow(evt);
			}, this)
		});
	},
	
	// eventment before show the page 
	onAfterShow : function () {
	    
        this.loadChart();
        //this.loadmjChart("mj_content_hid1", xdate, data_sj, data_qg);
	},
	loadmjChart: function(divId){
        require(
        [
            'echarts',
            'echarts/chart/line',
            'echarts/chart/bar'
        ],
		draw);
		
		function draw(e){
		    var mychart = e.init(document.getElementById(divId));
		    var option = {
		        title:{
            	text:'',
            	textStyle:{
					color:'white',
					fontFamily:'微软雅黑'
				},
				x:'50',
				y:'10'
            },
  			legend: {
              	orient:'vertical',
              	x:'500',
              	y:'6',
              	textStyle:{
					color:'white',
					fontFamily:'微软雅黑'
				},
    			data:['实际采购价格','秦港煤价']
   		 	},
   			color: ['#2DE630', '#E52DE6','white'],
			grid: {
                y1:100,
                y2:100
			},
			xAxis: [
				{

					//show: false,
					type: 'category',
					axisLabel: {
						textStyle: {
							color: 'white'
						},
						formatter: '{value}'
					},
					data: ['7/23', '7/24', '7/25', '7/26', '7/27', '7/28', '7/29', '7/30']
                }
            ],
			yAxis: [
				{
					name: '',
					type: 'value',
					axisLine: {
						show: false
					},
					axisLabel: {
						textStyle: {
							color: 'white'
						},
						formatter: '{value}'
					},
					// 		splitLine: {
					// 			show: false
					// 		},
					splitLine: {
						// 			show: false
						lineStyle: {
							color: 'rgba(64,64,64,0.5)'
						}
					},
					max: 0.65,
					min: 0,
					splitNumber: 13
                },
				{
					name: '',
					type: 'value',
					axisLine: {
						show: false
					},
					axisLabel: {
						textStyle: {
							color: 'white'
						},
						formatter: '{value}%'
					},
					splitLine: {
						// 			show: false
						lineStyle: {
							//color: 'rgba(64,64,64,0.5)',
						}
					},
					max: 8.5,
					min: 2.0,
					splitNumber: 13
                }
            ],
			series: [
				{
					name: '实际采购价格',
					type: 'line',
					smooth: true,
                 	barGap: '0%',
                  	barCategoryGap: '50%',
					// itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data: ['0.50','0.18','0.37','0.18','0.50','0.18','0.50','0.18','0.18','0.37','0.18']
                },
				{
					name: '秦港煤价',
					type: 'line',
					smooth: true,
				
					//itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data: ['0.30','0.14','0.34','0.13','0.40','0.12','0.40','0.08','0.15','0.27','0.14']

                }
            ]
		    };
		    mychart.setOption(option);
		}
	    
	},
	//大圆圈点进去的chart
	loadChartdetail: function() {
        	require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
			draw);
			
			function draw(e){
			    mychart = e.init(document.getElementById('detail_another_01'));
			    var option = {
			        title:{
                	text:'单位燃料成本',
                	textStyle:{
						color:'white',
						fontFamily:'微软雅黑'
					},
					x:'50',
					y:'10'
                },
  				legend: {
                  	orient:'horizontal',
                  	x:'300',
                  	y:'20',
                  	textStyle:{
						color:'white',
						fontFamily:'微软雅黑'
					},
        			data:['当前单位成本','去年同期','涨幅']
   			 	},
   				color: ['#2DE630', '#E52DE6','white'],
				grid: {
                    y1:100,
                    y2:100
				},
				xAxis: [
					{

						//show: false,
						type: 'category',
						axisLabel: {
							textStyle: {
								color: 'white'
							},
							formatter: '{value}'
						},
						data: ['电厂1', '电厂2', '电厂3', '电厂4']
                    }
                ],
				yAxis: [
					{
						name: '',
						type: 'value',
						axisLine: {
							show: false
						},
						axisLabel: {
							textStyle: {
								color: 'white'
							},
							formatter: '{value}'
						},
						// 		splitLine: {
						// 			show: false
						// 		},
						splitLine: {
							// 			show: false
							lineStyle: {
								color: 'rgba(64,64,64,0.5)'
							}
						},
						max: 0.65,
						min: 0,
						splitNumber: 13
                    },
					{
						name: '',
						type: 'value',
						axisLine: {
							show: false
						},
						axisLabel: {
							textStyle: {
								color: 'white'
							},
							formatter: '{value}%'
						},
						splitLine: {
							// 			show: false
							lineStyle: {
								//color: 'rgba(64,64,64,0.5)',
							}
						},
						max: 8.5,
						min: 2.0,
						splitNumber: 13
                    }
                ],
				series: [
					{
						name: '当前单位成本',
						type: 'bar',
						smooth: true,
                     	barGap: '0%',
                      	barCategoryGap: '50%',
						// itemStyle: {normal: {areaStyle: {type: 'default'}}},
						data: ['0.18','0.50','0.18','0.37']
                    },
					{
						name: '去年同期',
						type: 'bar',
						smooth: true,
					
						//itemStyle: {normal: {areaStyle: {type: 'default'}}},
						data: ['0.12','0.43','0.20','0.30']

                    },
                  	{
						name: '涨幅',
						type: 'line',
						smooth: true,
					
						//itemStyle: {normal: {areaStyle: {type: 'default'}}},
						data: ['0.12','0.43','0.20','0.30']

                    }
                ]
			    };
			    mychart.setOption(option);
			}
    },
	// load the chart map
	loadChart : function () {
	    var myChart3
		var myChart4;
		var myChart5;
        // 使用
        require(
            [
                'echarts',
                'echarts/chart/map', // 使用柱状状图就加载bar模块，按需加载
				'echarts/chart/pie',
				'echarts/chart/bar'
            ],
			draw);
			
			function draw(e) {
			    drawPowerDistribution(e);
			    
			    drawpie01(e);
    			drawbar01(e);
    			drawbar02(e);
    			drawbar03(e);
    			drawbar04(e);
		    }
		
		    function drawPowerDistribution(ec) {
		        
		    // event configure    
            var ecConfig = require('echarts/config');
    
	///////////////////////////////////中国地图/////////////////////////////////////			
				// 基于准备好的dom，初始化echarts图表
				myChart3 = ec.init(document.getElementById('chinaMap1')); 
				option3 = {
					tooltip : {
						trigger: 'item',
						formatter: '{b}'
					},
					series : [
						{
							name: '中国',
							type: 'map',
							mapType: 'china',
							selectedMode : 'multiple',
							itemStyle:{
								normal:{label:{show:false}},
								emphasis:{label:{show:true}}
							},
							data:[
								{name:'浙江',selected:true}
							]
						}
					]
				};
				// 为echarts对象加载数据 
				myChart3.setOption(option3); 

	//////////////////////////////////浙江省地图//////////////////////////////////////////////////////////		
			    // 基于准备好的dom，初始化echarts图表
                myChart4 = ec.init(document.getElementById('powerPlantMap1'));
				var allPowerData = [
					{name: "温州", value: 300, coal:1196820.02, coalDays:3, inputPlanTotal:"600", inputPlanValue:335, averUsePerH:11.8, averLoadRate: "65%", netPowerWPerH:6.19, costData:8580.15, costPer:0.45, otherAllCost:5646.66, otherCost:345.45, repairCost:580.9, peopleCost:3456.15, finaceCost:1000.56, depreciationCost:345.3},
					{name: "义乌", value: 270, coal:3342340.02, coalDays:6, inputPlanTotal:"700", inputPlanValue:200, averUsePerH:23.2, averLoadRate: "36%", netPowerWPerH:3.56, costData:65324.05, costPer:1.98, otherAllCost:3452.45, otherCost:543.67, repairCost:456.87, peopleCost:2334.74, finaceCost:2345.56, depreciationCost:300.5},
					{name: "杭州", value: 300, coal:5656774.02, coalDays:7, inputPlanTotal:"800", inputPlanValue:300, averUsePerH:34.5, averLoadRate: "45%", netPowerWPerH:4.50, costData:24543.15, costPer:4.35, otherAllCost:2343.56, otherCost:233.46, repairCost:234.89, peopleCost:8743.89, finaceCost:2783.90, depreciationCost:467.8},
					{name: "绍兴", value: 120, coal:5456565.02, coalDays:7, inputPlanTotal:"900", inputPlanValue:332, averUsePerH:12.5, averLoadRate: "78%", netPowerWPerH:9.0, costData:54634, costPer:2.90, otherAllCost:8965.65, otherCost:345.67, repairCost:833.5, peopleCost:9876.23, finaceCost:7899.44, depreciationCost:249.7},
					{name: "金华", value: 180, coal:5465324.02, coalDays:7, inputPlanTotal:"1000", inputPlanValue:767, averUsePerH:13.9, averLoadRate: "33%", netPowerWPerH:2.56, costData:32523.9, costPer:2.8, otherAllCost:1243.56, otherCost:873.56, repairCost:456.8, peopleCost:7676.56, finaceCost:9654.34, depreciationCost:783.3},
					{name: "衢州", value: 130, coal:8356764.02, coalDays:8, inputPlanTotal:"400", inputPlanValue:129, averUsePerH:14.8, averLoadRate: "88%", netPowerWPerH:3.56, costData:34522.7, costPer:5.66, otherAllCost:6732.34, otherCost:872.73, repairCost:124.5, peopleCost:2346.76, finaceCost:5634.45, depreciationCost:965.34},
					{name: "舟山", value: 140, coal:1258796.02, coalDays:7, inputPlanTotal:"400", inputPlanValue:356, averUsePerH:16.8, averLoadRate: "65%", netPowerWPerH:5.90, costData:13531.89, costPer:2.45, otherAllCost:2356.87, otherCost:124.55, repairCost:580.9, peopleCost:3678.34, finaceCost:3456.76, depreciationCost:876.56},
					{name: "宁波", value: 156, coal:3737926.02, coalDays:3, inputPlanTotal:"500", inputPlanValue:246, averUsePerH:31.8, averLoadRate: "60%", netPowerWPerH:8.89, costData:749324.84, costPer:1.75, otherAllCost:7624.76, otherCost:383.67, repairCost:233.67, peopleCost:2359.48, finaceCost:8765.34, depreciationCost:986.3},
					{name: "台州", value: 110, coal:9467325.02, coalDays:10, inputPlanTotal:"400", inputPlanValue:267, averUsePerH:21.8, averLoadRate: "79%", netPowerWPerH:5.4, costData:135410.34, costPer:9.67, otherAllCost:3245.56, otherCost:826.33, repairCost:345.9, peopleCost:3998.45, finaceCost:3456.76, depreciationCost:456.4},
					{name: "湖州", value: 90, coal:2568746.02, coalDays:2, inputPlanTotal:"500", inputPlanValue:300, averUsePerH:51.8, averLoadRate: "53%", netPowerWPerH:2.45, costData:25424.64, costPer:2.56, otherAllCost:9832.56, otherCost:127.67, repairCost:283.6, peopleCost:9876.44, finaceCost:3456.56, depreciationCost:234.67}
				];
								
		        var option4 = {

					title : {
						text: '',
						subtext: '',
						sublink: '',
						x:'center'
					},
					calculable: false,
					tooltip : {
					    show : false,
						trigger : 'item'
					},
					series : [
						{
						    itemStyle:{
							    normal:{
							        label:{
							            show:true,
							            textStyle: {
							                color: '#00FF00'
							            }
							        },
							        areaStyle:{
							            color: 'black',
							            type: 'default'
							        },
							        borderColor: 'white',
							        borderWidth: 2
							    },
                                emphasis:{label:{show:true}}
							},
							name: '浙能XXX电厂',
							type: 'map',
							mapType: '浙江',
							hoverable: false,
							roam:false,
							data : [],
							mapLocation : {
							    x: "center",
								y: "center"
								//width: "500px",
								//height: "500px"
							},
							marikline :{
							  itemStyle : {
							      normal : {
							          lable : {
                                        show : false
							          }
							      },
							      emphasis : {
							          lable : {
							              show : false
							          }
							      }
							  }  
							},
							markPoint : {
							    clickable: true,
							    symbol: 'star50',
								symbolSize: 6,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
								effect:{
								  show: false,
								  type: 'scale',
								  scaleSize: 7,
								  loop: true,
								  period: 7
								},
								itemStyle: {
									normal: {
									    color:'#00FF00',    // 标点颜色值
										borderColor: '#00ff00',
										borderWidth: 1,            // 标注边线线宽，单位px，默认为1
										label: {
											show: false
										}
									},
									emphasis: {
										borderColor: '#FFFFFF',
										borderWidth: 1,
										label: {
											show: false
										}
									},
									large: true
								},
								data :allPowerData
							},
							geoCoord: {
								"温州":[120.65,28.01],
								"义乌":[120.06,29.32],
								"杭州":[120.19,30.26],
								"绍兴":[120.58,30.01],
								"金华":[119.64,29.12],
								"衢州":[118.88,28.97],
								"舟山":[122.207216,29.985295],
								"宁波":[121.56,29.86],
								"台州":[121.420757,28.656386],
								"湖州":[120.1,30.86],
								"上海":[3000,3000]
							}
						},
						{
							name: 'Top3',
							type: 'map',
							mapType: '浙江',
							data:[],
							markPoint : {
							    normal: {
								    label:{
									    show: false
									}
								},
								symbol:'star50',
								effect:{
								  show: true,
								  type: 'scale',
								  scaleSize: 3,
								  loop: true,
								  shadowColor: '#00FF00',
								  period: 7
								},
								itemStyle:{
									normal:{
										label:{show:false}
									}
								},
								data : [{name: "杭州", value: 300}]
							}
						}
					]
				}; 
				myChart4.on(ecConfig.EVENT.CLICK, function (param){  
					
					var mapSeries = option4.series[0];
					
					var selectedData = {name: mapSeries.markPoint.data[param.dataIndex].name, value: mapSeries.markPoint.data[param.dataIndex].inputPlanValue};
					option4.series[1].markPoint.data[0] = selectedData;
                    myChart4.setOption(option4);
					
					option5.series[1].markPoint.data = [{name:'上海',value:0}];
                    myChart5.setOption(option5);
                    
					// 电厂名
					document.getElementById('powerPlantMainDetailTitle').innerHTML = mapSeries.markPoint.data[param.dataIndex].name;
                 
					var data1 = mapSeries.markPoint.data[param.dataIndex].inputPlanValue;
					var data2 = mapSeries.markPoint.data[param.dataIndex].inputPlanTotal - mapSeries.markPoint.data[param.dataIndex].inputPlanValue
				    
				    drawpie(ec, data1, data2, 'detail_pie');
				    drawbar(ec, data1, data2, 'detail_01');
				    drawbar(ec, data1, data2, 'detail_02');
				    drawbar(ec, data1, data2, 'detail_03');
				    drawbar(ec, data1, data2, 'detail_04');	
				    
				    document.getElementById('fuelCost').innerHTML = mapSeries.markPoint.data[param.dataIndex].inputPlanValue;
				    document.getElementById('fuelDownPercent').innerHTML = mapSeries.markPoint.data[param.dataIndex].coalDays;
				    document.getElementById('travelPrice').innerHTML = mapSeries.markPoint.data[param.dataIndex].averUsePerH;
				    document.getElementById('coalPrice').innerHTML = mapSeries.markPoint.data[param.dataIndex].netPowerWPerH;
				    document.getElementById('coalCost').innerHTML = mapSeries.markPoint.data[param.dataIndex].otherAllCost;
				    document.getElementById('wattVolume1').innerHTML = mapSeries.markPoint.data[param.dataIndex].inputPlanValue;
				    document.getElementById('watt1').innerHTML = mapSeries.markPoint.data[param.dataIndex].depreciationCost;
				    document.getElementById('wattVolume2').innerHTML = mapSeries.markPoint.data[param.dataIndex].peopleCost;
				    document.getElementById('watt2').innerHTML = mapSeries.markPoint.data[param.dataIndex].repairCost;
				    document.getElementById('coalTotalVolume').innerHTML = mapSeries.markPoint.data[param.dataIndex].coal;
				    document.getElementById('wasteDays').innerHTML = mapSeries.markPoint.data[param.dataIndex].coalDays;
				});	
				
				// document.getElementById('powerName').innerHTML = "杭州";
				
                // 为echarts对象加载数据 
                myChart4.setOption(option4); 
		///////////////////////////////安徽淮南市地图////////////////////////////////////////////
				// 基于准备好的dom，初始化echarts图表
                myChart5 = ec.init(document.getElementById('huaiNanMap1')); 
                
				var allPowerData2 = [
					{name: "淮南", value: 300, coal:1196820.02, coalDays:3, inputPlanTotal:"600", inputPlanValue:335, averUsePerH:11.8, averLoadRate: "65%", netPowerWPerH:6.19, costData:8580.15, costPer:0.45, otherAllCost:5646.66, otherCost:345.45, repairCost:580.9, peopleCost:3456.15, finaceCost:1000.56, depreciationCost:345.3},
				];
				option5 = {
					title : {
						text: '',
						subtext: '',
						sublink: '',
						x:'center'
					},
					calculable: false,
					series : [
						{
							itemStyle:{
								normal:
								{
								    label:{
								        show: true,
								        textStyle: {
							                color: '#00FF00'
							            }
								    },
								    areaStyle:{
							            color: 'black',
							            type: 'default'
							        },
							        borderColor: 'white',
							        borderWidth: 2
								},
								emphasis:{label:{show:true}}
							},
							name: '安徽',
							type: 'map',
							mapType: '安徽|淮南市',
							hoverable:false,
							roam:false,
							data : [],
							markPoint : {
								clickable: true,
							    symbol: 'star50',
								symbolSize: 6,         // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
								itemStyle: {
									normal: {
									    color:'#00FF00',    // 标点颜色值
										borderColor: 'white',
										borderWidth: 1,            // 标注边线线宽，单位px，默认为1
										label: {
											show: false
										}
									},
									emphasis: {
										borderColor: 'white',
										borderWidth: 1,
										label: {
											show: false
										}
									},
									effect:{
    								  show: true,
    								  type: 'scale',
    								  scaleSize: 7,
    								  loop: true,
    								  period: 5
    								}
								},
								data :allPowerData2
							},
							geoCoord: {
                                "淮南":[116.73,32.80]
							}
						},
						{
							name: 'Top3',
							type: 'map',
							mapType: '安徽|淮南市',
							data:[],
							markPoint : {
								symbol:'star50',
								effect:{
								  show: true,
								  type: 'scale',
								  scaleSize: 3,
								  loop: true,
								  shadowColor: '#00FF00',
								  period: 7
								},
								itemStyle:{
									normal:{
										label:{show:false}
									}
								},
								data : []
							}
						}
					]
				}; 
				myChart5.on(ecConfig.EVENT.CLICK, function (param){

					var mapSeries = option5.series[0];

					var selectedData = {name: mapSeries.markPoint.data[param.dataIndex].name, value: mapSeries.markPoint.data[param.dataIndex].inputPlanValue};

                    option5.series[1].markPoint.data[0] = selectedData;
                    myChart5.setOption(option5);
                
                    option4.series[1].markPoint.data = [{name:'上海',value:0}];
                    myChart4.setOption(option4);
                    
					// 电厂名
					document.getElementById('powerPlantMainDetailTitle').innerHTML = mapSeries.markPoint.data[param.dataIndex].name;
					var data1 = mapSeries.markPoint.data[param.dataIndex].inputPlanValue;
					var data2 = mapSeries.markPoint.data[param.dataIndex].inputPlanTotal - mapSeries.markPoint.data[param.dataIndex].inputPlanValue
				    
				    drawpie(ec, data1, data2, 'detail_pie');
				    drawbar(ec, data1, data2, 'detail_01');
				    drawbar(ec, data1, data2, 'detail_02');
				    drawbar(ec, data1, data2, 'detail_03');
				    drawbar(ec, data1, data2, 'detail_04');	
				    
				    document.getElementById('fuelCost').innerHTML = mapSeries.markPoint.data[param.dataIndex].inputPlanValue;
				    document.getElementById('fuelDownPercent').innerHTML = mapSeries.markPoint.data[param.dataIndex].coalDays;
				    document.getElementById('travelPrice').innerHTML = mapSeries.markPoint.data[param.dataIndex].averUsePerH;
				    document.getElementById('coalPrice').innerHTML = mapSeries.markPoint.data[param.dataIndex].netPowerWPerH;
				    document.getElementById('coalCost').innerHTML = mapSeries.markPoint.data[param.dataIndex].otherAllCost;
				    document.getElementById('wattVolume1').innerHTML = mapSeries.markPoint.data[param.dataIndex].inputPlanValue;
				    document.getElementById('watt1').innerHTML = mapSeries.markPoint.data[param.dataIndex].depreciationCost;
				    document.getElementById('wattVolume2').innerHTML = mapSeries.markPoint.data[param.dataIndex].peopleCost;
				    document.getElementById('watt2').innerHTML = mapSeries.markPoint.data[param.dataIndex].repairCost;
				    document.getElementById('coalTotalVolume').innerHTML = mapSeries.markPoint.data[param.dataIndex].coal;
				    document.getElementById('wasteDays').innerHTML = mapSeries.markPoint.data[param.dataIndex].coalDays;
				});	
			
                // 为echarts对象加载数据 
                myChart5.setOption(option5); 
        }
        
        function drawpie(e, data1, data2, id) {
			var mychart = e.init(document.getElementById(id));
			var option = {
				title: {
					show: false,
					text: '日利润'
				},
				tooltip: {
					show: false
				},
				legend: {
					show: false,
					data: ['日利润']
				},
				series: [
					{
						name: '1',
						type: 'pie',
						radius: [123, 126],
						itemStyle: {
							normal: {
								color: '#33FE33',
								label: {
									show: false
								},
								labelLine: {
									show: false
								}
							}
						},
						data: [
							{
								value: data1,
								name: '日利润'
                            },
							{
								value: data2,
								name: 'invisible',
								itemStyle: {
									normal: {
										color: 'rgba(0,0,0,0)',
										label: {
											show: false
										},
										labelLine: {
											show: false
										}
									},
									emphasis: {
										color: 'rgba(0,0,0,0)'
									}
								}
                                }
                                ]
                            }
                            ]
			    };
			mychart.setOption(option);
		}
		function drawbar(e, data1, data2, id) {
			var mychart = e.init(document.getElementById(id));
			var option = {
				grid: {
					x: 0,
					y: 0,
					x2: 0,
					y2: 0,
					borderWidth: 0

				},
				color: ['#1E871E', '#080809'],

				xAxis: [
					{
						show: false,
						type: 'value'
							}
						],
				yAxis: [
					{
						show: false,
						type: 'category',
						data: ['周一']
							}
						],
				series: [
					{
						name: '直接访问',
						type: 'bar',
						stack: '总量',
						itemStyle: {
							normal: {
								label: {
									show: false,
									position: 'insideRight'
								}
							}
						},
						data: [data1]
							},
					{
						name: '邮件营销',
						type: 'bar',
						stack: '总量',
						itemStyle: {
							normal: {
								label: {
									show: false,
									position: 'insideRight'
								}
							}
						},

						data: [data2]
							}

						]
			};
			mychart.setOption(option);
		}
		function drawpie01(e) {
            drawpie(e, 3, 4, 'detail_pie');
        }
		function drawbar01(e) {
			drawbar(e, 4, 6, 'detail_01');
		}

		function drawbar02(e) {
			drawbar(e, 7, 3, 'detail_02');
		}

		function drawbar03(e) {
			drawbar(e, 3, 7, 'detail_03');
		}

		function drawbar04(e) {
			drawbar(e, 8, 2, 'detail_04');
		}
	}
});