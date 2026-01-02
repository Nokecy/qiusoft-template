import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import LotAttrItemDataSelect from "@/pages/appWMS/_utils/lotAttrItemSelect";

export const LotAttrItemSelect: DnFC<React.ComponentProps<typeof LotAttrItemDataSelect>> = LotAttrItemDataSelect

LotAttrItemSelect.Behavior = createBehavior(
  {
    name: 'LotAttrItemSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'LotAttrItemSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '批次属性选择器',
      }
    },
  }
)

LotAttrItemSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "批次属性选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '批次属性选择器',
          'x-decorator': 'FormItem',
          'x-component': 'LotAttrItemSelect',
        },
      },
    ],
  }
)
