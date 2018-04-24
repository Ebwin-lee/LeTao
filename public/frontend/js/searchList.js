/*
 * @Author: Lee.mark 
 * @Date: 2018-04-23 16:10:13 
 * @Last Modified by: Lee.mark
 * @Last Modified time: 2018-04-24 19:30:44
 */

$(function (param) {
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

  // 渲染页面,获取搜索关键字 URLSearchParams:用来获取url后面的参数
  var url = new URLSearchParams(location.search);
  // 获取关键字
  var key = url.get('keywords');
  // 获取搜索结果
  getSearchResult(1, key);

  // 按照价格进行排序,获取价格元素,绑定事件
  var priceFlag = true;
  $('.sort li:nth-child(2) a').on('tap', function (param) {
    // 初始化元素样式
    $('.sort li').removeClass('active');
    // 给点击的元素添加红色样式
    $(this).parents('li').addClass('active');
    if (priceFlag == true) {
      // 发送请求,降序排列
      getSearchResult(1, null, 2);
      priceFlag = false;
      // 设置样式
      $(this).find('i').removeClass('fa-angle-up');
      $(this).find('i').addClass('fa-angle-down');
    } else {
      // 升序排列
      getSearchResult(1, null, 1);
      priceFlag = true;
      // 设置样式
      $(this).find('i').removeClass('fa-angle-down');
      $(this).find('i').addClass('fa-angle-up');
    }
  });

  // 按照销量(库存)排列
  // 声明一个变量
  var numFlag = true;
  // 获取元素添加事件
  $(".sort li:nth-child(3) a").on('tap', function () {
    $('.sort li').removeClass('active');
    $(this).parents('li').addClass('active');
    // 判断是升序还是降序
    if (numFlag == true) {
      // 如果是降序 就调用降序排列方法
      getSearchResult(1, null, null, 2);
      // 改变量的值
      numFlag = false;
      // 改样式
      $(this).find('i').removeClass('fa-angle-up');
      $(this).find('i').addClass('fa-angle-down');
    } else {
      // 如果是升序 就调用升序排列方法
      getSearchResult(1, null, null, 1);
      numFlag = true;
      $(this).find('i').removeClass('fa-angle-down');
      $(this).find('i').addClass('fa-angle-up');
    }
  });

  /** 获取搜索按钮,绑定触摸事件 **/ 
  $(".search-btn").on('tap', function () {
    // 获取输入框中的值
    var searchMsg = $('.search-box input').val();
    if (!searchMsg.trim()) {
      mui.alert("请输入关键字");
    } else {
      getProductList(1, searchMsg);
    }
  })

  // 插件函数,上拉刷新,下拉加载
  mui.init({
    pullRefresh: {
      container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可
      down: {
        height: 50, //可选,默认50.触发下拉刷新拖动距离,
        auto: true, //可选,默认false.首次加载自动下拉刷新一次
        contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback: function () {
          // 关闭下拉刷新
          setTimeout(function () {
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
            console.log(1);
            getSearchResult(1, key);
          }, 1000);
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },
      up: {
        height: 50, //可选.默认50.触发上拉加载拖动距离
        auto: true, //可选,默认false.自动上拉加载一次
        contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
        callback: function () {
          console.log(2);
          // true表示没有更多数据了： false代表的是可以继续加载
          this.endPullupToRefresh(true);
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });

  // 点击购买,跳转到商品详情页面,传递商品的id
  $('.lt-sports').on('tap', 'button', function (param) {
    // 获取按钮id,data属性相当于js中的node.dataset
    var id = $(this).data('id');
    // 跳转页面
    location.href = "./detail.html?productId=" + id;
  });
});

/**
 * @param {*} pageNum 代表第几页
 * @param {*} proName 搜索的关键字 
 * @param {*} price  按照价格排序  1升序 2降序
 * @param {*} num    按照库存 1升序 2降序
 */
function getSearchResult(pageNum, proName, price, num) {
  // 根据关键字去搜索结果
  $.ajax({
    type: 'GET',
    url: '/product/queryProduct',
    data: {
      page: pageNum || 1,
      pageSize: 10,
      proName: proName || '',
      price: price || null,  // 价格
      num: num || null  // 库存
    },
    success: function (result) {
      // 渲染页面
      console.log(result);
      var productResult = template('product-template', result);
      // 把数据写到页面上
      $(".lt-sports-content").html(productResult);
    },
  });
}