import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { RecordInformationGetListAsync, RecordInformationDeleteAsync } from '@/services/pdm/RecordInformation';
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl, useNavigate } from 'umi';
import DeleteConfirm from '@/components/deleteConfirm';
import { RecordInformationPermissions } from '@/pages/appPdm/_permissions';

// 记录单状态枚举
const RecordStatus = {
  Draft: 0,
  Submitted: 1,
  Approved: 2,
  Executing: 3,
  Completed: 4,
  AbnormalClosed: 5,
  Withdrawn: 6,
};

const recordStatusEnum = [
  { label: '草稿', value: RecordStatus.Draft, color: 'default' },
  { label: '已提交', value: RecordStatus.Submitted, color: 'processing' },
  { label: '已批准', value: RecordStatus.Approved, color: 'success' },
  { label: '执行中', value: RecordStatus.Executing, color: 'warning' },
  { label: '已完成', value: RecordStatus.Completed, color: 'success' },
  { label: '异常关闭', value: RecordStatus.AbnormalClosed, color: 'error' },
  { label: '已撤回', value: RecordStatus.Withdrawn, color: 'default' },
];

// 状态渲染
const StatusRender = (props: ICellRendererParams) => {
  const { value } = props;
  const status = recordStatusEnum.find(s => s.value === value);
  return status ? <Tag color={status.color} style={{ fontWeight: 'bold' }}>{status.label}</Tag> : <Tag>{value}</Tag>;
};

// 记录单号渲染 - 点击跳转到详情页
const CodeRender = (props: ICellRendererParams & { navigate?: any }) => {
  const { data, value, navigate } = props;

  const handleClick = () => {
    if (data?.id && navigate) {
      navigate(`/appPdm/ProjectManagement/RecordInformationList/detail?id=${data.id}`);
    }
  };

  return (
    <Button
      type="link"
      size="small"
      style={{ padding: 0, height: 'auto' }}
      onClick={handleClick}
    >
      {value}
    </Button>
  );
};

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();
  const navigate = useNavigate();

  const canUpdate = !!(access && access[RecordInformationPermissions.Update]);
  const canDelete = !!(access && access[RecordInformationPermissions.Delete]);

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return RecordInformationDeleteAsync({ id }).then(() => onRefresh()).finally(() => hide());
  };

  // 查看详情
  const handleViewDetail = () => {
    navigate(`/appPdm/ProjectManagement/RecordInformationList/detail?id=${data.id}`);
  };

  // 编辑记录单
  const handleEdit = () => {
    navigate(`/appPdm/ProjectManagement/RecordInformationList/form?id=${data.id}`);
  };

  return (
    <Space>
      <Button
        size={'small'}
        icon={<EyeOutlined />}
        type={'link'}
        title="查看详情"
        onClick={handleViewDetail}
      />

      <Access accessible={canUpdate}>
        <Button
          size={'small'}
          icon={<EditOutlined />}
          type={'link'}
          title={intl.formatMessage({ id: 'AbpUi:Edit' })}
          onClick={handleEdit}
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

const RecordInformationListPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const navigate = useNavigate();
  const access = useAccess();
  const canCreate = !!(access && access[RecordInformationPermissions.Create]);

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  // 新建记录单
  const handleCreate = () => {
    navigate('/appPdm/ProjectManagement/RecordInformationList/form');
  };

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle={'记录单信息'}
      gridKey="appPdm.ProjectManagement.RecordInformation"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await RecordInformationGetListAsync(
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
      toolBarRender={() => {
        return [
          <Access accessible={canCreate} key="create">
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
              新建
            </Button>
          </Access>,
        ];
      }}
    >
      <AgGridColumn field={'recordCode'} headerName={'记录单号'} width={150} cellRenderer={CodeRender} cellRendererParams={{ navigate }} />
      <AgGridColumn field={'subject'} headerName={'主题'} width={220} />
      <AgGridColumn field={'proposerUserName'} headerName={'提出人'} width={120} />
      <AgGridColumn field={'proposedDate'} headerName={'提出时间'} width={180} hideInSearch={true} initialSort={'desc'} />
      {/* <AgGridColumn field={'implementationStatus'} headerName={'状态'} width={120} hideInSearch={true} cellRenderer={StatusRender} /> */}
      <AgGridColumn field={'eventContent'} headerName={'事项内容'} width={250} hideInSearch={true} flex={1} />
      <AgGridColumn
        field={'action'}
        headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
        width={160}
        pinned={'right'}
        filter={false}
        sortable={false}
        cellRenderer={Options}
        cellRendererParams={{ onRefresh }}
      />
    </AgGridPlus>
  );
};

export default RecordInformationListPage;

export const routeProps = {
  name: '记录单信息',
};
