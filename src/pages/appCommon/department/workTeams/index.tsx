import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { 
  WorkTeamGetListAsync, 
  WorkTeamDeleteAsync, 
  WorkTeamExportAsync,
  WorkTeamGetImportTemplateAsync,
  WorkTeamGetAsync,
  WorkTeamCreateAsync,
  WorkTeamUpdateAsync
} from '@/services/common/WorkTeam';
import { WorkTeams } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { getGridKey } from '../../_utils';
import { formId, formSchema } from './components/schema';

/**
 * 班组管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

// 使用外部schema创建表单对话框
const WorkTeamFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: WorkTeamGetAsync,
    create: WorkTeamCreateAsync,
    update: WorkTeamUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 800
  }
});

// 列定义
const columnDefs = [
  { headerName: '班组编码', field: 'code', width: 150 },
  { headerName: '班组名称', field: 'name', width: 150 },
  { headerName: '工作中心编码', field: 'workCenterCode', width: 150, hideInSearch: true },
  { headerName: '组长编码', field: 'teamLeadCode', width: 120, hideInSearch: true },
  { headerName: '组长姓名', field: 'teamLeadName', width: 120, hideInSearch: true },
  { headerName: '联系方式', field: 'leadTel', width: 120, hideInSearch: true },
  { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true },
  { headerName: '备注', field: 'memo', flex: 1 }
];

const WorkTeamsPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="班组信息"
      gridKey={getGridKey('workTeams')}
      apiConfig={{
        list: WorkTeamGetListAsync,
        delete: WorkTeamDeleteAsync,
        export: WorkTeamExportAsync,
        getImportTemplate: WorkTeamGetImportTemplateAsync
      }}
      permissions={{
        create: WorkTeams.Create,
        update: WorkTeams.Update,
        delete: WorkTeams.Delete,
        import: WorkTeams.Import,
        export: WorkTeams.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: WorkTeamFormDialog,
        createTitle: '新建班组',
        editTitle: '编辑班组'
      }}
      importConfig={{
        title: '班组信息',
        downUrl: '/api/common/work-teams/import-template',
        uploadUrl: '/api/common/work-teams/import'
      }}
      exportFileName="workTeams.xlsx"
    />
  );
};

export default WorkTeamsPage;

export const routeProps = {
    name: '班组信息',
};