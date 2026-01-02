import React from 'react';
import { createBehavior, createResource } from '@nokecy/designable-core';
import { DnFC } from '@nokecy/designable-react';
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd';
import { createFieldSchema } from '@nokecy/designable-formily-antd';
import ImportPublicDataSelect from '../../_utils/importPublicInForm';

export const ImportPublicInForm: DnFC<React.ComponentProps<typeof ImportPublicDataSelect>> = ImportPublicDataSelect;

ImportPublicInForm.Behavior = createBehavior({
	name: 'ImportPublicInForm',
	extends: ['Field'],
	selector: node => node.props['x-component'] === 'ImportPublicInForm',
	designerProps: {
		propsSchema: createFieldSchema(AllSchemas.Select),
	},
	designerLocales: {
		// ...AllLocales.Input,
		'zh-CN': {
			...AllLocales.Input['zh-CN'],
			title: 'ImportPublic选择',
		},
	},
});

ImportPublicInForm.Resource = createResource({
	icon: 'InputSource',
	elements: [
		{
			componentName: 'Field',
			props: {
				type: 'string',
				title: 'ImportPublic选择',
				'x-decorator': 'FormItem',
				'x-component': 'ImportPublicInForm',
			},
		},
	],
});
