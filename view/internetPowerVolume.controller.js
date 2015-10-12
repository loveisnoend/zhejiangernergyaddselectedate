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
        // this.loadChart();
        this._loadData01();
    	// 设定头部跑马灯信息 common.js
		_loadData03(valueCPIhuanbi,valueGDP,valueCPItongbi,valuePPItongbi,valuePMIproduce,valuePMInonProduce,valueGDPTotal);
	},
	// 获取三级页面数据
	_loadData01 : function () {

        var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
		    
			//设置数据
		    var dc=new Array();
			for (var i in sRes.results) {
			    if(sRes.results[i].KPI_DESC!="集团本部"&&sRes.results[i].KPI_DESC!=""){
    				if (dc==null||dc.length==0){ 
    				    dc.push(sRes.results[i].KPI_DESC);    
    				}else{
    				    if(dc.toString().indexOf(sRes.results[i].KPI_DESC) > -1){
    				    }else{
    				        dc.push(sRes.results[i].KPI_DESC);
    				    }
    				}
			    }
			}
			var zhejiang_dataStr = '[';
		    var huaiNan_dataStr = '[';
		    var isZhejiangDataFirst = true;
		    var isHuaiNanDataFirst = true;
			for(var j in dc){
			    var powerPlantName = '';
			    if (dc[j] == '凤台发电') {
			        powerPlantName = '淮南';
			    }
			    if (dc[j] == '兰溪发电') {
			        powerPlantName = '金华';
			    }
			    if (dc[j] == '台二发电') {
			        powerPlantName = '台州';
			    }
			    if (dc[j] == '集团') {
			        powerPlantName = '杭州';
			    }
			    
			    var tempJsonStrData = '{';
			    tempJsonStrData += '"name":"';
			    tempJsonStrData += powerPlantName;
			    tempJsonStrData += '",';
			    var isFirst = true;
    			for (var i in sRes.results) {
    				if (sRes.results[i].KPI_TYPE == '平均上网电价'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"averNetPrice":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '发电量'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"normalPowerVolume":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '发电收入'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"normalIncome":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '合约电价'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"contractPrice":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '合约电量'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"contractPowerVolume":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '合约收入'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"contractIncome":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '直供电价'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"directlyPrice":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '直供电量'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"directlyPowerVolume":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '直供收入'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"directlyIncome":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '替代电价'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"replacePrice":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '替代电量'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"replacePowerVolume":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '替代收入'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"replaceIncome":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '环比收入增长'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"huanbiIncomeUp":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '合约收入环比增长'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"contractIncomeUp":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '直供收入环比增长'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"directlyIncomeUp":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '替代收入环比增长'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"replaceIncomUp":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    			}
    			tempJsonStrData += '}';
    			    				
    			if (powerPlantName == '淮南') {
    			    if (isHuaiNanDataFirst != true){
    			        huaiNan_dataStr += ',';
    			    } 
    			    huaiNan_dataStr += tempJsonStrData;
    			    isHuaiNanDataFirst = false;
    			} else {
    			    if (isZhejiangDataFirst != true){
    			        zhejiang_dataStr += ',';
    			    }
    			    zhejiang_dataStr += tempJsonStrData
    			    isZhejiangDataFirst = false;
    			}
			}
			zhejiang_dataStr += ']';
			huaiNan_dataStr += ']';
			var zhejiang_JsonData = JSON.parse(zhejiang_dataStr)
			var huaiNan_JsonData = JSON.parse(huaiNan_dataStr);
    		this.loadChart(zhejiang_JsonData, huaiNan_JsonData);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("获取数据失败",{offset:'0 -110'});
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_03_V03/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	
	// 获取平均电价值
	loadPriceChartData : function (chartDivId, priceChartName) {
	    var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
		    
			//设置数据
		    var dc=new Array();
		    var dataThisYear = new Array();
		    var dataLastYear = new Array();
			for (var i in sRes.results) {
				if (sRes.results[i].KPI_TYPE == '平均上网电价'){ 
                    dataThisYear.push(sRes.results[i].KPI_VALUE);
				}
				if (sRes.results[i].KPI_TYPE == '去年同期平均上网电价'){ 
                    dataLastYear.push(sRes.results[i].KPI_VALUE);
				}
			}
    		this.loadPriceChartdetail(chartDivId, priceChartName, dataThisYear, dataLastYear);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("获取数据失败",{offset:'0 -110'});
		}, this);
	    sap.ui.getCore().getModel().read("ZJEY_CL_JYYJ_04_VPJDJ/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	// 电价详细Chart
	loadPriceChartdetail: function(chartDivId, priceChartName, dataThisYear, dataLastYear) {
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
			        fuelXaxisName = ['机组1', '机组2', '机组3', '机组4'];
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
						data: dataThisYear
                    },
					{
						name: '去年',
						type: 'bar',
						smooth: true,
					
						//itemStyle: {normal: {areaStyle: {type: 'default'}}},
						data: dataLastYear

                    }
                ]
			    };
			    mychart.setOption(option);
			}
    },
	// load the chart map
	loadChart : function (map1Data, map2Data) {
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
								"杭州":[119.50,30],
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
								    {name: "台州", value: 300},
								    {name: "杭州", value: 300}
								    ]
							}
						}
					]
				}; 
	
				myChart4.on(ecConfig.EVENT.CLICK, function (param){  

                    document.getElementById('internetDetail').style.display = "none";
                    document.getElementById('internetMain').style.display = "";
                    
					var mapSeries = option4.series[0];

					var selectedData = {name: mapSeries.markPoint.data[param.dataIndex].name, value: mapSeries.markPoint.data[param.dataIndex].inputPlanValue};
					option4.series[1].markPoint.data = [];
					option4.series[1].markPoint.data[0] = selectedData;
					option4.series[1].markPoint.data[1] = {name:'上海',value:0};
					option4.series[1].markPoint.data[2] = {name:'上海',value:0};
                    myChart4.setOption(option4);
					
					option5.series[1].markPoint.data = [{name:'上海',value:0}];
                    myChart5.setOption(option5);
                    
                    setChartData(ec, mapSeries, param.dataIndex);
				});	
				
                // 默认图表显示数据
                var mapSeries = option4.series[0];
                setChartData(ec, mapSeries, 2);
                
                // 默认集团数据显示
				var selectedData = {name: mapSeries.markPoint.data[2].name, value: mapSeries.markPoint.data[2].inputPlanValue};
				option4.series[1].markPoint.data[2] = selectedData;
			    option4.series[1].markPoint.data[1] = {name:'上海',value:0};
                option4.series[1].markPoint.data[0] = {name:'上海',value:0};
                // 为echarts对象加载数据 
                myChart4.setOption(option4); 
		///////////////////////////////安徽淮南市地图////////////////////////////////////////////
				// 基于准备好的dom，初始化echarts图表
                myChart5 = ec.init(document.getElementById('huaiNanMap')); 
				var allPowerData2 = map2Data;			
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
                    
                    setChartData(ec, mapSeries, param.dataIndex);
				});	
			
			    option5.series[1].markPoint.data[0] = {name:'上海',value:0};
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
                                    color: [[0.2, '#FF4535'],[0.5, '#FFD400'],[1, '#34BC34']], 
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
		// 设置Chart的数据
        function setChartData(ec, mapSeries, dataIndex) {
    		// 电厂名
			var powerPlantName = '';
			if (mapSeries.markPoint.data[dataIndex].name == '金华') {
			    powerPlantName = '兰溪电厂';
			} else if (mapSeries.markPoint.data[dataIndex].name == '台州') {
			    powerPlantName = '台二电厂';
			} else if (mapSeries.markPoint.data[dataIndex].name == '杭州') {
			    powerPlantName = '集团';
			} else if (mapSeries.markPoint.data[dataIndex].name == '淮南') {
			    powerPlantName = '凤台电厂';
			}
			// 电厂名
			document.getElementById('powerPlantName').innerHTML = powerPlantName;
			
			// 平均电价
			var internetAverPrice1 = mapSeries.markPoint.data[dataIndex].averNetPrice;
			if (internetAverPrice1 != undefined) {
			    document.getElementById('internetAverPrice1').innerHTML =  internetAverPrice1; 
			} else {
			    document.getElementById('internetAverPrice1').innerHTML =  0; 
			}
            var powerVolume1 = mapSeries.markPoint.data[dataIndex].normalPowerVolume;
            if (powerVolume1 != undefined) {
                document.getElementById('powerVolume1').innerHTML = powerVolume1;
            } else {
                document.getElementById('powerVolume1').innerHTML = 0;
            }
		    var normalIncome = mapSeries.markPoint.data[dataIndex].normalIncome;
		    if (normalIncome != undefined) {
		        document.getElementById('inputCash1').innerHTML =  normalIncome;
		    } else {
		        document.getElementById('inputCash1').innerHTML = 0;
		    }

			// 合约电价
			var internetAverPrice2 = mapSeries.markPoint.data[dataIndex].contractPrice;
			if (internetAverPrice2 != undefined) {
			    document.getElementById('internetAverPrice2').innerHTML =  internetAverPrice2;
			} else {
			    document.getElementById('internetAverPrice2').innerHTML = 0;
			}
            
            var powerVolume2 = mapSeries.markPoint.data[dataIndex].contractPowerVolume;
            if (powerVolume2 != undefined) {
                document.getElementById('powerVolume2').innerHTML = powerVolume2;
            } else {
                document.getElementById('powerVolume2').innerHTML = 0;
            }
		    
		    
		    var contractIncome = mapSeries.markPoint.data[dataIndex].contractIncome;
		    if (contractIncome != undefined) {
		        document.getElementById('inputCash2').innerHTML = contractIncome;
		    } else {
		        document.getElementById('inputCash2').innerHTML = 0;
		    }
			// 直供电价
			var internetAverPrice3 = mapSeries.markPoint.data[dataIndex].directlyPrice;
			if (internetAverPrice3 != undefined) {
			    document.getElementById('internetAverPrice3').innerHTML =  internetAverPrice3;
			} else {
			    document.getElementById('internetAverPrice3').innerHTML =  0;
			}
            var powerVolume3 = mapSeries.markPoint.data[dataIndex].directlyPowerVolume;
            if (powerVolume3 != undefined) {
                document.getElementById('powerVolume3').innerHTML = powerVolume3;
            } else {
                document.getElementById('powerVolume3').innerHTML = 0;
            }
		    var directlyIncome = mapSeries.markPoint.data[dataIndex].directlyIncome;
		    if (directlyIncome != undefined) {
		        document.getElementById('inputCash3').innerHTML = directlyIncome;
		    } else {
		        document.getElementById('inputCash3').innerHTML = 0;
		    }
			// 代替电价
			var internetAverPrice4 = mapSeries.markPoint.data[dataIndex].replacePrice;
			if (internetAverPrice4 != undefined) {
			    document.getElementById('internetAverPrice4').innerHTML =  internetAverPrice4;  
			} else {
			    document.getElementById('internetAverPrice4').innerHTML = 0;
			}
            var powerVolume4 = mapSeries.markPoint.data[dataIndex].replacePowerVolume;
            if (powerVolume4 != undefined) {
                document.getElementById('powerVolume4').innerHTML = powerVolume4;
            } else {
                document.getElementById('powerVolume4').innerHTML = 0;
            }
		    var replaceIncome = mapSeries.markPoint.data[dataIndex].replaceIncome;
		    if (replaceIncome != undefined) {
		        document.getElementById('inputCash4').innerHTML = replaceIncome;
		    } else {
		        document.getElementById('inputCash4').innerHTML = 0;
		    }
			
			var data1 = mapSeries.markPoint.data[dataIndex].huanbiIncomeUp;
			var data2 = mapSeries.markPoint.data[dataIndex].contractIncomeUp;
			var data3 = mapSeries.markPoint.data[dataIndex].directlyIncomeUp;
			var data4 = mapSeries.markPoint.data[dataIndex].replaceIncomUp;
			drawpie(ec, data1, 1, 'percentMap1');
		    drawpie(ec, data2, 1, 'percentMap2');
		    drawpie(ec, data3, 1, 'percentMap3');
		    drawpie(ec, data4, 1, 'percentMap4'); 
        }
	}
});