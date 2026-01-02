import { AgGridPlus } from '@/components/agGrid';
import DeleteConfirm from '@/components/deleteConfirm';
import {
  DocumentRecycleOrderGetListAsync,
  DocumentRecycleOrderGetItemDetailsListAsync,
  DocumentRecycleOrderDeleteAsync,
  DocumentRecycleOrderSubmitAsync,
} from '@/services/pdm/DocumentRecycleOrder';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SendOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag, Segmented } from 'antd';
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Access, useAccess, useIntl, history } from 'umi';
import { documentRecycleOrderStatusEnum, DocumentRecycleOrderStatus } from './_enums';
import dayjs from 'dayjs';

// 状态渲染器
const StatusRenderer = (props: ICellRendererParams) => {
  const { value } = props;
  const statusItem = documentRecycleOrderStatusEnum.find(item => item.value === value);
  if (!statusItem) return value;
  return <Tag color={statusItem.color}>{statusItem.label}</Tag>;
};

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void; viewMode: 'detail' | 'header' }) => {
  const { data, onRefresh, viewMode } = props;
  const intl = useIntl();
  const access = useAccess();
  const canUpdate = true; // 权限待定义
  const canDelete = true;
  const canSubmit = true;

  // 查看明细
  const handleView = () => {
    const targetId = viewMode === 'detail' ? data.recycleOrderId : data.id;
    history.push(`/appPdm/DocumentManagement/DocumentRecycleOrder/detail?id=${targetId}`);
  };

  // 编辑（跳转到表单页）
  const handleEdit = () => {
    history.push(`/appPdm/DocumentManagement/DocumentRecycleOrder/form?id=${data.id}`);
  };

  // 删除
  const handleDelete = async () => {
    const hide = message.loading('正在删除...', 0);
    try {
      await DocumentRecycleOrderDeleteAsync({ id: data.id });
      message.success('删除成功');
      onRefresh();
    } catch (error) {
      message.error('删除失败');
    } finally {
      hide();
    }
  };

  // 提交审批
  const handleSubmit = async () => {
    const hide = message.loading('正在提交...', 0);
    try {
      await DocumentRecycleOrderSubmitAsync({ id: data.id });
      message.success('提交成功');
      onRefresh();
    } catch (error) {
      message.error('提交失败');
    } finally {
      hide();
    }
  };

  // 根据状态显示不同操作（草稿状态可编辑/删除/提交）
  const isDraft = data.status === DocumentRecycleOrderStatus.Draft;
  const allowOperate = viewMode === 'header';

  return (
    <Space>
      <Button
        size="small"
        icon={<EyeOutlined />}
        type="link"
        title="查看"
        onClick={handleView}
      />
      {allowOperate && isDraft && (
        <Access accessible={canUpdate}>
          <Button
            size="small"
            icon={<EditOutlined />}
            type="link"
            title={intl.formatMessage({ id: 'AbpUi:Edit' })}
            onClick={handleEdit}
          />
        </Access>
      )}
      {allowOperate && isDraft && (
        <Access accessible={canDelete}>
          <DeleteConfirm title="确定删除?" onConfirm={handleDelete}>
            <Button
              size="small"
              icon={<DeleteOutlined />}
              type="link"
              title={intl.formatMessage({ id: 'AbpUi:Delete' })}
            />
          </DeleteConfirm>
        </Access>
      )}
      {allowOperate && isDraft && (
        <Access accessible={canSubmit}>
          <DeleteConfirm title="确定提交审批?" onConfirm={handleSubmit}>
            <Button
              size="small"
              icon={<SendOutlined />}
              type="link"
              title="提交"
            />
          </DeleteConfirm>
        </Access>
      )}
    </Space>
  );
};

const DocumentRecycleOrderPage: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = true; // 权限待定义
  const [viewMode, setViewMode] = useState<'detail' | 'header'>('detail');
  const didMountRef = useRef(false);

  const onRefresh = () => gridRef.current?.onRefresh();

  // 新建回收单（跳转到表单页）
  const handleCreate = () => {
    history.push('/appPdm/DocumentManagement/DocumentRecycleOrder/form');
  };

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    onRefresh();
  }, [viewMode]);

  // 列定义

  const headerColumnDefs: any = useMemo(() => [
    {
      field: 'recycleOrderNumber',
      headerName: '文档回收单号',
      width: 180,
      cellRenderer: (params: any) => {
        const { data } = params;
        return (
          <a
            onClick={() => history.push(`/appPdm/DocumentManagement/DocumentRecycleOrder/detail?id=${data.id}`)}
            style={{ color: '#1890ff', cursor: 'pointer' }}
          >
            {data.recycleOrderNumber}
          </a>
        );
      }
    },
    {
      field: 'recycleUserName',
      headerName: '当前单据创建人',
      width: 150,
    },
    {
      field: 'approverName',
      headerName: '审批人',
      width: 150,
    },
    {
      field: 'recycleTime',
      headerName: '回收时间',
      width: 160,
      type: 'dateColumn',
      cellRenderer: ({ value }: any) => value ? dayjs(value).format('YYYY-MM-DD') : '-'
    },
    {
      field: 'remarks',
      headerName: '备注',
      width: 200,
      hideInSearch: true,
    },
    {
      field: 'status',
      headerName: '审批状态',
      width: 120,
      cellRenderer: StatusRenderer as any,
      valueEnum: documentRecycleOrderStatusEnum
    },
    {
      field: 'creationTime',
      headerName: '预计收回时间',
      width: 160,
      hideInSearch: true,
      initialSort: 'desc',
      cellRenderer: ({ value }: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-'
    },
    {
      field: 'action',
      headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
      width: 200,
      pinned: 'right',
      filter: false,
      sortable: false,
      cellRenderer: Options,
      cellRendererParams: { onRefresh, viewMode: 'header' }
    }
  ], [intl, onRefresh]);

  const detailColumnDefs: any = useMemo(() => [
    {
      field: 'recycleOrderNumber',
      headerName: '回收单号',
      width: 180,
      cellRenderer: (params: any) => {
        const { data } = params;
        return (
          <a
            onClick={() => history.push(`/appPdm/DocumentManagement/DocumentRecycleOrder/detail?id=${data.recycleOrderId}`)}
            style={{ color: '#1890ff', cursor: 'pointer' }}
          >
            {data.recycleOrderNumber}
          </a>
        );
      }
    },
    {
      field: 'recycleUserName',
      headerName: '回收人',
      width: 140,
    },
    {
      field: 'approverName',
      headerName: '审批人',
      width: 140,
    },
    {
      field: 'status',
      headerName: '审批状态',
      width: 120,
      cellRenderer: StatusRenderer as any,
      valueEnum: documentRecycleOrderStatusEnum
    },
    {
      field: 'currentActivityName',
      headerName: '当前节点',
      width: 120,
      hideInSearch: true,
    },
    {
      field: 'creationTime',
      headerName: '创建时间',
      width: 160,
      hideInSearch: true,
      initialSort: 'desc',
      type: 'dateColumn',
      cellRenderer: ({ value }: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-'
    },
    {
      field: 'documentNumber',
      headerName: '文档编号',
      width: 160,
    },
    {
      field: 'documentName',
      headerName: '文档名称',
      width: 200,
    },
    {
      field: 'quantity',
      headerName: '数量',
      width: 100,
      hideInSearch: true,
    },
    {
      field: 'recycleVersion',
      headerName: '回收版本',
      width: 120,
      hideInSearch: true,
    },
    {
      field: 'expectedRecycleTime',
      headerName: '预计回收时间',
      width: 140,
      hideInSearch: true,
    },
    {
      field: 'actualRecycleTime',
      headerName: '实际回收时间',
      width: 140,
      hideInSearch: true,
    },
    {
      field: 'action',
      headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
      width: 120,
      pinned: 'right',
      filter: false,
      sortable: false,
      cellRenderer: Options,
      cellRendererParams: { onRefresh, viewMode: 'detail' }
    }
  ], [intl, onRefresh]);

  const columnDefs = viewMode === 'detail' ? detailColumnDefs : headerColumnDefs;
  const gridKey = viewMode === 'detail'
    ? 'appPdm.DocumentManagement.DocumentRecycleOrder.detail'
    : 'appPdm.DocumentManagement.DocumentRecycleOrder';


  return (
    <AgGridPlus
      key={gridKey}
      gridRef={gridRef}
      headerTitle="文档回收"
      gridKey={gridKey}
      request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
        const isDetail = viewMode === 'detail';
        const fetcher = isDetail ? DocumentRecycleOrderGetItemDetailsListAsync : DocumentRecycleOrderGetListAsync;
        const data = await fetcher({
          Filter: params?.filter,
          SkipCount: params?.skipCount,
          MaxResultCount: params?.maxResultCount,
          Sorting: params?.sorter || (isDetail ? 'creationTime desc' : undefined),
        } as any);
        return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
      }}
      rowSelection="multiple"
      rowMultiSelectWithClick={true}
      columnDefs={columnDefs}
      toolBarRender={() => [
        <Segmented
          key="view-mode"
          value={viewMode}
          onChange={(value) => {
            setViewMode(value as 'detail' | 'header');
          }}
          options={[
            { label: '明细视图', value: 'detail' },
            { label: '主单视图', value: 'header' },
          ]}
        />,
        <Access key="create" accessible={canCreate}>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            新增
          </Button>
        </Access>,
      ]}
    />
  );
};

export default DocumentRecycleOrderPage;

export const routeProps = {
  name: '文档回收',
};
