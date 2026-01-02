import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import WareHouseLocationDataSelect from "@/pages/appWMS/_utils/wareHouseLocationSelect";

export const WareHouseLocationSelect: DnFC<React.ComponentProps<typeof WareHouseLocationDataSelect>> = WareHouseLocationDataSelect

WareHouseLocationSelect.Behavior = createBehavior(
  {
    name: 'WareHouseLocationSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'WareHouseLocationSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '库位选择器',
      }
    },
  }
)

WareHouseLocationSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "库位选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '库位选择器',
          'x-decorator': 'FormItem',
          'x-component': 'WareHouseLocationSelect',
        },
      },
    ],
  }
)
