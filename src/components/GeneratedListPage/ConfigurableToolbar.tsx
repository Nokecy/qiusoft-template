import React, { useCallback, useState } from 'react';
import { Button, message } from 'antd';
import { 
  PlusOutlined, 
  ExportOutlined, 
  ImportOutlined
} from '@ant-design/icons';
import { Access, useAccess } from '@umijs/max';
import ImportPublic from '@/components/importPublic';
import { useApiErrorHandler } from '@/pages/appCommon/_utils';
import { downloadFile } from '@/pages/appCommon/_utils/downloadUtils';
import { ToolbarActionConfig, FormDialogConfig, ApiConfig } from './types';

interface ConfigurableToolbarProps {
  /** 工具栏配置 */
  actions?: ToolbarActionConfig[];
  /** 表单对话框配置 */
  formDialog?: FormDialogConfig;
  /** API配置 */
  apiConfig: ApiConfig;
  /** 刷新回调 */
  onRefresh: () => void;
  /** 导入配置 */
  importConfig?: {
    title?: string;
    downUrl?: string;
    uploadUrl?: string;
  };
  /** 导出文件名 */
  exportFileName?: string;
  /** 当前过滤条件 */
  filter?: string;
  /** 权限配置 */
  permissions?: {
    create?: string;
    update?: string;
    delete?: string;
    import?: string;
    export?: string;
  };
}

/**
 * 配置化工具栏组件
 */
const ConfigurableToolbar: React.FC<ConfigurableToolbarProps> = ({
  actions = [],
  formDialog,
  apiConfig,
  onRefresh,
  importConfig,
  exportFileName = 'export.xlsx',
  filter,
  permissions
}) => {
  const access = useAccess();
  const { handleExport } = useApiErrorHandler();

  // 默认操作配置
  const defaultActions: ToolbarActionConfig[] = [
    {
      type: 'create',
      label: '新建',
      permission: permissions?.create,
      buttonProps: { 
        icon: <PlusOutlined />, 
        type: 'primary' 
      }
    },
    {
      type: 'import',
      label: '导入',
      permission: permissions?.import,
      buttonProps: { 
        icon: <ImportOutlined /> 
      }
    },
    {
      type: 'export',
      label: '导出',
      permission: permissions?.export,
      buttonProps: { 
        icon: <ExportOutlined /> 
      }
    }
  ];

  // 合并用户配置和默认配置
  const finalActions = actions.length > 0 ? actions : defaultActions;

  // 状态管理
  const [exportLoading, setExportLoading] = useState(false);

  const handleExportData = useCallback(async () => {
    if (!apiConfig.export) {
      message.error('导出API未配置');
      return;
    }
    
    setExportLoading(true);
    try {
      await handleExport(apiConfig.export, { filter }, exportFileName, downloadFile);
    } catch (error) {
      console.error('导出失败:', error);
    } finally {
      setExportLoading(false);
    }
  }, [apiConfig.export, filter, exportFileName, handleExport]);


  const renderAction = (action: ToolbarActionConfig, index: number) => {
    const key = `${action.type}-${index}`;
    
    // 权限检查
    if (action.permission && !access[action.permission]) {
      return null;
    }

    switch (action.type) {
      case 'create':
        if (!formDialog?.component) return null;
        return (
          <Access key={key} accessible={!!access[action.permission!]}>
            <formDialog.component
              title={formDialog.createTitle || action.label || '新建'}
              buttonProps={action.buttonProps}
              onAfterSubmit={onRefresh}
            >
              {action.label || '新建'}
            </formDialog.component>
          </Access>
        );


      case 'import':
        if (!importConfig?.uploadUrl) return null;
        return (
          <Access key={key} accessible={!!access[action.permission!]}>
            <ImportPublic
              onAfterSubmit={onRefresh}
              title={importConfig.title}
              downUrl={importConfig.downUrl}
              uploadUrl={importConfig.uploadUrl}
              buttonProps={action.buttonProps}
            />
          </Access>
        );

      case 'export':
        if (!apiConfig.export) return null;
        return (
          <Access key={key} accessible={!!access[action.permission!]}>
            <Button 
              {...action.buttonProps}
              loading={exportLoading}
              onClick={handleExportData}
            >
              {action.label || '导出'}
            </Button>
          </Access>
        );

      case 'custom':
        if (!action.component && !action.onClick) return null;
        
        if (action.component) {
          const CustomComponent = action.component;
          return (
            <Access key={key} accessible={!!access[action.permission!]}>
              <CustomComponent {...action.componentProps} />
            </Access>
          );
        }

        return (
          <Access key={key} accessible={!!access[action.permission!]}>
            <Button 
              {...action.buttonProps}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          </Access>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {finalActions.map(renderAction).filter(Boolean)}
    </>
  );
};

export default ConfigurableToolbar;