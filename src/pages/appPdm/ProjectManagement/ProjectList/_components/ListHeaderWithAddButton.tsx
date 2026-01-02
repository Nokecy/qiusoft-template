import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { observer } from '@formily/react';

interface ListHeaderWithAddButtonProps {
  title: string;
  onAdd?: () => void;
  buttonText?: string;
}

/**
 * 列表标题组件 - 带新建按钮
 * 用于在详情页面的列表上方显示标题和新建按钮
 */
const ListHeaderWithAddButton: React.FC<ListHeaderWithAddButtonProps> = observer((props) => {
  const { title, onAdd, buttonText = '新建' } = props;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      paddingBottom: 12,
      borderBottom: '1px solid #f0f0f0'
    }}>
      <h4 style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>{title}</h4>
      {onAdd && (
        <Button
          type="primary"
          size="small"
          icon={<PlusOutlined />}
          onClick={onAdd}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
});

export default ListHeaderWithAddButton;
