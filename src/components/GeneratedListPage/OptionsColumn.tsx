import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { Space, Button, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Access, useAccess, useIntl } from '@umijs/max';
import DeleteConfirm from '@/components/deleteConfirm';
import { useApiErrorHandler } from '@/pages/appCommon/_utils';
import { OptionsComponentProps } from './types';

/**
 * 通用操作列组件
 */
const OptionsColumn: React.FC<ICellRendererParams & OptionsComponentProps> = (props) => {
  const { data, onRefresh, permissions, formDialog, deleteApi, useErrorHandler = true } = props;
  const access = useAccess();
  const intl = useIntl();
  const { handleDelete: handleDeleteWithErrorHandling } = useApiErrorHandler();

  const refresh = () => {
    onRefresh();
  };

  const handleDelete = async (id: any) => {
    if (!deleteApi) {
      console.error('删除API未配置');
      return;
    }

    if (useErrorHandler) {
      // 使用统一错误处理
      await handleDeleteWithErrorHandling(deleteApi, { id }, refresh);
    } else {
      // 使用传统错误处理方式
      const hide = message.loading('正在删除,请稍后', 0);
      try {
        await deleteApi({ id });
        message.success('删除成功');
        refresh();
      } catch (error) {
        message.error('删除失败');
        console.error('删除失败:', error);
      } finally {
        hide();
      }
    }
  };

  return (
    <Space onClick={(event) => { event.stopPropagation(); }}>
      {/* 编辑按钮 */}
      {formDialog?.component && permissions.update && (
        <Access accessible={!!access[permissions.update]}>
          <formDialog.component
            buttonProps={{ 
              size: "small", 
              type: "link", 
              icon: <EditOutlined style={{ fontSize: 14 }} /> 
            }}
            key={data.id}
            title={formDialog.editTitle || intl.formatMessage({ id: "AbpUi:Edit" })}
            entityId={data.id}
            onAfterSubmit={refresh}
          />
        </Access>
      )}
      
      {/* 删除按钮 */}
      {deleteApi && permissions.delete && (
        <Access accessible={!!access[permissions.delete]}>
          <DeleteConfirm 
            title="确定删除?" 
            onConfirm={() => handleDelete(data.id)}
          >
            <Button 
              size="small" 
              icon={<DeleteOutlined />} 
              type="link" 
              title={intl.formatMessage({ id: "AbpUi:Delete" })}
            />
          </DeleteConfirm>
        </Access>
      )}
    </Space>
  );
};

export default OptionsColumn;