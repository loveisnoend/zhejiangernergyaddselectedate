sap.ui.controller("com.zhenergy.pcbi.view.home", {

    /* initialize the swiper plugin*/
	_drawSwiper: function() {

	    require(
                [
                    'js/idangerous.swiper'
                ]
                );
		var mySwiper = new Swiper('.swiper-container',{
	        onSlideClick: function(swiper){
              swiper.swipeTo(mySwiper.clickedSlideIndex, 500, false);
            },
	        initialSlide : slidePageNum,
            slidesPerView : 3,
            centeredSlides : true,
            grabCursor : true,
            paginationClickable :true,
            noSwiping : true,
            tdFlow: {
                rotate : 0,
                stretch : 100,
                depth : 400,
                modifier : 1,
                shadows : false
            }
         });
	},
	
    _loadData_top : function(){
	    var allenergy = null;
	    var mom = null;
	    var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
			//设置数据
			for (var i in sRes.results) {
				if (sRes.results[i].KPI_ID == 'KPI_TEC_V_0000'){  //全社会用电量
				    allenergy = sRes.results[i].KPI_VALUE;
				}
				if (sRes.results[i].KPI_ID == 'KPI_TEC_T_0000'){  //同比上升
				    mom = sRes.results[i].KPI_VALUE;
				}
				
			}
			this._loadData02(mom,allenergy);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("Get Data Error");
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_01_V02", mParameters);
	},
	
	// 设定全社会用电量和同比值
	_loadData02 : function(mom,allenergy){
	    if(mom < 0){
	        $('#mom_img').attr('src',"img/down.png");
	        $('#mom').html("下降" + Math.abs(mom));
	    }else if(mom >= 0){
	        $('#mom_img').attr('src',"img/up.png");
	        $('#mom').html("上升" + Math.abs(mom));
	    }
	    var allenergy_change = allenergy.substring(0,2);
	    $('#allenergy').html(allenergy_change);
	    
	},
	
	// 获取天气温度数据
	_loadData : function(){
	    var daytime = null;
		var weather = null;
		var temperature = null;
	    var place = null;
		var mParameters = {};
		mParameters['async'] = true;
	    
		mParameters['success'] = jQuery.proxy(function(sRes) {
			//设置数据
			for (var i in sRes.results) {
				if (sRes.results[i].KPI_ID == 'KPI_WEA_M_0001'){  //温度
				    place = sRes.results[i].KPI_DESC;
				    weather = sRes.results[i].KPI_VALUE;
				    daytime = sRes.results[i].KPI_DATE;
				}
				if (sRes.results[i].KPI_ID == 'KPI_TEM_H_0001'){  //天气
				    temperature = sRes.results[i].KPI_VALUE;
				}
			}
			this._loadData01(daytime,weather,temperature,place);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("Get Data Error");
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_01_V01", mParameters);
	},
	
	_loadData01 : function(daytime,weather,temperature,place){
	    var daytime01 = daytime.substring(0,4);
	    var daytime02 = daytime.substring(4,6);
	    var daytime03 = daytime.substring(6,8);
	    switch(weather !== null){
	        case weather == "W001":
	             $('#home_weather').html("晴天");
	             $('#home_weather_img').attr('src',"img/0001-weather-05.png");
	             break;
	        case weather == "W002":
	             $('#home_weather').html("多云");
	             $('#home_weather_img').attr('src',"img/0001-weather-04.png");
	             break;
	        case weather == "W003":
	             $('#home_weather').html("阴天");
	             $('#home_weather_img').attr('src',"img/0001-weather-01.png");
	             break;
	        case weather == "W004":
	             $('#home_weather').html("雨");
	             $('#home_weather_img').attr('src',"img/0001-weather-02.png");
	             break;
	        case weather == "W005":
	             $('#home_weather').html("雷阵雨");
	             $('#home_weather_img').attr('src',"img/0001-weather-03.png");
	             break;
	        case weather == "W006":
	             $('#home_weather').html("雨夹雪");
	             $('#home_weather_img').attr('src',"img/0001-weather-07.png");
	             break;
	        case weather == "W007":
	             $('#home_weather').html("雾");
	             $('#home_weather_img').attr('src',"img/0001-weather-08.png");
	             break;
	        case weather == "W008":
	             $('#home_weather').html("风");
	             $('#home_weather_img').attr('src',"img/0001-weather-10.png");
	             break;
	        case weather == "W009":
	             $('#home_weather').html("雪");
	             $('#home_weather_img').attr('src',"img/0001-weather-06.png");
	             break;
	        case weather == "W010":
	             $('#home_weather').html("冰雹");
	             $('#home_weather_img').attr('src',"img/0001-weather-09.png");
	             break;
	    }
	    
	    $('#home_temperature').html(temperature);
	    $('#home_place').html(place);
	    $('#home_daytime').html(daytime01 + "年" + daytime02 + "月" + daytime03 + "日");
	    // 日利润日期
	    $('#dateProfitDate').html(daytime01 + "年" + daytime02 + "月" + daytime03 + "日");
	    
	    var d = new Date();
	    var weekday=new Array(7);
        weekday[0]="周日";
        weekday[1]="周一";
        weekday[2]="周二";
        weekday[3]="周三";
        weekday[4]="周四";
        weekday[5]="周五";
        weekday[6]="周六";
        $('#home_Week').html(weekday[d.getDate()%7+1]);
	},
	
	// 获取跑马灯的动态信息
	_loadTopDynamicShowData : function(){

		var mParameters = {};
		mParameters['async'] = true;
	    
		mParameters['success'] = jQuery.proxy(function(sRes) {
			//设置数据
			for (var i in sRes.results) {
				if (sRes.results[i].KPI_ID == 'KPI_ENV_H_0001'){  //CPI环比
				    valueCPIhuanbi = (sRes.results[i].KPI_VALUE*100).toFixed(2);
				}
				if (sRes.results[i].KPI_ID == 'KPI_ENV_H_0005'){  //GDP增长率
				    valueGDP = (sRes.results[i].KPI_VALUE*100).toFixed(2);
				}
				if (sRes.results[i].KPI_ID == 'KPI_ENV_T_0001'){  //CPI同比
				    valueCPItongbi = (sRes.results[i].KPI_VALUE*100).toFixed(2);
				}
				if (sRes.results[i].KPI_ID == 'KPI_ENV_T_0002'){  //PPI同比
				    valuePPItongbi = (sRes.results[i].KPI_VALUE*100).toFixed(2);
				}
				if (sRes.results[i].KPI_ID == 'KPI_ENV_T_0003'){  //制造业-同比
				    valuePMIproduce = (sRes.results[i].KPI_VALUE*100).toFixed(2);
				}
				if (sRes.results[i].KPI_ID == 'KPI_ENV_T_0004'){  //非制造业-同比
				    valuePMInonProduce = (sRes.results[i].KPI_VALUE*100).toFixed(2);
				}
				if (sRes.results[i].KPI_ID == 'KPI_ENV_V_0005'){  //GDP总值
				    valueGDPTotal = (sRes.results[i].KPI_VALUE*100).toFixed(2);
				}
			}
			// 设定头部跑马灯信息 common.js
			_loadData03(valueCPIhuanbi,valueGDP,valueCPItongbi,valuePPItongbi,valuePMIproduce,valuePMInonProduce,valueGDPTotal);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("Get Data Error");
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_01_V01", mParameters);
	},
	
	_loadData_left : function(){
	    var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
			//设置数据
			home_rlr=0;
			for (var i in sRes.results) {
				if (sRes.results[i].KPI_TYPE == '日利润'){  
				    home_rlr = home_rlr+parseFloat(sRes.results[i].KPI_VALUE);
				}
			}
			home_rlr=home_rlr/10000;
// 			this.loadData03(home_rlr);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("Get Data Error");
		}, this);
// 		if(window.cordova && appContext && !window.sap_webide_companion) {
//             var usrid = appContext.registrationContext.user.toUpperCase();
// 		} else {
// 			var usrid = "ERPTEST1";
// 		}
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_01_V03?$filter=(BNAME eq '" +usrid+ "')", mParameters);
	},
	
	loadData03 : function(home_rlr){
	    $('#home_rlr').html(Math.round(home_rlr));
	},
	
	// 加载日润值
	_loadDateProfitData : function() {
	    var mParameters = {};
	    var date = new Array();
		var data1 = new Array();//上网电量
		var data2 = new Array();//平均上网电价
		var data3 = new Array();//燃料成本
		var data4 = new Array();//其他成本
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
			//设置数据
			for (var i in sRes.results) {
				if (sRes.results[i].KPI_TYPE == '上网电量'&&sRes.results[i].KPI_DESC==sRes.results[0].KPI_DESC){ 
				    date.push(sRes.results[i].KPI_DATE);    
				}
			}
			for(var j in date){
			    var data1temp=0;
			    var data2temp=0;
			    var data3temp=0;
			    var data4temp=0;
    			for (var i in sRes.results) {
    				if (sRes.results[i].KPI_TYPE == '上网电量'&&sRes.results[i].KPI_DATE==date[j]){ 
    				    data1temp=data1temp+parseFloat(sRes.results[i].KPI_VALUE);    
    				}
    				if (sRes.results[i].KPI_TYPE == '平均上网电价'&&sRes.results[i].KPI_DATE==date[j]){ 
    				    data2temp=data2temp+parseFloat(sRes.results[i].KPI_VALUE);    
    				}
    				if (sRes.results[i].KPI_TYPE == '日利润-燃料成本'&&sRes.results[i].KPI_DATE==date[j]){ 
    				    data3temp=data3temp+parseFloat(sRes.results[i].KPI_VALUE);    
    				}
    				if (sRes.results[i].KPI_TYPE == '日利润-其他成本'&&sRes.results[i].KPI_DATE==date[j]){ 
    				    data4temp=data4temp+parseFloat(sRes.results[i].KPI_VALUE);    
    				}
    			}
    			data1.push(data1temp);
    			data2.push(data2temp);
    			data3.push(data3temp);
    			data4.push(data4temp);
			}
    		var swdl_data = data1[data1.length - 1];
    		var pjswdj_data = data2[data2.length - 1];
    		var rlcb_data=data3[data3.length - 1];
		    var qtcb_data=data4[data4.length-1];
    		//收入数据
    		var sr_data = ((swdl_data * pjswdj_data)/100000000).toFixed(2);
    	    //成本数据
		    var cb_data=((rlcb_data+qtcb_data)/100000000).toFixed(1);
    		// 日利润
    		var rlr_data=sr_data-cb_data
		    $('#home_rlr').html(rlr_data);
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("Get Data Error");
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_02_V03/?$filter=(BNAME eq '" + usrid + "')", mParameters);
	},
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.zhenergy.bi.view.home
*/
	onInit: function() {
        
	    this.getView().addEventDelegate({
			
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onAfterShow: jQuery.proxy(function() {
                this._drawSwiper();
                this._loadDateProfitData();
                this._loadData_top();
                this._loadData();
                this._loadTopDynamicShowData();
                // this._loadData_left();
			}, this)
		});
	},
	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf com.zhenergy.bi.view.home
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf com.zhenergy.bi.view.home
*/
	onAfterRendering: function() {
        this._drawSwiper();
	}

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf com.zhenergy.bi.view.home
*/
//	onExit: function() {
//
//	}

});