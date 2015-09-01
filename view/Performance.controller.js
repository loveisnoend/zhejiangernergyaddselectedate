sap.ui.controller("com.zhenergy.pcbi.view.Performance", {

	onInit: function() {
        this.getView().addEventDelegate({
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onBeforeShow: jQuery.proxy(function(evt) {
				this.onBeforeShow(evt);
			}, this)
		});
		this.getView().addEventDelegate({
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onAfterShow: jQuery.proxy(function(evt) {
				this.onAfterShow(evt);
			}, this)
		});
	},
    onBeforeShow: function(evt) {
	    date = new Array("0724", "0725", "0726", "0727", "0728", "0729", "0730", "0731");
        date01 = new Array("0701", "0702", "0703", "0704", "0705", "0706", "0707", "0708", "0709", "0710", "0711", "0712", "0713", "0714", "0715", "0716", "0717", "0718", "0719", "0720", "0721", "0722", "0723", "0724", "0725", "0726", "0727", "0728", "0729", "0730", "0731");
        data1 = new Array(278, 260, 330, 240, 230, 263, 230, 258);
        data2 = new Array(0.5, 0.25, 0.35, 0.52, 0.45, 0.8, 0.95, 0.65);
        data3 = new Array(13.3, 20.4, 17.5, 26.9, 23.3, 30.9, 19.8, 26.0);
        data4 = new Array(0.45, 0.8, 0.95, 0.65, 0.52, 0.45, 0.35, 0.52);
        data5 = new Array(200, 300, 278, 260, 330, 240, 230, 263, 300, 278, 260, 330, 240, 230, 263, 300, 278, 260, 230, 240, 230, 263, 300, 278, 260, 330, 240, 230, 263, 230, 258);
        data6 = new Array(0.5, 0.25, 0.35, 0.52, 0.45, 0.8, 0.95, 0.65, 0.5, 0.25, 0.35, 0.52, 0.45, 0.8, 0.95, 0.65, 0.5, 0.25, 0.35, 0.52, 0.45, 0.8, 0.95, 0.5, 0.25, 0.35, 0.52, 0.45, 0.8, 0.95, 0.65);
        data7 = new Array(0.45, 0.8, 0.95, 0.65, 0.52, 0.45, 0.35, 0.52, 0.45, 0.8, 0.95, 0.65, 0.52, 0.45, 0.35, 0.52, 0.8, 0.95, 0.65, 0.52, 0.45, 0.35, 0.52, 0.45, 0.8, 0.95, 0.65, 0.52, 0.45, 0.35, 0.52);
        this.loadChart();
		//this.loadData();
	},
	onAfterShow: function(evt){
	    this.loadData();
	},
	loadChart: function() {
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
                drawqtcb(e);
                drawpie(e);
                //drawdetail01(e);
            }

            //上网电量
            function drawswdl(e) {
                drawline(e, date, data1, '上网电量', 'green', 'swdl', data1[data1.length - 1] + '亿千瓦时');
            }
            /*function drawdetail01{
                drawline(e, date01, data5, '上网电量', 'green', 'detail01', data1[data1.length - 1] + '亿千瓦时');
            }*/

            //平均上网电价
            function drawpjswdj(e) {
                drawline(e, date, data2, '平均上网电价', 'green', 'pjswdj', data2[data2.length - 1] + '元/千瓦时');
            }
            //燃料成本
            function drawrlcb(e) {
                drawline(e, date, data3, '燃料成本', 'red', 'rlcb', data3[data3.length - 1] + '亿元');
            }

            //其他成本
            function drawqtcb(e) {
                drawline(e, date, data4, '其他成本', 'green', 'qtcb', data4[data4.length - 1] + '亿元');
            }

	        //折线通用
        function drawline(e, date, data, title, color, id, value) {
            mychart = e.init(document.getElementById(id));
            var w = document.getElementById(id).clientWidth;
            var h = document.getElementById(id).clientHeight;
            var option = {
                title: {
                    show: false,
                    text: value,
                    padding: 10,
                    x: 'center',
                    textStyle: {
                        color: '#FFF',
                        fontFamily: 'hiragino',
                        fontSize: 18,
                        fontStyle: 'normal',
                        fontWeight: 'bold'
                    }
                },
                tooltip: {
                    show: false,
                    trigger: 'axis'
                },
                legend: {
                    show: false,
                    data: [title]
                },
                grid: {
                    x: '50px',
                    y: '20px',
                    x2: '40px',
                    y2: '40px'
                },
                xAxis: [
                    {
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#FFF'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#31536f',
                                width: 1
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#31536f',
                            }
                        },
                        type: 'category',
                        boundaryGap: false,
                        data: date //['7/21', '7/22', '7/23', '7/24', '7/25', '7/26', '7/27']
                    }
                ],

                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} ',
                            textStyle: {
                                color: '#FFF'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#31536f',
                                width: 1
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#31536f',
                            }
                        },
                        scale: true
                    }
                ],
                series: [{
                    name: title,
                    type: 'line',
                    smooth: true,
                    symbol:'emptyCircle',
                    symbolSize: 4,
                    itemStyle: {
                        normal: {
                            // areaStyle: { type: 'default' },
                            color: color,
                            lineStyle: {
                                color: color,

                            }
                        }
                    },
                    data: data
                }]
            };
            mychart.setOption(option);
        }
        
        function drawpie(e){
    mychart=e.init(document.getElementById('rlr_circle'));
    var option = {
        title: {
            show:false,
            text: '日利润'
        },
        tooltip : {
            show: false
        },
        legend: {
            show:false,
            data:['日利润']
        },
        series : [
        {
            name:'1',
            type:'pie',
            radius : [95, 98],
            itemStyle : {
                normal:{
                    color:'red',
                    label: {show:false},
                    labelLine: {show:false}
                }
            },
            data:[
            {
                value:68,
                name:'日利润'
            },
            {
                value:32,
                name:'invisible',
                itemStyle : {
                    normal : {
                        color: 'rgba(0,0,0,0)',
                        label: {show:false},
                        labelLine: {show:false}
                    },
                    emphasis : {
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
	},
	loadData: function() {
		var swdl_data = data1[data1.length - 1];
		var pjswdj_data = data2[data2.length - 1];
		var rlcb_data=data3[data3.length - 1];
		var qtcb_data=data4[data4.length-1];
		var a = 1;
		
		//收入数据
		
		var sr_data = (swdl_data * pjswdj_data).toFixed(1);
		var sr_prec = a.toFixed(1);
		var sr_color="red";
		//var sr_img ="";
		if(sr_prec>0){
		    sr_color="green";
		}
		var sr_innerhtml='<div class="title">收入(亿元)</div><div class="num" style="color:'+sr_color+'">'+sr_data+'</div><div class="info">同比'+sr_prec+'%<img src="img/arrow-'+sr_color+'2.png"/></div>';

		//成本数据
		var cb_data=(rlcb_data+qtcb_data).toFixed(1);
		var cb_prec=a.toFixed(1);
		var cb_color="red";
		if(cb_prec>0){
		    cb_color="green";
		}
		var cb_innerhtml='<div class="title">成本(亿元)</div><div class="num" style="color:'+cb_color+'">'+cb_data+'</div><div class="info">同比'+cb_prec+'%<img src="img/arrow-'+cb_color+'2.png"/></div>';
		
		//日利润数据
		var rlr_data=(sr_data-cb_data).toFixed(1);
		var rlr_prec=a.toFixed(1);
		var rlr_color="red";
		if(rlr_prec>0){
		    rlr_color="green";
		}
		var rlr_innerhtml='<div class="title">日利润(亿元)</div><div class="num" style="color:'+rlr_color+'">'+rlr_data+'</div><div class="info">同比'+rlr_prec+'%<img src="img/arrow-'+rlr_color+'2.png"/></div>';
		
		document.getElementById('sr').innerHTML = sr_innerhtml;
document.getElementById('swdl_span').innerHTML=swdl_data+'亿千瓦时';
document.getElementById('pjswdj_span').innerHTML=pjswdj_data+'元/千瓦时';
document.getElementById('rlcb_span').innerHTML=rlcb_data+'亿元';
document.getElementById('qtcb_span').innerHTML=qtcb_data+'亿元';
		document.getElementById('rlr').innerHTML=rlr_innerhtml;

		document.getElementById('cb').innerHTML = cb_innerhtml;
	}

});