import React from 'react';
import { createBehavior, createResource } from '@nokecy/designable-core';
import { DnFC } from '@nokecy/designable-react';
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd';
import { createFieldSchema } from '@nokecy/designable-formily-antd';
import PublicDataSelect from '../../_utils/publicSelect';

export const PublicSelect: DnFC<React.ComponentProps<typeof PublicDataSelect>> = PublicDataSelect;

PublicSelect.Behavior = createBehavior({
	name: 'PublicSelect',
	extends: ['Field'],
	selector: node => node.props['x-component'] === 'PublicSelect',
	designerProps: {
		propsSchema: createFieldSchema(AllSchemas.Select),
	},
	designerLocales: {
		// ...AllLocales.Input,
		'zh-CN': {
			...AllLocales.Input['zh-CN'],
			title: 'public选择',
		},
	},
});

PublicSelect.Resource = createResource({
	icon: 'InputSource',
	elements: [
		{
			componentName: 'Field',
			props: {
				type: 'string',
				title: 'public选择',
				'x-decorator': 'FormItem',
				'x-component': 'PublicSelect',
			},
		},
	],
});
