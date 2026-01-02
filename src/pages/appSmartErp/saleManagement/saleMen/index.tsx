import React from 'react';
import { GeneratedListPage } from '@/components/GeneratedListPage';
import { withStandardForm } from '@/components/StandardFormDialog';
import { 
  SaleManGetListAsync,
  SaleManDeleteAsync,
  SaleManGetAsync,
  SaleManCreateAsync,
  SaleManUpdateAsync
} from '@/services/smarterp/SaleMan';
import { formId, formSchema } from './components/schema';

/**
 * 销售员信息管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

// 性别枚举
const sexEnum = [
  { label: "男", value: "1" },
  { label: "女", value: "0" }
];

// 使用外部schema创建表单对话框
const SaleManFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: SaleManGetAsync,
    create: SaleManCreateAsync,
    update: SaleManUpdateAsync
  },
  defaultDialogConfig: {
    width: 900
  }
});

// 列定义
const columnDefs = [
  { headerName: '工号', field: 'workNo', width: 100 },
  { headerName: '编码', field: 'code', width: 100 },
  { headerName: '姓名', field: 'name', width: 100 },
  { headerName: '显示姓名', field: 'showName', width: 120 },
  { headerName: '职位', field: 'title', width: 120, hideInSearch: true },
  { headerName: '性别', field: 'sex', width: 80, valueEnum: sexEnum, hideInSearch: true },
  { headerName: '部门编码', field: 'departCode', width: 120 },
  { headerName: '分组', field: 'group', width: 120 },
  { headerName: '手机号', field: 'mobile', width: 130 },
  { headerName: '身份证号码', field: 'idCard', width: 150, hideInSearch: true },
  { headerName: '邮箱', field: 'email', width: 130, hideInSearch: true },
  { headerName: '电话', field: 'tel', width: 120, hideInSearch: true },
  { headerName: '传真', field: 'fax', width: 120, hideInSearch: true },
  { headerName: '联系地址', field: 'address', width: 150, hideInSearch: true },
  { headerName: '组织', field: 'orgCode', width: 120 },
  { headerName: '备注', field: 'memo', width: 150, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 160, hideInSearch: true, initialSort: 'desc' }
];

const SaleManPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="销售员信息管理"
      gridKey="SmartErp.SaleMen"
      apiConfig={{
        list: SaleManGetListAsync,
        delete: SaleManDeleteAsync
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
        component: SaleManFormDialog,
        createTitle: '新建销售员',
        editTitle: '编辑销售员'
      }}
      importConfig={{
        title: '销售员信息',
        downUrl: '/api/smarterp/sales/saleMan/list/import-template',
        uploadUrl: '/api/smarterp/sales/saleMan/list/import'
      }}
      exportFileName="销售员信息.xlsx"
    />
  );
};

export default SaleManPage;

export const routeProps = {
  name: '销售员信息',
};