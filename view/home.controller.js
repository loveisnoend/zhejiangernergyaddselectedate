sap.ui.controller("com.zhenergy.pcbi.view.home", {

 /* initialize the swiper plugin*/
	_drawSwiper: function() {
	    require(
                [
                    'js/swiper'
                ]
                );
		var mySwiper = new Swiper('.swiper-container',{
        	    initialSlide : 2,
        	    speed : 50,
        // 	   // loop : false,
        // 	   // freeMode : true,
        // 	    threshold : 0,
        // 	   //// freeModeMomentum : true,
        // 	   //// freeModeMomentumRatio : 1,
        // 	   //// freeModeMomentumBounce : false,
        // 	   //// freeModeMomentumBounceRatio : 1,
        	    freeModeSticky : true,
                pagination: '.swiper-pagination',
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                paginationClickable : true,
                slidesPerView: 'auto',
                coverflow: {
                    rotate: 0,
                    stretch: 750,
                    depth: 600,
                    modifier: 1,
                    slideShadows : true
                }
         });
         mySwiper.slideTo(3, 1500, false);//切换到第一个slide，速度为1秒
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