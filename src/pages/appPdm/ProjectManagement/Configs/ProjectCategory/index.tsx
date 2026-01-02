import { AgGridPlus } from '@/components/agGrid';
import { ProjectCategoryGetTreeAsync, ProjectCategoryDeleteAsync } from '@/services/pdm/ProjectCategory';
import { DeleteOutlined, EditOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import ProjectCategoryFormDialog from './components/ProjectCategoryFormDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { ProjectCategoryPermissions } from '@/pages/appPdm/_permissions';
import { flattenTreeDeep } from '@nokecy/qc-ui';
import { downloadBlob } from '@/_utils';
import ImportPublic from '@/components/importPublic';

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();

  const canUpdate = !!(access && access[ProjectCategoryPermissions.Update]);
  const canDelete = !!(access && access[ProjectCategoryPermissions.Delete]);

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return ProjectCategoryDeleteAsync({ id }).then(() => onRefresh()).finally(() => hide());
  };

  return (
    <Space>
      <Access accessible={canUpdate}>
        <ProjectCategoryFormDialog
          title={'编辑项目类型'}
          entityId={data.id}
          onAfterSubmit={onRefresh}
          buttonProps={{ icon: <EditOutlined />, type: 'link', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
        />
      </Access>

      <Access accessible={canDelete}>
        <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
          <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
        </DeleteConfirm>
      </Access>
    </Space>
  );
};

const ProjectCategoryPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = !!(access && access[ProjectCategoryPermissions.Create]);
  const canImport = !!(access && access[ProjectCategoryPermissions.Import]);
  const canExport = !!(access && access[ProjectCategoryPermissions.Export]);

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  // 业务字段列定义
  const businessColumns = [
    { headerName: '分类编码', field: 'code', width: 150 },
    { headerName: '分类名称', field: 'name', width: 200 },
    { headerName: '父级编码', field: 'parentCode', width: 150, hideInSearch: true },
    { headerName: '备注', field: 'remark', width: 200, hideInSearch: true, flex: 1 },
  ];

  // 操作列定义
  const operationColumn = {
    headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
    field: 'action',
    width: 120,
    pinned: 'right',
    filter: false,
    sortable: false,
    cellRenderer: Options,
    cellRendererParams: { onRefresh },
  };

  // 完整的列定义（业务字段 + 操作列）
  const columnDefs = [...businessColumns, operationColumn];

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle={'项目类型'}
      gridKey="appPdm.ProjectManagement.ProjectCategory"
      treeData={true}
      getDataPath={(data: any) => {
        return data.hierarchy;
      }}
      treeParentName={'parentId'}
      treeKeyName={'id'}
      autoGroupColumnDef={{
        headerName: '分类编码',
        field: 'code',
        minWidth: 200,
        cellRenderer: 'agGroupCellRenderer',
      }}
      groupDefaultExpanded={-1}
      request={async (params: any) => {
        try {
          // 使用专门的树形数据接口，支持动态查询
          const treeData = await ProjectCategoryGetTreeAsync({
            Filter: params?.filter,
            Sorting: params?.sorter,
          });

          // 使用 flattenTreeDeep 工具函数处理树形数据，使用 'children' 字段
          const flatData = flattenTreeDeep(treeData || [], 'children');

          return {
            success: true,
            data: flatData,
            total: flatData.length,
          };
        } catch (error) {
          console.error('获取项目分类失败:', error);
          return {
            success: false,
            data: [],
            total: 0,
          };
        }
      }}
      toolBarRender={(gridApi, filter) => {
        return [
          <Access key="create" accessible={canCreate}>
            <ProjectCategoryFormDialog title={'新建项目类型'} onAfterSubmit={onRefresh} buttonProps={{ icon: <PlusOutlined />, type: 'primary' }}>
              新建
            </ProjectCategoryFormDialog>
          </Access>,
          <Access key="import" accessible={canImport}>
            <ImportPublic onAfterSubmit={onRefresh} title="项目类型" downUrl="/api/pdm/project-category/import-template" uploadUrl="/api/pdm/project-category/import" />
          </Access>,
          <Access key="export" accessible={canExport}>
            <Button
              icon={<DownOutlined />}
              onClick={() => {
                downloadBlob(`/api/pdm/project-category/export?filter=${filter}&MaxResultCount=1000`, '项目类型.xlsx');
              }}
            >
              导出
            </Button>
          </Access>,
        ];
      }}
      columnDefs={columnDefs}
    />
  );
};

export default ProjectCategoryPage;

export const routeProps = {
  name: '项目类型管理',
};
