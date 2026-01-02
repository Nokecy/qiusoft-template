import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import CustomerSelectComponent from "@/pages/appCommon/_utils/CustomerSelect";

export const CustomerSelect: DnFC<React.ComponentProps<typeof CustomerSelectComponent>> = CustomerSelectComponent

CustomerSelect.Behavior = createBehavior(
  {
    name: 'CustomerSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'CustomerSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '客户选择器',
      }
    },
  }
)

CustomerSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "客户选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '客户选择器',
          'x-decorator': 'FormItem',
          'x-component': 'CustomerSelect',
          'x-component-props': {
            placeholder: '请选择客户',
            useCode: true,
            enableLinkage: false
          }
        },
      },
    ],
  }
)