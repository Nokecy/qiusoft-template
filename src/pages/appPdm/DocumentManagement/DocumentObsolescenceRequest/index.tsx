import { AgGridPlus } from '@/components/agGrid';
import {
  DocumentObsolescenceRequestGetListAsync,
  DocumentObsolescenceRequestDeleteAsync,
  DocumentObsolescenceRequestSubmitAsync,
  DocumentObsolescenceRequestWithdrawAsync,
} from '@/services/pdm/DocumentObsolescenceRequest';
import { DeleteOutlined, EditOutlined, PlusOutlined, SendOutlined, RollbackOutlined, EyeOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl, history } from 'umi';
import DeleteConfirm from '@/components/deleteConfirm';
import { DocumentObsolescenceRequestsPermissions } from '@/pages/appPdm/_permissions/pdmPermissions';
import { approvalStatusEnum, obsolescenceReasonTypeEnum } from './_enums';

import dayjs from 'dayjs';

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();

  const canUpdate = !!(access && access[DocumentObsolescenceRequestsPermissions.Update]);
  const canDelete = !!(access && access[DocumentObsolescenceRequestsPermissions.Delete]);
  const canSubmit = !!(access && access[DocumentObsolescenceRequestsPermissions.Submit]);
  const canWithdraw = !!(access && access[DocumentObsolescenceRequestsPermissions.Withdraw]);

  const handleDelete = (id: any) => {
    const hide = message.loading('正在删除,请稍后', 0);
    return DocumentObsolescenceRequestDeleteAsync({ id }).then(() => {
      message.success('删除成功');
      onRefresh();
    }).catch(() => {
      message.error('删除失败');
    }).finally(() => hide());
  };

  const handleSubmit = async (id: any) => {
    const hide = message.loading('正在提交审批,请稍后', 0);
    try {
      await DocumentObsolescenceRequestSubmitAsync({ id });
      message.success('提交成功');
      onRefresh();
    } catch (error: any) {
      message.error(error?.message || '提交失败,请重试');
    } finally {
      hide();
    }
  };

  const handleWithdraw = async (id: any) => {
    const hide = message.loading('正在撤回,请稍后', 0);
    try {
      await DocumentObsolescenceRequestWithdrawAsync({ id, reason: '申请人撤回' });
      message.success('撤回成功');
      onRefresh();
    } catch (error: any) {
      message.error(error?.message || '撤回失败,请重试');
    } finally {
      hide();
    }
  };

  const handleViewDetail = (id: any) => {
    history.push(`/appPdm/DocumentManagement/DocumentObsolescenceRequest/detail?id=${id}`);
  };

  return (
    <Space>
      <Button
        size="small"
        icon={<EyeOutlined />}
        type="link"
        title="查看详情"
        onClick={() => handleViewDetail(data.id)}
      />

      {data.status === 0 && (
        <>
          <Access accessible={canUpdate}>
            <Button
              size="small"
              icon={<EditOutlined />}
              type="link"
              title={intl.formatMessage({ id: 'AbpUi:Edit' })}
              onClick={() => {
                history.push(`/appPdm/DocumentManagement/DocumentObsolescenceRequest/form?id=${data.id}`);
              }}
            />
          </Access>

          <Access accessible={canDelete}>
            <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
              <Button size="small" danger icon={<DeleteOutlined />} type="link" title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
            </DeleteConfirm>
          </Access>
        </>
      )}

      {data.status === 0 && (
        <Access accessible={canSubmit}>
          <DeleteConfirm title="确定提交审批?" onConfirm={() => handleSubmit(data.id)}>
            <Button size="small" type="link" icon={<SendOutlined />} title="提交审批">
              提交
            </Button>
          </DeleteConfirm>
        </Access>
      )}

      {data.status === 10 && (
        <Access accessible={canWithdraw}>
          <DeleteConfirm title="确定撤回申请?" onConfirm={() => handleWithdraw(data.id)}>
            <Button size="small" icon={<RollbackOutlined />} type="link" title="撤回" />
          </DeleteConfirm>
        </Access>
      )}
    </Space>
  );
};

const DocumentObsolescenceRequestPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = !!(access && access[DocumentObsolescenceRequestsPermissions.Create]);

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  // 业务字段列定义
  const businessColumns = [
    {
      headerName: '申请单编号',
      field: 'requestNumber',
      width: 180,
      cellRenderer: (params: any) => {
        const handleClick = () => {
          history.push(`/appPdm/DocumentManagement/DocumentObsolescenceRequest/detail?id=${params.data.id}`);
        };
        return (
          <a onClick={handleClick} style={{ color: '#1890ff', cursor: 'pointer' }}>
            {params.value}
          </a>
        );
      }
    },
    { headerName: '申请标题', field: 'title', width: 250 },
    { headerName: '申请说明', field: 'description', width: 200, hideInSearch: true },
    { headerName: '文档编号', field: 'documentNumber', width: 180 },
    { headerName: '文档名称', field: 'documentName', width: 200 },
    { headerName: '文档版本号', field: 'documentVersion', width: 120, hideInSearch: true },
    {
      headerName: '失效时间',
      field: 'effectiveDate',
      width: 160,
      hideInSearch: true,
      cellRenderer: (params: any) => params.value ? dayjs(params.value).format('YYYY-MM-DD HH:mm') : '-'
    },
    {
      headerName: '作废原因类型',
      field: 'reasonType',
      width: 130,
      hideInSearch: true,
      valueEnum: obsolescenceReasonTypeEnum,
    },
    { headerName: '详细说明', field: 'reasonDescription', width: 200, hideInSearch: true },
    { headerName: '影响范围', field: 'impactScope', width: 180, hideInSearch: true },
    {
      headerName: '单据状态',
      field: 'status',
      width: 100,
      valueEnum: approvalStatusEnum,
    },
    { headerName: '处理人名称', field: 'assignedToUserName', width: 120, hideInSearch: true },
    { headerName: '当前节点名称', field: 'currentActivityName', width: 150, hideInSearch: true },
    { headerName: '当前节点审批人名称', field: 'currentAssigneeName', width: 160, hideInSearch: true },
    {
      headerName: '创建时间',
      field: 'creationTime',
      width: 160,
      hideInSearch: true,
      initialSort: 'desc',
      cellRenderer: (params: any) => params.value ? dayjs(params.value).format('YYYY-MM-DD HH:mm') : '-'
    },
  ];

  // 操作列定义
  const operationColumn = {
    headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
    field: 'action',
    width: 200,
    pinned: 'right',
    filter: false,
    sortable: false,
    cellRenderer: Options,
    cellRendererParams: { onRefresh },
  };

  // 完整的列定义（业务字段 + 操作列）
  const columnDefs = [...businessColumns, operationColumn];

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle={'文档作废申请'}
      gridKey="appPdm.DocumentManagement.DocumentObsolescenceRequest"
      request={async (params: any) => {
        const data = await DocumentObsolescenceRequestGetListAsync({
          Filter: params?.filter,
          SkipCount: params!.skipCount,
          MaxResultCount: params!.maxResultCount,
          Sorting: params!.sorter!
        } as any);
        return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
      }}
      toolBarRender={() => {
        return [
          <Access key="create" accessible={canCreate}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                history.push('/appPdm/DocumentManagement/DocumentObsolescenceRequest/form');
              }}
            >
              新建申请
            </Button>
          </Access>,
        ];
      }}
      columnDefs={columnDefs}
    />
  );
};

export default DocumentObsolescenceRequestPage;

export const routeProps = {
  name: '文档作废申请',
};
