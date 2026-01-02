import React from 'react';
import { Button, Space } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { Access, useAccess } from '@@/plugin-access';
import { 
  AttributeGroupGetListAsync, 
  AttributeGroupDeleteAsync, 
  AttributeGroupExportAsync,
  AttributeGroupGetImportTemplateAsync,
  AttributeGroupGetAsync,
  AttributeGroupCreateAsync,
  AttributeGroupUpdateAsync
} from '@/services/common/AttributeGroup';
import { AttributeGroups } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { getGridKey } from '../../_utils';
import { formId, formSchema } from './components/schema';

/**
 * 特性组管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

// 使用外部schema创建表单对话框
const AttributeGroupFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: AttributeGroupGetAsync,
    create: AttributeGroupCreateAsync,
    update: AttributeGroupUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 800
  }
});

const AttributeGroupsPage: React.FC = () => {
  const access = useAccess();

  // 查看详情
  const handleViewDetail = (record: any) => {
    history.push(`/appCommon/material/attributeGroups/detail/${record.id}`);
  };

  // 列定义
  const columnDefs = [
    { headerName: '特性组编码', field: 'code', width: 150 },
    { headerName: '特性组名称', field: 'displayName', width: 200 },
    { headerName: '描述', field: 'description', width: 250, hideInSearch: true },
    { headerName: '排序顺序', field: 'sortOrder', width: 100, hideInSearch: true },
    { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
    { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
    { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
    { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true },
    {
      headerName: '操作',
      field: 'actions',
      width: 120,
      pinned: 'right',
      cellRenderer: (params: any) => {
        const record = params.data;
        return (
          <Space size="small">
            <Access accessible={!!access['ErpCommon.AttributeGroups']}>
              <Button
                type="link"
                size="small"
                icon={<EyeOutlined />}
                onClick={() => handleViewDetail(record)}
                style={{ padding: '0 4px' }}
              >
                详情
              </Button>
            </Access>
          </Space>
        );
      },
      suppressSorting: true,
      suppressFilter: true,
      hideInSearch: true
    }
  ];

  return (
    <GeneratedListPage
      title="特性组信息"
      gridKey={getGridKey('attributeGroups')}
      apiConfig={{
        list: AttributeGroupGetListAsync,
        delete: AttributeGroupDeleteAsync,
        export: AttributeGroupExportAsync,
        getImportTemplate: AttributeGroupGetImportTemplateAsync
      }}
      permissions={{
        create: AttributeGroups.Create,
        update: AttributeGroups.Update,
        delete: AttributeGroups.Delete,
        import: AttributeGroups.Import,
        export: AttributeGroups.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: AttributeGroupFormDialog,
        createTitle: '新建特性组',
        editTitle: '编辑特性组'
      }}
      importConfig={{
        title: '特性组信息',
        downUrl: '/api/common/attribute-group/import-template',
        uploadUrl: '/api/common/attribute-group/import'
      }}
      exportFileName="attribute-groups.xlsx"
    />
  );
};

export default AttributeGroupsPage;

export const routeProps = {
    name: '特性组信息',
};