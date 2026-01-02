/**
 * 图片元素渲染器
 */
import React from 'react';
import { AtlElement, ImageProperties, FitMode } from '../../../../types';
import { resolveBindingValue, getEffectiveSourceBinding } from '../../../../utils';

export interface ImageElementProps {
  element: AtlElement;
  displayScale: number;
  context: Record<string, any>;
}

export const ImageElement: React.FC<ImageElementProps> = ({
  element,
  displayScale,
  context,
}) => {
  const properties = element.properties as ImageProperties;
  const sourceBinding = getEffectiveSourceBinding(properties);
  // 设计器模式:显示数据路径占位符
  const imageSource = resolveBindingValue(sourceBinding, context, 'string', { showPlaceholder: true });

  // 映射适配模式到CSS object-fit
  const getObjectFit = (fitMode?: FitMode): React.CSSProperties['objectFit'] => {
    switch (fitMode) {
      case FitMode.Contain:
        return 'contain';
      case FitMode.Cover:
        return 'cover';
      case FitMode.Fill:
        return 'fill';
      case FitMode.None:
        return 'none';
      default:
        return 'contain';
    }
  };

  if (!imageSource) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12 * displayScale,
          color: '#999',
          userSelect: 'none',
        }}
      >
        图片
      </div>
    );
  }

  // 如果是绑定路径占位符,显示占位符文本而非尝试加载图片
  if (imageSource.startsWith('[') && imageSource.endsWith(']')) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12 * displayScale,
          color: '#999',
          userSelect: 'none',
        }}
      >
        {imageSource}
      </div>
    );
  }

  return (
    <img
      src={imageSource}
      alt="图片"
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      style={{
        width: '100%',
        height: '100%',
        objectFit: getObjectFit(properties.fitMode),
        transform: properties.rotation ? `rotate(${properties.rotation}deg)` : undefined,
        display: 'block',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    />
  );
};
