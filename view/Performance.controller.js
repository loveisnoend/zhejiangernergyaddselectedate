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
        
	    var mParameters = {};
	    date = new Array();
		data1 = new Array();//上网电量
		data2 = new Array();//平均上网电价
		data3 = new Array();//燃料成本
		data4 = new Array();//其他成本
		// 数据类型，集团数据还是电厂数据
		var dateTypeName = '';
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
			//设置数据
// 			for (var i in sRes.results) {
// 				if (sRes.results[i].KPI_TYPE == '上网电量'&&sRes.results[i].KPI_DESC==sRes.results[0].KPI_DESC){ 
// 				    date.push(sRes.results[i].KPI_DATE);
// 				}
// 				if (dateTypeName == '' || sRes.results[i].KPI_DESC == '集团') {
// 			        dateTypeName = sRes.results[i].KPI_DESC;
// 			    }
// 			}
// 			for(var j in date){
// 			    var data1temp=0;
// 			    var data2temp=0;
// 			    var data3temp=0;
// 			    var data4temp=0;
//     			for (var i in sRes.results) {
//     				if (sRes.results[i].KPI_TYPE == '上网电量'&&sRes.results[i].KPI_DESC == dateTypeName&&sRes.results[i].KPI_DATE==date[j]){ 
//     				    data1temp=data1temp+parseFloat(sRes.results[i].KPI_VALUE);    
//     				}
//     				if (sRes.results[i].KPI_TYPE == '平均上网电价'&&sRes.results[i].KPI_DESC == dateTypeName&&sRes.results[i].KPI_DATE==date[j]){
//     				    data2temp=data2temp+parseFloat(sRes.results[i].KPI_VALUE);    
//     				}
//     				if (sRes.results[i].KPI_TYPE == '燃料成本'&&sRes.results[i].KPI_DESC == dateTypeName&&sRes.results[i].KPI_DATE==date[j]){ 
//     				    data3temp=data3temp+parseFloat(sRes.results[i].KPI_VALUE);    
//     				}
//     				if (sRes.results[i].KPI_TYPE == '日利润-其他成本'&&sRes.results[i].KPI_DESC == dateTypeName&&sRes.results[i].KPI_DATE==date[j]){ 
//     				    data4temp=data4temp+parseFloat(sRes.results[i].KPI_VALUE);    
//     				}
//     			}
//     			data1.push(data1temp);
//     			data2.push(data2temp);
//     			data3.push(data3temp);
//     			data4.push(data4temp);
// 			}
			// 收入同比
			var incomeTongbi;
			// 成本同比
			var costTongbi;
			// 日利润同比
			var dailyProfitTongbi;
			for (var i in sRes.results) {
			    
			    if (sRes.results[i].KPI_TYPE == '日利润-发电收入同比'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
                    incomeTongbi = sRes.results[i].KPI_VALUE
				}
				if (sRes.results[i].KPI_TYPE == '日利润-成本总计同比'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
                    costTongbi = sRes.results[i].KPI_VALUE
				}
				if (sRes.results[i].KPI_TYPE == '日利润同比'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
                    dailyProfitTongbi = sRes.results[i].KPI_VALUE
				}
				if (sRes.results[i].KPI_TYPE == '上网电量'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    date.push(sRes.results[i].KPI_DATE);
				    data1.push(parseFloat(sRes.results[i].KPI_VALUE));    
				}
				if (sRes.results[i].KPI_TYPE == '平均上网电价'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){
				    data2.push(parseFloat(sRes.results[i].KPI_VALUE));     
				}
				if (sRes.results[i].KPI_TYPE == '燃料成本'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    data3.push(parseFloat(sRes.results[i].KPI_VALUE));      
				}
				if (sRes.results[i].KPI_TYPE == '日利润-其他成本'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    data4.push(parseFloat(sRes.results[i].KPI_VALUE));    
				}
			}
// 			alert('---data1---'+data1+'---data2---'+data2+'---data3----'+data3+'----data4---'+data4);
			this.loadChart();
			this.loadData(incomeTongbi, costTongbi, dailyProfitTongbi);
			// 设定头部跑马灯信息 common.js
			_loadData03(valueCPIhuanbi,valueGDP,valueCPItongbi,valuePPItongbi,valuePMIproduce,valuePMInonProduce,valueGDPTotal);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("Get Data Error");
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_02_V03/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
	onAfterShow: function(evt) {
		// 		this.loadData();
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
                drawline(e, date, data3, '燃料成本', 'green', 'rlcb', data3[data3.length - 1] + '亿元');
            }

            //其他成本
            function drawqtcb(e) {
                drawline(e, date, data4, '其他成本', 'green', 'qtcb', data4[data4.length - 1] + '亿元');
            }

	        //折线通用
        function drawline(e, date, data1, title, color, id, value) {
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
                itemStyle : {
                    normal : {
                        label : {
                            show : true,
                            position : 'top'
                        }
                    }  
                },
                tooltip: {
                    show: false,
                    trigger: 'axis'
                    // formatter: "Temperature : <br/>{b}km : {c}°C"
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
                                color: '#31536f'
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
                                color: '#31536f'
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
                                color: color
                            }
                        }
                    },
                    data: data1
                }]
            };
            mychart.setOption(option);
        }
        
        function drawpie(e){
            // mychart=e.init(document.getElementById('rlr_circle'));
            // var option = {
            //     title: {
            //         show:false,
            //         text: '日利润'
            //     },
            //     tooltip : {
            //         show: false
            //     },
            //     legend: {
            //         show:false,
            //         data:['日利润']
            //     },
            //     series : [
            //     {
            //         name:'1',
            //         type:'pie',
            //         radius : [95, 98],
            //         itemStyle : {
            //             normal:{
            //                 color:'red',
            //                 label: {show:false},
            //                 labelLine: {show:false}
            //             }
            //         },
            //         data:[
            //         {
            //             value:68,
            //             name:'日利润'
            //         },
            //         {
            //             value:32,
            //             name:'invisible',
            //             itemStyle : {
            //                 normal : {
            //                     color: 'rgba(0,0,0,0)',
            //                     label: {show:false},
            //                     labelLine: {show:false}
            //                 },
            //                 emphasis : {
            //                     color: 'rgba(0,0,0,0)'
            //                 }
            //             }
            //         }
            //         ]
            //     }
            //     ]
            // };
            // mychart.setOption(option);
        }
	},
	loadData: function(incomeTongbi, costTongbi, dailyProfitTongbi) {
		var swdl_data = data1[data1.length - 1];
		var pjswdj_data = data2[data2.length - 1];
		var rlcb_data=data3[data3.length - 1];
		var qtcb_data=data4[data4.length-1];
		var a = 1;
    		
		//收入数据
		var sr_data = (swdl_data * pjswdj_data).toFixed(2);
		var sr_prec = incomeTongbi
		var sr_color="green";
		if(sr_prec>0){
		    sr_color="green";
		}

		//成本数据
		var cb_data=(rlcb_data+qtcb_data).toFixed(2);
		var cb_prec= costTongbi;
		var cb_color="green";
		if(cb_prec>0){
		    cb_color="green";
		}
		var sr_innerhtml=
		'<div class="main_content_title_1"><span style="margin-left:3%;">收入<span style="font-size:15px;">(万元)</span></span>'+
		'<span style="margin-left:26%;">成本<span style="font-size:15px;">(万元)</span></span></div>'+
		'<div class="main_content_sz" style="font-size:30px;font-weight:bold;color:'+sr_color+'"><span>'+ sr_data +'</span><span style="margin-left:15%;font-weight:bold;color:'+cb_color+'">'+cb_data+'</span></div>'
		+'<div class="main_content_sz"><span style="text-align:center;">同比'+sr_prec+'%<img src="img/arrow-'+sr_color+'2.png" class="content_img"/></span><span style="margin-left:25%;text-align:right;">同比'+cb_prec+'%<img src="img/arrow-'+cb_color+'2.png" class="content_img"/></sapn></div>';

		//日利润数据
		var rlr_data=(sr_data-cb_data).toFixed(2);
		var rlr_prec = dailyProfitTongbi;
		var rlr_color="red";
		if(rlr_data>0){
		    rlr_color="green";
		}
		var rlr_innerhtml='<div class="main_content_title">日利润<span style="font-size:20px;">(万元)</span></div><div class="main_content_sz" style="font-size:65px;font-weight:bold;color:'+rlr_color+'">'+rlr_data+'</div><div class="main_content_sz">同比'+rlr_prec+'%<img src="img/arrow-'+rlr_color+'2.png" class="content_img"/></div>';

                        
		document.getElementById('sr').innerHTML = sr_innerhtml;
		document.getElementById('rlr').innerHTML=rlr_innerhtml;
        document.getElementById('swdl_span').innerHTML=swdl_data+'万千瓦时';
        document.getElementById('pjswdj_span').innerHTML=pjswdj_data+'元/千瓦时';
        document.getElementById('rlcb_span').innerHTML=rlcb_data+'万元';
        document.getElementById('qtcb_span').innerHTML=qtcb_data+'万元';


// 		document.getElementById('cb').innerHTML = cb_innerhtml;
	}
});