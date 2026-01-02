import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { ProjectIssueGetMyWatchedListAsync } from '@/services/pdm/ProjectIssue';
import { ProjectTeamMemberGetListAsync } from '@/services/pdm/ProjectTeamMember';
import { UserWatchDeleteAsync, UserWatchGetListByTargetCodeAsync } from '@/services/pdm/UserWatch';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Tag } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { useModel, useNavigate } from 'umi';
import { issueStatusEnum } from '../IssueList/_utils/issueEnums';

// 严重程度枚举 - 与 IssueList 保持一致
const severityEnum = [
  { label: '低', value: 0, color: 'default' },
  { label: '中', value: 10, color: 'warning' },
  { label: '高', value: 20, color: 'error' },
  { label: '紧急', value: 30, color: 'red' },
];

// 紧急程度枚举 - 与 IssueList 保持一致
const urgencyEnum = [
  { label: '低', value: 0, color: 'default' },
  { label: '中', value: 10, color: 'warning' },
  { label: '高', value: 20, color: 'error' },
];

// 是否需要审批枚举 - 与 IssueList 保持一致
const requiresApprovalEnum = [
  { label: '需要', value: true, color: 'blue' },
  { label: '不需要', value: false, color: 'default' },
];

// 状态渲染 - 与 IssueList 保持一致
const StatusRender = (props: ICellRendererParams) => {
  const { value } = props;
  const status = issueStatusEnum.find(s => s.value === value);
  return status ? <Tag color={status.color} style={{ fontWeight: 'bold' }}>{status.label}</Tag> : <Tag>{value}</Tag>;
};

// 严重程度渲染 - 与 IssueList 保持一致
const SeverityRender = (props: ICellRendererParams) => {
  const { value } = props;
  const severity = severityEnum.find(s => s.value === value);
  return severity ? <Tag color={severity.color} style={{ fontWeight: 'bold' }}>{severity.label}</Tag> : <span>{value}</span>;
};

// 紧急程度渲染 - 与 IssueList 保持一致
const UrgencyRender = (props: ICellRendererParams) => {
  const { value } = props;
  const urgency = urgencyEnum.find(u => u.value === value);
  return urgency ? <Tag color={urgency.color} style={{ fontWeight: 'bold' }}>{urgency.label}</Tag> : <span>{value}</span>;
};

// 是否需要审批渲染 - 与 IssueList 保持一致
const RequiresApprovalRender = (props: ICellRendererParams) => {
  const { value } = props;
  const approval = requiresApprovalEnum.find(a => a.value === value);
  return approval ? <Tag color={approval.color}>{approval.label}</Tag> : <span>-</span>;
};

// 处理人渲染 - 与 IssueList 保持一致，将 userId 转换为 userName
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

// 问题编码渲染 - 与 IssueList 保持一致，点击跳转到详情页
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

const IssueAttentionPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const navigate = useNavigate();
  const { initialState } = useModel('@@initialState');
  const currentUserId = initialState?.currentUser?.id;

  // 项目团队成员 userId 到 userName 的映射 - 与 IssueList 保持一致
  const [teamMemberMap, setTeamMemberMap] = useState<Map<string, string>>(new Map());

  // 加载项目团队成员列表 - 与 IssueList 保持一致
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

  const cancelWatch = async (issueCode?: string) => {
    if (!issueCode) return;
    if (!currentUserId) {
      message.error('未获取到当前用户信息，无法取消关注');
      return;
    }

    const watched = await UserWatchGetListByTargetCodeAsync({
      targetCode: issueCode,
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
      headerTitle={'我的问题关注'}
      gridKey="appPdm.ProjectManagement.IssueAttention"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await ProjectIssueGetMyWatchedListAsync(
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
      {/* 沿用 IssueList 的列定义，但移除操作列 */}
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
        headerName="操作"
        width={120}
        pinned="right"
        cellRenderer={(props: ICellRendererParams) => {
          const issueCode = (props as any)?.data?.issueCode;
          return (
            <Button type="link" danger size="small" onClick={() => cancelWatch(issueCode)}>
              取消关注
            </Button>
          );
        }}
      />
    </AgGridPlus>
  );
};

export default IssueAttentionPage;

export const routeProps = {
  name: '问题关注',
};
