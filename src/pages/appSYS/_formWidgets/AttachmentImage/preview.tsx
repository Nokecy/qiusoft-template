import React from 'react';
import { createBehavior, createResource } from '@nokecy/designable-core';
import { DnFC } from '@nokecy/designable-react';
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd';
import { createFieldSchema } from '@nokecy/designable-formily-antd';
import AttachmentImageData from '@/components/uploadTable/uploadImage';

export const AttachmentImageContent: DnFC<React.ComponentProps<typeof AttachmentImageData>> = AttachmentImageData;

AttachmentImageContent.Behavior = createBehavior({
	name: 'AttachmentImageContent',
	extends: ['Field'],
	selector: node => node.props['x-component'] === 'AttachmentImageContent',
	designerProps: {
		propsSchema: createFieldSchema(AllSchemas.Select),
	},
	designerLocales: {
		// ...AllLocales.Input,
		'zh-CN': {
			...AllLocales.Input['zh-CN'],
			title: '图片上传',
		},
	},
});

AttachmentImageContent.Resource = createResource({
	icon: 'InputSource',
	elements: [
		{
			componentName: 'Field',
			props: {
				type: 'string',
				title: '图片上传',
				'x-decorator': 'FormItem',
				'x-component': 'AttachmentImageContent',
			},
		},
	],
});
