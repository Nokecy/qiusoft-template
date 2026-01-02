import type { ISchema } from '@formily/json-schema';

export const formId = 'DocumentReleaseForm';

export const formSchema = {
	form: {
		labelCol: 6,
		wrapperCol: 18,
		labelAlign: 'right',
		labelWidth: 120,
		feedbackLayout: 'none',
	},
	schema: {
		type: 'object',
		properties: {
			// 基础信息卡片
			basicInfo: {
				type: 'void',
				'x-component': 'Card',
				'x-component-props': {
					title: '基础信息',
					size: 'small',
					style: { marginBottom: 16 },
				},
				properties: {
					grid1: {
						type: 'void',
						'x-component': 'FormGrid',
						'x-component-props': { maxColumns: 2, strictAutoFit: true },
						properties: {
							col1: {
								type: 'void',
								'x-component': 'FormGrid.GridColumn',
								'x-component-props': { gridSpan: 2 },
								properties: {
									releaseNumber: {
										type: 'string',
										title: '发放单号',
										'x-decorator': 'FormItem',
										'x-component': 'Input',
										'x-component-props': {
											placeholder: '请输入发放单号',
										},
									},
								},
							},
							col2: {
								type: 'void',
								'x-component': 'FormGrid.GridColumn',
								'x-component-props': { gridSpan: 2 },
								properties: {
									title: {
										type: 'string',
										title: '发放标题',
										required: true,
										'x-decorator': 'FormItem',
										'x-component': 'Input',
										'x-component-props': {
											placeholder: '请输入发放标题',
										},
									},
								},
							},
							col3: {
								type: 'void',
								'x-component': 'FormGrid.GridColumn',
								'x-component-props': { gridSpan: 2 },
								properties: {
									description: {
										type: 'string',
										title: '发放说明',
										'x-decorator': 'FormItem',
										'x-component': 'Input.TextArea',
										'x-component-props': {
											rows: 3,
											placeholder: '请输入发放说明',
										},
									},
								},
							},
							col4: {
								type: 'void',
								'x-component': 'FormGrid.GridColumn',
								'x-component-props': { gridSpan: 1 },
								properties: {
									approverId: {
										type: 'string',
										title: '审批人',
										required: true,
										'x-decorator': 'FormItem',
										'x-component': 'UserSelect',
										'x-component-props': {
											placeholder: '请选择审批人',
											labelInValue: true,
											labelField: 'name',
											valueField: 'userName',
										},
									},
								},
							},
							col5: {
								type: 'void',
								'x-component': 'FormGrid.GridColumn',
								'x-component-props': { gridSpan: 2 },
								properties: {
									recipientIds: {
										type: 'array',
										title: '发放对象',
										required: true,
										'x-decorator': 'FormItem',
										'x-component': 'UserSelect',
										'x-component-props': {
											mode: 'multiple',
											placeholder: '请选择发放对象',
											labelInValue: true,
										},
									},
								},
							},
						},
					},
				},
			},
			// 文档明细
			documentsInfo: {
				type: 'void',
				'x-component': 'Card',
				'x-component-props': {
					title: '文档明细',
					size: 'small',
					style: { marginBottom: 16 },
				},
				properties: {
					documents: {
						type: 'array',
						'x-decorator': 'FormItem',
						'x-component': 'ArrayTable',
						'x-component-props': {
							gridKey: 'document-release-documents-table',
							pagination: false,
						},
						items: {
							type: 'object',
							properties: {
								column1: {
									type: 'void',
									'x-component': 'ArrayTable.Column',
									'x-component-props': { title: '文档信息', width: 200 },
									properties: {
										documentSelect: {
											type: 'object',
											'x-decorator': 'FormItem',
											'x-component': 'PreviewText',
											'x-reactions': {
												fulfill: {
													state: {
														value: '{{$self.value?.documentNumber || ""}}',
													},
												},
											},
										},
									},
								},
								column2: {
									type: 'void',
									'x-component': 'ArrayTable.Column',
									'x-component-props': { title: '文档编号', width: 150 },
									properties: {
										documentNumber: {
											type: 'string',
											'x-component': 'Input',
											'x-component-props': {
												disabled: true,
												placeholder: '选择文档后自动填充',
											},
											'x-reactions': {
												dependencies: ['.documentSelect'],
												fulfill: {
													state: {
														value: '{{$deps[0]?.documentNumber || ""}}',
													},
												},
											},
										},
									},
								},
								column3: {
									type: 'void',
									'x-component': 'ArrayTable.Column',
									'x-component-props': { title: '文档名称', width: 200 },
									properties: {
										documentName: {
											type: 'string',
											'x-component': 'Input',
											'x-component-props': {
												disabled: true,
												placeholder: '选择文档后自动填充',
											},
											'x-reactions': {
												dependencies: ['.documentSelect'],
												fulfill: {
													state: {
														value: '{{$deps[0]?.documentName || ""}}',
													},
												},
											},
										},
									},
								},
								column4: {
									type: 'void',
									'x-component': 'ArrayTable.Column',
									'x-component-props': { title: '份数', width: 100 },
									properties: {
										copies: {
											type: 'number',
											'x-decorator': 'FormItem',
											'x-component': 'NumberPicker',
											'x-component-props': {
												min: 1,
												precision: 0,
											},
											default: 1,
										},
									},
								},
								column5: {
									type: 'void',
									'x-component': 'ArrayTable.Column',
									'x-component-props': { title: '是否首次发放', width: 120 },
									properties: {
										isFirstRelease: {
											type: 'boolean',
											'x-decorator': 'FormItem',
											'x-component': 'Checkbox',
										},
									},
								},
								column6: {
									type: 'void',
									'x-component': 'ArrayTable.Column',
									'x-component-props': { title: '发放版本', width: 120 },
									properties: {
										releaseVersion: {
											type: 'string',
											'x-decorator': 'FormItem',
											'x-component': 'Input',
										},
									},
								},
								column7: {
									type: 'void',
									'x-component': 'ArrayTable.Column',
									'x-component-props': { title: '召回版本', width: 120 },
									properties: {
										recallVersion: {
											type: 'string',
											'x-decorator': 'FormItem',
											'x-component': 'Input',
										},
									},
								},
								column8: {
									type: 'void',
									'x-component': 'ArrayTable.Column',
									'x-component-props': { title: '生效日期', width: 150 },
									properties: {
										effectiveDate: {
											type: 'string',
											'x-decorator': 'FormItem',
											'x-component': 'DatePicker',
											'x-component-props': {
												format: 'YYYY-MM-DD',
											},
										},
									},
								},
								column9: {
									type: 'void',
									'x-component': 'ArrayTable.Column',
									'x-component-props': { title: '是否需要确认', width: 120 },
									properties: {
										requiresConfirmation: {
											type: 'boolean',
											'x-decorator': 'FormItem',
											'x-component': 'Checkbox',
										},
									},
								},
								column10: {
									type: 'void',
									'x-component': 'ArrayTable.Column',
									'x-component-props': { title: '不召回人员', width: 200 },
									properties: {
										nonRecallRecipientIds: {
											type: 'array',
											'x-decorator': 'FormItem',
											'x-component': 'UserSelect',
											'x-component-props': {
												mode: 'multiple',
											},
										},
									},
								},
								column11: {
									type: 'void',
									'x-component': 'ArrayTable.Column',
									'x-component-props': { title: '预期召回日期', width: 150 },
									properties: {
										expectedRecallDate: {
											type: 'string',
											'x-decorator': 'FormItem',
											'x-component': 'DatePicker',
											'x-component-props': {
												format: 'YYYY-MM-DD',
											},
										},
									},
								},
								column12: {
									type: 'void',
									'x-component': 'ArrayTable.Column',
									'x-component-props': { title: '备注', width: 200 },
									properties: {
										remarks: {
											type: 'string',
											'x-decorator': 'FormItem',
											'x-component': 'Input.TextArea',
											'x-component-props': {
												rows: 2,
											},
										},
									},
								},
								column13: {
									type: 'void',
									'x-component': 'ArrayTable.Column',
									'x-component-props': {
										title: '操作',
										dataIndex: 'operations',
										width: 100,
										fixed: 'right',
									},
									properties: {
										item: {
											type: 'void',
											'x-component': 'FormItem',
											properties: {
												remove: {
													type: 'void',
													'x-component': 'ArrayTable.Remove',
												},
											},
										},
									},
								},
							},
						},
						properties: {
							add: {
								type: 'void',
								'x-component': 'FormItem', // 禁用添加按钮，改用外部弹窗
								'x-visible': false,
								title: '添加文档',
							},
						},
					},
				},
			},
		},
	} as ISchema,
};
