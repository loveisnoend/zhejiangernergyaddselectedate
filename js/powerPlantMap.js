var btnID, divID, oldbtn, olddivID;
        function toMJhid() {
            document.getElementById('rlcb_detail').style.display = "none";
            document.getElementById('mj_hid').style.display = "";
            powerPlantMap.getController().loadmjChart("mj_content_hid1", xdate,data_sj, data_qg);
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

            if (document.getElementById(btnID).className != "active") {
                //clear();
                document.getElementById(olddivID).style.display = "none";
                oldbtn.className = "";
                document.getElementById(btnID).className = "active";
                document.getElementById(divID).style.display = "";
                powerPlantMap.getController().loadmjChart(divID, xdate,data_sj, data_qg);
            }
        }
        function detailAnother() {
        	document.getElementById("rlcb_detail").style.display = "none";
        	//document.getElementById("hidden01").style.display = "none";
        	document.getElementById("detail_another").style.display = "";
        	powerPlantMap.getController().loadChartdetail();
        }

        function back_another() {
        	document.getElementById("rlcb_detail").style.display = "";
        	document.getElementById("detail_another").style.display = "none";
        }