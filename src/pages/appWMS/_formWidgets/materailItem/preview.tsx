import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import MaterailItemDataSelect from "@/pages/appWMS/_utils/materailItemSelect";

export const MaterailItemSelect: DnFC<React.ComponentProps<typeof MaterailItemDataSelect>> = MaterailItemDataSelect

MaterailItemSelect.Behavior = createBehavior(
  {
    name: 'MaterailItemSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'MaterailItemSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '物料选择器',
      }
    },
  }
)

MaterailItemSelect.Resource = createResource(
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
          'x-component': 'MaterailItemSelect',
        },
      },
    ],
  }
)
