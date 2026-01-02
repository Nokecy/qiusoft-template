import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { 
  CustomerContactGetListAsync, 
  CustomerContactDeleteAsync, 
  CustomerContactExportAsync,
  CustomerContactGetImportTemplateAsync,
  CustomerContactGetAsync,
  CustomerContactCreateAsync,
  CustomerContactUpdateAsync
} from '@/services/common/CustomerContact';
import { CustomerContacts } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { getGridKey } from '../../_utils';
import { formId, formSchema } from './components/schema';

/**
 * 客户联系人管理页面
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

const statusEnum = [
  { label: "激活", value: "Active", color: '#52c41a' },
  { label: "禁用", value: "Inactive", color: '#d9d9d9' }
];

// 使用外部schema创建表单对话框
const CustomerContactFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: CustomerContactGetAsync,
    create: CustomerContactCreateAsync,
    update: CustomerContactUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 900
  }
});

// 列定义
const columnDefs = [
  { headerName: '联系人编码', field: 'code', width: 150 },
  { headerName: '客户ID', field: 'customerId', width: 100, hideInSearch: true },
  { headerName: '客户编码', field: 'customerCode', width: 150, hideInSearch: true },
  { headerName: 'DT编码', field: 'dtId', width: 120, hideInSearch: true },
  { headerName: '联系人姓名', field: 'contactName', width: 120 },
  { headerName: '性别', field: 'sex', width: 80, hideInSearch: true, valueEnum: sexEnum },
  { headerName: '生日', field: 'birthday', type: 'dateTimeColumn', width: 120, hideInSearch: true },
  { headerName: '血型', field: 'blood', width: 80, hideInSearch: true, valueEnum: bloodEnum },
  { headerName: '电话', field: 'tel', width: 130, hideInSearch: true },
  { headerName: '传真', field: 'fax', width: 120, hideInSearch: true },
  { headerName: '手机', field: 'mobile', width: 130 },
  { headerName: '邮箱', field: 'email', width: 150 },
  { headerName: '状态', field: 'status', width: 100, hideInSearch: true, valueEnum: statusEnum },
  { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true },
  { headerName: '备注', field: 'memo', flex: 1 }
];

const CustomerContactsPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="客户联系人"
      gridKey={getGridKey('customerContacts')}
      apiConfig={{
        list: CustomerContactGetListAsync,
        delete: CustomerContactDeleteAsync,
        export: CustomerContactExportAsync,
        getImportTemplate: CustomerContactGetImportTemplateAsync
      }}
      permissions={{
        create: CustomerContacts.Create,
        update: CustomerContacts.Update,
        delete: CustomerContacts.Delete,
        import: CustomerContacts.Import,
        export: CustomerContacts.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: CustomerContactFormDialog,
        createTitle: '新建联系人',
        editTitle: '编辑联系人'
      }}
      importConfig={{
        title: '客户联系人',
        downUrl: '/api/common/customer-contacts/import-template',
        uploadUrl: '/api/common/customer-contacts/import'
      }}
      exportFileName="customerContacts.xlsx"
    />
  );
};

export default CustomerContactsPage;

export const routeProps = {
    name: '客户联系人',
};