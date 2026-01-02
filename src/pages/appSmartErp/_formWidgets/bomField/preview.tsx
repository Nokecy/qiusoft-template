import React from 'react';
import { createBehavior, createResource } from '@nokecy/designable-core';
import { DnFC } from '@nokecy/designable-react';
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd';
import { createFieldSchema } from '@nokecy/designable-formily-antd';
import BomFieldDataSelect from '@/pages/appSmartErp/_utils/bomField';

export const BomFieldSelect: DnFC<React.ComponentProps<typeof BomFieldDataSelect>> = BomFieldDataSelect;

BomFieldSelect.Behavior = createBehavior({
	name: 'BomFieldSelect',
	extends: ['Field'],
	selector: node => node.props['x-component'] === 'BomFieldSelect',
	designerProps: {
		propsSchema: createFieldSchema(AllSchemas.Select),
	},
	designerLocales: {
		// ...AllLocales.Input,
		'zh-CN': {
			...AllLocales.Input['zh-CN'],
			title: '销售BOM修改',
		},
	},
});

BomFieldSelect.Resource = createResource({
	icon: 'InputSource',
	title: '销售BOM修改',
	elements: [
		{
			componentName: 'Field',
			props: {
				type: 'string',
				title: '销售BOM修改',
				'x-decorator': 'FormItem',
				'x-component': 'BomFieldSelect',
			},
		},
	],
});
