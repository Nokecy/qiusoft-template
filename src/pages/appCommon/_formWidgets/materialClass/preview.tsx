import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import MaterialClassSelectComponent from "@/pages/appCommon/_utils/MaterialClassSelect";

export const MaterialClassSelect: DnFC<React.ComponentProps<typeof MaterialClassSelectComponent>> = MaterialClassSelectComponent

MaterialClassSelect.Behavior = createBehavior(
  {
    name: 'MaterialClassSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'MaterialClassSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '物料分类选择器',
      }
    },
  }
)

MaterialClassSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "物料分类选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '物料分类选择器',
          'x-decorator': 'FormItem',
          'x-component': 'MaterialClassSelect',
          'x-component-props': {
            placeholder: '请选择物料分类',
            useCode: true
          }
        },
      },
    ],
  }
)