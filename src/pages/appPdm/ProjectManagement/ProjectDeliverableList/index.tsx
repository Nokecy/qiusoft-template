import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { ProjectDeliverableGetListAsync, ProjectDeliverableDeleteAsync } from '@/services/pdm/ProjectDeliverable';
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl, useNavigate } from 'umi';
import ProjectDeliverableFormDialog from './components/ProjectDeliverableFormDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { ProjectDeliverablePermissions } from '@/pages/appPdm/_permissions';

// 成果状态枚举
const DeliverableStatus = {
  NotStarted: 0,
  InProgress: 1,
  Completed: 2,
  Delayed: 3,
};

const deliverableStatusEnum = [
  { label: '未开始', value: DeliverableStatus.NotStarted, color: 'default' },
  { label: '进行中', value: DeliverableStatus.InProgress, color: 'processing' },
  { label: '已完成', value: DeliverableStatus.Completed, color: 'success' },
  { label: '已延期', value: DeliverableStatus.Delayed, color: 'error' },
];

// 状态渲染
const StatusRender = (props: ICellRendererParams) => {
  const { value } = props;
  const status = deliverableStatusEnum.find(s => s.value === value);
  return status ? <Tag color={status.color} style={{ fontWeight: 'bold' }}>{status.label}</Tag> : <Tag>{value}</Tag>;
};

// 成果编码渲染 - 点击跳转到详情页
const CodeRender = (props: ICellRendererParams & { navigate?: any }) => {
  const { data, value, navigate } = props;

  const handleClick = () => {
    if (data?.id && navigate) {
      navigate(`/appPdm/ProjectManagement/ProjectDeliverableList/detail?id=${data.id}`);
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

  const canUpdate = !!(access && access[ProjectDeliverablePermissions.Update]);
  const canDelete = !!(access && access[ProjectDeliverablePermissions.Delete]);

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return ProjectDeliverableDeleteAsync({ id }).then(() => onRefresh()).finally(() => hide());
  };

  // 查看详情
  const handleViewDetail = () => {
    navigate(`/appPdm/ProjectManagement/ProjectDeliverableList/detail?id=${data.id}`);
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
        <ProjectDeliverableFormDialog
          title={'编辑项目成果'}
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

const ProjectDeliverableListPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const navigate = useNavigate();
  const access = useAccess();
  const canCreate = !!(access && access[ProjectDeliverablePermissions.Create]);

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle={'项目成果'}
      gridKey="appPdm.ProjectManagement.ProjectDeliverable"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await ProjectDeliverableGetListAsync(
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
          <Access accessible={canCreate}>
            <ProjectDeliverableFormDialog title={'新建项目成果'} onAfterSubmit={onRefresh}>
              <PlusOutlined /> 新建
            </ProjectDeliverableFormDialog>
          </Access>,
        ];
      }}
    >
      <AgGridColumn field={'deliverableCode'} headerName={'成果编码'} width={150} cellRenderer={CodeRender} cellRendererParams={{ navigate }} />
      <AgGridColumn field={'deliverableName'} headerName={'成果名称'} width={200} />
      <AgGridColumn field={'projectName'} headerName={'所属项目'} width={180} />
      <AgGridColumn field={'responsibleUserName'} headerName={'负责人'} width={120} />
      <AgGridColumn field={'plannedDate'} headerName={'计划完成日期'} width={140} hideInSearch={true} />
      <AgGridColumn field={'actualDate'} headerName={'实际完成日期'} width={140} hideInSearch={true} />
      {/* <AgGridColumn field={'status'} headerName={'状态'} width={100} hideInSearch={true} cellRenderer={StatusRender} /> */}
      <AgGridColumn field={'description'} headerName={'成果描述'} width={200} hideInSearch={true} flex={1}  />
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

export default ProjectDeliverableListPage;

export const routeProps = {
  name: '项目成果',
};
