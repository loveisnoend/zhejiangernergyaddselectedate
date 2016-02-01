sap.ui.controller("com.zhenergy.pcbi.view.wokerPropertyAndType", {

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
	    
        document.getElementById('internetDetailWokerPropertyAndType').style.display = "";
        document.getElementById('rlcb_detailWokerPropertyAndType').style.display = "none";
        // this.loadChart();
        this._loadData01();
    	// 设定头部跑马灯信息 common.js
		_loadData03(valueCPIhuanbi,valueGDP,valueCPItongbi,valuePPItongbi,valuePMIproduce,valuePMInonProduce,valueGDPTotal);
	},
	// 获取三级页面数据
	_loadData01 : function () {
	    
	    var zhejiang_dataStr = '[{"name":"杭州","inputPlanValue":"0"},{"name":"金华","inputPlanValue":"0"},{"name":"台州","inputPlanValue":"0"}]';
	    var huaiNan_dataStr = '[{"name":"淮南","inputPlanValue":"0"}]';
	    var zhejiang_JsonData = JSON.parse(zhejiang_dataStr)
		var huaiNan_JsonData = JSON.parse(huaiNan_dataStr);
	    this.loadChart(zhejiang_JsonData, huaiNan_JsonData);
	    // change the page skin
	    changeTheSkinOfPage();
	},
	
	// 员工类型/用工性质 SCREEN_FZBZ_02_V06
	loadBase_SupplyWokerPropertyAndTypeIncome : function (chartDivId, priceChartName,powerPlantName) {
	    
        var busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		} 
        
        // 男性人数
        var maleCount;
        // 女性人数
        var femaleCount;
        
        // 年龄
        // 小于30
        var less30;
        // 31-40
        var between31And40;
        // 41-50
        var between41And50;
        // 51-55
        var between51And55;
        // 大于56
        var more56;
        
        // 工龄≤9
        var workeLess9;
        // 工龄10-19
        var workBetween10And19;
        // 工龄≥20
        var workMore20;

        // 学历比例
        // 高中及以下
        var KPI_GZJYX_V;
        // 中专中技
        var KPI_ZZZJ_V;
        // 大专
        var KPI_DZ_V;
        // 本科
        var KPI_BK_V;
        // 硕士研究生
        var KPI_SS_V;
        // 博士研究生
        var KPI_BS_V;
        
        // 技能比例
        // 高级技术
        var KPI_SLEVEL1_V;
        // 技师
        var KPI_SLEVEL2_V;
        // 高级工
        var KPI_SLEVEL3_V;
        // 中级工
        var KPI_SLEVEL4_V;
        // 初级工
        var KPI_SLEVEL5_V;
            
        var dataStatisticDate = '';
	    var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
		    
			// 各个电厂
			var xData = new Array();
			for (var i in sRes.results) {
			    // 男性人数
				if (sRes.results[i].KPI_TYPE == '男性人数' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    maleCount = sRes.results[i].KPI_VALUE;
				}
				// 女性人数
				if (sRes.results[i].KPI_TYPE == '女性人数' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    femaleCount = sRes.results[i].KPI_VALUE;
				}
				
				
		        // 小于30
				if (sRes.results[i].KPI_TYPE == '≤ 30' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    less30 = sRes.results[i].KPI_VALUE;
				}
                // 31-40
        		if (sRes.results[i].KPI_TYPE == '31-40' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    between31And40 = sRes.results[i].KPI_VALUE;
				}
                // 41-50
                if (sRes.results[i].KPI_TYPE == '41-50' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    between41And50 = sRes.results[i].KPI_VALUE;
				}
                // 51-55
                if (sRes.results[i].KPI_TYPE == '51-55' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    between51And55 = sRes.results[i].KPI_VALUE;
				}
                // 大于56
                if (sRes.results[i].KPI_TYPE == '≥56' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    more56 = sRes.results[i].KPI_VALUE;
				}
				
		        // 工龄≤9
				if (sRes.results[i].KPI_TYPE == '工龄≤9' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    workeLess9 = sRes.results[i].KPI_VALUE;
				}
                // 工龄10-19
        		if (sRes.results[i].KPI_TYPE == '工龄10-19' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    workBetween10And19 = sRes.results[i].KPI_VALUE;
				}
                // 工龄≥20
                if (sRes.results[i].KPI_TYPE == '工龄≥20' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    workMore20 = sRes.results[i].KPI_VALUE;
				}
				
                // 高中及以下
                if (sRes.results[i].KPI_TYPE == '高中及以下' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    KPI_GZJYX_V = sRes.results[i].KPI_VALUE;
				}
                // 中专中技
                if (sRes.results[i].KPI_TYPE == '中专中技' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    KPI_ZZZJ_V = sRes.results[i].KPI_VALUE;
				}
                // 大专
                if (sRes.results[i].KPI_TYPE == '大专' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    KPI_DZ_V = sRes.results[i].KPI_VALUE;
				}
                // 本科
                if (sRes.results[i].KPI_TYPE == '本科' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    KPI_BK_V = sRes.results[i].KPI_VALUE;
				}
                // 硕士研究生
                if (sRes.results[i].KPI_TYPE == '硕士研究生' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    KPI_SS_V = sRes.results[i].KPI_VALUE;
				}
                // 博士研究生
                if (sRes.results[i].KPI_TYPE == '博士研究生' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    KPI_BS_V = sRes.results[i].KPI_VALUE;
				}
				
				// 技能比例
                // 高级技术
                if (sRes.results[i].KPI_TYPE == '高级技术' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    KPI_SLEVEL1_V = sRes.results[i].KPI_VALUE;
				}
                // 技师
                if (sRes.results[i].KPI_TYPE == '技师' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    KPI_SLEVEL2_V = sRes.results[i].KPI_VALUE;
				}
                // 高级工
                if (sRes.results[i].KPI_TYPE == '高级工' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    KPI_SLEVEL3_V = sRes.results[i].KPI_VALUE;
				}
                // 中级工
                if (sRes.results[i].KPI_TYPE == '中级工' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    KPI_SLEVEL4_V = sRes.results[i].KPI_VALUE;
				}
                // 初级工
                if (sRes.results[i].KPI_TYPE == '初级工' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    KPI_SLEVEL5_V = sRes.results[i].KPI_VALUE;
				}
				// 收入统计日期
				if (dataStatisticDate == '') {
				    dataStatisticDate = sRes.results[sRes.results.length-1].KPI_DATE.substring(0,4)+'.'+sRes.results[sRes.results.length-1].KPI_DATE.substring(4,6);//+"."+sRes.results[i].KPI_DATE.substring(6,8);
				}
			}
			// 统计于日期
			$('#wokerPropertyAndTypeIncomeStatisticDate').html(dataStatisticDate);
			// 年龄 ≤ 30 31-40 41-50 51-55 ≥56
			var ageChart = 'ageChart';
			var ageChartData = [
                {value:less30, name:'年龄≤ 30'},
                {value:between31And40, name:'年龄31-40'},
                {value:between41And50, name:'年龄41-50'},
                {value:between51And55, name:'年龄51-55'},
                {value:more56, name:'年龄≥56'}
            ];
			// 性别
			var sexChart = 'sexChart';
			var sexChartData = [
                {value:maleCount, name:'男性人数'},
                {value:femaleCount, name:'女性人数'}
            ];
			// 工龄
			var workAgeChart = 'workAgeChart';
			var workAgeChartData = [
                {value:workeLess9, name:'工龄≤9'},
                {value:workBetween10And19, name:'工龄10-19'},
                {value:workMore20, name:'工龄≥20'}
            ];
            
            // 学历比例
            // 高中及以下(KPI_GZJYX_V)、中专中技（KPI_ZZZJ_V）、大专（KPI_DZ_V）、本科（KPI_BK_V）、硕士研究生(KPI_SS_V)、博士研究生(KPI_BS_V)
            var educationChartData = [
                {value:KPI_GZJYX_V, name:'高中及以下'},
                {value:KPI_ZZZJ_V, name:'中专中技'},
                {value:KPI_DZ_V, name:'大专'},
                {value:KPI_BK_V, name:'本科'},
                {value:KPI_SS_V, name:'硕士研究生'},
                {value:KPI_BS_V, name:'博士研究生'}
            ];
            // 技能比例
            // 高级技术(KPI_SLEVEL1_V)、技师(KPI_SLEVEL2_V)、高级工(KPI_SLEVEL3_V)、中级工(KPI_SLEVEL4_V)、初级工(KPI_SLEVEL5_V)
            var skillChartData = [
                {value:KPI_SLEVEL1_V, name:'高级技术'},
                {value:KPI_SLEVEL2_V, name:'技师'},
                {value:KPI_SLEVEL3_V, name:'高级工'},
                {value:KPI_SLEVEL4_V, name:'中级工'},
                {value:KPI_SLEVEL5_V, name:'初级工'}
            ];
            
			if (priceChartName == '人均利润') {
			    this.wokerPropertyAndTypePie(sexChartData,ageChartData,workAgeChartData,educationChartData,skillChartData);
			}
		    if (busy) {
    			busy.close();
    		} 
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("获取数据失败",{offset:'0 -110'});
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_FZBZ_02_V06/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	// 获取个电厂指标-人均利润 SCREEN_ZCQK_02_V01
	loadEachPlant_SupplyWokerPropertyAndTypeIncome : function (chartDivId, priceChartName, powerPlantName) {

        var busy = new sap.m.BusyDialog({
			close: function(event) {}
		});
		if (busy) {
			busy.open();
		} 
		
        // 人均利润指标
        // 人均利润
        var KPI_JZC_V = new Array();
        
        // 人均利润同比
        var KPI_JZC_UP = new Array();
        
        var dataStatisticDate = '';
	    var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
		    
			// 各个电厂月份指标
			var xData = new Array();
			for (var i in sRes.results) {
			    // 人均利润同比
				if (sRes.results[i].KPI_TYPE == '人均利润_同比'){ 
                    KPI_JZC_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 人均利润
				if (sRes.results[i].KPI_TYPE == '人均利润' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    KPI_JZC_V.push(sRes.results[i].KPI_VALUE);
                    xData.push(sRes.results[i].KPI_DATE);
				}
				// 收入统计日期
				if (dataStatisticDate == '') {
				    dataStatisticDate = sRes.results[sRes.results.length-1].KPI_DATE.substring(0,4)+'.'+sRes.results[sRes.results.length-1].KPI_DATE.substring(4,6);//+"."+sRes.results[i].KPI_DATE.substring(6,8);
				}
			}
			// 统计于日期
			$('#wokerPropertyAndTypeIncomeStatisticDate').html(dataStatisticDate);
			if (priceChartName == '人均利润') {
			    this.loadBaseDataDetail_WokerPropertyAndTypeIncome(chartDivId, priceChartName,xData,KPI_JZC_V,KPI_JZC_UP);
			}
			if (busy) {
    			busy.close();
    		} 
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("获取数据失败",{offset:'0 -110'});
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_03_LRZE/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	// 加载集团-员工类型 用工性质
	wokerPropertyAndTypePie: function(sexChartData,ageChartData,workAgeChartData,educationChartData,skillChartData) {
	    require(
                [
                    'echarts',
                    'echarts/chart/line',
                    'echarts/chart/pie'
                ],
                draw);

            function draw(e) {
                drawswdl(e);
                drawpjswdj(e);
                drawrlcb(e);
                drawxl(e);
                drawjn(e);
            }

            // 性别比例
            function drawswdl(e) {
                var dataName = ['男性人数','女性人数'];
                if (sexChartData != '') {
                    drawpie(e,'sexChart',dataName,sexChartData);
                }
            }
            // 年龄分布
            function drawpjswdj(e) {
                var dataName = ['年龄≤ 30','年龄31-40','年龄41-50','年龄51-55','年龄≥56'];
                if (ageChartData != '') {
                    drawpie(e,'ageChart',dataName,ageChartData);
                }
            }
            // 工作年龄
            function drawrlcb(e) {
                var dataName = ['工龄≤9','工龄10-19','工龄≥20'];
                if (workAgeChartData != '') {
                    drawpie(e,'workAgeChart',dataName,workAgeChartData);
                }
            }
            // 学历比例
            function drawxl(e) {
                var dataName = ['高中及以下','中专中技','大专','本科','硕士研究生','博士研究生'];
                if (educationChartData != '') {
                    drawpie(e,'educationChart',dataName,educationChartData);
                }
            }
            // 技能比例
            function drawjn(e) {
                var dataName = ['高级技术','技师','高级工','中级工','初级工'];
                if (skillChartData != '') {
                    drawpie(e,'skillChart',dataName,skillChartData);
                }
            }

        function drawpie(e,id,dataName,dataContent){
            mychart=e.init(document.getElementById(id));
            var option = {
                tooltip: {
                    show : true,
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                    textStyle : {
                        color : '#ffffff',
                        fontSize : 10
                    }
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:dataName
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:dataContent
                    }
                ]
            };
            mychart.setOption(option);
        }
    },
    
	// 加载集团-员工类型 用工性质
	wokerPropertyAndType: function(chartDivId, priceChartName,xData,KPI_JZC_V,KPI_JZC_UP) {

        	require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
			draw);
			
			function draw(e){
			    var mychart = e.init(document.getElementById(chartDivId));
			    document.getElementById('profitNameWokerPropertyAndType').innerHTML = document.getElementById('powerPlantMainDetailTitleWokerPropertyAndType').innerHTML;
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
                			data:['人均利润']
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
                                name:'人均利润',
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
            //                 {
            //                     name:'人均利润同比',
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
    // 加载集团-人均利润指标
	loadBaseDataDetail_WokerPropertyAndTypeIncome: function(chartDivId, priceChartName,xData,KPI_JZC_V,KPI_JZC_UP) {
        	require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
			draw);
			
			function draw(e){
			    var mychart = e.init(document.getElementById(chartDivId));
			    document.getElementById('profitNameWokerPropertyAndType').innerHTML = document.getElementById('powerPlantMainDetailTitleWokerPropertyAndType').innerHTML;
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
			    drawWokerPropertyAndTypeDistribution(e);
			    
			 //   drawpie01(e);
    // 			drawbar01(e);
    // 			drawbar02(e);
    // 			drawbar03(e);
    // 			drawbar04(e);
		    }
		
		    function drawWokerPropertyAndTypeDistribution(ec) {
		        
		    // event configure    
            var ecConfig = require('echarts/config');
    
	///////////////////////////////////中国地图/////////////////////////////////////			
				// 基于准备好的dom，初始化echarts图表
				myChart3 = ec.init(document.getElementById('chinaMapWokerPropertyAndType')); 
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

                document.getElementById('powerPlantMainDetailTitleWokerPropertyAndType').innerHTML = '集团'
	//////////////////////////////////浙江省地图//////////////////////////////////////////////////////////		
			    // 基于准备好的dom，初始化echarts图表
                myChart4 = ec.init(document.getElementById('powerPlantMapWokerPropertyAndType'));
				var allWokerPropertyAndTypeData = map1Data;			
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
							clickable:false,
							markPoint : {
							    clickable: true,
							    symbol: 'star50',
								symbolSize: 6,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
								effect:{
								  show: false,
								  type: 'scale',
								  scaleSize: 2,
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
								data :allWokerPropertyAndTypeData
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
								    {name: "金华", value: 300},
								    {name: "台州", value: 300},
								    {name: "杭州", value: 300}
								    ]
							}
						}
					]
				}; 
				myChart4.on(ecConfig.EVENT.CLICK, function (param){  
					
                	document.getElementById('internetDetailWokerPropertyAndType').style.display = "";
                    document.getElementById('rlcb_detailWokerPropertyAndType').style.display = "none";
    
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
                myChart5 = ec.init(document.getElementById('huaiNanMapWokerPropertyAndType')); 
				var allWokerPropertyAndTypeData2 = map2Data;
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
								data :allWokerPropertyAndTypeData2
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

                	document.getElementById('internetDetailWokerPropertyAndType').style.display = "";
                    document.getElementById('rlcb_detailWokerPropertyAndType').style.display = "none";
                    
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
            drawpie(e, 3, 4, 'detail_pieWokerPropertyAndType');
        }
		function drawbar01(e) {
			drawbar(e, 4, 6, 'detail_01WokerPropertyAndType');
		}

		function drawbar02(e) {
			drawbar(e, 7, 3, 'detail_02WokerPropertyAndType');
		}

		function drawbar03(e) {
			drawbar(e, 3, 7, 'detail_03WokerPropertyAndType');
		}

		function drawbar04(e) {
			drawbar(e, 8, 2, 'detail_04WokerPropertyAndType');
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
			document.getElementById('profitNameWokerPropertyAndType').innerHTML = powerPlantName;

            var priceChartId = "priceDetailDivWokerPropertyAndType";
            var priceChartName = "人均利润";
            if (powerPlantName == '台二电厂') {
                powerPlantName = '台二发电';
            }
            if (powerPlantName == '兰溪电厂') {
                powerPlantName = '兰溪发电';
            }
            if (powerPlantName == '凤台电厂') {
                powerPlantName = '凤台发电';
            }
        	wokerPropertyAndType.getController().loadBase_SupplyWokerPropertyAndTypeIncome(priceChartId, priceChartName, powerPlantName);
        }
	}
});