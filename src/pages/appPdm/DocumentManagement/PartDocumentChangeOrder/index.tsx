import { AgGridPlus } from '@/components/agGrid';
import DeleteConfirm from '@/components/deleteConfirm';
import {
  PartDocumentChangeOrderGetListAsync,
  PartDocumentChangeOrderDeleteAsync,
  PartDocumentChangeOrderCloseAsync,
} from '@/services/pdm/PartDocumentChangeOrder';
import { DeleteOutlined, EyeOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef, useMemo } from 'react';
import { Access, useAccess, useIntl, history } from 'umi';
import { PartDocumentChangeOrderPermissions } from '@/pages/appPdm/_permissions';
import { partDocumentChangeOrderStatusEnum, PartDocumentChangeOrderStatus } from './_enums';
import dayjs from 'dayjs';

const StatusRenderer = (props: ICellRendererParams) => {
  const { value } = props;
  const statusItem = partDocumentChangeOrderStatusEnum.find(item => item.value === value);
  if (!statusItem) return value;
  return <Tag color={statusItem.color}>{statusItem.label}</Tag>;
};

const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();
  const canDelete = !!(access && (access[PartDocumentChangeOrderPermissions.Delete] ?? true));
  const canClose = !!(access && (access[PartDocumentChangeOrderPermissions.Close] ?? true));

  // 查看明细
  const handleView = () => {
    history.push(`/appPdm/DocumentManagement/PartDocumentChangeOrder/detail?id=${data.id}`);
  };

  // 删除
  const handleDelete = async () => {
    const hide = message.loading('正在删除...', 0);
    try {
      await PartDocumentChangeOrderDeleteAsync({ id: data.id });
      message.success('删除成功');
      onRefresh();
    } catch (error) {
      message.error('删除失败');
    } finally {
      hide();
    }
  };

  // 关闭
  const handleClose = async () => {
    const hide = message.loading('正在关闭...', 0);
    try {
      await PartDocumentChangeOrderCloseAsync({
        id: data.id,
      } as any);
      message.success('关闭成功');
      onRefresh();
    } catch (error) {
      message.error('关闭失败');
    } finally {
      hide();
    }
  };

  // 根据状态显示不同操作
  const isInProgress = data.orderStatus === PartDocumentChangeOrderStatus.InProgress;
  const isCompleted = data.orderStatus === PartDocumentChangeOrderStatus.Completed;

  return (
    <Space>
      <Button
        size="small"
        icon={<EyeOutlined />}
        type="link"
        title="查看"
        onClick={handleView}
      />
      {isInProgress && (
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
      {(isInProgress || isCompleted) && (
        <Access accessible={canClose}>
          <DeleteConfirm title="确定关闭该更改单?" onConfirm={handleClose}>
            <Button
              size="small"
              icon={<CloseCircleOutlined />}
              type="link"
              danger
              title="关闭"
            />
          </DeleteConfirm>
        </Access>
      )}
    </Space>
  );
};

const PartDocumentChangeOrderPage: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = !!(access && (access[PartDocumentChangeOrderPermissions.Create] ?? true));

  const onRefresh = () => gridRef.current?.onRefresh();

  // 列定义
  const columnDefs: any = useMemo(() => [
    {
      field: 'number',
      headerName: '更改单号',
      width: 200,
      cellRenderer: (params: any) => {
        const { data } = params;
        return (
          <a
            onClick={() => history.push(`/appPdm/DocumentManagement/PartDocumentChangeOrder/detail?id=${data.id}`)}
            style={{ color: '#1890ff', cursor: 'pointer' }}
          >
            {data.number}
          </a>
        );
      }
    },
    { field: 'partNo', headerName: '物料编号', width: 160 },
    { field: 'productLine', headerName: '产品线', width: 120, hideInSearch: true },
    { field: 'docNo', headerName: '文档编号', width: 160 },
    { field: 'docName', headerName: '文档名称', width: 200, hideInSearch: true },
    { field: 'docType', headerName: '文档类型', width: 120, hideInSearch: true },
    { field: 'docVersion', headerName: '文档版本', width: 100, hideInSearch: true },
    {
      field: 'orderStatus',
      headerName: '状态',
      width: 120,
      cellRenderer: StatusRenderer as any,
      valueEnum: partDocumentChangeOrderStatusEnum
    },
    { field: 'activityDisplayName', headerName: '当前节点', width: 120, hideInSearch: true },
    { field: 'assigneeName', headerName: '当前审批人', width: 120, hideInSearch: true },
    {
      field: 'effectiveDate',
      headerName: '生效日期',
      width: 140,
      hideInSearch: true,
      type: 'dateColumn'
    },
    {
      field: 'assignDate',
      headerName: '分配日期',
      width: 140,
      hideInSearch: true,
      type: 'dateColumn'
    },
    { field: 'engineer', headerName: '工程师', width: 100, hideInSearch: true },
    { field: 'changeRemark', headerName: '更改备注', width: 200, hideInSearch: true },
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
      width: 150,
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
      headerTitle="技术图纸更改"
      gridKey="appPdm.DocumentManagement.PartDocumentChangeOrder"
      request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
        const data = await PartDocumentChangeOrderGetListAsync({
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
          <Button
            type="primary"
            key="create"
            onClick={() => {
              history.push('/appPdm/DocumentManagement/PartDocumentChangeOrder/form');
            }}
          >
            {intl.formatMessage({ id: 'AbpUi:Create', defaultMessage: '新增' })}
          </Button>
        </Access>,
      ]}
    />
  );
};

export default PartDocumentChangeOrderPage;

export const routeProps = {
  name: '技术图纸更改单',
};
