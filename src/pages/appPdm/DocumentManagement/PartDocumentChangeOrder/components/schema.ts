
import { ISchema } from '@formily/react';

// 表单ID，用于 useFormSchema hook
export const formId = 'PartDocumentChangeOrderForm';

// 表单 Schema，供 useFormSchema 使用
export const formSchema: { form: Record<string, any>; schema: ISchema } = {
	form: {
		labelCol: 6,
		wrapperCol: 12,
		labelWidth: '100px',
		feedbackLayout: 'none',
	},
	schema: {
		type: 'object',
		properties: {
			basicInfo: {
				type: 'void',
				'x-component': 'Card',
				'x-component-props': {
					title: '基本信息',
					size: 'small'
				},
				properties: {
					grid: {
						type: 'void',
						'x-component': 'FormGrid',
						'x-component-props': {
							strictAutoFit: true,
							maxColumns: 3,
							minColumns: 1
						},
						properties: {
							number: {
								type: 'string', title: '更改单号', 'x-decorator': 'FormItem', 'x-component': 'Input',
								'x-component-props': { placeholder: '保存后自动生成', disabled: true },
								'x-pattern': 'editable'
							},
							orderStatus: {
								type: 'number', title: '状态', 'x-decorator': 'FormItem', 'x-component': 'Select',
								'x-component-props': { placeholder: '请选择状态' },
								enum: [
									{ label: '审批中', value: 5 },
									{ label: '已完成', value: 10 },
									{ label: '已关闭', value: 15 },
								],
								'x-reactions': {
									fulfill: {
										state: {
											visible: "{{!$workflowInfo.isCreateMode}}",
											pattern: "{{$workflowInfo.isCreateMode ? 'editable' : 'readPretty'}}"
										}
									}
								}
							},
							partNo: {
								type: 'string',
								title: '物料编码',
								'x-decorator': 'FormItem',
								'x-component': 'MaterialCodeSelect',
								'x-component-props': {
									placeholder: '请输入关键字搜索物料编码',
								},
								'x-reactions': [
									{ fulfill: { state: { pattern: "{{$workflowInfo.isCreateMode ? 'editable' : 'readPretty'}}" } } },
								]
							},
							productLine: {
								type: 'string', title: '产品线', 'x-decorator': 'FormItem', 'x-component': 'Select',
								'x-component-props': { placeholder: '请选择产品线' },
								enum: [
									{ label: '无限能源', value: '无限能源' },
									{ label: '数据中心', value: '数据中心' },
									{ label: '服务器', value: '服务器' },
									{ label: '传输', value: '传输' },
									{ label: '固网', value: '固网' },
									{ label: '部件', value: '部件' },
									{ label: '公共', value: '公共' },
									{ label: '鼎桥', value: '鼎桥' },
									{ label: '其他', value: '其他' },
								],
								'x-reactions': { fulfill: { state: { pattern: "{{$workflowInfo.isCreateMode ? 'editable' : 'readPretty'}}" } } }
							},
							outsideAttribute: {
								type: 'string', title: '外包属性', 'x-decorator': 'FormItem', 'x-component': 'Select',
								'x-component-props': { placeholder: '请选择外包属性' },
								enum: [
									{ label: 'TK', value: 'TK' },
									{ label: 'CS', value: 'CS' },
								],
								'x-reactions': { fulfill: { state: { pattern: "{{$workflowInfo.isCreateMode ? 'editable' : 'readPretty'}}" } } }
							},
							orderType: {
								type: 'string',
								title: '变更类型',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								default: '图纸文件升级',
								'x-component-props': { disabled: true },
								'x-pattern': 'editable'
							},
							customerChangeNo: {
								type: 'string', title: '客户变更号', 'x-decorator': 'FormItem', 'x-component': 'Input',
								'x-reactions': { fulfill: { state: { pattern: "{{$workflowInfo.isCreateMode ? 'editable' : 'readPretty'}}" } } }
							},
							docNo: {
								type: 'string',
								title: '文档编码',
								'x-decorator': 'FormItem',
								required: true,
								'x-component': 'Select',
								'x-component-props': {
								placeholder: '请选择或输入筛选文档编码',
								showSearch: true,
								filterOption: (input: string, option: any) =>
									(option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
							},
								enum: [],
								'x-reactions': [
									{
										fulfill: {
											state: {
												pattern: "{{$workflowInfo.isCreateMode ? 'editable' : 'readPretty'}}"
											}
										}
									}
								]
							},
							docName: {
								type: 'string', title: '文档名称', 'x-decorator': 'FormItem', 'x-component': 'Input',
								'x-component-props': { placeholder: '自动带出', disabled: true },
								required: true,
								'x-pattern': 'editable'
							},
							docVersion: {
								type: 'string', title: '文档版本', 'x-decorator': 'FormItem', 'x-component': 'Input',
								'x-component-props': { placeholder: '请输入版本号' },
								required: true,
								'x-reactions': {
									fulfill: {
										state: {
											pattern: "{{$workflowInfo.isCreateMode ? 'editable' : 'readPretty'}}"
										}
									}
								}
							},
							'documentTypeId': {
								type: 'string',
								'x-visible': false,
								'x-component': 'Input',
							},
							documentTypeName: {
								type: 'string', title: '文档类型', 'x-decorator': 'FormItem', 'x-component': 'Input',
								'x-component-props': { placeholder: '自动带出', disabled: true },
								'x-pattern': 'editable'
							},
							expirationPath: {
								type: 'string', title: '失效路径', 'x-decorator': 'FormItem', 'x-component': 'Input',
								'x-component-props': { placeholder: '自动带出', disabled: true },
								'x-pattern': 'editable'
							},
							allowDifferent: {
								type: 'boolean',
								title: '编码不一致',
								'x-decorator': 'FormItem',
								'x-component': 'Checkbox',
								default: false,
								'x-reactions': { fulfill: { state: { pattern: "{{$workflowInfo.isCreateMode ? 'editable' : 'readPretty'}}" } } }
							},
							changeRemark: {
								type: 'string', title: '变更说明', 'x-decorator': 'FormItem', 'x-component': 'Input.TextArea',
								'x-decorator-props': { gridSpan: 3 },
								'x-reactions': { fulfill: { state: { pattern: "{{$workflowInfo.isCreateMode ? 'editable' : 'readPretty'}}" } } }
							},
							'{value:auditEngineeringUserCode,label:auditEngineeringUserName}': {
								type: 'string', title: '处理人', 'x-decorator': 'FormItem', 'x-component': 'UserSelect',
								'x-component-props': { labelInValue: true, valueField: 'userName', placeholder: '请选择处理人' },
								required: true,
								'x-reactions': {
									fulfill: {
										state: {
											pattern: "{{$workflowInfo.isCreateMode ? 'editable' : 'readPretty'}}"
										}
									}
								}
							},
							attachment: {
								type: 'object', title: '附件', 'x-decorator': 'FormItem', 'x-component': 'AttachmentUpload',
								'x-decorator-props': { gridSpan: 3 },
								'x-component-props': { accept: '.pdf,.doc,.docx,.xls,.xlsx,.dwg,.dxf,.jpg,.png' },
								// 附件在任何模式下都显示，创建模式可编辑，其他模式只读展示
								'x-reactions': { fulfill: { state: { visible: true, pattern: "{{$workflowInfo.isCreateMode ? 'editable' : 'readPretty'}}" } } }
							},
						}
					}
				}
			},
			auditEngineeringCard: {
				type: 'void',
				'x-component': 'Card',
				'x-component-props': { title: '工程更改', size: 'small', style: { marginTop: 16 } },
				'x-reactions': { fulfill: { state: { visible: "{{!$workflowInfo.isCreateMode}}" } } },
				properties: {
					grid: {
						type: 'void',
						'x-component': 'FormGrid',
						'x-component-props': { strictAutoFit: true, maxColumns: 2, minColumns: 1 },
						properties: {
							auditEngineeringUserName: {
								type: 'string', title: '审批人', 'x-decorator': 'FormItem', 'x-component': 'Input',
								'x-pattern': 'readPretty'
							},
							auditEngineeringReason: {
								type: 'string', title: '审批意见', 'x-decorator': 'FormItem', 'x-component': 'Input.TextArea',
								'x-reactions': {
									fulfill: {
										state: {
											pattern:
												"{{['工程更改人', '工程更改人审批', '工程更改', '工程审批人', '工程审批'].includes($workflowInfo.currentActivityName) ? 'editable' : 'readPretty'}}",
										},
									},
								},
							},
							'{value:auditMaterialUserCode,label:auditMaterialUserName}': {
								type: 'string', title: '下一审批人(物流)', 'x-decorator': 'FormItem', 'x-component': 'UserSelect',
								'x-component-props': { labelInValue: true, valueField: 'userName', placeholder: '请选择物流审批人' },
								// 在工程更改人节点时需要选择下一个审批人
								'x-reactions': {
									fulfill: {
										state: {
											visible: "{{$workflowInfo.currentActivityName === '工程更改人'}}",
											pattern: "{{$workflowInfo.currentActivityName === '工程更改人' ? 'editable' : 'readPretty'}}",
											required: "{{$workflowInfo.currentActivityName === '工程更改人'}}"
										}
									}
								}
							}
						}
					}
				}
			},
			auditMaterialCard: {
				type: 'void',
				'x-component': 'Card',
				'x-component-props': { title: '物流审批', size: 'small', style: { marginTop: 16 } },
				'x-reactions': { fulfill: { state: { visible: "{{$workflowInfo.currentActivityName === '物流审批人' || $workflowInfo.executionActivityNames.indexOf('物流审批') >= 0}}" } } },
				properties: {
					grid: {
						type: 'void',
						'x-component': 'FormGrid',
						'x-component-props': { strictAutoFit: true, maxColumns: 2, minColumns: 1 },
						properties: {
							auditMaterialUserName: {
								type: 'string', title: '审批人', 'x-decorator': 'FormItem', 'x-component': 'Input',
								'x-pattern': 'readPretty'
							},
							auditMaterialReason: {
								type: 'string', title: '审批意见', 'x-decorator': 'FormItem', 'x-component': 'Input.TextArea',
								'x-reactions': { fulfill: { state: { pattern: "{{$workflowInfo.currentActivityName === '物流审批人' ? 'editable' : 'readPretty'}}" } } }
							},
							'{value:auditPurchaseUserCode,label:auditPurchaseUserName}': {
								type: 'string', title: '下一审批人(采购)', 'x-decorator': 'FormItem', 'x-component': 'UserSelect',
								'x-component-props': { labelInValue: true, valueField: 'userName', placeholder: '请选择采购审批人' },
								required: true,
								'x-reactions': {
									fulfill: {
										state: {
											visible: "{{$workflowInfo.currentActivityName === '物流审批人'}}",
											pattern: "{{$workflowInfo.currentActivityName === '物流审批人' ? 'editable' : 'readPretty'}}"
										}
									}
								}
							}
						}
					}
				}
			},
			auditPurchaseCard: {
				type: 'void',
				'x-component': 'Card',
				'x-component-props': { title: '采购审批', size: 'small', style: { marginTop: 16 } },
				'x-reactions': { fulfill: { state: { visible: "{{$workflowInfo.currentActivityName === '采购审批人' || $workflowInfo.executionActivityNames.indexOf('采购审批') >= 0}}" } } },
				properties: {
					grid: {
						type: 'void',
						'x-component': 'FormGrid',
						'x-component-props': { strictAutoFit: true, maxColumns: 2, minColumns: 1 },
						properties: {
							auditPurchaseUserName: {
								type: 'string', title: '审批人', 'x-decorator': 'FormItem', 'x-component': 'Input',
								'x-pattern': 'readPretty'
							},
							auditPurchaseReason: {
								type: 'string', title: '审批意见', 'x-decorator': 'FormItem', 'x-component': 'Input.TextArea',
								'x-reactions': { fulfill: { state: { pattern: "{{$workflowInfo.currentActivityName === '采购审批人' ? 'editable' : 'readPretty'}}" } } }
							},
							'{value:auditPlanUserCode,label:auditPlanUserName}': {
								type: 'string', title: '下一审批人(计划)', 'x-decorator': 'FormItem', 'x-component': 'UserSelect',
								'x-component-props': { labelInValue: true, valueField: 'userName', placeholder: '请选择计划审批人' },
								required: true,
								'x-reactions': {
									fulfill: {
										state: {
											visible: "{{$workflowInfo.currentActivityName === '采购审批人'}}",
											pattern: "{{$workflowInfo.currentActivityName === '采购审批人' ? 'editable' : 'readPretty'}}"
										}
									}
								}
							}
						}
					}
				}
			},
			auditPlanCard: {
				type: 'void',
				'x-component': 'Card',
				'x-component-props': { title: '计划审批', size: 'small', style: { marginTop: 16 } },
				'x-reactions': { fulfill: { state: { visible: "{{$workflowInfo.currentActivityName === '计划审批人' || $workflowInfo.currentActivityName === '计划更改人' || $workflowInfo.executionActivityNames.indexOf('计划审批') >= 0}}" } } },
				properties: {
					grid: {
						type: 'void',
						'x-component': 'FormGrid',
						'x-component-props': { strictAutoFit: true, maxColumns: 2, minColumns: 1 },
						properties: {
							auditPlanUserName: {
								type: 'string', title: '审批人', 'x-decorator': 'FormItem', 'x-component': 'Input',
								'x-pattern': 'readPretty'
							},
							auditPlanReason: {
								type: 'string', title: '审批意见', 'x-decorator': 'FormItem', 'x-component': 'Input.TextArea',
								'x-reactions': { fulfill: { state: { pattern: "{{($workflowInfo.currentActivityName === '计划审批人' || $workflowInfo.currentActivityName === '计划更改人') ? 'editable' : 'readPretty'}}" } } }
							},
							'{value:auditMarketplaceUserCode,label:auditMarketplaceUserName}': {
								type: 'string', title: '下一审批人(市场)', 'x-decorator': 'FormItem', 'x-component': 'UserSelect',
								'x-component-props': { labelInValue: true, valueField: 'userName', placeholder: '请选择市场审批人' },
								required: true,
								'x-reactions': {
									fulfill: {
										state: {
											visible: "{{$workflowInfo.currentActivityName === '计划审批人' || $workflowInfo.currentActivityName === '计划更改人'}}",
											pattern: "{{($workflowInfo.currentActivityName === '计划审批人' || $workflowInfo.currentActivityName === '计划更改人') ? 'editable' : 'readPretty'}}"
										}
									}
								}
							}
						}
					}
				}
			},
			auditMarketplaceCard: {
				type: 'void',
				'x-component': 'Card',
				'x-component-props': { title: '市场审批', size: 'small', style: { marginTop: 16 } },
				'x-reactions': { fulfill: { state: { visible: "{{$workflowInfo.currentActivityName === '市场审批人' || $workflowInfo.executionActivityNames.indexOf('市场审批') >= 0}}" } } },
				properties: {
					grid: {
						type: 'void',
						'x-component': 'FormGrid',
						'x-component-props': { strictAutoFit: true, maxColumns: 2, minColumns: 1 },
						properties: {
							auditMarketplaceUserName: {
								type: 'string', title: '审批人', 'x-decorator': 'FormItem', 'x-component': 'Input',
								'x-pattern': 'readPretty'
							},
							auditMarketplaceReason: {
								type: 'string', title: '审批意见', 'x-decorator': 'FormItem', 'x-component': 'Input.TextArea',
								'x-reactions': { fulfill: { state: { pattern: "{{$workflowInfo.currentActivityName === '市场审批人' ? 'editable' : 'readPretty'}}" } } }
							}
						}
					}
				}
			}
		}
	}
};

// 执行页面使用的 schema 函数
export const executeSchema = (): ISchema => {
	return formSchema.schema;
};
