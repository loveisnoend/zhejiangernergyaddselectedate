sap.ui.controller("com.zhenergy.pcbi.view.MainBusiness", {

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
        this._loadData01();
	},
	onAfterShow: function(evt) {
		// 		this.loadData();
	},
	// 获取二级页面数据
	_loadData01 : function () {
	    
	    var mParameters = {};
	    date = new Array();
		data1 = new Array();//发电收入
		data2 = new Array();//供热收入
		data3 = new Array();//劳务收入
		data4 = new Array();//其他收入
		data5 = new Array();// 主营业务收入
		// 数据类型，集团数据还是电厂数据
		var dateTypeName = '';
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {

			// 收入同比
			var incomeTongbi;
			// 成本同比
			var costTongbi;
			// 日利润同比
			var dailyProfitTongbi;
			for (var i in sRes.results) {
			    
			    if (sRes.results[i].KPI_TYPE == '日利润-发电收入同比'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
                    incomeTongbi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '日利润-成本总计同比'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
                    costTongbi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '日利润同比'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
                    dailyProfitTongbi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '主营业务收入发电'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    date.push(sRes.results[i].KPI_DATE);
				    data1.push(parseFloat(sRes.results[i].KPI_VALUE));    
				}
				if (sRes.results[i].KPI_TYPE == '主营业务收入供热'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){
				    data2.push(parseFloat(sRes.results[i].KPI_VALUE));     
				}
				if (sRes.results[i].KPI_TYPE == '主营业务收入劳务'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    data3.push(parseFloat(sRes.results[i].KPI_VALUE));      
				}
				if (sRes.results[i].KPI_TYPE == '主营业务收入其他'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    data4.push(parseFloat(sRes.results[i].KPI_VALUE));    
				}
				if (sRes.results[i].KPI_TYPE == '主营业务收入'&&sRes.results[i].KPI_DESC == sRes.results[0].KPI_DESC){ 
				    data5.push(parseFloat(sRes.results[i].KPI_VALUE));    
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
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_02_V04/?$filter=(BNAME eq '" + usrid + "')", mParameters);
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
                // drawpie(e);
                //drawdetail01(e);
            }

            //发电收入
            function drawswdl(e) {
                drawline(e, date, data1, '发电收入', 'green', 'powerChart', data1[data1.length - 1] + '亿千瓦时');
            }
            //供热收入
            function drawpjswdj(e) {
                drawline(e, date, data2, '供热收入', 'green', 'heatChart', data2[data2.length - 1] + '元/千瓦时');
            }
            //劳务收入
            function drawrlcb(e) {
                drawline(e, date, data3, '劳务收入', 'green', 'laborChart', data3[data3.length - 1] + '亿元');
            }

            //其他收入
            function drawqtcb(e) {
                drawline(e, date, data4, '其他收入', 'green', 'othersChart', data4[data4.length - 1] + '亿元');
            }

	        //折线通用
        function drawline(e, date, data1, title, color, id, value) {
            
            if (skinName == '夜间模式') {
    	        color="green";
    	    } else {
    	        color="#FF4F4F";
    	    }
            mychart = e.init(document.getElementById(id));
            // var w = document.getElementById(id).clientWidth;
            // var h = document.getElementById(id).clientHeight;
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
		if (incomeTongbi == undefined) {
		    incomeTongbi = 0;
		}
		var sr_prec = incomeTongbi
		var sr_color="green";
		var sr_colorR01 = '';
		if (skinName == '夜间模式') {
	        sr_colorR01="green";
	    } else {
	        sr_colorR01="white";
	    }
		if(sr_prec>0){
            sr_color = "green";
		} else {
		    sr_color = "red";
		}

		//成本数据
		var cb_data=(rlcb_data+qtcb_data).toFixed(2);
		if (costTongbi == undefined) {
		    costTongbi = 0;
		}
		var cb_prec= costTongbi;
		var cb_color="green";
		var cb_colorR01 = '';
	    if (skinName == '夜间模式') {
	        cb_colorR01="green";
	    } else {
	        cb_colorR01="white";
	    }
		if(cb_prec>0){
		    cb_color = "green";
		} else {
		    cb_color = "red";
		}
		
		// 发电收入
		var powerIncome = data1[data1.length - 1];
		// 供热收入
		var heatIncome = data2[data2.length - 1];
		
		// 劳务收入
		var laborIncome = data3[data3.length - 1];
		// 其他收入
		var othersIncome = data4[data4.length - 1];
		
		var sr_innerhtml1=
		'<div class="MB-main_content_title_1"><span>发电收入<span style="font-size:15px;">(百万元)</span></span>'+
		'<span style="margin-left:105px;">供热收入<span style="font-size:15px;">(百万元)</span></span></div>'+
		'<div class="MB-main_content_sz" style="font-size:30px;font-weight:bold;color:'+sr_colorR01+'"><span style="width:50%;height:100%;float:left;text-align:center;">'+ powerIncome +'</span><span style="width:50%;height:100%;float:left;text-align:center;font-weight:bold;color:'+cb_colorR01+'">'+heatIncome+'</span></div>'
		+'<div class="MB-main_content_sz"><span style="width:50%;height:100%;float:left;text-align:center;">同比'+sr_prec+'%<img src="img/arrow-'+sr_color+'2.png" class="content_img"/></span><span style="width:50%;height:100%;text-align:center;">同比'+cb_prec+'%<img src="img/arrow-'+cb_color+'2.png" class="content_img"/></sapn></div>';

		var sr_innerhtml2=
		'<div class="MB-main_content_title_2"><span>劳务收入<span style="font-size:15px;">(百万元)</span></span>'+
		'<span style="margin-left:105px;">其他收入<span style="font-size:15px;">(百万元)</span></span></div>'+
		'<div class="MB-main_content_sz" style="font-size:30px;font-weight:bold;color:'+sr_colorR01+'"><span style="width:50%;height:100%;float:left;text-align:center;">'+ laborIncome +'</span><span style="width:50%;height:100%;float:left;text-align:center;font-weight:bold;color:'+cb_colorR01+'">'+othersIncome+'</span></div>'
		+'<div class="MB-main_content_sz"><span style="width:50%;height:100%;float:left;text-align:center;">同比'+sr_prec+'%<img src="img/arrow-'+sr_color+'2.png" class="content_img"/></span><span style="width:50%;height:100%;text-align:center;text-align:right;">同比'+cb_prec+'%<img src="img/arrow-'+cb_color+'2.png" class="content_img"/></sapn></div>';

		//主营业收入数据
		var mainBusinessIncome = data5[data5.length - 1];
		
		var rlr_data=(sr_data-cb_data).toFixed(2);
		if (dailyProfitTongbi == undefined) {
		    dailyProfitTongbi = 0;
		}
		var rlr_prec = dailyProfitTongbi;
		var rlr_color="red";
		var rlr_colorR01 = "";
	    if (skinName == '夜间模式') {
	        rlr_colorR01="green";
	    } else {
	        rlr_colorR01="white";
	    }
		if(rlr_data>0){
            rlr_color = "green";
		} else {
		    rlr_color = "red";
		}
		var rlr_innerhtml='<div class="MB-main_content_title">主营业务收入<span style="font-size:20px;">(百万元)</span></div><div class="MB-main_content_sz" style="font-size:60px;font-weight:bold;color:'+rlr_colorR01+'">'+mainBusinessIncome+'</div><div class="MB-main_content_sz">同比'+rlr_prec+'%<img src="img/arrow-'+rlr_color+'2.png" class="content_img"/></div>';
               
		document.getElementById('srMB1').innerHTML = sr_innerhtml1;
		document.getElementById('srMB2').innerHTML = sr_innerhtml2;
		document.getElementById('rlrMB').innerHTML=rlr_innerhtml;
        document.getElementById('powerIncome').innerHTML=powerIncome+'百万元';
        document.getElementById('heatIncome').innerHTML=heatIncome+'百万元';
        document.getElementById('laborIncome').innerHTML=laborIncome+'百万元';
        document.getElementById('othersIncome').innerHTML=othersIncome+'百万元';


// 		document.getElementById('cb').innerHTML = cb_innerhtml;
	}
});