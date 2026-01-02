import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import {
  CustomerDeliveryAddressGetListAsync,
  CustomerDeliveryAddressDeleteAsync,
  CustomerDeliveryAddressGetAsync,
  CustomerDeliveryAddressCreateAsync,
  CustomerDeliveryAddressUpdateAsync
} from '@/services/common/CustomerDeliveryAddress';
import { formComponents } from 'umi';
import { formId, formSchema, CustomerSelect } from './components/schema';

/**
 * 客户收货地址管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

const isDefaultEnum = [
  { label: "是", value: true, color: '#52c41a' },
  { label: "否", value: false, color: '#d9d9d9' }
];

// 使用外部schema创建表单对话框
const CustomerDeliveryAddressFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: CustomerDeliveryAddressGetAsync,
    create: CustomerDeliveryAddressCreateAsync,
    update: CustomerDeliveryAddressUpdateAsync
  },
  customComponents: {
    ...formComponents,
    CustomerSelect
  },
  defaultDialogConfig: {
    width: 800
  }
});

// 列定义
const columnDefs = [
  { headerName: '编码', field: 'code', width: 120 },
  { headerName: '客户编码', field: 'customerCode', width: 120 },
  { headerName: '客户名称', field: 'customerName', width: 160 },
  { headerName: '送货地址', field: 'address', width: 250 },
  { headerName: '联系人', field: 'contactPerson', width: 100, hideInSearch: true },
  { headerName: '联系电话', field: 'contactPhone', width: 120, hideInSearch: true },
  { headerName: '运费天数', field: 'freightDays', width: 100, hideInSearch: true },
  { headerName: '默认地址', field: 'isDefault', width: 100, valueEnum: isDefaultEnum, hideInSearch: true },
  { headerName: '备注', field: 'memo', width: 150, hideInSearch: true },
  { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true }
];

const CustomerDeliveryAddressesPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="客户收货地址"
      gridKey="SmartErp.CustomerDeliveryAddresses"
      apiConfig={{
        list: CustomerDeliveryAddressGetListAsync,
        delete: CustomerDeliveryAddressDeleteAsync,
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
        component: CustomerDeliveryAddressFormDialog,
        createTitle: '新建客户收货地址',
        editTitle: '编辑客户收货地址'
      }}
      importConfig={{
        title: '客户收货地址',
        downUrl: '/api/smarterp/customer-delivery-addresses/import-template',
        uploadUrl: '/api/smarterp/customer-delivery-addresses/import'
      }}
      exportFileName="customer-delivery-addresses.xlsx"
    />
  );
};

export default CustomerDeliveryAddressesPage;

export const routeProps = {
  name: '客户收货地址',
};