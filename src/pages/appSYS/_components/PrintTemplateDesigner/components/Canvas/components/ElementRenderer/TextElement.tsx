/**
 * 文本元素渲染器
 */
import React from 'react';
import type {
  AtlElement,
  TextProperties,
  MultilineTextProperties,
} from '../../../../types';
import {
  ptToPx,
  resolveBindingValue,
  getEffectiveTextBinding,
} from '../../../../utils';

export interface TextElementProps {
  element: AtlElement;
  dpi: number;
  displayScale: number;
  context: Record<string, any>;
}

export const TextElement: React.FC<TextElementProps> = ({
  element,
  dpi,
  displayScale,
  context,
}) => {
  const properties = element.properties as TextProperties | MultilineTextProperties;
  const isMultiline = element.type === 1; // ElementType.MultilineText

  const textBinding = getEffectiveTextBinding(properties as any);
  // 设计器模式：显示数据路径占位符
  const textValue = resolveBindingValue(textBinding, context, 'string', { showPlaceholder: true });

  if (isMultiline) {
    const multilineProps = properties as MultilineTextProperties;
    const lineHeight = multilineProps.lineHeight || 1.2;

    // 是否使用省略号和行数限制
    const useEllipsis = multilineProps.ellipsis === true;
    const hasMaxLines = multilineProps.maxLines && multilineProps.maxLines > 0;

    // 构建样式对象
    const multilineTextStyle: React.CSSProperties = {
      fontSize: ptToPx(multilineProps.font.size, dpi) * displayScale,
      fontFamily: multilineProps.font.family,
      fontWeight: multilineProps.font.bold ? 'bold' : 'normal',
      fontStyle: multilineProps.font.italic ? 'italic' : 'normal',
      textDecoration: multilineProps.font.underline ? 'underline' : 'none',
      color: multilineProps.color || '#000000',
      backgroundColor: multilineProps.backgroundColor || 'transparent',
      textAlign: ['left', 'center', 'right', 'justify'][
        multilineProps.alignment || 0
      ] as any,
      overflow: 'hidden',
      whiteSpace: multilineProps.autoWrap !== false ? 'pre-wrap' : 'pre',
      wordBreak: multilineProps.breakWords ? 'break-all' : 'break-word',
      lineHeight: lineHeight,
    };

    // 只有当ellipsis=true且maxLines>0时，才使用-webkit-line-clamp
    if (useEllipsis && hasMaxLines) {
      multilineTextStyle.display = '-webkit-box';
      multilineTextStyle.WebkitLineClamp = multilineProps.maxLines;
      multilineTextStyle.WebkitBoxOrient = 'vertical';
    } else if (hasMaxLines) {
      // ellipsis=false但有maxLines：通过maxHeight限制（不显示省略号）
      multilineTextStyle.maxHeight = `${multilineProps.maxLines! * lineHeight}em`;
    }

    return <div style={multilineTextStyle}>{textValue}</div>;
  }

  // 单行文本
  const singleLineProps = properties as TextProperties;
  return (
    <div
      style={{
        fontSize: ptToPx(singleLineProps.font.size, dpi) * displayScale,
        fontFamily: singleLineProps.font.family,
        fontWeight: singleLineProps.font.bold ? 'bold' : 'normal',
        fontStyle: singleLineProps.font.italic ? 'italic' : 'normal',
        textDecoration: singleLineProps.font.underline ? 'underline' : 'none',
        color: singleLineProps.color || '#000000',
        backgroundColor: singleLineProps.backgroundColor || 'transparent',
        textAlign: ['left', 'center', 'right', 'justify'][
          singleLineProps.alignment || 0
        ] as any,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}
    >
      {textValue}
    </div>
  );
};
