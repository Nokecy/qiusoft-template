import React from 'react';
import { createBehavior, createResource } from '@nokecy/designable-core';
import { DnFC } from '@nokecy/designable-react';
import { AllSchemas, AllLocales } from '@nokecy/designable-formily-antd';
import { createFieldSchema } from '@nokecy/designable-formily-antd';
import AttachmentVideoData from '@/components/uploadTable/uploadVideo';

export const AttachmentVideoContent: DnFC<React.ComponentProps<typeof AttachmentVideoData>> = AttachmentVideoData;

AttachmentVideoContent.Behavior = createBehavior({
	name: 'AttachmentVideoContent',
	extends: ['Field'],
	selector: node => node.props['x-component'] === 'AttachmentVideoContent',
	designerProps: {
		propsSchema: createFieldSchema(AllSchemas.Select),
	},
	designerLocales: {
		// ...AllLocales.Input,
		'zh-CN': {
			...AllLocales.Input['zh-CN'],
			title: '视频上传',
		},
	},
});

AttachmentVideoContent.Resource = createResource({
	icon: 'InputSource',
	elements: [
		{
			componentName: 'Field',
			props: {
				type: 'string',
				title: '视频上传',
				'x-decorator': 'FormItem',
				'x-component': 'AttachmentVideoContent',
			},
		},
	],
});
