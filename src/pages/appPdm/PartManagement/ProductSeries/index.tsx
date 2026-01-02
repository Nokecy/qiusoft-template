import { AgGridPlus } from '@/components/agGrid';
import { ProductSeriesGetListAsync, ProductSeriesDeleteAsync } from '@/services/pdm/ProductSeries';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space } from 'antd';
import React, { useRef, useMemo } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import ProductSeriesFormDialog from './components/productSeriesFormDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { cloneDeep } from 'lodash';
import dayjs from 'dayjs';

// 根据 path 构建树形层级路径
const buildHierarchy = (item: any) => {
  // path 格式: /1/2/3/
  if (!item.path) return [item.seriesName || item.seriesCode || String(item.id)];

  const ids = item.path.split('/').filter(Boolean);
  // 最后一级使用当前节点的名称
  const hierarchy = [...ids.slice(0, -1).map(String), item.seriesName || item.seriesCode || String(item.id)];
  return hierarchy;
};

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();

  // 暂时默认都有权限，后续根据实际权限配置修改
  const canUpdate = true;
  const canDelete = true;

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return ProductSeriesDeleteAsync({ id })
      .then(() => onRefresh())
      .finally(() => hide());
  };

  return (
    <Space>
      <Access accessible={!!canUpdate}>
        <ProductSeriesFormDialog
          title={'编辑产品系列'}
          entityId={data.id}
          onAfterSubmit={onRefresh}
          buttonProps={{ icon: <EditOutlined />, type: 'link', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
        />
      </Access>

      <Access accessible={!!canDelete}>
        <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
          <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
        </DeleteConfirm>
      </Access>
    </Space>
  );
};

const PdmProductSeriesPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  // 暂时默认都有权限，后续根据实际权限配置修改
  const canCreate = true;

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  // 列定义
  const columnDefs: any = useMemo(
    () => [
      { field: 'seriesCode', headerName: '系列编码', width: 150 },
      { field: 'path', headerName: '系列路径', width: 280 },
      { field: 'level', headerName: '层级', width: 80, hideInSearch: true },
      {
        field: 'isLeaf',
        headerName: '叶子节点',
        width: 100,
        hideInSearch: true,
        cellRenderer: (params: any) => (params.value ? '是' : '否'),
      },
      { field: 'partNumberPrefix', headerName: '物料号前缀', width: 150 },
      {
        field: 'isCodeParticipant',
        headerName: '参与编码',
        width: 100,
        hideInSearch: true,
        cellRenderer: (params: any) => (params.value ? '是' : '否'),
      },
      { field: 'codeSeparator', headerName: '编码分隔符', width: 100, hideInSearch: true },
      { field: 'sortOrder', headerName: '排序号', width: 80, hideInSearch: true },
      {
        field: 'isActive',
        headerName: '是否启用',
        width: 100,
        cellRenderer: (params: any) => (params.value ? '启用' : '禁用'),
      },
      { field: 'description', headerName: '描述', width: 200, hideInSearch: true },
      { field: 'memo', headerName: '备注', width: 200, hideInSearch: true },
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
        width: 120,
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
      headerTitle={'产品系列'}
      gridKey="appPdm.PartManagement.ProductSeries"
      treeData={true}
      getDataPath={data => {
        return data.hierarchy;
      }}
      autoGroupColumnDef={{
        headerName: '系列名称',
        minWidth: 300,
        pinned: 'left',
        cellRendererParams: {
          suppressCount: true,
          innerRenderer: (params: any) => params.data?.seriesName || params.data?.seriesCode || '-',
        },
      }}
      groupDefaultExpanded={-1}
      request={async () => {
        const result = await ProductSeriesGetListAsync({
          MaxResultCount: 10000,
          SkipCount: 0,
        });
        const items = result.items || [];
        // 为每个节点添加 hierarchy 用于树形展示
        const dataWithHierarchy = items.map(item => ({
          ...item,
          hierarchy: buildHierarchy(item),
        }));
        return {
          success: true,
          data: dataWithHierarchy,
          total: result.totalCount || 0,
        } as any;
      }}
      rowSelection={'multiple'}
      rowMultiSelectWithClick={true}
      columnDefs={columnDefs}
      toolBarRender={() => [
        <Access key="create" accessible={!!canCreate}>
          <ProductSeriesFormDialog title={'新建'} onAfterSubmit={onRefresh} buttonProps={{ icon: <PlusOutlined /> }}>
            新建
          </ProductSeriesFormDialog>
        </Access>,
      ]}
    />
  );
};

export default PdmProductSeriesPage;

export const routeProps = {
  name: '产品系列管理',
};
