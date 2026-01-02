/**
 * 二维码元素渲染器
 * 负责渲染QRCode二维码元素
 */

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { AtlElement, QRCodeProperties } from '../../../../types';
import { resolveBindingValue, getEffectiveContentBinding } from '../../../../utils';

export interface QRCodeElementProps {
  element: AtlElement;
  displayScale: number;
  w: number; // 显示宽度（像素）
  h: number; // 显示高度（像素）
  context: Record<string, any>;
}

/**
 * 二维码元素组件
 */
export const QRCodeElement: React.FC<QRCodeElementProps> = ({
  element,
  displayScale,
  w,
  h,
  context,
}) => {
  const props = element.properties as QRCodeProperties;
  const qrContentBinding = getEffectiveContentBinding(props);
  // 设计器模式:显示数据路径占位符
  const qrCodeContent = resolveBindingValue(qrContentBinding, context, 'string', { showPlaceholder: true }) || 'SAMPLE';

  // 映射纠错等级
  const getErrorCorrectionLevel = (level?: number): 'L' | 'M' | 'Q' | 'H' => {
    switch (level) {
      case 0:
        return 'L';
      case 1:
        return 'M';
      case 2:
        return 'Q';
      case 3:
        return 'H';
      default:
        return 'M'; // 默认中等纠错
    }
  };

  try {
    // 计算QRCode尺寸（取宽高的最小值，保持正方形）
    const qrSize = Math.min(w, h);

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: props.backgroundColor || '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <QRCodeSVG
          value={qrCodeContent}
          size={qrSize}
          level={getErrorCorrectionLevel(props.errorCorrectionLevel)}
          fgColor={props.foregroundColor || '#000000'}
          bgColor={props.backgroundColor || '#FFFFFF'}
          includeMargin={false}
        />
      </div>
    );
  } catch (error) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 10 * displayScale,
          color: '#ff4d4f',
        }}
      >
        二维码错误
      </div>
    );
  }
};
