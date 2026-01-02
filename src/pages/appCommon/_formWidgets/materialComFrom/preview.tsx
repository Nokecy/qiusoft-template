import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import MaterialComFromSelectComponent from "@/pages/appCommon/_utils/MaterialComFromSelect";

export const MaterialComFromSelect: DnFC<React.ComponentProps<typeof MaterialComFromSelectComponent>> = MaterialComFromSelectComponent

MaterialComFromSelect.Behavior = createBehavior(
  {
    name: 'MaterialComFromSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'MaterialComFromSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '物料来源选择器',
      }
    },
  }
)

MaterialComFromSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "物料来源选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '物料来源选择器',
          'x-decorator': 'FormItem',
          'x-component': 'MaterialComFromSelect',
          'x-component-props': {
            placeholder: '请选择来源',
            useCode: true
          }
        },
      },
    ],
  }
)