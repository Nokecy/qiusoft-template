import React from 'react'
import { createBehavior, createResource } from '@nokecy/designable-core'
import { DnFC } from '@nokecy/designable-react'
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd'
import { createFieldSchema } from "@nokecy/designable-formily-antd";
import LabelTypeAdvancedSettingProviderDataSelect from "@/pages/appSYS/_utils/labelTypeAdvancedSettingProviderSelect";

export const LabelTypeAdvancedSettingProviderSelect: DnFC<React.ComponentProps<typeof LabelTypeAdvancedSettingProviderDataSelect>> = LabelTypeAdvancedSettingProviderDataSelect

LabelTypeAdvancedSettingProviderSelect.Behavior = createBehavior(
  {
    name: 'LabelTypeAdvancedSettingProviderSelect',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'LabelTypeAdvancedSettingProviderSelect',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Select),
    },
    designerLocales: {
      // ...AllLocales.Input,
      'zh-CN': {
        ...AllLocales.Select['zh-CN'],
        title: '标签类型提供者选择器',
      }
    },
  }
)

LabelTypeAdvancedSettingProviderSelect.Resource = createResource(
  {
    icon: 'InputSource',
    title: "标签类型提供者选择器",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: '标签类型提供者选择器',
          'x-decorator': 'FormItem',
          'x-component': 'LabelTypeAdvancedSettingProviderSelect',
        },
      },
    ],
  }
)
