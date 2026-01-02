import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { RationalizationProposalGetListAsync, RationalizationProposalDeleteAsync } from '@/services/pdm/RationalizationProposal';
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl, useNavigate } from 'umi';
import DeleteConfirm from '@/components/deleteConfirm';
import { RationalizationProposalPermissions } from '@/pages/appPdm/_permissions';

// 建议状态枚举
const ProposalStatus = {
  Draft: 0,
  Submitted: 1,
  Approved: 2,
  Executing: 3,
  Completed: 4,
  AbnormalClosed: 5,
  Withdrawn: 6,
};

const proposalStatusEnum = [
  { label: '草稿', value: ProposalStatus.Draft, color: 'default' },
  { label: '已提交', value: ProposalStatus.Submitted, color: 'processing' },
  { label: '已批准', value: ProposalStatus.Approved, color: 'success' },
  { label: '执行中', value: ProposalStatus.Executing, color: 'warning' },
  { label: '已完成', value: ProposalStatus.Completed, color: 'success' },
  { label: '异常关闭', value: ProposalStatus.AbnormalClosed, color: 'error' },
  { label: '已撤回', value: ProposalStatus.Withdrawn, color: 'default' },
];

// 状态渲染
const StatusRender = (props: ICellRendererParams) => {
  const { value } = props;
  const status = proposalStatusEnum.find(s => s.value === value);
  return status ? <Tag color={status.color} style={{ fontWeight: 'bold' }}>{status.label}</Tag> : <Tag>{value}</Tag>;
};

// 优先级枚举
const priorityEnum = [
  { label: '低', value: 1, color: 'default' },
  { label: '中', value: 5, color: 'warning' },
  { label: '高', value: 10, color: 'error' },
];

// 优先级渲染
const PriorityRender = (props: ICellRendererParams) => {
  const { value } = props;
  const priority = priorityEnum.find(p => p.value === value) || priorityEnum.find(p => value <= p.value);
  return priority ? <Tag color={priority.color}>{priority.label}</Tag> : <span>{value}</span>;
};

// 编码渲染 - 点击跳转到详情页
const CodeRender = (props: ICellRendererParams & { navigate?: any }) => {
  const { data, value, navigate } = props;

  const handleClick = () => {
    if (data?.id && navigate) {
      navigate(`/appPdm/ProjectManagement/RationalizationProposalList/detail?id=${data.id}`);
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

  const canUpdate = !!(access && access[RationalizationProposalPermissions.Update]);
  const canDelete = !!(access && access[RationalizationProposalPermissions.Delete]);

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return RationalizationProposalDeleteAsync({ id }).then(() => onRefresh()).finally(() => hide());
  };

  const handleViewDetail = () => {
    navigate(`/appPdm/ProjectManagement/RationalizationProposalList/detail?id=${data.id}`);
  };

  const handleEdit = () => {
    navigate(`/appPdm/ProjectManagement/RationalizationProposalList/form?id=${data.id}`);
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

      <Access accessible={canUpdate}>
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

const RationalizationProposalListPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const navigate = useNavigate();
  const canCreate = !!(access && access[RationalizationProposalPermissions.Create]);

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle={'合理化建议'}
      gridKey="appPdm.ProjectManagement.RationalizationProposal"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await RationalizationProposalGetListAsync(
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
              onClick={() => navigate('/appPdm/ProjectManagement/RationalizationProposalList/form')}
            >
              新建
            </Button>
          </Access>,
        ];
      }}
    >
      <AgGridColumn field={'proposalCode'} headerName={'建议编码'} width={150} cellRenderer={CodeRender} cellRendererParams={{ navigate }} />
      <AgGridColumn field={'proposalTitle'} headerName={'建议主题'} width={220} />
      <AgGridColumn field={'proposerUserName'} headerName={'提出人'} width={120} />
      <AgGridColumn field={'proposedDate'} headerName={'提出时间'} width={180} hideInSearch={true} initialSort={'desc'} />
      {/* <AgGridColumn field={'implementationStatus'} headerName={'状态'} width={120} hideInSearch={true} cellRenderer={StatusRender} /> */}
      <AgGridColumn field={'description'} headerName={'建议描述'} width={250} hideInSearch={true} flex={1}  />
      <AgGridColumn
        field={'action'}
        headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
        width={160}
        pinned={'right'}
        filter={false}
        sortable={false}
        cellRenderer={Options}
        cellRendererParams={{ onRefresh }}
      />
    </AgGridPlus>
  );
};

export default RationalizationProposalListPage;

export const routeProps = {
  name: '合理化建议',
};
