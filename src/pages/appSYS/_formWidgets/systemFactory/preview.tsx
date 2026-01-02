import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import SystemFactoryDataSelect from "../../_utils/systemFactorySelect";

export const SystemFactorySelect: DnFC<React.ComponentProps<typeof SystemFactoryDataSelect>> = SystemFactoryDataSelect

SystemFactorySelect.Behavior = createBehavior(
  {
    name: 'SystemFactorySelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'SystemFactorySelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Input['zh-CN'],
        title: '工厂选择',
      }
    },
  }
)

SystemFactorySelect.Resource = createResource(
  {
    icon: 'InputSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '工厂选择',
          'x-decorator': 'FormItem',
          'x-component': 'SystemFactorySelect',
        },
      },
    ],
  }
)
