#!/usr/bin/env node

/**
 * PDM 项目管理页面批量生成脚本
 * 用法: node scripts/generate-pdm-pages.js
 */

const fs = require('fs');
const path = require('path');

// 页面配置
const pageConfigs = [
  {
    name: 'ProjectRole',
    title: '项目角色',
    apiPath: 'ProjectRole',
    codeField: 'roleCode',
    nameField: 'roleName',
    codeLabel: '角色编码',
    nameLabel: '角色名称',
  },
  {
    name: 'IssueType',
    title: '问题类型',
    apiPath: 'IssueType',
    codeField: 'typeCode',
    nameField: 'typeName',
    codeLabel: '类型编码',
    nameLabel: '类型名称',
  },
  {
    name: 'RiskType',
    title: '风险类型',
    apiPath: 'RiskType',
    codeField: 'typeCode',
    nameField: 'typeName',
    codeLabel: '类型编码',
    nameLabel: '类型名称',
  },
];

// Schema 模板
const schemaTemplate = (config) => `import { ISchema } from '@formily/react';

export const formId: string = 'Pdm.${config.name}';

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: 'none',
};

export const formSchema: { form: Record<string, any>; schema: ISchema } = {
  form: {
    labelCol: 6,
    wrapperCol: 12,
    labelWidth: '80px',
    feedbackLayout: 'none',
  },
  schema: {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': { maxColumns: 2, strictAutoFit: true },
        properties: {
          col1: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              ${config.codeField}: {
                type: 'string',
                title: '${config.codeLabel}',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入${config.codeLabel}' },
                required: true,
                name: '${config.codeField}',
              },
            },
          },
          col2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              ${config.nameField}: {
                type: 'string',
                title: '${config.nameLabel}',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入${config.nameLabel}' },
                required: true,
                name: '${config.nameField}',
              },
            },
          },
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              sortOrder: {
                type: 'number',
                title: '排序',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
                'x-component-props': { placeholder: '请输入排序值', min: 0, precision: 0 },
                name: 'sortOrder',
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              description: {
                type: 'string',
                title: '描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入描述',
                  rows: 3
                },
                name: 'description',
              },
            },
          },
        },
      },
    },
  },
};
`;

// FormDialog 模板
const formDialogTemplate = (config) => `import { ${config.apiPath}CreateAsync, ${config.apiPath}UpdateAsync, ${config.apiPath}GetAsync } from '@/services/pdm/${config.apiPath}';
import { FormDialog } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from 'antd';
import React from 'react';
import { formId, formSchema } from './schema';
import { useFormSchema, useSchemaField } from 'umi';
import FormLayoutMode from '@/pages/_utils/editMode';

const ${config.name}FormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit } = props;

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField();

  const formProps = {
    effects: () => {
      onFormInit(form => {
        if (entityId) {
          ${config.apiPath}GetAsync({ id: entityId }).then(res => {
            form.setInitialValues(res);
          });
        }
      });
    },
  };

  const portalId = \`Pdm.ProjectManagement.${config.name}.\${entityId || 'new'}\`;
  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type={'primary'}
        onClick={() => {
          const formDialog = FormDialog({ title: title, width: 720 }, portalId, () => {
            return (
              <>
                <FormLayoutMode formId={formId} {...schema.form} editClickAfter={() => formDialog.close()}>
                  <SchemaField schema={schema.schema} />
                </FormLayoutMode>
              </>
            );
          });

          formDialog
            .forConfirm((payload, next) => {
              const values: any = payload.values;
              if (!values.id) {
                return ${config.apiPath}CreateAsync(values)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => {
                    next(payload);
                  });
              } else {
                return ${config.apiPath}UpdateAsync({ id: values.id }, values)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => {
                    next(payload);
                  });
              }
            })
            .open(formProps);
        }}
        {...buttonProps}
      >
        {props.children}
      </Button>
    </FormDialog.Portal>
  );
};

export default ${config.name}FormDialog;
`;

// Index 页面模板
const indexTemplate = (config) => `import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { ${config.apiPath}GetListAsync, ${config.apiPath}DeleteAsync } from '@/services/pdm/${config.apiPath}';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import ${config.name}FormDialog from './components/${config.name}FormDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { ${config.name}Permissions } from '@/pages/appPdm/_permissions';

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();

  const canUpdate = !!(access && access[${config.name}Permissions.Update]);
  const canDelete = !!(access && access[${config.name}Permissions.Delete]);

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return ${config.apiPath}DeleteAsync({ id }).then(() => onRefresh()).finally(() => hide());
  };

  return (
    <Space>
      <Access accessible={canUpdate}>
        <${config.name}FormDialog
          title={'编辑${config.title}'}
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

const ${config.name}Page: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = !!(access && access[${config.name}Permissions.Create]);

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle={'${config.title}'}
      gridKey="appPdm.ProjectManagement.${config.name}"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await ${config.apiPath}GetListAsync(
          {
            Filter: params?.filter,
            SkipCount: params?.skipCount,
            MaxResultCount: params?.maxResultCount,
            Sorting: params?.sorter,
          } as any,
        );
        return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
      }}
      rowSelection={'multiple'}
      rowMultiSelectWithClick={true}
      toolBarRender={() => {
        return [
          <Access accessible={canCreate}>
            <${config.name}FormDialog title={'新建${config.title}'} onAfterSubmit={onRefresh}>
              <PlusOutlined /> 新建
            </${config.name}FormDialog>
          </Access>,
        ];
      }}
    >
      <AgGridColumn field={'${config.codeField}'} headerName={'${config.codeLabel}'} width={180} />
      <AgGridColumn field={'${config.nameField}'} headerName={'${config.nameLabel}'} width={220} />
      <AgGridColumn field={'sortOrder'} headerName={'排序'} width={100} hideInSearch={true} />
      <AgGridColumn field={'description'} headerName={'描述'} width={260} hideInSearch={true} />
      <AgGridColumn
        field={'action'}
        headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
        width={120}
        pinned={'right'}
        filter={false}
        sortable={false}
        cellRenderer={Options}
        cellRendererParams={{ onRefresh }}
      />
    </AgGridPlus>
  );
};

export default ${config.name}Page;

export const routeProps = {
  name: '${config.title}管理',
};
`;

// 生成页面文件
function generatePage(config) {
  const basePath = path.join(__dirname, '../src/pages/appPdm/ProjectManagement', config.name);
  const componentsPath = path.join(basePath, 'components');

  // 创建目录
  if (!fs.existsSync(componentsPath)) {
    fs.mkdirSync(componentsPath, { recursive: true });
  }

  // 生成文件
  fs.writeFileSync(path.join(componentsPath, 'schema.ts'), schemaTemplate(config));
  fs.writeFileSync(path.join(componentsPath, `${config.name}FormDialog.tsx`), formDialogTemplate(config));
  fs.writeFileSync(path.join(basePath, 'index.tsx'), indexTemplate(config));

  console.log(`✅ 已生成 ${config.title} 页面`);
}

// 批量生成
console.log('🚀 开始批量生成 PDM 项目管理页面...\n');
pageConfigs.forEach(generatePage);
console.log('\n✨ 所有页面生成完成！');
console.log('\n📝 下一步:');
console.log('  1. 运行 yarn start 启动开发服务器');
console.log('  2. 访问对应页面测试功能');
console.log('  3. 根据实际 API 响应调整字段');
