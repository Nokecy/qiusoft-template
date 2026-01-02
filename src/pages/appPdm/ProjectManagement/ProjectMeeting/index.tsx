import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import {
  ProjectMeetingGetListAsync,
  ProjectMeetingDeleteAsync,
  ProjectMeetingSubmitAsync,
  ProjectMeetingWithdrawAsync,
} from '@/services/pdm/ProjectMeeting';
import { DeleteOutlined, EditOutlined, PlusOutlined, SendOutlined, RollbackOutlined, EyeOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl, useNavigate } from 'umi';
import DeleteConfirm from '@/components/deleteConfirm';
import { ProjectMeetingsPermissions } from '@/pages/appPdm/_permissions';

// 会议状态枚举
const MeetingStatus = {
  Draft: 0,
  Submitted: 1,
};

const meetingStatusEnum = [
  { label: '草稿', value: MeetingStatus.Draft, color: 'default' },
  { label: '已提交', value: MeetingStatus.Submitted, color: 'success' },
];

// 状态渲染
const StatusRender = (props: ICellRendererParams) => {
  const { value } = props;
  const status = meetingStatusEnum.find(s => s.value === value);
  return status ? <Tag color={status.color} style={{ fontWeight: 'bold' }}>{status.label}</Tag> : <Tag>{value}</Tag>;
};

// 时间范围渲染
const TimeRangeRender = (props: ICellRendererParams) => {
  const { data } = props;
  if (!data || !data.startTime) return '-';

  const formatTime = (time: string) => {
    if (!time) return '';
    return time.replace('T', ' ').substring(0, 16);
  };

  return (
    <div>
      {formatTime(data.startTime)} ~ {formatTime(data.endTime)}
    </div>
  );
};

// 会议编号渲染 - 点击跳转到详情页
const CodeRender = (props: ICellRendererParams & { navigate?: any }) => {
  const { data, value, navigate } = props;

  const handleClick = () => {
    if (data?.id && navigate) {
      navigate(`/appPdm/ProjectManagement/ProjectMeeting/detail?id=${data.id}`);
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

  const canUpdate = !!(access && access[ProjectMeetingsPermissions.Update]);
  const canDelete = !!(access && access[ProjectMeetingsPermissions.Delete]);
  const canSubmit = !!(access && access[ProjectMeetingsPermissions.Submit]);
  const canWithdraw = !!(access && access[ProjectMeetingsPermissions.Withdraw]);

  const isDraft = data.status === MeetingStatus.Draft;
  const isSubmitted = data.status === MeetingStatus.Submitted;

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return ProjectMeetingDeleteAsync({ id }).then(() => onRefresh()).finally(() => hide());
  };

  const handleSubmit = (id: any) => {
    const hide = message.loading('正在提交,请稍后', 0);
    return ProjectMeetingSubmitAsync({ id })
      .then(() => {
        message.success('提交成功');
        onRefresh();
      })
      .finally(() => hide());
  };

  const handleWithdraw = (id: any) => {
    const hide = message.loading('正在撤回,请稍后', 0);
    return ProjectMeetingWithdrawAsync({ id })
      .then(() => {
        message.success('撤回成功');
        onRefresh();
      })
      .finally(() => hide());
  };

  // 查看详情
  const handleViewDetail = () => {
    navigate(`/appPdm/ProjectManagement/ProjectMeeting/detail?id=${data.id}`);
  };

  // 编辑会议
  const handleEdit = () => {
    navigate(`/appPdm/ProjectManagement/ProjectMeeting/form?id=${data.id}`);
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

      {/* 编辑按钮 - 仅草稿状态显示 */}
      {isDraft && (
        <Access accessible={canUpdate}>
          <Button
            size={'small'}
            icon={<EditOutlined />}
            type={'link'}
            title={intl.formatMessage({ id: 'AbpUi:Edit' })}
            onClick={handleEdit}
          />
        </Access>
      )}

      {/* 删除按钮 - 仅草稿状态显示 */}
      {isDraft && (
        <Access accessible={canDelete}>
          <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
            <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
          </DeleteConfirm>
        </Access>
      )}

      {/* 提交按钮 - 仅草稿状态显示 */}
      {isDraft && (
        <Access accessible={canSubmit}>
          <DeleteConfirm title="确定提交?" onConfirm={() => handleSubmit(data.id)}>
            <Button size={'small'} icon={<SendOutlined />} type={'link'} title="提交" />
          </DeleteConfirm>
        </Access>
      )}

      {/* 撤回按钮 - 仅已提交状态显示 */}
      {isSubmitted && (
        <Access accessible={canWithdraw}>
          <DeleteConfirm title="确定撤回?" onConfirm={() => handleWithdraw(data.id)}>
            <Button size={'small'} icon={<RollbackOutlined />} type={'link'} title="撤回" />
          </DeleteConfirm>
        </Access>
      )}
    </Space>
  );
};

const ProjectMeetingPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const navigate = useNavigate();
  const access = useAccess();
  const canCreate = !!(access && access[ProjectMeetingsPermissions.Create]);

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  // 新建会议
  const handleCreate = () => {
    navigate('/appPdm/ProjectManagement/ProjectMeeting/form');
  };

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle={'项目会议'}
      gridKey="appPdm.ProjectManagement.ProjectMeeting"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await ProjectMeetingGetListAsync(
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
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
              新建
            </Button>
          </Access>,
        ];
      }}
    >
      <AgGridColumn field={'meetingCode'} headerName={'会议编号'} width={150} cellRenderer={CodeRender} cellRendererParams={{ navigate }} />
      <AgGridColumn field={'meetingName'} headerName={'会议名称'} width={220} />
      <AgGridColumn
        field={'timeRange'}
        headerName={'会议时间'}
        width={300}
        hideInSearch={true}
        cellRenderer={TimeRangeRender}
        sortable={false}
      />
      <AgGridColumn field={'location'} headerName={'会议地点'} width={180} />
      <AgGridColumn field={'hostName'} headerName={'主持人'} width={120} />
      <AgGridColumn field={'recorderName'} headerName={'记录人'} width={120} hideInSearch={true} />
      <AgGridColumn field={'startTime'} headerName={'开始时间'} width={180} hideInSearch={true} initialSort={'desc'} hide={true} />
      <AgGridColumn field={'status'} headerName={'状态'} width={100} hideInSearch={true} cellRenderer={StatusRender} />
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

export default ProjectMeetingPage;

export const routeProps = {
  name: '项目会议',
};
