/*
 * @Author: Lee.mark 
 * @Date: 2018-04-27 10:31:04 
 * @Last Modified by: Lee.mark
 * @Last Modified time: 2018-04-27 10:54:26
 */

$(function () {
  // 获取form控件,调用bootstrapValidator表单校验插件
  $('#form').bootstrapValidator({
      // 默认提示信息
      message: 'This value is not valid',
      // 反馈图标
      feedbackIcons: { /*input状态样式图片*/
        // 合法的图片
        valid: 'glyphicon glyphicon-ok',
        // 非法的图标 
        invalid: 'glyphicon glyphicon-remove',
        // 校验中  
        validating: 'glyphicon glyphicon-refresh'
      },
      fields: { // fields 字段
        // 用户名验证规则
        username: {
          // 验证规则器
          validators: {
            notEmpty: { // 非空验证：提示消息
              message: '用户名不能为空!'
            },
            stringLength: { // 长度验证
              min: 4,
              max: 30,
              message: '用户名长度必须在6到30之间!'
            },
            regexp: { // 特殊符号验证
              regexp: /^[a-zA-Z0-9_\.]+$/,
              message: '用户名由数字字母下划线和.组成!'
            },
            callback: { // 新加字段,提示用户
              message: "用户名不存在!"
            }
          }
        },
        // 密码验证规则
        password: {
          message: '密码无效!',
          validators: {
            notEmpty: {
              message: '密码不能为空!'
            },
            stringLength: {
              min: 6,
              max: 30,
              message: '用户名长度必须在6到30之间!'
            },
            different: { //不能和用户名相同
              field: 'username', //需要进行比较的input name值
              message: '不能和用户名相同!'
            },
            regexp: {
              regexp: /^[a-zA-Z0-9_\.]+$/,
              message: 'The username can only consist of alphabetical, number, dot and underscore' // 默认提示信息
            },
            callback: { // 新加字段,提示用户
              message: '密码错误!'
            }
          }
        }
      }
    })
    /**表单校验事件,表单提交成功触发**/
    .on('success.form.bv', function (e) { //点击提交之后
      // 阻止自动提交行为,需要将表单信息提给bootstrapValidator插件
      e.preventDefault();
      // 获取提交的form标签
      var $form = $(e.target);
      // 获取BootstrapValidator表单校验插件对象
      var bv = $form.data('bootstrapValidator');
      $.ajax({
        type: 'POST', // 请求方式
        url: '/employee/employeeLogin', // 接口地址
        data: $form.serialize(), // 数据类型 
        success: function (result) {
          console.log(result);
          // 校验用户名
          if (result.error == 1000) {
            bv.updateStatus('username', "INVALID", 'callback');
          }
          // 密码错误 更新表单校验状态
          if (result.error == 1001) {
            // 校验密码 INVALID代表不合法
            bv.updateStatus('password', 'INVALID', 'callback');
          }
          // 用户名和密码正确,跳转页面
          if (result.success == true) {
            location.href = './index.html';
          }
        }
      });
    });
});