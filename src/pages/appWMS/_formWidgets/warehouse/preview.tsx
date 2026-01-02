import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import WarehouseDataSelect from "@/pages/appWMS/_utils/warehouseSelect";

export const WarehouseSelect: DnFC<React.ComponentProps<typeof WarehouseDataSelect>> = WarehouseDataSelect

WarehouseSelect.Behavior = createBehavior(
  {
    name: 'WarehouseSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'WarehouseSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '仓库选择器',
      }
    },
  }
)

WarehouseSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "仓库选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '仓库选择器',
          'x-decorator': 'FormItem',
          'x-component': 'WarehouseSelect',
        },
      },
    ],
  }
)
