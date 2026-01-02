import React from 'react';
import { createBehavior, createResource } from '@nokecy/designable-core';
import { DnFC } from '@nokecy/designable-react';
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd';
import { createFieldSchema } from '@nokecy/designable-formily-antd';
import DownloadData from '@/components/downloadBtn';

export const DownloadContent: DnFC<React.ComponentProps<typeof DownloadData>> = DownloadData;

DownloadContent.Behavior = createBehavior({
	name: 'DownloadContent',
	extends: ['Field'],
	selector: node => node.props['x-component'] === 'DownloadContent',
	designerProps: {
		propsSchema: createFieldSchema(AllSchemas.Select),
	},
	designerLocales: {
		// ...AllLocales.Input,
		'zh-CN': {
			...AllLocales.Input['zh-CN'],
			title: '文件下载',
		},
	},
});

DownloadContent.Resource = createResource({
	icon: 'InputSource',
	elements: [
		{
			componentName: 'Field',
			props: {
				type: 'string',
				title: '文件下载',
				'x-decorator': 'FormItem',
				'x-component': 'DownloadContent',
			},
		},
	],
});
