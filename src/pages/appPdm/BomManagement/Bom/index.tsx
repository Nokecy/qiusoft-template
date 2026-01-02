import { AgGridPlus } from '@/components/agGrid';
import DeleteConfirm from '@/components/deleteConfirm';
import { BomGetListAsync, BomDeleteAsync } from '@/services/pdm/Bom';
import { DeleteOutlined, PlusOutlined, EyeOutlined, CopyOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, Space, message, Tooltip } from 'antd';
import React, { useMemo, useRef } from 'react';
import { Access, useAccess, useIntl, history } from 'umi';
import BomFormDialog from './components/bomFormDialog';
import { BomPermissions } from '@/pages/appPdm/_permissions';
import ImportPublic from '@/components/importPublic';
import dayjs from 'dayjs';

const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();
  const canDelete = (access && (access[BomPermissions.Delete] ?? true)) as boolean;

  const handleDelete = (id: number) => {
    const hide = message.loading('正在操作,请稍候...', 0);
    return BomDeleteAsync({ id }).then(() => onRefresh()).finally(() => hide());
  };

  const handleViewDetail = () => {
    // 跳转到详情页，version参数由详情页的VersionSelector自动加载后设置
    history.push(`/appPdm/BomManagement/Bom/detail?id=${data.id}`);
  };

  return (
    <Space>
      <Tooltip title="查看详情">
        <Button size="small" icon={<EyeOutlined />} type="link" onClick={handleViewDetail} />
      </Tooltip>
      <Tooltip title="复制BOM">
        <Button size="small" icon={<CopyOutlined />} type="link" />
      </Tooltip>
      <Access accessible={!!canDelete}>
        <DeleteConfirm title="确定删除该BOM吗？删除后将无法恢复！" onConfirm={() => handleDelete(data.id)}>
          <Button size="small" icon={<DeleteOutlined />} type="link" danger title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
        </DeleteConfirm>
      </Access>
    </Space>
  );
};


const BomPage: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = (access && (access[BomPermissions.Create] ?? true)) as boolean;
  const canImport = (access && (access[BomPermissions.Import] ?? true)) as boolean;

  const onRefresh = () => gridRef.current?.onRefresh();

  // 列定义
  const columnDefs: any = useMemo(() => [
    { field: 'materialCode', headerName: '物料编码', width: 180 },
    { field: 'materialDescription', headerName: '物料描述', width: 240 },
    { field: 'topMaterialCode', headerName: '顶层物料编码', width: 180, hideInSearch: true },
    { field: 'engineerCode', headerName: '工程师编码', width: 150, hideInSearch: true },
    { field: 'engineerName', headerName: '工程师姓名', width: 150, hideInSearch: true },
    { field: 'remark', headerName: '备注', width: 200, hideInSearch: true },
    { field: 'creator', headerName: '创建人', width: 100, hideInSearch: true },
    {
      field: 'creationTime',
      headerName: '创建时间',
      width: 160,
      hideInSearch: true,
      initialSort: 'desc',
      cellRenderer: ({ value }: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-'
    },
    {
      field: 'lastModificationTime',
      headerName: '最后修改时间',
      width: 160,
      hideInSearch: true,
      cellRenderer: ({ value }: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-'
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
      cellRendererParams: { onRefresh }
    }
  ], [intl, onRefresh]);


  return (
    <div style={{ height: '100%' }}>
      <AgGridPlus
        gridRef={gridRef}
        headerTitle={'BOM 物料清单'}
        gridKey="appPdm.BomManagement.Bom"
        request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
          const data = await BomGetListAsync({
            Filter: params?.filter,
            SkipCount: params?.skipCount,
            MaxResultCount: params?.maxResultCount,
            Sorting: params?.sorter,
          } as any);
          return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
        }}
        rowSelection={null}
        columnDefs={columnDefs}
        toolBarRender={() => [
          <Access key="create-btn" accessible={!!canCreate}>
            <BomFormDialog title="新建 BOM" onAfterSubmit={onRefresh}>
              <Button type="primary" icon={<PlusOutlined />}>
                新建 BOM
              </Button>
            </BomFormDialog>
          </Access>,
          <Access key="import-btn" accessible={!!canImport}>
            <ImportPublic
              onAfterSubmit={onRefresh}
              title="BOM物料清单"
              downUrl="/api/pdm/bom-import/import-template"
              uploadUrl="/api/pdm/bom-import/import"
              icon={<CloudUploadOutlined />}
            >
              导入 BOM
            </ImportPublic>
          </Access>,
        ]}
      />
    </div>
  );
};

export default BomPage;

export const routeProps = {
  name: 'BOM物料清单',
};
