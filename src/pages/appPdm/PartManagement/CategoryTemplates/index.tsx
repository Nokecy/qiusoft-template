import { AgGridPlus } from '@/components/agGrid';
import {
  CategoryLevelTemplateGetListAsync,
  CategoryLevelTemplateDeleteAsync,
} from '@/services/pdm/CategoryLevelTemplate';
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef, useMemo } from 'react';
import { Access, useAccess, useIntl, history } from 'umi';
import DeleteConfirm from '@/components/deleteConfirm';
import { CategoryLevelTemplatePermissions } from '@/pages/appPdm/_permissions';
import TemplateFormDialog from './components/TemplateFormDialog';
import dayjs from 'dayjs';

// 状态渲染器
const StatusRenderer = (props: ICellRendererParams) => {
  const { value } = props;
  return value ? <Tag color="#52c41a">启用</Tag> : <Tag color="#d9d9d9">禁用</Tag>;
};

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();

  const canUpdate = !!(access && (access[CategoryLevelTemplatePermissions.Update] ?? true));
  const canDelete = !!(access && (access[CategoryLevelTemplatePermissions.Delete] ?? true));

  const handleDelete = async (id: number) => {
    const hide = message.loading('正在删除...', 0);
    try {
      await CategoryLevelTemplateDeleteAsync({ id });
      message.success('删除成功');
      onRefresh();
    } catch (error) {
      message.error('删除失败');
    } finally {
      hide();
    }
  };

  const handleViewDetail = () => {
    history.push(`/appPdm/PartManagement/CategoryTemplates/detail?id=${data.id}`);
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
        <TemplateFormDialog
          title={'编辑模板'}
          entityId={data.id}
          onAfterSubmit={onRefresh}
          buttonProps={{ icon: <EditOutlined />, type: 'link', size: 'small', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
        />
      </Access>
      <Access accessible={canDelete}>
        <DeleteConfirm title="确定删除此模板?" onConfirm={() => handleDelete(data.id)}>
          <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
        </DeleteConfirm>
      </Access>
    </Space>
  );
};

const CategoryTemplatesPage: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = !!(access && (access[CategoryLevelTemplatePermissions.Create] ?? true));

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  // 列定义
  const columnDefs: any = useMemo(
    () => [
      { field: 'templateName', headerName: '模板名称', width: 200 },
      { field: 'description', headerName: '模板描述', width: 300 },
      { field: 'defaultSeparator', headerName: '默认分隔符', width: 100, hideInSearch: true },
      {
        field: 'isActive',
        headerName: '状态',
        width: 100,
        cellRenderer: StatusRenderer,
        valueEnum: [
          { label: '启用', value: true },
          { label: '禁用', value: false },
        ],
      },
      { field: 'creator', headerName: '创建人', width: 100, hideInSearch: true },
      {
        field: 'creationTime',
        headerName: '创建时间',
        width: 160,
        hideInSearch: true,
        initialSort: 'desc',
        cellRenderer: ({ value }: any) => (value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-'),
      },
      {
        field: 'lastModificationTime',
        headerName: '最后修改时间',
        width: 160,
        hideInSearch: true,
        cellRenderer: ({ value }: any) => (value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-'),
      },
      { field: 'lastModifier', headerName: '最后修改人', width: 100, hideInSearch: true },
      {
        field: 'action',
        headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
        width: 150,
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
      headerTitle={'分类层级模板'}
      gridKey="appPdm.PartManagement.CategoryTemplates"
      request={async (params) => {
        const data = await CategoryLevelTemplateGetListAsync({
          Filter: params?.filter,
          SkipCount: params?.skipCount,
          MaxResultCount: params?.maxResultCount,
          Sorting: params?.sorter,
        });
        return { success: true, data: data.items || [], total: data.totalCount || 0 };
      }}
      rowSelection={'multiple'}
      rowMultiSelectWithClick={true}
      columnDefs={columnDefs}
      toolBarRender={() => [
        <Access key="create" accessible={canCreate}>
          <TemplateFormDialog title={'新建模板'} onAfterSubmit={onRefresh} buttonProps={{ icon: <PlusOutlined /> }}>
            新建
          </TemplateFormDialog>
        </Access>,
      ]}
    />
  );
};

export default CategoryTemplatesPage;

export const routeProps = {
  name: '分类层级模板',
};
