import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import SystemCompanyDataSelect from "../../_utils/systemCompanySelect";

export const SystemCompanySelect: DnFC<React.ComponentProps<typeof SystemCompanyDataSelect>> = SystemCompanyDataSelect

SystemCompanySelect.Behavior = createBehavior(
  {
    name: 'SystemCompanySelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'SystemCompanySelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Input['zh-CN'],
        title: '公司选择',
      }
    },
  }
)

SystemCompanySelect.Resource = createResource(
  {
    icon: 'InputSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '公司选择',
          'x-decorator': 'FormItem',
          'x-component': 'SystemCompanySelect',
        },
      },
    ],
  }
)
