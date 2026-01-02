import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import MaterialPickTaskTypeDataSelect from "@/pages/appWMS/_utils/materialPickTaskTypeSelect";

export const MaterialPickTaskTypeSelect: DnFC<React.ComponentProps<typeof MaterialPickTaskTypeDataSelect>> = MaterialPickTaskTypeDataSelect

MaterialPickTaskTypeSelect.Behavior = createBehavior(
  {
    name: 'MaterialPickTaskTypeSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'MaterialPickTaskTypeSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '下架类型选择器',
      }
    },
  }
)

MaterialPickTaskTypeSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "下架类型选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '下架类型选择器',
          'x-decorator': 'FormItem',
          'x-component': 'MaterialPickTaskTypeSelect',
        },
      },
    ],
  }
)
