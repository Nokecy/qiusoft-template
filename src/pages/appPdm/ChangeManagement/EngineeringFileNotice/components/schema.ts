import { ISchema } from '@formily/react';

export const executeSchema = (): ISchema => {
	return {
		type: 'object',
		properties: {
			basicInfo: {
				type: 'void',
				'x-component': 'Card',
				'x-component-props': {
					title: '基本信息',
					size: 'small',
				},
				properties: {
					grid: {
						type: 'void',
						'x-component': 'FormGrid',
						'x-component-props': {
							strictAutoFit: true,
							maxColumns: 3,
							minColumns: 1,
						},
						properties: {
							number: {
								type: 'string',
								title: '通知单号',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								'x-pattern': 'readPretty',
							},
							partNo: {
								type: 'string',
								title: '物料编号',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								'x-pattern': 'readPretty',
							},
							partName: {
								type: 'string',
								title: '物料名称',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								'x-pattern': 'readPretty',
							},
							docNo: {
								type: 'string',
								title: '图纸编号',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								'x-pattern': 'readPretty',
							},
							docName: {
								type: 'string',
								title: '图纸名称',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								'x-pattern': 'readPretty',
							},
							docVersion: {
								type: 'string',
								title: '图纸版本',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								'x-pattern': 'readPretty',
							},
							documentTypeName: {
								type: 'string',
								title: '图纸类型',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								'x-pattern': 'readPretty',
							},
							changePage: {
								type: 'string',
								title: '变更页数',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								'x-pattern': 'readPretty',
							},
							changeVersion: {
								type: 'boolean',
								title: '是否变更版本',
								'x-decorator': 'FormItem',
								'x-component': 'Select',
								enum: [
									{ label: '是', value: true },
									{ label: '否', value: false },
								],
								'x-pattern': 'readPretty',
							},
							hwOrderNumber: {
								type: 'string',
								title: 'HW单号',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								'x-pattern': 'readPretty',
							},
							orderStatus: {
								type: 'string',
								title: '状态',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								'x-pattern': 'readPretty',
							},
							modifyContent: {
								type: 'string',
								title: '修改内容',
								'x-decorator': 'FormItem',
								'x-component': 'Input.TextArea',
								'x-component-props': {
									autoSize: true,
								},
								'x-decorator-props': {
									gridSpan: 3,
								},
								'x-pattern': 'readPretty',
							},
							note: {
								type: 'string',
								title: '备注',
								'x-decorator': 'FormItem',
								'x-component': 'Input.TextArea',
								'x-component-props': {
									autoSize: true,
								},
								'x-decorator-props': {
									gridSpan: 3,
								},
								'x-pattern': 'readPretty',
							},
							attachmentDisplay: {
								type: 'string',
								title: '附件',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								'x-pattern': 'readPretty',
								'x-reactions': {
									dependencies: ['docName', 'blobName'],
									fulfill: {
										state: {
											value: '{{$deps[0]}}',
										},
									},
								},
							},
						},
					},
				},
			},
			auditCraftCard: {
				type: 'void',
				'x-component': 'Card',
				'x-component-props': {
					title: '工艺审批',
					size: 'small',
					style: { marginTop: 16 },
				},
				properties: {
					grid: {
						type: 'void',
						'x-component': 'FormGrid',
						'x-component-props': {
							strictAutoFit: true,
							maxColumns: 2,
							minColumns: 1,
						},
						properties: {
							'{value:auditWorkShopUserCode,label:auditWorkShopUserName}': {
								type: 'string',
								title: '车间主任',
								'x-decorator': 'FormItem',
								'x-component': 'UserSelect',
								'x-component-props': {
									labelInValue: true,
									placeholder: '请选择车间主任',
									labelField: 'name',
									valueField: 'userName',
								},
								'x-pattern': "{{$workflowInfo.currentActivityName === '工艺审批人' ? 'editable' : 'readPretty'}}",
							},
							auditCraftReason: {
								type: 'string',
								title: '审批意见',
								'x-decorator': 'FormItem',
								'x-component': 'Input.TextArea',
								'x-component-props': {
									placeholder: '请输入审批意见',
									autoSize: true,
								},
								'x-pattern': "{{$workflowInfo.currentActivityName === '工艺审批人' ? 'editable' : 'readPretty'}}",
							},
						},
					},
				},
			},
			auditWorkshopCard: {
				type: 'void',
				'x-component': 'Card',
				'x-component-props': {
					title: '车间主任审批',
					size: 'small',
					style: { marginTop: 16 },
				},
				'x-reactions': {
					fulfill: {
						state: {
							visible:
								"{{$workflowInfo.currentActivityName === '车间主任' || ($workflowInfo.executionActivityNames && $workflowInfo.executionActivityNames.indexOf('车间主任') >= 0) ? true : false}}",
						},
					},
				},
				properties: {
					grid: {
						type: 'void',
						'x-component': 'FormGrid',
						'x-component-props': {
							strictAutoFit: true,
							maxColumns: 2,
							minColumns: 1,
						},
						properties: {
							storageLibraryId: {
								type: 'string',
								title: '存储库',
								'x-decorator': 'FormItem',
								'x-component': 'DocumentLibrarySelect',
								'x-component-props': {
									placeholder: '请选择存储库',
									libraryType: 1,
								},
								'x-pattern': "{{$workflowInfo.currentActivityName === '车间主任' && $form.values.archiveType == 0 ? 'editable' : 'readPretty'}}",
								'x-reactions': {
									fulfill: {
										state: {
											required: "{{$workflowInfo.currentActivityName === '车间主任' && $form.values.archiveType == 0}}",
											visible: "{{$workflowInfo.currentActivityName === '车间主任' && $form.values.archiveType == 0}}"
										},
									},
								},
							},
							recycleLibraryId: {
								type: 'string',
								title: '回收库',
								'x-decorator': 'FormItem',
								'x-component': 'DocumentLibrarySelect',
								'x-component-props': {
									placeholder: '请选择回收库',
									libraryType: 2,
								},
								'x-pattern': "{{$workflowInfo.currentActivityName === '车间主任' && $form.values.archiveType == 0 ? 'editable' : 'readPretty'}}",
								'x-reactions': {
									fulfill: {
										state: {
											required: "{{$workflowInfo.currentActivityName === '车间主任' && $form.values.archiveType == 0}}",
											visible: "{{$workflowInfo.currentActivityName === '车间主任' && $form.values.archiveType == 0}}"
										},
									},
								},
							},
							auditWorkShopReason: {
								type: 'string',
								title: '审批意见',
								'x-decorator': 'FormItem',
								'x-component': 'Input.TextArea',
								'x-component-props': {
									placeholder: '请输入审批意见',
									autoSize: true,
								},
								'x-pattern': "{{$workflowInfo.currentActivityName === '车间主任' ? 'editable' : 'readPretty'}}",
							},
						},
					},
				},
			},
		},
	};
};
