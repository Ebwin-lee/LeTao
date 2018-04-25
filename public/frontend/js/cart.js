/*
 * @Author: Lee.mark 
 * @Date: 2018-04-25 10:48:18 
 * @Last Modified by: Lee.mark
 * @Last Modified time: 2018-04-25 16:54:46
 */

// 初始化MUI框架
mui.init();

// 自调用函数
(function ($) {
  // 页面加载,初始化数据,渲染页面
  getCartData();
  var btnArray = ['确认', '取消'];
  // 删除
  $('#OA_task_1').on('tap', '.mui-btn-red', function (event) {
    // mui-btn-red
    var elem = this;
    // li元素
    var li = elem.parentNode.parentNode;
    mui.confirm('确认删除该商品吗？', '温馨提示', btnArray, function (e) {
      if (e.index == 0) {
        // 需要一个购物车id数组
        var idArray = [];
        // 获取自定义属性
        var id = elem.dataset.id; 
        // 将自定义属性添加进数组中
        idArray.push(id);
        var obj = {
          id: idArray
        }
        // 发送ajax请求
        $.ajax({
          type: 'GET',
          url: '/cart/deleteCart',
          data: obj,
          success: function (result) {
            if (result.success == true) {
              mui.toast("删除成功");
            }
          }
        });
        // 删除元素 
        li.parentNode.removeChild(li);
      } else {
        // 取消删除
        setTimeout(function () {
          $.swipeoutClose(li);
        }, 0);
      }
    });
  });
  // 编辑
  $('#OA_task_1').on('tap', '.mui-btn-blue', function (event) {
    var elem = this; //mui-btn-red
    var li = elem.parentNode.parentNode;
    // 获取编辑商品的数据, 购物车id
    var id = elem.dataset.id;
    // 尺码范围
    var productSize = elem.dataset.productSize;
    var productArr = productSize.split('-');
    // 鞋码
    var size = elem.dataset.size;
    // 数量
    var num = elem.dataset.num;
    // 库存
    var productNum = elem.dataset.productNum;
    // 渲染对象
    var obj = {
      id: id,
      data: productArr,
      size: size,
      num: num,
      productnum: productNum
    }
    // 重新整理数据,将整理好的数据,渲染到模板中
    var editResult = template("edit-template", obj).replace(/\n/g, '');
    mui.confirm(editResult, '编辑商品', btnArray, function (e) {
      if (e.index == 0) {
        // 更新购物车,购物车ID
        var cartId = id;
        // 获取产品尺码,注意mui的使用
        var size = $('span.active')[0].innerHTML;
        // 产品数量
        var num = mui('.mui-numbox').numbox().getValue();
        // 发起Ajax请求
        $.ajax({
          type: 'POST',
          url: '/cart/updateCart',
          data: {
            id: cartId,
            size: size,
            num: num
          },
          success: function (result) {
            if (result.success == true) {
              // 更新页面
              getCartData();
            }
          }
        });
      } else {
        setTimeout(function () { // 设置定时器
          $.swipeoutClose(li);
        }, 0);
      }
    });
    // 手动初始化mui组件
    mui('.mui-numbox').numbox();
  });
})(mui);

// 获取购物车
function getCartData() {
  $.ajax({
    type: "GET",
    url: '/cart/queryCart',
    data: null,
    success: function (result) {
      console.log(result);
      if (result.error == 400) {
        var url = location.href;
        location.href = "./user/login.html?returnUrl=" + url;
      }
      // 绑定模板
      var cartResult = template('cart-template', {
        data: result
      });
      // 渲染页面
      $("#OA_task_1").html(cartResult);
    }
  });
}
// 点击编辑商品中的span 给span添加active类名
$("body").on("tap", '.edit-size span', function () {
  // 删除所有active类名
  $('.edit-size span').removeClass('active');
  // 给当前的span添加active类名
  $(this).addClass('active');
}).on('tap', '.lt-header-refresh', function () {
  /*mui刷新属性*/
  // mui('.mui-content').pullRefresh().pulldownLoading();
});