import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { 
  CustomerGetListAsync, 
  CustomerDeleteAsync, 
  CustomerExportAsync,
  CustomerGetImportTemplateAsync,
  CustomerGetAsync,
  CustomerCreateAsync,
  CustomerUpdateAsync
} from '@/services/common/Customer';
import { Customers } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { getGridKey } from '../../_utils';
import { formId, formSchema } from './components/schema';

/**
 * 客户管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

// 使用外部schema创建表单对话框
const CustomerFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: CustomerGetAsync,
    create: CustomerCreateAsync,
    update: CustomerUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 800
  }
});

// 列定义
const columnDefs = [
  { headerName: '客户编码', field: 'code', width: 150 },
  { headerName: '客户名称', field: 'name', width: 200 },
  { headerName: '客户简称', field: 'abbName', width: 150 },
  { headerName: '客户地址', field: 'address', width: 200, hideInSearch: true },
  { headerName: '联系电话', field: 'tel', width: 130, hideInSearch: true },
  { headerName: '供应商代码', field: 'vendorCode', width: 150, hideInSearch: true },
  { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true },
  { headerName: '备注', field: 'memo', flex: 1 }
];

const CustomersPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="客户信息"
      gridKey={getGridKey('customers')}
      apiConfig={{
        list: CustomerGetListAsync,
        delete: CustomerDeleteAsync,
        export: CustomerExportAsync,
        getImportTemplate: CustomerGetImportTemplateAsync
      }}
      permissions={{
        create: Customers.Create,
        update: Customers.Update,
        delete: Customers.Delete,
        import: Customers.Import,
        export: Customers.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: CustomerFormDialog,
        createTitle: '新建客户',
        editTitle: '编辑客户'
      }}
      importConfig={{
        title: '客户信息',
        downUrl: '/api/common/customers/import-template',
        uploadUrl: '/api/common/customers/import'
      }}
      exportFileName="customers.xlsx"
    />
  );
};

export default CustomersPage;

export const routeProps = {
  name: '客户信息',
};