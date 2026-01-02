import { AgGridPlus } from '@/components/agGrid';
import DeleteConfirm from '@/components/deleteConfirm';
import {
  DocumentChangeOrderGetListAsync,
  DocumentChangeOrderGetItemDetailsListAsync,
  DocumentChangeOrderDeleteAsync,
  DocumentChangeOrderSubmitForApprovalAsync,
} from '@/services/pdm/DocumentChangeOrder';
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined, DownOutlined, SendOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, Space, message, Dropdown, Tag, Segmented } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Access, useAccess, useIntl, history } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import DocumentChangeOrderFormDialog from './components/documentChangeOrderFormDialog';
import { openQuickCreateDialog } from './components/QuickCreateDialog';
import { DocumentChangeOrderPermissions } from '@/pages/appPdm/_permissions';
import {
  changeOrderStatusEnum,
  DocumentChangeOrderStatus,
} from './_enums';

// 状态渲染器
const statusRenderer = (props: ICellRendererParams) => {
  const { value } = props;
  const item = changeOrderStatusEnum.find(i => i.value === value);
  if (!item) return value;
  return <Tag color={item.color}>{item.label}</Tag>;
};

const Options = (props: ICellRendererParams & { onRefresh: () => void; viewMode: 'detail' | 'header' }) => {
  const { data, onRefresh, viewMode } = props;
  const intl = useIntl();
  const access = useAccess();
  const canUpdate = !!(access && (access[DocumentChangeOrderPermissions.Update] ?? true));
  const canDelete = !!(access && (access[DocumentChangeOrderPermissions.Delete] ?? true));
  const canSubmit = !!(access && (access[DocumentChangeOrderPermissions.Submit] ?? true));

  // 判断是否为草稿状态
  const isDraft = data.status === DocumentChangeOrderStatus.Draft;
  const allowOperate = viewMode === 'header';

  // 查看详情
  const handleView = () => {
    const targetId = viewMode === 'detail' ? data.changeOrderId : data.id;
    history.push(`/appPdm/ChangeManagement/DocumentChangeOrder/detail?id=${targetId}`);
  };

  // 编辑(跳转到表单页)
  const handleEdit = () => {
    history.push(`/appPdm/ChangeManagement/DocumentChangeOrder/form?id=${data.id}`);
  };

  // 提交审批
  const handleSubmit = async () => {
    const hide = message.loading('正在提交审批,请稍后...', 0);
    try {
      await DocumentChangeOrderSubmitForApprovalAsync({ id: data.id });
      message.success('提交成功');
      onRefresh();
    } catch (error) {
      // 错误由全局拦截器处理
    } finally {
      hide();
    }
  };

  const handleDelete = (id: string) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return DocumentChangeOrderDeleteAsync({ id })
      .then(() => onRefresh())
      .finally(() => hide());
  };

  return (
    <Space>
      <Button
        size="small"
        icon={<EyeOutlined />}
        type="link"
        title="查看"
        onClick={handleView}
      />
      <Access accessible={allowOperate && canUpdate}>
        <Button
          size="small"
          icon={<EditOutlined />}
          type="link"
          title={intl.formatMessage({ id: 'AbpUi:Edit' })}
          onClick={handleEdit}
        />
      </Access>
      {isDraft && (
        <Access accessible={allowOperate && canSubmit}>
          <Button
            size="small"
            icon={<SendOutlined />}
            type="link"
            title="提交审批"
            onClick={handleSubmit}
          />
        </Access>
      )}
      <Access accessible={allowOperate && canDelete}>
        <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
          <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
        </DeleteConfirm>
      </Access>
    </Space>
  );
};

const DocumentChangeOrderPage: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = !!(access && (access[DocumentChangeOrderPermissions.Create] ?? true));
  const [viewMode, setViewMode] = useState<'detail' | 'header'>('detail');
  const didMountRef = useRef(false);

  // Read route params
  const { params, isActive } = useKeepAliveParams('/appPdm/ChangeManagement/DocumentChangeOrder', ['refresh']);

  // Refresh when route query requests it
  useEffect(() => {
    if (isActive && params.refresh === 'true') {
      setTimeout(() => {
        onRefresh();
        history.replace('/appPdm/ChangeManagement/DocumentChangeOrder');
      }, 100);
    }
  }, [isActive, params.refresh]);

  const onRefresh = () => gridRef.current?.onRefresh();

  const handleCreate = () => {
    history.push('/appPdm/ChangeManagement/DocumentChangeOrder/form');
  };

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    onRefresh();
  }, [viewMode]);

  const handleQuickCreate = () => {
    openQuickCreateDialog({
      onSuccess: () => {
        onRefresh();
      },
    });
  };

  const headerColumnDefs: any = useMemo(() => [
    {
      field: 'changeOrderNumber',
      headerName: '变更编号',
      width: 180,
      cellRenderer: (params: any) => {
        const { data } = params;
        return (
          <a
            onClick={() => history.push(`/appPdm/ChangeManagement/DocumentChangeOrder/detail?id=${data.id}`)}
            style={{ color: '#1890ff', cursor: 'pointer' }}
          >
            {data.changeOrderNumber}
          </a>
        );
      }
    },
    { field: 'title', headerName: '变更主题', width: 220 },
    { field: 'status', headerName: '单据状态', width: 140, cellRenderer: statusRenderer as any },
    { field: 'creator', headerName: '发起人', width: 160, hideInSearch: true },
    {
      field: 'creationTime',
      headerName: '发起时间',
      width: 180,
      hideInSearch: true,
      initialSort: 'desc',
      type: 'dateTimeColumn'
    },
    { field: 'assignedToUserName', headerName: '处理人', width: 160, hideInSearch: true },
    { field: 'currentActivityName', headerName: '当前节点', width: 160, hideInSearch: true },
    { field: 'currentAssigneeName', headerName: '当前审批人', width: 160, hideInSearch: true },
    { field: 'changeReason', headerName: '变更原因', width: 200, hideInTable: true },
    { field: 'remarks', headerName: '备注', width: 200, hideInTable: true },
    {
      field: 'action',
      headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
      width: 140,
      pinned: 'right',
      filter: false,
      sortable: false,
      cellRenderer: Options,
      cellRendererParams: { onRefresh, viewMode: 'header' }
    }
  ], [intl, onRefresh]);

  const detailColumnDefs: any = useMemo(() => [
    {
      field: 'changeOrderNumber',
      headerName: '变更编号',
      width: 180,
      cellRenderer: (params: any) => {
        const { data } = params;
        return (
          <a
            onClick={() => history.push(`/appPdm/ChangeManagement/DocumentChangeOrder/detail?id=${data.changeOrderId}`)}
            style={{ color: '#1890ff', cursor: 'pointer' }}
          >
            {data.changeOrderNumber}
          </a>
        );
      }
    },
    { field: 'title', headerName: '变更主题', width: 220, hideInSearch: true },
    {
      field: 'changeOrderStatus',
      headerName: '单据状态',
      width: 140,
      hideInSearch: true,
      cellRenderer: statusRenderer as any,
      valueEnum: changeOrderStatusEnum
    },
    { field: 'currentHandler', headerName: '当前处理人', width: 160, hideInSearch: true },
    { field: 'assignedToUserName', headerName: '处理人', width: 160, hideInSearch: true },
    {
      field: 'creationTime',
      headerName: '发起时间',
      width: 180,
      hideInSearch: true,
      initialSort: 'desc',
      type: 'dateTimeColumn'
    },
    { field: 'documentNumber', headerName: '文档编号', width: 160 },
    { field: 'documentName', headerName: '文档名称', width: 200 },
    { field: 'documentVersion', headerName: '文档版本', width: 120, hideInSearch: true },
    { field: 'partCode', headerName: '物料编码', width: 140, hideInSearch: true },
    { field: 'partName', headerName: '物料名称', width: 140, hideInSearch: true },
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
    ? 'appPdm.ChangeManagement.DocumentChangeOrder.detail'
    : 'appPdm.ChangeManagement.DocumentChangeOrder';

  return (
    <AgGridPlus
      key={gridKey}
      gridRef={gridRef}
      headerTitle={'文档变更单'}
      gridKey={gridKey}
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const isDetail = viewMode === 'detail';
        const fetcher = isDetail ? DocumentChangeOrderGetItemDetailsListAsync : DocumentChangeOrderGetListAsync;
        const data = await fetcher({
          SkipCount: params?.skipCount,
          MaxResultCount: params?.maxResultCount,
          Sorting: params?.sorter || 'creationTime desc',
        } as any);
        return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
      }}
      rowSelection={'multiple'}
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
          <Dropdown
            menu={{
              items: [
                {
                  key: 'standard',
                  label: '标准新建',
                  icon: <PlusOutlined />,
                  onClick: handleCreate,
                },
                {
                  key: 'quick',
                  label: '快速新建',
                  icon: <PlusOutlined />,
                  onClick: handleQuickCreate,
                },
              ],
            }}
          >
            <Button type="primary" icon={<PlusOutlined />}>
              新建 <DownOutlined />
            </Button>
          </Dropdown>
        </Access>,
      ]}
    />
  );
};

export default DocumentChangeOrderPage;

export const routeProps = {
  name: '文档变更管理',
};
