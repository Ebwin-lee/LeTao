// 让轮播图动起来
// http://dev.dcloud.net.cn/mui/ui/  文字描述文档

var gallery = mui('.mui-slider');
gallery.slider({
  interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
});

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

$('.mui-content').on('click', 'a', function () {
  console.log(1);
})