import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { 
  MaterialClassGetListAsync, 
  MaterialClassDeleteAsync, 
  MaterialClassExportAsync,
  MaterialClassGetImportTemplateAsync,
  MaterialClassGetAsync,
  MaterialClassCreateAsync,
  MaterialClassUpdateAsync
} from '@/services/common/MaterialClass';
import { MaterialClasses } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { getGridKey } from '../../_utils';
import { formId, formSchema } from './components/schema';

/**
 * 物料分类管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

// 使用外部schema创建表单对话框
const MaterialClassFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: MaterialClassGetAsync,
    create: MaterialClassCreateAsync,
    update: MaterialClassUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 800
  }
});

// 列定义 - 移除"分类名称"列,因为它会在树形分组列中显示
const columnDefs = [
  { headerName: '分类编码', field: 'code', width: 150 },
  { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true },
  { headerName: '备注', field: 'memo', flex: 1 }
];

const MaterialClassesPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="物料分类"
      gridKey={getGridKey('materialClasses')}
      apiConfig={{
        list: MaterialClassGetListAsync,
        delete: MaterialClassDeleteAsync,
        export: MaterialClassExportAsync,
        getImportTemplate: MaterialClassGetImportTemplateAsync
      }}
      permissions={{
        create: MaterialClasses.Create,
        update: MaterialClasses.Update,
        delete: MaterialClasses.Delete,
        import: MaterialClasses.Import,
        export: MaterialClasses.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: MaterialClassFormDialog,
        createTitle: '新建物料分类',
        editTitle: '编辑物料分类'
      }}
      importConfig={{
        title: '物料分类',
        downUrl: '/api/common/materialClasses/import-template',
        uploadUrl: '/api/common/materialClasses/import'
      }}
      exportFileName="materialClasses.xlsx"
      paginationConfig={{
        enabled: false  // 树形模式禁用分页,一次性加载所有数据
      }}
      treeConfig={{
        enabled: true,
        autoMode: true,  // 启用自动树形模式
        parentFieldName: 'parentId',
        keyFieldName: 'id',
        childrenFieldName: 'items',
        pathDisplayField: ['name', 'code'],  // 优先使用 name,其次 code
        autoGroupColumnDef: {
          headerName: '分类名称',
          field: 'name',
          width: 300,
          cellRendererParams: {
            suppressCount: true,  // 不显示子节点数量
          },
          pinned: 'left'
        },
        groupDefaultExpanded: -1  // -1 表示展开所有层级
      }}
    />
  );
};

export default MaterialClassesPage;

export const routeProps = {
    name: '物料分类',
};