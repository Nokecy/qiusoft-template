import React from 'react';
import { createBehavior, createResource } from '@nokecy/designable-core';
import { DnFC } from '@nokecy/designable-react';
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd';
import { createFieldSchema } from '@nokecy/designable-formily-antd';
import CustomerContactDataSelect from '@/pages/appCommon/_utils/CustomerContactSelect';

export const CustomerContactSelect: DnFC<React.ComponentProps<typeof CustomerContactDataSelect>> = CustomerContactDataSelect;

CustomerContactSelect.Behavior = createBehavior({
	name: 'CustomerContactSelect',
	extends: ['Field'],
	selector: node => node.props['x-component'] === 'CustomerContactSelect',
	designerProps: {
		propsSchema: createFieldSchema(AllSchemas.Select),
	},
	designerLocales: {
		// ...AllLocales.Input,
		'zh-CN': {
			...AllLocales.Select['zh-CN'],
			title: '客户联系人',
		},
	},
});

CustomerContactSelect.Resource = createResource({
	icon: 'InputSource',
	title: '客户联系人',
	elements: [
		{
			componentName: 'Field',
			props: {
				type: 'string',
				title: '客户联系人',
				'x-decorator': 'FormItem',
				'x-component': 'CustomerContactSelect',
			},
		},
	],
});
