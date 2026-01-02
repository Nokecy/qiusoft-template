import React from 'react';
import { createBehavior, createResource } from '@nokecy/designable-core';
import { DnFC } from '@nokecy/designable-react';
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd';
import { createFieldSchema } from '@nokecy/designable-formily-antd';
import SaleManDataSelect from '@/pages/appSmartErp/_utils/saleManSelect';

export const SaleManSelect: DnFC<React.ComponentProps<typeof SaleManDataSelect>> = SaleManDataSelect;

SaleManSelect.Behavior = createBehavior({
	name: 'SaleManSelect',
	extends: ['Field'],
	selector: node => node.props['x-component'] === 'SaleManSelect',
	designerProps: {
		propsSchema: createFieldSchema(AllSchemas.Select),
	},
	designerLocales: {
		// ...AllLocales.Input,
		'zh-CN': {
			...AllLocales.Select['zh-CN'],
			title: '销售员',
		},
	},
});

SaleManSelect.Resource = createResource({
	icon: 'InputSource',
	title: '销售员',
	elements: [
		{
			componentName: 'Field',
			props: {
				type: 'string',
				title: '销售员',
				'x-decorator': 'FormItem',
				'x-component': 'SaleManSelect',
			},
		},
	],
});
