sap.ui.controller("com.zhenergy.pcbi.view.tab", {
	onInit: function() {

		this.getView().addEventDelegate({
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onBeforeShow: jQuery.proxy(function(evt) {
				this.onBeforeShow(evt);
			}, this)
		});
	},

	onBeforeShow: function(evt) {
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
			drawline(e, 'line02', data_x3, data_x4, 1.40, 1.00, 0.05, 0.01, 4, '#FFB300', '#1EAD88');
		}

		function drawline(e, id, datax1, datax2, y1, y2, y3, y4, n, color1, color2) {
			mychart = e.init(document.getElementById(id));
			var option = {
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
						data: ['q', 'q', 'q', 'q', 'q', 'q', 'q']
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
						name: '',
						type: 'line',
						smooth: true,
						symbol:'emptyCircle',
						symbolSize:5,
						// itemStyle: {normal: {areaStyle: {type: 'default'}}},
						data: datax1
                    },
					{
						name: '',
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
							},

						]
			};
			mychart.setOption(option);
		}
	}
});