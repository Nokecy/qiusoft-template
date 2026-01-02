import { ISchema } from '@formily/react';

export const formId: string = 'appSYS.bnrRuleEvaluationConfig';

export const formSchema: { form: Record<string, any>; schema: ISchema } = {
  form: {
    labelCol: 6,
    wrapperCol: 16,
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
          maxColumns: 2,
          strictAutoFit: true,
        },
        properties: {
          // ==================== 规则名称 ====================
          '{value:ruleName,label:ruleDisplayName}': {
            type: 'string',
            title: '规则名称',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'BnrRuleSelect',
            'x-component-props': {
              placeholder: '请选择规则名称',
            },
          },

          // ==================== 目标规则名称 ====================
          '{value:targetRuleName,label:targetRuleDisplayName}': {
            type: 'string',
            title: '目标规则名称',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'BnrTargetRuleSelect',
            'x-component-props': {
              placeholder: '请选择目标规则名称',
            },
            'x-reactions': {
              dependencies: ['{value:ruleName,label:ruleDisplayName}'],
              fulfill: {
                state: {
                  componentProps: {
                    ruleName: '{{typeof $deps[0] === "object" ? $deps[0]?.value : $deps[0]}}',
                  },
                },
              },
            },
          },

          // ==================== 优先级 ====================
          priority: {
            type: 'number',
            title: '优先级',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              placeholder: '请输入优先级',
              min: 0,
              precision: 0,
            },
          },

          // ==================== 启用规则评估 ====================
          enableRuleEvaluation: {
            type: 'boolean',
            title: '启用规则评估',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
            'x-component-props': {
              checkedChildren: '启用',
              unCheckedChildren: '禁用',
            },
            default: true,
          },
        },
      },

      // ==================== 规则组配置区域 ====================
      ruleConfigSection: {
        type: 'void',
        'x-component': 'FormCollapse',
        'x-component-props': {
          ghost: true,
          defaultActiveKey: ['rulePanel'],
        },
        properties: {
          rulePanel: {
            type: 'void',
            'x-component': 'FormCollapse.CollapsePanel',
            'x-component-props': {
              key: 'rulePanel',
              header: '规则组配置',
              extra: '配置规则评估的详细规则',
            },
            properties: {
              ruleDescription: {
                type: 'void',
                'x-component': 'Alert',
                'x-component-props': {
                  type: 'info',
                  message: '规则配置说明',
                  description: '支持配置复杂的规则评估条件\n规则以JSON格式存储\n支持多维度条件组合',
                  showIcon: true,
                  style: { marginBottom: 16 },
                },
              },
              ruleGroupJson: {
                type: 'object',
                title: '规则组配置',
                'x-decorator': 'FormItem',
                'x-decorator-props': {
                  labelCol: 24,
                  wrapperCol: 24,
                  tooltip: '配置规则评估的条件和逻辑',
                },
                'x-component': 'BnrRuleBuilderWrapper',
                'x-reactions': {
                  dependencies: ['{value:ruleName,label:ruleDisplayName}'],
                  fulfill: {
                    state: {
                      componentProps: {
                        ruleName: '{{typeof $deps[0] === "object" ? $deps[0]?.value : $deps[0]}}',
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
