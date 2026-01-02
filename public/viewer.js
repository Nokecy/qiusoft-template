var nd_viewCtrl = {
  src: '', // 轻量化模型地址
  fingerHttp: 'http://192.168.2.2:8090', // 云API地址,如:http://192.1.1.1:8000
  drawingType: 2, // 图纸类型: 0-未指定, 1-2D图纸, 2-3D图纸/模型
  /** init初始化方法 */
  init: function (opt) {
    // 设置轻量化文件路径
    this.src = opt.src;
    // 根据图纸类型选择查看器
    var viewerPath = this.drawingType === 1 ? '2DViewer/index.html' : '3DViewer/index.html';
    // 加载Viewer资源。src路径填写实际存放Viewer资源的地址
    document.querySelector("#iframeDiv").innerHTML = '<iframe id="viewer" src="' + viewerPath + '" allowFullScreen></iframe>';
  },
  /** 模型加载完成回调方法 */
  initLoad: function () { //加载完成
    console.log('model loaded!');
  },
  /** 截图方法参考 */
  screenshot: function (cc) {
    // 获取Viewer全局对象
    var _contentWindow = document.getElementById("viewer").contentWindow;
    // 调用控制类接口
    _contentWindow && _contentWindow.nd_screenCapture(function (base64Img) {
      cc && cc(base64Img);
    });
  },
  /** 其它方法 */
  //...
}
