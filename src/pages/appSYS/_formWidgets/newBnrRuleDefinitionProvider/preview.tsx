import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import NewBnrRuleDefinitionProviderDataSelect from "@/pages/appSYS/_utils/newBnrRuleDefinitionProviderSelect";

export const NewBnrRuleDefinitionProviderSelect: DnFC<React.ComponentProps<typeof NewBnrRuleDefinitionProviderDataSelect>> = NewBnrRuleDefinitionProviderDataSelect

NewBnrRuleDefinitionProviderSelect.Behavior = createBehavior(
  {
    name: 'NewBnrRuleDefinitionProviderSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'NewBnrRuleDefinitionProviderSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '提供者选择器',
      }
    },
  }
)

NewBnrRuleDefinitionProviderSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "提供者选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '提供者选择器',
          'x-decorator': 'FormItem',
          'x-component': 'NewBnrRuleDefinitionProviderSelect',
        },
      },
    ],
  }
)
