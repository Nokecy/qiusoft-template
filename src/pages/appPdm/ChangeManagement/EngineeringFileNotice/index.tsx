import { AgGridPlus } from '@/components/agGrid';
import DeleteConfirm from '@/components/deleteConfirm';
import {
  EngineeringFileNotificationGetListAsync,
  EngineeringFileNotificationDeleteAsync,
} from '@/services/pdm/EngineeringFileNotification';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef, useMemo } from 'react';
import { Access, useAccess, useIntl, history } from 'umi';
import { engineeringFileNotificationStatusEnum, EngineeringFileNotificationStatus } from './_enums';
import dayjs from 'dayjs';

// 状态渲染器
const StatusRenderer = (props: ICellRendererParams) => {
  const { value } = props;
  const statusItem = engineeringFileNotificationStatusEnum.find(item => item.value === value);
  if (!statusItem) return value;
  return <Tag color={statusItem.color}>{statusItem.label}</Tag>;
};

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();

  // 查看明细
  const handleView = () => {
    history.push(`/appPdm/ChangeManagement/EngineeringFileNotice/detail?id=${data.id}`);
  };

  // 编辑(跳转到表单页)
  const handleEdit = () => {
    history.push(`/appPdm/ChangeManagement/EngineeringFileNotice/form?id=${data.id}`);
  };

  // 删除
  const handleDelete = async () => {
    const hide = message.loading('正在删除...', 0);
    try {
      await EngineeringFileNotificationDeleteAsync({ id: data.id });
      message.success('删除成功');
      onRefresh();
    } catch (error) {
      message.error('删除失败');
    } finally {
      hide();
    }
  };

  // 仅 草稿(Draft) 状态下允许编辑和删除
  const isDraft = data.orderStatus === EngineeringFileNotificationStatus.Draft;

  return (
    <Space>
      <Button
        size="small"
        icon={<EyeOutlined />}
        type="link"
        title="查看"
        onClick={handleView}
      />
      {isDraft && (
        <Button
          size="small"
          icon={<EditOutlined />}
          type="link"
          title={intl.formatMessage({ id: 'AbpUi:Edit' })}
          onClick={handleEdit}
        />
      )}
      {isDraft && (
        <DeleteConfirm title="确定删除?" onConfirm={handleDelete}>
          <Button
            size="small"
            icon={<DeleteOutlined />}
            type="link"
            title={intl.formatMessage({ id: 'AbpUi:Delete' })}
          />
        </DeleteConfirm>
      )}
    </Space>
  );
};

const EngineeringFileNotificationPage: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();

  const onRefresh = () => gridRef.current?.onRefresh();

  // 新建
  const handleCreate = () => {
    history.push('/appPdm/ChangeManagement/EngineeringFileNotice/form');
  };

  // 列定义
  const columnDefs: any = useMemo(() => [
    {
      field: 'number',
      headerName: '通知单号',
      width: 180,
      cellRenderer: (params: any) => {
        const { data } = params;
        return (
          <a
            onClick={() => history.push(`/appPdm/ChangeManagement/EngineeringFileNotice/detail?id=${data.id}`)}
            style={{ color: '#1890ff', cursor: 'pointer' }}
          >
            {data.number}
          </a>
        );
      }
    },
    { field: 'partNo', headerName: '产品编号', width: 150 },
    { field: 'docName', headerName: '图纸名称', width: 200 },
    { field: 'docVersion', headerName: '图纸版本', width: 100, hideInSearch: true },
    { field: 'changePage', headerName: '变更页数', width: 100, hideInSearch: true },
    { field: 'hwOrderNumber', headerName: 'HW单号', width: 150 },
    {
      field: 'orderStatus',
      headerName: '状态',
      width: 120,
      cellRenderer: StatusRenderer as any,
      valueEnum: engineeringFileNotificationStatusEnum
    },
    { field: 'assigneeName', headerName: '当前审批人', width: 120, hideInSearch: true },
    { field: 'activityDisplayName', headerName: '当前节点', width: 120, hideInSearch: true },
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
    {
      field: 'action',
      headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
      width: 160,
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
      headerTitle="工程文件通知单"
      gridKey="appPdm.ChangeManagement.EngineeringFileNotice"
      request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
        const data = await EngineeringFileNotificationGetListAsync({
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
        <Access key="create" accessible={true}>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            新建
          </Button>
        </Access>,
      ]}
    />
  );
};

export default EngineeringFileNotificationPage;

export const routeProps = {
  name: '工程文件通知单',
};
