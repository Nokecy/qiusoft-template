import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { ProjectRiskGetMyWatchedListAsync } from '@/services/pdm/ProjectRisk';
import { ProjectTeamMemberGetListAsync } from '@/services/pdm/ProjectTeamMember';
import { UserWatchDeleteAsync, UserWatchGetListByTargetCodeAsync } from '@/services/pdm/UserWatch';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Tag } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { useModel, useNavigate } from 'umi';

// 风险状态枚举 - 与 RiskList 保持一致
const RiskStatus = {
  Open: 0,
  Resolved: 10,
};

const riskStatusEnum = [
  { label: '打开', value: RiskStatus.Open, color: 'error' },
  { label: '已解决', value: RiskStatus.Resolved, color: 'success' },
];

// 优先级枚举 - 与 RiskList 保持一致
const priorityEnum = [
  { label: '低', value: 0, color: 'default' },
  { label: '中', value: 10, color: 'warning' },
  { label: '高', value: 20, color: 'error' },
  { label: '紧急', value: 30, color: 'red' },
];

// 状态渲染 - 与 RiskList 保持一致
const StatusRender = (props: ICellRendererParams) => {
  const { value } = props;
  const status = riskStatusEnum.find(s => s.value === value);
  return status ? <Tag color={status.color} style={{ fontWeight: 'bold' }}>{status.label}</Tag> : <Tag>{value}</Tag>;
};

// 优先级渲染 - 与 RiskList 保持一致
const PriorityRender = (props: ICellRendererParams) => {
  const { value } = props;
  const priority = priorityEnum.find(p => p.value === value);
  return priority ? <Tag color={priority.color} style={{ fontWeight: 'bold' }}>{priority.label}</Tag> : <span>{value}</span>;
};

// 处理人渲染 - 与 RiskList 保持一致，将 userId 转换为 userName
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

// 风险编码渲染 - 与 RiskList 保持一致，点击跳转到详情页
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

const RiskAttentionPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const navigate = useNavigate();
  const { initialState } = useModel('@@initialState');
  const currentUserId = initialState?.currentUser?.id;

  // 项目团队成员 userId 到 userName 的映射 - 与 RiskList 保持一致
  const [teamMemberMap, setTeamMemberMap] = useState<Map<string, string>>(new Map());

  // 加载项目团队成员列表 - 与 RiskList 保持一致
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

  const cancelWatch = async (riskCode?: string) => {
    if (!riskCode) return;
    if (!currentUserId) {
      message.error('未获取到当前用户信息，无法取消关注');
      return;
    }

    const watched = await UserWatchGetListByTargetCodeAsync({
      targetCode: riskCode,
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
      headerTitle={'我的风险关注'}
      gridKey="appPdm.ProjectManagement.RiskAttention"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await ProjectRiskGetMyWatchedListAsync(
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
    >
      {/* 沿用 RiskList 的列定义，但移除操作列 */}
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
        headerName="操作"
        width={120}
        pinned="right"
        cellRenderer={(props: ICellRendererParams) => {
          const riskCode = (props as any)?.data?.riskCode;
          return (
            <Button type="link" danger size="small" onClick={() => cancelWatch(riskCode)}>
              取消关注
            </Button>
          );
        }}
      />
    </AgGridPlus>
  );
};

export default RiskAttentionPage;

export const routeProps = {
  name: '风险关注',
};
