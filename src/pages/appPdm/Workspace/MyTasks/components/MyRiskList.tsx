import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { ProjectRiskGetMyRisksAsync } from '@/services/pdm/ProjectRisk';
import { EyeOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, Space, Tag } from 'antd';
import React, { useRef } from 'react';
import { useNavigate } from 'umi';

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

const StatusRender = (props: ICellRendererParams) => {
  const { value } = props;
  const status = riskStatusEnum.find((s) => s.value === value);
  return status ? <Tag color={status.color} style={{ fontWeight: 'bold' }}>{status.label}</Tag> : <Tag>{value}</Tag>;
};

const PriorityRender = (props: ICellRendererParams) => {
  const { value } = props;
  const priority = priorityEnum.find((p) => p.value === value);
  return priority ? <Tag color={priority.color} style={{ fontWeight: 'bold' }}>{priority.label}</Tag> : <span>{value}</span>;
};

const CodeRender = (props: ICellRendererParams & { navigate?: any }) => {
  const { data, value, navigate } = props;
  return (
    <Button
      type="link"
      size="small"
      style={{ padding: 0, height: 'auto' }}
      onClick={() => data?.id && navigate?.(`/appPdm/ProjectManagement/RiskList/detail?id=${data.id}`)}
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
    navigate(`/appPdm/ProjectManagement/RiskList/detail?id=${data.id}`);
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

const MyRiskList: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const navigate = useNavigate();

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle="我的风险"
      gridKey="appPdm.Workspace.MyTasks.myRisks"
      request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
        const data = await ProjectRiskGetMyRisksAsync(
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
      <AgGridColumn field={'riskCode'} headerName={'风险编码'} width={150} cellRenderer={CodeRender} cellRendererParams={{ navigate }} />
      <AgGridColumn field={'name'} headerName={'风险名称'} width={200} />
      <AgGridColumn field={'projectCode'} headerName={'所属项目编码'} width={150} />
      <AgGridColumn field={'riskTypeCode'} headerName={'风险类型编码'} width={120} hideInSearch={true} />
      <AgGridColumn field={'priority'} headerName={'优先级'} width={100} hideInSearch={true} cellRenderer={PriorityRender} />
      <AgGridColumn field={'status'} headerName={'状态'} width={100} hideInSearch={true} cellRenderer={StatusRender} />
      <AgGridColumn field={'handlerCode'} headerName={'处理人'} width={120} hideInSearch={true} />
      <AgGridColumn field={'consequence'} headerName={'风险后果'} width={200} hideInSearch={true} />
      <AgGridColumn field={'milestoneName'} headerName={'影响的里程碑'} width={150} hideInSearch={true} />
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

export default MyRiskList;
