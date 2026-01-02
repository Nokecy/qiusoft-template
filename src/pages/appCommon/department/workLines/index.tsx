import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { 
  WorkLineGetListAsync, 
  WorkLineDeleteAsync, 
  WorkLineExportAsync,
  WorkLineGetImportTemplateAsync,
  WorkLineGetAsync,
  WorkLineCreateAsync,
  WorkLineUpdateAsync
} from '@/services/common/WorkLine';
import { WorkLines } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { getGridKey } from '../../_utils';
import { formId, formSchema } from './components/schema';

/**
 * 工作线体管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

// 使用外部schema创建表单对话框
const WorkLineFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: WorkLineGetAsync,
    create: WorkLineCreateAsync,
    update: WorkLineUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 800
  }
});

// 列定义
const columnDefs = [
  { headerName: '线体编码', field: 'code', width: 120 },
  { headerName: '线体名称', field: 'name', width: 150 },
  { headerName: '车间编码', field: 'workCode', width: 120, hideInSearch: true },
  { headerName: '车间名称', field: 'workName', width: 120, hideInSearch: true },
  { headerName: '班组编码', field: 'workTeamCode', width: 120, hideInSearch: true },
  { headerName: '班组名称', field: 'workTeamName', width: 120, hideInSearch: true },
  { headerName: '开始时间', field: 'startTime', type: 'dateTimeColumn', width: 140, hideInSearch: true },
  { headerName: '结束时间', field: 'endTime', type: 'dateTimeColumn', width: 140, hideInSearch: true },
  { headerName: '工位数量', field: 'stationNum', width: 100, hideInSearch: true },
  { headerName: '人员数量', field: 'employNum', width: 100, hideInSearch: true },
  { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true },
  { headerName: '备注', field: 'memo', flex: 1 }
];

const WorkLinesPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="工作线体"
      gridKey={getGridKey('workLines')}
      apiConfig={{
        list: WorkLineGetListAsync,
        delete: WorkLineDeleteAsync,
        export: WorkLineExportAsync,
        getImportTemplate: WorkLineGetImportTemplateAsync
      }}
      permissions={{
        create: WorkLines.Create,
        update: WorkLines.Update,
        delete: WorkLines.Delete,
        import: WorkLines.Import,
        export: WorkLines.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: WorkLineFormDialog,
        createTitle: '新建工作线体',
        editTitle: '编辑工作线体'
      }}
      importConfig={{
        title: '工作线体信息',
        downUrl: '/api/common/work-lines/import-template',
        uploadUrl: '/api/common/work-lines/import'
      }}
      exportFileName="workLines.xlsx"
    />
  );
};

export default WorkLinesPage;

export const routeProps = {
    name: '工作线体',
};