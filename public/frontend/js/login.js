/*
 * @Author: Lee.mark 
 * @Date: 2018-04-24 17:16:46 
 * @Last Modified by: Lee.mark
 * @Last Modified time: 2018-04-25 18:45:14
 */

$(function () {
  // 异步登陆 获取点击按钮绑定触摸事件
  $('.login-btn').on('tap', function () {
    // 获取用户信息(用户名和密码)
    // 所有的表单元素要放在form标签中才可以使用serialize();
    var formData = $("#form").serialize(); // jQuery和zepto中序列化得方法
    // 发送ajax请求
    $.ajax({
      type: 'POST',
      url: '/user/login',
      data: formData,
      // 表单校验  表单校验插件
      beforeSend: function () {
        // 如果用户名没有填写 提示用户填写用户名
        if (!$('.mui-input-username').val()) {
          mui.toast("请填写用户名!");
          return false;
        }
        // 如果用户密码没有填写 提示用户填写密码
        if (!$('.mui-input-password').val()) {
          mui.toast("请填写密码!");
          return false;
        }
      },
      success: function (result) {
        console.log(result);
        if (result.error == 403) {
          mui.toast(result.message); // 提示密码错误
        }
        if (result.success == true) {
          // 回跳到上一页 获取地址栏中的returnUrl
          var url = new URLSearchParams(location.search);
          var returnURL = url.get('returnUrl');
          // 判断跳转得路径
          if (!returnURL) {
            // 没有值就跳转到个人页面
            location.href = "../profile.html";
          } else {
            // 有值就跳到相应页面
            location.href = returnURL; 
          }
        }
      },
    });
  });
});