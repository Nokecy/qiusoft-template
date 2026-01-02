import React, { useRef, useMemo, useCallback, useState, useEffect, lazy, Suspense } from 'react';
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import { AgGridPlus } from "@/components/agGrid";
import { flattenTreeDeep } from "@nokecy/qc-ui";
import { Alert, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { GeneratedListPageConfig } from './types';
import { usePerformanceMonitor, PerformanceDevTools } from './PerformanceMonitor';

// 懒加载组件以减少初始包大小
const ConfigurableToolbar = lazy(() => import('./ConfigurableToolbar'));
// 直接导入操作列组件，避免懒加载导致的渲染问题
import OptionsColumn from './OptionsColumn';

/**
 * 通用列表页面生成器组件
 * 
 * 基于配置自动生成标准化的列表页面，包含：
 * - AgGridPlus表格
 * - 配置化工具栏
 * - 标准化操作列
 * - 树形数据支持
 * - 统一的API调用和错误处理
 * 
 * @param config 页面配置对象
 */
const GeneratedListPage: React.FC<GeneratedListPageConfig> = (config) => {
  const {
    title,
    gridKey,
    apiConfig,
    permissions,
    columnDefs,
    formDialog,
    toolbarActions,
    enableImportExport = true,
    importConfig,
    exportFileName,
    treeConfig,
    customOptionsComponent,
    errorConfig = { useErrorHandler: true },
    paginationConfig = { enabled: true, defaultPageSize: 20 },
    gridRef: externalGridRef,
    onRefresh: externalOnRefresh
  } = config;

  // 内部Grid引用
  const internalGridRef = useRef<GridRef>();
  const gridRef = externalGridRef || internalGridRef;

  // 组件状态
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [lastRequestTime, setLastRequestTime] = useState<number>(0);

  // 性能监控
  const { metrics, measureApiCall, recordError, getPerformanceReport } = usePerformanceMonitor(`GeneratedListPage-${title}`);

  // 刷新函数
  const onRefresh = useCallback(externalOnRefresh || (() => {
    gridRef.current?.onRefresh();
  }), [externalOnRefresh]);

  // 操作列组件
  const OptionsColumnComponent = customOptionsComponent || OptionsColumn;

  // 构建完整的列定义（包含操作列）
  const finalColumnDefs = useMemo(() => {
    const hasFormDialog = !!formDialog?.component;
    const hasDeleteApi = !!apiConfig.delete;

    // 如果没有编辑和删除功能，不添加操作列
    if (!hasFormDialog && !hasDeleteApi) {
      return columnDefs;
    }

    const operationColumn = {
      headerName: "操作",
      field: "action",
      width: 120,
      pinned: "right" as const,
      filter: false,
      sortable: false,
      cellRenderer: OptionsColumnComponent,
      cellRendererParams: {
        onRefresh,
        permissions,
        formDialog,
        deleteApi: apiConfig.delete,
        useErrorHandler: errorConfig.useErrorHandler
      }
    };

    return [...columnDefs, operationColumn];
  }, [columnDefs, formDialog, apiConfig.delete, permissions, onRefresh, OptionsColumnComponent, errorConfig.useErrorHandler]);

  // 请求防抖处理
  const [requestId, setRequestId] = useState(0);

  // 请求处理函数
  const handleRequest = useCallback(async (params: any) => {
    const currentTime = Date.now();
    const currentRequestId = requestId + 1;
    setRequestId(currentRequestId);

    // 防抖：如果两次请求间隔小于500ms，延迟执行
    if (currentTime - lastRequestTime < 500) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setLastRequestTime(currentTime);
    setError(null);

    try {
      // 树形数据处理
      if (treeConfig?.enabled && treeConfig.treeApi) {
        const treeData = await treeConfig.treeApi();
        const flatData = flattenTreeDeep(
          treeData || [],
          treeConfig.childrenFieldName || 'items'
        );

        // 客户端过滤
        let filteredData = flatData;
        if (params?.filter) {
          const filterText = params.filter.toLowerCase();
          filteredData = flatData.filter((item: any) =>
            Object.values(item).some(value =>
              value && value.toString().toLowerCase().includes(filterText)
            )
          );
        }

        return {
          success: true,
          data: filteredData,
          total: filteredData.length,
        };
      }

      // 普通列表数据处理
      const requestParams = paginationConfig.enabled ? {
        PageSize: params?.maxResultCount || paginationConfig.defaultPageSize,
        Filter: params?.filter,
        MaxResultCount: params?.maxResultCount || paginationConfig.defaultPageSize,
        SkipCount: params?.skipCount || 0,
        Sorting: params?.sorter
      } : {
        Filter: params?.filter,
        Sorting: params?.sorter
      };

      const data = await measureApiCall(() => apiConfig.list(requestParams));

      return {
        success: true,
        data: data.items || [],
        total: data.totalCount || 0,
      };
    } catch (error: any) {
      // 网络错误或者超时的自动重试机制
      if (retryCount < 3 && (error.code === 'NETWORK_ERROR' || error.code === 'TIMEOUT')) {
        console.warn(`请求失败，正在重试 (${retryCount + 1}/3):`, error);
        setRetryCount(prev => prev + 1);

        // 指数退避策略重试
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
        return handleRequest(params);
      }

      const errorMessage = `获取${title}数据失败: ${error.message || '未知错误'}`;
      console.error(errorMessage, error);
      recordError();
      setError(errorMessage);
      return {
        success: false,
        data: [],
        total: 0,
      };
    } finally {
      setRetryCount(0);
    }
  }, [title, treeConfig, paginationConfig, apiConfig.list, retryCount, lastRequestTime, requestId]);

  // 工具栏渲染函数
  const renderToolbar = useCallback((gridApi: any, filter: string) => {
    // 如果没有导入导出，没有自定义工具栏，也没有表单对话框，则不显示工具栏
    if (!enableImportExport && (!toolbarActions || toolbarActions.length === 0) && !formDialog?.component) {
      return [];
    }

    return (
      <Suspense fallback={<div style={{ height: 32 }} />}>
        <ConfigurableToolbar
          actions={toolbarActions}
          formDialog={formDialog}
          apiConfig={apiConfig}
          onRefresh={onRefresh}
          importConfig={importConfig}
          exportFileName={exportFileName}
          filter={filter}
          permissions={permissions}
        />
      </Suspense>
    );
  }, [enableImportExport, toolbarActions, formDialog, apiConfig, onRefresh, importConfig, exportFileName, permissions]);

  // AgGridPlus属性配置
  const agGridProps = {
    gridRef,
    gridKey,
    headerTitle: title,
    request: handleRequest,
    toolBarRender: renderToolbar,
    columnDefs: finalColumnDefs,
    // 设置表格高度
    style: { height: '100%', minHeight: '400px' },
    // 树形数据配置
    ...(treeConfig?.enabled && {
      treeData: true,
      getDataPath: treeConfig.getDataPath,
      treeParentName: treeConfig.parentFieldName || 'parentId',
      treeKeyName: treeConfig.keyFieldName || 'id',
      autoGroupColumnDef: treeConfig.autoGroupColumnDef,
      groupDefaultExpanded: treeConfig.groupDefaultExpanded ?? -1
    })
  };

  // 错误状态显示
  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <Alert
          message="数据加载失败"
          description={
            <div>
              <div>{error}</div>
              {retryCount > 0 && (
                <div style={{ marginTop: 8, fontSize: '12px', color: '#666' }}>
                  已重试 {retryCount} 次
                </div>
              )}
            </div>
          }
          type="error"
          showIcon
          action={
            <Button
              size="small"
              type="primary"
              icon={<ReloadOutlined />}
              onClick={() => {
                setError(null);
                setRetryCount(0);
                onRefresh();
              }}
            >
              重试
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <AgGridPlus {...agGridProps} />
      <PerformanceDevTools
        componentName={`GeneratedListPage-${title}`}
        metrics={metrics}
        onGetReport={getPerformanceReport}
      />
    </div>
  );
};

/**
 * 错误边界组件
 */
class GeneratedListPageErrorBoundary extends React.Component<
  { children: React.ReactNode; title?: string },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('GeneratedListPage Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <Alert
            message={`${this.props.title || '页面'}加载错误`}
            description="页面组件发生了意外错误，请刷新页面重试。如果问题持续存在，请联系技术支持。"
            type="error"
            showIcon
            action={
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#1890ff',
                  cursor: 'pointer'
                }}
              >
                刷新页面
              </button>
            }
          />
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * 带错误边界的GeneratedListPage组件
 */
const GeneratedListPageWithErrorBoundary: React.FC<GeneratedListPageConfig> = (props) => {
  return (
    <GeneratedListPageErrorBoundary title={props.title}>
      <GeneratedListPage {...props} />
    </GeneratedListPageErrorBoundary>
  );
};

export default GeneratedListPageWithErrorBoundary;