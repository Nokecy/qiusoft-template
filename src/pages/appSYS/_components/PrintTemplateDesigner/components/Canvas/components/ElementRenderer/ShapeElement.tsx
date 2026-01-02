/**
 * 形状元素渲染器
 * 负责渲染矩形、圆形、三角形、菱形等形状
 */

import React from 'react';
import type { AtlElement, ShapeProperties, ShapeType, TriangleDirection } from '../../../../types';

export interface ShapeElementProps {
  element: AtlElement;
  displayScale: number;
  w: number; // 显示宽度（像素）
  h: number; // 显示高度（像素）
}

/**
 * 形状元素组件
 */
export const ShapeElement: React.FC<ShapeElementProps> = ({ element, displayScale, w, h }) => {
  const props = element.properties as ShapeProperties;
  const strokeWidth = (props.strokeWidth || 1) * displayScale;

  // 根据不同的形状类型渲染不同的图形
  switch (props.shapeType) {
    case 1: // ShapeType.Rectangle
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: props.fillColor,
            border: `${strokeWidth}px solid ${props.strokeColor || '#000000'}`,
            borderRadius: props.borderRadius ? `${props.borderRadius * displayScale}px` : 0,
            boxSizing: 'border-box',
          }}
        />
      );

    case 2: // ShapeType.Circle
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: props.fillColor,
            border: `${strokeWidth}px solid ${props.strokeColor || '#000000'}`,
            borderRadius: '50%',
            boxSizing: 'border-box',
          }}
        />
      );

    case 5: { // ShapeType.Triangle
      // 三角形 - 使用 CSS border 技巧
      const direction = props.triangleDirection || 1; // TriangleDirection.Up
      const triangleStyles: React.CSSProperties = {
        width: 0,
        height: 0,
        borderStyle: 'solid',
      };

      switch (direction) {
        case 1: // TriangleDirection.Up
          triangleStyles.borderWidth = `0 ${w / 2}px ${h}px ${w / 2}px`;
          triangleStyles.borderColor = `transparent transparent ${props.fillColor || '#FFFFFF'} transparent`;
          break;
        case 2: // TriangleDirection.Down
          triangleStyles.borderWidth = `${h}px ${w / 2}px 0 ${w / 2}px`;
          triangleStyles.borderColor = `${props.fillColor || '#FFFFFF'} transparent transparent transparent`;
          break;
        case 3: // TriangleDirection.Left
          triangleStyles.borderWidth = `${h / 2}px ${w}px ${h / 2}px 0`;
          triangleStyles.borderColor = `transparent ${props.fillColor || '#FFFFFF'} transparent transparent`;
          break;
        case 4: // TriangleDirection.Right
          triangleStyles.borderWidth = `${h / 2}px 0 ${h / 2}px ${w}px`;
          triangleStyles.borderColor = `transparent transparent transparent ${props.fillColor || '#FFFFFF'}`;
          break;
      }

      return <div style={triangleStyles} />;
    }

    case 6: // ShapeType.Diamond
      // 菱形 - 使用旋转的正方形
      const size = Math.min(w, h);
      return (
        <div
          style={{
            width: size,
            height: size,
            backgroundColor: props.fillColor,
            border: `${strokeWidth}px solid ${props.strokeColor || '#000000'}`,
            transform: 'rotate(45deg)',
            transformOrigin: 'center',
            position: 'absolute',
            left: (w - size) / 2,
            top: (h - size) / 2,
            boxSizing: 'border-box',
            // Diamond使用absolute定位居中,需要显式继承父容器的zIndex
            zIndex: element.zIndex,
          }}
        />
      );

    default:
      // 默认渲染矩形
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: props.fillColor,
            border: `${strokeWidth}px solid ${props.strokeColor || '#000000'}`,
            boxSizing: 'border-box',
          }}
        />
      );
  }
};
