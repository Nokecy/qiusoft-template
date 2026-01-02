import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import {
  DeliveryManGetListAsync,
  DeliveryManDeleteAsync,
  DeliveryManGetAsync,
  DeliveryManCreateAsync,
  DeliveryManUpdateAsync
} from '@/services/common/DeliveryMan';
import { formComponents } from 'umi';
import { formId, formSchema } from './components/schema';

/**
 * 送货员信息管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

// 性别枚举
const sexEnum = [
  { label: "男", value: "1" },
  { label: "女", value: "0" }
];

// 使用外部schema创建表单对话框
const DeliveryManFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: DeliveryManGetAsync,
    create: DeliveryManCreateAsync,
    update: DeliveryManUpdateAsync
  },
  customComponents: formComponents,
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

const DeliveryManPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="送货员信息管理"
      gridKey="SmartErp.DeliveryMen"
      apiConfig={{
        list: DeliveryManGetListAsync,
        delete: DeliveryManDeleteAsync
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
        component: DeliveryManFormDialog,
        createTitle: '新建送货员',
        editTitle: '编辑送货员'
      }}
      importConfig={{
        title: '送货员信息',
        downUrl: '/api/smarterp/sales/deliveryMan/list/import-template',
        uploadUrl: '/api/smarterp/sales/deliveryMan/list/import'
      }}
      exportFileName="送货员信息.xlsx"
    />
  );
};

export default DeliveryManPage;

export const routeProps = {
  name: '送货员信息',
};