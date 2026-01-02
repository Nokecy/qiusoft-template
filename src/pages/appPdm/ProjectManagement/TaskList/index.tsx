import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { ProjectTaskGetListAsync, ProjectTaskDeleteAsync } from '@/services/pdm/ProjectTask';
import { UserWatchCreateAsync, UserWatchDeleteAsync, UserWatchGetListByTargetCodeAsync } from '@/services/pdm/UserWatch';
import { DeleteOutlined, EditOutlined, HeartFilled, HeartOutlined, PlusOutlined, ThunderboltOutlined, EyeOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Access, useAccess, useIntl, useModel, useNavigate } from 'umi';
import DeleteConfirm from '@/components/deleteConfirm';
import { ProjectTaskPermissions } from '@/pages/appPdm/_permissions';
import TaskExecutionDialog from './components/TaskExecutionDialog';

// 任务状态枚举 - 对应API: BurnAbpPdmProjectsTaskStatus
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

// 紧急程度枚举 - 对应API: BurnAbpPdmProjectsUrgencyLevel
const urgencyEnum = [
  { label: '低', value: 0, color: 'default' },
  { label: '中', value: 10, color: 'warning' },
  { label: '高', value: 20, color: 'error' },
];

// 状态渲染
const StatusRender = (props: ICellRendererParams) => {
  const { value } = props;
  const status = taskStatusEnum.find(s => s.value === value);
  return status ? <Tag color={status.color} style={{ fontWeight: 'bold' }}>{status.label}</Tag> : <Tag>{value}</Tag>;
};

// 紧急程度渲染
const UrgencyRender = (props: ICellRendererParams) => {
  const { value } = props;
  const urgency = urgencyEnum.find(u => u.value === value);
  return urgency ? <Tag color={urgency.color} style={{ fontWeight: 'bold' }}>{urgency.label}</Tag> : <span>{value}</span>;
};

// 任务编码渲染 - 点击跳转到详情页
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

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void; onOpenExecution: (taskId: string) => void }) => {
  const { data, onRefresh, onOpenExecution } = props;
  const intl = useIntl();
  const access = useAccess();
  const navigate = useNavigate();
  const { initialState } = useModel('@@initialState');
  const [isWatching, setIsWatching] = useState(data.isWatched || false);
  const [watchLoading, setWatchLoading] = useState(false);

  const canUpdate = !!(access && access[ProjectTaskPermissions.Update]);
  const canDelete = !!(access && access[ProjectTaskPermissions.Delete]);

  // 只有未开始的任务才可以编辑
  const isNotStarted = data.status === TaskStatus.NotStarted;

  // 监听 isWatched 字段变化，同步到本地状态
  useEffect(() => {
    setIsWatching(data.isWatched || false);
  }, [data.isWatched]);

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return ProjectTaskDeleteAsync({ id }).then(() => onRefresh()).finally(() => hide());
  };

  // 处理关注/取消关注
  const handleWatchToggle = async () => {
    setWatchLoading(true);
    try {
      if (isWatching) {
        // 取消关注 - 先查询关注记录获取ID
        const watchListResult = await UserWatchGetListByTargetCodeAsync({
          targetCode: data.taskCode,
          PageSize: 1,
        });
        if (watchListResult.items && watchListResult.items.length > 0) {
          const watchId = watchListResult.items[0].id;
          if (watchId) {
            await UserWatchDeleteAsync({ id: watchId });
            message.success('取消关注成功');
            setIsWatching(false);
          }
        }
      } else {
        // 添加关注
        const currentUser = initialState?.configuration?.currentUser;
        await UserWatchCreateAsync({
          userId: currentUser?.id || '',
          userCode: currentUser?.userName || '',
          targetType: 1, // 1 = Task
          targetCode: data.taskCode,
          remark: '',
        });
        message.success('关注成功');
        setIsWatching(true);
      }
      onRefresh();
    } catch (error) {
      message.error(isWatching ? '取消关注失败' : '关注失败');
    } finally {
      setWatchLoading(false);
    }
  };

  const handleViewDetail = () => {
    navigate(`/appPdm/ProjectManagement/TaskList/detail?id=${data.id}`);
  };

  const handleEdit = () => {
    navigate(`/appPdm/ProjectManagement/TaskList/form?id=${data.id}`);
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

      <Button
        size={'small'}
        icon={isWatching ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
        type={'link'}
        title={isWatching ? '取消关注' : '关注'}
        loading={watchLoading}
        onClick={handleWatchToggle}
      />

      <Button
        size={'small'}
        icon={<ThunderboltOutlined />}
        type={'link'}
        title="任务执行"
        onClick={() => onOpenExecution(data.id)}
      >
        执行
      </Button>

      <Access accessible={canUpdate && isNotStarted}>
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

const ProjectTaskPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const navigate = useNavigate();
  const canCreate = !!(access && access[ProjectTaskPermissions.Create]);
  const [executionDialogOpen, setExecutionDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  const handleOpenExecution = (taskId: string) => {
    setSelectedTaskId(taskId);
    setExecutionDialogOpen(true);
  };

  const handleCloseExecution = () => {
    setExecutionDialogOpen(false);
    setSelectedTaskId('');
  };

  return (
    <>
      <AgGridPlus
        gridRef={gridRef}
        headerTitle={'项目任务'}
        gridKey="appPdm.ProjectManagement.ProjectTask"
        request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
          const data = await ProjectTaskGetListAsync({
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
              <Access accessible={canCreate} key="create">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => navigate('/appPdm/ProjectManagement/TaskList/form')}
                >
                  新建
                </Button>
              </Access>,
            ];
          }}
        >
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
          field={'action'}
          headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
          width={240}
          pinned={'right'}
          filter={false}
          sortable={false}
          cellRenderer={Options}
          cellRendererParams={{ onRefresh, onOpenExecution: handleOpenExecution }}
        />
      </AgGridPlus>

      {/* 任务执行对话框 */}
      <TaskExecutionDialog
        taskId={selectedTaskId}
        open={executionDialogOpen}
        onClose={handleCloseExecution}
        onRefresh={onRefresh}
      />
    </>
  );
};

export default ProjectTaskPage;

export const routeProps = {
  name: '项目任务管理',
};
