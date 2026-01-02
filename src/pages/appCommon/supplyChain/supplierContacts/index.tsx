import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { 
  PurSupplierContactGetListAsync as SupplierContactGetListAsync, 
  PurSupplierContactDeleteAsync as SupplierContactDeleteAsync, 
  PurSupplierContactExportAsync as SupplierContactExportAsync,
  PurSupplierContactGetImportTemplateAsync as SupplierContactGetImportTemplateAsync,
  PurSupplierContactGetAsync as SupplierContactGetAsync,
  PurSupplierContactCreateAsync as SupplierContactCreateAsync,
  PurSupplierContactUpdateAsync as SupplierContactUpdateAsync
} from '@/services/common/PurSupplierContact';
import { SupplierContacts } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { getGridKey } from '../../_utils';
import { formId, formSchema } from './components/schema';

/**
 * 供应商联系人管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

const sexEnum = [
  { label: "男", value: "Male", color: '#52c41a' },
  { label: "女", value: "Female", color: '#f759ab' }
];

const bloodEnum = [
  { label: "A型", value: "A", color: '#52c41a' },
  { label: "B型", value: "B", color: '#1890ff' },
  { label: "AB型", value: "AB", color: '#722ed1' },
  { label: "O型", value: "O", color: '#fa8c16' }
];

// 使用外部schema创建表单对话框
const SupplierContactFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: SupplierContactGetAsync,
    create: SupplierContactCreateAsync,
    update: SupplierContactUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 900
  }
});

// 列定义
const columnDefs = [
  { headerName: '联系人编码', field: 'code', width: 150 },
  { headerName: '联系人姓名', field: 'name', width: 120 },
  { headerName: '供应商ID', field: 'supplierId', width: 100, hideInSearch: true },
  { headerName: '供应商编码', field: 'supplierCode', width: 150, hideInSearch: true },
  { headerName: '性别', field: 'sex', width: 80, hideInSearch: true, valueEnum: sexEnum },
  { headerName: '生日', field: 'birthday', type: 'dateTimeColumn', width: 120, hideInSearch: true },
  { headerName: '血型', field: 'blood', width: 80, hideInSearch: true, valueEnum: bloodEnum },
  { headerName: '电话', field: 'tel', width: 130, hideInSearch: true },
  { headerName: '传真', field: 'fax', width: 120, hideInSearch: true },
  { headerName: '手机', field: 'mobile', width: 130 },
  { headerName: '邮箱', field: 'email', width: 150 },
  { headerName: '职务', field: 'duty', width: 120, hideInSearch: true },
  { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true },
  { headerName: '备注', field: 'memo', flex: 1 }
];

const SupplierContactsPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="供应商联系人"
      gridKey={getGridKey('supplierContacts')}
      apiConfig={{
        list: SupplierContactGetListAsync,
        delete: SupplierContactDeleteAsync,
        export: SupplierContactExportAsync,
        getImportTemplate: SupplierContactGetImportTemplateAsync
      }}
      permissions={{
        create: SupplierContacts.Create,
        update: SupplierContacts.Update,
        delete: SupplierContacts.Delete,
        import: SupplierContacts.Import,
        export: SupplierContacts.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: SupplierContactFormDialog,
        createTitle: '新建联系人',
        editTitle: '编辑联系人'
      }}
      importConfig={{
        title: '供应商联系人',
        downUrl: '/api/common/pur-supplier-contact/import-template',
        uploadUrl: '/api/common/pur-supplier-contact/import'
      }}
      exportFileName="supplierContacts.xlsx"
    />
  );
};

export default SupplierContactsPage;

export const routeProps = {
    name: '供应商联系人',
};