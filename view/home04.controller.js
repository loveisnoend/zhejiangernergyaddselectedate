sap.ui.controller("com.zhenergy.pcbi.view.home04", {

 /* initialize the swiper plugin*/
	_drawSwiper: function() {

	    require(
                [
                    'js/swiper'
                ]
                );
// 		var mySwiper = new Swiper('.swiper-container',{
// 	        onSlideClick: function(swiper){
//               swiper.swipeTo(mySwiper.clickedSlideIndex, 500, false);
//             },
// 	        initialSlide : slidePageNum,
//             slidesPerView : 3,
//             centeredSlides : true,
//             grabCursor : true,
//             paginationClickable :true,
//             noSwiping : true,
//             tdFlow: {
//                 rotate : 0,
//                 stretch : 100,
//                 depth : 400,
//                 modifier : 1,
//                 shadows : false
//             }
//          });
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
			slideToClickedSlide: false,
			centeredSlides: true,
			slidesPerView: 3,
			coverflow: {
				rotate: 0,
				stretch: -60,
				depth: 200,
				modifier: 2,
				slideShadows: false
			}
		});
	},
	onInit: function() {
        
	    this.getView().addEventDelegate({
			
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onAfterShow: jQuery.proxy(function() {
                this._drawSwiper();
                // 设定头部跑马灯信息 common.js
    			_loadData03(valueCPIhuanbi,valueGDP,valueCPItongbi,valuePPItongbi,valuePMIproduce,valuePMInonProduce,valueGDPTotal);
			}, this)
		});
	},
	onAfterRendering: function() {
        this._drawSwiper();
	}


});