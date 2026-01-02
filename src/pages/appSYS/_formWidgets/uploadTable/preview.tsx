import React from 'react';
import { createBehavior, createResource } from '@nokecy/designable-core';
import { DnFC } from '@nokecy/designable-react';
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd';
import { createFieldSchema } from '@nokecy/designable-formily-antd';
import UploadDataTable from '@/components/uploadTable';

export const UploadTableDraw: DnFC<React.ComponentProps<typeof UploadDataTable>> = UploadDataTable;

UploadTableDraw.Behavior = createBehavior({
	name: 'UploadTableDraw',
	extends: ['Field'],
	selector: node => node.props['x-component'] === 'UploadTableDraw',
	designerProps: {
		propsSchema: createFieldSchema(AllSchemas.Select),
	},
	designerLocales: {
		// ...AllLocales.Input,
		'zh-CN': {
			...AllLocales.Input['zh-CN'],
			title: '附件表格上传',
		},
	},
});

UploadTableDraw.Resource = createResource({
	icon: 'InputSource',
	elements: [
		{
			componentName: 'Field',
			props: {
				type: 'string',
				title: '附件表格上传',
				'x-decorator': 'FormItem',
				'x-component': 'UploadTableDraw',
			},
		},
	],
});
