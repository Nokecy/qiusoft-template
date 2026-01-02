import { AgGridPlus } from '@/components/agGrid';
import { DocumentLibraryGetListAsync, DocumentLibraryDeleteAsync, DocumentLibraryActivateAsync, DocumentLibraryDeactivateAsync, DocumentLibraryGetImportTemplateAsync } from '@/services/pdm/DocumentLibrary';
import { DeleteOutlined, EditOutlined, PlusOutlined, StopOutlined, CheckCircleOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef, useMemo } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import DocumentLibraryFormDialog from './components/DocumentLibraryFormDialog';
import DocumentLibraryImportDialog from './components/DocumentLibraryImportDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { DocumentLibraryPermissions } from '@/pages/appPdm/_permissions';
import dayjs from 'dayjs';

// 从扁平列表构建带hierarchy的数据（参考物料分类页面实现）
const buildFlatDataWithHierarchy = (flatList: any[]) => {
  if (!flatList || flatList.length === 0) {
    return [];
  }

  // 建立 id -> item 映射
  const itemMap = new Map<string, any>();
  flatList.forEach(item => {
    itemMap.set(item.id, { ...item });
  });

  // 建立 parentId -> children 映射
  const childrenMap = new Map<string, any[]>();
  flatList.forEach(item => {
    const parentId = item.parentLibraryId || 'root';
    if (!childrenMap.has(parentId)) {
      childrenMap.set(parentId, []);
    }
    const mappedItem = itemMap.get(item.id);
    if (mappedItem) {
      childrenMap.get(parentId)!.push(mappedItem);
    }
  });

  // 递归构建 hierarchy
  const result: any[] = [];
  const buildHierarchy = (parentId: string | null, parentPath: string[]) => {
    const children = childrenMap.get(parentId || 'root') || [];
    // 按 sortOrder 排序
    children.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    children.forEach(item => {
      const currentPath = [...parentPath, item.libraryName || item.libraryCode || String(item.id)];
      // 使用 _hierarchy 避免与 AgGrid 内部的 hierarchy 冲突
      const newItem = {
        ...item,
        _hierarchy: currentPath
      };
      result.push(newItem);
      buildHierarchy(item.id, currentPath);
    });
  };

  buildHierarchy(null, []);
  return result;
};

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();

  const canUpdate = (access && (access[DocumentLibraryPermissions.Update] ?? true)) as boolean;
  const canDelete = (access && (access[DocumentLibraryPermissions.Delete] ?? true)) as boolean;

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return DocumentLibraryDeleteAsync({ id }).then(() => onRefresh()).finally(() => hide());
  };

  const handleActivate = async (id: any) => {
    const hide = message.loading('正在激活,请稍后', 0);
    try {
      await DocumentLibraryActivateAsync({ id });
      onRefresh();
      // 等待一小段时间确保刷新完成
      await new Promise(resolve => setTimeout(resolve, 300));
      message.success('激活成功');
    } catch (error: any) {
      message.error(error?.message || '激活失败,请重试');
    } finally {
      hide();
    }
  };

  const handleDeactivate = async (id: any) => {
    const hide = message.loading('正在停用,请稍后', 0);
    try {
      await DocumentLibraryDeactivateAsync({ id });
      onRefresh();
      // 等待一小段时间确保刷新完成
      await new Promise(resolve => setTimeout(resolve, 300));
      message.success('停用成功');
    } catch (error: any) {
      message.error(error?.message || '停用失败,请重试');
    } finally {
      hide();
    }
  };

  return (
    <Space>
      <Access accessible={canUpdate}>
        <DocumentLibraryFormDialog
          title={'编辑文档库'}
          entityId={data.id}
          onAfterSubmit={onRefresh}
          buttonProps={{ icon: <EditOutlined />, type: 'link', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
        />
      </Access>

      {data.isActive ? (
        <Access accessible={canUpdate}>
          <DeleteConfirm title="确定停用该文档库?" onConfirm={() => handleDeactivate(data.id)}>
            <Button size={'small'} icon={<StopOutlined />} type={'link'} title="停用" />
          </DeleteConfirm>
        </Access>
      ) : (
        <Access accessible={canUpdate}>
          <DeleteConfirm title="确定激活该文档库?" onConfirm={() => handleActivate(data.id)}>
            <Button size={'small'} icon={<CheckCircleOutlined />} type={'link'} title="激活" />
          </DeleteConfirm>
        </Access>
      )}

      <Access accessible={canDelete}>
        <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
          <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
        </DeleteConfirm>
      </Access>
    </Space>
  );
};

const PdmDocumentLibraryPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = !!(access && access[DocumentLibraryPermissions.Create]);

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  // 下载导入模板
  const handleDownloadTemplate = async () => {
    try {
      message.loading({ content: '正在下载模板...', key: 'downloadTemplate' });

      const response = await DocumentLibraryGetImportTemplateAsync({
        responseType: 'blob',
        getResponse: true,
      } as any);

      // 从响应头获取文件名
      let fileName = '文档库导入模板.xlsx';
      if (response.response?.headers) {
        const contentDisposition = response.response.headers.get('content-disposition');
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
          if (fileNameMatch && fileNameMatch[1]) {
            fileName = fileNameMatch[1].replace(/['"]/g, '');
            try {
              fileName = decodeURIComponent(fileName);
            } catch (e) {
              console.warn('文件名解码失败:', e);
            }
          }
        }
      }

      // 创建 Blob 并下载
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      message.success({ content: '模板下载成功', key: 'downloadTemplate' });
    } catch (error) {
      console.error('下载模板失败:', error);
      message.error({ content: '下载模板失败，请重试', key: 'downloadTemplate' });
    }
  };

  // 列定义（参考物料分类页面）
  const columnDefs: any = useMemo(() => [
    { field: 'libraryCode', headerName: '库编码', width: 150 },
    { field: 'path', headerName: '路径', width: 280, hideInSearch: true },
    { field: 'level', headerName: '层级', width: 80, hideInSearch: true },
    {
      field: 'libraryType',
      headerName: '库类型',
      width: 100,
      hideInSearch: true,
      cellRenderer: (params: any) => {
        const typeMap: Record<number, { label: string; color: string }> = {
          1: { label: '存储库', color: 'blue' },
          2: { label: '回收库', color: 'orange' },
        };
        const config = typeMap[params.value];
        return config ? (
          <Tag color={config.color}>{config.label}</Tag>
        ) : '-';
      }
    },
    { field: 'storageSolutionName', headerName: '存储方案', width: 150, hideInSearch: true },
    {
      field: 'isActive',
      headerName: '是否启用',
      width: 100,
      hideInSearch: true,
      cellRenderer: (params: any) => (
        <Tag color={params.value ? '#52c41a' : '#d9d9d9'}>
          {params.value ? '启用' : '禁用'}
        </Tag>
      )
    },
    { field: 'sortOrder', headerName: '排序', width: 100, hideInSearch: true },
    { field: 'description', headerName: '描述', width: 200, hideInSearch: true },
    { field: 'creator', headerName: '创建人', width: 100, hideInSearch: true },
    {
      field: 'creationTime',
      headerName: '创建时间',
      width: 160,
      hideInSearch: true,
      initialSort: 'desc',
      cellRenderer: ({ value }: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-'
    },
    {
      field: 'lastModificationTime',
      headerName: '最后修改时间',
      width: 160,
      hideInSearch: true,
      cellRenderer: ({ value }: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-'
    },
    { field: 'lastModifier', headerName: '最后修改人', width: 100, hideInSearch: true },
    {
      field: 'action',
      headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
      width: 120,
      pinned: 'right',
      filter: false,
      sortable: false,
      cellRenderer: Options,
      cellRendererParams: { onRefresh }
    }
  ], [intl, onRefresh]);

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle={'文档库'}
      gridKey="appPdm.DocumentManagement.DocumentLibrary"
      treeData={true}
      getDataPath={(data) => {
        return data._hierarchy;
      }}
      autoGroupColumnDef={{
        headerName: '库名称',
        minWidth: 300,
        pinned: 'left',
        cellRendererParams: {
          suppressCount: true,
          innerRenderer: (params: any) => params.data?.libraryName || params.data?.libraryCode || '-'
        }
      }}
      groupDefaultExpanded={-1}
      request={async (params: any) => {
        const data = await DocumentLibraryGetListAsync({
          Filter: params?.filter,
          SkipCount: 0,
          MaxResultCount: 10000,
          Sorting: params?.sorter || 'sortOrder',
        } as any);
        const flatData = buildFlatDataWithHierarchy(data.items || []);
        return {
          success: true,
          data: flatData,
          total: flatData.length
        } as any;
      }}
      rowSelection={'multiple'}
      rowMultiSelectWithClick={true}
      toolBarRender={() => [
        <Access key="create" accessible={canCreate}>
          <DocumentLibraryFormDialog title={'新建文档库'} onAfterSubmit={onRefresh} buttonProps={{ icon: <PlusOutlined />, type: 'primary' }}>
            新建
          </DocumentLibraryFormDialog>
        </Access>,
        <Access key="import" accessible={canCreate}>
          <DocumentLibraryImportDialog onAfterSubmit={onRefresh} buttonProps={{ icon: <UploadOutlined /> }}>
            导入
          </DocumentLibraryImportDialog>
        </Access>,
        <Button key="downloadTemplate" icon={<DownloadOutlined />} onClick={handleDownloadTemplate}>
          下载模板
        </Button>,
      ]}
      columnDefs={columnDefs}
    />
  );
};

export default PdmDocumentLibraryPage;

export const routeProps = {
  name: '文档库管理',
};
