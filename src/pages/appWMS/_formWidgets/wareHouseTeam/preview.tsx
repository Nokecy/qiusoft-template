import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import WareHouseTeamDataSelect from "@/pages/appWMS/_utils/wareHouseTeamSelect";

export const WareHouseTeamSelect: DnFC<React.ComponentProps<typeof WareHouseTeamDataSelect>> = WareHouseTeamDataSelect

WareHouseTeamSelect.Behavior = createBehavior(
  {
    name: 'WareHouseTeamSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'WareHouseTeamSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '仓库班组选择器',
      }
    },
  }
)

WareHouseTeamSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "仓库班组选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '仓库班组选择器',
          'x-decorator': 'FormItem',
          'x-component': 'WareHouseTeamSelect',
        },
      },
    ],
  }
)
