import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import OutstructionConfigDataSelect from "@/pages/appWMS/_utils/outstructionConfigSelect";

export const OutstructionConfigSelect: DnFC<React.ComponentProps<typeof OutstructionConfigDataSelect>> = OutstructionConfigDataSelect

OutstructionConfigSelect.Behavior = createBehavior(
  {
    name: 'OutstructionConfigSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'OutstructionConfigSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '出库提供者选择器',
      }
    },
  }
)

OutstructionConfigSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "出库提供者选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '提供者选择器',
          'x-decorator': 'FormItem',
          'x-component': 'OutstructionConfigSelect',
        },
      },
    ],
  }
)
