import React from 'react';
import { Button, Space } from 'antd';
import { SaveOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';

interface ActionBarProps {
  onSave: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  loading?: boolean;
}

/**
 * 底部操作按钮栏组件
 * 提供保存、提交、取消等操作
 */
const ActionBar: React.FC<ActionBarProps> = ({ onSave, onSubmit, onCancel, loading = false }) => {
  return (
    <div
      className="action-bar"
      style={{
        padding: '12px 16px',
        background: '#fafafa',
        borderTop: '1px solid #e8e8e8',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ fontSize: '13px', color: '#666' }}>
        提示: 双击节点可编辑详细信息 | 拖拽节点可调整位置
      </div>
      <Space>
        <Button onClick={onCancel} icon={<CloseOutlined />}>
          取消
        </Button>
        <Button onClick={onSave} icon={<SaveOutlined />} loading={loading}>
          保存草稿
        </Button>
        <Button type="primary" onClick={onSubmit} icon={<CheckOutlined />} loading={loading}>
          提交审核
        </Button>
      </Space>
    </div>
  );
};

export default ActionBar;
