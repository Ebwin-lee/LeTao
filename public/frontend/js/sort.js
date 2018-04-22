// 分类页

$(function (param) {

  // 自定义函数来用来渲染一级菜单
  var getFirstCategory = function (param) {
    // 发送ajax请求
    $.ajax({
      type: 'GET',
      url: '/category/queryTopCategory',
      data: null,
      dataType: 'json',
      beforeSend: function () {
        // 显示图片
        $('.mui-content .loading').show();
      },
      success: function (result) {
        // 测试数据
        console.log(result);
        // 引用模板数据
        var firstResult = template('first-template', result);
        // 将数据渲染到页面的ul中
        $('.first-category').html(firstResult);
        // 默认选中第一项
        getFirstCategory(result.rows[0].id);
      },
      complete: function (param) {
        // 隐藏图片
        $('.mui-content .loading').hide();
      }
    });
  }

  // 自定义二级菜单模板函数
  var getSecondCategory = function (id) {
    // 查看文档,发送ajax请求
    $.ajax({
      type: 'GET',
      url: '/category/querySecondCategory',
      data: {
        id: id
      },
      success: function (result) {
        // 调用模板,渲染数据
        var secondResult = template('second-template', result);
        // 将数据渲染到页面制定位置
        $('.second-category').html(secondResult);
      }
    });
  }

  // 调用一级模板函数
  getFirstCategory();

  // 点击一级菜单,联动二级菜单
  $('first-category').on('tap', 'a', function (param) {
    // 删除带有的active的类名
    $('first-category li').removeClass('active');
    // 给当前li添加active类
    $(this).parents('li').addClass('active');
    // 获取自定义的属性值 data-id
    var id = $(this).attr('data-id');
    // 将自定义的属性值传入二级菜单函数
    getSecondCategory(id);
  });

  // 给右边列表详情区域添加滚动
  mui('.mui-scroll-wrapper').scroll({
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
  });
});