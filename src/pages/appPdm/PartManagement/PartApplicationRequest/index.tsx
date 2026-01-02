import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import DeleteConfirm from '@/components/deleteConfirm';
import {
  PartApplicationRequestGetListAsync,
  PartApplicationRequestDeleteAsync,
  PartApplicationRequestSubmitAsync,
  PartApplicationRequestCancelAsync,
} from '@/services/pdm/PartApplicationRequest';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SendOutlined, CloseCircleOutlined, RedoOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef, useMemo } from 'react';
import { Access, useAccess, useIntl, history } from 'umi';
import { PartApplicationRequestPermissions } from '@/pages/appPdm/_permissions';
import { partApplicationRequestStatusEnum, PartApplicationRequestStatus } from './_enums';
import dayjs from 'dayjs';

// 状态渲染器
const StatusRenderer = (props: ICellRendererParams) => {
  const { value } = props;
  const statusItem = partApplicationRequestStatusEnum.find(item => item.value === value);
  if (!statusItem) return value;
  return <Tag color={statusItem.color}>{statusItem.label}</Tag>;
};

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();
  const canCreate = !!(access && (access[PartApplicationRequestPermissions.Create] ?? true));
  const canUpdate = !!(access && (access[PartApplicationRequestPermissions.Update] ?? true));
  const canDelete = !!(access && (access[PartApplicationRequestPermissions.Delete] ?? true));
  const canSubmit = !!(access && (access[PartApplicationRequestPermissions.Submit] ?? true));
  const canCancel = !!(access && (access[PartApplicationRequestPermissions.Cancel] ?? true));

  // 查看明细
  const handleView = () => {
    history.push(`/appPdm/PartManagement/PartApplicationRequest/detail?id=${data.id}`);
  };

  // 编辑（跳转到表单页）
  const handleEdit = () => {
    history.push(`/appPdm/PartManagement/PartApplicationRequest/form?id=${data.id}`);
  };

  // 重新发起（复制数据到表单页）
  const handleRestart = () => {
    history.push(`/appPdm/PartManagement/PartApplicationRequest/form?copyFrom=${data.id}`);
  };

  // 删除
  const handleDelete = async () => {
    const hide = message.loading('正在删除...', 0);
    try {
      await PartApplicationRequestDeleteAsync({ id: data.id });
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
      await PartApplicationRequestSubmitAsync({ id: data.id });
      message.success('提交成功');
      onRefresh();
    } catch (error) {
      message.error('提交失败');
    } finally {
      hide();
    }
  };

  // 取消申请
  const handleCancel = async () => {
    const hide = message.loading('正在取消...', 0);
    try {
      await PartApplicationRequestCancelAsync({ id: data.id });
      message.success('取消成功');
      onRefresh();
    } catch (error) {
      message.error('取消失败');
    } finally {
      hide();
    }
  };

  // 根据状态显示不同操作
  const isPending = data.status === PartApplicationRequestStatus.Pending;
  const isInReview = data.status === PartApplicationRequestStatus.UnderReview;
  const isCancelled = data.status === PartApplicationRequestStatus.Cancelled;

  return (
    <Space>
      <Button
        size="small"
        icon={<EyeOutlined />}
        type="link"
        title="查看"
        onClick={handleView}
      />
      {isPending && (
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
      {isPending && (
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
      {isPending && (
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
      {isInReview && (
        <Access accessible={canCancel}>
          <DeleteConfirm title="确定取消申请?" onConfirm={handleCancel}>
            <Button
              size="small"
              icon={<CloseCircleOutlined />}
              type="link"
              danger
              title="取消"
            />
          </DeleteConfirm>
        </Access>
      )}
      {isCancelled && (
        <Access accessible={canCreate}>
          <Button
            size="small"
            icon={<RedoOutlined />}
            type="link"
            title="重新发起"
            onClick={handleRestart}
          />
        </Access>
      )}
    </Space>
  );
};

const PartApplicationRequestPage: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = !!(access && (access[PartApplicationRequestPermissions.Create] ?? true));

  const onRefresh = () => gridRef.current?.onRefresh();

  // 新建申请单（跳转到表单页）
  const handleCreate = () => {
    history.push('/appPdm/PartManagement/PartApplicationRequest/form');
  };

  // 列定义
  const columnDefs: any = useMemo(() => [
    {
      field: 'requestNumber',
      headerName: '申请单号',
      width: 180,
      cellRenderer: (params: any) => {
        const { data } = params;
        return (
          <a
            onClick={() => history.push(`/appPdm/PartManagement/PartApplicationRequest/detail?id=${data.id}`)}
            style={{ color: '#1890ff', cursor: 'pointer' }}
          >
            {data.requestNumber}
          </a>
        );
      }
    },
    {
      field: 'requestDate',
      headerName: '申请日期',
      width: 140,
      hideInSearch: true,
      type: 'dateColumn'
    },
    {
      field: 'partInfo.description',
      headerName: '物料描述',
      width: 220,
      valueGetter: (params: any) => params.data?.partInfo?.description
    },
    {
      field: 'partInfo.specification',
      headerName: '规格型号',
      width: 160,
      hideInSearch: true,
      valueGetter: (params: any) => params.data?.partInfo?.specification
    },
    {
      field: 'partInfo.unitName',
      headerName: '单位',
      width: 80,
      hideInSearch: true,
      valueGetter: (params: any) => params.data?.partInfo?.unitName
    },
    { field: 'requestReason', headerName: '申请理由', width: 180, hideInSearch: true },
    {
      field: 'status',
      headerName: '状态',
      width: 120,
      cellRenderer: StatusRenderer as any,
      valueEnum: partApplicationRequestStatusEnum
    },
    { field: 'currentActivityName', headerName: '当前节点', width: 120, hideInSearch: true },
    { field: 'currentAssigneeName', headerName: '当前审批人', width: 120, hideInSearch: true },
    { field: 'approvedPartNumber', headerName: '批准物料编号', width: 160, hideInSearch: true },
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
      width: 200,
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
      headerTitle="物料料号申请单"
      gridKey="appPdm.PartManagement.PartApplicationRequest"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await PartApplicationRequestGetListAsync({
          Filter: params?.filter,
          SkipCount: params?.skipCount,
          MaxResultCount: params?.maxResultCount,
          Sorting: params?.sorter,
        } as any);
        return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
      }}
      rowSelection="multiple"
      rowMultiSelectWithClick={true}
      columnDefs={columnDefs}
      toolBarRender={() => [
        <Access key="create" accessible={canCreate}>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            新建
          </Button>
        </Access>,
      ]}
    />
  );
};

export default PartApplicationRequestPage;

export const routeProps = {
  name: '物料料号申请单',
};
