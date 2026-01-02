import { AgGridPlus } from '@/components/agGrid';
import DeleteConfirm from '@/components/deleteConfirm';
import {
  DocumentArchiveGetListAsync,
  DocumentArchiveDeleteAsync,
  DocumentArchiveSubmitAsync,
} from '@/services/pdm/DocumentArchive';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SendOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef, useMemo } from 'react';
import { Access, useIntl, history } from 'umi';
import { documentArchiveStatusEnum, documentArchiveTypeOptions } from './_enums';
import dayjs from 'dayjs';

// 状态渲染器
const StatusRenderer = (props: ICellRendererParams) => {
  const { value } = props;
  const statusItem = documentArchiveStatusEnum.find(item => item.value === value);
  if (!statusItem) return value;
  return <Tag color={statusItem.color}>{statusItem.label}</Tag>;
};

// 归档类型渲染器
const ArchiveTypeRenderer = (props: ICellRendererParams) => {
  const { value } = props;
  const typeItem = documentArchiveTypeOptions.find(item => item.value === value);
  if (!typeItem) return value;
  return <Tag color={typeItem.color}>{typeItem.label}</Tag>;
};

const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();

  const handleView = () => {
    history.push(`/appPdm/DocumentManagement/DocumentArchive/detail?id=${data.id}`);
  };

  const handleEdit = () => {
    history.push(`/appPdm/DocumentManagement/DocumentArchive/form?id=${data.id}`);
  };

  const handleDelete = async () => {
    const hide = message.loading('正在删除...', 0);
    try {
      await DocumentArchiveDeleteAsync({ id: data.id });
      message.success('删除成功');
      onRefresh();
    } catch (error) {
      message.error('删除失败');
    } finally {
      hide();
    }
  };

  const handleSubmit = async () => {
    const hide = message.loading('正在提交...', 0);
    try {
      await DocumentArchiveSubmitAsync({ id: data.id });
      message.success('提交成功');
      onRefresh();
    } catch (error) {
      message.error('提交失败');
    } finally {
      hide();
    }
  };

  // 草稿状态可以编辑、删除、提交
  // 使用 == 而不是 === 来处理数字和字符串的比较
  const isDraft = data.orderStatus == 0;

  return (
    <Space>
      <Button size="small" icon={<EyeOutlined />} type="link" title="查看" onClick={handleView} />
      {isDraft && (
        <Button size="small" icon={<EditOutlined />} type="link" title={intl.formatMessage({ id: 'AbpUi:Edit' })} onClick={handleEdit} />
      )}
      {isDraft && (
        <DeleteConfirm title="确定删除?" onConfirm={handleDelete}>
          <Button size="small" icon={<DeleteOutlined />} type="link" title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
        </DeleteConfirm>
      )}
      {isDraft && (
        <DeleteConfirm title="确定提交?" onConfirm={handleSubmit}>
          <Button size="small" icon={<SendOutlined />} type="link" title="提交" />
        </DeleteConfirm>
      )}
    </Space>
  );
};

const DocumentArchivePage: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();

  const onRefresh = () => gridRef.current?.onRefresh();

  const handleCreate = () => {
    history.push('/appPdm/DocumentManagement/DocumentArchive/form');
  };

  // 列定义 - 严格按照后端 DTO 字段
  const columnDefs: any = useMemo(() => [
    {
      field: 'number',
      headerName: '更改单号',
      width: 180,
      cellRenderer: (params: any) => {
        const { data } = params;
        return (
          <a
            onClick={() => history.push(`/appPdm/DocumentManagement/DocumentArchive/detail?id=${data.id}`)}
            style={{ color: '#1890ff', cursor: 'pointer' }}
          >
            {data.number}
          </a>
        );
      }
    },
    {
      field: 'docNo',
      headerName: '文档编码',
      width: 150,
    },
    {
      field: 'documentTypeCode',
      headerName: '文档类型编码',
      width: 130,
      hideInSearch: true,
    },
    {
      field: 'documentTypeName',
      headerName: '文档类型名称',
      width: 150,
    },
    {
      field: 'docVersion',
      headerName: '文档版本',
      width: 100,
      hideInSearch: true,
    },
    {
      field: 'modifyContent',
      headerName: '修改内容',
      width: 200,
      hideInSearch: true,
    },
    {
      field: 'partNo',
      headerName: '物料编码',
      width: 150,
    },
    {
      field: 'partName',
      headerName: '物料名称',
      width: 200,
    },
    {
      field: 'remark',
      headerName: '描述',
      width: 200,
      hideInSearch: true,
    },
    {
      field: 'archiveType',
      headerName: '归档类型',
      width: 120,
      cellRenderer: ArchiveTypeRenderer as any,
      valueEnum: documentArchiveTypeOptions,
    },
    {
      field: 'hwOrderNumber',
      headerName: '华为单号',
      width: 150,
    },
    {
      field: 'orderStatus',
      headerName: '单据状态',
      width: 120,
      cellRenderer: StatusRenderer as any,
      valueEnum: documentArchiveStatusEnum
    },
    {
      field: 'approverName',
      headerName: '审批人名称',
      width: 120,
      hideInSearch: true,
    },
    {
      field: 'rejectionReason',
      headerName: '驳回原因',
      width: 200,
      hideInSearch: true,
    },
    {
      field: 'currentActivityName',
      headerName: '当前节点名称',
      width: 120,
      hideInSearch: true,
    },
    {
      field: 'currentAssigneeName',
      headerName: '当前节点审批人',
      width: 130,
      hideInSearch: true,
    },
    {
      field: 'action',
      headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
      width: 160,
      pinned: 'right',
      filter: false,
      sortable: false,
      cellRenderer: Options,
      cellRendererParams: { onRefresh }
    }
  ], [intl, onRefresh]);

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle="文档归档"
      gridKey="appPdm.DocumentManagement.DocumentArchive"
      request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
        const data = await DocumentArchiveGetListAsync({
          Filter: params?.filter,
          SkipCount: params?.skipCount,
          MaxResultCount: params?.maxResultCount,
          Sorting: params?.sorter,
        } as any);
        return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
      }}
      rowSelection="multiple"
      rowMultiSelectWithClick={true}
      columnDefs={columnDefs}
      toolBarRender={() => [
        <Access key="create" accessible={true}>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            新建
          </Button>
        </Access>,
      ]}
    />
  );
};

export default DocumentArchivePage;

export const routeProps = {
  name: '文档归档',
};
