import React from 'react';

/**
 * 数组数据容器组件
 * 用于在 Formily 表单中存储数组数据,但不渲染任何UI
 * 解决 Input 组件无法处理数组对象的问题
 */
const ArrayDataContainer: React.FC<{ value?: any[] }> = ({ value }) => {
  // 不渲染任何内容,仅作为数据容器
  return null;
};

export default ArrayDataContainer;
