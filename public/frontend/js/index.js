// ���ֲ�ͼ������
// http://dev.dcloud.net.cn/mui/ui/  ���������ĵ�

var gallery = mui('.mui-slider');
gallery.slider({
  interval: 2000 //�Զ��ֲ����ڣ���Ϊ0���Զ����ţ�Ĭ��Ϊ0��
});

// �������
mui('.mui-scroll-wrapper').scroll({
  scrollY: true, //�Ƿ��������
  scrollX: false, //�Ƿ�������
  startX: 0, //��ʼ��ʱ������x
  startY: 0, //��ʼ��ʱ������y
  indicators: true, //�Ƿ���ʾ������
  deceleration: 0.0006, //����ϵ��,ϵ��ԽС����Խ����
  bounce: true //�Ƿ����ûص�
});

$('.mui-content').on('click', 'a', function () {
  console.log(1);
})