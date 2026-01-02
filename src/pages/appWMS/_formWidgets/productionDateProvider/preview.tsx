import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import ProductionDateProviderDataSelect from "@/pages/appWMS/_utils/productionDateProviderSelect";

export const ProductionDateProviderSelect: DnFC<React.ComponentProps<typeof ProductionDateProviderDataSelect>> = ProductionDateProviderDataSelect

ProductionDateProviderSelect.Behavior = createBehavior(
  {
    name: 'ProductionDateProviderSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProductionDateProviderSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '批次解析器',
      }
    },
  }
)

ProductionDateProviderSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "批次解析器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '批次解析器',
          'x-decorator': 'FormItem',
          'x-component': 'ProductionDateProviderSelect',
        },
      },
    ],
  }
)
