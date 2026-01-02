import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import BNRSequenceTypeDataSelect from "@/pages/appSYS/_utils/bnrSequenceTypeSelect";

export const BnrSequenceTypeSelect: DnFC<React.ComponentProps<typeof BNRSequenceTypeDataSelect>> = BNRSequenceTypeDataSelect

BnrSequenceTypeSelect.Behavior = createBehavior(
  {
    name: 'BnrSequenceTypeSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'BnrSequenceTypeSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '序列类型选择',
      }
    },
  }
)

BnrSequenceTypeSelect.Resource = createResource(
  {
    icon: 'InputSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '序列类型选择',
          'x-decorator': 'FormItem',
          'x-component': 'BnrSequenceTypeSelect',
        },
      },
    ],
  }
)
