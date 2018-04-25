/*
 * @Author: Lee.mark 
 * @Date: 2018-04-23 16:21:25 
 * @Last Modified by: Lee.mark
 * @Last Modified time: 2018-04-25 15:16:23
 * 商品想起页js
 */

$(function () {
  // 区域滚动
  mui('.mui-scroll-wrapper').scroll({
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
  });
  // 数据展示(页面打开就要去请求数据) 获取url中的productId
  var url = new URLSearchParams(location.search);
  // 调用getProductData
  var id = url.get('productId');
  getProductData(id);
  // 商品选择
  $(".mui-content").on("tap", '.product-size span', function () {
    // 初始化元素样式
    $(".product-size span").removeClass("active");
    // 给点击的元素添加类名
    $(this).addClass("active");
  });

  //添加购物车
  $(".lt-detail-footer .product-cart").on('tap', function () {
    // 数量获取
    var num = mui('.mui-numbox').numbox().getValue();
    console.log(num);
    // 商品ID
    var productId = id;
    // 尺码获取
    var size = $(".product-size span.active").text();
    console.log(size);
    // 调用addCart加入购物车
    addCart(productId, num, size);
  });
});

// 获取商品详情数据
/**
 * 
 * @param {*} productId 商品ID
 */
function getProductData(productId) {
  $.ajax({
    type: 'GET',
    url: '/product/queryProductDetail',
    data: {
      id: productId
    },
    dataType: 'json',
    success: function (result) {
      console.log(result);
      // 渲染整个商品详情页
      var detailResult = template('product-template', result);
      $(".mui-scroll").html(detailResult);
      // 渲染尺码
      var sizeData = result.size; //获取到尺码 "35-45"
      var sizeArray = sizeData.split('-'); //通过-把字符串分隔成数组
      var sizeResult = template('size-template', {
        startNum: sizeArray[0],
        endNum: sizeArray[1]
      });

      $(".product-size").html(sizeResult);
      // 因为num-box是动态添加到页面中的 所以需要手动初始化
      mui('.mui-numbox').numbox()
      // 因为轮播图是动态添加到页面中的 所以也需要初始化
      //获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
      });
    }
  });
}

// 加入购物车
function addCart(productId, num, size) {
  $.ajax({
    type: 'POST',
    url: '/cart/addCart',
    data: {
      productId: productId,
      num: num,
      size: size
    },
    // 在发送请求之前 调用的一个事件 在这里进行参数检测
    beforeSend: function () {
      // 检测商品Id
      if (!productId) {
        mui.toast('产品ID不合法');
        // 阻止提交
        return false;
      }
      if (!num) {
        mui.toast('请选择数量');
        return false;
      }
      if (!size) {
        mui.toast('请选择尺码');
        return false;
      }
    },
    success: function (result) {
      if (result.error == 400) {
        // 将当前的url存储起来
        // 登陆之后 把存起来的参数拿出来作为local.href的地址
        var url = location.href;
        location.href = '../user/login.html?returnUrl=' + url;
      }
      // 判断是否跳转到购物车页面
      if (result.success == true) {
        mui.confirm('是否要去购物车页面', '提示', ['确定', '取消'], function (param) {
          // 判断点击的是确定还是取消
          if (param.index == 0) {
            // 确定
            location.href = '../cart.html';
          } else {
            // 取消,留在当前页
          }
        });
      }
    }
  });
}