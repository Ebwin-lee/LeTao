$(function (param) {
  // 初始化记录列表
  showHistory();
  // 获取搜索按钮,绑定事件,没有内容提示输入内容,有内容跳转到搜索结果页面
  $('.search-btn').on('tap', function (param) {
    // 获取输入框中的内容
    var keywords = $.trim($('.search-box input').val());
    // 判断输入框中有无内容
    if (keywords == '') {
      mui.toast('请输入关键字'); // 没有内容并提示
    } else {
      // 输入了内容,就设置成历史记录
      setHistory(keywords);
      $('.search-box input').val('');
      // 跳转到搜索结果页面
      location.href = './searchList.html?' + 'keywords=' + keywords;
    }
  });
  // 点击某条记录中的文字,跳转到搜索结果列表
  $('.history').on('tap', '.history-list span', function (param) {
    // 获取点击的元素的文本
    var keywords = $(this).text();
    // 跳转页面
    location.href = './searchList.html?' + 'keywords=' + keywords;
  });
  // 点击删除按钮删除一条历史记录,重新渲染列表
  $('.history').on('tap', '.history-list i', function (param) {
    // 找到删除的关键字
    var text = $(this).siblings('span').text();
    // 调用删除函数
    delHistory(text);
    // 重新渲染页面
    showHistory();
  });
  // 点击清空按钮,清空历史记录
  $('.history').on('tap', '.clear', function (param) {
    // 调用清空函数
    clearHistory();
    // 重新渲染列表
    showHistory();
  });
});

// 获取历史记录
function getHistory(param) {
  // 将json数据转成对象
  return JSON.parse(window.localStorage.getItem('leTaoHistory') || '[]');
}

// 设置历史记录
function setHistory(key) {
  // 获取历史记录
  var historyArray = getHistory();
  // 遍历获取的历史记录
  $.each(historyArray, function (index, item) {
    // 判断新输入的关键字是否存在历史记录中
    if (item == key) {
      // 存在就将删除
      historyArray.splice(index, 1);
    }
  });
  // 将新关键字添加到历史记录数组中
  historyArray.push(key);
  // 将数组转成字符串,放入localStorage中
  window.localStorage.setItem('leTaoHistory', JSON.stringify(historyArray));
}

// 展示历史记录
function showHistory(param) {
  // 获取历史记录
  var historyArray = getHistory();
  // 调用模板添加数据
  var historyResult = template('history-template', {
    arr: historyArray // 接口文档中定义的 arr
  });
  // 将数据渲染到页面列表中
  $('.history').html(historyResult);
}
// 调用展示历史记录函数
showHistory();

// 删除历史记录函数
function delHistory(key) {
  // 获取历史记录
  var historyArray = getHistory();
  // 遍历记录并删除
  $.each(historyArray, function (index, item) {
    if (item == key) {
      historyArray.splice(index, 1);
    }
  });
  // 将数组转成字符串,放入localStorage中
  window.localStorage.setItem('leTaoHistory', JSON.stringify(historyArray));
}

// 清空历史记录函数
function clearHistory(param) {
  window.localStorage.removeItem('leTaoHistory');
}