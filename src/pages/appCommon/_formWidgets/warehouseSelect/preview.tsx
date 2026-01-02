import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import WarehouseSelectComponent from "@/pages/appCommon/_utils/WarehouseSelect";

export const WarehouseSelect: DnFC<React.ComponentProps<typeof WarehouseSelectComponent>> = WarehouseSelectComponent

WarehouseSelect.Behavior = createBehavior(
  {
    name: 'WarehouseSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'WarehouseSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '库房选择器',
      }
    },
  }
)

WarehouseSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "库房选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '库房选择器',
          'x-decorator': 'FormItem',
          'x-component': 'WarehouseSelect',
          'x-component-props': {
            placeholder: '请选择库房',
            useCode: true,
            enableLinkage: false
          }
        },
      },
    ],
  }
)