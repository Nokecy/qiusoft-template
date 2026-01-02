import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import UnitGroupSelectComponent from "@/pages/appCommon/_utils/UnitGroupSelect";

export const UnitGroupSelect: DnFC<React.ComponentProps<typeof UnitGroupSelectComponent>> = UnitGroupSelectComponent

UnitGroupSelect.Behavior = createBehavior(
  {
    name: 'UnitGroupSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'UnitGroupSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '单位组选择器',
      }
    },
  }
)

UnitGroupSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "单位组选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'number',
          title: '单位组选择器',
          'x-decorator': 'FormItem',
          'x-component': 'UnitGroupSelect',
          'x-component-props': {
            placeholder: '请选择单位组',
            allowClear: true
          }
        },
      },
    ],
  }
)