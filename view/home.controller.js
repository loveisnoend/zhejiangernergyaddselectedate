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
         $('.menu_bottom li').removeClass('but01 but02 but03 but04 but05 but06 but07 but08 nav_BI');
         if (slidePageNum == 0){
             mySwiper.swipeTo(0, 500, false);
             $('#but01').addClass("but01 nav_BI");
         }
         if (slidePageNum == 1){
             mySwiper.swipeTo(1, 500, false);
             $('#but02').addClass("but02 nav_BI");
         }
         if (slidePageNum == 2){
             mySwiper.swipeTo(2, 500, false);
             $('#but03').addClass("but03 nav_BI");
         }
         if (slidePageNum == 3){
             mySwiper.swipeTo(3, 500, false);
             $('#but04').addClass("but04 nav_BI");
         }
         if (slidePageNum == 4){
             mySwiper.swipeTo(4, 500, false);
             $('#but05').addClass("but05 nav_BI");
         }
         if (slidePageNum == 5){
             mySwiper.swipeTo(5, 500, false);
             $('#but06').addClass("but06 nav_BI");
         }
         if (slidePageNum == 6){
             mySwiper.swipeTo(6, 500, false);
             $('#but07').addClass("but03 nav_BI");
         }
        if (slidePageNum == 7){
             mySwiper.swipeTo(7, 500, false);
             $('#but08').addClass("but03 nav_BI");
         }
         $('#but01').click(function(){
              mySwiper.swipeTo(0, 500, false);
              $('.menu_bottom li').removeClass('but01 but02 but03 but04 but05 but06 but07 but08 nav_BI');
              $('#but01').addClass("but01 nav_BI");
         });
         $('#but02').click(function(){
              mySwiper.swipeTo(1, 500, false);
              $('.menu_bottom li').removeClass('but01 but02 but03 but04 but05 but06 but07 but08 nav_BI');
              $('#but02').addClass("but02 nav_BI");
         });
         $('#but03').click(function(){
              mySwiper.swipeTo(2, 500, false);
              $('.menu_bottom li').removeClass('but01 but02 but03 but04 but05 but06 but07 but08 nav_BI');
              $('#but03').addClass("but03 nav_BI");
         });
         $('#but04').click(function(){
              mySwiper.swipeTo(3, 500, false);
              $('.menu_bottom li').removeClass('but01 but02 but03 but04 but05 but06 but07 but08 nav_BI');
              $('#but04').addClass("but04 nav_BI");
         });
         $('#but05').click(function(){
              mySwiper.swipeTo(4, 500, false);
              $('.menu_bottom li').removeClass('but01 but02 but03 but04 but05 but06 but07 but08 nav_BI');
              $('#but05').addClass("but05 nav_BI");
         });
         $('#but06').click(function(){
              mySwiper.swipeTo(5, 500, false);
              $('.menu_bottom li').removeClass('but01 but02 but03 but04 but05 but06 but07 but08 nav_BI');
              $('#but06').addClass("but06 nav_BI");
         });
        $('#but07').click(function(){
              mySwiper.swipeTo(6, 500, false);
              $('.menu_bottom li').removeClass('but01 but02 but03 but04 but05 but06 but07 but08 nav_BI');
              $('#but07').addClass("but07 nav_BI");
         });
        $('#but08').click(function(){
              mySwiper.swipeTo(7, 500, false);
              $('.menu_bottom li').removeClass('but01 but02 but03 but04 but05 but06 but07 but08 nav_BI');
              $('#but08').addClass("but08 nav_BI");
         });
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