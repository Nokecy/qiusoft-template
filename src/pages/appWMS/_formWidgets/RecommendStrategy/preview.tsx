import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import RecommendStrategyDataSelect from "@/pages/appWMS/_utils/RecommendStrategySelect";

export const RecommendStrategySelect: DnFC<React.ComponentProps<typeof RecommendStrategyDataSelect>> = RecommendStrategyDataSelect

RecommendStrategySelect.Behavior = createBehavior(
  {
    name: 'RecommendStrategySelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'RecommendStrategySelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '上架策略选择器',
      }
    },
  }
)

RecommendStrategySelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "上架策略选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '上架策略选择器',
          'x-decorator': 'FormItem',
          'x-component': 'RecommendStrategySelect',
        },
      },
    ],
  }
)
