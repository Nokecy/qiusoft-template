import { AgGridPlus } from '@/components/agGrid';
import { DocumentTypeGetListAsync, DocumentTypeDeleteAsync, DocumentTypeActivateAsync, DocumentTypeDeactivateAsync } from '@/services/pdm/DocumentType';
import { DeleteOutlined, EditOutlined, PlusOutlined, StopOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import DocumentTypeFormDialog from './components/DocumentTypeFormDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { DocumentTypePermissions } from '@/pages/appPdm/_permissions';
import dayjs from 'dayjs';

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();

  const canUpdate = !!(access && access[DocumentTypePermissions.Update]);
  const canDelete = !!(access && access[DocumentTypePermissions.Delete]);

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return DocumentTypeDeleteAsync({ id }).then(() => onRefresh()).finally(() => hide());
  };

  const handleActivate = async (id: any) => {
    const hide = message.loading('正在激活,请稍后', 0);
    try {
      await DocumentTypeActivateAsync({ id });
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
      await DocumentTypeDeactivateAsync({ id });
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
        <DocumentTypeFormDialog
          title={'编辑文档类型'}
          entityId={data.id}
          onAfterSubmit={onRefresh}
          buttonProps={{ icon: <EditOutlined />, type: 'link', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
        />
      </Access>

      {data.isActive ? (
        <Access accessible={canUpdate}>
          <DeleteConfirm title="确定停用该文档类型?" onConfirm={() => handleDeactivate(data.id)}>
            <Button size={'small'} icon={<StopOutlined />} type={'link'} title="停用" />
          </DeleteConfirm>
        </Access>
      ) : (
        <Access accessible={canUpdate}>
          <DeleteConfirm title="确定激活该文档类型?" onConfirm={() => handleActivate(data.id)}>
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

const PdmDocumentTypePage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = !!(access && access[DocumentTypePermissions.Create]);

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  // 业务字段列定义
  const businessColumns = [
    { headerName: '类型编码', field: 'typeCode', width: 150 },
    { headerName: '类型名称', field: 'typeName', width: 180 },
    {
      headerName: '文件扩展名',
      field: 'fileExtensions',
      width: 200,
      hideInSearch: true,
      cellRenderer: (params: any) => {
        if (!params.value) return '-';
        const extensions = params.value.split(',').map((ext: string) => ext.trim());
        return extensions.map((ext: string, index: number) => (
          <Tag key={index} color="blue" style={{ marginBottom: 4 }}>
            {ext}
          </Tag>
        ));
      }
    },
    {
      headerName: '是否激活',
      field: 'isActive',
      width: 100,
      hideInSearch: true,
      cellRenderer: (params: any) => (
        <Tag color={params.value ? '#52c41a' : '#d9d9d9'}>
          {params.value ? '启用' : '禁用'}
        </Tag>
      )
    },
    { headerName: '排序', field: 'sortOrder', width: 80, hideInSearch: true, hide: true },
    { headerName: '描述', field: 'description', width: 200, hideInSearch: true },
    {
      headerName: '创建人',
      field: 'creator',
      width: 120,
      hideInSearch: true
    },
    {
      headerName: '创建时间',
      field: 'creationTime',
      width: 160,
      hideInSearch: true,
      cellRenderer: (params: any) => params.value ? dayjs(params.value).format('YYYY-MM-DD HH:mm') : '-'
    },
    {
      headerName: '最后修改人',
      field: 'lastModifier',
      width: 120,
      hideInSearch: true
    },
    {
      headerName: '最后修改时间',
      field: 'lastModificationTime',
      width: 160,
      hideInSearch: true,
      cellRenderer: (params: any) => params.value ? dayjs(params.value).format('YYYY-MM-DD HH:mm') : '-'
    },
  ];

  // 操作列定义
  const operationColumn = {
    headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
    field: 'action',
    width: 120,
    pinned: 'right',
    filter: false,
    sortable: false,
    cellRenderer: Options,
    cellRendererParams: { onRefresh },
  };

  // 完整的列定义（业务字段 + 操作列）
  const columnDefs = [...businessColumns, operationColumn];

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle={'文档类型'}
      gridKey="appPdm.DocumentManagement.DocumentType"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await DocumentTypeGetListAsync(
          {
            Filter: params?.filter,
            SkipCount: params?.skipCount,
            MaxResultCount: params?.maxResultCount,
            Sorting: params?.sorter,
          } as any,
        );
        return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
      }}
      rowSelection={'multiple'}
      rowMultiSelectWithClick={true}
      toolBarRender={() => [
        <Access key="create" accessible={canCreate}>
          <DocumentTypeFormDialog
            title={'新建文档类型'}
            onAfterSubmit={onRefresh}
            buttonProps={{ icon: <PlusOutlined />, type: 'primary' }}
          >
            新建
          </DocumentTypeFormDialog>
        </Access>,
      ]}
      columnDefs={columnDefs}
    />
  );
};

export default PdmDocumentTypePage;

export const routeProps = {
  name: '文档类型管理',
};
