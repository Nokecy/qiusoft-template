import React from 'react';
import { Tag } from 'antd';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import {
  WorkShopGetListAsync,
  WorkShopDeleteAsync,
  WorkShopExportAsync,
  WorkShopGetImportTemplateAsync,
  WorkShopGetAsync,
  WorkShopCreateAsync,
  WorkShopUpdateAsync
} from '@/services/common/WorkShop';
import { WorkShops } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { getGridKey } from '../../_utils';
import { formId, formSchema } from './components/schema';

/**
 * 车间管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

// 使用外部schema创建表单对话框
const WorkShopFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: WorkShopGetAsync,
    create: WorkShopCreateAsync,
    update: WorkShopUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 800
  }
});

// 列定义
const columnDefs = [
  { headerName: '车间编码', field: 'code', width: 120 },
  { headerName: '车间名称', field: 'name', width: 150 },
  { headerName: '入库库房', field: 'warehouseCode', width: 120, hideInSearch: true },
  {
    headerName: '是否外协',
    field: 'isOut',
    width: 110,
    hideInSearch: true,
    cellRenderer: (params: any) => {
      const { value } = params;
      return value
        ? <Tag color="orange">外协</Tag>
        : <Tag color="blue">自制</Tag>;
    }
  },
  {
    headerName: '车间类型',
    field: 'workType',
    width: 120,
    hideInSearch: true,
    cellRenderer: (params: any) => {
      const { value } = params;
      if (!value) return '-';

      // 车间类型映射
      const typeMap: Record<string, { text: string; color: string }> = {
        '10': { text: '我司车间', color: 'blue' },
        '20': { text: '辅助部分', color: 'green' },
        '30': { text: '外协车间', color: 'orange' }
      };

      const typeInfo = typeMap[value] || { text: value, color: 'default' };
      return <Tag color={typeInfo.color}>{typeInfo.text}</Tag>;
    }
  },
  { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true },
  { headerName: '备注', field: 'memo', flex: 1 }
];

const WorkShopsPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="车间信息"
      gridKey={getGridKey('workShops')}
      apiConfig={{
        list: WorkShopGetListAsync,
        delete: WorkShopDeleteAsync,
        export: WorkShopExportAsync,
        getImportTemplate: WorkShopGetImportTemplateAsync
      }}
      permissions={{
        create: WorkShops.Create,
        update: WorkShops.Update,
        delete: WorkShops.Delete,
        import: WorkShops.Import,
        export: WorkShops.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: WorkShopFormDialog,
        createTitle: '新建车间',
        editTitle: '编辑车间'
      }}
      importConfig={{
        title: '车间信息',
        downUrl: '/api/common/workShops/import-template',
        uploadUrl: '/api/common/workShops/import'
      }}
      exportFileName="workShops.xlsx"
    />
  );
};

export default WorkShopsPage;

export const routeProps = {
    name: '车间信息',
};