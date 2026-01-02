import React from 'react';
import { createBehavior, createResource } from '@nokecy/designable-core';
import { DnFC } from '@nokecy/designable-react';
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd';
import { createFieldSchema } from '@nokecy/designable-formily-antd';
import ConsignerDataSelect from '@/pages/appSmartErp/_utils/consignerSelect';

export const ConsignerSelect: DnFC<React.ComponentProps<typeof ConsignerDataSelect>> = ConsignerDataSelect;

ConsignerSelect.Behavior = createBehavior({
	name: 'ConsignerSelect',
	extends: ['Field'],
	selector: node => node.props['x-component'] === 'ConsignerSelect',
	designerProps: {
		propsSchema: createFieldSchema(AllSchemas.Select),
	},
	designerLocales: {
		// ...AllLocales.Input,
		'zh-CN': {
			...AllLocales.Select['zh-CN'],
			title: '跟单员选择',
		},
	},
});

ConsignerSelect.Resource = createResource({
	icon: 'InputSource',
	title: '跟单员选择',
	elements: [
		{
			componentName: 'Field',
			props: {
				type: 'string',
				title: '跟单员选择',
				'x-decorator': 'FormItem',
				'x-component': 'ConsignerSelect',
			},
		},
	],
});
