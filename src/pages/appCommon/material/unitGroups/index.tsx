import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { 
  UnitGroupGetListAsync, 
  UnitGroupDeleteAsync, 
  UnitGroupExportAsync,
  UnitGroupGetImportTemplateAsync,
  UnitGroupGetAsync,
  UnitGroupCreateAsync,
  UnitGroupUpdateAsync
} from '@/services/common/UnitGroup';
import { UnitGroups } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { getGridKey } from '../../_utils';
import { formId, formSchema } from './components/schema';

/**
 * 单位组管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

const unitTypeEnum = [
  { label: "基本单位", value: 0, color: '#52c41a' },
  { label: "重量单位", value: 1, color: '#1890ff' },
  { label: "体积单位", value: 2, color: '#faad14' }
];

// 使用外部schema创建表单对话框
const UnitGroupFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: UnitGroupGetAsync,
    create: UnitGroupCreateAsync,
    update: UnitGroupUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 600
  }
});

// 列定义
const columnDefs = [
  { headerName: '单位组编码', field: 'code', width: 150 },
  { headerName: '单位组名称', field: 'name', width: 150 },
  { headerName: '单位类型', field: 'unitType', width: 120, valueEnum: unitTypeEnum },
  { headerName: '单位类型名称', field: 'unitTypeName', width: 150, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true }
];

const UnitGroupsPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="单位组"
      gridKey={getGridKey('unitGroups')}
      apiConfig={{
        list: UnitGroupGetListAsync,
        delete: UnitGroupDeleteAsync,
        export: UnitGroupExportAsync,
        getImportTemplate: UnitGroupGetImportTemplateAsync
      }}
      permissions={{
        create: UnitGroups.Create,
        update: UnitGroups.Update,
        delete: UnitGroups.Delete,
        import: UnitGroups.Import,
        export: UnitGroups.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: UnitGroupFormDialog,
        createTitle: '新建单位组',
        editTitle: '编辑单位组'
      }}
      importConfig={{
        title: '单位组信息',
        downUrl: '/api/common/unit-groups/import-template',
        uploadUrl: '/api/common/unit-groups/import'
      }}
      exportFileName="unitGroups.xlsx"
    />
  );
};

export default UnitGroupsPage;

export const routeProps = {
    name: '单位组',
};