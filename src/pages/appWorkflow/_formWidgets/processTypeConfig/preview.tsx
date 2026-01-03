import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import ProcessTypeConfigDataSelect from "@/pages/appWorkflow/_utils/processTypeConfigSelect";

export const ProcessTypeConfigSelect: DnFC<React.ComponentProps<typeof ProcessTypeConfigDataSelect>> = ProcessTypeConfigDataSelect

ProcessTypeConfigSelect.Behavior = createBehavior(
  {
    name: 'ProcessTypeConfigSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'ProcessTypeConfigSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '流程定义选择',
      }
    },
  }
)

ProcessTypeConfigSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "流程定义选择",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '流程定义选择',
          'x-decorator': 'FormItem',
          'x-component': 'ProcessTypeConfigSelect',
        },
      },
    ],
  }
)
