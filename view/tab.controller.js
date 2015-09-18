sap.ui.controller("com.zhenergy.pcbi.view.tab", {
	onInit: function() {
		this.getView().addEventDelegate({
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onAfterShow: jQuery.proxy(function(evt) {
			    var date = new Date();
			    var dateStr = date.toLocaleDateString();
			    var dateStrs = dateStr.split("/");
			    if(dateStrs[1]!=='undefined'){
			        $('#tab_content_head_01_content_date').html(dateStrs[0]+"年"+dateStrs[1]+"月"+dateStrs[2]+"日"); 
			    }
        		var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                var dateStrh = dateStrs[0]+"-"+dateStrs[1]+"-"+dateStrs[2];
                var myDate = new Date(Date.parse(dateStrh.replace(/-/g, "/")));
                $('#tab_content_head_01_week').html(weekDay[myDate.getDay()]);
                // alert(weekDay[myDate.getDay()]);
				this.onAfterShow(evt);
			}, this)
		});
	},

	onAfterShow: function(evt) {
	    //给标题换时间 和 周几
	   // var date = new Date();
	   // var time2 = new Date().format("yyyy-MM-dd");
	   // $('#tab_content_head_01_date').html(time2);
	    
	    data_x3 = new Array("1.2", "1.1", "1.4", "1.15", "1.2", "1.15", "1.2");
 		data_x4 = new Array("0.015", "0.01", "0.04", "0.02", "0.025", "0.015", "0.025");
		this.loadChart();
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