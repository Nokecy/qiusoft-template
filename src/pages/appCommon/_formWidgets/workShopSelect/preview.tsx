import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import WorkShopSelectComponent from "@/pages/appCommon/_utils/WorkShopSelect";

export const WorkShopSelect: DnFC<React.ComponentProps<typeof WorkShopSelectComponent>> = WorkShopSelectComponent

WorkShopSelect.Behavior = createBehavior(
  {
    name: 'WorkShopSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'WorkShopSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '车间选择器',
      }
    },
  }
)

WorkShopSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "车间选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '车间选择器',
          'x-decorator': 'FormItem',
          'x-component': 'WorkShopSelect',
          'x-component-props': {
            placeholder: '请选择车间',
            useCode: true,
            enableLinkage: false
          }
        },
      },
    ],
  }
)