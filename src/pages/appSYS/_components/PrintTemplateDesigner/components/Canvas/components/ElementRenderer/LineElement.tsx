/**
 * 线条元素渲染器
 * 负责渲染线条元素，支持角度、样式等
 */

import React from 'react';
import type { AtlElement, LineProperties, BorderStyle } from '../../../../types';
import { mmToPx } from '../../../../utils';

export interface LineElementProps {
  element: AtlElement;
  displayScale: number;
  dpi: number;
}

/**
 * 线条元素组件
 */
export const LineElement: React.FC<LineElementProps> = ({ element, displayScale, dpi }) => {
  const props = element.properties as LineProperties;

  // 使用properties中的端点坐标
  // 如果properties定义的范围超出element.size，按比例缩放到element.size范围内
  const propStartX = props.startX;
  const propStartY = props.startY;
  const propEndX = props.endX;
  const propEndY = props.endY;

  // 计算properties定义的原始范围
  const propRangeWidth = Math.abs(propEndX - propStartX);
  const propRangeHeight = Math.abs(propEndY - propStartY);

  // 如果properties范围与element.size不同，则按比例缩放
  // 这样拖动调整大小时，线条会按比例跟随
  let scaleX = 1;
  let scaleY = 1;

  if (propRangeWidth > 0 && propRangeWidth !== element.size.width) {
    scaleX = element.size.width / propRangeWidth;
  }

  if (propRangeHeight > 0 && propRangeHeight !== element.size.height) {
    scaleY = element.size.height / propRangeHeight;
  }

  // 应用缩放后的坐标
  const lineStartX = mmToPx(propStartX * scaleX, dpi) * displayScale;
  const lineStartY = mmToPx(propStartY * scaleY, dpi) * displayScale;
  const lineEndX = mmToPx(propEndX * scaleX, dpi) * displayScale;
  const lineEndY = mmToPx(propEndY * scaleY, dpi) * displayScale;

  // 计算线条的角度和长度
  const dx = lineEndX - lineStartX;
  const dy = lineEndY - lineStartY;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  // 映射 BorderStyle 枚举到 CSS borderStyle
  const getBorderStyleCSS = (style?: BorderStyle): string => {
    switch (style) {
      case 0: // BorderStyle.Solid
        return 'solid';
      case 1: // BorderStyle.Dashed
        return 'dashed';
      case 2: // BorderStyle.Dotted
        return 'dotted';
      default:
        return 'solid';
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: lineStartX,
        top: lineStartY,
        width: length,
        // 线条宽度使用精确计算,不四舍五入,支持亚像素渲染
        height: ((props.strokeWidth || 1) / 25.4) * dpi * displayScale,
        background: props.strokeColor || '#000000',
        transformOrigin: 'left center',
        transform: `rotate(${angle}deg)`,
        border: 'none', // 明确设置无边框,线条通过background和height显示
        // Line元素使用absolute定位,需要显式继承父容器的zIndex以保持正确层级
        zIndex: element.zIndex,
      }}
    />
  );
};
