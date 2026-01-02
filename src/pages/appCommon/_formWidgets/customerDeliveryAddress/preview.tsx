import React from 'react';
import { createBehavior, createResource } from '@nokecy/designable-core';
import { DnFC } from '@nokecy/designable-react';
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd';
import { createFieldSchema } from '@nokecy/designable-formily-antd';
import CustomerDeliveryAddressDataSelect from '@/pages/appCommon/_utils/CustomerDeliveryAddressSelect';

export const CustomerDeliveryAddressSelect: DnFC<React.ComponentProps<typeof CustomerDeliveryAddressDataSelect>> = CustomerDeliveryAddressDataSelect;

CustomerDeliveryAddressSelect.Behavior = createBehavior({
	name: 'CustomerDeliveryAddressSelect',
	extends: ['Field'],
	selector: node => node.props['x-component'] === 'CustomerDeliveryAddressSelect',
	designerProps: {
		propsSchema: createFieldSchema(AllSchemas.Select),
	},
	designerLocales: {
		// ...AllLocales.Input,
		'zh-CN': {
			...AllLocales.Select['zh-CN'],
			title: '送货地址',
		},
	},
});

CustomerDeliveryAddressSelect.Resource = createResource({
	icon: 'InputSource',
	title: '送货地址',
	elements: [
		{
			componentName: 'Field',
			props: {
				type: 'string',
				title: '送货地址',
				'x-decorator': 'FormItem',
				'x-component': 'CustomerDeliveryAddressSelect',
			},
		},
	],
});
