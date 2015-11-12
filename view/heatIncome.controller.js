sap.ui.controller("com.zhenergy.pcbi.view.heatIncome", {

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
	    
        document.getElementById('internetDetailHeat').style.display = "none";
        document.getElementById('rlcb_detailHeat').style.display = "";
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
    				if (sRes.results[i].KPI_TYPE == '自产蒸汽收入'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"selfSteamIncomeVal":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '外购蒸汽收入'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"outSteamIncomeVal":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '热水收入'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"heatWaterIncomeVal":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '初装费收入'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"firstFeeIncomeVal":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '供热收入'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"supplyHeatIncomeVal":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '自产蒸汽收入_同比'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"selfSteamIncomeUP":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '外购蒸汽收入_同比'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"outSteamIncomeUP":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '热水收入_同比'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"heatWaterIncomeUP":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '初装费收入_同比'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"firstFeeIncomeUP":';
        			    tempJsonStrData += sRes.results[i].KPI_VALUE;
        			    isFirst = false;
    				}
    				if (sRes.results[i].KPI_TYPE == '供热收入_同比'&&sRes.results[i].KPI_DESC==dc[j]){ 
    				    if (isFirst != true) {
    				        tempJsonStrData += ',';
    				    }
        			    tempJsonStrData += '"supplyHeatIncomeUP":';
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
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_03_V06/?$filter=(BNAME eq '" + usrid + "')", mParameters);
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
		    document.getElementById('caloriHeatPlantNameHeat').innerHTML = document.getElementById('powerPlantMainDetailTitleHeat').innerHTML;
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
	
	// 获取集团指标-供热收入 SCREEN_JYYJ_04_VGRSRJT
	loadBase_SupplyHeatIncome : function (chartDivId, priceChartName) {

        // 供热收入指标
        // 自产蒸汽收入
        var KPI_ZZS_V = new Array();
        // 外购蒸汽收入
        var KPI_WZS_V = new Array();
        // 热水收入
        var KPI_RSS_V = new Array();
        // 初装费收入
        var KPI_CZS_V = new Array();
        
        // 自产蒸汽收入同比
        var KPI_ZZS_UP = new Array();
        // 外购蒸汽收入同比
        var KPI_WZS_UP = new Array();
        // 热水收入同比
        var KPI_RSS_UP = new Array();
        // 初装费收入同比
        var KPI_CZS_UP = new Array();
        
        var dataStatisticDate = '';
	    var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
		    
			// 各个电厂
			var xData = new Array();
			for (var i in sRes.results) {
			    // 自产蒸汽收入同比
				if (sRes.results[i].KPI_TYPE == '自产蒸汽收入_同比'){ 
                    KPI_ZZS_UP.push(sRes.results[i].KPI_VALUE);
                    xData.push(sRes.results[i].KPI_DESC);
				}
				// 自产蒸汽收入
				if (sRes.results[i].KPI_TYPE == '自产蒸汽收入'){ 
                    KPI_ZZS_V.push(sRes.results[i].KPI_VALUE);
				}
				
				// 外购蒸汽收入同比
				if (sRes.results[i].KPI_TYPE == '外购蒸汽收入_同比'){ 
                    KPI_WZS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 外购蒸汽收入
				if (sRes.results[i].KPI_TYPE == '外购蒸汽收入'){ 
                    KPI_WZS_V.push(sRes.results[i].KPI_VALUE);
				}
				
				// 热水收入同比
				if (sRes.results[i].KPI_TYPE == '热水收入_同比'){ 
                    KPI_RSS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 热水收入
				if (sRes.results[i].KPI_TYPE == '热水收入'){ 
                    KPI_RSS_V.push(sRes.results[i].KPI_VALUE);
				}
				
				// 初装费收入同比
				if (sRes.results[i].KPI_TYPE == '初装费收入_同比'){ 
                    KPI_CZS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 初装费收入
				if (sRes.results[i].KPI_TYPE == '初装费收入'){ 
                    KPI_CZS_V.push(sRes.results[i].KPI_VALUE);
				}
				
				// 收入统计日期
				if (dataStatisticDate == '') {
				    dataStatisticDate = sRes.results[i].KPI_DATE.substring(0,4)+'.'+sRes.results[i].KPI_DATE.substring(4,6);//+"."+sRes.results[i].KPI_DATE.substring(6,8);
				}
			}
			// 统计于日期
			$('#heatIncomeStatisticDate').html(dataStatisticDate);
			if (priceChartName == '供热收入') {
			    this.loadBaseDataDetail_SupplyHeatIncome(chartDivId, priceChartName,xData,KPI_ZZS_V,KPI_WZS_V,KPI_RSS_V,KPI_CZS_V,KPI_ZZS_UP,KPI_WZS_UP,KPI_RSS_UP,KPI_CZS_UP);
			} else {
			    if (priceChartName == '自产蒸汽') {
			        this.loadBaseDataDetail_OtherHeatIncome(chartDivId, priceChartName,xData,KPI_ZZS_V);
			    } else if (priceChartName == '外购蒸汽') {
			        this.loadBaseDataDetail_OtherHeatIncome(chartDivId, priceChartName,xData,KPI_WZS_V);
			    } else if (priceChartName == '热水') {
			        this.loadBaseDataDetail_OtherHeatIncome(chartDivId, priceChartName,xData,KPI_RSS_V);
			    } else if (priceChartName == '初装费') {
			        this.loadBaseDataDetail_OtherHeatIncome(chartDivId, priceChartName,xData,KPI_CZS_V);
			    }
			}
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("获取数据失败",{offset:'0 -110'});
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_04_VGRSRJT/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	// 获取个电厂指标-供热收入 SCREEN_JYYJ_04_VGRSRDC
	loadEachPlant_SupplyHeatIncome : function (chartDivId, priceChartName, powerPlantName) {

        // 供热收入指标
        // 自产蒸汽收入
        var KPI_ZZS_V = new Array();
        // 外购蒸汽收入
        var KPI_WZS_V = new Array();
        // 热水收入
        var KPI_RSS_V = new Array();
        // 初装费收入
        var KPI_CZS_V = new Array();
        
        // 自产蒸汽收入同比
        var KPI_ZZS_UP = new Array();
        // 外购蒸汽收入同比
        var KPI_WZS_UP = new Array();
        // 热水收入同比
        var KPI_RSS_UP = new Array();
        // 初装费收入同比
        var KPI_CZS_UP = new Array();
        
        var dataStatisticDate = '';
	    var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
		    
			// 各个电厂
			var xData = new Array();
			for (var i in sRes.results) {
			    // 自产蒸汽收入同比
				if (sRes.results[i].KPI_TYPE == '自产蒸汽收入_同比'){ 
                    KPI_ZZS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 自产蒸汽收入
				if (sRes.results[i].KPI_TYPE == '自产蒸汽收入'  && sRes.results[i].KPI_DESC == powerPlantName){ 
                    KPI_ZZS_V.push(sRes.results[i].KPI_VALUE);
                    xData.push(sRes.results[i].KPI_DATE);
				}
				
				// 外购蒸汽收入同比
				if (sRes.results[i].KPI_TYPE == '外购蒸汽收入_同比'){ 
                    KPI_WZS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 外购蒸汽收入
				if (sRes.results[i].KPI_TYPE == '外购蒸汽收入' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    KPI_WZS_V.push(sRes.results[i].KPI_VALUE);
				}
				
				// 热水收入同比
				if (sRes.results[i].KPI_TYPE == '热水收入_同比'){ 
                    KPI_RSS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 热水收入
				if (sRes.results[i].KPI_TYPE == '热水收入' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    KPI_RSS_V.push(sRes.results[i].KPI_VALUE);
				}
				
				// 初装费收入同比
				if (sRes.results[i].KPI_TYPE == '初装费收入_同比'){ 
                    KPI_CZS_UP.push(sRes.results[i].KPI_VALUE);
				}
				// 初装费收入
				if (sRes.results[i].KPI_TYPE == '初装费收入' && sRes.results[i].KPI_DESC == powerPlantName){ 
                    KPI_CZS_V.push(sRes.results[i].KPI_VALUE);
				}
				
				// 收入统计日期
				if (dataStatisticDate == '') {
				    dataStatisticDate = sRes.results[i].KPI_DATE.substring(0,4)+'.'+sRes.results[i].KPI_DATE.substring(4,6);//+"."+sRes.results[i].KPI_DATE.substring(6,8);
				}
			}
			// 统计于日期
			$('#heatIncomeStatisticDate').html(dataStatisticDate);
			if (priceChartName == '供热收入') {
			    this.loadBaseDataDetail_SupplyHeatIncome(chartDivId, priceChartName,xData,KPI_ZZS_V,KPI_WZS_V,KPI_RSS_V,KPI_CZS_V,KPI_ZZS_UP,KPI_WZS_UP,KPI_RSS_UP,KPI_CZS_UP);
			} else {
			    if (priceChartName == '自产蒸汽') {
			        this.loadBaseDataDetail_OtherHeatIncome(chartDivId, priceChartName,xData,KPI_ZZS_V);
			    } else if (priceChartName == '外购蒸汽') {
			        this.loadBaseDataDetail_OtherHeatIncome(chartDivId, priceChartName,xData,KPI_WZS_V);
			    } else if (priceChartName == '热水') {
			        this.loadBaseDataDetail_OtherHeatIncome(chartDivId, priceChartName,xData,KPI_RSS_V);
			    } else if (priceChartName == '初装费') {
			        this.loadBaseDataDetail_OtherHeatIncome(chartDivId, priceChartName,xData,KPI_CZS_V);
			    }
			}
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			sap.m.MessageToast.show("获取数据失败",{offset:'0 -110'});
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_04_VGRSRDC/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	// 加载集团-供热收入
	loadBaseDataDetail_SupplyHeatIncome: function(chartDivId, priceChartName,xData,KPI_ZZS_V,KPI_WZS_V,KPI_RSS_V,KPI_CZS_V,KPI_ZZS_UP,KPI_WZS_UP,KPI_RSS_UP,KPI_CZS_UP) {
        	require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
			draw);
			
			function draw(e){
			    var mychart = e.init(document.getElementById(chartDivId));
			    document.getElementById('profitNameHeat').innerHTML = document.getElementById('powerPlantMainDetailTitleHeat').innerHTML;
    			var color1 = '#2DE630';
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
                          	x:'120',
                          	y:'35',
                          	textStyle:{
        						color:'white',
        						fontFamily:'微软雅黑'
        					},
                			data:['自产蒸汽收入','外购蒸汽收入','热水收入','初装费收入']
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
        				// color: [color1, color2],
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
        						name: '单位:百万元',
        						type: 'value',
        						axisLine: {
        							show: true
        						},
        						axisLabel: {
        							textStyle: {
        								color: color1
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
            //                 {
            //                     name:'辅助服务收入',
            //                     type:'bar',
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
            //                     data:KPI_FZS_V
            //                 },
                            {
                                name:'自产蒸汽收入',
                                type:'bar',
                                stack:'供热收入',
                                data:KPI_ZZS_V
                            },
                            {
                                name:'外购蒸汽收入',
                                type:'bar',
                                stack:'供热收入',
                                data:KPI_WZS_V
                            },
                            {
                                name:'热水收入',
                                type:'bar',
                                stack:'供热收入',
                                data:KPI_RSS_V
                            },
                            {
                                name:'初装费收入',
                                type:'bar',
                                stack:'供热收入',
                                data:KPI_CZS_V
                            }
                        ]
        			};
			    
			    mychart.setOption(option);
			}
    },
    // 加载集团-其他供热收入指标
	loadBaseDataDetail_OtherHeatIncome: function(chartDivId, priceChartName,xData,heatData) {
        	require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
			draw);
			
			function draw(e){
			    var mychart = e.init(document.getElementById(chartDivId));
			    document.getElementById('profitNameHeat').innerHTML = document.getElementById('powerPlantMainDetailTitleHeat').innerHTML;
    			var color1 = '#2DE630';
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
        				// color: [color1, color2],
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
        						name: '单位:百万元',
        						type: 'value',
        						axisLine: {
        							show: true
        						},
        						axisLabel: {
        							textStyle: {
        								color: color1
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
                                data:heatData
                            }
                        ]
        			};
			    
			    mychart.setOption(option);
			}
    },
    

// 	// 获取厂用电量
// 	loadFactoryUseData : function (chartDivId, priceChartName) {

// 	    var powerPlantName = document.getElementById('powerPlantMainDetailTitleHeat').innerHTML;
// 	    if (powerPlantName == '台二电厂') {
// 	        powerPlantName = '台二发电';
// 	    }
// 	    if (powerPlantName == '兰溪电厂') {
// 	        powerPlantName = '兰溪发电';
// 	    }
// 	    if (powerPlantName == '凤台电厂') {
// 	        powerPlantName = '凤台发电';
// 	    }
// 	    var mParameters = {};
// 		mParameters['async'] = true;
// 		mParameters['success'] = jQuery.proxy(function(sRes) {
		    
// 			//设置数据
// 		    var machineGroupDataHeat = new Array();
// 		    var dataStatisticDate = '';
// 			for (var i in sRes.results) {
// 			    var plantName = sRes.results[i].KPI_DESC.toString().substring(0, 4);
// 				if ((sRes.results[i].KPI_TYPE == '机组上网电量'&& plantName == powerPlantName) || (sRes.results[i].KPI_TYPE == '上网电量')){ 
//                     machineGroupDataHeat.push(new Number(sRes.results[i].KPI_VALUE).toFixed(2));
// 				}
// 				if (dataStatisticDate == '') {
// 				    dataStatisticDate = sRes.results[i].KPI_DATE.substring(0,4)+'.'+sRes.results[i].KPI_DATE.substring(4,6)+"."+sRes.results[i].KPI_DATE.substring(6,8);
// 				}
// 			}
// 			// 统计于日期
// 			$('#internetVolumeStatisticDate').html(dataStatisticDate);
//     		this.loadPriceChartdetail(chartDivId, priceChartName, machineGroupDataHeat);
// 		}, this);
// 		mParameters['error'] = jQuery.proxy(function(eRes) {
// 			sap.m.MessageToast.show("获取数据失败",{offset:'0 -110'});
// 		}, this);
// 	    sap.ui.getCore().getModel().read("ZJEY_CL_JYYJ_04_VFDL/?$filter=(BNAME eq '" + usrid + "')", mParameters);
// 	},
// 	// 电价详细Chart
// 	loadPriceChartdetail: function(chartDivId, priceChartName, machineGroupData) {
//         	require(
//             [
//                 'echarts',
//                 'echarts/chart/line',
//                 'echarts/chart/bar'
//             ],
// 			draw);
			
// 			function draw(e){
// 			    var mychart = e.init(document.getElementById(chartDivId));
// 			    document.getElementById('profitNameHeat').innerHTML = document.getElementById('powerPlantMainDetailTitleHeat').innerHTML;
// 			    var fuelXaxisName = '';
// 			    if (document.getElementById('powerPlantMainDetailTitleHeat').innerHTML == '集团') {
// 			        fuelXaxisName = ['兰溪发电', '台二发电', '凤台发电', '集团'];
// 			    } else {
// 			        fuelXaxisName = ['机组1', '机组2', '机组3', '机组4'];
// 			    }

// 			var datax1 = machineGroupData;
// 			var datax2 = ['0.50','0.18','0.37','0.18'];
// 			var color1 = '#2DE630';
// 			var color2 = '#E52DE6';
// 			option = {
//       				legend: {
//                       	orient:'horizontal',
//                       	x:'400',
//                       	y:'20',
//                       	textStyle:{
//     						color:'white',
//     						fontFamily:'微软雅黑'
//     					},
//             			data:['当年','去年']
//       			 	},
//     			    tooltip:{
//     			       trigger:'axis' ,
//     			       backgroundColor:'rgb(234,234,234)',
//     			       textStyle:{
//     			           color:'rgb(0,0,0)',
//     			           baseline:'top'
//     			       },
//     			       axisPointer:{
//     			           type: 'none'
//     			       }
//     			    },
//     				color: [color1, color2],
//     				grid: {
//                         y1:100,
//                         y2:100
//     				},
//     				xAxis: [
//     					{
    
//     						//show: false,
//     						type: 'category',
//     						axisLabel: {
//     							textStyle: {
//     								color: 'white'
//     							},
//     							formatter: '{value}'
//     						},
//     						data: fuelXaxisName
//                         }
//                     ],
//     				yAxis: [
//     					{
//     						name: '单位:百万元',
//     						type: 'value',
//     						axisLine: {
//     							show: true
//     						},
//     						axisLabel: {
//     							textStyle: {
//     								color: color1
//     							},
//     							formatter: '{value}'
//     						},
//     						// 		splitLine: {
//     						// 			show: false
//     						// 		},
//     						splitLine: {
//     							// 			show: false
//     							lineStyle: {
//     								color: 'rgba(64,64,64,0.5)'
//     							}
//     						},
//     				// 		max: y1,
//     				// 		min: y2,
//     				// 		splitNumber: n
//                         },
//     					{
//     						name: '同比增长:%',
//     						type: 'value',
//     						axisLine: {
//     							show: true
//     						},
//     						axisLabel: {
//     							textStyle: {
//     								color: color2
//     							},
//     							formatter: '{value}'
//     						},
//     						splitLine: {
//     							// 			show: false
//     							lineStyle: {
//     								color: 'rgba(64,64,64,0.5)'
//     							}
//     						},
//     				// 		max: y3,
//     				// 		min: y4,
//     				// 		splitNumber: n
//                         }
//                     ],
//     				series: [
//     					{
//     						name: '当年',
//     						type: 'bar',
//     						smooth: true,
//     						symbol:'emptyCircle',
//     						symbolSize:5,
//     						itemStyle: {
//     						    normal: {
//     						      //  color: 'green',
//     						        label : {
//     						            show :true,
//     						            position : 'top',
//     						            textStyle:{
//     						                color : 'white'
//     						            }
//     						        }
//     						      //  areaStyle: {type: 'default'}
//     						    }
//     						},
//     						data: datax1
//                         },
//     					{
//     						name: '去年',
//     						type: 'line',
//     						smooth: true,
//     						yAxisIndex: 1,
//     						symbol:'emptyCircle',
//     						symbolSize:5,
//     						itemStyle: {
//     						    normal: {
//     						      //  color: 'green',
//     						        label : {
//     						            show :true,
//     						            position : 'top',
//     						            textStyle:{
//     						                color : 'white'
//     						            }
//     						        }
//     						      //  areaStyle: {type: 'default'}
//     						    }
//     						},
//     						data: datax2
    
//                         }
//                     ]
//     			};
			    
// 			    mychart.setOption(option);
// 			}
//     },
    
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
			    drawHeatDistribution(e);
			    
			    drawpie01(e);
    			drawbar01(e);
    			drawbar02(e);
    			drawbar03(e);
    // 			drawbar04(e);
		    }
		
		    function drawHeatDistribution(ec) {
		        
		    // event configure    
            var ecConfig = require('echarts/config');
    
	///////////////////////////////////中国地图/////////////////////////////////////			
				// 基于准备好的dom，初始化echarts图表
				myChart3 = ec.init(document.getElementById('chinaMapHeat')); 
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

                document.getElementById('powerPlantMainDetailTitleHeat').innerHTML = '集团'
	//////////////////////////////////浙江省地图//////////////////////////////////////////////////////////		
			    // 基于准备好的dom，初始化echarts图表
                myChart4 = ec.init(document.getElementById('powerPlantMapHeat'));
				var allHeatData = map1Data;			
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
								data :allHeatData
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
					
                	document.getElementById('internetDetailHeat').style.display = "none";
                    document.getElementById('rlcb_detailHeat').style.display = "";
    
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
                myChart5 = ec.init(document.getElementById('huaiNanMapHeat')); 
				var allHeatData2 = map2Data;
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
								data :allHeatData2
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

                	document.getElementById('internetDetailHeat').style.display = "none";
                    document.getElementById('rlcb_detailHeat').style.display = "";
                    
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
            drawpie(e, 3, 4, 'detail_pieHeat');
        }
		function drawbar01(e) {
			drawbar(e, 4, 6, 'detail_01Heat');
		}

		function drawbar02(e) {
			drawbar(e, 7, 3, 'detail_02Heat');
		}

		function drawbar03(e) {
			drawbar(e, 3, 7, 'detail_03Heat');
		}

		function drawbar04(e) {
			drawbar(e, 8, 2, 'detail_04Heat');
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
			document.getElementById('powerPlantMainDetailTitleHeat').innerHTML = powerPlantName;

		    // 自产蒸汽
		    var selfSteamIncomeVal = mapSeries.markPoint.data[dataIndex].selfSteamIncomeVal;
		    if (selfSteamIncomeVal != undefined) {
		        document.getElementById('travelPriceHeat').innerHTML =  selfSteamIncomeVal;
		    } else {
		        document.getElementById('travelPriceHeat').innerHTML = 0;
		        selfSteamIncomeVal = 0;
		    }
		    // 外购蒸汽
		    var outSteamIncomeVal = mapSeries.markPoint.data[dataIndex].outSteamIncomeVal;
		    if (outSteamIncomeVal != undefined) {
		        document.getElementById('coalPriceHeat').innerHTML = outSteamIncomeVal;
		    } else {
		        document.getElementById('coalPriceHeat').innerHTML = 0;
		        outSteamIncomeVal = 0;
		    }
		    // 热水
		    var heatWaterIncomeVal = mapSeries.markPoint.data[dataIndex].heatWaterIncomeVal;
		    if (heatWaterIncomeVal != undefined) {
		        document.getElementById('watt1Heat').innerHTML =  heatWaterIncomeVal;
		    } else {
		        document.getElementById('watt1Heat').innerHTML = 0;
		        heatWaterIncomeVal = 0;
		    }
		    // 初装费
		    var firstFeeIncomeVal = mapSeries.markPoint.data[dataIndex].firstFeeIncomeVal;
		    if (firstFeeIncomeVal != undefined) {
		        document.getElementById('factoryUsePV').innerHTML = firstFeeIncomeVal;
		    } else {
		        document.getElementById('factoryUsePV').innerHTML = 0;
		        firstFeeIncomeVal = 0;
		    }
		    // 供热收入
		    var supplyHeatIncomeVal = mapSeries.markPoint.data[dataIndex].supplyHeatIncomeVal;
		    if (supplyHeatIncomeVal != undefined) {
		        document.getElementById('fuelCostHeat').innerHTML = supplyHeatIncomeVal;
		    } else {
		        document.getElementById('fuelCostHeat').innerHTML = 0;
		        supplyHeatIncomeVal = 0;
		    }
		    
		    var dataAll = selfSteamIncomeVal + outSteamIncomeVal + heatWaterIncomeVal + firstFeeIncomeVal;
		    if (dataAll == 0) {
		        dataAll = 10;
		    }
		    drawpie(ec, 1, 0, 'detail_pieHeat');
		    drawbar(ec, selfSteamIncomeVal, dataAll, 'detail_01Heat');
		    drawbar(ec, outSteamIncomeVal, dataAll, 'detail_02Heat');
		    drawbar(ec, heatWaterIncomeVal, dataAll, 'detail_03Heat');
		    drawbar(ec, firstFeeIncomeVal, dataAll, 'detail_04Heat');
        }
	}
});