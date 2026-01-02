import React from 'react';
import { createBehavior, createResource } from '@nokecy/designable-core';
import { DnFC } from '@nokecy/designable-react';
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd';
import { createFieldSchema } from '@nokecy/designable-formily-antd';
import AttachmentFileData from '@/components/uploadTable/uploadFile';

export const AttachmentFileContent: DnFC<React.ComponentProps<typeof AttachmentFileData>> = AttachmentFileData;

AttachmentFileContent.Behavior = createBehavior({
	name: 'AttachmentFileContent',
	extends: ['Field'],
	selector: node => node.props['x-component'] === 'AttachmentFileContent',
	designerProps: {
		propsSchema: createFieldSchema(AllSchemas.Select),
	},
	designerLocales: {
		// ...AllLocales.Input,
		'zh-CN': {
			...AllLocales.Input['zh-CN'],
			title: '文件上传',
		},
	},
});

AttachmentFileContent.Resource = createResource({
	icon: 'InputSource',
	elements: [
		{
			componentName: 'Field',
			props: {
				type: 'string',
				title: '文件上传',
				'x-decorator': 'FormItem',
				'x-component': 'AttachmentFileContent',
			},
		},
	],
});
