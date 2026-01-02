import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import {
  ProjectIssueGetListAsync,
  ProjectIssueDeleteAsync,
} from '@/services/pdm/ProjectIssue';
import { UserWatchCreateAsync, UserWatchDeleteAsync, UserWatchGetListByTargetCodeAsync } from '@/services/pdm/UserWatch';
import {
  DeleteOutlined,
  EditOutlined,
  HeartFilled,
  HeartOutlined,
  PlusOutlined,
  PlayCircleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { Access, useAccess, useIntl, useModel, useNavigate } from 'umi';
import IssueExecutionDialog from './components/IssueExecutionDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { ProjectIssuePermissions } from '@/pages/appPdm/_permissions';
import { ProjectTeamMemberGetListAsync } from '@/services/pdm/ProjectTeamMember';
import { issueStatusEnum } from './_utils/issueEnums';

// 严重程度枚举 - 对应API: BurnAbpPdmProjectsRiskPriority
const severityEnum = [
  { label: '低', value: 0, color: 'default' },
  { label: '中', value: 10, color: 'warning' },
  { label: '高', value: 20, color: 'error' },
  { label: '紧急', value: 30, color: 'red' },
];

// 紧急程度枚举 - 对应API: BurnAbpPdmProjectsUrgencyLevel
const urgencyEnum = [
  { label: '低', value: 0, color: 'default' },
  { label: '中', value: 10, color: 'warning' },
  { label: '高', value: 20, color: 'error' },
];

// 是否需要审批枚举
const requiresApprovalEnum = [
  { label: '需要', value: true, color: 'blue' },
  { label: '不需要', value: false, color: 'default' },
];

// 状态渲染
const StatusRender = (props: ICellRendererParams) => {
  const { value } = props;
  const status = issueStatusEnum.find(s => s.value === value);
  return status ? <Tag color={status.color} style={{ fontWeight: 'bold' }}>{status.label}</Tag> : <Tag>{value}</Tag>;
};

// 严重程度渲染
const SeverityRender = (props: ICellRendererParams) => {
  const { value } = props;
  const severity = severityEnum.find(s => s.value === value);
  return severity ? <Tag color={severity.color} style={{ fontWeight: 'bold' }}>{severity.label}</Tag> : <span>{value}</span>;
};

// 紧急程度渲染
const UrgencyRender = (props: ICellRendererParams) => {
  const { value } = props;
  const urgency = urgencyEnum.find(u => u.value === value);
  return urgency ? <Tag color={urgency.color} style={{ fontWeight: 'bold' }}>{urgency.label}</Tag> : <span>{value}</span>;
};

// 是否需要审批渲染
const RequiresApprovalRender = (props: ICellRendererParams) => {
  const { value } = props;
  const approval = requiresApprovalEnum.find(a => a.value === value);
  return approval ? <Tag color={approval.color}>{approval.label}</Tag> : <span>-</span>;
};

// 处理人渲染 - 将 userId 转换为 userName
const HandlerRender = (props: ICellRendererParams) => {
  const { value } = props;
  const teamMemberMap = (props as any).teamMemberMap as Map<string, string>;

  if (!value) return <span>-</span>;

  // 如果 teamMemberMap 存在且有数据,查找对应的名称
  if (teamMemberMap && teamMemberMap.size > 0) {
    const handlerName = teamMemberMap.get(value);
    return <span>{handlerName || value}</span>;
  }

  // 如果 teamMemberMap 还没加载,显示 userId
  return <span>{value}</span>;
};

// 问题编码渲染 - 点击跳转到详情页
const CodeRender = (props: ICellRendererParams & { navigate?: any }) => {
  const { data, value, navigate } = props;

  const handleClick = () => {
    if (data?.id && navigate) {
      navigate(`/appPdm/ProjectManagement/IssueList/detail?id=${data.id}`);
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
  const { initialState } = useModel('@@initialState');
  const [isWatching, setIsWatching] = useState(data.isWatched || false);
  const [watchLoading, setWatchLoading] = useState(false);
  const [executionDialogOpen, setExecutionDialogOpen] = useState(false);

  const canUpdate = !!(access && access[ProjectIssuePermissions.Update]);
  const canDelete = !!(access && access[ProjectIssuePermissions.Delete]);

  // 监听 isWatched 字段变化，同步到本地状态
  useEffect(() => {
    setIsWatching(data.isWatched || false);
  }, [data.isWatched]);

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return ProjectIssueDeleteAsync({ id }).then(() => onRefresh()).finally(() => hide());
  };

  // 处理关注/取消关注
  const handleWatchToggle = async () => {
    setWatchLoading(true);
    try {
      if (isWatching) {
        // 取消关注 - 先查询关注记录获取ID
        const watchListResult = await UserWatchGetListByTargetCodeAsync({
          targetCode: data.issueCode,
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
          targetType: 2, // 2 = Issue
          targetCode: data.issueCode,
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

  // 查看详情
  const handleViewDetail = () => {
    navigate(`/appPdm/ProjectManagement/IssueList/detail?id=${data.id}`);
  };

  return (
    <>
      <Space>
        {/* 查看详情 */}
        <Button
          size="small"
          icon={<EyeOutlined />}
          type="link"
          title="查看详情"
          onClick={handleViewDetail}
        />

        {/* 关注/取消关注 */}
        <Button
          size="small"
          icon={isWatching ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
          type="link"
          title={isWatching ? '取消关注' : '关注'}
          loading={watchLoading}
          onClick={handleWatchToggle}
        />

        {/* 编辑 */}
        <Access accessible={canUpdate}>
          <Button
            size="small"
            icon={<EditOutlined />}
            type="link"
            title={intl.formatMessage({ id: 'AbpUi:Edit' })}
            onClick={() => navigate(`/appPdm/ProjectManagement/IssueList/form?id=${data.id}`)}
          />
        </Access>

        {/* 执行 - 🆕 新增 */}
        <Access accessible={canUpdate}>
          <Button
            size="small"
            icon={<PlayCircleOutlined />}
            type="link"
            title="执行"
            onClick={() => setExecutionDialogOpen(true)}
          />
        </Access>

        {/* 删除 */}
        <Access accessible={canDelete}>
          <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
            <Button
              size="small"
              icon={<DeleteOutlined />}
              type="link"
              title={intl.formatMessage({ id: 'AbpUi:Delete' })}
            />
          </DeleteConfirm>
        </Access>
      </Space>

      {/* 执行抽屉 */}
      <IssueExecutionDialog
        issueId={data.id}
        open={executionDialogOpen}
        onClose={() => setExecutionDialogOpen(false)}
        onRefresh={onRefresh}
      />
    </>
  );
};

const ProjectIssuePage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const navigate = useNavigate();
  const access = useAccess();
  const canCreate = !!(access && access[ProjectIssuePermissions.Create]);

  // 项目团队成员 userId 到 userName 的映射
  const [teamMemberMap, setTeamMemberMap] = useState<Map<string, string>>(new Map());

  // 加载项目团队成员列表
  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        const response = await ProjectTeamMemberGetListAsync({
          MaxResultCount: 10000, // 获取所有团队成员
        });

        if (response?.items) {
          const map = new Map<string, string>();
          response.items.forEach((member: any) => {
            if (member.userId && member.userName) {
              map.set(member.userId, member.userName);
            }
          });
          setTeamMemberMap(map);
        }
      } catch (error) {
        console.error('加载项目团队成员失败:', error);
      }
    };

    loadTeamMembers();
  }, []);

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle={'项目问题管理'}
      gridKey="appPdm.ProjectManagement.ProjectIssue"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await ProjectIssueGetListAsync(
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
          <Access key="create" accessible={canCreate}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/appPdm/ProjectManagement/IssueList/form')}
            >
              新建
            </Button>
          </Access>,
        ];
      }}
    >
      <AgGridColumn field={'issueCode'} headerName={'问题编码'} width={150} cellRenderer={CodeRender} cellRendererParams={{ navigate }} />
      <AgGridColumn field={'name'} headerName={'问题名称'} width={200} />
      <AgGridColumn field={'projectCode'} headerName={'所属项目编码'} width={150} />
      <AgGridColumn field={'taskCode'} headerName={'关联任务'} width={150} hideInSearch={true} />
      <AgGridColumn field={'status'} headerName={'状态'} width={100} hideInSearch={true} cellRenderer={StatusRender} />
      <AgGridColumn field={'severity'} headerName={'严重程度'} width={100} hideInSearch={true} cellRenderer={SeverityRender} />
      <AgGridColumn field={'urgency'} headerName={'紧急程度'} width={100} hideInSearch={true} cellRenderer={UrgencyRender} />
      <AgGridColumn field={'requiresApproval'} headerName={'是否需要审批'} width={120} hideInSearch={true} cellRenderer={RequiresApprovalRender} />
      <AgGridColumn field={'expectedResolvedDate'} headerName={'期望解决日期'} width={180} hideInSearch={true} />
      <AgGridColumn field={'milestoneName'} headerName={'关联里程碑'} width={150} hideInSearch={true} />
      <AgGridColumn field={'handlerCode'} headerName={'处理人'} width={120} hideInSearch={true} cellRenderer={HandlerRender} cellRendererParams={{ teamMemberMap }} />
      <AgGridColumn field={'description'} headerName={'问题说明'} width={200} hideInSearch={true} />
      <AgGridColumn field={'remark'} headerName={'备注'} width={200} hideInSearch={true} />
      <AgGridColumn
        field={'action'}
        headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
        width={220}
        pinned={'right'}
        filter={false}
        sortable={false}
        cellRenderer={Options}
        cellRendererParams={{ onRefresh }}
      />
    </AgGridPlus>
  );
};

export default ProjectIssuePage;

export const routeProps = {
  name: '项目问题管理',
};
