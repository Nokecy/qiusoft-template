import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import DepartmentSelectComponent from "@/pages/appCommon/_utils/DepartmentSelect";

export const DepartmentSelect: DnFC<React.ComponentProps<typeof DepartmentSelectComponent>> = DepartmentSelectComponent

DepartmentSelect.Behavior = createBehavior(
  {
    name: 'DepartmentSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'DepartmentSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '部门选择器',
      }
    },
  }
)

DepartmentSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "部门选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '部门选择器',
          'x-decorator': 'FormItem',
          'x-component': 'DepartmentSelect',
          'x-component-props': {
            placeholder: '请选择部门',
            useCode: true,
            enableLinkage: false
          }
        },
      },
    ],
  }
)