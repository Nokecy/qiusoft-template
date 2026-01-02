import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import WorkCenterSelectComponent from "@/pages/appCommon/_utils/WorkCenterSelect";

export const WorkCenterSelect: DnFC<React.ComponentProps<typeof WorkCenterSelectComponent>> = WorkCenterSelectComponent

WorkCenterSelect.Behavior = createBehavior(
  {
    name: 'WorkCenterSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'WorkCenterSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '工作中心选择器',
      }
    },
  }
)

WorkCenterSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "工作中心选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '工作中心选择器',
          'x-decorator': 'FormItem',
          'x-component': 'WorkCenterSelect',
          'x-component-props': {
            placeholder: '请选择工作中心',
            useCode: true,
            enableLinkage: false
          }
        },
      },
    ],
  }
)