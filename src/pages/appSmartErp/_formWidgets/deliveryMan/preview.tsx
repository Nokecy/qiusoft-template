import React from 'react';
import { createBehavior, createResource } from '@nokecy/designable-core';
import { DnFC } from '@nokecy/designable-react';
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd';
import { createFieldSchema } from '@nokecy/designable-formily-antd';
import DeliveryManDataSelect from '@/pages/appSmartErp/_utils/deliveryManSelect';

export const DeliveryManSelect: DnFC<React.ComponentProps<typeof DeliveryManDataSelect>> = DeliveryManDataSelect;

DeliveryManSelect.Behavior = createBehavior({
	name: 'DeliveryManSelect',
	extends: ['Field'],
	selector: node => node.props['x-component'] === 'DeliveryManSelect',
	designerProps: {
		propsSchema: createFieldSchema(AllSchemas.Select),
	},
	designerLocales: {
		// ...AllLocales.Input,
		'zh-CN': {
			...AllLocales.Select['zh-CN'],
			title: '送货员选择',
		},
	},
});

DeliveryManSelect.Resource = createResource({
	icon: 'InputSource',
	title: '送货员选择',
	elements: [
		{
			componentName: 'Field',
			props: {
				type: 'string',
				title: '送货员选择',
				'x-decorator': 'FormItem',
				'x-component': 'DeliveryManSelect',
			},
		},
	],
});
