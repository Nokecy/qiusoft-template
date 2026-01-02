import { AgGridPlus } from '@/components/agGrid';
import DeleteConfirm from '@/components/deleteConfirm';
import {
  FormSchemaGetListAsync,
  FormSchemaDeleteAsync,
  FormSchemaPublishAsync,
  FormSchemaUnpublishAsync,
} from '@/services/openApi/FormSchema';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
} from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef, useMemo } from 'react';
import { Access, useAccess, useIntl, history } from 'umi';
import { FormSchemaPermissions } from '../_permissions';
import { formSchemaSourceTypeEnum } from '../_enums';
import dayjs from 'dayjs';
import FormSchemaFormDialog from './_components/FormDialog';

// 来源类型渲染器
const SourceTypeRenderer = (props: ICellRendererParams) => {
  const { value } = props;
  const item = formSchemaSourceTypeEnum.find((e) => e.value === value);
  if (!item) return value;
  return <Tag color={item.color}>{item.label}</Tag>;
};

// 发布状态渲染器
const PublishStatusRenderer = (props: ICellRendererParams) => {
  const { value } = props;
  return value ? (
    <Tag color="#52c41a">已发布</Tag>
  ) : (
    <Tag color="#faad14">草稿</Tag>
  );
};

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();
  const canUpdate = !!(access && (access[FormSchemaPermissions.Update] ?? true));
  const canDelete = !!(access && (access[FormSchemaPermissions.Delete] ?? true));
  const canPublish = !!(access && (access[FormSchemaPermissions.Publish] ?? true));

  // 编辑/设计表单
  const handleDesign = () => {
    const params = new URLSearchParams();
    params.set('id', data.id);
    if (data.scenarioKey) {
      params.set('scenarioKey', data.scenarioKey);
    }
    history.push(`/appSYS/dynamic-schema/form-schemas/designer?${params.toString()}`);
  };

  // 删除
  const handleDelete = async () => {
    const hide = message.loading('正在删除...', 0);
    try {
      await FormSchemaDeleteAsync({ id: data.id });
      message.success('删除成功');
      onRefresh();
    } catch (error) {
      message.error('删除失败');
    } finally {
      hide();
    }
  };

  // 发布
  const handlePublish = async () => {
    const hide = message.loading('正在发布...', 0);
    try {
      await FormSchemaPublishAsync({ id: data.id });
      message.success('发布成功');
      onRefresh();
    } catch (error) {
      message.error('发布失败');
    } finally {
      hide();
    }
  };

  // 取消发布
  const handleUnpublish = async () => {
    const hide = message.loading('正在取消发布...', 0);
    try {
      await FormSchemaUnpublishAsync({ id: data.id });
      message.success('取消发布成功');
      onRefresh();
    } catch (error) {
      message.error('取消发布失败');
    } finally {
      hide();
    }
  };

  return (
    <Space>
      <Access accessible={canUpdate}>
        <Button
          size="small"
          icon={<EditOutlined />}
          type="link"
          onClick={handleDesign}
        >
          设计
        </Button>
      </Access>
      {data.isPublished ? (
        <Access accessible={canPublish}>
          <DeleteConfirm title="确定取消发布?" onConfirm={handleUnpublish}>
            <Button
              size="small"
              icon={<CloudDownloadOutlined />}
              type="link"
            >
              取消发布
            </Button>
          </DeleteConfirm>
        </Access>
      ) : (
        <Access accessible={canPublish}>
          <DeleteConfirm title="确定发布此Schema?" onConfirm={handlePublish}>
            <Button
              size="small"
              icon={<CloudUploadOutlined />}
              type="link"
              style={{ color: '#52c41a' }}
            >
              发布
            </Button>
          </DeleteConfirm>
        </Access>
      )}
      <Access accessible={canDelete}>
        <DeleteConfirm title="确定删除该表单Schema?" onConfirm={handleDelete}>
          <Button
            size="small"
            icon={<DeleteOutlined />}
            type="link"
            danger
          >
            删除
          </Button>
        </DeleteConfirm>
      </Access>
    </Space>
  );
};

const FormSchemaListPage: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = !!(access && (access[FormSchemaPermissions.Create] ?? true));

  const onRefresh = () => gridRef.current?.onRefresh();

  // 列定义
  const columnDefs: any = useMemo(
    () => [
      {
        field: 'sourceType',
        headerName: '来源类型',
        width: 120,
        cellRenderer: SourceTypeRenderer,
        valueEnum: formSchemaSourceTypeEnum,
      },
      {
        field: 'entityDefinitionId',
        headerName: '动态实体ID',
        width: 200,
        hideInSearch: true,
      },
      {
        field: 'hostEntityId',
        headerName: '宿主实体ID',
        width: 200,
        hideInSearch: true,
      },
      {
        field: 'scenarioKey',
        headerName: '场景Key',
        width: 120,
      },
      {
        field: 'version',
        headerName: '版本',
        width: 80,
        hideInSearch: true,
      },
      {
        field: 'isPublished',
        headerName: '发布状态',
        width: 100,
        hideInSearch: true,
        cellRenderer: PublishStatusRenderer,
      },
      {
        field: 'creationTime',
        headerName: '创建时间',
        width: 160,
        hideInSearch: true,
        initialSort: 'desc',
        cellRenderer: ({ value }: any) =>
          value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-',
      },
      {
        field: 'action',
        headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
        width: 220,
        pinned: 'right',
        filter: false,
        sortable: false,
        cellRenderer: Options,
        cellRendererParams: { onRefresh },
      },
    ],
    [intl, onRefresh]
  );

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle="表单设计管理"
      gridKey="appSYS.dynamic-schema.form-schemas"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await FormSchemaGetListAsync({
          Filter: params?.filter,
          SkipCount: params?.skipCount,
          MaxResultCount: params?.maxResultCount,
          Sorting: params?.sorter,
        } as any);
        return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
      }}
      rowSelection="single"
      columnDefs={columnDefs}
      toolBarRender={() => [
        <Access key="create" accessible={canCreate}>
          <FormSchemaFormDialog
            title="创建表单Schema"
            onAfterSubmit={onRefresh}
            buttonProps={{ icon: <PlusOutlined /> }}
          >
            新建
          </FormSchemaFormDialog>
        </Access>,
      ]}
    />
  );
};

export default FormSchemaListPage;

export const routeProps = {
  name: '表单设计',
};
