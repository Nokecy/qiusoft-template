import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { 
  LocationGetListAsync, 
  LocationDeleteAsync, 
  LocationExportAsync,
  LocationGetImportTemplateAsync,
  LocationGetAsync,
  LocationCreateAsync,
  LocationUpdateAsync
} from '@/services/common/Location';
import { Locations } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { getGridKey } from '../../_utils';
import { formId, formSchema } from './components/schema';

/**
 * 库位管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

// 使用外部schema创建表单对话框
const LocationFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: LocationGetAsync,
    create: LocationCreateAsync,
    update: LocationUpdateAsync
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
  { headerName: '仓库ID', field: 'warehouseId', width: 100, hideInSearch: true },
  { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true },
  { headerName: '备注', field: 'remark', flex: 1 }
];

const LocationsPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="库位信息"
      gridKey={getGridKey('locations')}
      apiConfig={{
        list: LocationGetListAsync,
        delete: LocationDeleteAsync,
        export: LocationExportAsync,
        getImportTemplate: LocationGetImportTemplateAsync
      }}
      permissions={{
        create: Locations.Create,
        update: Locations.Update,
        delete: Locations.Delete,
        import: Locations.Import,
        export: Locations.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: LocationFormDialog,
        createTitle: '新建库位',
        editTitle: '编辑库位'
      }}
      importConfig={{
        title: '库位信息',
        downUrl: '/api/common/locations/import-template',
        uploadUrl: '/api/common/locations/import'
      }}
      exportFileName="locations.xlsx"
    />
  );
};

export default LocationsPage;

export const routeProps = {
  name: '库位信息',
};