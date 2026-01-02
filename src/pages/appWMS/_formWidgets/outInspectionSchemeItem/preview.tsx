import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import OutInspectionSchemeItemDataSelect from "@/pages/appWMS/_utils/outInspectionSchemeItemSelect";

export const OutInspectionSchemeItemSelect: DnFC<React.ComponentProps<typeof OutInspectionSchemeItemDataSelect>> = OutInspectionSchemeItemDataSelect

OutInspectionSchemeItemSelect.Behavior = createBehavior(
  {
    name: 'OutInspectionSchemeItemSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'OutInspectionSchemeItemSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '检验属性选择器',
      }
    },
  }
)

OutInspectionSchemeItemSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "检验属性选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '检验属性选择器',
          'x-decorator': 'FormItem',
          'x-component': 'OutInspectionSchemeItemSelect',
        },
      },
    ],
  }
)
