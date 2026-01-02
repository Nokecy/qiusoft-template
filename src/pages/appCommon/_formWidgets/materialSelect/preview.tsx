import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import MaterialSelectComponent from "@/pages/appCommon/_utils/MaterialSelect";

export const MaterialSelect: DnFC<React.ComponentProps<typeof MaterialSelectComponent>> = MaterialSelectComponent

MaterialSelect.Behavior = createBehavior(
  {
    name: 'MaterialSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'MaterialSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '物料选择器',
      }
    },
  }
)

MaterialSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "物料选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '物料选择器',
          'x-decorator': 'FormItem',
          'x-component': 'MaterialSelect',
          'x-component-props': {
            placeholder: '请选择物料',
            useCode: true,
            enableLinkage: false
          }
        },
      },
    ],
  }
)