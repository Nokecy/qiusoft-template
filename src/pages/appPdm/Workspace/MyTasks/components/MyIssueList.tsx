import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { ProjectIssueGetMyIssuesAsync } from '@/services/pdm/ProjectIssue';
import { EyeOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, Space, Tag } from 'antd';
import React, { useRef } from 'react';
import { useNavigate } from 'umi';
import { issueStatusEnum } from '@/pages/appPdm/ProjectManagement/IssueList/_utils/issueEnums';

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

// 是否需要审批枚举
const requiresApprovalEnum = [
  { label: '需要', value: true, color: 'blue' },
  { label: '不需要', value: false, color: 'default' },
];

const StatusRender = (props: ICellRendererParams) => {
  const { value } = props;
  const status = issueStatusEnum.find((s) => s.value === value);
  return status ? <Tag color={status.color} style={{ fontWeight: 'bold' }}>{status.label}</Tag> : <Tag>{value}</Tag>;
};

const SeverityRender = (props: ICellRendererParams) => {
  const { value } = props;
  const severity = severityEnum.find((s) => s.value === value);
  return severity ? <Tag color={severity.color} style={{ fontWeight: 'bold' }}>{severity.label}</Tag> : <span>{value}</span>;
};

const UrgencyRender = (props: ICellRendererParams) => {
  const { value } = props;
  const urgency = urgencyEnum.find((u) => u.value === value);
  return urgency ? <Tag color={urgency.color} style={{ fontWeight: 'bold' }}>{urgency.label}</Tag> : <span>{value}</span>;
};

const RequiresApprovalRender = (props: ICellRendererParams) => {
  const { value } = props;
  const approval = requiresApprovalEnum.find((a) => a.value === value);
  return approval ? <Tag color={approval.color}>{approval.label}</Tag> : <span>-</span>;
};

const CodeRender = (props: ICellRendererParams & { navigate?: any }) => {
  const { data, value, navigate } = props;
  return (
    <Button
      type="link"
      size="small"
      style={{ padding: 0, height: 'auto' }}
      onClick={() => data?.id && navigate?.(`/appPdm/ProjectManagement/IssueList/detail?id=${data.id}`)}
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
    navigate(`/appPdm/ProjectManagement/IssueList/detail?id=${data.id}`);
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

const MyIssueList: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const navigate = useNavigate();

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle="我的问题"
      gridKey="appPdm.Workspace.MyTasks.myIssues"
      request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
        const data = await ProjectIssueGetMyIssuesAsync(
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
      <AgGridColumn field={'handlerCode'} headerName={'处理人'} width={120} hideInSearch={true} />
      <AgGridColumn field={'description'} headerName={'问题说明'} width={200} hideInSearch={true} />
      <AgGridColumn field={'remark'} headerName={'备注'} width={200} hideInSearch={true} />
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

export default MyIssueList;
