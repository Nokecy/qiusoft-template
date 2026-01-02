import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import LabelTypeDataSelect from "@/pages/appSYS/_utils/labelTypeSelect";

export const LabelTypeSelect: DnFC<React.ComponentProps<typeof LabelTypeDataSelect>> = LabelTypeDataSelect

LabelTypeSelect.Behavior = createBehavior(
  {
    name: 'LabelTypeSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'LabelTypeSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '标签类型选择器',
      }
    },
  }
)

LabelTypeSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "标签类型选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '标签类型选择器',
          'x-decorator': 'FormItem',
          'x-component': 'LabelTypeSelect',
        },
      },
    ],
  }
)
