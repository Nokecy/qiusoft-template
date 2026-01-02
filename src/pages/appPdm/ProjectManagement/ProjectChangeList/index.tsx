import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { ProjectChangeGetListAsync, ProjectChangeDeleteAsync, ProjectChangeSubmitAsync } from '@/services/pdm/ProjectChange';
import { ProjectGetListAsync } from '@/services/pdm/Project';
import { DeleteOutlined, EditOutlined, PlusOutlined, SendOutlined, EyeOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Access, useAccess, useIntl, useNavigate } from 'umi';
import DeleteConfirm from '@/components/deleteConfirm';
import { ProjectChangePermissions } from '@/pages/appPdm/_permissions';

// 变更状态枚举
const ChangeStatus = {
  Draft: 0,
  Submitted: 1,
  Approved: 2,
  Rejected: 3,
  Implementing: 4,
  Completed: 5,
  Cancelled: 6,
};

const changeStatusEnum = [
  { label: '草稿', value: ChangeStatus.Draft, color: 'default' },
  { label: '已提交', value: ChangeStatus.Submitted, color: 'processing' },
  { label: '已批准', value: ChangeStatus.Approved, color: 'success' },
  { label: '已拒绝', value: ChangeStatus.Rejected, color: 'error' },
  { label: '实施中', value: ChangeStatus.Implementing, color: 'warning' },
  { label: '已完成', value: ChangeStatus.Completed, color: 'success' },
  { label: '已取消', value: ChangeStatus.Cancelled, color: 'default' },
];

// 变更类型枚举
const ChangeType = {
  Scope: 0,        // 范围变更
  Schedule: 10,    // 进度变更
  Cost: 20,        // 成本变更
  Quality: 30,     // 质量变更
  Resource: 40,    // 资源变更
  Other: 99,       // 其他
};

const changeTypeEnum = [
  { label: '范围变更', value: ChangeType.Scope, color: '#1890ff' },
  { label: '进度变更', value: ChangeType.Schedule, color: '#52c41a' },
  { label: '成本变更', value: ChangeType.Cost, color: '#faad14' },
  { label: '质量变更', value: ChangeType.Quality, color: '#722ed1' },
  { label: '资源变更', value: ChangeType.Resource, color: '#13c2c2' },
  { label: '其他', value: ChangeType.Other, color: '#8c8c8c' },
];

// 优先级枚举
const Priority = {
  Low: 0,       // 低
  Medium: 10,   // 中
  High: 20,     // 高
  Urgent: 30,   // 紧急
};

const priorityEnum = [
  { label: '低', value: Priority.Low, color: '#52c41a' },
  { label: '中', value: Priority.Medium, color: '#1890ff' },
  { label: '高', value: Priority.High, color: '#faad14' },
  { label: '紧急', value: Priority.Urgent, color: '#ff4d4f' },
];

// 变更类型渲染
const ChangeTypeRender = (props: ICellRendererParams) => {
  const { value } = props;
  const type = changeTypeEnum.find(t => t.value === value);
  return type ? <Tag color={type.color} style={{ fontWeight: 'bold' }}>{type.label}</Tag> : <Tag>{value}</Tag>;
};

// 优先级渲染
const PriorityRender = (props: ICellRendererParams) => {
  const { value } = props;
  const priority = priorityEnum.find(p => p.value === value);
  return priority ? <Tag color={priority.color} style={{ fontWeight: 'bold' }}>{priority.label}</Tag> : <Tag>{value}</Tag>;
};

// 状态渲染
const StatusRender = (props: ICellRendererParams) => {
  const { value } = props;
  const status = changeStatusEnum.find(s => s.value === value);
  return status ? <Tag color={status.color} style={{ fontWeight: 'bold' }}>{status.label}</Tag> : <Tag>{value}</Tag>;
};

// 日期渲染（格式化为 yyyy-MM-dd）
const DateRender = (props: ICellRendererParams) => {
  const { value } = props;
  if (!value) return <span></span>;
  // 处理 ISO 日期字符串，只取日期部分
  const dateStr = value.split('T')[0];
  return <span>{dateStr}</span>;
};

// 变更编码渲染 - 点击跳转到详情页
const CodeRender = (props: ICellRendererParams & { navigate?: any }) => {
  const { data, value, navigate } = props;

  const handleClick = () => {
    if (data?.id && navigate) {
      navigate(`/appPdm/ProjectManagement/ProjectChangeList/detail?id=${data.id}`);
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

  const canUpdate = !!access[ProjectChangePermissions.Update];
  const canDelete = !!access[ProjectChangePermissions.Delete];

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return ProjectChangeDeleteAsync({ id }).then(() => onRefresh()).finally(() => hide());
  };

  // 启动工作流（提交审批）
  const handleSubmit = async (id: any) => {
    const hide = message.loading('正在提交审批...', 0);
    try {
      await ProjectChangeSubmitAsync({ id });
      message.success('提交成功');
      onRefresh();
    } catch (error: any) {
      message.error('提交失败: ' + (error.message || '未知错误'));
    } finally {
      hide();
    }
  };

  // 查看详情
  const handleViewDetail = () => {
    navigate(`/appPdm/ProjectManagement/ProjectChangeList/detail?id=${data.id}`);
  };

  // 只有草稿状态才能提交审批
  const canSubmit = data.status === ChangeStatus.Draft;

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
          onClick={() => navigate(`/appPdm/ProjectManagement/ProjectChangeList/form?id=${data.id}`)}
        />
      </Access>

      {canSubmit && (
        <Access accessible={canUpdate}>
          <Button
            size={'small'}
            icon={<SendOutlined />}
            type={'link'}
            title="提交审批"
            onClick={() => handleSubmit(data.id)}
          >
            提交
          </Button>
        </Access>
      )}

      <Access accessible={canDelete}>
        <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
          <Button size={'small'} icon={<DeleteOutlined />} type={'link'} danger title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
        </DeleteConfirm>
      </Access>
    </Space>
  );
};

const ProjectChangeListPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const navigate = useNavigate();
  const access = useAccess();
  const canCreate = !!access[ProjectChangePermissions.Create];
  const [projectMap, setProjectMap] = useState<Map<string, string>>(new Map());

  // 加载项目列表，建立 projectCode -> projectName 的映射
  useEffect(() => {
    ProjectGetListAsync({ MaxResultCount: 1000 }).then(res => {
      if (res.items) {
        const map = new Map<string, string>();
        res.items.forEach(item => {
          if (item.projectCode && item.projectName) {
            map.set(item.projectCode, item.projectName);
          }
        });
        setProjectMap(map);
      }
    });
  }, []);

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  // 项目名称渲染器
  const ProjectNameRender = (props: ICellRendererParams) => {
    const { value } = props;
    if (!value) return <span></span>;
    const projectName = projectMap.get(value);
    return <span>{projectName || value}</span>;
  };

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle={'项目变更'}
      gridKey="appPdm.ProjectManagement.ProjectChange"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await ProjectChangeGetListAsync(
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
              onClick={() => navigate('/appPdm/ProjectManagement/ProjectChangeList/form')}
            >
              新建
            </Button>
          </Access>,
        ];
      }}
    >
      <AgGridColumn field={'projectChangeCode'} headerName={'变更编号'} width={150} cellRenderer={CodeRender} cellRendererParams={{ navigate }} />
      <AgGridColumn field={'name'} headerName={'变更名称'} width={200} />
      <AgGridColumn field={'projectCode'} headerName={'关联项目'} width={180} cellRenderer={ProjectNameRender} />
      <AgGridColumn field={'changeType'} headerName={'变更类型'} width={120} hideInSearch={true} cellRenderer={ChangeTypeRender} />
      <AgGridColumn field={'priority'} headerName={'优先级'} width={100} hideInSearch={true} cellRenderer={PriorityRender} />
      <AgGridColumn field={'requesterName'} headerName={'申请人'} width={120} />
      <AgGridColumn field={'ownerName'} headerName={'负责人'} width={120} />
      <AgGridColumn field={'plannedImplementationDate'} headerName={'计划实施日期'} width={140} hideInSearch={true} cellRenderer={DateRender} />
      <AgGridColumn field={'status'} headerName={'状态'} width={100} hideInSearch={true} cellRenderer={StatusRender} />
      <AgGridColumn field={'description'} headerName={'变更描述'} width={200} hideInSearch={true} />
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

export default ProjectChangeListPage;

export const routeProps = {
  name: '项目变更',
};
