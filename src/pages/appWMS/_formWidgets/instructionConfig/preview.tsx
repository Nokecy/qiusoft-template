import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import InstructionConfigDataSelect from "@/pages/appWMS/_utils/instructionConfigSelect";

export const InstructionConfigSelect: DnFC<React.ComponentProps<typeof InstructionConfigDataSelect>> = InstructionConfigDataSelect

InstructionConfigSelect.Behavior = createBehavior(
  {
    name: 'InstructionConfigSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'InstructionConfigSelect',
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

InstructionConfigSelect.Resource = createResource(
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
          'x-component': 'InstructionConfigSelect',
        },
      },
    ],
  }
)
