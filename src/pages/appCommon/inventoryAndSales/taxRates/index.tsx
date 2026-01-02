import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { TaxRates } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { 
  TaxRateGetListAsync,
  TaxRateDeleteAsync,
  TaxRateExportAsync,
  TaxRateGetImportTemplateAsync,
  TaxRateGetAsync,
  TaxRateCreateAsync,
  TaxRateUpdateAsync
} from '@/services/common/TaxRate';
import { formId, formSchema } from './components/schema';

/**
 * 税率管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

const statusEnum = [
  { label: "启用", value: "Active", color: '#52c41a' },
  { label: "禁用", value: "Inactive", color: '#d9d9d9' }
];

// 使用外部schema创建表单对话框
const TaxRateFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: TaxRateGetAsync,
    create: TaxRateCreateAsync,
    update: TaxRateUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 800
  }
});

// 列定义
const columnDefs = [
  { headerName: '税率代码', field: 'code', width: 120 },
  { headerName: '税率名称', field: 'name', width: 150 },
  { headerName: '税率', field: 'rate', width: 100, hideInSearch: true },
  { headerName: '状态', field: 'status', width: 100, valueEnum: statusEnum },
  { headerName: '备注', field: 'memo', width: 200, hideInSearch: true },
  { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true }
];

const TaxRatesPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="税率管理"
      gridKey="Common.TaxRates"
      apiConfig={{
        list: TaxRateGetListAsync,
        delete: TaxRateDeleteAsync,
        export: TaxRateExportAsync,
        getImportTemplate: TaxRateGetImportTemplateAsync
      }}
      permissions={{
        create: TaxRates.Create,
        update: TaxRates.Update,
        delete: TaxRates.Delete,
        import: TaxRates.Import,
        export: TaxRates.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: TaxRateFormDialog,
        createTitle: '新建税率',
        editTitle: '编辑税率'
      }}
      importConfig={{
        title: '税率信息',
        downUrl: '/api/common/tax-rates/import-template',
        uploadUrl: '/api/common/tax-rates/import'
      }}
      exportFileName="tax-rates.xlsx"
    />
  );
};

export default TaxRatesPage;

export const routeProps = {
  name: '税率管理',
};