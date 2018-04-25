/*
 * @Author: Lee.mark 
 * @Date: 2018-04-25 10:48:05 
 * @Last Modified by:   Lee.mark 
 * @Last Modified time: 2018-04-25 10:48:05 
 */

$(function () {
  // 点击获取短信验证
  $(".btn_getCode").on('tap', function () {
    // 定义遍历保存当前this
    var _this = $(this);
    //  在60s以内不让用户再次点击
    if (_this.hasClass('btn_disabled')) {
      return false;
    }
    // 发送ajax请求
    $.ajax({
      type: 'GET',
      url: '/user/vCode',
      data: null,
      success: function (result) {
        console.log(result);
        // 倒计时 声明一个总时间
        var sumTime = 60;
        // 声明一个定时器
        var timer = setInterval(function () {
          // 让时间一秒减去1
          sumTime--;
          // 把时间写到按钮中去
          _this.html(sumTime + '秒后再获取');
          // 让按钮变成灰色
          _this.addClass('btn_disabled');
          // 清除定时器
          if (sumTime <= 0) {
            clearInterval(timer);
            // 把按钮的颜色变回来
            _this.removeClass('btn_disabled');
            // 把内容变回来
            _this.html('获取验证码');
          }
        }, 1000);
      }
    });
  });

  // 获取注册按钮,绑定事件
  $('.btn_register').on('tap', function () {
    // 获取账号和密码
    var username = $('input[name="mobile"]').val();
    var password = $('input[name="pass"]').val();
    var vCode = $('input[name="code"]').val();
    var data = {
      username: username,
      password: password,
      mobile: username,
      vCode: vCode
    };
    // 发送ajax请求
    $.ajax({
      type: 'POST',
      url: '/user/register',
      data: data,
      beforeSend: function () {
        // 校验用户名
        if (!$('input[name="mobile"]').val()) {
          mui.toast("用户名不能为空");
          return false;
        }
        // 校验密码
        if (!$('input[name="pass"]').val()) {
          mui.toast("密码不能为空");
          return false;
        }
        // 校验确认密码
        if ($('input[name="pass"]').val() != $('input[name="rePass"]').val()) {
          mui.toast("两次密码不一致");
          return false;
        }
        // 校验认证码
        if (!$('input[name="code"]').val()) {
          mui.toast("请点击右侧按钮获取");
          return false;
        }
      },
      success: function (result) {
        if (result.error == 401) {
          mui.toast(result.message); // 输入错误
        }
        if (result.success == true) {
          location.href = "./login.html"; // 输入正确,登录成功跳转至登录页
        }
      }
    });
  });
});