import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import WorkLineSelectComponent from "@/pages/appCommon/_utils/WorkLineSelect";

export const WorkLineSelect: DnFC<React.ComponentProps<typeof WorkLineSelectComponent>> = WorkLineSelectComponent

WorkLineSelect.Behavior = createBehavior(
  {
    name: 'WorkLineSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'WorkLineSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '线体选择器',
      }
    },
  }
)

WorkLineSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "线体选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '线体选择器',
          'x-decorator': 'FormItem',
          'x-component': 'WorkLineSelect',
          'x-component-props': {
            placeholder: '请选择线体',
            useCode: true,
            enableLinkage: false
          }
        },
      },
    ],
  }
)