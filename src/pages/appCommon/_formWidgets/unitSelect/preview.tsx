import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import UnitSelectComponent from "@/pages/appCommon/_utils/UnitSelect";

export const UnitSelect: DnFC<React.ComponentProps<typeof UnitSelectComponent>> = UnitSelectComponent

UnitSelect.Behavior = createBehavior(
  {
    name: 'UnitSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'UnitSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '单位选择器',
      }
    },
  }
)

UnitSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "单位选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '单位选择器',
          'x-decorator': 'FormItem',
          'x-component': 'UnitSelect',
          'x-component-props': {
            placeholder: '请选择单位',
            useCode: true,
            enableLinkage: false
          }
        },
      },
    ],
  }
)