import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import WareHouseZoneDataSelect from "@/pages/appWMS/_utils/wareHouseZoneSelect";

export const WareHouseZoneSelect: DnFC<React.ComponentProps<typeof WareHouseZoneDataSelect>> = WareHouseZoneDataSelect

WareHouseZoneSelect.Behavior = createBehavior(
  {
    name: 'WareHouseZoneSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'WareHouseZoneSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '库区选择器',
      }
    },
  }
)

WareHouseZoneSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "库区选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '库区选择器',
          'x-decorator': 'FormItem',
          'x-component': 'WareHouseZoneSelect',
        },
      },
    ],
  }
)
