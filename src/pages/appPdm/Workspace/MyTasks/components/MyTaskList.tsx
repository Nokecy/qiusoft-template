import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { ProjectTaskGetMyTasksAsync } from '@/services/pdm/ProjectTask';
import { EyeOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, Space, Tag } from 'antd';
import React, { useRef } from 'react';
import { useNavigate } from 'umi';

// 任务状态枚举 - 与 TaskList 保持一致
const TaskStatus = {
  NotStarted: 0,
  InProgress: 1,
  Paused: 2,
  Completed: 3,
  Cancelled: 4,
};

const taskStatusEnum = [
  { label: '未开始', value: TaskStatus.NotStarted, color: 'default' },
  { label: '进行中', value: TaskStatus.InProgress, color: 'processing' },
  { label: '已暂停', value: TaskStatus.Paused, color: 'warning' },
  { label: '已完成', value: TaskStatus.Completed, color: 'success' },
  { label: '已取消', value: TaskStatus.Cancelled, color: 'default' },
];

// 紧急程度枚举 - 与 TaskList 保持一致
const urgencyEnum = [
  { label: '低', value: 0, color: 'default' },
  { label: '中', value: 10, color: 'warning' },
  { label: '高', value: 20, color: 'error' },
];

const StatusRender = (props: ICellRendererParams) => {
  const { value } = props;
  const status = taskStatusEnum.find((s) => s.value === value);
  return status ? <Tag color={status.color} style={{ fontWeight: 'bold' }}>{status.label}</Tag> : <Tag>{value}</Tag>;
};

const UrgencyRender = (props: ICellRendererParams) => {
  const { value } = props;
  const urgency = urgencyEnum.find((u) => u.value === value);
  return urgency ? <Tag color={urgency.color} style={{ fontWeight: 'bold' }}>{urgency.label}</Tag> : <span>{value}</span>;
};

const CodeRender = (props: ICellRendererParams & { navigate?: any }) => {
  const { data, value, navigate } = props;
  return (
    <Button
      type="link"
      size="small"
      style={{ padding: 0, height: 'auto' }}
      onClick={() => data?.id && navigate?.(`/appPdm/ProjectManagement/TaskList/detail?id=${data.id}`)}
    >
      {value}
    </Button>
  );
};

// 操作列渲染 - 简化版，只有查看详情
const Options = (props: ICellRendererParams) => {
  const { data } = props;
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/appPdm/ProjectManagement/TaskList/detail?id=${data.id}`);
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
    </Space>
  );
};

const MyTaskList: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const navigate = useNavigate();

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle="我的任务"
      gridKey="appPdm.Workspace.MyTasks.myTasks"
      request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
        const data = await ProjectTaskGetMyTasksAsync(
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
      domLayout="autoHeight"
    >
      <AgGridColumn field={'taskCode'} headerName={'任务编码'} width={150} cellRenderer={CodeRender} cellRendererParams={{ navigate }} />
      <AgGridColumn field={'taskName'} headerName={'任务名称'} width={220} />
      <AgGridColumn field={'projectCode'} headerName={'所属项目编码'} width={150} />
      <AgGridColumn field={'taskTypeName'} headerName={'任务类型'} width={120} hideInSearch={true} />
      <AgGridColumn field={'status'} headerName={'状态'} width={100} hideInSearch={true} cellRenderer={StatusRender} />
      <AgGridColumn field={'urgencyLevel'} headerName={'紧急程度'} width={100} hideInSearch={true} cellRenderer={UrgencyRender} />
      <AgGridColumn field={'estimatedHours'} headerName={'预估工时(小时)'} width={120} hideInSearch={true} />
      <AgGridColumn field={'milestoneName'} headerName={'关联里程碑'} width={150} hideInSearch={true} />
      <AgGridColumn field={'chargeNames'} headerName={'负责人'} width={150} hideInSearch={true} />
      <AgGridColumn field={'processNames'} headerName={'处理人'} width={150} hideInSearch={true} />
      <AgGridColumn
        field={'action'}
        headerName={'操作'}
        width={100}
        pinned={'right'}
        filter={false}
        sortable={false}
        cellRenderer={Options}
      />
    </AgGridPlus>
  );
};

export default MyTaskList;
