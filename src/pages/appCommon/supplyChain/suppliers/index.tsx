import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { 
  SupplierGetListAsync, 
  SupplierDeleteAsync, 
  SupplierExportAsync,
  SupplierGetImportTemplateAsync,
  SupplierGetAsync,
  SupplierCreateAsync,
  SupplierUpdateAsync
} from '@/services/common/Supplier';
import { Suppliers } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { getGridKey } from '../../_utils';
import { formId, formSchema } from './components/schema';

/**
 * 供应商管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

// 使用外部schema创建表单对话框
const SupplierFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: SupplierGetAsync,
    create: SupplierCreateAsync,
    update: SupplierUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 800
  }
});

// 列定义
const columnDefs = [
  { headerName: '供应商编码', field: 'code', width: 150 },
  { headerName: '供应商名称', field: 'name', width: 200 },
  { headerName: '供应商简称', field: 'abbName', width: 150 },
  { headerName: '地址', field: 'address', width: 200, hideInSearch: true },
  { headerName: '联系电话', field: 'tel', width: 130, hideInSearch: true },
  { headerName: '供应商代码', field: 'vendorCode', width: 150, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true },
  { headerName: '备注', field: 'memo', flex: 1 }
];

const SuppliersPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="供应商信息"
      gridKey={getGridKey('suppliers')}
      apiConfig={{
        list: SupplierGetListAsync,
        delete: SupplierDeleteAsync,
        export: SupplierExportAsync,
        getImportTemplate: SupplierGetImportTemplateAsync
      }}
      permissions={{
        create: Suppliers.Create,
        update: Suppliers.Update,
        delete: Suppliers.Delete,
        import: Suppliers.Import,
        export: Suppliers.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: SupplierFormDialog,
        createTitle: '新建供应商',
        editTitle: '编辑供应商'
      }}
      importConfig={{
        title: '供应商信息',
        downUrl: '/api/common/suppliers/import-template',
        uploadUrl: '/api/common/suppliers/import'
      }}
      exportFileName="suppliers.xlsx"
    />
  );
};

export default SuppliersPage;

export const routeProps = {
  name: '供应商信息',
};