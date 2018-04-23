$(function (param) {
  // ��ʼ����¼�б�
  showHistory();
  // ��ȡ������ť,���¼�,û��������ʾ��������,��������ת���������ҳ��
  $('.search-btn').on('tap', function (param) {
    // ��ȡ������е�����
    var keywords = $.trim($('.search-box input').val());
    // �ж����������������
    if (keywords == '') {
      mui.toast('������ؼ���'); // û�����ݲ���ʾ
    } else {
      // ����������,�����ó���ʷ��¼
      setHistory(keywords);
      $('.search-box input').val('');
      // ��ת���������ҳ��
      location.href = './searchList.html?' + 'keywords=' + keywords;
    }
  });
  // ���ĳ����¼�е�����,��ת����������б�
  $('.history').on('tap', '.history-list span', function (param) {
    // ��ȡ�����Ԫ�ص��ı�
    var keywords = $(this).text();
    // ��תҳ��
    location.href = './searchList.html?' + 'keywords=' + keywords;
  });
  // ���ɾ����ťɾ��һ����ʷ��¼,������Ⱦ�б�
  $('.history').on('tap', '.history-list i', function (param) {
    // �ҵ�ɾ���Ĺؼ���
    var text = $(this).siblings('span').text();
    // ����ɾ������
    delHistory(text);
    // ������Ⱦҳ��
    showHistory();
  });
  // �����հ�ť,�����ʷ��¼
  $('.history').on('tap', '.clear', function (param) {
    // ������պ���
    clearHistory();
    // ������Ⱦ�б�
    showHistory();
  });
});

// ��ȡ��ʷ��¼
function getHistory(param) {
  // ��json����ת�ɶ���
  return JSON.parse(window.localStorage.getItem('leTaoHistory') || '[]');
}

// ������ʷ��¼
function setHistory(key) {
  // ��ȡ��ʷ��¼
  var historyArray = getHistory();
  // ������ȡ����ʷ��¼
  $.each(historyArray, function (index, item) {
    // �ж�������Ĺؼ����Ƿ������ʷ��¼��
    if (item == key) {
      // ���ھͽ�ɾ��
      historyArray.splice(index, 1);
    }
  });
  // ���¹ؼ�����ӵ���ʷ��¼������
  historyArray.push(key);
  // ������ת���ַ���,����localStorage��
  window.localStorage.setItem('leTaoHistory', JSON.stringify(historyArray));
}

// չʾ��ʷ��¼
function showHistory(param) {
  // ��ȡ��ʷ��¼
  var historyArray = getHistory();
  // ����ģ���������
  var historyResult = template('history-template', {
    arr: historyArray // �ӿ��ĵ��ж���� arr
  });
  // ��������Ⱦ��ҳ���б���
  $('.history').html(historyResult);
}
// ����չʾ��ʷ��¼����
showHistory();

// ɾ����ʷ��¼����
function delHistory(key) {
  // ��ȡ��ʷ��¼
  var historyArray = getHistory();
  // ������¼��ɾ��
  $.each(historyArray, function (index, item) {
    if (item == key) {
      historyArray.splice(index, 1);
    }
  });
  // ������ת���ַ���,����localStorage��
  window.localStorage.setItem('leTaoHistory', JSON.stringify(historyArray));
}

// �����ʷ��¼����
function clearHistory(param) {
  window.localStorage.removeItem('leTaoHistory');
}