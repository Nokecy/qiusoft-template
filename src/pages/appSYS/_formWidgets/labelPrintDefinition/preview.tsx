import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import LabelPrintDefinitionDataSelect from "@/pages/appSYS/_utils/labelPrintDefinitionSelect";

export const LabelPrintDefinitionSelect: DnFC<React.ComponentProps<typeof LabelPrintDefinitionDataSelect>> = LabelPrintDefinitionDataSelect

LabelPrintDefinitionSelect.Behavior = createBehavior(
  {
    name: 'LabelPrintDefinitionSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'LabelPrintDefinitionSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '功能点选择器',
      }
    },
  }
)

LabelPrintDefinitionSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "功能点选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '功能点选择器',
          'x-decorator': 'FormItem',
          'x-component': 'LabelPrintDefinitionSelect',
        },
      },
    ],
  }
)
