import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import RealRightNameDataSelect from "@/pages/appWMS/_utils/realRightNameSelect";

export const RealRightNameSelect: DnFC<React.ComponentProps<typeof RealRightNameDataSelect>> = RealRightNameDataSelect

RealRightNameSelect.Behavior = createBehavior(
  {
    name: 'RealRightNameSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'RealRightNameSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '物权选择器',
      }
    },
  }
)

RealRightNameSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "物权选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '物权选择器',
          'x-decorator': 'FormItem',
          'x-component': 'RealRightNameSelect',
        },
      },
    ],
  }
)
