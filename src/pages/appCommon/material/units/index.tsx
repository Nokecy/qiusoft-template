import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { 
  UnitGetListAsync, 
  UnitDeleteAsync, 
  UnitExportAsync,
  UnitGetImportTemplateAsync,
  UnitGetAsync,
  UnitCreateAsync,
  UnitUpdateAsync
} from '@/services/common/Unit';
import { Units } from '@/pages/appCommon/_permissions';
import { formComponents } from "umi";
import { getGridKey } from '../../_utils';
import { formId, formSchema } from './components/schema';

/**
 * 单位管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

const exchangeFlagEnum = [
  { label: "乘以转换率", value: "0", color: '#52c41a' },
  { label: "除以转换率", value: "1", color: '#1890ff' }
];

// 使用外部schema创建表单对话框
const UnitFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: UnitGetAsync,
    create: UnitCreateAsync,
    update: UnitUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 800
  }
});

// 列定义
const columnDefs = [
  { headerName: '单位编码', field: 'code', width: 120 },
  { headerName: '单位名称', field: 'name', width: 120 },
  { headerName: '单位组主键', field: 'unitGroupId', width: 120, hideInSearch: true },
  { headerName: '单位组编码', field: 'unitGroupCode', width: 120, hideInSearch: true },
  { headerName: '单位组名称', field: 'unitGroupName', width: 120, hideInSearch: true },
  { headerName: '是否主单位', field: 'isMainUnit', width: 100, hideInSearch: true },
  { headerName: '转换率', field: 'exchangeRate', width: 100, hideInSearch: true },
  { headerName: '转换标志', field: 'exchangeFlag', width: 120, valueEnum: exchangeFlagEnum, hideInSearch: true },
  { headerName: '转换标志描述', field: 'exchangeFlagDescription', width: 150, hideInSearch: true },
  { headerName: '排序顺序', field: 'sortOrder', width: 100, hideInSearch: true },
  { headerName: '转换公式描述', field: 'conversionDescription', width: 200, hideInSearch: true },
  { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true }
];

const UnitsPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="单位信息"
      gridKey={getGridKey('units')}
      apiConfig={{
        list: UnitGetListAsync,
        delete: UnitDeleteAsync,
        export: UnitExportAsync,
        getImportTemplate: UnitGetImportTemplateAsync
      }}
      permissions={{
        create: Units.Create,
        update: Units.Update,
        delete: Units.Delete,
        import: Units.Import,
        export: Units.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: UnitFormDialog,
        createTitle: '新建单位',
        editTitle: '编辑单位'
      }}
      importConfig={{
        title: '单位信息',
        downUrl: '/api/common/units/import-template',
        uploadUrl: '/api/common/units/import'
      }}
      exportFileName="units.xlsx"
    />
  );
};

export default UnitsPage;

export const routeProps = {
    name: '单位信息',
};