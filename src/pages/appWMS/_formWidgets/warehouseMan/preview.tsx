import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import WarehouseManDataSelect from "@/pages/appWMS/_utils/warehouseManSelect";

export const WarehouseManSelect: DnFC<React.ComponentProps<typeof WarehouseManDataSelect>> = WarehouseManDataSelect

WarehouseManSelect.Behavior = createBehavior(
  {
    name: 'WarehouseManSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'WarehouseManSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '库管选择器',
      }
    },
  }
)

WarehouseManSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "库管选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '库管选择器',
          'x-decorator': 'FormItem',
          'x-component': 'WarehouseManSelect',
        },
      },
    ],
  }
)
