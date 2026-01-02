import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { 
  AttributeGetListAsync, 
  AttributeDeleteAsync, 
  AttributeExportAsync,
  AttributeGetImportTemplateAsync,
  AttributeGetAsync,
  AttributeCreateAsync,
  AttributeUpdateAsync
} from '@/services/common/Attribute';
import { Attributes } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { getGridKey } from '../../_utils';
import { formId, formSchema } from './components/schema';

/**
 * 特性管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

// 数据类型枚举
const dataTypeEnum = [
  { label: "文本", value: 0, color: '#1890ff' },
  { label: "数字", value: 1, color: '#52c41a' },
  { label: "日期", value: 2, color: '#722ed1' },
  { label: "布尔", value: 3, color: '#fa8c16' },
  { label: "枚举", value: 4, color: '#eb2f96' }
];

// 使用外部schema创建表单对话框
const AttributeFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: AttributeGetAsync,
    create: AttributeCreateAsync,
    update: AttributeUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 800
  }
});

// 列定义
const columnDefs = [
  { headerName: '特性名称', field: 'name', width: 150 },
  { headerName: '显示名称', field: 'displayName', width: 150 },
  { headerName: '数据类型', field: 'dataType', width: 100, valueEnum: dataTypeEnum, hideInSearch: true },
  { headerName: '单位', field: 'unit', width: 100, hideInSearch: true },
  { headerName: '描述', field: 'description', width: 200, hideInSearch: true },
  { headerName: '默认值', field: 'defaultValue', width: 120, hideInSearch: true },
  { headerName: '是否必填', field: 'isRequired', width: 100, hideInSearch: true },
  { headerName: '是否启用', field: 'isEnabled', width: 100, hideInSearch: true },
  { headerName: '排序顺序', field: 'sortOrder', width: 100, hideInSearch: true },
  { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true }
];

const AttributesPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="特性信息"
      gridKey={getGridKey('attributes')}
      apiConfig={{
        list: AttributeGetListAsync,
        delete: AttributeDeleteAsync,
        export: AttributeExportAsync,
        getImportTemplate: AttributeGetImportTemplateAsync
      }}
      permissions={{
        create: Attributes.Create,
        update: Attributes.Update,
        delete: Attributes.Delete,
        import: Attributes.Import,
        export: Attributes.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: AttributeFormDialog,
        createTitle: '新建特性',
        editTitle: '编辑特性'
      }}
      importConfig={{
        title: '特性信息',
        downUrl: '/api/common/attribute/import-template',
        uploadUrl: '/api/common/attribute/import'
      }}
      exportFileName="attributes.xlsx"
    />
  );
};

export default AttributesPage;

export const routeProps = {
    name: '特性信息',
};