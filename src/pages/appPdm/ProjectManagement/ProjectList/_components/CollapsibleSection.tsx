import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { DownOutlined, RightOutlined, PlusOutlined } from '@ant-design/icons';
import { RecursionField, useFieldSchema, observer } from '@formily/react';

interface CollapsibleSectionProps {
  /** 卡片标题 */
  title: string;
  /** 新建按钮文本 */
  buttonText?: string;
  /** 是否默认展开 */
  defaultExpanded?: boolean;
  /** 点击新建按钮回调 */
  onAdd?: () => void;
  /** 卡片样式 */
  style?: React.CSSProperties;
  /** 展开/收起状态变化回调 */
  onExpandChange?: (expanded: boolean) => void;
}

/**
 * 可折叠区块组件 - Formily 兼容
 * 用于在 Formily schema 中包裹 ArrayTable 等子组件
 */
const CollapsibleSection: React.FC<CollapsibleSectionProps> = observer(({
  title,
  buttonText,
  defaultExpanded = true,
  onAdd,
  style,
  onExpandChange,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const fieldSchema = useFieldSchema();

  const handleToggle = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    onExpandChange?.(newExpanded);
  };

  const cardTitle = (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          paddingTop: 8,
          paddingBottom: 4
        }}
        onClick={handleToggle}
      >
        <span style={{ marginRight: 4 }}>
          {expanded ? <DownOutlined /> : <RightOutlined />}
        </span>
        <span style={{ fontWeight: 600 }}>{title}</span>
      </div>
      {/* 按钮区域 - 在标题下方，只在展开时显示 */}
      {expanded && buttonText && onAdd && (
        <div style={{ marginTop: 4, marginBottom: 8 }}>
          <Button
            type="primary"
            size="small"
            icon={<PlusOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
          >
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <Card
      title={cardTitle}
      extra={null}
      style={{ marginBottom: 16, ...style }}
      bodyStyle={{
        display: expanded ? 'block' : 'none',
        padding: expanded ? '12px 24px' : 0,
      }}
      size="small"
    >
      {/* 递归渲染 schema 中的子属性 */}
      {fieldSchema.mapProperties((schema, name) => (
        <RecursionField key={name} name={name} schema={schema} />
      ))}
    </Card>
  );
});

export default CollapsibleSection;
