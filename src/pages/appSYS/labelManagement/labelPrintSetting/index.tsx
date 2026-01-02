/**
 * 标签管理 - 标签打印设置列表页面
 */

import React, { useRef } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from '@umijs/max';
import { Button, Space, message } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import LabelPrintSettingFormDialog from './components/formDialog';
import ValidateTemplateDialog from './components/ValidateTemplateDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  LabelPrintSettingGetListAsync,
  LabelPrintSettingCreateAsync,
  LabelPrintSettingUpdateAsync,
  LabelPrintSettingDeleteAsync,
  LabelPrintSettingGetAsync,
} from '@/services/openApi/LabelPrintSetting';
import { LabelPrintSetting as LabelPrintSettingPermission } from '../../_permissions/labelManagement';

export const routeProps = {
  name: '标签打印设置',
};

const LabelPrintSettingPage = () => {
  const intl = useIntl();
  const gridRef = useRef<GridRef>();
  const access = useAccess();

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
    const { data, onRefresh } = props;

    const refresh = () => {
      onRefresh();
    };

    const handleDelete = (id: any) => {
      const hide = message.loading('正在删除，请稍后', 0);
      return LabelPrintSettingDeleteAsync({ id })
        .then(() => {
          message.success('删除成功');
          refresh();
        })
        .catch((error) => {
          message.error('删除失败');
          console.error('删除失败:', error);
        })
        .finally(() => {
          hide();
        });
    };

    return (
      <Space>
        <ValidateTemplateDialog
          printFeatureCode={data.feature || data.printFeatureCode}
          printFeatureName={data.featureName || data.printFeatureName}
          labelTypeCode={data.labelTypeCode}
          buttonProps={{
            type: 'link',
            size: 'small',
          }}
        />

        <Access accessible={!!access[LabelPrintSettingPermission.Update]}>
          <LabelPrintSettingFormDialog
            getRequest={LabelPrintSettingGetAsync}
            createRequest={LabelPrintSettingCreateAsync}
            updateRequest={LabelPrintSettingUpdateAsync}
            title="编辑标签打印设置"
            entityId={data.id}
            onAfterSubmit={refresh}
            buttonProps={{
              icon: <EditOutlined />,
              type: 'link',
              size: 'small',
            }}
          />
        </Access>

        <Access accessible={!!access[LabelPrintSettingPermission.Delete]}>
          <DeleteConfirm title="确定删除此标签打印设置?" onConfirm={() => handleDelete(data.id)}>
            <Button size="small" icon={<DeleteOutlined />} type="link" danger />
          </DeleteConfirm>
        </Access>
      </Space>
    );
  };

  const columnDefs: any = [
    {
      headerName: '打印特性编码',
      field: 'feature',
      valueGetter: (params: any) => params.data?.feature || params.data?.printFeatureCode,
      width: 120
    },
    {
      headerName: '打印特性名称',
      field: 'featureName',
      valueGetter: (params: any) => params.data?.featureName || params.data?.printFeatureName,
      width: 150
    },
    { headerName: '标签类型编码', field: 'labelTypeCode', width: 120 },
    { headerName: '标签类型名称', field: 'labelTypeName', width: 120 },
    { headerName: '打印模板名称', field: 'printTemplateName', width: 150 },
    { headerName: '打印数量', field: 'printQuantity', width: 100, hideInSearch: true },
    { headerName: '物料分类编码', field: 'materialClassCode', width: 120 },
    { headerName: '物料分类名称', field: 'materialClassName', width: 120 },
    { headerName: '物料编码', field: 'materialItemCode', width: 120 },
    { headerName: '物料名称', field: 'materialItemName', width: 120 },
    { headerName: '物料描述', field: 'materialItemDescription', width: 200 },
    { headerName: '客户编码', field: 'customerCode', width: 120 },
    { headerName: '客户名称', field: 'customerName', width: 120 },
    { headerName: '备注', field: 'remark', width: 200, flex: 1 },
    {
      headerName: '创建时间',
      field: 'creationTime',
      width: 180,
      type: 'dateTimeColumn',
      hideInSearch: true,
      initialSort: 'desc',
    },
    {
      headerName: '最后修改时间',
      field: 'lastModificationTime',
      width: 180,
      type: 'dateTimeColumn',
      hideInSearch: true,
    },
    {
      headerName: '操作',
      field: '',
      width: 200,
      pinned: 'right',
      filter: false,
      cellRenderer: (props: any) => <Options {...props} />,
      cellRendererParams: { onRefresh },
    },
  ];

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle="标签打印设置列表"
      gridKey="label-management.label-print-setting"
      request={async (params: any) => {
        const data = await LabelPrintSettingGetListAsync({
          PageSize: params!.maxResultCount,
          Filter: params?.filter,
          MaxResultCount: params!.maxResultCount,
          SkipCount: params!.skipCount,
          Sorting: params!.sorter!,
        });
        return {
          success: true,
          data: data.items!,
          total: data.totalCount,
        };
      }}
      toolBarRender={() => [
        <Access key="create" accessible={!!access[LabelPrintSettingPermission.Create]}>
          <LabelPrintSettingFormDialog
            createRequest={LabelPrintSettingCreateAsync}
            updateRequest={LabelPrintSettingUpdateAsync}
            title="新建标签打印设置"
            onAfterSubmit={onRefresh}
          >
            新建
          </LabelPrintSettingFormDialog>
        </Access>,
      ]}
      columnDefs={columnDefs}
    />
  );
};

export default LabelPrintSettingPage;
