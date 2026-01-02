import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import RecommendStrategyProviderDataSelect from "@/pages/appWMS/_utils/RecommendStrategyProviderSelect";

export const RecommendStrategyProviderSelect: DnFC<React.ComponentProps<typeof RecommendStrategyProviderDataSelect>> = RecommendStrategyProviderDataSelect

RecommendStrategyProviderSelect.Behavior = createBehavior(
  {
    name: 'RecommendStrategyProviderSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'RecommendStrategyProviderSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '提供选择器',
      }
    },
  }
)

RecommendStrategyProviderSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "提供选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '提供选择器',
          'x-decorator': 'FormItem',
          'x-component': 'RecommendStrategyProviderSelect',
        },
      },
    ],
  }
)
