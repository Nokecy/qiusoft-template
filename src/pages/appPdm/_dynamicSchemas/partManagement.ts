/**
 * PartManagement 模块动态表单 Schema - 简单表单
 *
 * 包含以下表单定义：
 * - partCategory:create - 物料分类新建
 * - partCategory:edit - 物料分类编辑
 * - productSeries:create - 产品系列新建
 * - productSeries:edit - 产品系列编辑
 */
import type { DynamicSchemaDefinition } from '@/dynamicSchemas/types';

/**
 * 物料分类表单
 */
const partCategoryForm: DynamicSchemaDefinition = {
  scenarioKey: 'partCategory:form',
  label: '物料分类表单',
  description: '物料分类新建/编辑表单',
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
        'x-component-props': { maxColumns: 3, strictAutoFit: true },
        properties: {
          col1: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              categoryCode: {
                type: 'string',
                title: '分类编码',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入分类编码' },
                required: true,
              },
            },
          },
          col2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              categoryName: {
                type: 'string',
                title: '分类名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入分类名称' },
                required: true,
              },
            },
          },
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              parentId: {
                type: 'number',
                title: '上级分类',
                'x-decorator': 'FormItem',
                'x-component': 'PartCategoryTreeSelect',
                'x-component-props': { placeholder: '请选择上级分类' },
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              partNumberPrefix: {
                type: 'string',
                title: '物料号前缀',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入物料号前缀' },
              },
            },
          },
          col5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              isCodeParticipant: {
                type: 'boolean',
                title: '参与编码',
                'x-decorator': 'FormItem',
                'x-decorator-props': {
                  tooltip: '是否参与物料编码生成时根据分类树层级拼接编码段',
                },
                'x-component': 'Switch',
                'x-component-props': {},
                default: false,
              },
            },
          },
          col6: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              codeSeparator: {
                type: 'string',
                title: '编码分隔符',
                'x-decorator': 'FormItem',
                'x-decorator-props': {
                  tooltip: '物料编码生成时各编码段之间的连接符',
                },
                'x-component': 'Input',
                'x-component-props': { placeholder: '如: -、_、.' },
              },
            },
          },
          col7: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              isActive: {
                type: 'boolean',
                title: '是否启用',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                'x-component-props': {},
                default: true,
              },
            },
          },
          col8: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 3 },
            properties: {
              memo: {
                type: 'string',
                title: '备注',
                'x-decorator': 'FormItem',
                'x-decorator-props': {
                  gridSpan: 3,
                  labelCol: 2,
                  wrapperCol: 22,
                },
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
 * 产品系列表单
 */
const productSeriesForm: DynamicSchemaDefinition = {
  scenarioKey: 'productSeries:form',
  label: '产品系列表单',
  description: '产品系列新建/编辑表单',
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
        'x-component-props': { maxColumns: 3, strictAutoFit: true },
        properties: {
          col1: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              seriesCode: {
                type: 'string',
                title: '系列编码',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入系列编码' },
                required: true,
              },
            },
          },
          col2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              seriesName: {
                type: 'string',
                title: '系列名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入系列名称' },
                required: true,
              },
            },
          },
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              parentId: {
                type: 'number',
                title: '上级系列',
                'x-decorator': 'FormItem',
                'x-component': 'ProductSeriesTreeSelect',
                'x-component-props': { placeholder: '请选择上级系列' },
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              partNumberPrefix: {
                type: 'string',
                title: '物料号前缀',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入物料号前缀' },
              },
            },
          },
          col5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              isCodeParticipant: {
                type: 'boolean',
                title: '参与编码',
                'x-decorator': 'FormItem',
                'x-decorator-props': {
                  tooltip: '是否参与物料编码生成时根据系列树层级拼接编码段',
                },
                'x-component': 'Switch',
                'x-component-props': {},
                default: true,
              },
            },
          },
          col6: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              codeSeparator: {
                type: 'string',
                title: '编码分隔符',
                'x-decorator': 'FormItem',
                'x-decorator-props': {
                  tooltip: '物料编码生成时各编码段之间的连接符',
                },
                'x-component': 'Input',
                'x-component-props': { placeholder: '如: -、_、.' },
              },
            },
          },
          col7: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              sortOrder: {
                type: 'number',
                title: '排序号',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
                'x-component-props': { placeholder: '请输入排序号', min: 0, precision: 0 },
                default: 0,
              },
            },
          },
          col8: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              isActive: {
                type: 'boolean',
                title: '是否启用',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                'x-component-props': {},
                default: true,
              },
            },
          },
          col9: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 3 },
            properties: {
              description: {
                type: 'string',
                title: '描述',
                'x-decorator': 'FormItem',
                'x-decorator-props': {
                  gridSpan: 3,
                  labelCol: 2,
                  wrapperCol: 22,
                },
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 2, placeholder: '请输入描述' },
              },
            },
          },
          col10: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 3 },
            properties: {
              memo: {
                type: 'string',
                title: '备注',
                'x-decorator': 'FormItem',
                'x-decorator-props': {
                  gridSpan: 3,
                  labelCol: 2,
                  wrapperCol: 22,
                },
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 2, placeholder: '请输入备注' },
              },
            },
          },
        },
      },
    },
  },
};

/**
 * 物料料号规则表单
 */
const partNumberRulesForm: DynamicSchemaDefinition = {
  scenarioKey: 'partNumberRules:form',
  label: '物料料号规则表单',
  description: '物料料号规则新建/编辑表单',
  form: {
    labelCol: 6,
    wrapperCol: 12,
    labelWidth: '120px',
    feedbackLayout: 'none',
  },
  schema: {
    type: 'object',
    properties: {
      card: {
        type: 'void',
        'x-component': 'Card',
        'x-component-props': {
          title: '物料料号规则',
        },
        properties: {
          grid: {
            type: 'void',
            'x-component': 'FormGrid',
            'x-component-props': {
              maxColumns: 3,
              minColumns: 3,
              strictAutoFit: true,
            },
            properties: {
              nameCol: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                properties: {
                  name: {
                    type: 'string',
                    title: '名称',
                    required: true,
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-component-props': {
                      placeholder: '请输入规则名称',
                    },
                  },
                },
              },
              displayNameCol: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                properties: {
                  displayName: {
                    type: 'string',
                    title: '显示名称',
                    required: true,
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-component-props': {
                      placeholder: '请输入显示名称',
                    },
                  },
                },
              },
              emptyCol1: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
              },
              emptyCol1_2: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
              },
              ruleDescriptionCol: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': {
                  gridSpan: 3,
                },
                properties: {
                  ruleDescription: {
                    type: 'string',
                    title: '规则描述',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input.TextArea',
                    'x-component-props': {
                      placeholder: '请输入规则描述',
                      rows: 3,
                    },
                  },
                },
              },
              numberStartCol: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                properties: {
                  numberStart: {
                    type: 'number',
                    title: '起始编号',
                    required: true,
                    'x-decorator': 'FormItem',
                    'x-component': 'NumberPicker',
                    'x-component-props': {
                      placeholder: '请输入起始编号',
                      min: 0,
                      precision: 0,
                    },
                  },
                },
              },
              numberIncrementCol: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                properties: {
                  numberIncrement: {
                    type: 'number',
                    title: '编号增量',
                    required: true,
                    'x-decorator': 'FormItem',
                    'x-component': 'NumberPicker',
                    'x-component-props': {
                      placeholder: '请输入编号增量',
                      min: 1,
                      precision: 0,
                    },
                  },
                },
              },
              numberBinaryCol: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                properties: {
                  numberBinary: {
                    type: 'number',
                    title: '编号进制',
                    required: true,
                    'x-decorator': 'FormItem',
                    'x-component': 'NumberPicker',
                    'x-component-props': {
                      placeholder: '请输入编号进制',
                      min: 2,
                      max: 36,
                      precision: 0,
                    },
                  },
                },
              },
              activeCol: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                properties: {
                  active: {
                    type: 'boolean',
                    title: '激活',
                    'x-decorator': 'FormItem',
                    'x-component': 'Switch',
                    default: true,
                  },
                },
              },
              isDefaultCol: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                properties: {
                  isDefault: {
                    type: 'boolean',
                    title: '设为默认',
                    'x-decorator': 'FormItem',
                    'x-component': 'Switch',
                    default: false,
                  },
                },
              },
              emptyCol2: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
              },
              itemsCol: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': {
                  gridSpan: 3,
                },
                properties: {
                  items: {
                    type: 'array',
                    title: '规则明细',
                    'x-decorator': 'FormItem',
                    'x-component': 'ArrayTable',
                    'x-component-props': {
                      gridKey: 'appPdm.PartNumberRules.items',
                    },
                    items: {
                      type: 'object',
                      properties: {
                        typeCol: {
                          type: 'void',
                          'x-component': 'ArrayTable.Column',
                          'x-component-props': {
                            title: '类型',
                            width: 120,
                          },
                          properties: {
                            type: {
                              'x-decorator': 'FormItem',
                              'x-component': 'Select',
                              'x-component-props': {
                                placeholder: '请选择',
                              },
                              enum: [
                                { label: '文本', value: 0 },
                                { label: '日期时间', value: 1 },
                                { label: '年份', value: 2 },
                                { label: '年月', value: 3 },
                                { label: '年月日', value: 4 },
                                { label: '年周', value: 5 },
                                { label: '月份', value: 6 },
                                { label: '天', value: 7 },
                                { label: '序列号', value: 8 },
                                { label: '属性', value: 9 },
                              ],
                            },
                          },
                        },
                        contentCol: {
                          type: 'void',
                          'x-component': 'ArrayTable.Column',
                          'x-component-props': {
                            title: '内容',
                            width: 180,
                          },
                          properties: {
                            content: {
                              type: 'string',
                              'x-decorator': 'FormItem',
                              'x-component': 'Input',
                              'x-component-props': {
                                placeholder: '请输入',
                              },
                              'x-reactions': {
                                dependencies: [
                                  {
                                    property: 'value',
                                    type: 'any',
                                    source: '.type',
                                    name: 'type',
                                  },
                                ],
                                fulfill: {
                                  state: {
                                    visible: '{{$deps.type !== 9}}',
                                  },
                                },
                              },
                            },
                            contentCopy: {
                              type: 'string',
                              'x-decorator': 'FormItem',
                              'x-component': 'Select',
                              'x-component-props': {
                                placeholder: '请选择属性',
                              },
                              'x-reactions': [
                                {
                                  dependencies: [
                                    {
                                      property: 'value',
                                      type: 'any',
                                      source: '.type',
                                      name: 'type',
                                    },
                                  ],
                                  fulfill: {
                                    state: {
                                      visible: '{{$deps.type === 9}}',
                                    },
                                  },
                                },
                                {
                                  fulfill: {
                                    state: {
                                      dataSource: '{{$form.getState().propertyOptions || []}}',
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        },
                        wordConvertCol: {
                          type: 'void',
                          'x-component': 'ArrayTable.Column',
                          'x-component-props': {
                            title: '转换类型',
                            width: 60,
                          },
                          properties: {
                            wordConvert: {
                              'x-decorator': 'FormItem',
                              'x-component': 'Select',
                              'x-component-props': {
                                placeholder: '请选择',
                              },
                              enum: [
                                { label: '不转换', value: 0 },
                                { label: '转大写', value: 1 },
                                { label: '转小写', value: 2 },
                              ],
                            },
                          },
                        },
                        placeholderCol: {
                          type: 'void',
                          'x-component': 'ArrayTable.Column',
                          'x-component-props': {
                            title: '占位符',
                            width: 60,
                          },
                          properties: {
                            placeholder: {
                              type: 'string',
                              'x-decorator': 'FormItem',
                              'x-component': 'Input',
                            },
                          },
                        },
                        rightSeparatorCol: {
                          type: 'void',
                          'x-component': 'ArrayTable.Column',
                          'x-component-props': {
                            title: '右分隔符',
                            width: 60,
                          },
                          properties: {
                            rightSeparator: {
                              type: 'string',
                              'x-decorator': 'FormItem',
                              'x-component': 'Input',
                            },
                          },
                        },
                        padLeftCharCol: {
                          type: 'void',
                          'x-component': 'ArrayTable.Column',
                          'x-component-props': {
                            title: '左补位',
                            width: 60,
                          },
                          properties: {
                            'padLeft.leftPadChar': {
                              type: 'string',
                              'x-decorator': 'FormItem',
                              'x-component': 'Input',
                            },
                          },
                        },
                        padLeftLengthCol: {
                          type: 'void',
                          'x-component': 'ArrayTable.Column',
                          'x-component-props': {
                            title: '左补位长度',
                            width: 60,
                          },
                          properties: {
                            'padLeft.totalLength': {
                              type: 'number',
                              'x-decorator': 'FormItem',
                              'x-component': 'NumberPicker',
                            },
                          },
                        },
                        sequenceLengthCol: {
                          type: 'void',
                          'x-component': 'ArrayTable.Column',
                          'x-component-props': {
                            title: '序号长度',
                            width: 50,
                          },
                          properties: {
                            sequenceLength: {
                              type: 'string',
                              'x-decorator': 'FormItem',
                              'x-component': 'Input',
                            },
                          },
                        },
                        sequenceBasisCol: {
                          type: 'void',
                          'x-component': 'ArrayTable.Column',
                          'x-component-props': {
                            title: '是否序号',
                            width: 60,
                          },
                          properties: {
                            sequenceBasis: {
                              type: 'boolean',
                              'x-decorator': 'FormItem',
                              'x-component': 'Switch',
                            },
                          },
                        },
                        operationCol: {
                          type: 'void',
                          'x-component': 'ArrayTable.Column',
                          'x-component-props': {
                            title: '操作',
                            width: 150,
                            pinned: 'right',
                          },
                          properties: {
                            moveUp: {
                              type: 'void',
                              'x-component': 'ArrayTable.MoveUp',
                            },
                            moveDown: {
                              type: 'void',
                              'x-component': 'ArrayTable.MoveDown',
                            },
                            remove: {
                              type: 'void',
                              'x-component': 'ArrayTable.Remove',
                            },
                          },
                        },
                      },
                    },
                    properties: {
                      addition: {
                        type: 'void',
                        title: '添加',
                        'x-component': 'ArrayTable.Addition',
                      },
                    },
                  },
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
 * 分类属性表单
 */
const categoryAttributeForm: DynamicSchemaDefinition = {
  scenarioKey: 'categoryAttribute:form',
  label: '分类属性表单',
  description: '分类属性新建/编辑表单',
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
        'x-component-props': { maxColumns: 4, strictAutoFit: true },
        properties: {
          col0: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 4 },
            properties: {
              categoryName: {
                type: 'string',
                title: '所属分类',
                'x-decorator': 'FormItem',
                'x-decorator-props': {
                  labelCol: 2,
                  wrapperCol: 22,
                },
                'x-component': 'Input',
                'x-pattern': 'readPretty',
                required: true,
              },
              categoryId: {
                type: 'number',
                display: 'none',
              },
            },
          },
          col1: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              attributeCode: {
                type: 'string',
                title: '属性编码',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入属性编码' },
                required: true,
              },
            },
          },
          col2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              displayName: {
                type: 'string',
                title: '显示名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入显示名称' },
                required: true,
              },
            },
          },
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              dataType: {
                type: 'number',
                title: '数据类型',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  options: [
                    { label: '文本', value: 1 },
                    { label: '整数', value: 3 },
                    { label: '小数', value: 4 },
                    { label: '布尔', value: 5 },
                    { label: '日期', value: 6 },
                    { label: '单选下拉', value: 8 },
                    { label: '多选', value: 9 },
                  ],
                  placeholder: '请选择数据类型',
                },
                required: true,
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              isRequired: {
                type: 'boolean',
                title: '必填',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
              },
            },
          },
          col5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              displayOrder: {
                type: 'number',
                title: '显示顺序',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
                'x-component-props': { placeholder: '请输入显示顺序', precision: 0 },
              },
            },
          },
          col6: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              isActive: {
                type: 'boolean',
                title: '是否启用',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                default: true,
              },
            },
          },
          col7: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              minValue: {
                type: 'number',
                title: '最小值',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
                'x-component-props': { placeholder: '请输入最小值' },
                'x-reactions': {
                  fulfill: {
                    state: {
                      visible: '{{$form.values.dataType === 3 || $form.values.dataType === 4}}',
                    },
                  },
                },
              },
            },
          },
          col8: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              maxValue: {
                type: 'number',
                title: '最大值',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
                'x-component-props': { placeholder: '请输入最大值' },
                'x-reactions': {
                  fulfill: {
                    state: {
                      visible: '{{$form.values.dataType === 3 || $form.values.dataType === 4}}',
                    },
                  },
                },
              },
            },
          },
          col9: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              defaultValue: {
                type: 'string',
                title: '默认值',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入默认值' },
              },
            },
          },
          col10: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 4 },
            properties: {
              optionsList: {
                type: 'array',
                title: '选项配置',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayTable',
                'x-component-props': {
                  gridKey: 'appPdm.PartManagement.CategoryAttribute.OptionsList',
                  pagination: false,
                },
                'x-reactions': {
                  fulfill: {
                    state: {
                      visible: '{{$form.values.dataType === 8 || $form.values.dataType === 9}}',
                    },
                  },
                },
                items: {
                  type: 'object',
                  properties: {
                    col1: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '选项标签', width: 200 },
                      properties: {
                        label: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'Input',
                          'x-component-props': { placeholder: '请输入选项标签' },
                          required: true,
                        },
                      },
                    },
                    col2: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '选项值', width: 200 },
                      properties: {
                        value: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'Input',
                          'x-component-props': { placeholder: '请输入选项值' },
                          required: true,
                        },
                      },
                    },
                    col3: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '操作', width: 80, align: 'center' },
                      properties: {
                        remove: {
                          type: 'void',
                          'x-component': 'ArrayTable.Remove',
                        },
                      },
                    },
                  },
                },
                properties: {
                  add: {
                    type: 'void',
                    title: '添加选项',
                    'x-component': 'ArrayTable.Addition',
                  },
                },
              },
              optionsJson: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-hidden': true,
              },
            },
          },
          col11: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 4 },
            properties: {
              helpText: {
                type: 'string',
                title: '帮助说明',
                'x-decorator': 'FormItem',
                'x-decorator-props': {
                  labelCol: 2,
                  wrapperCol: 22,
                },
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 3, placeholder: '请输入帮助说明' },
              },
            },
          },
        },
      },
    },
  },
};

/**
 * 分类规则映射表单
 */
const partCategoryRuleMappingForm: DynamicSchemaDefinition = {
  scenarioKey: 'partCategoryRuleMapping:form',
  label: '分类规则映射表单',
  description: '物料分类与规则定义映射表单',
  form: {
    labelCol: 6,
    wrapperCol: 18,
  },
  schema: {
    type: 'object',
    properties: {
      categoryId: {
        type: 'number',
        title: '物料分类',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'PartCategoryTreeSelect',
        'x-component-props': {
          placeholder: '请选择物料分类',
        },
      },
      ruleDefinitionId: {
        type: 'number',
        title: '规则定义',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'RuleDefinitionSelect',
        'x-component-props': {
          placeholder: '请选择规则定义',
        },
      },
      priority: {
        type: 'number',
        title: '优先级',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
          placeholder: '请输入优先级（数值越大优先级越高）',
          min: 0,
          precision: 0,
        },
        'x-decorator-props': {
          tooltip: '规则评估优先级，数值越大优先级越高',
        },
      },
    },
  },
};

/**
 * 导出所有 PartManagement 简单表单 Schema 定义
 */
export const schemas: DynamicSchemaDefinition[] = [
  partCategoryForm,
  productSeriesForm,
  partNumberRulesForm,
  categoryAttributeForm,
  partCategoryRuleMappingForm,
];
