import { ISchema } from '@formily/react';

export const formId: string = 'labelManagement.labelPrintSetting';

export const formSchema: { form: Record<string, any>; schema: ISchema } = {
  form: {
    labelCol: 6,
    wrapperCol: 12,
    labelWidth: '140px',
    feedbackLayout: 'none',
  },
  schema: {
    type: 'object',
    properties: {
      gridLayout: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
          maxColumns: 3,  // 改为一行三列
          strictAutoFit: true,
        },
        properties: {
          // ==================== 第一行: 打印功能*、标签类型*、打印数量* ====================
          '{value:printFeatureCode,label:printFeatureName}': {
            type: 'string',
            title: '打印功能',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'PrintFeatureSelect',
            'x-component-props': {
              placeholder: '请选择打印功能',
              useCode: true,
            },
          },
          '{value:labelTypeCode,label:labelTypeName}': {
            type: 'string',
            title: '标签类型',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'LabelTypeSelect',
            'x-component-props': {
              placeholder: '请选择标签类型',
              code: true,
            },
          },
          printQuantity: {
            type: 'number',
            title: '打印数量',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              placeholder: '请输入打印数量',
              min: 1,
              precision: 0,
            },
          },

          // ==================== 第二行: 物料分类、物料、客户 ====================
          '{value:materialClassCode,label:materialClassName}': {
            type: 'string',
            title: '物料分类',
            'x-decorator': 'FormItem',
            'x-component': 'MaterialClassSelect',
            'x-component-props': {
              placeholder: '请选择物料分类',
              useCode: true,
            },
          },
          '{value:materialItemCode,label:materialItemName}': {
            type: 'string',
            title: '物料',
            'x-decorator': 'FormItem',
            'x-component': 'MaterialSelect',
            'x-component-props': {
              placeholder: '请选择物料',
              useCode: true,
            },
          },
          '{value:customerCode,label:customerName}': {
            type: 'string',
            title: '客户',
            'x-decorator': 'FormItem',
            'x-component': 'CustomerSelect',
            'x-component-props': {
              placeholder: '请选择客户',
              useCode: true,
            },
          },

          // ==================== 第三行: 打印模板* ====================
          '{value:printTemplateId,label:printTemplateName}': {
            type: 'string',
            title: '打印模板',
            required: true,
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              gridSpan: 3,  // 占满整行
            },
            'x-component': 'PrintTemplateSelect',
            'x-component-props': {
              placeholder: '请选择打印模板',
              valueField: 'id',
            },
          },
        },
      },

      // ==================== 动态维度规则配置区域 (新增) ====================
      ruleConfigSection: {
        type: 'void',
        'x-component': 'FormCollapse',
        'x-component-props': {
          ghost: true,
          defaultActiveKey: [], // 默认折叠
        },
        properties: {
          rulePanel: {
            type: 'void',
            'x-component': 'FormCollapse.CollapsePanel',
            'x-component-props': {
              key: 'dimensionRule',
              header: '高级规则配置 (可选)',
              extra: '配置动态维度匹配规则,实现更灵活的模板选择',
            },
            properties: {
              ruleDescription: {
                type: 'void',
                'x-component': 'Alert',
                'x-component-props': {
                  type: 'info',
                  message: '规则配置说明',
                  description: `支持配置复杂的多维度匹配规则\n规则优先级高于基础字段 (物料分类/物料)\n支持 AND/OR 逻辑组合和嵌套条件\n留空表示使用基础字段匹配`,
                  showIcon: true,
                  style: { marginBottom: 16 },
                },
              },
              dimensionRuleGroup: {
                type: 'string',
                title: '维度匹配规则',
                'x-decorator': 'FormItem',
                'x-decorator-props': {
                  labelCol: 24,
                  wrapperCol: 24,
                  tooltip: '配置打印模板的动态选择规则,支持多维度条件组合',
                },
                'x-component': 'RuleBuilderWrapper',
                'x-reactions': {
                  dependencies: ['{value:printFeatureCode,label:printFeatureName}'],
                  fulfill: {
                    state: {
                      componentProps: {
                        printFeatureCode: '{{$deps[0]?.value}}',
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
