import React from 'react';

interface StickyContainerProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 粘性定位容器组件
 * 用于在项目详情Tab中创建固定在顶部的区域（流程图）
 *
 * 布局说明：
 * - Card body 是滚动容器（overflow-y: auto）
 * - Tab 栏 sticky top: 0（相对于 Card body）
 * - 流程图 sticky top: 46px（Tab 栏高度，相对于 Card body）
 */
const StickyContainer: React.FC<StickyContainerProps> = ({ children, className, style }) => {
  return (
    <div
      className={className}
      style={{
        position: 'sticky',
        top: 46, // Tab 栏标签高度（相对于 Card body 滚动容器）
        zIndex: 98, // 低于 Tab 栏（99）
        background: '#fff',
        paddingTop: 8,
        paddingBottom: 8,
        marginBottom: 16,
        borderBottom: '1px solid #f0f0f0',
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default StickyContainer;
