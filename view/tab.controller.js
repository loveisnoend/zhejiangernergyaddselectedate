sap.ui.controller("com.zhenergy.pcbi.view.tab", {
	onInit: function() {
	    this.getView().addEventDelegate({
			onBeforeShow: jQuery.proxy(function(evt) {
				this.onBeforeShow(evt);
			}, this)
		});
		this.getView().addEventDelegate({
			onAfterShow: jQuery.proxy(function(evt) {
				this.onAfterShow(evt);
			}, this)
		});
	},
    onBeforeShow: function(evt) {
	    data_x3 = new Array("1.2", "1.1", "1.4", "1.15", "1.2", "1.15", "1.2");
 		data_x4 = new Array("0.015", "0.01", "0.04", "0.02", "0.025", "0.015", "0.025");
		var mychart001;
		var mychart002;
		var mychart003;
		var mychart004;
		var myChart3;
		var myChart4;
		var myChart5;
		var myChart6;
		var myChart7;
		var daytime;
	    var year;
	    var month;
	    var day;
		
		//html参数
		tab_place = "杭州";
		tab_powerplant = "凤台发电";
		tab_usetime = "发电量";
	},
	onAfterShow: function(evt) {
	    this.loadData_v01();
	   // this.loadData_v02();
	},
	loadData_v01 : function(){
	    data01 = new Array();
	    data02 = new Array();
	    data03 = new Array();
	    data04= new Array();
	    place_v01 = tab_place;
	     daytime = new Date();
	     year = daytime.getFullYear();
	     month = daytime.getMonth();
	    var month_true;
	    if( month > 8){
	        month_true = month + 1;
	    }else{
	        month = month + 1;
	        month_true = "0"+month;
	    }
	     day = daytime.getDate();
	    if(day < 10){
	        day = "0" + day;
	    }
	    final_daytime =year+month_true+day;
	    var day01 = day -6;
	    if(day01 < 10){
	        day01 = "0" + day01;
	    }
	    final_daytime01 = year+month_true+day01;
	    var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
			//设置数据
			for (var i in sRes.results) {
			 //   console.log(final_daytime);
			 //   console.log(final_daytime01);
				if (sRes.results[i].KPI_DESC == place_v01&& sRes.results[i].KPI_TYPE == '地市-最高温度'&& final_daytime >= sRes.results[i].KPI_DATE && sRes.results[i].KPI_DATE >=final_daytime01){  //温度
				    data01.push(sRes.results[i].KPI_VALUE); 
				    var date_yuan = sRes.results[i].KPI_DATE;
				   data04.push(date_yuan.substring(4,6)+"-"+date_yuan.substring(6,8));
				}else if (sRes.results[i].KPI_DESC == place_v01&& sRes.results[i].KPI_TYPE == '地市-气象'&& final_daytime >= sRes.results[i].KPI_DATE && sRes.results[i].KPI_DATE >=final_daytime01 ){
				    data02.push(sRes.results[i].KPI_VALUE);
				}else if (sRes.results[i].KPI_DESC == place_v01&& sRes.results[i].KPI_TYPE == '地市-社会用电量'&& final_daytime >= sRes.results[i].KPI_DATE && sRes.results[i].KPI_DATE >=final_daytime01 ){
				    data03.push(sRes.results[i].KPI_VALUE);
				}
			};

			this.loadChart();
			this.loadData_weather();
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("Get Data Error");
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_02_V01", mParameters);
	},
	loadData_weather : function(){
            var d = new Date();
    	    var weekday=new Array(7);
            weekday[0]="周日";
            weekday[1]="周一";
            weekday[2]="周二";
            weekday[3]="周三";
            weekday[4]="周四";
            weekday[5]="周五";
            weekday[6]="周六";
            $('#tab_weekday').html(weekday[d.getDay()%7]);
            $('#tab_daytime').html(year + "年" + month + "月" + day + "日");
        
            
            $('#temperature0_date').html(data04[0]);
            $('#temperature1_date').html(data04[1]);
            $('#temperature2_date').html(data04[2]);
            $('#temperature3_date').html(data04[3]);
            $('#temperature4_date').html(data04[4]);
            $('#temperature5_date').html(data04[5]);
            $('#temperature6_date').html(data04[6]);
            $('#temperature0').html(data01[0]);
            $('#temperature1').html(data01[1]);
            $('#temperature2').html(data01[2]);
            $('#temperature3').html(data01[3]);
            $('#temperature4').html(data01[4]);
            $('#temperature5').html(data01[5]);
            $('#temperature6').html(data01[6]);
            for(var i=0;i < 7;i ++){
            switch(data02[i] !== null){
                
    	        case data02[i] == "W001":
    	             var id = "weatherimg" + i;
    	             $("#"+id).css('background-image','url("img/0001-weather-05.png")');
    	             break;
    	        case data02[i] == "W002":
    	             var id = "weatherimg" + i;
    	             $("#"+id).css("background-image",'url("img/0001-weather-04.png")');
    	             break;
    	        case data02[i] == "W003":
    	             var id = "weatherimg" + i;
    	             $("#"+id).css("background-image",'url("img/0001-weather-01.png")');
    	             break;
    	        case data02[i] == "W004":
    	             var id = "weatherimg" + i;
    	             $("#"+id).css("background-image",'url("img/0001-weather-02.png")');
    	             break;
    	        case data02[i] == "W005":
    	             var id = "weatherimg" + i;
    	             $("#"+id).css("background-image",'url("img/0001-weather-03.png")');
    	             break;
    	        case data02[i] == "W006":
    	            var id = "weatherimg" + i;  
    	             $("#"+id).css("background-image",'url("img/0001-weather-07.png")');
    	             break;
    	        case data02[i] == "W007":
    	                var id = "weatherimg" + i;  
    	             $("#"+id).css("background-image",'url("img/0001-weather-08.png")');
    	             break;
    	        case data02[i] == "W008":
    	            var id = "weatherimg" + i;  
    	             $("#"+id).css("background-image",'url("img/0001-weather-10.png")');
    	             break;
    	        case data02[i] == "W009":
    	             var id = "weatherimg" + i;  
    	             $("#"+id).css("background-image",'url("img/0001-weather-06.png")');
    	             break;
    	        case data02[i] == "W010":
    	             var id = "weatherimg" + i;  
    	             $("#"+id).css("background-image",'url("img/0001-weather-09.png")');
    	             break;
	    }
            }
    },
	
	loadChart01 : function(){
	    data_x3 = new Array("1.5", "1.6", "1.7", "1.35", "0.6", "1.0", "1.2");
 		data_x4 = new Array("0.015", "0.01", "0.04", "0.02", "0.025", "0.015", "0.025");
 		this.loadChart();
	},
	
	loadChart02 : function(){
	    data_x3 = new Array("1.2", "1.1", "1.4", "1.15", "1.2", "1.15", "1.2");
 		data_x4 = new Array("0.015", "0.01", "0.04", "0.02", "0.025", "0.015", "0.025");
 		this.loadChart();
	},

	loadChart: function() {
		var data_x1 = new Array("27", "30", "37", "30", "31", "29", "34");
		var data_x2 = data_x1;
  	    //data_x3 = new Array("1.2", "1.1", "1.4", "1.15", "1.2", "1.15", "1.2");
 		//data_x4 = new Array("0.015", "0.01", "0.04", "0.02", "0.025", "0.015", "0.025");
		require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar',
            ],
			draw);
		function draw(e) {
			drawline01(e);
			drawline02(e);
			drawbar01(e);
			drawbar02(e);
			drawbar03(e);
			drawbar04(e);
			drawbar05(e);
			drawbar06(e);
			drawbar07(e);
		}

		function drawline01(e) {
			drawline(e, 'line01', data_x1, data_x2, 40, 25, 40, 25, 3, 'white', 'white');
		}

		function drawline02(e) {
			drawline(e, 'line02', data_x3, data_x4, 1.40, 1.00, 0.05, 0.01, 4, '#FFB300', 'rgb(51,255,50)');
		}

		function drawline(e, id, datax1, datax2, y1, y2, y3, y4, n, color1, color2) {
			mychart = e.init(document.getElementById(id));
			var option="";
			if(id == "line02"){
			    option = {
  		// 		legend: {
    //               	orient:'vertical',
    //               	zlevel : 2,
    //               	x:'720',
    //               	y:'20',
    //               	textStyle:{
				// 		color:'white',
				// 		fontFamily:'微软雅黑'
				// 	},
    //     			data:['社会用电量','发电量']
   	// 		 	},
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
					x: 50,
					y: 20,
					x2: 50,
					y2: 20,
					borderWidth: 0
				},
				xAxis: [
					{
						show: false,
						type: 'category',
						data: ['2015年8月11日', '2015年8月12日', '2015年8月13日', '2015年8月14日', '2015年8月15日', '2015年8月16日', '2015年8月17日']
                    }
                ],
				yAxis: [
					{
						name: '社会用电量',
						type: 'value',
						axisLine: {
							show: false
						},
						axisLabel: {
							textStyle: {
								color: 'rgb(255,179,0)'
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
						max: y1,
						min: y2,
						splitNumber: n
                    },
					{
						name: '发电量',
						type: 'value',
						axisLine: {
							show: false
						},
						axisLabel: {
							textStyle: {
								color: 'rgb(51,255,50)'
							},
							formatter: '{value}'
						},
						splitLine: {
							// 			show: false
							lineStyle: {
								color: 'rgba(64,64,64,0.5)',
							}
						},
						max: y3,
						min: y4,
						splitNumber: n,
                    }
                ],
				series: [
					{
						name: '社会用电量',
						type: 'line',
						smooth: true,
						symbol:'emptyCircle',
						symbolSize:5,
						// itemStyle: {normal: {areaStyle: {type: 'default'}}},
						data: datax1
                    },
					{
						name: '发电量',
						type: 'line',
						smooth: true,
						yAxisIndex: 1,
						symbol:'emptyCircle',
						symbolSize:5,
						//itemStyle: {normal: {areaStyle: {type: 'default'}}},
						data: datax2

                    }
                ]
			};
			}else{
			   option = {
			 //   legend: {
    //               	orient:'vertical',
    //               	zlevel : 2,
    //               	x:'720',
    //               	y:'20',
    //               	textStyle:{
				// 		color:'white',
				// 		fontFamily:'微软雅黑'
				// 	},
    //     			data:['气温']
   	// 		 	},
			    tooltip:{
			       trigger:'axis' ,
			       backgroundColor:'rgb(234,234,234)',
			       textStyle:{
			           color:'rgb(0,0,0)'
			       },
			       
			       axisPointer:{
			           type: 'none'
			       }
			    },
				color: [color1, color2],
				grid: {
					x: 50,
					y: 20,
					x2: 50,
					y2: 20,
					borderWidth: 0
				},
				xAxis: [
					{

						show: false,
						type: 'category',
						data: ['2015年8月11日', '2015年8月12日', '2015年8月13日', '2015年8月14日', '2015年8月15日', '2015年8月16日', '2015年8月17日']
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
								color: 'rgba(64,64,64,0.5)',
							}
						},
						max: y1,
						min: y2,
						splitNumber: n,
                    }
                    
                ],
				series: [
					{
						name: '气温',
						type: 'line',
						smooth: true,
						symbol:'emptyCircle',
						symbolSize:5,
						// itemStyle: {normal: {areaStyle: {type: 'default'}}},
						data: datax1
                    }
                ]
			}; 
			}
// 			var option = {
// 				color: [color1, color2],
// 				grid: {
// 					x: 50,
// 					y: 20,
// 					x2: 50,
// 					y2: 20,
// 					borderWidth: 0
// 				},
// 				xAxis: [
// 					{

// 						show: false,
// 						type: 'category',
// 						data: ['q', 'q', 'q', 'q', 'q', 'q', 'q']
//                     }
//                 ],
// 				yAxis: [
// 					{
// 						name: '',
// 						type: 'value',
// 						axisLine: {
// 							show: false
// 						},
// 						axisLabel: {
// 							textStyle: {
// 								color: 'white'
// 							},
// 							formatter: '{value}'
// 						},
// 						// 		splitLine: {
// 						// 			show: false
// 						// 		},
// 						splitLine: {
// 							// 			show: false
// 							lineStyle: {
// 								color: 'rgba(64,64,64,0.5)',
// 							}
// 						},
// 						max: y1,
// 						min: y2,
// 						splitNumber: n,
//                     },
// 					{
// 						name: '',
// 						type: 'value',
// 						axisLine: {
// 							show: false
// 						},
// 						axisLabel: {
// 							textStyle: {
// 								color: 'rgb(51,255,50)'
// 							},
// 							formatter: '{value}'
// 						},
// 						splitLine: {
// 							// 			show: false
// 							lineStyle: {
// 								color: 'rgba(64,64,64,0.5)',
// 							}
// 						},
// 						max: y3,
// 						min: y4,
// 						splitNumber: n,
//                     }
//                 ],
// 				series: [
// 					{
// 						name: '',
// 						type: 'line',
// 						smooth: true,
// 						symbol:'emptyCircle',
// 						symbolSize:5,
// 						// itemStyle: {normal: {areaStyle: {type: 'default'}}},
// 						data: datax1
//                     },
// 					{
// 						name: '',
// 						type: 'line',
// 						smooth: true,
// 						yAxisIndex: 1,
// 						symbol:'emptyCircle',
// 						symbolSize:5,
// 						//itemStyle: {normal: {areaStyle: {type: 'default'}}},
// 						data: datax2

//                     }
//                 ]
// 			};
			mychart.setOption(option);
		}

		function drawbar01(e) {
			drawbar(e, 4, 6, 'bar01');
		}

		function drawbar02(e) {
			drawbar(e, 7, 3, 'bar02');
		}

		function drawbar03(e) {
			drawbar(e, 3, 7, 'bar03');
		}

		function drawbar04(e) {
			drawbar(e, 8, 2, 'bar04');
		}

		function drawbar05(e) {
			drawbar(e, 8, 2, 'bar05');
		}

		function drawbar06(e) {
			drawbar(e, 5, 5, 'bar06');
		}

		function drawbar07(e) {
			drawbar(e, 8, 2, 'bar07');
		}

		function drawbar(e, data1, data2, id) {
			mychart = e.init(document.getElementById(id));
			var option = {
			    clickable : false,
			    tooltip:{
			      show : false  
			    },
				grid: {
					x: 0,
					y: 0,
					x2: 0,
					y2: 0,
					borderWidth: 0

				},
				color: ['#33FF32', '#FFB300'],

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
    						data: [data1],
    				// 		data: [data1],
    				        legendHoverLink : false,
    						markPoint : {
    						    symbol : 'droplet',
    						    symbolSize : 20,
    						    itemStyle:{
    						      normal:{
    						          color:'#FF5B00'                                                
    						      }
    						    },
    						    effect : {
    						        show : false
    						    },
                                data : [
                                    {type : 'max', name: '最大值'}
                                ]
                            },
                            markline : {
                                clickable : false
                            }
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
	}
});