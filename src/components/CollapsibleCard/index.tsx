import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

interface CollapsibleCardProps {
  /** 卡片标题 */
  title: React.ReactNode;
  /** 标题右侧额外内容（如新建按钮） */
  extra?: React.ReactNode;
  /** 是否默认展开 */
  defaultExpanded?: boolean;
  /** 子内容 */
  children?: React.ReactNode;
  /** 卡片样式 */
  style?: React.CSSProperties;
  /** 内容区域样式 */
  bodyStyle?: React.CSSProperties;
  /** 展开/收起状态变化回调 */
  onExpandChange?: (expanded: boolean) => void;
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  title,
  extra,
  defaultExpanded = true,
  children,
  style,
  bodyStyle,
  onExpandChange,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    onExpandChange?.(newExpanded);
  };

  const expandButton = (
    <Button
      type="text"
      size="small"
      icon={expanded ? <UpOutlined /> : <DownOutlined />}
      onClick={handleToggle}
      style={{ marginLeft: 8 }}
    >
      {expanded ? '收起' : '展开'}
    </Button>
  );

  const cardExtra = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {extra}
      {expandButton}
    </div>
  );

  return (
    <Card
      title={title}
      extra={cardExtra}
      style={{ marginBottom: 16, ...style }}
      bodyStyle={{
        display: expanded ? 'block' : 'none',
        padding: expanded ? undefined : 0,
        ...bodyStyle,
      }}
      size="small"
    >
      {children}
    </Card>
  );
};

export default CollapsibleCard;
