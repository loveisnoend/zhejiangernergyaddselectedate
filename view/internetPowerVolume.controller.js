sap.ui.controller("com.zhenergy.pcbi.view.internetPowerVolume", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
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
	    
        document.getElementById('internetDetail').style.display = "none";
        document.getElementById('internetMain').style.display = "";
        this.loadChart();
    	// 设定头部跑马灯信息 common.js
		_loadData03(valueCPIhuanbi,valueGDP,valueCPItongbi,valuePPItongbi,valuePMIproduce,valuePMInonProduce,valueGDPTotal);
	},
	// 电价详细Chart
	loadPriceChartdetail: function(chartDivId, priceChartName) {
        	require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
			draw);
			
			function draw(e){
			    var mychart = e.init(document.getElementById(chartDivId));
			    document.getElementById('profitName').innerHTML = document.getElementById('powerPlantName').innerHTML;
			    var fuelXaxisName = '';
			    if (document.getElementById('powerPlantName').innerHTML == '集团') {
			        fuelXaxisName = ['电厂1', '电厂2', '电厂3', '电厂4'];
			    } else {
			        fuelXaxisName = ['4', '5', '6', '7'];
			    }
			    
			    var option = {
			        title:{
                	text: priceChartName,
                	textStyle:{
						color:'white',
						fontFamily:'微软雅黑'
					},
					x:'50',
					y:'10'
                },
  				legend: {
                  	orient:'horizontal',
                  	x:'400',
                  	y:'20',
                  	textStyle:{
						color:'white',
						fontFamily:'微软雅黑'
					},
        			data:['当年','去年']
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
						data: fuelXaxisName
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
						name: '当年',
						type: 'bar',
						smooth: true,
                     	barGap: '0%',
                      	barCategoryGap: '50%',
						// itemStyle: {normal: {areaStyle: {type: 'default'}}},
						data: ['0.18','0.50','0.18','0.37']
                    },
					{
						name: '去年',
						type: 'bar',
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
	    var skinColor = '';
	    if (skinName == '夜间模式') {
	        skinColor = 'Black';
	    } else {
	        skinColor = '#1717E9';
	    }
	    var myChart3
		var myChart4;
		var myChart5;
        // 使用
        require(
            [
                'echarts',
                'echarts/chart/map', // 使用柱状状图就加载bar模块，按需加载
				'echarts/chart/pie',
				'echarts/chart/bar',
				'echarts/chart/gauge'
            ],
			draw);
			
			function draw(e) {
			    drawPowerDistribution(e);
		    }
		
		    function drawPowerDistribution(ec) {
		        
		    document.getElementById('internetDetail').style.display = "none";
            document.getElementById('internetMain').style.display = "";
            
		    // event configure    
            var ecConfig = require('echarts/config');
    
	///////////////////////////////////中国地图/////////////////////////////////////			
				// 基于准备好的dom，初始化echarts图表
				myChart3 = ec.init(document.getElementById('chinaMap')); 
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
                myChart4 = ec.init(document.getElementById('powerPlantMap'));
				var allPowerData = [
				// 	{name: "温州", value: 300, coal:1196820.02, coalDays:3, inputPlanTotal:"600", inputPlanValue:335, averUsePerH:11.8, averLoadRate: "65%", netPowerWPerH:6.19, costData:8580.15, costPer:0.45, otherAllCost:5646.66, otherCost:345.45, repairCost:580.9, peopleCost:3456.15, finaceCost:1000.56, depreciationCost:345.3},
				// 	{name: "义乌", value: 270, coal:3342340.02, coalDays:6, inputPlanTotal:"700", inputPlanValue:200, averUsePerH:23.2, averLoadRate: "36%", netPowerWPerH:3.56, costData:65324.05, costPer:1.98, otherAllCost:3452.45, otherCost:543.67, repairCost:456.87, peopleCost:2334.74, finaceCost:2345.56, depreciationCost:300.5},
				// 	{name: "杭州", value: 300, coal:5656774.02, coalDays:7, inputPlanTotal:"800", inputPlanValue:300, averUsePerH:34.5, averLoadRate: "45%", netPowerWPerH:4.50, costData:24543.15, costPer:4.35, otherAllCost:2343.56, otherCost:233.46, repairCost:234.89, peopleCost:8743.89, finaceCost:2783.90, depreciationCost:467.8},
				// 	{name: "绍兴", value: 120, coal:5456565.02, coalDays:7, inputPlanTotal:"900", inputPlanValue:332, averUsePerH:12.5, averLoadRate: "78%", netPowerWPerH:9.0, costData:54634, costPer:2.90, otherAllCost:8965.65, otherCost:345.67, repairCost:833.5, peopleCost:9876.23, finaceCost:7899.44, depreciationCost:249.7},
					{name: "金华", value: 180, coal:5465324.02, coalDays:7, inputPlanTotal:"1000", inputPlanValue:767, averUsePerH:13.9, averLoadRate: "33%", netPowerWPerH:2.56, costData:32523.9, costPer:2.8, otherAllCost:1243.56, otherCost:873.56, repairCost:456.8, peopleCost:7676.56, finaceCost:9654.34, depreciationCost:783.3},
				// 	{name: "衢州", value: 130, coal:8356764.02, coalDays:8, inputPlanTotal:"400", inputPlanValue:129, averUsePerH:14.8, averLoadRate: "88%", netPowerWPerH:3.56, costData:34522.7, costPer:5.66, otherAllCost:6732.34, otherCost:872.73, repairCost:124.5, peopleCost:2346.76, finaceCost:5634.45, depreciationCost:965.34},
				// 	{name: "舟山", value: 140, coal:1258796.02, coalDays:7, inputPlanTotal:"400", inputPlanValue:356, averUsePerH:16.8, averLoadRate: "65%", netPowerWPerH:5.90, costData:13531.89, costPer:2.45, otherAllCost:2356.87, otherCost:124.55, repairCost:580.9, peopleCost:3678.34, finaceCost:3456.76, depreciationCost:876.56},
				// 	{name: "宁波", value: 156, coal:3737926.02, coalDays:3, inputPlanTotal:"500", inputPlanValue:246, averUsePerH:31.8, averLoadRate: "60%", netPowerWPerH:8.89, costData:749324.84, costPer:1.75, otherAllCost:7624.76, otherCost:383.67, repairCost:233.67, peopleCost:2359.48, finaceCost:8765.34, depreciationCost:986.3},
					{name: "台州", value: 110, coal:9467325.02, coalDays:10, inputPlanTotal:"400", inputPlanValue:267, averUsePerH:21.8, averLoadRate: "79%", netPowerWPerH:5.4, costData:135410.34, costPer:9.67, otherAllCost:3245.56, otherCost:826.33, repairCost:345.9, peopleCost:3998.45, finaceCost:3456.76, depreciationCost:456.4},
				// 	{name: "湖州", value: 90, coal:2568746.02, coalDays:2, inputPlanTotal:"500", inputPlanValue:300, averUsePerH:51.8, averLoadRate: "53%", netPowerWPerH:2.45, costData:25424.64, costPer:2.56, otherAllCost:9832.56, otherCost:127.67, repairCost:283.6, peopleCost:9876.44, finaceCost:3456.56, depreciationCost:234.67}
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
							            color: skinColor,
							            type: 'default'
							        },
							        borderColor: 'white',
							        borderWidth: 2
							    },
                                emphasis:{label:{show:true}}
							},
							name: 'XXX电厂',
							type: 'map',
							mapType: '浙江',
							hoverable: false,
							roam:false,
							data : [],
							mapLocation : {
							    x: "left",
								y: "center"
								//width: "500px",
								//height: "500px"
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
											show: false,
											formatter: [{name:name}]
										}
									},
									emphasis: {
										borderColor: '#FFFFFF',
										borderWidth: 1,
										label: {
											show: true
										}
									},
									large: true
								},
								data :allPowerData
							},
							geoCoord: {
								// "温州":[120.65,28.01],
								// "义乌":[120.06,29.32],
								// "杭州":[120.19,30.26],
								// "绍兴":[120.58,30.01],
								"金华":[119.64,29.12],
								// "衢州":[118.88,28.97],
								// "舟山":[122.207216,29.985295],
								// "宁波":[121.56,29.86],
								"台州":[121.420757,28.656386],
								// "湖州":[120.1,30.86],
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
									    show: true
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
								data : [
								    {name: "金华", value: 300},
								    {name: "台州", value: 300}
								    ]
							}
						}
					]
				}; 
	
				myChart4.on(ecConfig.EVENT.CLICK, function (param){  

                    document.getElementById('internetDetail').style.display = "none";
                    document.getElementById('internetMain').style.display = "";
                    
					var mapSeries = option4.series[0];
                  
                  	// 电厂名
					var powerPlantName = '';
					if (mapSeries.markPoint.data[param.dataIndex].name == '金华') {
					    powerPlantName = '兰溪';
					} else if (mapSeries.markPoint.data[param.dataIndex].name == '台州') {
					    powerPlantName = '台二';
					}
					// 电厂名
					document.getElementById('powerPlantName').innerHTML = powerPlantName+'电厂';
					
					var selectedData = {name: mapSeries.markPoint.data[param.dataIndex].name, value: mapSeries.markPoint.data[param.dataIndex].inputPlanValue};
					option4.series[1].markPoint.data = [];
					option4.series[1].markPoint.data[0] = selectedData;
					option4.series[1].markPoint.data[1] = {name:'上海',value:0};
                    myChart4.setOption(option4);
					
					option5.series[1].markPoint.data = [{name:'上海',value:0}];
                    myChart5.setOption(option5);
                    
					// 平均电价
					var internetAverPrice1 = mapSeries.markPoint.data[param.dataIndex].costPer;
					internetAverPrice1 = internetAverPrice1.toString().substring(0, internetAverPrice1.toString().indexOf('.')+3);
                    document.getElementById('internetAverPrice1').innerHTML =  internetAverPrice1;  
                    
                    var powerVolume1 = mapSeries.markPoint.data[param.dataIndex].averUsePerH;
					powerVolume1 = powerVolume1.toString().substring(0, powerVolume1.toString().indexOf('.')+3);
				    document.getElementById('powerVolume1').innerHTML = powerVolume1;
				    
				    var inputCash1 = mapSeries.markPoint.data[param.dataIndex].costPer*mapSeries.markPoint.data[param.dataIndex].averUsePerH;
				    document.getElementById('inputCash1').innerHTML = inputCash1.toString().substring(0, inputCash1.toString().indexOf('.')+3);

					// 合约电价
					var internetAverPrice2 = mapSeries.markPoint.data[param.dataIndex].costPer;
					internetAverPrice2 = internetAverPrice2.toString().substring(0, internetAverPrice2.toString().indexOf('.')+3);
                    document.getElementById('internetAverPrice2').innerHTML =  internetAverPrice2;  
                    
                    var powerVolume2 = mapSeries.markPoint.data[param.dataIndex].averUsePerH+0.5;
					powerVolume2 = powerVolume2.toString().substring(0, powerVolume2.toString().indexOf('.')+3);
				    document.getElementById('powerVolume2').innerHTML = powerVolume2;
				    
				    var inputCash2 = mapSeries.markPoint.data[param.dataIndex].costPer*(mapSeries.markPoint.data[param.dataIndex].averUsePerH+0.5);
				    document.getElementById('inputCash2').innerHTML = inputCash2.toString().substring(0, inputCash2.toString().indexOf('.')+3);

					// 直供电价
					var internetAverPrice3 = mapSeries.markPoint.data[param.dataIndex].costPer;
					internetAverPrice3 = internetAverPrice3.toString().substring(0, internetAverPrice3.toString().indexOf('.')+3);
                    document.getElementById('internetAverPrice3').innerHTML =  internetAverPrice3;  
                    
                    var powerVolume3 = mapSeries.markPoint.data[param.dataIndex].averUsePerH+1.4;
					powerVolume3 = powerVolume3.toString().substring(0, powerVolume3.toString().indexOf('.')+3);
				    document.getElementById('powerVolume3').innerHTML = powerVolume3;
				    
				    var inputCash3 = mapSeries.markPoint.data[param.dataIndex].costPer*(mapSeries.markPoint.data[param.dataIndex].averUsePerH+1.4);
				    document.getElementById('inputCash3').innerHTML = inputCash3.toString().substring(0, inputCash3.toString().indexOf('.')+3);


					// 代替电价
					var internetAverPrice4 = mapSeries.markPoint.data[param.dataIndex].costPer;
					internetAverPrice4 = internetAverPrice4.toString().substring(0, internetAverPrice4.toString().indexOf('.')+3);
                    document.getElementById('internetAverPrice4').innerHTML =  internetAverPrice4;  
                    
                    var powerVolume4 = mapSeries.markPoint.data[param.dataIndex].averUsePerH+2.8;
					powerVolume4 = powerVolume4.toString().substring(0, powerVolume4.toString().indexOf('.')+3);
				    document.getElementById('powerVolume4').innerHTML = powerVolume4
				        
				    var inputCash4 = mapSeries.markPoint.data[param.dataIndex].costPer*(mapSeries.markPoint.data[param.dataIndex].averUsePerH+2.8);
				    document.getElementById('inputCash4').innerHTML = inputCash4.toString().substring(0, inputCash4.toString().indexOf('.')+3);
					
					var data1 = mapSeries.markPoint.data[param.dataIndex].coalDays;
					var data2 = mapSeries.markPoint.data[param.dataIndex].averUsePerH;
					var data3 = mapSeries.markPoint.data[param.dataIndex].netPowerWPerH;
					var data4 = mapSeries.markPoint.data[param.dataIndex].costPer;
					drawpie(ec, data1, 3, 'percentMap1');
    			    drawpie(ec, data2, 5, 'percentMap2');
    			    drawpie(ec, data3, 7, 'percentMap3');
    			    drawpie(ec, data4, 1, 'percentMap4');
				});	
				
				// 电厂名
				document.getElementById('powerPlantName').innerHTML = "集团";
				
				// 平均电价
				var internetCenterAverPrice1 = 23;
				internetCenterAverPrice1 = internetCenterAverPrice1.toString().substring(0, internetCenterAverPrice1.toString().indexOf('.')+3);
                document.getElementById('internetAverPrice1').innerHTML =  internetCenterAverPrice1;  
                
                var powerCenterVolume1 = 12;
				powerCenterVolume1 = powerCenterVolume1.toString().substring(0, powerCenterVolume1.toString().indexOf('.')+3);
			    document.getElementById('powerVolume1').innerHTML = powerCenterVolume1;
			    
			    var inputCenterCash1 = internetCenterAverPrice1*powerCenterVolume1;
			    document.getElementById('inputCash1').innerHTML = inputCenterCash1.toString().substring(0, inputCenterCash1.toString().indexOf('.')+3);

				// 合约电价
				var internetCenterAverPrice2 = 23;
				internetCenterAverPrice2 = internetCenterAverPrice2.toString().substring(0, internetCenterAverPrice2.toString().indexOf('.')+3);
                document.getElementById('internetAverPrice2').innerHTML =  internetCenterAverPrice2;  
                
                var powerCenterVolume2 = 22;
				powerCenterVolume2 = powerCenterVolume2.toString().substring(0, powerCenterVolume2.toString().indexOf('.')+3);
			    document.getElementById('powerVolume2').innerHTML = powerCenterVolume2;
			    
			    var inputCenterCash2 = internetCenterAverPrice2*powerCenterVolume2;
			    document.getElementById('inputCash2').innerHTML = inputCenterCash2.toString().substring(0, inputCenterCash2.toString().indexOf('.')+3);

				// 直供电价
				var internetCenterAverPrice3 = 23;
				internetCenterAverPrice3 = internetCenterAverPrice3.toString().substring(0, internetCenterAverPrice3.toString().indexOf('.')+3);
                document.getElementById('internetAverPrice3').innerHTML =  internetCenterAverPrice3;  
                
                var powerCenterVolume3 = 32;
				powerCenterVolume3 = powerCenterVolume3.toString().substring(0, powerCenterVolume3.toString().indexOf('.')+3);
			    document.getElementById('powerVolume3').innerHTML = powerCenterVolume3;
			    
			    var inputCenterCash3 = internetCenterAverPrice3*powerCenterVolume3;
			    document.getElementById('inputCash3').innerHTML = inputCenterCash3.toString().substring(0, inputCenterCash3.toString().indexOf('.')+3);

				// 代替电价
				var internetCenterAverPrice4 = 23;
				internetCenterAverPrice4 = internetCenterAverPrice4.toString().substring(0, internetCenterAverPrice4.toString().indexOf('.')+3);
                document.getElementById('internetAverPrice4').innerHTML =  internetCenterAverPrice4;  
                
                var powerCenterVolume4 = 42;
				powerCenterVolume4 = powerCenterVolume4.toString().substring(0, powerCenterVolume4.toString().indexOf('.')+3);
			    document.getElementById('powerVolume4').innerHTML = powerCenterVolume4;
			    
			    var inputCenterCash4 = internetCenterAverPrice4*powerCenterVolume4;
			    document.getElementById('inputCash4').innerHTML = inputCenterCash4.toString().substring(0, inputCenterCash4.toString().indexOf('.')+3);


				var dataCenter1 = 30;
				var dataCenter2 = 57;
				var dataCenter3 = 29;
				var dataCenter4 = 90;
				drawpie(ec, dataCenter1, 3, 'percentMap1');
			    drawpie(ec, dataCenter2, 5, 'percentMap2');
			    drawpie(ec, dataCenter3, 7, 'percentMap3');
			    drawpie(ec, dataCenter4, 1, 'percentMap4');
				
				// document.getElementById('powerName').innerHTML = "杭州";
				
                // 为echarts对象加载数据 
                myChart4.setOption(option4); 
		///////////////////////////////安徽淮南市地图////////////////////////////////////////////
				// 基于准备好的dom，初始化echarts图表
                myChart5 = ec.init(document.getElementById('huaiNanMap')); 
                
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
							            color: skinColor,
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
                                "淮南":[116.73,32.80],
                                "上海":[3000,3000]
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
								data : [{name: "淮南", value: 300}]
							}
						}
					]
				}; 

				myChart5.on(ecConfig.EVENT.CLICK, function (param){

                    document.getElementById('internetDetail').style.display = "none";
                    document.getElementById('internetMain').style.display = "";
                    
					var mapSeries = option5.series[0];

					var selectedData = {name: mapSeries.markPoint.data[param.dataIndex].name, value: mapSeries.markPoint.data[param.dataIndex].inputPlanValue};
                    option5.series[1].markPoint.data[0] = selectedData;
                    myChart5.setOption(option5);
                
                    option4.series[1].markPoint.data[0] = {name:'上海',value:0};
                    option4.series[1].markPoint.data[1] = {name:'上海',value:0};
                    myChart4.setOption(option4);
                    
					// 电厂名
					document.getElementById('powerPlantName').innerHTML = '凤台电厂';
					
					// 平均电价
					var internetAverPrice1 = mapSeries.markPoint.data[param.dataIndex].costPer;
					internetAverPrice1 = internetAverPrice1.toString().substring(0, internetAverPrice1.toString().indexOf('.')+3);
                    document.getElementById('internetAverPrice1').innerHTML =  internetAverPrice1;  
                    
                    var powerVolume1 = mapSeries.markPoint.data[param.dataIndex].averUsePerH;
					powerVolume1 = powerVolume1.toString().substring(0, powerVolume1.toString().indexOf('.')+3);
				    document.getElementById('powerVolume1').innerHTML = powerVolume1;
				    
				    var inputCash1 = mapSeries.markPoint.data[param.dataIndex].costPer*mapSeries.markPoint.data[param.dataIndex].averUsePerH;
				    document.getElementById('inputCash1').innerHTML = inputCash1.toString().substring(0, inputCash1.toString().indexOf('.')+3);

					// 合约电价
					var internetAverPrice2 = mapSeries.markPoint.data[param.dataIndex].costPer;
					internetAverPrice2 = internetAverPrice2.toString().substring(0, internetAverPrice2.toString().indexOf('.')+3);
                    document.getElementById('internetAverPrice2').innerHTML =  internetAverPrice2;  
                    
                    var powerVolume2 = mapSeries.markPoint.data[param.dataIndex].averUsePerH+0.5;
					powerVolume2 = powerVolume2.toString().substring(0, powerVolume2.toString().indexOf('.')+3);
				    document.getElementById('powerVolume2').innerHTML = powerVolume2;
				    
				    var inputCash2 = mapSeries.markPoint.data[param.dataIndex].costPer*(mapSeries.markPoint.data[param.dataIndex].averUsePerH+0.5);
				    document.getElementById('inputCash2').innerHTML = inputCash2.toString().substring(0, inputCash2.toString().indexOf('.')+3);

					// 直供电价
					var internetAverPrice3 = mapSeries.markPoint.data[param.dataIndex].costPer;
					internetAverPrice3 = internetAverPrice3.toString().substring(0, internetAverPrice3.toString().indexOf('.')+3);
                    document.getElementById('internetAverPrice3').innerHTML =  internetAverPrice3;  
                    
                    var powerVolume3 = mapSeries.markPoint.data[param.dataIndex].averUsePerH+1.4;
					powerVolume3 = powerVolume3.toString().substring(0, powerVolume3.toString().indexOf('.')+3);
				    document.getElementById('powerVolume3').innerHTML = powerVolume3;
				    
				    var inputCash3 = mapSeries.markPoint.data[param.dataIndex].costPer*(mapSeries.markPoint.data[param.dataIndex].averUsePerH+1.4);
				    document.getElementById('inputCash3').innerHTML = inputCash3.toString().substring(0, inputCash3.toString().indexOf('.')+3);


					// 代替电价
					var internetAverPrice4 = mapSeries.markPoint.data[param.dataIndex].costPer;
					internetAverPrice4 = internetAverPrice4.toString().substring(0, internetAverPrice4.toString().indexOf('.')+3);
                    document.getElementById('internetAverPrice4').innerHTML =  internetAverPrice4;  
                    
                    var powerVolume4 = mapSeries.markPoint.data[param.dataIndex].averUsePerH+2.8;
					powerVolume4 = powerVolume4.toString().substring(0, powerVolume4.toString().indexOf('.')+3);
				    document.getElementById('powerVolume4').innerHTML = powerVolume4
				        
				    var inputCash4 = mapSeries.markPoint.data[param.dataIndex].costPer*(mapSeries.markPoint.data[param.dataIndex].averUsePerH+2.8);
				    document.getElementById('inputCash4').innerHTML = inputCash4.toString().substring(0, inputCash4.toString().indexOf('.')+3);
					
					var data1 = mapSeries.markPoint.data[param.dataIndex].coalDays;
					var data2 = mapSeries.markPoint.data[param.dataIndex].averUsePerH;
					var data3 = mapSeries.markPoint.data[param.dataIndex].netPowerWPerH;
					var data4 = mapSeries.markPoint.data[param.dataIndex].costPer;
					drawpie(ec, data1, 3, 'percentMap1');
    			    drawpie(ec, data2, 5, 'percentMap2');
    			    drawpie(ec, data3, 7, 'percentMap3');
    			    drawpie(ec, data4, 1, 'percentMap4');
				});	
			
                // 为echarts对象加载数据 
                myChart5.setOption(option5); 
        }
        
        function drawpie(e, data1, data2, id) {
			var mychart = e.init(document.getElementById(id));
            var option = {
                    // tooltip : {
                    //     formatter: "{a} <br/>{b} : {c}%"
                    // },
                    series : [
                        {
                            name:'业务指标',
                            type:'gauge',
                            splitNumber: 10,       // 分割段数，默认为5
                            axisLine: {            // 坐标轴线
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: [[0.2, '#34BC34'],[0.8, '#FFD400'],[1, '#FF4535']], 
                                    width: 4
                                }
                            },
                            axisTick: {            // 坐标轴小标记
                                splitNumber: 10,   // 每份split细分多少段
                                length :0,        // 属性length控制线长
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: 'auto'
                                }
                            },
                            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                                show : false,
                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                    color: 'green'
                                }
                            },
                            splitLine: {           // 分隔线
                                show: true,        // 默认显示，属性show控制显示与否
                                length :0,         // 属性length控制线长
                                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                    color: 'auto'
                                }
                            },
                            pointer : {
                                width : 2
                            },
                            title : {
                                show : true,
                                offsetCenter: [0, '18'],       // x, y，单位px
                                borderWidth: 1,
                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                    fontWeight: 'bolder',
                                    color:'#34BC34'
                                }
                            },
                            detail : {
                                formatter:'{value}%',
                                offsetCenter: [0, '15'],       // x, y，单位px
                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                    color: '#34BC34',
                                    fontWeight: '400',
                                    fontSize:15
                                }
                            },
                            data:[
                                  { value: data1, 
                                    name: '环比' 
                                  }
                                 ]
                        }
                    ]
                };
			mychart.setOption(option);
		}
	}
});