import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import EmployeeSelectComponent from "@/pages/appCommon/_utils/EmployeeSelect";

export const EmployeeSelect: DnFC<React.ComponentProps<typeof EmployeeSelectComponent>> = EmployeeSelectComponent

EmployeeSelect.Behavior = createBehavior(
  {
    name: 'EmployeeSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'EmployeeSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '员工选择器',
      }
    },
  }
)

EmployeeSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "员工选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '员工选择器',
          'x-decorator': 'FormItem',
          'x-component': 'EmployeeSelect',
          'x-component-props': {
            placeholder: '请选择员工',
            useCode: true,
            enableLinkage: false
          }
        },
      },
    ],
  }
)