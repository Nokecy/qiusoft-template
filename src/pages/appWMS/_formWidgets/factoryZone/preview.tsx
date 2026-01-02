import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import FactoryZoneDataSelect from "@/pages/appWMS/_utils/factoryZoneSelect";

export const FactoryZoneSelect: DnFC<React.ComponentProps<typeof FactoryZoneDataSelect>> = FactoryZoneDataSelect

FactoryZoneSelect.Behavior = createBehavior(
  {
    name: 'FactoryZoneSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'FactoryZoneSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '厂区选择器',
      }
    },
  }
)

FactoryZoneSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "厂区选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '厂区选择器',
          'x-decorator': 'FormItem',
          'x-component': 'FactoryZoneSelect',
        },
      },
    ],
  }
)
