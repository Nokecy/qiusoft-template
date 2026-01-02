import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import XUserDataSelect from "@/pages/appSYS/_utils/XUserSelect";

export const XUserSelect: DnFC<React.ComponentProps<typeof XUserDataSelect>> = XUserDataSelect

XUserSelect.Behavior = createBehavior(
  {
    name: 'XUserSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'XUserSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '账户选择器',
      }
    },
  }
)

XUserSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "账户选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '账户选择器',
          'x-decorator': 'FormItem',
          'x-component': 'XUserSelect',
        },
      },
    ],
  }
)
