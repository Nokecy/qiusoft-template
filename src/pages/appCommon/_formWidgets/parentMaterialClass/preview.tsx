import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import ParentMaterialClassSelectComponent from "@/pages/appCommon/_utils/ParentMaterialClassSelect";

export const ParentMaterialClassSelect: DnFC<React.ComponentProps<typeof ParentMaterialClassSelectComponent>> = ParentMaterialClassSelectComponent

ParentMaterialClassSelect.Behavior = createBehavior(
  {
    name: 'ParentMaterialClassSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ParentMaterialClassSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '父级物料分类选择器',
      }
    },
  }
)

ParentMaterialClassSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "父级物料分类选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'number',
          title: '父级物料分类选择器',
          'x-decorator': 'FormItem',
          'x-component': 'ParentMaterialClassSelect',
          'x-component-props': {
            placeholder: '请选择父级分类',
            allowClear: true,
            useCode: false
          }
        },
      },
    ],
  }
)