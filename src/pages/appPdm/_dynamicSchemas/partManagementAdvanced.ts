/**
 * PartManagement 复杂表单 Schema
 *
 * 注意：Part 和 PartApplicationRequest 表单包含动态分类属性，
 * 这些属性需要根据选择的分类在运行时动态加载。
 *
 * 此文件提供基础 Schema 定义，动态属性部分由组件自行扩展。
 *
 * 使用方式：
 * 1. 使用 useDynamicSchema 获取基础 Schema
 * 2. 在组件中使用 buildAttributeFields 工具函数扩展动态属性
 */
import type { DynamicSchemaDefinition } from '@/dynamicSchemas/types';

/**
 * 物料表单基础 Schema
 * 动态分类属性需要组件自行扩展
 */
const partFormBase: DynamicSchemaDefinition = {
  scenarioKey: 'part:form',
  label: '物料表单',
  description: '物料新建/编辑表单（不含动态分类属性）',
  form: {
    labelCol: 6,
    wrapperCol: 18,
    labelWidth: 100,
    feedbackLayout: 'none',
  },
  schema: {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': { maxColumns: 4, strictAutoFit: true },
        properties: {
          colProductSeries: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              '{value:productSeriesId,label:productSeriesName}': {
                type: 'string',
                title: '产品系列',
                'x-decorator': 'FormItem',
                'x-component': 'ProductSeriesTreeSelect',
                'x-component-props': {
                  placeholder: '请选择产品系列',
                  labelInValue: true,
                },
              },
            },
          },
          colCategory: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              '{value:categoryId,label:categoryName}': {
                type: 'string',
                title: '物料分类',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'PartCategoryTreeSelect',
                'x-component-props': {
                  placeholder: '请选择物料分类',
                  labelInValue: true,
                },
              },
            },
          },
          col1: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              partNumber: {
                type: 'string',
                title: '物料编码',
                'x-decorator': 'FormItem',
                'x-decorator-props': {
                  tooltip: '保存后系统将自动生成物料编码',
                },
                'x-component': 'Input',
                'x-component-props': {
                  placeholder: '保存后自动生成',
                },
              },
            },
          },
          col2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              outCode: {
                type: 'string',
                title: '物料外码',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入物料外码' },
              },
            },
          },
          colDrawingNumber: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              drawingNumber: {
                type: 'string',
                title: '物料图号',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入物料图号' },
              },
            },
          },
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 4 },
            properties: {
              description: {
                type: 'string',
                title: '物料描述',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入物料描述' },
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              '{value:unitCode,label:unitName}': {
                type: 'string',
                title: '单位',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'UnitSelect',
                'x-component-props': {
                  placeholder: '请选择单位',
                  labelInValue: true,
                },
              },
            },
          },
          col8: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              isCritical: {
                type: 'boolean',
                title: '关键物料',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
              },
            },
          },
          col10: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              '{value:comeFrom,label:comeFromName}': {
                type: 'string',
                title: '来源',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'MaterialComFromSelect',
                'x-component-props': {
                  placeholder: '请选择来源',
                  labelInValue: true,
                },
              },
            },
          },
          col11: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              eanCode: {
                type: 'string',
                title: 'EAN 编码',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入 EAN 编码' },
              },
            },
          },
          col12: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              upcCode: {
                type: 'string',
                title: 'UPC 编码',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入 UPC 编码' },
              },
            },
          },
          col13: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 4 },
            properties: {
              specification: {
                type: 'string',
                title: '规格',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入规格' },
              },
            },
          },
          col14: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 4 },
            properties: {
              engDescription: {
                type: 'string',
                title: '英文描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 3, placeholder: '请输入英文描述' },
              },
            },
          },
          col15: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 4 },
            properties: {
              outDescription: {
                type: 'string',
                title: '外部描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 3, placeholder: '请输入外部描述' },
              },
            },
          },
          col16: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 4 },
            properties: {
              outSpecification: {
                type: 'string',
                title: '外部规格',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 3, placeholder: '请输入外部规格' },
              },
            },
          },
          col17: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 4 },
            properties: {
              versionReason: {
                type: 'string',
                title: '建版原因',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 3, placeholder: '请输入建版原因' },
              },
            },
          },
          // 动态分类属性占位符 - 由组件在运行时填充
          // divider_attributes 和 attributeFields 需要在组件中动态添加
        },
      },
    },
  },
};

/**
 * 物料料号申请单表单基础 Schema
 * 动态分类属性需要组件自行扩展
 */
const partApplicationRequestFormBase: DynamicSchemaDefinition = {
  scenarioKey: 'partApplicationRequest:form',
  label: '物料料号申请单表单',
  description: '物料料号申请单新建/编辑表单（不含动态分类属性）',
  form: {
    labelCol: 6,
    wrapperCol: 18,
    labelWidth: 100,
    feedbackLayout: 'none',
  },
  schema: {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': { maxColumns: 4, strictAutoFit: true },
        properties: {
          colProductSeries: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              productSeriesId: {
                type: 'string',
                title: '产品系列',
                'x-decorator': 'FormItem',
                'x-component': 'ProductSeriesTreeSelect',
                'x-component-props': {
                  placeholder: '请选择产品系列',
                },
              },
            },
          },
          colCategory: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              categoryId: {
                type: 'string',
                title: '物料分类',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'PartCategoryTreeSelect',
                'x-component-props': {
                  placeholder: '请选择物料分类',
                },
              },
            },
          },
          colRequestReason: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 4 },
            properties: {
              requestReason: {
                type: 'string',
                title: '申请原因',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 2, placeholder: '请输入申请原因' },
              },
            },
          },
          colDivider: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 4 },
            properties: {
              divider: {
                type: 'void',
                'x-component': 'FormDivider',
                'x-component-props': {
                  orientation: 'left',
                  children: '物料信息',
                },
              },
            },
          },
          colDescription: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 4 },
            properties: {
              partInfoDescription: {
                type: 'string',
                title: '物料描述',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入物料描述' },
              },
            },
          },
          colSpecification: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 4 },
            properties: {
              partInfoSpecification: {
                type: 'string',
                title: '规格',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入规格' },
              },
            },
          },
          colUnit: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              partInfoUnit: {
                type: 'string',
                title: '单位',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'UnitSelect',
                'x-component-props': {
                  placeholder: '请选择单位',
                  labelInValue: true,
                },
              },
            },
          },
          colIsCritical: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              partInfoIsCritical: {
                type: 'boolean',
                title: '关键物料',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
              },
            },
          },
          colComeFrom: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              partInfoComeFrom: {
                type: 'string',
                title: '来源',
                'x-decorator': 'FormItem',
                'x-component': 'MaterialComFromSelect',
                'x-component-props': {
                  placeholder: '请选择来源',
                  labelInValue: true,
                },
              },
            },
          },
          colOutCode: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              partInfoOutCode: {
                type: 'string',
                title: '物料外码',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入物料外码' },
              },
            },
          },
          colEanCode: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              partInfoEanCode: {
                type: 'string',
                title: 'EAN 编码',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入 EAN 编码' },
              },
            },
          },
          colUpcCode: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              partInfoUpcCode: {
                type: 'string',
                title: 'UPC 编码',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入 UPC 编码' },
              },
            },
          },
          colEngDescription: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 4 },
            properties: {
              partInfoEngDescription: {
                type: 'string',
                title: '英文描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 2, placeholder: '请输入英文描述' },
              },
            },
          },
          colOutDescription: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 4 },
            properties: {
              partInfoOutDescription: {
                type: 'string',
                title: '外部描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 2, placeholder: '请输入外部描述' },
              },
            },
          },
          colOutSpecification: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 4 },
            properties: {
              partInfoOutSpecification: {
                type: 'string',
                title: '外部规格',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 2, placeholder: '请输入外部规格' },
              },
            },
          },
          // 动态分类属性占位符 - 由组件在运行时填充
        },
      },
    },
  },
};

/**
 * 导出所有 PartManagement 复杂表单 Schema 定义
 */
export const schemas: DynamicSchemaDefinition[] = [
  partFormBase,
  partApplicationRequestFormBase,
];
