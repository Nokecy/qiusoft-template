import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { 
  DepartmentGetListAsync, 
  DepartmentDeleteAsync, 
  DepartmentExportAsync,
  DepartmentGetImportTemplateAsync,
  DepartmentGetAsync,
  DepartmentCreateAsync,
  DepartmentUpdateAsync
} from '@/services/common/Department';
import { Departments } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { getGridKey } from '../../_utils';
import { formId, formSchema } from './components/schema';

/**
 * 部门管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

// 使用外部schema创建表单对话框
const DepartmentFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: DepartmentGetAsync,
    create: DepartmentCreateAsync,
    update: DepartmentUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 800
  }
});

// 列定义
const columnDefs = [
  { headerName: '编码', field: 'code', width: 150 },
  { headerName: '名称', field: 'name', width: 200 },
  { headerName: '地址', field: 'address', width: 300, hideInSearch: true },
  { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true }
];

const DepartmentsPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="部门信息"
      gridKey={getGridKey('departments')}
      apiConfig={{
        list: DepartmentGetListAsync,
        delete: DepartmentDeleteAsync,
        export: DepartmentExportAsync,
        getImportTemplate: DepartmentGetImportTemplateAsync
      }}
      permissions={{
        create: Departments.Create,
        update: Departments.Update,
        delete: Departments.Delete,
        import: Departments.Import,
        export: Departments.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: DepartmentFormDialog,
        createTitle: '新建部门',
        editTitle: '编辑部门'
      }}
      importConfig={{
        title: '部门信息',
        downUrl: '/api/common/departments/import-template',
        uploadUrl: '/api/common/departments/import'
      }}
      exportFileName="departments.xlsx"
    />
  );
};

export default DepartmentsPage;

export const routeProps = {
    name: '部门信息',
};