import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { RiskTypeGetListAsync, RiskTypeDeleteAsync } from '@/services/pdm/RiskType';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import RiskTypeFormDialog from './components/RiskTypeFormDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { RiskTypePermissions } from '@/pages/appPdm/_permissions';

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();

  const canUpdate = !!(access && access[RiskTypePermissions.Update]);
  const canDelete = !!(access && access[RiskTypePermissions.Delete]);

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return RiskTypeDeleteAsync({ id }).then(() => onRefresh()).finally(() => hide());
  };

  return (
    <Space>
      <Access accessible={canUpdate}>
        <RiskTypeFormDialog
          title={'编辑风险类型'}
          entityId={data.id}
          onAfterSubmit={onRefresh}
          buttonProps={{ icon: <EditOutlined />, type: 'link', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
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

const RiskTypePage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = !!(access && access[RiskTypePermissions.Create]);

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle={'风险类型'}
      gridKey="appPdm.ProjectManagement.RiskType"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await RiskTypeGetListAsync(
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
          <Access accessible={canCreate}>
            <RiskTypeFormDialog title={'新建风险类型'} onAfterSubmit={onRefresh}>
              <PlusOutlined /> 新建
            </RiskTypeFormDialog>
          </Access>,
        ];
      }}
    >
      <AgGridColumn field={'code'} headerName={'类型编码'} width={180} />
      <AgGridColumn field={'name'} headerName={'类型名称'} width={220} />
      <AgGridColumn field={'description'} headerName={'描述'} width={260} hideInSearch={true} />
      <AgGridColumn
        field={'action'}
        headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
        width={120}
        pinned={'right'}
        filter={false}
        sortable={false}
        cellRenderer={Options}
        cellRendererParams={{ onRefresh }}
      />
    </AgGridPlus>
  );
};

export default RiskTypePage;

export const routeProps = {
  name: '风险类型管理',
};
