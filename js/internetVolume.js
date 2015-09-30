var btnID, divID, oldbtn, olddivID;
function internetback() {
    document.getElementById('internetDetailNet').style.display = "none";
    document.getElementById('rlcb_detailNet').style.display = "";
}
function priceDetailAnotherNet(detailId) {
	document.getElementById("rlcb_detailNet").style.display = "none";
	document.getElementById("internetDetailNet").style.display = "";
	var priceChartId = "priceDetailDivNet";
	var priceChartName = '';
	if (detailId == 'detail001') {
	    priceChartName = '合约电量';
	} else if(detailId == 'detail002'){
	    priceChartName = '直供电量';   
	} else if(detailId == 'detail003'){
	    priceChartName = '替代电量';   
	} else if(detailId == 'detail004'){
	    priceChartName = '厂用电量';   
	} else if(detailId == 'detail005'){
	    priceChartName = '发电量';   
	} else if (detailId == 'detail006') {
	    priceChartName = '厂用电量';
	}
	internetVolume.getController().loadFactoryUseData(priceChartId, priceChartName);
}