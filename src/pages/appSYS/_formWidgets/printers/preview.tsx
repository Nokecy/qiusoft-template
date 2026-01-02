import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import PrintersDataSelect from "@/pages/appSYS/_utils/printersSelect";

export const PrintersSelect: DnFC<React.ComponentProps<typeof PrintersDataSelect>> = PrintersDataSelect

PrintersSelect.Behavior = createBehavior(
  {
    name: 'PrintersSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PrintersSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '打印机选择器',
      }
    },
  }
)

PrintersSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "打印机选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '打印机选择器',
          'x-decorator': 'FormItem',
          'x-component': 'PrintersSelect',
        },
      },
    ],
  }
)
