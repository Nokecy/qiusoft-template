import { AgGridPlus } from '@/components/agGrid';
import DeleteConfirm from '@/components/deleteConfirm';
import {
  DocumentCheckOutRequestGetListAsync,
  DocumentCheckOutRequestGetItemDetailsListAsync,
  DocumentCheckOutRequestDeleteAsync,
  DocumentCheckOutRequestSubmitAsync,
} from '@/services/pdm/DocumentCheckOutRequest';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SendOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag, Segmented } from 'antd';
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Access, useAccess, useIntl, history } from 'umi';
import { DocumentCheckOutRequestPermissions } from '@/pages/appPdm/_permissions';
import { documentCheckOutRequestStatusEnum, DocumentCheckOutRequestStatus, checkOutStatusEnum } from './_enums';
import dayjs from 'dayjs';

// 审批状态渲染器
const StatusRenderer = (props: ICellRendererParams) => {
  const { value } = props;
  const statusItem = documentCheckOutRequestStatusEnum.find(item => item.value === value);
  if (!statusItem) return value;
  return <Tag color={statusItem.color}>{statusItem.label}</Tag>;
};

// 单据状态渲染器
const CheckOutStatusRenderer = (props: ICellRendererParams) => {
  const { value } = props;
  const statusItem = checkOutStatusEnum.find(item => item.value === value);
  if (!statusItem) return value;
  return <Tag color={statusItem.color}>{statusItem.label}</Tag>;
};

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void; viewMode: 'detail' | 'header' }) => {
  const { data, onRefresh, viewMode } = props;
  const intl = useIntl();
  const access = useAccess();
  const canUpdate = !!(access && (access[DocumentCheckOutRequestPermissions.Update] ?? true));
  const canDelete = !!(access && (access[DocumentCheckOutRequestPermissions.Delete] ?? true));
  const canSubmit = !!(access && (access[DocumentCheckOutRequestPermissions.Submit] ?? true));

  // 查看明细
  const handleView = () => {
    const targetId = viewMode === 'detail' ? data.requestId : data.id;
    history.push(`/appPdm/DocumentManagement/DocumentCheckOutRequest/detail?id=${targetId}`);
  };

  // 编辑（跳转到表单页）
  const handleEdit = () => {
    history.push(`/appPdm/DocumentManagement/DocumentCheckOutRequest/form?id=${data.id}`);
  };

  // 删除
  const handleDelete = async () => {
    const hide = message.loading('正在删除...', 0);
    try {
      await DocumentCheckOutRequestDeleteAsync({ id: data.id });
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
      await DocumentCheckOutRequestSubmitAsync({ id: data.id });
      message.success('提交成功');
      onRefresh();
    } catch (error) {
      message.error('提交失败');
    } finally {
      hide();
    }
  };

  // 根据状态显示不同操作
  const isPending = data.workflowStatus === DocumentCheckOutRequestStatus.Pending;
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
      {allowOperate && isPending && (
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
      {allowOperate && isPending && (
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
      {allowOperate && isPending && (
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

const DocumentCheckOutRequestPage: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = !!(access && (access[DocumentCheckOutRequestPermissions.Create] ?? true));
  const [viewMode, setViewMode] = useState<'detail' | 'header'>('detail');
  const didMountRef = useRef(false);

  const onRefresh = () => gridRef.current?.onRefresh();

  // 新建申请单（跳转到表单页）
  const handleCreate = () => {
    history.push('/appPdm/DocumentManagement/DocumentCheckOutRequest/form');
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
      field: 'requestNumber',
      headerName: '申请单号',
      width: 180,
      cellRenderer: (params: any) => {
        const { data } = params;
        return (
          <a
            onClick={() => history.push(`/appPdm/DocumentManagement/DocumentCheckOutRequest/detail?id=${data.id}`)}
            style={{ color: '#1890ff', cursor: 'pointer' }}
          >
            {data.requestNumber}
          </a>
        );
      }
    },
    {
      field: 'applicantName',
      headerName: '申请人',
      width: 120,
    },
    {
      field: 'creationTime',
      headerName: '申请时间',
      width: 160,
      hideInSearch: true,
      initialSort: 'desc',
      type: 'dateColumn',
      cellRenderer: ({ value }: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-'
    },
    {
      field: 'processorName',
      headerName: '处理人',
      width: 120,
      hideInSearch: true,
    },
    {
      field: 'reason',
      headerName: '申请原因',
      width: 200,
      hideInSearch: true,
    },
    {
      field: 'checkOutStatus',
      headerName: '单据状态',
      width: 120,
      cellRenderer: CheckOutStatusRenderer as any,
      valueEnum: checkOutStatusEnum
    },
    {
      field: 'currentActivityName',
      headerName: '当前节点',
      width: 120,
      hideInSearch: true,
    },
    {
      field: 'currentAssigneeName',
      headerName: '当前审批人',
      width: 120,
      hideInSearch: true,
    },
    {
      field: 'remark',
      headerName: '备注',
      width: 200,
      hideInSearch: true,
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
      field: 'requestNumber',
      headerName: '申请单号',
      width: 180,
      cellRenderer: (params: any) => {
        const { data } = params;
        return (
          <a
            onClick={() => history.push(`/appPdm/DocumentManagement/DocumentCheckOutRequest/detail?id=${data.requestId}`)}
            style={{ color: '#1890ff', cursor: 'pointer' }}
          >
            {data.requestNumber}
          </a>
        );
      }
    },
    {
      field: 'applicantName',
      headerName: '申请人',
      width: 120,
    },
    {
      field: 'checkOutStatus',
      headerName: '单据状态',
      width: 120,
      cellRenderer: CheckOutStatusRenderer as any,
      valueEnum: checkOutStatusEnum
    },
    {
      field: 'currentActivityName',
      headerName: '当前节点',
      width: 120,
      hideInSearch: true,
    },
    {
      field: 'currentAssigneeName',
      headerName: '当前审批人',
      width: 120,
      hideInSearch: true,
    },
    {
      field: 'creationTime',
      headerName: '申请时间',
      width: 160,
      hideInSearch: true,
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
      field: 'documentVersion',
      headerName: '文档版本',
      width: 120,
      hideInSearch: true,
    },
    {
      field: 'documentTypeName',
      headerName: '文档类型',
      width: 140,
      hideInSearch: true,
    },
    {
      field: 'fileName',
      headerName: '文件名称',
      width: 160,
      hideInSearch: true,
    },
    {
      field: 'partNumber',
      headerName: '物料编码',
      width: 140,
      hideInSearch: true,
    },
    {
      field: 'partName',
      headerName: '物料名称',
      width: 140,
      hideInSearch: true,
    },
    {
      field: 'drawingNumber',
      headerName: '图号',
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
    ? 'appPdm.DocumentManagement.DocumentCheckOutRequest.detail'
    : 'appPdm.DocumentManagement.DocumentCheckOutRequest';


  return (
    <AgGridPlus
      key={gridKey}
      gridRef={gridRef}
      headerTitle="文档检出申请"
      gridKey={gridKey}
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const isDetail = viewMode === 'detail';
        const fetcher = isDetail ? DocumentCheckOutRequestGetItemDetailsListAsync : DocumentCheckOutRequestGetListAsync;
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
            新建
          </Button>
        </Access>,
      ]}
    />
  );
};

export default DocumentCheckOutRequestPage;

export const routeProps = {
  name: '文档检出申请',
};
