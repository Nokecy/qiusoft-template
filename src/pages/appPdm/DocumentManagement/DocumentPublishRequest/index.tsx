/**
 * 文档发布申请单列表页
 * 路由: /appPdm/DocumentManagement/DocumentPublishRequest
 */

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Button, message, Space, Tag, Segmented } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SendOutlined,
  CloseCircleOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { Access, useAccess, useIntl, history } from 'umi';
import { ICellRendererParams } from 'ag-grid-community';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { AgGridPlus } from '@/components/agGrid';
import DeleteConfirm from '@/components/deleteConfirm';
import {
  DocumentPublishRequestGetListAsync,
  DocumentPublishRequestGetItemDetailsListAsync,
  DocumentPublishRequestDeleteAsync,
  DocumentPublishRequestSubmitAsync,
} from '@/services/pdm/DocumentPublishRequest';
import {
  documentPublishRequestStatusEnum,
  DocumentPublishRequestStatus,
  publishTypeEnum,
} from './_enums';
import dayjs from 'dayjs';

// 状态渲染器
const StatusRenderer = (props: ICellRendererParams) => {
  const { value } = props;
  const statusItem = documentPublishRequestStatusEnum.find((item) => item.value === value);
  if (!statusItem) return value;
  return <Tag color={statusItem.color}>{statusItem.label}</Tag>;
};

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void; viewMode: 'detail' | 'header' }) => {
  const { data, onRefresh, viewMode } = props;
  const intl = useIntl();
  const access = useAccess();

  // 权限判断（需要根据实际后端权限定义调整）
  const canUpdate = true; // !!(access && access['Permission.Update']);
  const canDelete = true; // !!(access && access['Permission.Delete']);
  const canSubmit = true; // !!(access && access['Permission.Submit']);

  // 查看详情
  const handleView = () => {
    const targetId = viewMode === 'detail' ? data.requestId : data.id;
    history.push(
      `/appPdm/DocumentManagement/DocumentPublishRequest/detail?id=${targetId}`
    );
  };

  // 编辑
  const handleEdit = () => {
    history.push(
      `/appPdm/DocumentManagement/DocumentPublishRequest/form?id=${data.id}`
    );
  };

  // 删除
  const handleDelete = async () => {
    const hide = message.loading('正在删除...', 0);
    try {
      await DocumentPublishRequestDeleteAsync({ id: data.id });
      message.success('删除成功');
      onRefresh();
    } catch (error) {
      message.error('删除失败');
    } finally {
      hide();
    }
  };

  // 提交审批
  const handleSubmit = async () => {
    const hide = message.loading('正在提交...', 0);
    try {
      await DocumentPublishRequestSubmitAsync({ id: data.id });
      message.success('提交成功');
      onRefresh();
    } catch (error) {
      message.error('提交失败');
    } finally {
      hide();
    }
  };

  // 重新发起（复制数据到表单页）
  const handleRestart = () => {
    history.push(
      `/appPdm/DocumentManagement/DocumentPublishRequest/form?copyFrom=${data.id}`
    );
  };

  // 根据状态显示不同操作
  const isDraft = data.status === DocumentPublishRequestStatus.Draft;
  const allowOperate = viewMode === 'header';
  const isRejected = data.status === DocumentPublishRequestStatus.Rejected;

  return (
    <Space>
      <Button
        size="small"
        icon={<EyeOutlined />}
        type="link"
        title="查看"
        onClick={handleView}
      />

      {allowOperate && isDraft && (
        <Access accessible={canUpdate}>
          <Button
            size="small"
            icon={<EditOutlined />}
            type="link"
            title={intl.formatMessage({ id: 'AbpUi:Edit' })}
            onClick={handleEdit}
          />
        </Access>
      )}

      {allowOperate && isDraft && (
        <Access accessible={canDelete}>
          <DeleteConfirm title="确定删除?" onConfirm={handleDelete}>
            <Button
              size="small"
              icon={<DeleteOutlined />}
              type="link"
              title={intl.formatMessage({ id: 'AbpUi:Delete' })}
            />
          </DeleteConfirm>
        </Access>
      )}

      {allowOperate && isDraft && (
        <Access accessible={canSubmit}>
          <DeleteConfirm title="确定提交审批?" onConfirm={handleSubmit}>
            <Button
              size="small"
              icon={<SendOutlined />}
              type="link"
              title="提交"
            />
          </DeleteConfirm>
        </Access>
      )}

      {allowOperate && isRejected && (
        <Button
          size="small"
          icon={<RedoOutlined />}
          type="link"
          title="重新发起"
          onClick={handleRestart}
        />
      )}
    </Space>
  );
};

const DocumentPublishRequestPage: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = true; // !!(access && access['Permission.Create']);
  const [viewMode, setViewMode] = useState<'detail' | 'header'>('detail');
  const didMountRef = useRef(false);

  const onRefresh = () => gridRef.current?.onRefresh();

  // 新建申请单
  const handleCreate = () => {
    history.push('/appPdm/DocumentManagement/DocumentPublishRequest/form');
  };

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    onRefresh();
  }, [viewMode]);

  // 列定义
  
  const headerColumnDefs: any = useMemo(
    () => [
      {
        field: 'requestNumber',
        headerName: '申请单号',
        width: 180,
        cellRenderer: (params: any) => {
          const { data } = params;
          return (
            <a
              onClick={() =>
                history.push(
                  `/appPdm/DocumentManagement/DocumentPublishRequest/detail?id=${data.id}`
                )
              }
              style={{ color: '#1890ff', cursor: 'pointer' }}
            >
              {data.requestNumber}
            </a>
          );
        },
      },
      {
        field: 'applicantName',
        headerName: '申请人姓名',
        width: 120,
      },
      {
        field: 'applicationTime',
        headerName: '申请时间',
        width: 160,
        hideInSearch: true,
        cellRenderer: ({ value }: any) =>
          value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-',
      },
      {
        field: 'approverName',
        headerName: '审批人姓名',
        width: 120,
      },
      {
        field: 'title',
        headerName: '发布标题',
        width: 220,
      },
      {
        field: 'description',
        headerName: '发布说明',
        width: 200,
        hideInSearch: true,
      },
      {
        field: 'remark',
        headerName: '备注',
        width: 200,
        hideInSearch: true,
      },
      {
        field: 'status',
        headerName: '状态',
        width: 120,
        cellRenderer: StatusRenderer as any,
        valueEnum: documentPublishRequestStatusEnum,
      },
      {
        field: 'action',
        headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
        width: 200,
        pinned: 'right',
        filter: false,
        sortable: false,
        cellRenderer: Options,
        cellRendererParams: { onRefresh, viewMode: 'header' },
      },
    ],
    [intl, onRefresh]
  );

    const detailColumnDefs: any = useMemo(
      () => [
        {
          field: 'requestNumber',
          headerName: '申请单号',
          width: 180,
          cellRenderer: (params: any) => {
            const { data } = params;
            return (
              <a
                onClick={() =>
                  history.push(
                    `/appPdm/DocumentManagement/DocumentPublishRequest/detail?id=${data.requestId}`
                  )
                }
                style={{ color: '#1890ff', cursor: 'pointer' }}
              >
                {data.requestNumber}
              </a>
            );
          },
        },
        {
          field: 'applicantName',
          headerName: '申请人姓名',
          width: 120,
        },
        {
          field: 'status',
          headerName: '状态',
          width: 120,
          cellRenderer: StatusRenderer as any,
          valueEnum: documentPublishRequestStatusEnum,
        },
        {
          field: 'currentActivityName',
          headerName: '当前节点',
          width: 120,
          hideInSearch: true,
        },
        {
          field: 'currentAssigneeName',
          headerName: '当前审批人',
          width: 120,
          hideInSearch: true,
        },
        {
          field: 'creationTime',
          headerName: '申请时间',
          width: 160,
          hideInSearch: true,
          initialSort: 'desc',
          cellRenderer: ({ value }: any) =>
            value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-',
        },
        {
          field: 'documentNumber',
          headerName: '文档编号',
          width: 160,
        },
        {
          field: 'documentName',
          headerName: '文档名称',
          width: 200,
        },
        {
          field: 'documentVersion',
          headerName: '文档版本',
          width: 120,
          hideInSearch: true,
        },
        {
          field: 'documentTypeName',
          headerName: '文档类型',
          width: 140,
          hideInSearch: true,
        },
        {
          field: 'fileName',
          headerName: '文件名称',
          width: 160,
          hideInSearch: true,
        },
        {
          field: 'partNumber',
          headerName: '物料编码',
          width: 140,
          hideInSearch: true,
        },
        {
          field: 'drawingNumber',
          headerName: '图号',
          width: 140,
          hideInSearch: true,
        },
        {
          field: 'action',
          headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
          width: 120,
          pinned: 'right',
          filter: false,
          sortable: false,
          cellRenderer: Options,
          cellRendererParams: { onRefresh, viewMode: 'detail' },
        },
      ],
      [intl, onRefresh]
    );

  const columnDefs = viewMode === 'detail' ? detailColumnDefs : headerColumnDefs;
  const gridKey = viewMode === 'detail'
    ? 'appPdm.DocumentManagement.DocumentPublishRequest.detail'
    : 'appPdm.DocumentManagement.DocumentPublishRequest';


  return (
    <AgGridPlus
      key={gridKey}
      gridRef={gridRef}
      headerTitle="文档发布申请单"
      gridKey={gridKey}
      request={async (params?: {
        pageSize: number;
        current: number;
        [key: string]: any;
      }) => {
        const isDetail = viewMode === 'detail';
        const fetcher = isDetail ? DocumentPublishRequestGetItemDetailsListAsync : DocumentPublishRequestGetListAsync;
        const data = await fetcher({
          Filter: params?.filter,
          SkipCount: params?.skipCount,
          MaxResultCount: params?.maxResultCount,
          Sorting: params?.sorter || (isDetail ? 'creationTime desc' : undefined),
        } as any);
        return {
          success: true,
          data: data.items || [],
          total: data.totalCount || 0,
        } as any;
      }}
      rowSelection="multiple"
      rowMultiSelectWithClick={true}
      columnDefs={columnDefs}
      toolBarRender={() => [
        <Segmented
          key="view-mode"
          value={viewMode}
          onChange={(value) => {
            setViewMode(value as 'detail' | 'header');
          }}
          options={[
            { label: '明细视图', value: 'detail' },
            { label: '主单视图', value: 'header' },
          ]}
        />,
        <Access key="create" accessible={canCreate}>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            新建
          </Button>
        </Access>,
      ]}
    />
  );
};

export default DocumentPublishRequestPage;

export const routeProps = {
  name: '文档发布申请单',
};
