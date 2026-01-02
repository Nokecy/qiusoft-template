import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { PaymentMethods } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { 
  PaymentMethodGetListAsync,
  PaymentMethodDeleteAsync,
  PaymentMethodGetAsync,
  PaymentMethodCreateAsync,
  PaymentMethodUpdateAsync
} from '@/services/common/PaymentMethod';
import { formId, formSchema } from './components/schema';

/**
 * 付款方式管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

const statusEnum = [
  { label: "启用", value: "Active", color: '#52c41a' },
  { label: "禁用", value: "Inactive", color: '#d9d9d9' }
];

// 使用外部schema创建表单对话框
const PaymentMethodFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: PaymentMethodGetAsync,
    create: PaymentMethodCreateAsync,
    update: PaymentMethodUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 800
  }
});

// 列定义
const columnDefs = [
  { headerName: '编码', field: 'code', width: 120 },
  { headerName: '名称', field: 'name', width: 150 },
  { headerName: '英文名称', field: 'nameEN', width: 180, hideInSearch: true },
  { headerName: '状态', field: 'status', width: 100, valueEnum: statusEnum },
  { headerName: '备注', field: 'memo', width: 200, hideInSearch: true },
  { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true }
];

const PaymentMethodsPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="付款方式"
      gridKey="Common.PaymentMethods"
      apiConfig={{
        list: PaymentMethodGetListAsync,
        delete: PaymentMethodDeleteAsync
      }}
      permissions={{
        create: PaymentMethods.Create,
        update: PaymentMethods.Update,
        delete: PaymentMethods.Delete,
        import: false,
        export: false
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: PaymentMethodFormDialog,
        createTitle: '新建付款方式',
        editTitle: '编辑付款方式'
      }}
    />
  );
};

export default PaymentMethodsPage;

export const routeProps = {
  name: '付款方式',
};