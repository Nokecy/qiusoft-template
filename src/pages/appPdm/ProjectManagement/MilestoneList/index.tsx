import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { ProjectMilestoneGetListAsync, ProjectMilestoneDeleteAsync } from '@/services/pdm/ProjectMilestone';
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl, history } from 'umi';
import DeleteConfirm from '@/components/deleteConfirm';

// 里程碑状态枚举
const MilestoneStatus = {
  NotStarted: 0,
  InProgress: 1,
  Completed: 2,
  OnHold: 3,
  Cancelled: 4,
};

const milestoneStatusEnum = [
  { label: '未开始', value: MilestoneStatus.NotStarted, color: 'default' },
  { label: '进行中', value: MilestoneStatus.InProgress, color: 'processing' },
  { label: '已完成', value: MilestoneStatus.Completed, color: 'success' },
  { label: '已暂停', value: MilestoneStatus.OnHold, color: 'warning' },
  { label: '已取消', value: MilestoneStatus.Cancelled, color: 'error' },
];

// 状态渲染
const StatusRender = (props: ICellRendererParams) => {
  const { value } = props;
  const status = milestoneStatusEnum.find((s) => s.value === value);
  return status ? <Tag color={status.color}>{status.label}</Tag> : <Tag>{value}</Tag>;
};

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();

  // TODO: 配置实际的权限常量
  const canView = true;
  const canUpdate = true;
  const canDelete = true;

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return ProjectMilestoneDeleteAsync({ id })
      .then(() => onRefresh())
      .finally(() => hide());
  };

  const handleViewDetail = (id: string) => {
    history.push(`/app-pdm/project-management/milestone-list/detail?id=${id}`);
  };

  return (
    <Space>
      <Access accessible={canView}>
        <Button
          size={'small'}
          icon={<EyeOutlined />}
          type={'link'}
          title="查看详情"
          onClick={() => handleViewDetail(data.id)}
        />
      </Access>

      <Access accessible={canDelete}>
        <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
          <Button
            size={'small'}
            icon={<DeleteOutlined />}
            type={'link'}
            title={intl.formatMessage({ id: 'AbpUi:Delete' })}
          />
        </DeleteConfirm>
      </Access>
    </Space>
  );
};

const MilestoneListPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();

  // TODO: 配置实际的权限常量
  const canCreate = true;

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle={'项目里程碑'}
      gridKey="appPdm.ProjectManagement.Milestone"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await ProjectMilestoneGetListAsync({
          Filter: params?.filter,
          SkipCount: params?.skipCount,
          MaxResultCount: params?.maxResultCount,
          Sorting: params?.sorter,
        } as any);
        return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
      }}
      rowSelection={'multiple'}
      rowMultiSelectWithClick={true}
      toolBarRender={() => {
        return [
          // TODO: 添加创建按钮和FormDialog
        ];
      }}
    >
      <AgGridColumn field={'milestoneName'} headerName={'里程碑名称'} width={200} />
      <AgGridColumn field={'projectName'} headerName={'关联项目'} width={180} />
      <AgGridColumn field={'responsibleName'} headerName={'责任人'} width={120} />
      <AgGridColumn
        field={'plannedStartDate'}
        headerName={'计划开始日期'}
        width={140}
        hideInSearch={true}
      />
      <AgGridColumn
        field={'plannedEndDate'}
        headerName={'计划结束日期'}
        width={140}
        hideInSearch={true}
      />
      <AgGridColumn
        field={'status'}
        headerName={'状态'}
        width={100}
        hideInSearch={true}
        cellRenderer={StatusRender}
        valueEnum={milestoneStatusEnum}
      />
      <AgGridColumn
        field={'isApproval'}
        headerName={'需要审批'}
        width={100}
        hideInSearch={true}
        cellRenderer={(params: ICellRendererParams) => (params.value ? '是' : '否')}
      />
      <AgGridColumn
        field={'action'}
        headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
        width={120}
        pinned={'right'}
        filter={false}
        sortable={false}
        cellRenderer={Options}
        cellRendererParams={{ onRefresh }}
      />
    </AgGridPlus>
  );
};

export default MilestoneListPage;

export const routeProps = {
  name: '项目里程碑',
};
