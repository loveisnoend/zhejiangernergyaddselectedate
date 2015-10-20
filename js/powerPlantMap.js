var btnID, divID, oldbtn, olddivID;
function toMJhid() {
    // document.getElementById('rlcb_detail').style.display = "none";
    // document.getElementById('mj_hid').style.display = "";
    
    // powerPlantMap.getController().loadmjChart('pic4500');
}
function back() {
    document.getElementById('mj_hid').style.display = "none";
    document.getElementById('rlcb_detail').style.display = "";
}
function btnclick(no) {
    btnID = 'btn' + no;
    divID = 'mj_content_hid' + no;
    oldbtn = document.getElementsByClassName('active')[0];
    olddivID = 'mj_content_hid' + document.getElementsByClassName('active')[0].id.substring(3, 4);
    
    var chartDivId = '';
    if (no == 1) {
        chartDivId = 'pic4500';
    } else if(no == 2) {
       chartDivId = 'pic4800';
    } else if(no == 3) {
       chartDivId = 'pic5000';
    } else if(no == 4) {
       chartDivId = 'pic5200';
    } else if(no == 5) {
       chartDivId = 'pic5500';
    }
        
    if (document.getElementById(btnID).className != "active") {
        //clear();
        document.getElementById(olddivID).style.display = "none";
        oldbtn.className = "";
        document.getElementById(btnID).className = "active";
        document.getElementById(divID).style.display = "";
        powerPlantMap.getController().loadmjChart(chartDivId);
    } else {
        powerPlantMap.getController().loadmjChart(chartDivId);
    }
}
function detailAnother() {
// 	document.getElementById("rlcb_detail").style.display = "none";
// 	//document.getElementById("hidden01").style.display = "none";
// 	document.getElementById("detail_another").style.display = "";
// 	powerPlantMap.getController().loadChartdetail();
}

function back_another() {
	document.getElementById("rlcb_detail").style.display = "";
	document.getElementById("detail_another").style.display = "none";
}

function detailAnother002(machineType) {
    if(document.getElementById('powerPlantMainDetailTitle').innerHTML != '集团'){
    	document.getElementById("rlcb_detail").style.display = "none";
    	//document.getElementById("hidden01").style.display = "none";
    	document.getElementById("detail_another002").style.display = "";
    	powerPlantMap.getController().loadChartdetail02(machineType);
    }
}

function back_another002() {
	document.getElementById("rlcb_detail").style.display = "";
	document.getElementById("detail_another002").style.display = "none";
}