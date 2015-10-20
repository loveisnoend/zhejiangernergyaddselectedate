// 皮肤切换，更换CSS文件
function changeSkinCss(pageName) {
 
    var skinNameAlter = $('.userSkin').html();
    if (skinName == '夜间模式') {
        $('#homeCss').attr("href","css/homeHighlight.css");
        $('#bottomButCss').attr("href","css/bottom_buttonHighlight.css");
        $('#tabCss').attr("href","css/tabHighlight.css");
        $('#performanceCss').attr("href","css/PerformanceHightlight.css");
        $('#powerPlantMapCss').attr("href","css/powerPlantMapHighlight.css");
        $('#internetPowerVolumeCss').attr("href","css/internetPowerVolumeHighlight.css");
        $('.userSkin').html('高亮模式');
        skinName = '高亮模式';
    } else {
        $('#homeCss').attr("href","css/home.css");
        $('#bottomButCss').attr("href","css/bottom_button.css");
        $('#tabCss').attr("href","css/tab.css");
        $('#performanceCss').attr("href","css/Performance.css");
        $('#powerPlantMapCss').attr("href","css/powerPlantMap.css");
        $('#internetPowerVolumeCss').attr("href","css/internetPowerVolume.css");
        $('.userSkin').html('夜间模式');
        skinName = '夜间模式';
    }
    skinNameAlter = $('.userSkin').html();
    alert('您将切换到'+skinNameAlter);
    if (pageName == 'internetPowerVolume') {
        internetPowerVolume.getController()._loadData01();
    }
    if (pageName == 'powerPlantMap') {
        powerPlantMap.getController()._loadData01(); 
    }
    if (pageName == 'internetVolume') {
        internetVolume.getController()._loadData01(); 
    }
    if (pageName == 'othersCost') {
        othersCost.getController()._loadData01(); 
    }
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
    // CPI环比
    if (valueCPIhuanbi > 0) {
        $('.valueCPIhuanbiIDClass').html(valueCPIhuanbi+"%↑");
        $('.valueCPIhuanbiIDClass').css('color','.32FF32');
    } else {
        $('.valueCPIhuanbiIDClass').html(valueCPIhuanbi+"%↓");
        $('.valueCPIhuanbiIDClass').css('color','red');
    }
    // GDP增长率
    if (valueGDP > 0) {
        $('.valueGDPIDClass').html(valueGDP+"%↑");
        $('.valueGDPIDClass').css('color','.32FF32');
    } else {
        $('.valueGDPIDClass').html(valueGDP+"%↓");
        $('.valueGDPIDClass').css('color','red');
    }
    // CPI同比
    if (valueCPItongbi > 0) {
        $('.valueCPItongbiIDClass').html(valueCPItongbi+"%↑");
        $('.valueCPItongbiIDClass').css('color','.32FF32');
    } else {
        $('.valueCPItongbiIDClass').html(valueCPItongbi+"%↓");
        $('.valueCPItongbiIDClass').css('color','red');
    }
    // PPI同比
    if (parseFloat(valuePPItongbi) > 0) {
        $('.valuePPItongbiIDClass').html(valuePPItongbi+"%↑");
        $('.valuePPItongbiIDClass').css('color','.32FF32');
    } else {
        $('.valuePPItongbiIDClass').html(valuePPItongbi+"%↓");
        $('.valuePPItongbiIDClass').css('color','red');
    }
    // 制造业-同比 PMI
    if (valuePMIproduce > 0) {
        $('.valuePMIproduceIDClass').html(valuePMIproduce+"%↑");
        $('.valuePMIproduceIDClass').css('color','.32FF32');
    } else {
        $('.valuePMIproduceIDClass').html(valuePMIproduce+"%↓");
        $('.valuePMIproduceIDClass').css('color','red');
    }
    // 非制造业-同比
    if (valuePMInonProduce > 0) {
        $('.valuePMInonProduceIDClass').html(valuePMInonProduce+"%↑");
        $('.valuePMInonProduceIDClass').css('color','.32FF32');
    } else {
        $('.valuePMInonProduceIDClass').html(valuePMInonProduce+"%↓");
        $('.valuePMInonProduceIDClass').css('color','red');
    }
    // GDP总值
    $('.valueGDPTotalIDClass').html(valueGDPTotal);
}