/**
 * DataMatrix条码组件
 * 使用bwip-js库生成DataMatrix码
 */
import React, { useRef, useEffect } from 'react';
import bwipjs from 'bwip-js';

export interface DataMatrixComponentProps {
  content: string;
  width: number;
  height: number;
  foregroundColor?: string;
  backgroundColor?: string;
}

export const DataMatrixComponent: React.FC<DataMatrixComponentProps> = ({
  content,
  width,
  height,
  foregroundColor = '#000000',
  backgroundColor = '#FFFFFF',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      // 使用bwip-js生成DataMatrix码
      bwipjs.toCanvas(canvasRef.current, {
        bcid: 'datamatrix',           // 条码类型
        text: content || 'SAMPLE',    // 条码内容
        scale: 3,                     // 缩放因子
        height: 10,                   // 条码高度（模块数）
        includetext: false,           // 不包含文本
        textxalign: 'center',         // 文本对齐
      });

      // 可选：调整canvas尺寸以适应容器
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // 保存原始图像数据
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // 调整canvas尺寸
        canvas.width = width;
        canvas.height = height;

        // 重绘图像并缩放
        ctx.putImageData(imageData, 0, 0);
      }
    } catch (error) {
      console.error('DataMatrix生成失败:', error);
    }
  }, [content, width, height, foregroundColor, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      }}
    />
  );
};
