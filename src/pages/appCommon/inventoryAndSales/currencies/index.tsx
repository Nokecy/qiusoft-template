import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { Currencies } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { 
  CurrencyGetListAsync,
  CurrencyDeleteAsync,
  CurrencyExportAsync,
  CurrencyGetImportTemplateAsync,
  CurrencyGetAsync,
  CurrencyCreateAsync,
  CurrencyUpdateAsync
} from '@/services/common/Currency';
import { formId, formSchema } from './components/schema';

/**
 * 货币管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

const statusEnum = [
  { label: "启用", value: "Active", color: '#52c41a' },
  { label: "禁用", value: "Inactive", color: '#d9d9d9' }
];

// 使用外部schema创建表单对话框
const CurrencyFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: CurrencyGetAsync,
    create: CurrencyCreateAsync,
    update: CurrencyUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 800
  }
});

// 列定义
const columnDefs = [
  { headerName: '货币代码', field: 'code', width: 120 },
  { headerName: '货币名称', field: 'name', width: 150 },
  { headerName: '英文名称', field: 'nameEN', width: 180, hideInSearch: true },
  { headerName: '汇率', field: 'rate', width: 120, hideInSearch: true },
  { headerName: '状态', field: 'status', width: 100, valueEnum: statusEnum },
  { headerName: '备注', field: 'memo', width: 200, hideInSearch: true },
  { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true }
];

const CurrenciesPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="货币管理"
      gridKey="Common.Currencies"
      apiConfig={{
        list: CurrencyGetListAsync,
        delete: CurrencyDeleteAsync,
        export: CurrencyExportAsync,
        getImportTemplate: CurrencyGetImportTemplateAsync
      }}
      permissions={{
        create: Currencies.Create,
        update: Currencies.Update,
        delete: Currencies.Delete,
        import: Currencies.Import,
        export: Currencies.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: CurrencyFormDialog,
        createTitle: '新建货币',
        editTitle: '编辑货币'
      }}
      importConfig={{
        title: '货币信息',
        downUrl: '/api/common/currencies/import-template',
        uploadUrl: '/api/common/currencies/import'
      }}
      exportFileName="currencies.xlsx"
    />
  );
};

export default CurrenciesPage;

export const routeProps = {
  name: '货币管理',
};