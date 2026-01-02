import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import SystemOrganizationDataSelect from "../../_utils/systemOrganizationSelect";

export const SystemOrganizationSelect: DnFC<React.ComponentProps<typeof SystemOrganizationDataSelect>> = SystemOrganizationDataSelect

SystemOrganizationSelect.Behavior = createBehavior(
  {
    name: 'SystemOrganizationSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'SystemOrganizationSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Input['zh-CN'],
        title: '组织选择',
      }
    },
  }
)

SystemOrganizationSelect.Resource = createResource(
  {
    icon: 'InputSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '组织选择',
          'x-decorator': 'FormItem',
          'x-component': 'SystemOrganizationSelect',
        },
      },
    ],
  }
)
