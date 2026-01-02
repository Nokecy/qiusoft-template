import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import SupplierSelectComponent from "@/pages/appCommon/_utils/SupplierSelect";

export const SupplierSelect: DnFC<React.ComponentProps<typeof SupplierSelectComponent>> = SupplierSelectComponent

SupplierSelect.Behavior = createBehavior(
  {
    name: 'SupplierSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'SupplierSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '供应商选择器',
      }
    },
  }
)

SupplierSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "供应商选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '供应商选择器',
          'x-decorator': 'FormItem',
          'x-component': 'SupplierSelect',
          'x-component-props': {
            placeholder: '请选择供应商',
            useCode: true,
            enableLinkage: false
          }
        },
      },
    ],
  }
)