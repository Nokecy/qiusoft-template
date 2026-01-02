import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import UserDataSelect from "@/pages/appSYS/users/components/userSelect";

export const UserSelect: DnFC<React.ComponentProps<typeof UserDataSelect>> = UserDataSelect

UserSelect.Behavior = createBehavior(
  {
    name: 'UserSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'UserSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Input['zh-CN'],
        title: '用户选择',
      }
    },
  }
)

UserSelect.Resource = createResource(
  {
    icon: 'InputSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '用户选择',
          'x-decorator': 'FormItem',
          'x-component': 'UserSelect',
        },
      },
    ],
  }
)
