import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { PriceClauses } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { 
  PriceClauseGetListAsync,
  PriceClauseDeleteAsync,
  PriceClauseExportAsync,
  PriceClauseGetImportTemplateAsync,
  PriceClauseGetAsync,
  PriceClauseCreateAsync,
  PriceClauseUpdateAsync
} from '@/services/common/PriceClause';
import { formId, formSchema } from './components/schema';

/**
 * 价格条款管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

const statusEnum = [
  { label: "启用", value: "Active", color: '#52c41a' },
  { label: "禁用", value: "Inactive", color: '#d9d9d9' }
];

// 使用外部schema创建表单对话框
const PriceClauseFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: PriceClauseGetAsync,
    create: PriceClauseCreateAsync,
    update: PriceClauseUpdateAsync
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

const PriceClausesPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="价格条款"
      gridKey="Common.PriceClauses"
      apiConfig={{
        list: PriceClauseGetListAsync,
        delete: PriceClauseDeleteAsync,
        export: PriceClauseExportAsync,
        getImportTemplate: PriceClauseGetImportTemplateAsync
      }}
      permissions={{
        create: PriceClauses.Create,
        update: PriceClauses.Update,
        delete: PriceClauses.Delete,
        import: PriceClauses.Import,
        export: PriceClauses.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: PriceClauseFormDialog,
        createTitle: '新建价格条款',
        editTitle: '编辑价格条款'
      }}
      importConfig={{
        title: '价格条款',
        downUrl: '/api/common/price-clauses/import-template',
        uploadUrl: '/api/common/price-clauses/import'
      }}
      exportFileName="price-clauses.xlsx"
    />
  );
};

export default PriceClausesPage;

export const routeProps = {
  name: '价格条款',
};