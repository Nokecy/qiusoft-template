/**
 * 项目管理相关的动态表单 Schema
 *
 * 包含的场景:
 * - project:create-edit - 项目创建/编辑表单
 */
import type { DynamicSchemaDefinition } from '../types';

/**
 * 项目创建/编辑表单
 *
 * scenarioKey: project:create-edit
 * 用途: 项目的创建和编辑
 *
 * 字段说明:
 * - projectCode: 项目编码 (必填)
 * - projectName: 项目名称 (必填)
 * - shortName: 项目简称
 * - projectCategoryCode: 项目分类编码 (必填)
 * - priority: 优先级 (必填)
 * - category: 项目类别 (必填)
 * - materialCode: 关联物料编码 (必填)
 * - materialName: 关联物料名称
 * - templateCode: 项目模板 (必填)
 * - projectManagerId: 项目经理ID (必填)
 * - projectManagerName: 项目经理姓名 (必填)
 * - projectCycle: 项目周期(天)
 * - plannedStartDate: 计划开始日期 (必填)
 * - plannedEndDate: 计划结束日期 (必填)
 * - description: 项目描述
 * - objectives: 项目目标
 * - scope: 项目范围
 * - remarks: 备注
 */
const projectCreateEditForm: DynamicSchemaDefinition = {
  scenarioKey: 'project:create-edit',
  label: '项目创建/编辑',
  description: '项目基本信息录入与编辑表单',
  form: {
    labelCol: 6,
    wrapperCol: 12,
    labelWidth: '100px',
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
          projectCode: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              projectCode: {
                type: 'string',
                title: '项目编码',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入项目编码' },
                required: true,
              },
            },
          },
          projectName: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              projectName: {
                type: 'string',
                title: '项目名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入项目名称' },
                required: true,
              },
            },
          },
          shortName: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              shortName: {
                type: 'string',
                title: '项目简称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入项目简称' },
              },
            },
          },
          projectCategoryCode: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              projectCategoryCode: {
                type: 'string',
                title: '项目分类编码',
                'x-decorator': 'FormItem',
                'x-component': 'ProjectCategorySelect',
                'x-component-props': { placeholder: '请选择项目分类' },
                required: true,
              },
            },
          },
          priority: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              priority: {
                type: 'number',
                title: '优先级',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  placeholder: '请选择优先级',
                  options: [
                    { label: '低', value: 0 },
                    { label: '中', value: 1 },
                    { label: '高', value: 2 },
                    { label: '紧急', value: 3 },
                  ],
                },
                required: true,
              },
            },
          },
          category: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              category: {
                type: 'number',
                title: '项目类别',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  placeholder: '请选择项目类别',
                  options: [
                    { label: '研发项目', value: 0 },
                    { label: '生产项目', value: 1 },
                    { label: '维护项目', value: 2 },
                    { label: '改进项目', value: 3 },
                    { label: '其他项目', value: 4 },
                  ],
                },
                required: true,
              },
            },
          },
          materialCode: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              materialCode: {
                type: 'string',
                title: '关联物料编码',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入关联物料编码' },
                required: true,
              },
            },
          },
          materialName: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              materialName: {
                type: 'string',
                title: '关联物料名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入关联物料名称' },
              },
            },
          },
          templateCode: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              templateCode: {
                type: 'string',
                title: '项目模板',
                'x-decorator': 'FormItem',
                'x-component': 'ProjectTemplateSelector',
                'x-component-props': { placeholder: '请选择项目模板' },
                required: true,
              },
            },
          },
          projectManagerId: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              projectManagerId: {
                type: 'string',
                title: '项目经理ID',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入项目经理ID' },
                required: true,
              },
            },
          },
          projectManagerName: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              projectManagerName: {
                type: 'string',
                title: '项目经理姓名',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入项目经理姓名' },
                required: true,
              },
            },
          },
          projectCycle: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              projectCycle: {
                type: 'number',
                title: '项目周期(天)',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
                'x-component-props': { placeholder: '请输入项目周期', min: 0, precision: 0 },
              },
            },
          },
          plannedStartDate: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              plannedStartDate: {
                type: 'string',
                title: '计划开始日期',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': { placeholder: '请选择计划开始日期', style: { width: '100%' } },
                required: true,
              },
            },
          },
          plannedEndDate: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              plannedEndDate: {
                type: 'string',
                title: '计划结束日期',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': { placeholder: '请选择计划结束日期', style: { width: '100%' } },
                required: true,
              },
            },
          },
          description: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              description: {
                type: 'string',
                title: '项目描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入项目描述',
                  rows: 3,
                },
              },
            },
          },
          objectives: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              objectives: {
                type: 'string',
                title: '项目目标',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入项目目标',
                  rows: 3,
                },
              },
            },
          },
          scope: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              scope: {
                type: 'string',
                title: '项目范围',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入项目范围',
                  rows: 3,
                },
              },
            },
          },
          remarks: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              remarks: {
                type: 'string',
                title: '备注',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入备注',
                  rows: 2,
                },
              },
            },
          },
        },
      },
    },
  },
};

/**
 * 导出所有项目相关的 Schema 定义
 */
export const schemas: DynamicSchemaDefinition[] = [
  projectCreateEditForm,
];
