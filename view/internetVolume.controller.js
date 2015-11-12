sap.ui.controller("com.zhenergy.pcbi.view.internetVolume", {

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
	    
        document.getElementById('internetDetailNet').style.display = "none";
        document.getElementById('rlcb_detailNet').style.display = "";
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
    				if ((sRes.results[i].KPI_TYPE == '各电厂发电量' || sRes.results[i].KPI_TYPE == '集团汇总发电量')&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"eachPlantPV":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '发电量同比'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"powerPercentUp":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '合约电量'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"contractPV":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '直供电量'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"directlyPV":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '厂用电量'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"factoryUsePV":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '替代电量'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"replacePV":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '上网电量'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"internetPV":';
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
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_03_V04/?$filter=(BNAME eq '" + usrid + "')", mParameters);
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
		    document.getElementById('caloriPowerPlantNameNet').innerHTML = document.getElementById('powerPlantMainDetailTitleNet').innerHTML;
		    var mychart = e.init(document.getElementById(divId));
		    var option = {
		        title:{
            	text:'煤炭价格变化',
            	textStyle:{
					color:'white',
					fontFamily:'微软雅黑'
				},
				x:'50',
				y:'10'
            },
  			legend: {
              	orient:'horizontal',
              	x:'350',
              	y:'15',
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
					}
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
					}
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
	// 获取厂用电量
	loadFactoryUseData : function (chartDivId, priceChartName) {
	    
	    var powerPlantName = document.getElementById('powerPlantMainDetailTitleNet').innerHTML;
	    if (powerPlantName == '台二电厂') {
	        powerPlantName = '台二发电';
	    }
	    if (powerPlantName == '兰溪电厂') {
	        powerPlantName = '兰溪发电';
	    }
	    if (powerPlantName == '凤台电厂') {
	        powerPlantName = '凤台发电';
	    }
	    var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
		    
			//设置数据
		    var machineGroupData = new Array();
		    var dataStatisticDate = '';
			for (var i in sRes.results) {
			    var plantName = sRes.results[i].KPI_DESC.toString().substring(0, 4);
			    if (powerPlantName == '集团') {
			        if (sRes.results[i].KPI_TYPE == '上网电量'&& plantName != '集团'){ 
                        machineGroupData.push(sRes.results[i].KPI_VALUE);
    				}
			    } else {
    				if (sRes.results[i].KPI_TYPE == '机组上网电量'&& plantName == powerPlantName){ 
                        machineGroupData.push(sRes.results[i].KPI_VALUE);
    				}
			    }
				if (dataStatisticDate == '') {
				    dataStatisticDate = sRes.results[i].KPI_DATE.substring(0,4)+'.'+sRes.results[i].KPI_DATE.substring(4,6)+"."+sRes.results[i].KPI_DATE.substring(6,8);
				}
			}
			// 统计于日期
			$('#internetVolumeStatisticDate').html(dataStatisticDate);
    		this.loadPriceChartdetail(chartDivId, priceChartName, machineGroupData);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("获取数据失败",{offset:'0 -110'});
		}, this);
	    sap.ui.getCore().getModel().read("ZJEY_CL_JYYJ_04_VFDL/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	// 电价详细Chart
	loadPriceChartdetail: function(chartDivId, priceChartName, machineGroupData) {
        	require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
			draw);
			
			function draw(e){
			    var mychart = e.init(document.getElementById(chartDivId));
			    document.getElementById('profitNameNet').innerHTML = document.getElementById('powerPlantMainDetailTitleNet').innerHTML;
			    var fuelXaxisName = '';
			    if (document.getElementById('powerPlantMainDetailTitleNet').innerHTML == '集团') {
			        fuelXaxisName = ['兰溪发电', '台二发电', '凤台发电'];
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
  				    show : false,
                  	orient:'horizontal',
                  	x:'400',
                  	y:'20',
                  	textStyle:{
						color:'white',
						fontFamily:'微软雅黑'
					},
        			data:['当年']
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
						name: '万千瓦时',
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
						}
                    }
                ],
				series: [
					{
						name: '当年',
						type: 'bar',
						smooth: true,
                     	barGap: '0%',
                      	barCategoryGap: '50%',
						itemStyle: {
						    normal: {
						      //  color: 'green',
						        label : {
						            show :true,
						            position : 'top',
						            textStyle:{
						                color : 'white'
						            }
						        }
						      //  areaStyle: {type: 'default'}
						    }
						},
						data: machineGroupData
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
				'echarts/chart/bar'
            ],
			draw);
			
			function draw(e) {
			    drawPowerDistribution(e);
			    
			    drawpie01(e);
    			drawbar01(e);
    			drawbar02(e);
    			drawbar03(e);
    // 			drawbar04(e);
		    }
		
		    function drawPowerDistribution(ec) {
		        
		    // event configure    
            var ecConfig = require('echarts/config');
    
	///////////////////////////////////中国地图/////////////////////////////////////			
				// 基于准备好的dom，初始化echarts图表
				myChart3 = ec.init(document.getElementById('chinaMap2')); 
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

                document.getElementById('powerPlantMainDetailTitleNet').innerHTML = '集团'
	//////////////////////////////////浙江省地图//////////////////////////////////////////////////////////		
			    // 基于准备好的dom，初始化echarts图表
                myChart4 = ec.init(document.getElementById('powerPlantMap2'));
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
								  scaleSize: 3,
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
									    show: false
									}
								},
								symbol:'circle',
								effect:{
								  show: true,
								  type: 'scale',
								  scaleSize: 3,
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
								    {name: "金华", value: 300},
								    {name: "台州", value: 300},
								    {name: "杭州", value: 300}
								    ]
							}
						}
					]
				}; 
				myChart4.on(ecConfig.EVENT.CLICK, function (param){  
					
                	document.getElementById('internetDetailNet').style.display = "none";
                    document.getElementById('rlcb_detailNet').style.display = "";
    
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
                myChart5 = ec.init(document.getElementById('huaiNanMap2')); 
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

                	document.getElementById('internetDetailNet').style.display = "none";
                    document.getElementById('rlcb_detailNet').style.display = "";
                    
					var mapSeries = option5.series[0];

					var selectedData = {name: mapSeries.markPoint.data[param.dataIndex].name, value: mapSeries.markPoint.data[param.dataIndex].inputPlanValue};
                    option5.series[1].markPoint.data[0] = selectedData;
                    myChart5.setOption(option5);
                
                    option4.series[1].markPoint.data[0] = {name:'上海',value:0};
                    option4.series[1].markPoint.data[1] = {name:'上海',value:0};
                    option4.series[1].markPoint.data[2] = {name:'上海',value:0};
                    myChart4.setOption(option4);
                    
                    setChartData(ec, mapSeries, param.dataIndex);
				});	
			
			    // 默认显示数据
			    option5.series[1].markPoint.data[0] = {name:'上海',value:0};
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
            drawpie(e, 3, 4, 'detail_pieNet');
        }
		function drawbar01(e) {
			drawbar(e, 4, 6, 'detail_01Net');
		}

		function drawbar02(e) {
			drawbar(e, 7, 3, 'detail_02Net');
		}

		function drawbar03(e) {
			drawbar(e, 3, 7, 'detail_03Net');
		}

		function drawbar04(e) {
			drawbar(e, 8, 2, 'detail_04Net');
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
			document.getElementById('powerPlantMainDetailTitleNet').innerHTML = powerPlantName;

		    // 发电量
		    var eachPlantPV = mapSeries.markPoint.data[dataIndex].eachPlantPV;
		    if (eachPlantPV != undefined) {
		        document.getElementById('fuelCostNet').innerHTML =  eachPlantPV;
		    } else {
		        document.getElementById('fuelCostNet').innerHTML = 0;
		    }
		    // 发电量同比变化
		    var powerPercentUp = mapSeries.markPoint.data[dataIndex].powerPercentUp;
		    if (powerPercentUp != undefined) {
		        document.getElementById('fuelDownPercentNet').innerHTML = powerPercentUp;
		    } else {
		        document.getElementById('fuelDownPercentNet').innerHTML = 0;
		    }
		    // 合约电量
		    var contractPV = mapSeries.markPoint.data[dataIndex].contractPV;
		    if (contractPV != undefined) {
		        document.getElementById('travelPriceNet').innerHTML =  contractPV;
		    } else {
		        document.getElementById('travelPriceNet').innerHTML = 0;
		        contractPV = 0;
		    }
		    // 直供电量
		    var directlyPV = mapSeries.markPoint.data[dataIndex].directlyPV;
		    if (directlyPV != undefined) {
		        document.getElementById('coalPriceNet').innerHTML = directlyPV;
		    } else {
		        document.getElementById('coalPriceNet').innerHTML = 0;
		        directlyPV = 0;
		    }
		    // 厂用电量
		    var factoryUsePV = mapSeries.markPoint.data[dataIndex].factoryUsePV;
		    if (factoryUsePV != undefined) {
		        document.getElementById('factoryUsePV').innerHTML = factoryUsePV;
		    } else {
		        document.getElementById('factoryUsePV').innerHTML = 0;
		    }
		    // 替代电量
		    var replacePV = mapSeries.markPoint.data[dataIndex].replacePV;
		    if (replacePV != undefined) {
		        document.getElementById('watt1Net').innerHTML = replacePV;
		    } else {
		        document.getElementById('watt1Net').innerHTML = 0;
		        replacePV = 0;
		    }
		    // 上网电量
		    var internetPV = mapSeries.markPoint.data[dataIndex].internetPV;
		    if (internetPV != undefined) {
		        document.getElementById('internetPV').innerHTML = internetPV;
		    } else {
		        document.getElementById('internetPV').innerHTML = 0;
		    }

		    var dataAll = contractPV + directlyPV + replacePV;
		    if (dataAll == 0) {
		        dataAll = 10;
		    }
		    drawpie(ec, 1, 0, 'detail_pieNet');
		    drawbar(ec, contractPV, dataAll, 'detail_01Net');
		    drawbar(ec, directlyPV, dataAll, 'detail_02Net');
		    drawbar(ec, replacePV, dataAll, 'detail_03Net');
        }
	}
});