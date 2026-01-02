import React from 'react';
import { GeneratedListPage } from '@/components/GeneratedListPage';
import { withStandardForm } from '@/components/StandardFormDialog';
import {
  CustomerConsignerGetListAsync,
  CustomerConsignerDeleteAsync,
  CustomerConsignerGetAsync,
  CustomerConsignerCreateAsync,
  CustomerConsignerUpdateAsync
} from '@/services/smarterp/CustomerConsigner';
import { formId, formSchema } from './components/schema';

/**
 * 跟单员信息管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

const sexEnum = [
  { label: "男", value: "1", color: '#1890ff' },
  { label: "女", value: "0", color: '#f50' }
];

// 使用外部schema创建表单对话框
const CustomerConsignerFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: CustomerConsignerGetAsync,
    create: CustomerConsignerCreateAsync,
    update: CustomerConsignerUpdateAsync
  },
  defaultDialogConfig: {
    width: 900
  }
});

// 列定义
const columnDefs = [
  { headerName: '工号', field: 'workNo', width: 100 },
  { headerName: '编码', field: 'code', width: 120 },
  { headerName: '姓名', field: 'name', width: 100 },
  { headerName: '显示姓名', field: 'showName', width: 120, hideInSearch: true },
  { headerName: '职位', field: 'title', width: 120, hideInSearch: true },
  { headerName: '性别', field: 'sex', width: 80, valueEnum: sexEnum, hideInSearch: true },
  { headerName: '部门编码', field: 'departCode', width: 120 },
  { headerName: '分组', field: 'group', width: 120, hideInSearch: true },
  { headerName: '手机号', field: 'mobile', width: 130 },
  { headerName: '身份证号', field: 'idCard', width: 150, hideInSearch: true },
  { headerName: '邮箱', field: 'email', width: 150, hideInSearch: true },
  { headerName: '电话', field: 'tel', width: 120, hideInSearch: true },
  { headerName: '传真', field: 'fax', width: 120, hideInSearch: true },
  { headerName: '联系地址', field: 'address', width: 180, hideInSearch: true },
  { headerName: '组织编码', field: 'orgCode', width: 120, hideInSearch: true },
  { headerName: '备注', field: 'memo', width: 150, hideInSearch: true },
  { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true }
];

const CustomerConsignersPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="跟单员信息"
      gridKey="SmartErp.CustomerConsigners"
      apiConfig={{
        list: CustomerConsignerGetListAsync,
        delete: CustomerConsignerDeleteAsync,
      }}
      permissions={{
        create: true,
        update: true,
        delete: true,
        import: true,
        export: true
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: CustomerConsignerFormDialog,
        createTitle: '新建跟单员',
        editTitle: '编辑跟单员'
      }}
      importConfig={{
        title: '跟单员信息',
        downUrl: '/api/smarterp/customer-consigners/import-template',
        uploadUrl: '/api/smarterp/customer-consigners/import'
      }}
      exportFileName="customer-consigners.xlsx"
    />
  );
};

export default CustomerConsignersPage;

export const routeProps = {
  name: '跟单员信息',
};