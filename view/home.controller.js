sap.ui.controller("com.zhenergy.pcbi.view.home", {

    /* initialize the swiper plugin*/
	_drawSwiper: function() {

	    require(
                [
                    'js/swiper'
                ]
                );
		var mySwiper = new Swiper('.swiper-container', {
			initialSlide: 0,
			speed: 50,
			loop: false,
			freeMode: false,
			threshold: 0,
			// freeModeMomentum : true,
			// freeModeMomentumRatio : 1,
			// freeModeMomentumBounce : false,
			// freeModeMomentumBounceRatio : 1,
			freeModeSticky: true,
			pagination: '.swiper-pagination',
			paginationClickable: true,
			centeredSlides: true,
			effect: 'coverflow',
			grabCursor: true,
			slideToClickedSlide: true,
			slidesPerView: 3,
			coverflow: {
				rotate: 0,
				stretch: 0,
				depth: 0,
				modifier: 1,
				slideShadows: false
			}
		});
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
				    valueGDPTotal = sRes.results[i].KPI_VALUE*100;
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
	// 加载日利润值
	_loadData_left : function(){
	    var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
		    // 日利润同比值
            var dailyProfitTongBi = '';
            // 日利润环比值
            var dailyProfitHuanBi = '';
            // 统计日期
            var daytime = null;
			//设置数据
			var home_rlr=0;
			for (var i in sRes.results) {
				if (sRes.results[i].KPI_TYPE == '日利润' && sRes.results[i].KPI_DESC == '集团'){  
				    home_rlr = home_rlr+parseFloat(sRes.results[i].KPI_VALUE);
				    daytime = sRes.results[i].KPI_DATE;
				}
				if (sRes.results[i].KPI_TYPE == '日利润环比' && sRes.results[i].KPI_DESC == '集团'){  
				    dailyProfitHuanBi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '日利润同比' && sRes.results[i].KPI_DESC == '集团'){  
				    dailyProfitTongBi = sRes.results[i].KPI_VALUE*100;
				}
			}
			var rlr_color="red";
    		if(home_rlr>0){
    		    rlr_color="green";
    		}
    		$('#home_rlr').css('color',rlr_color);
    		$('#home_rlr').css('font-size','75px');
			$('#home_rlr').html(home_rlr);
			if (dailyProfitHuanBi != undefined) {
			    $('#huanbiHome').html(dailyProfitHuanBi);
			}
            if (dailyProfitHuanBi > 0) {
                $("#huanbiProfitImg").attr("src","img/arrow-green2.png");
            } else {
                $("#huanbiProfitImg").attr("src","img/arrow-red2.png");
            }
            if (dailyProfitTongBi != undefined) {
                $('#tongbiHome').html(dailyProfitTongBi);    
            }
            if (dailyProfitTongBi > 0) {
                $("#tongbiProfitImg").attr("src","img/arrow-green2.png");
            } else {
                $("#tongbiProfitImg").attr("src","img/arrow-red2.png");
            }
            var daytime01;
    	    var daytime02;
    	    var daytime03;
    	    if (daytime != null) {
    	       daytime01 = daytime.substring(0,4);
    	       daytime02 = daytime.substring(4,6);
    	       daytime03 = daytime.substring(6,8); 
    	    }
            // 日利润日期
	        $('#dateProfitDate').html(daytime01 + "年" + daytime02 + "月" + daytime03 + "日");
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("Get Data Error");
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_01_V03?$filter=(BNAME eq '" +usrid+ "')", mParameters);
	},
	// 加载主营业务值
	_loadData_MainBusiness : function(){
	    var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
		    // 主营业务同比值
            var mainBusinessTongBi = '';
            // 主营业务环比值
            var mainBusinessHuanBi = '';
            // 统计日期
            var daytime = null;
			//设置数据
			var mainBusinessValue=0;
			for (var i in sRes.results) {
				if (sRes.results[i].KPI_TYPE == '主营业务收入' && sRes.results[i].KPI_DESC == '集团'){  
				    mainBusinessValue = mainBusinessValue+parseFloat(sRes.results[i].KPI_VALUE);
				    daytime = sRes.results[i].KPI_DATE;
				}
				if (sRes.results[i].KPI_TYPE == '主营业务收入环比' && sRes.results[i].KPI_DESC == '集团'){  
				    mainBusinessHuanBi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '主营业务收入同比' && sRes.results[i].KPI_DESC == '集团'){  
				    mainBusinessTongBi = sRes.results[i].KPI_VALUE*100;
				}
			}
			var rlr_color="red";
    		if(mainBusinessValue>0){
    		    rlr_color="green";
    		}
    		$('#mainBusiness').css('color',rlr_color);
    		$('#mainBusiness').css('font-size','75px');
			$('#mainBusiness').html(mainBusinessValue);
			if (mainBusinessHuanBi != undefined) {
			    $('#huanbiMainBusiness').html(mainBusinessHuanBi);
			}
            if (mainBusinessHuanBi > 0) {
                $("#huanbiMainBusinessImg").attr("src","img/arrow-green2.png");
            } else {
                $("#huanbiMainBusinessImg").attr("src","img/arrow-red2.png");
            }
            if (mainBusinessTongBi != undefined) {
                $('#tongbiMainBusiness').html(mainBusinessTongBi);    
            }
            if (mainBusinessTongBi > 0) {
                $("#tongbiMainBusinessImg").attr("src","img/arrow-green2.png");
            } else {
                $("#tongbiMainBusinessImg").attr("src","img/arrow-red2.png");
            }
            var daytime01;
    	    var daytime02;
    	    var daytime03;
    	    if (daytime != null) {
    	       daytime01 = daytime.substring(0,4);
    	       daytime02 = daytime.substring(4,6);
    	       daytime03 = daytime.substring(6,8); 
    	    }
            // 日利润日期
	        $('#mainBusinessDate').html(daytime01 + "年" + daytime02 + "月" + daytime03 + "日");
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("Get Data Error");
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_JYYJ_01_V04?$filter=(BNAME eq '" +usrid+ "')", mParameters);
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
                this._loadTopDynamicShowData();
                this._loadData_left();
                this._loadData_MainBusiness();
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