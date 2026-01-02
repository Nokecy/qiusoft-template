import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import WorkTeamSelectComponent from "@/pages/appCommon/_utils/WorkTeamSelect";

export const WorkTeamSelect: DnFC<React.ComponentProps<typeof WorkTeamSelectComponent>> = WorkTeamSelectComponent

WorkTeamSelect.Behavior = createBehavior(
  {
    name: 'WorkTeamSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'WorkTeamSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '班组选择器',
      }
    },
  }
)

WorkTeamSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "班组选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '班组选择器',
          'x-decorator': 'FormItem',
          'x-component': 'WorkTeamSelect',
          'x-component-props': {
            placeholder: '请选择班组',
            useCode: true,
            enableLinkage: false
          }
        },
      },
    ],
  }
)