import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import BarCodeResolverDataSelect from "@/pages/appWMS/_utils/barCodeResolverSelect";

export const BarCodeResolverSelect: DnFC<React.ComponentProps<typeof BarCodeResolverDataSelect>> = BarCodeResolverDataSelect

BarCodeResolverSelect.Behavior = createBehavior(
  {
    name: 'BarCodeResolverSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'BarCodeResolverSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '批次数据解析器',
      }
    },
  }
)

BarCodeResolverSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "批次数据解析器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '批次数据解析器',
          'x-decorator': 'FormItem',
          'x-component': 'BarCodeResolverSelect',
        },
      },
    ],
  }
)
