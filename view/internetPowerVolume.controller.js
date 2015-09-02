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
	    
        this.loadChart();
        //this.loadmjChart("mj_content_hid1", xdate, data_sj, data_qg);
	},
	
	// load the chart map
	loadChart : function () {
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
		    }
		
		    function drawPowerDistribution(ec) {
		        
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
				/*
				var ecConfig = require('echarts/config');
				myChart1.on(ecConfig.EVENT.MAP_SELECTED, function (param){
					var selected = param.selected;
					var str = '当前选择： ';
					for (var p in selected) {
						if (selected[p]) {
							str += p + ' ';
						}
					}
					document.getElementById('wrong-message').innerHTML = str;
				})
				*/
				// 为echarts对象加载数据 
				myChart3.setOption(option3); 

	//////////////////////////////////浙江省地图//////////////////////////////////////////////////////////		
			    // 基于准备好的dom，初始化echarts图表
                myChart4 = ec.init(document.getElementById('powerPlantMap'));
				var allPowerData = [
					{name: "温州", value: 300, coal:1196820.02, coalDays:3, inputPlanTotal:"600", inputPlanValue:335, averUsePerH:11.8, averLoadRate: "65%", netPowerWPerH:6.19, costData:8580.15, costPer:0.45, otherAllCost:5646.66, otherCost:345.45, repairCost:580.9, peopleCost:3456.15, finaceCost:1000.56, depreciationCost:345.3},
					{name: "义乌", value: 270, coal:3342340.02, coalDays:6, inputPlanTotal:"700", inputPlanValue:200, averUsePerH:23.2, averLoadRate: "36%", netPowerWPerH:3.56, costData:65324.05, costPer:1.98, otherAllCost:3452.45, otherCost:543.67, repairCost:456.87, peopleCost:2334.74, finaceCost:2345.56, depreciationCost:300.5},
					{name: "杭州", value: 300, coal:5656774.02, coalDays:7, inputPlanTotal:"800", inputPlanValue:300, averUsePerH:34.5, averLoadRate: "45%", netPowerWPerH:4.50, costData:24543.15, costPer:4.35, otherAllCost:2343.56, otherCost:233.46, repairCost:234.89, peopleCost:8743.89, finaceCost:2783.90, depreciationCost:467.8},
					{name: "绍兴", value: 120, coal:5456565.02, coalDays:7, inputPlanTotal:"900", inputPlanValue:332, averUsePerH:12.5, averLoadRate: "78%", netPowerWPerH:9.0, costData:54634, costPer:2.90, otherAllCost:8965.65, otherCost:345.67, repairCost:833.5, peopleCost:9876.23, finaceCost:7899.44, depreciationCost:249.7},
					{name: "金华", value: 180, coal:5465324.02, coalDays:7, inputPlanTotal:"1000", inputPlanValue:767, averUsePerH:13.9, averLoadRate: "33%", netPowerWPerH:2.56, costData:32523.9, costPer:2.8, otherAllCost:1243.56, otherCost:873.56, repairCost:456.8, peopleCost:7676.56, finaceCost:9654.34, depreciationCost:783.3},
					{name: "衢州", value: 130, coal:8356764.02, coalDays:8, inputPlanTotal:"400", inputPlanValue:129, averUsePerH:14.8, averLoadRate: "88%", netPowerWPerH:3.56, costData:34522.7, costPer:5.66, otherAllCost:6732.34, otherCost:872.73, repairCost:124.5, peopleCost:2346.76, finaceCost:5634.45, depreciationCost:965.34},
					{name: "舟山", value: 140, coal:1258796.02, coalDays:7, inputPlanTotal:"400", inputPlanValue:356, averUsePerH:16.8, averLoadRate: "65%", netPowerWPerH:5.90, costData:13531.89, costPer:2.45, otherAllCost:2356.87, otherCost:124.55, repairCost:580.9, peopleCost:3678.34, finaceCost:3456.76, depreciationCost:876.56},
					{name: "宁波", value: 156, coal:3737926.02, coalDays:3, inputPlanTotal:"500", inputPlanValue:246, averUsePerH:31.8, averLoadRate: "60%", netPowerWPerH:8.89, costData:749324.84, costPer:1.75, otherAllCost:7624.76, otherCost:383.67, repairCost:233.67, peopleCost:2359.48, finaceCost:8765.34, depreciationCost:986.3},
					{name: "台州", value: 110, coal:9467325.02, coalDays:10, inputPlanTotal:"400", inputPlanValue:267, averUsePerH:21.8, averLoadRate: "79%", netPowerWPerH:5.4, costData:135410.34, costPer:9.67, otherAllCost:3245.56, otherCost:826.33, repairCost:345.9, peopleCost:3998.45, finaceCost:3456.76, depreciationCost:456.4},
					{name: "湖州", value: 90, coal:2568746.02, coalDays:2, inputPlanTotal:"500", inputPlanValue:300, averUsePerH:51.8, averLoadRate: "53%", netPowerWPerH:2.45, costData:25424.64, costPer:2.56, otherAllCost:9832.56, otherCost:127.67, repairCost:283.6, peopleCost:9876.44, finaceCost:3456.56, depreciationCost:234.67}
				];
								
				var option4 = {

					title : {
						text: '',
						subtext: '',
						sublink: '',
						x:'center',
					},
					calculable: false,
					tooltip : {
						trigger: 'item'
					},
					series : [
						{
						    itemStyle:{
							    normal:{label:{show:true}},
                                emphasis:{label:{show:true}}
							},
							name: 'XXX电厂',
							type: 'map',
							mapType: '浙江',
							hoverable: false,
							roam:false,
							data : [],
							mapLocation : {
							    x: "center",
								y: "center",
								//width: "500px",
								//height: "500px"
							},
							markPoint : {
								symbolSize: 13,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
								itemStyle: {
									normal: {
									    //color:'blue',    // 标点颜色值
										borderColor: '#87cefa',
										borderWidth: 1,            // 标注边线线宽，单位px，默认为1
										label: {
											show: true,
											formatter: [{name:name}],
										},
									},
									emphasis: {
										borderColor: '#1e90ff',
										borderWidth: 5,
										label: {
											show: true,
										}
									},
									large: true,
								},
								data :allPowerData
							},
							geoCoord: {
								"温州":[120.65,28.01],
								"义乌":[120.06,29.32],
								"杭州":[120.19,30.26],
								"绍兴":[120.58,30.01],
								"金华":[119.64,29.12],
								"衢州":[118.88,28.97],
								"舟山":[122.207216,29.985295],
								"宁波":[121.56,29.86],
								"台州":[121.420757,28.656386],
								"湖州":[120.1,30.86]
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
									    show: true,
									},
								},
								symbol:'emptyCircle',
								symbolSize : function (v){
									return 10 + v/100
								},
								effect : {
									show: true,
									shadowBlur : 0
								},
								itemStyle:{
									normal:{
										label:{show:false}
									}
								},
								data : [
									{name: "温州", value: 193},
									{name: "义乌", value: 200},
									{name: "杭州", value: 300}
								]
							}
						}
					]
				}; 
	
				myChart4.on(ecConfig.EVENT.CLICK, function (param){  
				// 	if (param.dataIndex == 0 && param.name != '温州') {
    //                     document.getElementById("detailInfo").style.display = "none";
				// 		document.getElementById('onlyMap').style.display = "";
				// 	} else {
				// 	    document.getElementById("detailInfo").style.display = "";
				// 	    document.getElementById('onlyMap').style.display = "none";
				// 	}
					
					var mapSeries = option4.series[0];

					// 电厂名
					document.getElementById('powerName').innerHTML = mapSeries.markPoint.data[param.dataIndex].name;
					var data1 = mapSeries.markPoint.data[param.dataIndex].inputPlanValue;
					var data2 = mapSeries.markPoint.data[param.dataIndex].inputPlanTotal - mapSeries.markPoint.data[param.dataIndex].inputPlanValue
				    
				    document.getElementById('fuelCost').innerHTML = mapSeries.markPoint.data[param.dataIndex].inputPlanValue;
				    document.getElementById('fuelDownPercent').innerHTML = mapSeries.markPoint.data[param.dataIndex].coalDays;
				    document.getElementById('travelPrice').innerHTML = mapSeries.markPoint.data[param.dataIndex].averUsePerH;
				    document.getElementById('coalPrice').innerHTML = mapSeries.markPoint.data[param.dataIndex].netPowerWPerH;
				    document.getElementById('coalCost').innerHTML = mapSeries.markPoint.data[param.dataIndex].otherAllCost;
				    document.getElementById('wattVolume1').innerHTML = mapSeries.markPoint.data[param.dataIndex].inputPlanValue;
				    document.getElementById('watt1').innerHTML = mapSeries.markPoint.data[param.dataIndex].depreciationCost;
				    document.getElementById('wattVolume2').innerHTML = mapSeries.markPoint.data[param.dataIndex].peopleCost;
				    document.getElementById('watt2').innerHTML = mapSeries.markPoint.data[param.dataIndex].repairCost;
				    document.getElementById('coalTotalVolume').innerHTML = mapSeries.markPoint.data[param.dataIndex].coal;
				    document.getElementById('wasteDays').innerHTML = mapSeries.markPoint.data[param.dataIndex].coalDays;
				});	
				
				// document.getElementById('powerName').innerHTML = "杭州";
				
                // 为echarts对象加载数据 
                myChart4.setOption(option4); 
		///////////////////////////////安徽淮南市地图////////////////////////////////////////////
				// 基于准备好的dom，初始化echarts图表
                myChart5 = ec.init(document.getElementById('huaiNanMap')); 
                
				var allPowerData2 = [
					{name: "淮南", value: 300, coal:1196820.02, coalDays:3, inputPlanTotal:"600", inputPlanValue:335, averUsePerH:11.8, averLoadRate: "65%", netPowerWPerH:6.19, costData:8580.15, costPer:0.45, otherAllCost:5646.66, otherCost:345.45, repairCost:580.9, peopleCost:3456.15, finaceCost:1000.56, depreciationCost:345.3},
				];
								
				option5 = {
					title : {
						text: '',
						subtext: '',
						sublink: '',
						x:'center',
					},
					calculable: false,
					series : [
						{
							itemStyle:{
								normal:{label:{show:true}},
								emphasis:{label:{show:true}}
							},
							name: '安徽',
							type: 'map',
							mapType: '安徽|淮南市',
							hoverable:true,
							roam:false,
							data : [],
							markPoint : {
								symbolSize: 13,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
								itemStyle: {
									normal: {
									    //color:'blue',    // 标点颜色值
										borderColor: '#87cefa',
										borderWidth: 1,            // 标注边线线宽，单位px，默认为1
										label: {
											show: false,
										},
									},
									emphasis: {
										borderColor: '#1e90ff',
										borderWidth: 5,
										label: {
											show: false
										}
									}
								},
								data :allPowerData2
							},
							geoCoord: {
                                "淮南":[116.73,32.80],
							}
						},
						{
							name: 'Top3',
							type: 'map',
							mapType: '安徽|淮南市',
							data:[],
							markPoint : {
								symbol:'emptyCircle',
								symbolSize : function (v){
									return 10 + v/100
								},
								effect : {
									show: true,
									shadowBlur : 0,
									scaleSize: 1.5,
									type: 'bounce'
								},
								itemStyle:{
									normal:{
										label:{show:false}
									}
								},
								data : [
									{name: "淮南", value: 193},
								]
							}
						}
					]
				}; 

				myChart5.on(ecConfig.EVENT.CLICK, function (param){
				
				//     if (param.dataIndex == 0 && param.name != '淮南') {
    //                     document.getElementById("detailInfo").style.display = "none";
				// 		document.getElementById('onlyMap').style.display = "";
				// 	} else {
				// 	    document.getElementById("detailInfo").style.display = "";
				// 	    document.getElementById('onlyMap').style.display = "none";
				// 	}
					var mapSeries = option5.series[0];

					// 电厂名
					document.getElementById('powerName').innerHTML = mapSeries.markPoint.data[param.dataIndex].name;
					var data1 = mapSeries.markPoint.data[param.dataIndex].inputPlanValue;
					var data2 = mapSeries.markPoint.data[param.dataIndex].inputPlanTotal - mapSeries.markPoint.data[param.dataIndex].inputPlanValue
				    
				    document.getElementById('fuelCost').innerHTML = mapSeries.markPoint.data[param.dataIndex].inputPlanValue;
				    document.getElementById('fuelDownPercent').innerHTML = mapSeries.markPoint.data[param.dataIndex].coalDays;
				    document.getElementById('travelPrice').innerHTML = mapSeries.markPoint.data[param.dataIndex].averUsePerH;
				    document.getElementById('coalPrice').innerHTML = mapSeries.markPoint.data[param.dataIndex].netPowerWPerH;
				    document.getElementById('coalCost').innerHTML = mapSeries.markPoint.data[param.dataIndex].otherAllCost;
				    document.getElementById('wattVolume1').innerHTML = mapSeries.markPoint.data[param.dataIndex].inputPlanValue;
				    document.getElementById('watt1').innerHTML = mapSeries.markPoint.data[param.dataIndex].depreciationCost;
				    document.getElementById('wattVolume2').innerHTML = mapSeries.markPoint.data[param.dataIndex].peopleCost;
				    document.getElementById('watt2').innerHTML = mapSeries.markPoint.data[param.dataIndex].repairCost;
				    document.getElementById('coalTotalVolume').innerHTML = mapSeries.markPoint.data[param.dataIndex].coal;
				    document.getElementById('wasteDays').innerHTML = mapSeries.markPoint.data[param.dataIndex].coalDays;
				});	
			
                // 为echarts对象加载数据 
                myChart5.setOption(option5); 
        }
	}
});