import type { ISchema } from '@formily/json-schema';

export const formId = 'DocumentArchiveForm';

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
							// 归档类型
							archiveType: {
								type: 'number',
								title: '归档类型',
								required: true,
								'x-decorator': 'FormItem',
								'x-component': 'Select',
								'x-component-props': {
									placeholder: '请选择归档类型',
								},
							},
							// 文档编码
							docNo: {
								type: 'string',
								title: '文档编码',
								required: true,
								'x-decorator': 'FormItem',
								// 非首次归档：下拉选择已有文档；首次归档/未选择归档类型：手工输入
								'x-component': '{{ $form.values?.archiveType === 1 || $form.values?.archiveType === 2 ? "DocumentSelect" : "Input" }}',
								'x-component-props': {
									placeholder: '{{ $form.values?.archiveType === 1 || $form.values?.archiveType === 2 ? "请搜索并选择已有文档" : "请输入文档编码" }}',
									labelInValue: true,
									publishState: 1,
								},
							},
							// 文档名称
							documentName: {
								type: 'string',
								title: '文档名称',
								required: true,
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								'x-component-props': {
									placeholder: '请输入文档名称',
								},
								'x-reactions': {
									dependencies: ['archiveType'],
									fulfill: {
										state: {
											pattern: "{{$deps[0] === 1 || $deps[0] === 2 ? 'disabled' : 'editable'}}",
										},
									},
								},
							},
							// 文档类型
							documentTypeId: {
								type: 'string',
								title: '文档类型',
								required: true,
								'x-decorator': 'FormItem',
								'x-component': 'DocumentTypeSelect',
								'x-component-props': {
									placeholder: '请选择文档类型',
								},
								'x-reactions': {
									dependencies: ['archiveType'],
									fulfill: {
										state: {
											pattern: "{{$deps[0] === 1 || $deps[0] === 2 ? 'disabled' : 'editable'}}",
										},
									},
								},
							},
							// 文档版本
							docVersion: {
								type: 'string',
								title: '文档版本',
								required: true,
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								'x-component-props': {
									placeholder: '请输入文档版本',
								},
							},
							// 物料编码
							partNo: {
								type: 'string',
								title: '物料编码',
								'x-decorator': 'FormItem',
								'x-component': 'PartSelect',
								'x-component-props': {
									placeholder: '请选择物料',
									enableLinkage: true,
								},
								'x-reactions': {
									dependencies: ['archiveType'],
									fulfill: {
										state: {
											pattern: "{{$deps[0] === 1 || $deps[0] === 2 ? 'disabled' : 'editable'}}",
										},
									},
								},
							},
							// 物料名称（联动显示）
							partName: {
								type: 'string',
								title: '物料名称',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								'x-component-props': {
									placeholder: '自动填充',
									disabled: true,
								},
							},
							// 审批人
							approverCode: {
								type: 'string',
								title: '审批人',
								required: true,
								'x-decorator': 'FormItem',
								'x-component': 'UserSelect',
								'x-component-props': {
									placeholder: '请选择审批人',
									valueField: 'userName',
									labelField: 'name',
									labelInValue: true,
								},
							},
							// 华为单号（只在变更归档时显示）
							hwOrderNumber: {
								type: 'string',
								title: '华为单号',
								required: true,
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								'x-component-props': {
									placeholder: '请输入华为单号',
								},
								'x-reactions': {
									dependencies: ['archiveType'],
									fulfill: {
										state: {
											visible: '{{$deps[0] === 1||$deps[0] === 2}}', // 只在变更归档时显示
										},
									},
								},
							},
							// 修改内容（跨两列）
							modifyContent: {
								type: 'string',
								title: '修改内容',
								required: true,
'x-decorator': 'FormItem',
								'x-decorator-props': {
									gridSpan: 2,
								},
								'x-component': 'Input.TextArea',
								'x-component-props': {
									rows: 3,
									placeholder: '请输入修改内容',
								},
							},
							// 描述（跨两列）
							remark: {
								type: 'string',
								title: '描述',
								'x-decorator': 'FormItem',
								'x-decorator-props': {
									gridSpan: 2,
								},
								'x-component': 'Input.TextArea',
								'x-component-props': {
									rows: 2,
									placeholder: '请输入描述',
								},
							},
							// 文件上传（跨两列）
							attachment: {
								type: 'object',
								title: '文件',
								required: true,
								'x-decorator': 'FormItem',
								'x-decorator-props': {
									gridSpan: 2,
								},
								'x-component': 'AttachmentUpload',
								'x-component-props': {
									maxSize: 50,
									description: '单击或将文件拖拽到该区域以上传',
								},
							},
						},
					},
				},
			},
			// 隐藏字段：文档类型编码和名称（用于提交）
			documentTypeCode: {
				type: 'string',
				'x-component': 'Input',
				'x-component-props': {
					style: { display: 'none' },
				},
			},
			documentTypeName: {
				type: 'string',
				'x-component': 'Input',
				'x-component-props': {
					style: { display: 'none' },
				},
			},
			// 隐藏字段：审批人名称（用于提交）
			approverName: {
				type: 'string',
				'x-component': 'Input',
				'x-component-props': {
					style: { display: 'none' },
				},
			},
		},
	} as ISchema,
};

// 只读模式的反应配置
const readOnlyReaction = {
	fulfill: {
		state: {
			pattern: 'readPretty' as const,
		},
	},
};

/**
 * 执行页面专用Schema - 所有字段只读
 * 用于工作流审批页面展示文档归档信息
 */
export const executeFormSchema: { form: Record<string, any>; schema: ISchema } = {
	form: {
		labelCol: 6,
		wrapperCol: 18,
		labelWidth: '100px',
		feedbackLayout: 'none',
	},
	schema: {
		type: 'object',
		properties: {
			grid: {
				type: 'void',
				'x-component': 'FormGrid',
				'x-component-props': { maxColumns: 2, strictAutoFit: true },
				properties: {
					col1: {
						type: 'void',
						'x-component': 'FormGrid.GridColumn',
						'x-component-props': { gridSpan: 2 },
						properties: {
							archiveNo: {
								type: 'string',
								title: '归档编号',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								name: 'archiveNo',
								'x-reactions': readOnlyReaction,
							},
						},
					},
					col2: {
						type: 'void',
						'x-component': 'FormGrid.GridColumn',
						'x-component-props': { gridSpan: 1 },
						properties: {
							docNo: {
								type: 'string',
								title: '文档编码',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								name: 'docNo',
								'x-reactions': readOnlyReaction,
							},
						},
					},
					col3: {
						type: 'void',
						'x-component': 'FormGrid.GridColumn',
						'x-component-props': { gridSpan: 1 },
						properties: {
							docVersion: {
								type: 'string',
								title: '文档版本',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								name: 'docVersion',
								'x-reactions': readOnlyReaction,
							},
						},
					},
					col4: {
						type: 'void',
						'x-component': 'FormGrid.GridColumn',
						'x-component-props': { gridSpan: 1 },
						properties: {
							documentTypeName: {
								type: 'string',
								title: '文档类型',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								name: 'documentTypeName',
								'x-reactions': readOnlyReaction,
							},
						},
					},
					col5: {
						type: 'void',
						'x-component': 'FormGrid.GridColumn',
						'x-component-props': { gridSpan: 1 },
						properties: {
							archiveType: {
								type: 'number',
								title: '归档类型',
								'x-decorator': 'FormItem',
								'x-component': 'Select',
								'x-component-props': {
									options: [
										{ label: '新品归档', value: 1 },
										{ label: '变更归档', value: 2 },
										{ label: '其他归档', value: 3 },
									],
								},
								name: 'archiveType',
								'x-reactions': readOnlyReaction,
							},
						},
					},
					col6: {
						type: 'void',
						'x-component': 'FormGrid.GridColumn',
						'x-component-props': { gridSpan: 1 },
						properties: {
							hwOrderNumber: {
								type: 'string',
								title: '华为单号',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								name: 'hwOrderNumber',
								'x-reactions': readOnlyReaction,
							},
						},
					},
					col7: {
						type: 'void',
						'x-component': 'FormGrid.GridColumn',
						'x-component-props': { gridSpan: 1 },
						properties: {
							partNo: {
								type: 'string',
								title: '物料编码',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								name: 'partNo',
								'x-reactions': readOnlyReaction,
							},
						},
					},
					col8: {
						type: 'void',
						'x-component': 'FormGrid.GridColumn',
						'x-component-props': { gridSpan: 1 },
						properties: {
							partName: {
								type: 'string',
								title: '物料名称',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								name: 'partName',
								'x-reactions': readOnlyReaction,
							},
						},
					},
					col9: {
						type: 'void',
						'x-component': 'FormGrid.GridColumn',
						'x-component-props': { gridSpan: 1 },
						properties: {
							approverName: {
								type: 'string',
								title: '审批人',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								name: 'approverName',
								'x-reactions': readOnlyReaction,
							},
						},
					},
					col10: {
						type: 'void',
						'x-component': 'FormGrid.GridColumn',
						'x-component-props': { gridSpan: 1 },
						properties: {
							status: {
								type: 'number',
								title: '状态',
								'x-decorator': 'FormItem',
								'x-component': 'Select',
								'x-component-props': {
									options: [
										{ label: '草稿', value: 0 },
										{ label: '待审批', value: 10 },
										{ label: '审批中', value: 20 },
										{ label: '已批准', value: 30 },
										{ label: '已拒绝', value: 40 },
									],
								},
								name: 'status',
								'x-reactions': readOnlyReaction,
							},
						},
					},
					col11: {
						type: 'void',
						'x-component': 'FormGrid.GridColumn',
						'x-component-props': { gridSpan: 2 },
						properties: {
							modifyContent: {
								type: 'string',
								title: '修改内容',
								'x-decorator': 'FormItem',
								'x-component': 'Input.TextArea',
								'x-component-props': { rows: 3 },
								name: 'modifyContent',
								'x-reactions': readOnlyReaction,
							},
						},
					},
					col12: {
						type: 'void',
						'x-component': 'FormGrid.GridColumn',
						'x-component-props': { gridSpan: 2 },
						properties: {
							remark: {
								type: 'string',
								title: '描述',
								'x-decorator': 'FormItem',
								'x-component': 'Input.TextArea',
								'x-component-props': { rows: 2 },
								name: 'remark',
								'x-reactions': readOnlyReaction,
							},
						},
					},
					col13: {
						type: 'void',
						'x-component': 'FormGrid.GridColumn',
						'x-component-props': { gridSpan: 2 },
						properties: {
							attachment: {
								type: 'object',
								title: '文件',
								'x-decorator': 'FormItem',
								'x-component': 'AttachmentUpload',
								name: 'attachment',
								'x-reactions': readOnlyReaction,
							},
						},
					},
				},
			},
			// 审批信息 - 可编辑字段
			approvalInfo: {
				type: 'void',
				'x-component': 'Card',
				'x-component-props': {
					title: '审批信息',
					size: 'small',
					style: { marginTop: 16 },
				},
				properties: {
					approvalGrid: {
						type: 'void',
						'x-component': 'FormGrid',
						'x-component-props': { maxColumns: 2, strictAutoFit: true },
						properties: {
							approvalCol3: {
								type: 'void',
								'x-component': 'FormGrid.GridColumn',
								'x-component-props': { gridSpan: 1 },
								properties: {
									storageLibraryId: {
										type: 'string',
										title: '存储库',
										required: true,
										'x-decorator': 'FormItem',
										'x-component': 'DocumentLibrarySelect',
										'x-component-props': {
											placeholder: '请选择存储库',
											libraryType: 1, // 只显示存储库类型
										},
										name: 'storageLibraryId',
									},
								},
							},
							approvalCol4: {
								type: 'void',
								'x-component': 'FormGrid.GridColumn',
								'x-component-props': { gridSpan: 1 },
								properties: {
									recycleLibraryId: {
										type: 'string',
										title: '回收库',
										required: true,
										'x-decorator': 'FormItem',
										'x-component': 'DocumentLibrarySelect',
										'x-component-props': {
											placeholder: '请选择回收库',
											libraryType: 2, // 只显示回收库类型
										},
										name: 'recycleLibraryId',
									},
								},
							},
						},
					},
				},
			},
		},
	} as ISchema,
};
