import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import DeleteConfirm from '@/components/deleteConfirm';
import {
  EngineeringChangeNotificationGetListAsync,
  EngineeringChangeNotificationDeleteAsync,
} from '@/services/pdm/EngineeringChangeNotification';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, Input, Select, Space, message } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import EngineeringChangeNotificationFormDialog from './components/engineeringChangeNotificationFormDialog';
import { EngineeringChangeNotificationPermissions } from '@/pages/appPdm/_permissions';

const statusOptions = [
  { label: '草稿', value: 0 },
  { label: '审批中', value: 10 },
  { label: '已批准', value: 20 },
  { label: '已执行', value: 30 },
  { label: '已拒绝', value: 40 },
  { label: '已取消', value: 50 },
  { label: '已关闭', value: 60 },
];

const urgencyOptions = [
  { label: '低', value: 1 },
  { label: '中', value: 2 },
  { label: '高', value: 3 },
  { label: '紧急', value: 4 },
];

const reasonCategoryOptions = [
  { label: '设计优化', value: 1 },
  { label: '质量问题', value: 2 },
  { label: '法规合规', value: 3 },
  { label: '客户需求', value: 4 },
  { label: '材料变更', value: 5 },
  { label: '工艺改进', value: 6 },
  { label: '供应风险', value: 7 },
  { label: '其他', value: 8 },
];

const buildMap = (options: { label: string; value: number }[]) =>
  options.reduce((acc, cur) => ({ ...acc, [cur.value]: cur.label }), {} as Record<number, string>);

const statusText = buildMap(statusOptions);
const urgencyText = buildMap(urgencyOptions);
const reasonText = buildMap(reasonCategoryOptions);

const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();
  const canUpdate = (access && (access[EngineeringChangeNotificationPermissions.Update] ?? true)) as boolean;
  const canDelete = (access && (access[EngineeringChangeNotificationPermissions.Delete] ?? true)) as boolean;

  const handleDelete = (id: string) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return EngineeringChangeNotificationDeleteAsync({ id })
      .then(() => onRefresh())
      .finally(() => hide());
  };

  return (
    <Space>
      <Access accessible={canUpdate}>
        <EngineeringChangeNotificationFormDialog
          title={'编辑变更通知'}
          entityId={data.id}
          onAfterSubmit={onRefresh}
          buttonProps={{ icon: <EditOutlined />, type: 'link', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
        />
      </Access>
      <Access accessible={canDelete}>
        <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
          <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
        </DeleteConfirm>
      </Access>
    </Space>
  );
};

const EngineeringChangeNotificationPage: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const [searchValue, setSearchValue] = useState('');
  const [changeOrderNumber, setChangeOrderNumber] = useState<string>();
  const [status, setStatus] = useState<number>();
  const [priority, setPriority] = useState<number>();
  const canCreate = (access && (access[EngineeringChangeNotificationPermissions.Create] ?? true)) as boolean;

  useEffect(() => {
    gridRef.current?.onRefresh();
  }, [changeOrderNumber, status, priority]);

  const onRefresh = () => gridRef.current?.onRefresh();

  const statusRenderer = useMemo(() => (params: any) => statusText[params.value] || params.value, []);
  const urgencyRenderer = useMemo(() => (params: any) => urgencyText[params.value] || params.value, []);
  const reasonRenderer = useMemo(() => (params: any) => reasonText[params.value] || params.value, []);
  const boolRenderer = useMemo(() => (params: any) => (params.value ? '是' : '否'), []);

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle={'工程变更通知'}
      gridKey="appPdm.ChangeManagement.EngineeringChangeNotification"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await EngineeringChangeNotificationGetListAsync({
          ChangeOrderNumber: changeOrderNumber,
          Status: status,
          Priority: priority as any,
          SkipCount: params?.skipCount,
          MaxResultCount: params?.maxResultCount,
          Sorting: params?.sorter,
        } as any);
        return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
      }}
      rowSelection={'multiple'}
      rowMultiSelectWithClick={true}
      toolBarRender={() => [
        <Input.Search
          allowClear
          placeholder="通知编号"
          value={searchValue}
          style={{ width: 200 }}
          onChange={e => setSearchValue(e.target.value)}
          onSearch={value => setChangeOrderNumber(value)}
        />,
        <Select allowClear placeholder="状态" style={{ width: 140 }} value={status} onChange={setStatus} options={statusOptions} />,
        <Select allowClear placeholder="优先级" style={{ width: 140 }} value={priority} onChange={setPriority} options={urgencyOptions} />,
        <Access accessible={canCreate}>
          <EngineeringChangeNotificationFormDialog title={'新建变更通知'} onAfterSubmit={onRefresh} buttonProps={{ type: 'primary', icon: <PlusOutlined /> }}>
            新建
          </EngineeringChangeNotificationFormDialog>
        </Access>,
      ]}
    >
      <AgGridColumn field={'changeOrderNumber'} headerName={'通知编号'} width={180} />
      <AgGridColumn field={'title'} headerName={'标题'} width={220} />
      <AgGridColumn field={'notificationType'} headerName={'通知类型'} width={160} />
      <AgGridColumn field={'status'} headerName={'状态'} width={140} cellRenderer={statusRenderer as any} />
      <AgGridColumn field={'urgencyLevel'} headerName={'优先级'} width={120} cellRenderer={urgencyRenderer as any} />
      <AgGridColumn field={'reason.category'} headerName={'原因类别'} width={140} valueGetter={params => params.data?.reason?.category} cellRenderer={reasonRenderer as any} />
      <AgGridColumn field={'requiresAcknowledgment'} headerName={'需确认'} width={120} cellRenderer={boolRenderer as any} />
      <AgGridColumn field={'targetRecipients'} headerName={'接收人'} width={200} />
      <AgGridColumn field={'creator'} headerName={'创建人'} width={150} />
      <AgGridColumn field={'creationTime'} headerName={'创建时间'} width={200} />
      <AgGridColumn
        field={'action'}
        headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
        width={140}
        pinned={'right'}
        filter={false}
        sortable={false}
        cellRenderer={Options}
        cellRendererParams={{ onRefresh }}
      />
    </AgGridPlus>
  );
};

export default EngineeringChangeNotificationPage;

export const routeProps = {
  name: '工程变更通知',
};
