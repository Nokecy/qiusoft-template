/**
 * BomManagement 模块动态表单 Schema
 *
 * 包含 BOM 管理相关的表单定义：
 * - bom:create - BOM 新建表单
 * - bom:edit - BOM 编辑表单
 * - bom:dialog - BOM 对话框表单
 */
import type { DynamicSchemaDefinition } from '@/dynamicSchemas/types';

/**
 * BOM 新建/编辑表单 (BomForm.tsx 使用)
 */
const bomCreateForm: DynamicSchemaDefinition = {
  scenarioKey: 'bom:create',
  label: 'BOM 新建表单',
  description: 'BOM 物料清单新建表单',
  form: {
    labelWidth: '100px',
    feedbackLayout: 'none',
  },
  schema: {
    type: 'object',
    properties: {
      materialCode: {
        type: 'string',
        title: '物料编码',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '请输入物料编码',
        },
        'x-validator': [
          { required: true, message: '请输入物料编码' },
          { pattern: /^[A-Z0-9]+$/, message: '只能包含大写字母和数字' },
        ],
      },
      materialName: {
        type: 'string',
        title: '物料名称',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '请输入物料名称',
        },
        'x-validator': [{ required: true, message: '请输入物料名称' }],
      },
      materialDescription: {
        type: 'string',
        title: '物料描述',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          rows: 3,
          placeholder: '请输入物料描述',
        },
      },
      topMaterialCode: {
        type: 'string',
        title: '顶层物料',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '默认为自身',
        },
      },
      '{value:engineerCode,label:engineerName}': {
        type: 'string',
        title: '负责工程师',
        'x-decorator': 'FormItem',
        'x-component': 'UserSelect',
        'x-component-props': {
          labelInValue: true,
          placeholder: '请选择工程师',
        },
        'x-validator': [{ required: true, message: '请选择工程师' }],
      },
      status: {
        type: 'number',
        title: '状态',
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        'x-component-props': {
          options: [
            { label: '草稿', value: 0 },
            { label: '激活', value: 5 },
          ],
        },
        default: 0,
      },
      remark: {
        type: 'string',
        title: '备注',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          rows: 2,
          placeholder: '请输入备注信息',
        },
      },
    },
  },
};

/**
 * BOM 编辑表单
 */
const bomEditForm: DynamicSchemaDefinition = {
  scenarioKey: 'bom:edit',
  label: 'BOM 编辑表单',
  description: 'BOM 物料清单编辑表单',
  form: {
    labelWidth: '100px',
    feedbackLayout: 'none',
  },
  schema: {
    type: 'object',
    properties: {
      materialCode: {
        type: 'string',
        title: '物料编码',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '请输入物料编码',
          disabled: true, // 编辑时禁用
        },
        'x-validator': [
          { required: true, message: '请输入物料编码' },
        ],
      },
      materialName: {
        type: 'string',
        title: '物料名称',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '请输入物料名称',
        },
        'x-validator': [{ required: true, message: '请输入物料名称' }],
      },
      materialDescription: {
        type: 'string',
        title: '物料描述',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          rows: 3,
          placeholder: '请输入物料描述',
        },
      },
      topMaterialCode: {
        type: 'string',
        title: '顶层物料',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '默认为自身',
        },
      },
      '{value:engineerCode,label:engineerName}': {
        type: 'string',
        title: '负责工程师',
        'x-decorator': 'FormItem',
        'x-component': 'UserSelect',
        'x-component-props': {
          labelInValue: true,
          placeholder: '请选择工程师',
        },
        'x-validator': [{ required: true, message: '请选择工程师' }],
      },
      status: {
        type: 'number',
        title: '状态',
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        'x-component-props': {
          options: [
            { label: '草稿', value: 0 },
            { label: '激活', value: 5 },
          ],
        },
        default: 0,
      },
      remark: {
        type: 'string',
        title: '备注',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          rows: 2,
          placeholder: '请输入备注信息',
        },
      },
    },
  },
};

/**
 * BOM 对话框表单 (bomFormDialog.tsx 使用)
 */
const bomDialogForm: DynamicSchemaDefinition = {
  scenarioKey: 'bom:dialog',
  label: 'BOM 对话框表单',
  description: 'BOM 对话框中使用的表单',
  form: {
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
          col1: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              materialCode: {
                type: 'string',
                title: '物料编码',
                'x-decorator': 'FormItem',
                'x-component': 'MaterialSelect',
                'x-component-props': {
                  placeholder: '请选择物料',
                },
                'x-validator': [{ required: true, message: '请选择物料' }],
              },
            },
          },
          col2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              materialDescription: {
                type: 'string',
                title: '物料描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-pattern': 'readPretty',
                'x-component-props': { placeholder: '自动带出' },
              },
            },
          },
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              engineerCode: {
                type: 'string',
                title: '工程师编号',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入工程师编号' },
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              engineerName: {
                type: 'string',
                title: '工程师姓名',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入工程师姓名' },
              },
            },
          },
          col5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              remark: {
                type: 'string',
                title: '备注',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 3, placeholder: '请输入备注' },
              },
            },
          },
        },
      },
    },
  },
};

/**
 * 导出所有 BomManagement Schema 定义
 */
export const schemas: DynamicSchemaDefinition[] = [
  bomCreateForm,
  bomEditForm,
  bomDialogForm,
];
