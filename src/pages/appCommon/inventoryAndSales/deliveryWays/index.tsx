import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { DeliveryWays } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { 
  DeliveryWayGetListAsync,
  DeliveryWayDeleteAsync,
  DeliveryWayExportAsync,
  DeliveryWayGetImportTemplateAsync,
  DeliveryWayGetAsync,
  DeliveryWayCreateAsync,
  DeliveryWayUpdateAsync
} from '@/services/common/DeliveryWay';
import { formId, formSchema } from './components/schema';

/**
 * 交货方式管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

const statusEnum = [
  { label: "启用", value: "Active", color: '#52c41a' },
  { label: "禁用", value: "Inactive", color: '#d9d9d9' }
];

// 使用外部schema创建表单对话框
const DeliveryWayFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: DeliveryWayGetAsync,
    create: DeliveryWayCreateAsync,
    update: DeliveryWayUpdateAsync
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

const DeliveryWaysPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="交货方式"
      gridKey="Common.DeliveryWays"
      apiConfig={{
        list: DeliveryWayGetListAsync,
        delete: DeliveryWayDeleteAsync,
        export: DeliveryWayExportAsync,
        getImportTemplate: DeliveryWayGetImportTemplateAsync
      }}
      permissions={{
        create: DeliveryWays.Create,
        update: DeliveryWays.Update,
        delete: DeliveryWays.Delete,
        import: DeliveryWays.Import,
        export: DeliveryWays.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: DeliveryWayFormDialog,
        createTitle: '新建交货方式',
        editTitle: '编辑交货方式'
      }}
      importConfig={{
        title: '交货方式',
        downUrl: '/api/common/delivery-ways/import-template',
        uploadUrl: '/api/common/delivery-ways/import'
      }}
      exportFileName="delivery-ways.xlsx"
    />
  );
};

export default DeliveryWaysPage;

export const routeProps = {
  name: '交货方式',
};