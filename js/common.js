// 皮肤切换，更换CSS文件
function changeSkinCss(pageName) {
    var skinNameAlter = $('.userSkin').html();
    if (skinName == '夜间模式') {
        skinName = '高亮模式';
    } else {
        skinName = '夜间模式';
    }
    skinNameAlter = $('.userSkin').html();
    if (pageName == 'help') {
        changeTheSkinOfPage();
    }
    if (pageName == 'home01') {
        isHomeLoad = false;
        home.getController()._loadData01();
    }
    if (pageName == 'home02') {
        isHome02Load = false;
        home02.getController()._loadData01();
    }
    if (pageName == 'home03') {
        isHome03Load = false;
        home03.getController()._loadData01();
    }
    if (pageName == 'home04') {
        isHome04Load = false;
        home04.getController()._loadData01();
    }
    if (pageName == 'home05') {
        changeTheSkinOfPage();
    }
    if (pageName == 'home06') {
        isHome06Load = false;
        home06.getController()._loadData01();
    }
    if (pageName == 'home07') {
        changeTheSkinOfPage();
    }
    if (pageName == 'home08') {
        isHome08Load = false;
        home08.getController()._loadData01();
    }
    if (pageName == 'internetPowerVolume') {
        isInternetPowerVolumeLoad = false;
        internetPowerVolume.getController()._loadData01();
    }
    if (pageName == 'powerPlantMap') {
        isPowerPlantMapLoad = false;
        powerPlantMap.getController()._loadData01(); 
    }
    if (pageName == 'internetVolume') {
        isInternetVolumeLoad = false;
        internetVolume.getController()._loadData01(); 
    }
    if (pageName == 'othersCost') {
        isOthersCostLoad = false;
        othersCost.getController()._loadData01(); 
    }
    if (pageName == 'powerIncome') {
        isPowerIncomeLoad = false;
        powerIncome.getController()._loadData01(); 
    }
    if (pageName == 'mainBusiness') {
        isMainBusinessLoad = false;
        mainBusiness.getController()._loadData01(); 
    }
    if (pageName == 'heatIncome') {
        isHeatIncomeLoad = false;
        heatIncome.getController()._loadData01(); 
    }
    if (pageName == 'labourIncome') {
        isLabourIncomeLoad = false;
        labourIncome.getController()._loadData01(); 
    }
    if (pageName == 'othersIncome') {
        isOthersIncomeLoad = false;
        othersIncome.getController()._loadData01(); 
    }
    if (pageName == 'averBusinessIncome') {
        changeTheSkinOfPage();
        averBusinessIncome.getController()._loadData01(); 
    }
    if (pageName == 'workerCount') {
        changeTheSkinOfPage();
        workerCount.getController()._loadData01(); 
    }
    if (pageName == 'workerCountPerHour') {
        changeTheSkinOfPage();
        workerCountPerHour.getController()._loadData01(); 
    }
    if (pageName == 'workerCost') {
        changeTheSkinOfPage();
        workerCost.getController()._loadData01(); 
    }
    if (pageName == 'workerCostPerHour') {
        changeTheSkinOfPage();
        workerCostPerHour.getController()._loadData01(); 
    }
    if (pageName == 'pureProfit') {
        pureProfit.getController()._loadData01(); 
    }
    if (pageName == 'pureProperty') {
        pureProperty.getController()._loadData01(); 
    }
    if (pageName == 'sumProperty') {
        sumProperty.getController()._loadData01(); 
    }
    if (pageName == 'salesPercent') {
        salesPercent.getController()._loadData01(); 
    }
    if (pageName == 'propertyPercent') {
        propertyPercent.getController()._loadData01(); 
    }
    if (pageName == 'performance') {
        isPerformaneceLoad = false;
        Performance.getController()._loadData01(); 
    }
    if (pageName == 'tab') {
        changeTheSkinOfPage();
    }
    if (pageName == 'safeProduceDays') {
        changeTheSkinOfPage();
        safeProduceDays.getController()._loadData01(); 
    }
}
// change the skin of the page
function changeTheSkinOfPage() {
    if (skinName == '高亮模式') {
        $('#homeCss').attr("href","css/homeHighlight.css");
        $('#helpCss').attr("href","css/helpHighlight.css");
        $('#bottomButCss').attr("href","css/bottom_buttonHighlight.css");
        $('#tabCss').attr("href","css/tabHighlight.css");
        $('#performanceCss').attr("href","css/PerformanceHightlight.css");
        $('#mainBusinessCss').attr("href","css/mainBusinessHightlight.css");
        $('#powerPlantMapCss').attr("href","css/powerPlantMapHighlight.css");
        $('#internetPowerVolumeCss').attr("href","css/internetPowerVolumeHighlight.css");
        $('.userSkin').html('高亮模式');
    } else {
        $('#homeCss').attr("href","css/home.css");
        $('#helpCss').attr("href","css/help.css");
        $('#bottomButCss').attr("href","css/bottom_button.css");
        $('#tabCss').attr("href","css/tab.css");
        $('#performanceCss').attr("href","css/Performance.css");
        $('#mainBusinessCss').attr("href","css/mainBusiness.css");
        $('#powerPlantMapCss').attr("href","css/powerPlantMap.css");
        $('#internetPowerVolumeCss').attr("href","css/internetPowerVolume.css");
        $('.userSkin').html('夜间模式');
    }
    skinNameAlter = $('.userSkin').html();
    // alert('您将切换到'+skinNameAlter);
}
// 个人设定，用户名，肤色JS CSS 控制
function userHoverOn(classNameId) {
  // 登录用户
  if (classNameId != 'userNameCon') {
      $('.userNameCon').css({
        "display":"none"
      });
  } 
  // 设置
  if (classNameId != 'userSettingCon') {
      $('.userSettingCon').css({
        "display":"none"
      });
  } 
  // 帮助
  if (classNameId != 'userHelpCon') {
      $('.userHelpCon').css({
        "display":"none"
      });
  } 
  // 换肤
  if (classNameId != 'userSkinCon') {
      $('.userSkinCon').css({
        "display":"none"
      });
  } 
  //鼠标悬浮
  $('.'+classNameId).css({
    "display":"inline"
  });
}
function userHoverOut(classNameId) {
//   //鼠标悬浮
//   $('.'+classNameId).css({
//     "display":"none"
//   });
}
// 设定头部跑马灯信息
function _loadData03(valueCPIhuanbi,valueGDP,valueCPItongbi,valuePPItongbi,valuePMIproduce,valuePMInonProduce,valueGDPTotal){
    $('.userName').html(usrid);
    // 最新消息
    var newMsg = '系统版本已有更新，详情请查看帮助文档！！！';
    if (newMsg != '') {
        $('.newMsgIdClass').html(newMsg);
        $('.newMsgIdClass').css('color','#C51616');
    }
    // CPI环比
    if (valueCPIhuanbi > 0) {
        $('.valueCPIhuanbiIDClass').html(valueCPIhuanbi+"%↑");
        if (skinName == '夜间模式') {
            $('.valueCPIhuanbiIDClass').css('color','green');
        } else {
            $('.valueCPIhuanbiIDClass').css('color','white');
        }
    } else {
        $('.valueCPIhuanbiIDClass').html(valueCPIhuanbi+"%↓");
        $('.valueCPIhuanbiIDClass').css('color','red');
    }
    // GDP增长率
    if (valueGDP > 0) {
        $('.valueGDPIDClass').html(valueGDP+"%↑");
        if (skinName == '夜间模式') {
            $('.valueGDPIDClass').css('color','green');
        } else {
            $('.valueGDPIDClass').css('color','white');
        }
    } else {
        $('.valueGDPIDClass').html(valueGDP+"%↓");
        $('.valueGDPIDClass').css('color','red');
    }
    // CPI同比
    if (valueCPItongbi > 0) {
        $('.valueCPItongbiIDClass').html(valueCPItongbi+"%↑");
        if (skinName == '夜间模式') {
            $('.valueCPItongbiIDClass').css('color','green');
        } else {
            $('.valueCPItongbiIDClass').css('color','white');
        }
    } else {
        $('.valueCPItongbiIDClass').html(valueCPItongbi+"%↓");
        $('.valueCPItongbiIDClass').css('color','red');
    }
    // PPI同比
    if (parseFloat(valuePPItongbi) > 0) {
        $('.valuePPItongbiIDClass').html(valuePPItongbi+"%↑");
        if (skinName == '夜间模式') {
            $('.valuePPItongbiIDClass').css('color','green');
        } else {
            $('.valuePPItongbiIDClass').css('color','white');
        }
    } else {
        $('.valuePPItongbiIDClass').html(valuePPItongbi+"%↓");
        $('.valuePPItongbiIDClass').css('color','red');
    }
    // 制造业-同比 PMI
    if (valuePMIproduce > 0) {
        $('.valuePMIproduceIDClass').html(valuePMIproduce+"%↑");
        if (skinName == '夜间模式') {
            $('.valuePMIproduceIDClass').css('color','green');
        } else {
            $('.valuePMIproduceIDClass').css('color','white');
        }
    } else {
        $('.valuePMIproduceIDClass').html(valuePMIproduce+"%↓");
        $('.valuePMIproduceIDClass').css('color','red');
    }
    // 非制造业-同比
    if (valuePMInonProduce > 0) {
        $('.valuePMInonProduceIDClass').html(valuePMInonProduce+"%↑");
        if (skinName == '夜间模式') {
            $('.valuePMInonProduceIDClass').css('color','green');
        } else {
            $('.valuePMInonProduceIDClass').css('color','white');
        }
    } else {
        $('.valuePMInonProduceIDClass').html(valuePMInonProduce+"%↓");
        $('.valuePMInonProduceIDClass').css('color','red');
    }
    // GDP总值
    valueGDPTotal = (valueGDPTotal/10000).toFixed(1);
    if (valueGDPTotal > 0) {
        $('#GDPSum').html(valueGDPTotal);
        if (skinName == '夜间模式') {
            $('#GDPSum').css('color','green');
        } else {
            $('#GDPSum').css('color','white');
        }
    } else {
        $('#GDPSum').html(valueGDPTotal);
        $('#GDPSum').css('color','red');
    }
    var tempDate = new Date();
    var thisYear = tempDate.getFullYear();
    var thisMonth = tempDate.getMonth()+1;
    var thisDate = tempDate.getDate();
    var nowDate = thisYear + '年' + thisMonth + '月' + thisDate + '日';
    // 今天的日期
    $('.nowDateClass').html(nowDate);
    
    
}