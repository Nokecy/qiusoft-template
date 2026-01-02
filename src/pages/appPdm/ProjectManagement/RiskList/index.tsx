import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { ProjectRiskGetListAsync, ProjectRiskDeleteAsync, ProjectRiskResolveAsync, ProjectRiskReopenAsync } from '@/services/pdm/ProjectRisk';
import { UserWatchCreateAsync, UserWatchDeleteAsync, UserWatchGetListByTargetCodeAsync } from '@/services/pdm/UserWatch';
import { DeleteOutlined, EditOutlined, HeartFilled, HeartOutlined, PlusOutlined, CheckCircleOutlined, UndoOutlined, EyeOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Dropdown, Tag } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { Access, useAccess, useIntl, useModel, useNavigate } from 'umi';
import DeleteConfirm from '@/components/deleteConfirm';
import { ProjectRiskPermissions } from '@/pages/appPdm/_permissions';
import { ProjectTeamMemberGetListAsync } from '@/services/pdm/ProjectTeamMember';

// 风险状态枚举 - 对应API: BurnAbpPdmProjectsRiskStatus
const RiskStatus = {
  Open: 0,
  Resolved: 10,
};

const riskStatusEnum = [
  { label: '打开', value: RiskStatus.Open, color: 'error' },
  { label: '已解决', value: RiskStatus.Resolved, color: 'success' },
];

// 优先级枚举 - 对应API: BurnAbpPdmProjectsRiskPriority
const priorityEnum = [
  { label: '低', value: 0, color: 'default' },
  { label: '中', value: 10, color: 'warning' },
  { label: '高', value: 20, color: 'error' },
  { label: '紧急', value: 30, color: 'red' },
];

// 状态渲染
const StatusRender = (props: ICellRendererParams) => {
  const { value } = props;
  const status = riskStatusEnum.find(s => s.value === value);
  return status ? <Tag color={status.color} style={{ fontWeight: 'bold' }}>{status.label}</Tag> : <Tag>{value}</Tag>;
};

// 优先级渲染
const PriorityRender = (props: ICellRendererParams) => {
  const { value } = props;
  const priority = priorityEnum.find(p => p.value === value);
  return priority ? <Tag color={priority.color} style={{ fontWeight: 'bold' }}>{priority.label}</Tag> : <span>{value}</span>;
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

// 风险编码渲染 - 点击跳转到详情页
const CodeRender = (props: ICellRendererParams & { navigate?: any }) => {
  const { data, value, navigate } = props;

  const handleClick = () => {
    if (data?.id && navigate) {
      navigate(`/appPdm/ProjectManagement/RiskList/detail?id=${data.id}`);
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

  const canUpdate = !!(access && access[ProjectRiskPermissions.Update]);
  const canDelete = !!(access && access[ProjectRiskPermissions.Delete]);

  // 监听 isWatched 字段变化，同步到本地状态
  useEffect(() => {
    setIsWatching(data.isWatched || false);
  }, [data.isWatched]);

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return ProjectRiskDeleteAsync({ id }).then(() => onRefresh()).finally(() => hide());
  };

  const handleAction = (id: any, action: any, actionName: string) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return action({ id })
      .then(() => {
        message.success(`${actionName}成功`);
        onRefresh();
      })
      .finally(() => hide());
  };

  // 处理关注/取消关注
  const handleWatchToggle = async () => {
    setWatchLoading(true);
    try {
      if (isWatching) {
        // 取消关注 - 先查询关注记录获取ID
        const watchListResult = await UserWatchGetListByTargetCodeAsync({
          targetCode: data.riskCode,
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
          targetType: 3, // 3 = Risk
          targetCode: data.riskCode,
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
    navigate(`/appPdm/ProjectManagement/RiskList/detail?id=${data.id}`);
  };

  const handleEdit = () => {
    navigate(`/appPdm/ProjectManagement/RiskList/form?id=${data.id}`);
  };

  const status = data.status;

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

      <Access accessible={canUpdate}>
        <Button
          size={'small'}
          icon={<EditOutlined />}
          type={'link'}
          title={intl.formatMessage({ id: 'AbpUi:Edit' })}
          onClick={handleEdit}
        />
      </Access>

      {/* 只在打开状态显示解决风险图标 */}
      {status === RiskStatus.Open && (
        <Access accessible={canUpdate}>
          <Button
            size={'small'}
            type={'link'}
            icon={<CheckCircleOutlined />}
            title="解决风险"
            onClick={() => handleAction(data.id, ProjectRiskResolveAsync, '解决')}
          />
        </Access>
      )}

      {/* 已解决状态不显示重新打开图标 */}

      <Access accessible={canDelete}>
        <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
          <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
        </DeleteConfirm>
      </Access>
    </Space>
  );
};

const ProjectRiskPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const navigate = useNavigate();
  const canCreate = !!(access && access[ProjectRiskPermissions.Create]);

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
      headerTitle={'项目风险管理'}
      gridKey="appPdm.ProjectManagement.ProjectRisk"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await ProjectRiskGetListAsync(
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
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/appPdm/ProjectManagement/RiskList/form')}
            >
              新建
            </Button>
          </Access>,
        ];
      }}
    >
      <AgGridColumn field={'riskCode'} headerName={'风险编码'} width={150} cellRenderer={CodeRender} cellRendererParams={{ navigate }} />
      <AgGridColumn field={'name'} headerName={'风险名称'} width={200} />
      <AgGridColumn field={'projectCode'} headerName={'所属项目编码'} width={150} />
      <AgGridColumn field={'riskTypeCode'} headerName={'风险类型编码'} width={120} hideInSearch={true} />
      <AgGridColumn field={'priority'} headerName={'优先级'} width={100} hideInSearch={true} cellRenderer={PriorityRender} />
      <AgGridColumn field={'status'} headerName={'状态'} width={100} hideInSearch={true} cellRenderer={StatusRender} />
      <AgGridColumn field={'handlerCode'} headerName={'处理人'} width={120} hideInSearch={true} cellRenderer={HandlerRender} cellRendererParams={{ teamMemberMap }} />
      <AgGridColumn field={'consequence'} headerName={'风险后果'} width={200} hideInSearch={true} />
      <AgGridColumn field={'milestoneName'} headerName={'影响的里程碑'} width={150} hideInSearch={true} />
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

export default ProjectRiskPage;

export const routeProps = {
  name: '项目风险管理',
};
