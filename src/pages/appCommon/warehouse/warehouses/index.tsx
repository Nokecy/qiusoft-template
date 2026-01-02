import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { 
  WarehouseGetListAsync, 
  WarehouseDeleteAsync, 
  WarehouseExportAsync,
  WarehouseGetImportTemplateAsync,
  WarehouseGetAsync,
  WarehouseCreateAsync,
  WarehouseUpdateAsync
} from '@/services/common/Warehouse';
import { Warehouses } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { getGridKey } from '../../_utils';
import { formId, formSchema } from './components/schema';

/**
 * 库房管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

// 使用外部schema创建表单对话框
const WarehouseFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: WarehouseGetAsync,
    create: WarehouseCreateAsync,
    update: WarehouseUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 800
  }
});

// 列定义
const columnDefs = [
  { headerName: '库房编码', field: 'code', width: 150 },
  { headerName: '库房名称', field: 'name', width: 200 },
  { headerName: '库房地址', field: 'address', width: 200, hideInSearch: true },
  { headerName: '库房联系人', field: 'contact', width: 120, hideInSearch: true },
  { headerName: '联系人电话', field: 'tel', width: 130, hideInSearch: true },
  { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true },
  { headerName: '备注信息', field: 'memo', flex: 1 }
];

const WarehousesPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="库房信息"
      gridKey={getGridKey('warehouses')}
      apiConfig={{
        list: WarehouseGetListAsync,
        delete: WarehouseDeleteAsync,
        export: WarehouseExportAsync,
        getImportTemplate: WarehouseGetImportTemplateAsync
      }}
      permissions={{
        create: Warehouses.Create,
        update: Warehouses.Update,
        delete: Warehouses.Delete,
        import: Warehouses.Import,
        export: Warehouses.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: WarehouseFormDialog,
        createTitle: '新建库房',
        editTitle: '编辑库房'
      }}
      importConfig={{
        title: '库房信息',
        downUrl: '/api/common/warehouses/import-template',
        uploadUrl: '/api/common/warehouses/import'
      }}
      exportFileName="warehouses.xlsx"
    />
  );
};

export default WarehousesPage;

export const routeProps = {
  name: '库房信息',
};