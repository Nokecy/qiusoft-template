import React, { useEffect, useRef } from 'react';
import { Modal } from 'antd';

interface DrawingViewerProps {
  visible: boolean;
  onClose: () => void;
  modelUrl: string; // 轻量化模型文件夹的URL
  title?: string;
  fingerHttp?: string; // 云API地址
  drawingType?: number; // 图纸类型: 0-未指定, 1-2D图纸, 2-3D图纸/模型
}

const DrawingViewer: React.FC<DrawingViewerProps> = ({
  visible,
  onClose,
  modelUrl,
  title = '图纸预览',
  fingerHttp, // 从外部传入或使用配置文件中的地址
  drawingType = 2, // 默认3D图纸
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 从配置文件中读取 fingerHttp 地址，如果外部传入则优先使用外部传入的
  const getFingerHttpUrl = () => {
    if (fingerHttp) {
      return fingerHttp;
    }
    // 从 window.serverUrl 配置中读取
    const serverUrl = (window as any).serverUrl;
    return serverUrl?.fingerHttpServerUrl || 'http://192.168.2.2:8090'; // 提供默认值
  };

  const fingerHttpUrl = getFingerHttpUrl();

  useEffect(() => {
    console.log('DrawingViewer useEffect 触发', { visible, modelUrl, hasContainer: !!containerRef.current });

    if (visible && modelUrl) {
      // 延迟初始化，确保容器已渲染
      setTimeout(() => {
        const cleanup = initViewer();
        return cleanup;
      }, 100);
    }
  }, [visible, modelUrl]);

  const initViewer = () => {
    console.log('initViewer 开始执行', { hasContainer: !!containerRef.current });
    if (!containerRef.current) {
      console.error('containerRef.current 不存在');
      return;
    }

    console.log('初始化查看器，模型URL:', modelUrl);

    // 使用独立的 HTML 文件，通过 URL 参数传递配置
    const encodedModelUrl = encodeURIComponent(modelUrl);
    const encodedFingerHttp = encodeURIComponent(fingerHttpUrl);
    const viewerUrl = `/drawing-viewer.html?modelUrl=${encodedModelUrl}&fingerHttp=${encodedFingerHttp}&drawingType=${drawingType}`;

    console.log('查看器页面URL:', viewerUrl);

    // 创建 iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'drawing-viewer-iframe';
    iframe.src = viewerUrl;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.setAttribute('allowfullscreen', 'true');

    // 清空容器并添加 iframe
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(iframe);

    console.log('iframe 已创建并添加到容器');

    // 监听来自 iframe 的消息
    const handleMessage = (event: MessageEvent) => {
      console.log('收到消息:', event.data);
      if (event.data?.type === 'modelLoaded') {
        console.log('模型加载完成');
      }
    };

    window.addEventListener('message', handleMessage);

    // iframe load 事件
    iframe.onload = () => {
      console.log('外层 iframe 已加载');
    };

    // 监听 iframe 内的错误
    iframe.onerror = (error) => {
      console.error('iframe 加载错误:', error);
    };

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  };

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onClose}
      footer={null}
      width="98%"
      style={{ top: 5, maxWidth: 'none', paddingBottom: 0 }}
      styles={{
        body: {
          height: 'calc(100vh - 60px)',
          padding: 0
        }
      }}
      destroyOnClose
    >
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: 'calc(100vh - 60px)',
        }}
      />
    </Modal>
  );
};

export default DrawingViewer;
