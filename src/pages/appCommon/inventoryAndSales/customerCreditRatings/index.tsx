import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { CustomerCreditRatings } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { 
  CustomerCreditRatingGetListAsync,
  CustomerCreditRatingDeleteAsync,
  CustomerCreditRatingGetAsync,
  CustomerCreditRatingCreateAsync,
  CustomerCreditRatingUpdateAsync
} from '@/services/common/CustomerCreditRating';
import { formId, formSchema } from './components/schema';

/**
 * 信用评级管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

// 参数类别枚举
const typeEnum = [
  { label: "信誉额度控制", value: "10" },
  { label: "老王没给", value: "20" },
  { label: "预期天数控制", value: "30" }
];

// 处理方式枚举
const controlTypeEnum = [
  { label: "预警", value: "10" },
  { label: "严重预警", value: "20" },
  { label: "采取措施", value: "30" },
  { label: "停止做单送货", value: "40" }
];

// 使用外部schema创建表单对话框
const CustomerCreditRatingFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: CustomerCreditRatingGetAsync,
    create: CustomerCreditRatingCreateAsync,
    update: CustomerCreditRatingUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 800
  }
});

// 列定义
const columnDefs = [
  { headerName: '参数类别', field: 'type', width: 120, valueEnum: typeEnum },
  { headerName: '超额百分比', field: 'rating', width: 120, hideInSearch: true },
  { headerName: '处理方式', field: 'controlType', width: 130, valueEnum: controlTypeEnum },
  { headerName: '提示信息', field: 'prompt', flex: 1, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 160, hideInSearch: true, initialSort: 'desc' }
];

const CustomerCreditRatingPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="信用评级管理"
      gridKey="SmartErp.CustomerCreditRatings"
      apiConfig={{
        list: CustomerCreditRatingGetListAsync,
        delete: CustomerCreditRatingDeleteAsync
      }}
      permissions={{
        create: CustomerCreditRatings.Create,
        update: CustomerCreditRatings.Update,
        delete: CustomerCreditRatings.Delete,
        import: CustomerCreditRatings.Import,
        export: CustomerCreditRatings.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: CustomerCreditRatingFormDialog,
        createTitle: '新建信用评级',
        editTitle: '编辑信用评级'
      }}
      importConfig={{
        title: '信用评级',
        downUrl: '/api/smarterp/sales/customerCreditRating/list/import-template',
        uploadUrl: '/api/smarterp/sales/customerCreditRating/list/import'
      }}
      exportFileName="信用评级.xlsx"
    />
  );
};

export default CustomerCreditRatingPage;

export const routeProps = {
  name: '信用评级',
};