import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import RoleDataSelect from "@/pages/appSYS/users/components/roleSelect";

export const RoleSelect: DnFC<React.ComponentProps<typeof RoleDataSelect>> = RoleDataSelect

RoleSelect.Behavior = createBehavior(
  {
    name: 'RoleSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'RoleSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Input['zh-CN'],
        title: '角色选择',
      }
    },
  }
)

RoleSelect.Resource = createResource(
  {
    icon: 'InputSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '角色选择',
          'x-decorator': 'FormItem',
          'x-component': 'RoleSelect',
        },
      },
    ],
  }
)
