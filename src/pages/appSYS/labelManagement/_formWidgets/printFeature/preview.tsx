import React from 'react';
import { createBehavior, createResource } from '@nokecy/designable-core';
import { DnFC } from '@nokecy/designable-react';
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd';
import { createFieldSchema } from '@nokecy/designable-formily-antd';
import PrintFeatureDataSelect from '../../_utils/printFeatureSelect';

export const PrintFeatureSelect: DnFC<React.ComponentProps<typeof PrintFeatureDataSelect>> =
  PrintFeatureDataSelect;

PrintFeatureSelect.Behavior = createBehavior({
  name: 'PrintFeatureSelect',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'PrintFeatureSelect',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Select),
  },
  designerLocales: {
    'zh-CN': {
      ...AllLocales.Select['zh-CN'],
      title: '打印功能选择器',
    },
  },
});

PrintFeatureSelect.Resource = createResource({
  icon: 'InputSource',
  title: '打印功能选择器',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        title: '打印功能选择器',
        'x-decorator': 'FormItem',
        'x-component': 'PrintFeatureSelect',
      },
    },
  ],
});
