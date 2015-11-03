sap.ui.controller("com.zhenergy.pcbi.view.home08", {

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
	// 人均营业收入值
	_loadData_AverBusinessIncome : function(){
	    var mParameters = {};
		mParameters['async'] = true;
		mParameters['success'] = jQuery.proxy(function(sRes) {
		    // 人均营业收入同比值
            var AverBusinessIncomeTongBi = '';
            // 人均营业收入环比值
            var AverBusinessIncomeHuanBi = '';
            // 统计日期
            var daytime = null;
			// 人均营业收入值
			var AverBusinessIncomeValue=0;
			for (var i in sRes.results) {
				if (sRes.results[i].KPI_TYPE == '人均营业收入' && sRes.results[i].KPI_DESC == '集团'){  
				    AverBusinessIncomeValue = AverBusinessIncomeValue+parseFloat(sRes.results[i].KPI_VALUE);
				    daytime = sRes.results[i].KPI_DATE;
				}
				if (sRes.results[i].KPI_TYPE == '人均营业收入环比' && sRes.results[i].KPI_DESC == '集团'){  
				    AverBusinessIncomeHuanBi = sRes.results[i].KPI_VALUE*100;
				}
				if (sRes.results[i].KPI_TYPE == '人均营业收入同比' && sRes.results[i].KPI_DESC == '集团'){  
				    AverBusinessIncomeTongBi = sRes.results[i].KPI_VALUE*100;
				}
			}
			var rlr_color="red";
    		if(AverBusinessIncomeValue>0){
    		    rlr_color="green";
    		}
    		$('#averBusinessIncome').css('color',rlr_color);
    		$('#averBusinessIncome').css('font-size','75px');
			$('#averBusinessIncome').html(AverBusinessIncomeValue);
// 			if (AverBusinessIncomeHuanBi != undefined) {
// 			    $('#huanbiAverBusinessIncome').html(AverBusinessIncomeHuanBi);
// 			}
//             if (AverBusinessIncomeHuanBi > 0) {
//                 $("#huanbiAverBusinessIncomeImg").attr("src","img/arrow-green2.png");
//             } else {
//                 $("#huanbiAverBusinessIncomeImg").attr("src","img/arrow-red2.png");
//             }
//             if (AverBusinessIncomeTongBi != undefined) {
//                 $('#tongbiAverBusinessIncome').html(AverBusinessIncomeTongBi);    
//             }
//             if (AverBusinessIncomeTongBi > 0) {
//                 $("#tongbiAverBusinessIncomeImg").attr("src","img/arrow-green2.png");
//             } else {
//                 $("#tongbiAverBusinessIncomeImg").attr("src","img/arrow-red2.png");
//             }
            var daytime01;
    	    var daytime02;
    	    var daytime03;
    	    if (daytime != null) {
    	       daytime01 = daytime.substring(0,4);
    	       daytime02 = daytime.substring(4,6);
    	       daytime03 = daytime.substring(6,8); 
    	    }
            // 人均营业收入日期
	        $('#averBusinessIncomeDate').html(daytime01 + "年" + daytime02 + "月" + daytime03 + "日");
		}, this);
		mParameters['error'] = jQuery.proxy(function(eRes) {
			alert("Get Data Error");
		}, this);
	    sap.ui.getCore().getModel().read("SCREEN_FZBZ_01_V01?$filter=(BNAME eq '" +usrid+ "')", mParameters);
	},
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf com.zhenergy.pcbi.view.home08
*/
	onInit: function() {
        
	    this.getView().addEventDelegate({
			
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onAfterShow: jQuery.proxy(function() {
			    
			    this._drawSwiper();
			    this._loadData_AverBusinessIncome();
    			// 设定头部跑马灯信息 common.js
    			_loadData03(valueCPIhuanbi,valueGDP,valueCPItongbi,valuePPItongbi,valuePMIproduce,valuePMInonProduce,valueGDPTotal);
			}, this)
		});
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf com.zhenergy.pcbi.view.home08
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf com.zhenergy.pcbi.view.home08
*/
	onAfterRendering: function() {
        this._drawSwiper();
	}

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf com.zhenergy.pcbi.view.home08
*/
//	onExit: function() {
//
//	}

});