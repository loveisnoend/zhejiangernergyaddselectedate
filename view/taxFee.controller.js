sap.ui.controller("com.zhenergy.pcbi.view.taxFee", {

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
	    
        document.getElementById('internetDetailTaxFee').style.display = "";
        document.getElementById('rlcb_detailTaxFee').style.display = "none";
        // this.loadChart();
        this._loadData01();
    	// 设定头部跑马灯信息 common.js
		_loadData03(valueCPIhuanbi,valueGDP,valueCPItongbi,valuePPItongbi,valuePMIproduce,valuePMInonProduce,valueGDPTotal);
	},
	// 获取三级页面数据
	_loadData01 : function () {
	    
	    var zhejiang_dataStr = returnDefualtPowerPlant('zhejiang');
	    var huaiNan_dataStr = '[{"name":"淮南","inputPlanValue":""}]';
	    var akesu_dataStr = '[{"name":"浙能阿克苏热电有限公司","inputPlanValue":""}]';
	    var zhaoquan_dataStr = '[{"name":"宁夏枣泉发电有限责任公司","inputPlanValue":""}]';
	    
		var zhejiang_JsonData = JSON.parse(zhejiang_dataStr)
		var huaiNan_JsonData = JSON.parse(huaiNan_dataStr);
		var akesu_JsonData = JSON.parse(akesu_dataStr);
		var zhaoquan_JsonData = JSON.parse(zhaoquan_dataStr);
	    this.loadChart(zhejiang_JsonData, huaiNan_JsonData, akesu_JsonData, zhaoquan_JsonData);
	    // change the page skin
	    changeTheSkinOfPage();
	},
	
	// 获取集团指标-所得税费用 SCREEN_ZCQK_02_V01
	loadBase_SupplyTaxFeeIncome : function (chartDivId, priceChartName) {
	    
        var busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		} 
        
        // 所得税费用指标
        // 所得税费用
        var KPI_JZC_V = new Array();
        
        // 所得税费用同比
        var KPI_JZC_UP = new Array();
        
        var dataStatisticDate = '';
	    var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
		    
			// 各个电厂
			var xData = new Array();
			for (var i in sRes.results) {
			    // 所得税费用同比
				if (sRes.results[i].KPI_TYPE == '所得税费用_同比'){ 
                    KPI_JZC_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 所得税费用
				if (sRes.results[i].KPI_TYPE == '所得税费用' && sRes.results[i].KPI_DATE == sRes.results[sRes.results.length-1].KPI_DATE){ 
                    KPI_JZC_V.push(sRes.results[i].KPI_VALUE);
                    xData.push(sRes.results[i].KPI_DESC);
				}
				// 收入统计日期
				if (dataStatisticDate == '') {
				    dataStatisticDate = sRes.results[sRes.results.length-1].KPI_DATE.substring(0,4)+'.'+sRes.results[sRes.results.length-1].KPI_DATE.substring(4,6);//+"."+sRes.results[i].KPI_DATE.substring(6,8);
				}
			}
			// 统计于日期
			$('#taxFeeIncomeStatisticDate').html(dataStatisticDate);
			if (priceChartName == '所得税费用') {
			    this.taxFee(chartDivId, priceChartName,xData,KPI_JZC_V,KPI_JZC_UP);
			}
		    if (busy) {
    			busy.close();
    		} 
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("数据分析中,请稍后......",{offset:'0 -110'});
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_03_SDSFY/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	// 获取个电厂指标-所得税费用 SCREEN_ZCQK_02_V01
	loadEachPlant_SupplyTaxFeeIncome : function (chartDivId, priceChartName, powerPlantName) {

        var busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		} 
		
        // 所得税费用指标
        // 所得税费用
        var KPI_JZC_V = new Array();
        
        // 所得税费用同比
        var KPI_JZC_UP = new Array();
        
        var dataStatisticDate = '';
	    var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
		    
			// 各个电厂月份指标
			var xData = new Array();
			for (var i in sRes.results) {
			    // 所得税费用同比
				if (sRes.results[i].KPI_TYPE == '所得税费用_同比'){ 
                    KPI_JZC_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 所得税费用
				if (sRes.results[i].KPI_TYPE == '所得税费用' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    KPI_JZC_V.push(sRes.results[i].KPI_VALUE);
                    xData.push(sRes.results[i].KPI_DATE);
				}
				// 收入统计日期
				if (dataStatisticDate == '') {
				    dataStatisticDate = sRes.results[sRes.results.length-1].KPI_DATE.substring(0,4)+'.'+sRes.results[sRes.results.length-1].KPI_DATE.substring(4,6);//+"."+sRes.results[i].KPI_DATE.substring(6,8);
				}
			}
			// 统计于日期
			$('#taxFeeIncomeStatisticDate').html(dataStatisticDate);
			if (priceChartName == '所得税费用') {
			    this.loadBaseDataDetail_TaxFeeIncome(chartDivId, priceChartName,xData,KPI_JZC_V,KPI_JZC_UP);
			}
			if (busy) {
    			busy.close();
    		} 
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("数据分析中,请稍后......",{offset:'0 -110'});
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_03_SDSFY/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	// 加载集团-所得税费用
	taxFee: function(chartDivId, priceChartName,xData,KPI_JZC_V,KPI_JZC_UP) {

        	require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
			draw);
			
			function draw(e){
			    var mychart = e.init(document.getElementById(chartDivId));
			    document.getElementById('profitNameTaxFee').innerHTML = document.getElementById('powerPlantMainDetailTitleTaxFee').innerHTML;
    			var color1 = '#A704CA';
    			var color2 = '#E52DE6';
    			var option = {
    			        title : {
                            text: priceChartName,
                            subtext: '',
                            x : 40,
                            y : 5,
                            textStyle:{
                                fontSize : 15,
                                color: 'green'
                            }
                        },
          				legend: {
                          	orient:'horizontal',
                          	show : false,
                          	x:'120',
                          	y:'35',
                          	textStyle:{
        						color:'white',
        						fontFamily:'微软雅黑'
        					},
                			data:['所得税费用']
          			 	},
        			    tooltip:{
        			       trigger:'axis' ,
        			       backgroundColor:'rgb(234,234,234)',
        			       textStyle:{
        			           color:'rgb(0,0,0)',
        			           baseline:'top'
        			       },
        			       axisPointer:{
        			           type: 'none'
        			       }
        			    },
        				color: [color1, color2],
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
                                	formatter: '{value}',
                                	show: true,
                                	interval: 'auto',
                                	inside: false,
                                	rotate: 30,
                                	margin: 8
        						},
        						data: xData
                            }
                        ],
        				yAxis: [
        					{
        						name: '单位:千万元',
        						type: 'value',
        						axisLine: {
        							show: true
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
        				// 		max: y1,
        				// 		min: y2,
        				// 		splitNumber: n
                            }
                        ],
        				series: [
                            {
                                name:'所得税费用',
                                type:'bar',
                                symbol:'emptyCircle',
        						symbolSize:5,
        						itemStyle: {
        						    normal: {
        						        label : {
        						            show :true,
        						            position : 'top',
        						            textStyle:{
        						                color : 'white'
        						            }
        						        }
        						    }
        						},
                                data:KPI_JZC_V
                            }
            //                 {
            //                     name:'所得税费用同比',
            //                     type:'line',
            //                     symbol:'emptyCircle',
        				// 		symbolSize:5,
        				// 		itemStyle: {
        				// 		    normal: {
        				// 		        label : {
        				// 		            show :true,
        				// 		            position : 'top',
        				// 		            textStyle:{
        				// 		                color : 'white'
        				// 		            }
        				// 		        }
        				// 		    }
        				// 		},
            //                     barWidth : 50,
            //                     data:KPI_LWS_UP
            //                 }
                        ]
        			};
			    
			    mychart.setOption(option);
			}
    },
    // 加载集团-所得税费用指标
	loadBaseDataDetail_TaxFeeIncome: function(chartDivId, priceChartName,xData,KPI_JZC_V,KPI_JZC_UP) {
        	require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
			draw);
			
			function draw(e){
			    var mychart = e.init(document.getElementById(chartDivId));
			    document.getElementById('profitNameTaxFee').innerHTML = document.getElementById('powerPlantMainDetailTitleTaxFee').innerHTML;
    			var color1 = '#A704CA';
    			var color2 = '#E52DE6';
    			var option = {
    			        title : {
                            text: priceChartName,
                            subtext: '',
                            x : 40,
                            y : 5,
                            textStyle:{
                                fontSize : 15,
                                color: 'green'
                            }
                        },
          				legend: {
                          	orient:'horizontal',
                          	show : false,
                          	x:'120',
                          	y:'35',
                          	textStyle:{
        						color:'white',
        						fontFamily:'微软雅黑'
        					},
                			data:[priceChartName]
           			 	},
        			    tooltip:{
        			       trigger:'axis' ,
        			       backgroundColor:'rgb(234,234,234)',
        			       textStyle:{
        			           color:'rgb(0,0,0)',
        			           baseline:'top'
        			       },
        			       axisPointer:{
        			           type: 'none'
        			       }
        			    },
        				color: [color1, color2],
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
        						data: xData
                            }
                        ],
        				yAxis: [
        					{
        						name: '单位:千万元',
        						type: 'value',
        						axisLine: {
        							show: true
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
        				// 		max: y1,
        				// 		min: y2,
        				// 		splitNumber: n
                            }
                        ],
        				series: [
                            {
                                name:priceChartName,
                                type:'bar',
                                symbol:'emptyCircle',
        						symbolSize:5,
        						itemStyle: {
        						    normal: {
        						        label : {
        						            show :true,
        						            position : 'top',
        						            textStyle:{
        						                color : 'white'
        						            }
        						        }
        						    }
        						},
                                barWidth : 50,
                                data:KPI_JZC_V
                            }
                        ]
        			};
			    
			    mychart.setOption(option);
			}
    },
	//load the chart map
	loadChart : function (map1Data, map2Data, map3Data, map4Data) {
	    var skinColor = '';
	    if (skinName == '夜间模式') {
	        skinColor = 'Black';
	    } else {
	        skinColor = '#1717E9';
	    }
	    var myChart3
		var myChart4;
		var myChart5;
		// 新疆阿克苏
		var myChart6;
		// 宁夏枣泉
		var myChart7;
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
			    drawTaxFeeDistribution(e);
			    
			 //   drawpie01(e);
    // 			drawbar01(e);
    // 			drawbar02(e);
    // 			drawbar03(e);
    // 			drawbar04(e);
		    }
		
// 		    function drawTaxFeeDistribution(ec) {
		        
// 		    // event configure    
//             var ecConfig = require('echarts/config');
    
// 	///////////////////////////////////中国地图/////////////////////////////////////			
// 				// 基于准备好的dom，初始化echarts图表
// 				myChart3 = ec.init(document.getElementById('chinaMapTaxFee')); 
// 				option3 = {
// 					tooltip : {
// 						trigger: 'item',
// 						formatter: '{b}'
// 					},
// 					series : [
// 						{
// 							name: '中国',
// 							type: 'map',
// 							mapType: 'china',
// 							selectedMode : 'multiple',
// 							itemStyle:{
// 								normal:{label:{show:false}},
// 								emphasis:{label:{show:true}}
// 							},
// 							data:[
// 								{name:'浙江',selected:true}
// 							]
// 						}
// 					]
// 				};
// 				// 为echarts对象加载数据 
// 				myChart3.setOption(option3); 

//                 document.getElementById('powerPlantMainDetailTitleTaxFee').innerHTML = '集团'
// 	//////////////////////////////////浙江省地图//////////////////////////////////////////////////////////		
// 			    // 基于准备好的dom，初始化echarts图表
//                 myChart4 = ec.init(document.getElementById('powerPlantMapTaxFee'));
// 				var allTaxFeeData = map1Data;			
// 		        var option4 = {

// 					title : {
// 						text: '',
// 						subtext: '',
// 						sublink: '',
// 						x:'center'
// 					},
// 					calculable: false,
// 					tooltip : {
// 					    show : false,
// 						trigger : 'item'
// 					},
// 					series : [
// 						{
// 						    itemStyle:{
// 							    normal:{
// 							        label:{
// 							            show:true,
// 							            textStyle: {
// 							                color: '#00FF00'
// 							            }
// 							        },
// 							        areaStyle:{
// 							            color: skinColor,
// 							            type: 'default'
// 							        },
// 							        borderColor: 'white',
// 							        borderWidth: 2
// 							    },
//                                 emphasis:{label:{show:true}}
// 							},
// 							name: '浙能XXX电厂',
// 							type: 'map',
// 							mapType: '浙江',
// 							hoverable: false,
// 							roam:false,
// 							data : [],
// 							mapLocation : {
// 							    x: "center",
// 								y: "center"
// 								//width: "500px",
// 								//height: "500px"
// 							},
// 							marikline :{
// 							  itemStyle : {
// 							      normal : {
// 							          lable : {
//                                         show : false
// 							          }
// 							      },
// 							      emphasis : {
// 							          lable : {
// 							              show : false
// 							          }
// 							      }
// 							  }  
// 							},
// 							clickable:false,
// 							markPoint : {
// 							    clickable: true,
// 							    symbol: 'star50',
// 								symbolSize: 6,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
// 								effect:{
// 								  show: false,
// 								  type: 'scale',
// 								  scaleSize: 2,
// 								  loop: true,
// 								  period: 10
// 								},
// 								itemStyle: {
// 									normal: {
// 									    color:'#00FF00',    // 标点颜色值
// 										borderColor: '#00ff00',
// 										borderWidth: 1,            // 标注边线线宽，单位px，默认为1
// 										label: {
// 											show: false
// 										}
// 									},
// 									emphasis: {
// 										borderColor: '#FFFFFF',
// 										borderWidth: 1,
// 										label: {
// 											show: false
// 										}
// 									},
// 									large: true
// 								},
// 								data :allTaxFeeData
// 							},
// 							geoCoord: {
// 								// "温州":[120.65,28.01],
// 								// "义乌":[120.06,29.32],
// 								"杭州":[119.50,30],
// 								// "绍兴":[120.58,30.01],
// 								"金华":[119.64,29.12],
// 								// "衢州":[118.88,28.97],
// 								// "舟山":[122.207216,29.985295],
// 								// "宁波":[121.56,29.86],
// 								"台州":[121.420757,28.656386],
// 								// "湖州":[120.1,30.86],
// 								"上海":[3000,3000]
// 							}
// 						},
// 						{
// 							name: 'Top3',
// 							type: 'map',
// 							mapType: '浙江',
// 							data:[],
// 							markPoint : {
// 							    normal: {
// 								    label:{
// 									    show: false
// 									}
// 								},
// 								symbol:'circle',
// 								effect:{
// 								  show: true,
// 								  type: 'scale',
// 								  scaleSize: 2,
// 								  loop: true,
// 								  shadowColor: '#00FF00',
// 								  period: 10
// 								},
// 								itemStyle:{
// 									normal:{
// 										label:{show:false}
// 									}
// 								},
// 								data : [
// 								    {name: "金华", value: 300},
// 								    {name: "台州", value: 300},
// 								    {name: "杭州", value: 300}
// 								    ]
// 							}
// 						}
// 					]
// 				}; 
// 				myChart4.on(ecConfig.EVENT.CLICK, function (param){  
					
//                 	document.getElementById('internetDetailTaxFee').style.display = "";
//                     document.getElementById('rlcb_detailTaxFee').style.display = "none";
    
// 					var mapSeries = option4.series[0];
					
// 					var selectedData = {name: mapSeries.markPoint.data[param.dataIndex].name, value: mapSeries.markPoint.data[param.dataIndex].inputPlanValue};
// 					option4.series[1].markPoint.data = [];
// 					option4.series[1].markPoint.data[0] = selectedData;
// 					option4.series[1].markPoint.data[1] = {name:'上海',value:0};
// 					option4.series[1].markPoint.data[2] = {name:'上海',value:0};
//                     myChart4.setOption(option4);
					
// 					option5.series[1].markPoint.data = [{name:'上海',value:0}];
//                     myChart5.setOption(option5);
//                     setChartData(ec, mapSeries, param.dataIndex);
// 				});	
//                 // 默认图表显示数据
//                 var mapSeries = option4.series[0];
//                 setChartData(ec, mapSeries, 0);
                
//                 // 默认集团数据显示
// 				var selectedData = {name: mapSeries.markPoint.data[0].name, value: mapSeries.markPoint.data[0].inputPlanValue};
// 				option4.series[1].markPoint.data[0] = selectedData;
// 			    option4.series[1].markPoint.data[1] = {name:'上海',value:0};
//                 option4.series[1].markPoint.data[2] = {name:'上海',value:0};
//                 // 为echarts对象加载数据 
//                 myChart4.setOption(option4); 
// 		///////////////////////////////安徽淮南市地图////////////////////////////////////////////
// 				// 基于准备好的dom，初始化echarts图表
//                 myChart5 = ec.init(document.getElementById('huaiNanMapTaxFee')); 
// 				var allTaxFeeData2 = map2Data;
// 				option5 = {
// 					title : {
// 						text: '',
// 						subtext: '',
// 						sublink: '',
// 						x:'center'
// 					},
// 					calculable: false,
// 					series : [
// 						{
// 							itemStyle:{
// 								normal:
// 								{
// 								    label:{
// 								        show: true,
// 								        textStyle: {
// 							                color: '#00FF00'
// 							            }
// 								    },
// 								    areaStyle:{
// 							            color: skinColor,
// 							            type: 'default'
// 							        },
// 							        borderColor: 'white',
// 							        borderWidth: 2
// 								},
// 								emphasis:{label:{show:true}}
// 							},
// 							name: '安徽',
// 							type: 'map',
// 							mapType: '安徽|淮南市',
// 							hoverable:false,
// 							roam:false,
// 							data : [],
// 							clickable:false,
// 							markPoint : {
// 								clickable: true,
// 							    symbol: 'star50',
// 								symbolSize: 6,         // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
// 								itemStyle: {
// 									normal: {
// 									    color:'#00FF00',    // 标点颜色值
// 										borderColor: 'white',
// 										borderWidth: 1,            // 标注边线线宽，单位px，默认为1
// 										label: {
// 											show: false
// 										}
// 									},
// 									emphasis: {
// 										borderColor: 'white',
// 										borderWidth: 1,
// 										label: {
// 											show: false
// 										}
// 									},
// 									effect:{
//     								  show: true,
//     								  type: 'scale',
//     								  scaleSize: 2,
//     								  loop: true,
//     								  period: 10
//     								}
// 								},
// 								data :allTaxFeeData2
// 							},
// 							geoCoord: {
//                                 "淮南":[116.73,32.80],
//                                 "上海":[3000,3000]
// 							}
// 						},
// 						{
// 							name: 'Top3',
// 							type: 'map',
// 							mapType: '安徽|淮南市',
// 							data:[],
// 							markPoint : {
// 								symbol:'star50',
// 								effect:{
// 								  show: true,
// 								  type: 'scale',
// 								  scaleSize: 2,
// 								  loop: true,
// 								  shadowColor: '#00FF00',
// 								  period: 10
// 								},
// 								itemStyle:{
// 									normal:{
// 										label:{show:false}
// 									}
// 								},
// 								data : [{name: "淮南", value: 300}]
// 							}
// 						}
// 					]
// 				}; 
// 				myChart5.on(ecConfig.EVENT.CLICK, function (param){

//                 	document.getElementById('internetDetailTaxFee').style.display = "";
//                     document.getElementById('rlcb_detailTaxFee').style.display = "none";
                    
// 					var mapSeries = option5.series[0];

// 					var selectedData = {name: mapSeries.markPoint.data[param.dataIndex].name, value: mapSeries.markPoint.data[param.dataIndex].inputPlanValue};
//                     option5.series[1].markPoint.data[0] = selectedData;
//                     myChart5.setOption(option5);
                
//                     option4.series[1].markPoint.data[0] = {name:'上海',value:0};
//                     option4.series[1].markPoint.data[1] = {name:'上海',value:0};
//                     option4.series[1].markPoint.data[2] = {name:'上海',value:0};
//                     myChart4.setOption(option4);
                    
//                     setChartData(ec, mapSeries, param.dataIndex);
// 				});	
			
// 			    // 默认显示数据
// 			    option5.series[1].markPoint.data[0] = {name:'上海',value:0};
//                 // 为echarts对象加载数据 
//                 myChart5.setOption(option5); 
//         }
		    function drawTaxFeeDistribution(ec) {
		        
		    // event configure    
            var ecConfig = require('echarts/config');
    
	///////////////////////////////////中国地图/////////////////////////////////////			
				// 基于准备好的dom，初始化echarts图表
				myChart3 = ec.init(document.getElementById('chinaMapTaxFee')); 
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

                document.getElementById('powerPlantMainDetailTitleTaxFee').innerHTML = '集团'
	//////////////////////////////////浙江省地图//////////////////////////////////////////////////////////		
			    // 基于准备好的dom，初始化echarts图表
                var myChart4 = ec.init(document.getElementById('powerPlantMapTaxFee'));
				var allPowerData = map1Data;			
		        var option4 = {

					title : {
						text: '',
						subtext: '',
						sublink: '',
						x:'center'
					},
					calculable: false,
					tooltip : {
                        trigger: 'item',
                        formatter: '{b}<br/>{c}',
                        position : [200,0]
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
							clickable:false,
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
								  period: 10
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
								// 杭州
								"萧山发电厂":[120,30.17],
								"浙能电力股份有限公司":[119.70,30.17],
								"杭州":[119.50,30],
								// 嘉兴
								"浙江浙能嘉兴发电有限公司":[120.58,30.60],
								"浙江嘉源电力工程有限公司":[120.88,30.85],
								"浙江浙能嘉华发电有限公司":[120.88,30.40],
								"平湖市滨海热力有限公司":[121.20,30.60],
								// 绍兴
								"浙江华隆电力工程有限公司":[120.58,29.90],
								"浙江浙能绍兴滨海热电有限责任公司":[120.58,29.60],
								"浙江浙能钱清发电有限责任公司":[120.28,29.60],
								"浙江浙能绍兴滨海热力有限公司":[120.88,29.60],
								// 湖州
								"浙江浙能长兴发电有限公司":[119.80,30.95],
								"浙江长兴东南热力有限责任公司":[120,30.60],
								// 金华
								"金华":[119.64,29.12],
								"浙江浙能金华燃机发电有限责任公司":[112.50,29.12],
								//衢州
								"浙江浙能常山天然气发电有限公司":[118.70,29],
								// 舟山
								"浙江浙能中煤舟山煤电有限责任公司":[122.20,30.40],
								// 宁波
								"浙江浙能镇海发电有限责任公司":[121.20,30.20],
								"宁波市镇海热力有限责任公司":[121.40,30],
								"宁波发电工程有限公司":[121.60,29.80],
								"浙江浙能镇海联合发电有限公司":[121.70,29.50],
								"浙江浙能北仑发电有限公司":[122.10,29.10],
								"浙江浙能镇海天然气发电有限责任公司":[121.50,29.30],
								"浙江浙能镇海燃气热电有限责任公司":[121.90,29.30],
								// 温州
								"浙江浙能温州发电有限公司":[120.68,28.30],
								"乐清市瓯越电力工程检修有限公司":[120.68,28],
								"乐清市嘉隆供热有限公司":[120.68,27.60],
								"浙江浙能乐清发电有限责任公司":[120.38,27.60],
								"温州燃机发电有限公司":[120.10,27.60],
								"浙江温州特鲁莱发电有限责任公司":[120.98,27.60],
								// 台州
								"台州":[121.50,28.65],
								"台州市海天电力工程有限公司":[121.50,28.85],
								"台州市联源热力有限公司":[121.12,28.85],
								"台州发电厂":[121.50,28.40],
								// TODO
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
								  scaleSize: 2,
								  loop: true,
								  shadowColor: '#00FF00',
								  period: 10
								},
								itemStyle:{
									normal:{
										label:{show:false}
									}
								},
								data : [
								    // {name: "金华", value: 300},
								    // {name: "台州", value: 300}
								    // {name: "浙江浙能电力股份有限公司萧山发电厂", value: 300},
								    // {name: "浙江华隆电力工程有限公司", value: 300}
								    ]
							}
						}
					]
				}; 
				myChart4.on(ecConfig.EVENT.CLICK, function (param){  
					
                	document.getElementById('internetDetailTaxFee').style.display = "";
                    document.getElementById('rlcb_detailTaxFee').style.display = "none";
    
					var mapSeries = option4.series[0];
					
					var selectedData = {name: mapSeries.markPoint.data[param.dataIndex].name, value: mapSeries.markPoint.data[param.dataIndex].inputPlanValue};
					
					option4.series[1].markPoint.data = [];
					option4.series[1].markPoint.data[0] = selectedData;
					option4.series[1].markPoint.data[1] = {name:'上海',value:0};
					option4.series[1].markPoint.data[2] = {name:'上海',value:0};
                    myChart4.setOption(option4);
					
					option5.series[1].markPoint.data = [{name:'上海',value:0}];
                    myChart5.setOption(option5);
                    
                    option6.series[1].markPoint.data = [{name:'上海',value:0}];
                    myChart6.setOption(option6);
                    
                    option7.series[1].markPoint.data = [{name:'上海',value:0}];
                    myChart7.setOption(option7);
                    setChartData(ec, mapSeries, param.dataIndex);
				});	
                // 默认图表显示数据
                var mapSeries = option4.series[0];
                setChartData(ec, mapSeries, 0);
                
                // 默认集团数据显示
				var selectedData = {name: mapSeries.markPoint.data[0].name, value: mapSeries.markPoint.data[0].inputPlanValue};
				option4.series[1].markPoint.data[0] = selectedData;
			    option4.series[1].markPoint.data[1] = {name:'上海',value:0};
                option4.series[1].markPoint.data[2] = {name:'上海',value:0};
				
                // 为echarts对象加载数据 
                myChart4.setOption(option4); 
		///////////////////////////////安徽淮南市地图////////////////////////////////////////////
				// 基于准备好的dom，初始化echarts图表
                myChart5 = ec.init(document.getElementById('huaiNanMapTaxFee')); 
                
				var allPowerData2 = map2Data;
				var option5 = {
					title : {
						text: '',
						subtext: '',
						sublink: '',
						x:'center'
					},
					tooltip : {
                        trigger: 'item',
                        formatter: '{b}<br/>{c}',
                        position : [200,0]
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
							clickable:false,
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
    								  scaleSize: 2,
    								  loop: true,
    								  period: 10
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
								  scaleSize: 2,
								  loop: true,
								  shadowColor: '#00FF00',
								  period: 10
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

                	document.getElementById('internetDetailTaxFee').style.display = "";
                    document.getElementById('rlcb_detailTaxFee').style.display = "none";
                    
					var mapSeries = option5.series[0];

					var selectedData = {name: mapSeries.markPoint.data[param.dataIndex].name, value: mapSeries.markPoint.data[param.dataIndex].inputPlanValue};
                    option5.series[1].markPoint.data[0] = selectedData;
                    myChart5.setOption(option5);
                
                    option4.series[1].markPoint.data[0] = {name:'上海',value:0};
                    option4.series[1].markPoint.data[1] = {name:'上海',value:0};
                    option4.series[1].markPoint.data[2] = {name:'上海',value:0};
                    myChart4.setOption(option4);

                    option6.series[1].markPoint.data[0] = {name:'上海',value:0};
                    myChart6.setOption(option6);
                    
                    option7.series[1].markPoint.data[0] = {name:'上海',value:0};
                    myChart7.setOption(option7);
                    setChartData(ec, mapSeries, param.dataIndex);
				});	
			    option5.series[1].markPoint.data[0] = {name:'上海',value:0};
                // 为echarts对象加载数据 
                myChart5.setOption(option5); 
                
		///////////////////////////////新疆阿克苏地图////////////////////////////////////////////
				// 基于准备好的dom，初始化echarts图表
                myChart6 = ec.init(document.getElementById('akesuMapTaxFee')); 
				var allPowerData3 = map3Data;
				var option6 = {
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
							                color: '#00FF00',
							                fontSize: 12
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
							name: '新疆',
							type: 'map',
							mapType: '新疆|阿克苏地区',
							hoverable:false,
							roam:false,
							data : [],
							clickable:false,
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
    								  scaleSize: 2,
    								  loop: true,
    								  period: 10
    								}
								},
								data :allPowerData3
							},
							geoCoord: {
                                "浙能阿克苏热电有限公司":[80.22,41.17],
                                "上海":[3000,3000]
							}
						},
						{
							name: 'Top3',
							type: 'map',
							mapType: '新疆|阿克苏地区',
							data:[],
							markPoint : {
								symbol:'star50',
								effect:{
								  show: true,
								  type: 'scale',
								  scaleSize: 2,
								  loop: true,
								  shadowColor: '#00FF00',
								  period: 10
								},
								itemStyle:{
									normal:{
										label:{show:false}
									}
								},
								data : [{name: "浙能阿克苏热电有限公司", value: 300}]
							}
						}
					]
				}; 
				myChart6.on(ecConfig.EVENT.CLICK, function (param){

                	document.getElementById('internetDetailTaxFee').style.display = "";
                    document.getElementById('rlcb_detailTaxFee').style.display = "none";
                    
					var mapSeries = option6.series[0];

					var selectedData = {name: mapSeries.markPoint.data[param.dataIndex].name, value: mapSeries.markPoint.data[param.dataIndex].inputPlanValue};
                    option6.series[1].markPoint.data[0] = selectedData;
                    myChart6.setOption(option6);
                
                    option4.series[1].markPoint.data[0] = {name:'上海',value:0};
                    option4.series[1].markPoint.data[1] = {name:'上海',value:0};
                    option4.series[1].markPoint.data[2] = {name:'上海',value:0};
                    myChart4.setOption(option4);

                    option5.series[1].markPoint.data[0] = {name:'上海',value:0};
                    myChart5.setOption(option5);

                    option7.series[1].markPoint.data[0] = {name:'上海',value:0};
                    myChart7.setOption(option7);
                    setChartData(ec, mapSeries, param.dataIndex);
				});	
			    option6.series[1].markPoint.data[0] = {name:'上海',value:0};
                // 为echarts对象加载数据 
                myChart6.setOption(option6); 

		///////////////////////////////宁夏枣泉地图////////////////////////////////////////////
				// 基于准备好的dom，初始化echarts图表
                myChart7 = ec.init(document.getElementById('zaoquanMapTaxFee')); 
				var allPowerData4 = map4Data;
				var option7 = {
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
							                color: '#00FF00',
							                fontSize: 12
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
							name: '宁夏',
							type: 'map',
							mapType: '宁夏|银川市',
							hoverable:false,
							roam:false,
							data : [],
							clickable:false,
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
    								  scaleSize: 2,
    								  loop: true,
    								  period: 10
    								}
								},
								data :allPowerData4
							},
							geoCoord: {
                                "宁夏枣泉发电有限责任公司":[106.27,38.47],
                                "上海":[3000,3000]
							}
						},
						{
							name: 'Top3',
							type: 'map',
							mapType: '宁夏|银川市',
							data:[],
							markPoint : {
								symbol:'star50',
								effect:{
								  show: true,
								  type: 'scale',
								  scaleSize: 2,
								  loop: true,
								  shadowColor: '#00FF00',
								  period: 10
								},
								itemStyle:{
									normal:{
										label:{show:false}
									}
								},
								data : [{name: "宁夏枣泉发电有限责任公司", value: 300}]
							}
						}
					]
				}; 
				myChart7.on(ecConfig.EVENT.CLICK, function (param){

                	document.getElementById('internetDetailTaxFee').style.display = "";
                    document.getElementById('rlcb_detailTaxFee').style.display = "none";
                    
					var mapSeries = option7.series[0];

					var selectedData = {name: mapSeries.markPoint.data[param.dataIndex].name, value: mapSeries.markPoint.data[param.dataIndex].inputPlanValue};
                    option7.series[1].markPoint.data[0] = selectedData;
                    myChart7.setOption(option7);
                
                    option4.series[1].markPoint.data[0] = {name:'上海',value:0};
                    option4.series[1].markPoint.data[1] = {name:'上海',value:0};
                    option4.series[1].markPoint.data[2] = {name:'上海',value:0};
                    myChart4.setOption(option4);

                    option5.series[1].markPoint.data[0] = {name:'上海',value:0};
                    myChart5.setOption(option5);

                    option6.series[1].markPoint.data[0] = {name:'上海',value:0};
                    myChart6.setOption(option6);
                    setChartData(ec, mapSeries, param.dataIndex);
				});	
			    option7.series[1].markPoint.data[0] = {name:'上海',value:0};
                // 为echarts对象加载数据 
                myChart7.setOption(option7); 
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
					    zlevel : 0,
						name: '1',
						type: 'pie',
				// 		center: ['31%','36%'],
						radius: [135, 139],
						startAngle : 0,
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
            drawpie(e, 3, 4, 'detail_pieTaxFee');
        }
		function drawbar01(e) {
			drawbar(e, 4, 6, 'detail_01TaxFee');
		}

		function drawbar02(e) {
			drawbar(e, 7, 3, 'detail_02TaxFee');
		}

		function drawbar03(e) {
			drawbar(e, 3, 7, 'detail_03TaxFee');
		}

		function drawbar04(e) {
			drawbar(e, 8, 2, 'detail_04TaxFee');
		}
		// 设置Chart的数据
        function setChartData(ec, mapSeries, dataIndex) {
            
    		// get powerplantname by real name
			var powerPlantName = getPowerplantnameByRealName(mapSeries.markPoint.data[dataIndex].name);
			document.getElementById('powerPlantMainDetailTitleTaxFee').innerHTML = powerPlantName;

            var priceChartId = "priceDetailDivTaxFee";
            var priceChartName = "所得税费用";
            if (powerPlantName == '台二电厂') {
                powerPlantName = '台二发电';
            }
            if (powerPlantName == '兰溪电厂') {
                powerPlantName = '兰溪发电';
            }
            if (powerPlantName == '凤台电厂') {
                powerPlantName = '凤台发电';
            }
        	if (powerPlantName == '集团') {
        	    // TODO
        	   taxFee.getController().loadBase_SupplyTaxFeeIncome(priceChartId, priceChartName);
        	   //taxFee.getController().loadEachPlant_SupplyTaxFeeIncome(priceChartId, priceChartName, powerPlantName);
        	} else {
        	   taxFee.getController().loadEachPlant_SupplyTaxFeeIncome(priceChartId, priceChartName, powerPlantName);
        	}
		  //  // 自产蒸汽
		  //  var selfSteamIncomeVal = mapSeries.markPoint.data[dataIndex].selfSteamIncomeVal;
		  //  if (selfSteamIncomeVal != undefined) {
		  //      document.getElementById('travelPriceTaxFee').innerHTML =  selfSteamIncomeVal;
		  //  } else {
		  //      document.getElementById('travelPriceTaxFee').innerHTML = 0;
		  //      selfSteamIncomeVal = 0;
		  //  }
		  //  // 外购蒸汽
		  //  var outSteamIncomeVal = mapSeries.markPoint.data[dataIndex].outSteamIncomeVal;
		  //  if (outSteamIncomeVal != undefined) {
		  //      document.getElementById('coalPriceTaxFee').innerHTML = outSteamIncomeVal;
		  //  } else {
		  //      document.getElementById('coalPriceTaxFee').innerHTML = 0;
		  //      outSteamIncomeVal = 0;
		  //  }
		  //  // 热水
		  //  var taxFeeWaterIncomeVal = mapSeries.markPoint.data[dataIndex].taxFeeWaterIncomeVal;
		  //  if (taxFeeWaterIncomeVal != undefined) {
		  //      document.getElementById('watt1TaxFee').innerHTML =  taxFeeWaterIncomeVal;
		  //  } else {
		  //      document.getElementById('watt1TaxFee').innerHTML = 0;
		  //      taxFeeWaterIncomeVal = 0;
		  //  }
		  //  // 初装费
		  //  var firstFeeIncomeVal = mapSeries.markPoint.data[dataIndex].firstFeeIncomeVal;
		  //  if (firstFeeIncomeVal != undefined) {
		  //      document.getElementById('factoryUsePV').innerHTML = firstFeeIncomeVal;
		  //  } else {
		  //      document.getElementById('factoryUsePV').innerHTML = 0;
		  //      firstFeeIncomeVal = 0;
		  //  }
		  //  // 供热收入
		  //  var supplyTaxFeeIncomeVal = mapSeries.markPoint.data[dataIndex].supplyTaxFeeIncomeVal;
		  //  if (supplyTaxFeeIncomeVal != undefined) {
		  //      document.getElementById('fuelCostTaxFee').innerHTML = supplyTaxFeeIncomeVal;
		  //  } else {
		  //      document.getElementById('fuelCostTaxFee').innerHTML = 0;
		  //      supplyTaxFeeIncomeVal = 0;
		  //  }
		  //  // 供热收入同比
		  //  var supplyTaxFeeIncomeUP = mapSeries.markPoint.data[dataIndex].supplyTaxFeeIncomeUP;
		  //  if (supplyTaxFeeIncomeUP != undefined) {
		  //      document.getElementById('fuelDownPercentTaxFee').innerHTML = supplyTaxFeeIncomeUP;
		  //  } else {
		  //      document.getElementById('fuelDownPercentTaxFee').innerHTML = 0;
		  //      supplyTaxFeeIncomeUP = 0;
		  //  }
		  //  var dataAll = selfSteamIncomeVal + outSteamIncomeVal + taxFeeWaterIncomeVal + firstFeeIncomeVal;
		  //  if (dataAll == 0) {
		  //      dataAll = 10;
		  //  }
		  //  drawpie(ec, supplyTaxFeeIncomeUP+50, 50, 'detail_pieTaxFee');
		  //  drawbar(ec, selfSteamIncomeVal, dataAll, 'detail_01TaxFee');
		  //  drawbar(ec, outSteamIncomeVal, dataAll, 'detail_02TaxFee');
		  //  drawbar(ec, taxFeeWaterIncomeVal, dataAll, 'detail_03TaxFee');
		  //  drawbar(ec, firstFeeIncomeVal, dataAll, 'detail_04TaxFee');
        }
	}
});