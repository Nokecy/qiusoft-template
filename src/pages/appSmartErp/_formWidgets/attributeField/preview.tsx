import React from 'react';
import { createBehavior, createResource } from '@nokecy/designable-core';
import { DnFC } from '@nokecy/designable-react';
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd';
import { createFieldSchema } from '@nokecy/designable-formily-antd';
import AttributeFieldDataSelect from '@/pages/appSmartErp/_utils/attributeField';

export const AttributeFieldSelect: DnFC<React.ComponentProps<typeof AttributeFieldDataSelect>> = AttributeFieldDataSelect;

AttributeFieldSelect.Behavior = createBehavior({
	name: 'AttributeFieldSelect',
	extends: ['Field'],
	selector: node => node.props['x-component'] === 'AttributeFieldSelect',
	designerProps: {
		propsSchema: createFieldSchema(AllSchemas.Select),
	},
	designerLocales: {
		// ...AllLocales.Input,
		'zh-CN': {
			...AllLocales.Input['zh-CN'],
			title: 'BOM特性计算',
		},
	},
});

AttributeFieldSelect.Resource = createResource({
	icon: 'InputSource',
	title: 'BOM特性计算',
	elements: [
		{
			componentName: 'Field',
			props: {
				type: 'string',
				title: 'BOM特性计算',
				'x-decorator': 'FormItem',
				'x-component': 'AttributeFieldSelect',
			},
		},
	],
});
