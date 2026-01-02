/**
 * DataMatrix 元素渲染器
 * 负责渲染DataMatrix条码元素
 */

import React from 'react';
import type { AtlElement, DataMatrixProperties } from '../../../../types';
import { resolveBindingValue, getEffectiveContentBinding } from '../../../../utils';
import { DataMatrixComponent } from '../../utils/DataMatrixComponent';

export interface DataMatrixElementProps {
  element: AtlElement;
  displayScale: number;
  w: number; // 显示宽度（像素）
  h: number; // 显示高度（像素）
  context: Record<string, any>;
}

/**
 * DataMatrix元素组件
 */
export const DataMatrixElement: React.FC<DataMatrixElementProps> = ({
  element,
  displayScale,
  w,
  h,
  context,
}) => {
  const props = element.properties as DataMatrixProperties;
  const dmContentBinding = getEffectiveContentBinding(props);
  // 设计器模式:显示数据路径占位符
  const dataMatrixContent = resolveBindingValue(dmContentBinding, context, 'string', { showPlaceholder: true }) || 'SAMPLE';

  try {
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
        <DataMatrixComponent
          content={dataMatrixContent}
          width={w}
          height={h}
          foregroundColor={props.foregroundColor}
          backgroundColor={props.backgroundColor}
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
        DataMatrix错误
      </div>
    );
  }
};
