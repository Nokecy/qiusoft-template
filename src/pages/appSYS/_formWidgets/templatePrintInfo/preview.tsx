import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import TemplatePrintInfoDataSelect from "@/pages/appSYS/_utils/templatePrintInfoSelect";

export const TemplatePrintInfoSelect: DnFC<React.ComponentProps<typeof TemplatePrintInfoDataSelect>> = TemplatePrintInfoDataSelect

TemplatePrintInfoSelect.Behavior = createBehavior(
  {
    name: 'TemplatePrintInfoSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'TemplatePrintInfoSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '打印模板选择器',
      }
    },
  }
)

TemplatePrintInfoSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "打印模板选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '打印模板选择器',
          'x-decorator': 'FormItem',
          'x-component': 'TemplatePrintInfoSelect',
        },
      },
    ],
  }
)
