import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { ProjectTaskGetMyWatchedListAsync } from '@/services/pdm/ProjectTask';
import { UserWatchDeleteAsync, UserWatchGetListByTargetCodeAsync } from '@/services/pdm/UserWatch';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Tag } from 'antd';
import React, { useRef } from 'react';
import { useModel, useNavigate } from 'umi';

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

// 状态渲染 - 与 TaskList 保持一致
const StatusRender = (props: ICellRendererParams) => {
  const { value } = props;
  const status = taskStatusEnum.find(s => s.value === value);
  return status ? <Tag color={status.color} style={{ fontWeight: 'bold' }}>{status.label}</Tag> : <Tag>{value}</Tag>;
};

// 紧急程度渲染 - 与 TaskList 保持一致
const UrgencyRender = (props: ICellRendererParams) => {
  const { value } = props;
  const urgency = urgencyEnum.find(u => u.value === value);
  return urgency ? <Tag color={urgency.color} style={{ fontWeight: 'bold' }}>{urgency.label}</Tag> : <span>{value}</span>;
};

// 任务编码渲染 - 与 TaskList 保持一致，点击跳转到详情页
const CodeRender = (props: ICellRendererParams & { navigate?: any }) => {
  const { data, value, navigate } = props;

  const handleClick = () => {
    if (data?.id && navigate) {
      navigate(`/appPdm/ProjectManagement/TaskList/detail?id=${data.id}`);
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

const TaskAttentionPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const navigate = useNavigate();
  const { initialState } = useModel('@@initialState');
  const currentUserId = initialState?.currentUser?.id;

  const cancelWatch = async (taskCode?: string) => {
    if (!taskCode) return;
    if (!currentUserId) {
      message.error('未获取到当前用户信息，无法取消关注');
      return;
    }

    const watched = await UserWatchGetListByTargetCodeAsync({
      targetCode: taskCode,
      SkipCount: 0,
      MaxResultCount: 2000,
    } as any);

    const mine = watched.items?.find((w: any) => w.userId === currentUserId);
    if (!mine?.id) {
      message.warning('未找到当前用户的关注记录');
      return;
    }

    await UserWatchDeleteAsync({ id: mine.id });
    message.success('已取消关注');
    gridRef.current?.refresh?.();
  };

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle={'我的任务关注'}
      gridKey="appPdm.ProjectManagement.TaskAttention"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await ProjectTaskGetMyWatchedListAsync({
          Filter: params?.filter,
          SkipCount: params?.skipCount,
          MaxResultCount: params?.maxResultCount,
          Sorting: params?.sorter,
        } as any);
        return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
      }}
      rowSelection={'multiple'}
      rowMultiSelectWithClick={true}
    >
      {/* 沿用 TaskList 的列定义，但移除操作列 */}
      <AgGridColumn field={'taskCode'} headerName={'任务编码'} width={150} cellRenderer={CodeRender} cellRendererParams={{ navigate }} />
      <AgGridColumn field={'taskName'} headerName={'任务名称'} width={200} />
      <AgGridColumn field={'projectCode'} headerName={'所属项目编码'} width={150} />
      <AgGridColumn field={'taskTypeName'} headerName={'任务类型'} width={120} hideInSearch={true} />
      <AgGridColumn field={'status'} headerName={'状态'} width={100} hideInSearch={true} cellRenderer={StatusRender} />
      <AgGridColumn field={'urgencyLevel'} headerName={'紧急程度'} width={100} hideInSearch={true} cellRenderer={UrgencyRender} />
      <AgGridColumn field={'estimatedHours'} headerName={'预估工时(小时)'} width={120} hideInSearch={true} />
      <AgGridColumn field={'milestoneName'} headerName={'关联里程碑'} width={150} hideInSearch={true} />
      <AgGridColumn field={'chargeNames'} headerName={'负责人'} width={150} hideInSearch={true} />
      <AgGridColumn field={'processNames'} headerName={'处理人'} width={150} hideInSearch={true} />
      <AgGridColumn
        headerName="操作"
        width={120}
        pinned="right"
        cellRenderer={(props: ICellRendererParams) => {
          const taskCode = (props as any)?.data?.taskCode;
          return (
            <Button type="link" danger size="small" onClick={() => cancelWatch(taskCode)}>
              取消关注
            </Button>
          );
        }}
      />
    </AgGridPlus>
  );
};

export default TaskAttentionPage;

export const routeProps = {
  name: '任务关注',
};
