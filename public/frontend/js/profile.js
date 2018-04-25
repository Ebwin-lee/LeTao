/*
 * @Author: Lee.mark 
 * @Date: 2018-04-25 10:48:25 
 * @Last Modified by: Lee.mark
 * @Last Modified time: 2018-04-25 10:55:44
 */

$(function () {
  // 获取用户信息
  getUserData();
  // 点击退出按钮 跳转到登陆页面
  $(".btn_outLogin").on('tap', function () {
    $.ajax({
      type: 'GET',
      url: '/user/logout',
      data: null,
      success: function (result) {
        if (result.success == true) {
          location.href = "./user/login.html";
        }
      }
    });
  });
});

// 自定义获取用户信息函数
function getUserData() {
  $.ajax({
    type: 'GET',
    url: '/user/queryUserMessage',
    data: null,
    success: function (result) {
      if (result.error == 400) { // 用户信息不正确会跳转至用户登录页 
        var url = location.href;
        location.href = './user/login.html?returnUrl=' + url;
      }
      // 页面渲染
      var centerResult = template("center-template", result);
      $('.account').html(centerResult);
    }
  });
}