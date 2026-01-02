/**
 * 文档发放表单页
 * 路由: /appPdm/DocumentManagement/DocumentRelease/form?id={id}
 * 新建模式：无id参数
 * 编辑模式：有id参数
 *
 * 参考 DocumentPublishRequest/form.tsx 重构
 */

import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Card, Button, message } from 'antd';
import { SaveOutlined, SendOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { history, useSchemaField, closeTab } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout, FormGrid } from '@formily/antd-v5';
import { ToolBar } from '@/components';
import {
	DocumentReleaseGetAsync,
	DocumentReleaseCreateAsync,
	DocumentReleaseUpdateAsync,
	DocumentReleaseSubmitAsync,
} from '@/services/pdm/DocumentRelease';
import { DocumentGetVersionAsync, DocumentGetVersionListAsync } from '@/services/pdm/Document';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import UserOrgSelect from '@/pages/appPdm/_formWidgets/UserOrgSelect';
import DocumentSelectDialog from './_components/DocumentSelectDialog';
import { formatVersionNumber } from '@/pages/appPdm/DocumentManagement/Document/_utils/documentStatus';

import dayjs from 'dayjs';
import type { ISchema } from '@formily/react';

export const routeProps = {
	name: '文档发放表单',
};

type UserSnapshotDto = API.BurnAbpPdmDocumentManagementRecycleOrdersUserSnapshotDto;
type LabelInValue = { value: string; label: string; name?: string };

const toUserSnapshots = (value: any): UserSnapshotDto[] => {
	if (!value) return [];
	const arr = Array.isArray(value) ? value : [value];
	return arr
		.map((v: any) => {
			if (!v) return null;
			if (typeof v === 'string') return { userId: v, userName: v };
			if (v.userId && v.userName) return { userId: v.userId, userName: v.userName };
			if (v.value) return { userId: v.value, userName: v.label || v.name || '' };
			return null;
		})
		.filter(Boolean);
};

const toLabelInValueArray = (users: UserSnapshotDto[]): LabelInValue[] => {
	return (users || []).map((u) => ({ value: u.userId, label: u.userName }));
};


// 表单布局配置
const formLayout = {
	labelCol: 6,
	wrapperCol: 18,
	labelWidth: 120,
	feedbackLayout: 'none' as const,
};

const DocumentReleaseFormPage: React.FC = () => {
	const { id: releaseId, isActive, hasChanged } = useKeepAliveParams(
		'/appPdm/DocumentManagement/DocumentRelease/form',
		['id']
	);
	const isEdit = !!releaseId;

	const SchemaField = useSchemaField({ UserSelect, UserOrgSelect });
	const [submitting, setSubmitting] = useState(false);
	const [showDocumentSelect, setShowDocumentSelect] = useState(false);
	const [versionOptionsByDocumentId, setVersionOptionsByDocumentId] = useState<Record<string, { value: string; versionId: string }[]>>({});
	const loadingVersionIdsRef = useRef<Set<string>>(new Set());

	// 创建表单实例
	const form = useMemo(
		() => createForm({ validateFirst: true }),
		[releaseId]
	);

	const getAllowedUsers = useCallback((recipients: any) => {
		return toLabelInValueArray(toUserSnapshots(recipients));
	}, []);


	// 直接定义表单 Schema
	const schema: ISchema = useMemo(() => ({
		type: 'object',
		properties: {
			grid: {
				type: 'void',
				'x-component': 'FormGrid',
				'x-component-props': {
					minColumns: 2,
					maxColumns: 2,
					strictAutoFit: true,
				},
				properties: {
					// 发放单号
					colReleaseNumber: {
						type: 'void',
						'x-component': 'FormGrid.GridColumn',
						'x-component-props': { gridSpan: 1 },
						properties: {
							releaseNumber: {
								type: 'string',
								title: '发放单号',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								'x-component-props': {
									placeholder: '系统自动生成',
									disabled: true,
								},
							},
						},
					},

					// 发放标题
					colTitle: {
						type: 'void',
						'x-component': 'FormGrid.GridColumn',
						'x-component-props': { gridSpan: 1 },
						properties: {
							title: {
								type: 'string',
								title: '发放标题',
								required: true,
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								'x-component-props': {
									placeholder: '请输入发放标题',
									maxLength: 200,
								},
							},
						},
					},

					// 审批人
					colApprover: {
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

					// 发放对象
					colRecipients: {
						type: 'void',
						'x-component': 'FormGrid.GridColumn',
						'x-component-props': { gridSpan: 1 },
						properties: {
							recipientIds: {
								type: 'array',
								title: '发放对象',
								required: true,
								'x-decorator': 'FormItem',
								'x-component': 'UserOrgSelect',
								'x-component-props': {
									mode: 'multiple',
									placeholder: '请选择发放对象',
									labelInValue: true,
									onChange: (val: any) => {
										const allowedIds = new Set(
											toUserSnapshots(val).map((item) => item.userId)
										);
										const current = form.values?.documents || [];
										const next = current.map((item: any) => {
											const before: UserSnapshotDto[] = toUserSnapshots(item.nonRecallUsers);
											const after = before.filter((u) => allowedIds.has(u.userId));
											return before.length === after.length
												? item
												: { ...item, nonRecallUsers: toLabelInValueArray(after) };
										});
										form.setValues({ documents: next });
									},
								},
							},
						},
					},

					// 发放说明
					colDescription: {
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
									placeholder: '请输入发放说明',
									rows: 3,
									maxLength: 500,
								},
							},
						},
					},
				},
			},
		},
	}), [form]);



	// 表单配置
	const formConfig = useMemo(() => ({
		labelCol: 6,
		wrapperCol: 18,
		labelWidth: 120,
	}), []);

	const getVersionLabel = (version: any) => {
		if (version?.fullVersion) return version.fullVersion;
		return formatVersionNumber(version?.version, version?.revision);
	};

	const getVersionOptions = useCallback(
		(documentId?: string) => {
			if (!documentId) return [];
			return versionOptionsByDocumentId[documentId] || [];
		},
		[versionOptionsByDocumentId]
	);

	const updateReleaseVersionOptions = useCallback(
		(documentId: string, options: { value: string; versionId: string }[]) => {
			const rows = form.values?.documents || [];
			rows.forEach((row: any, index: number) => {
				if (row?.documentId !== documentId) return;
				const selectOptions = options.map((item) => ({
					label: item.value,
					value: item.value,
				}));
				form.setFieldState(`documents.${index}.releaseVersion`, (state) => {
					state.componentProps = {
						...(state.componentProps || {}),
						options: selectOptions,
						disabled: selectOptions.length === 0,
					};
				});
				form.setFieldState(`documents.${index}.recallVersion`, (state) => {
					state.componentProps = {
						...(state.componentProps || {}),
						options: selectOptions,
					};
				});
			});
		},
		[form]
	);

	const loadVersionOptions = useCallback(async (documentId: string) => {
		if (!documentId) return;
		if (versionOptionsByDocumentId[documentId]) return;
		if (loadingVersionIdsRef.current.has(documentId)) return;

		loadingVersionIdsRef.current.add(documentId);
		try {
			const result = await DocumentGetVersionListAsync({
				Filter: `documentId = ${documentId},publishStatus=1`,
				SkipCount: 0,
				MaxResultCount: 200,
			});

			const options = (result.items || [])
				.map((item) => ({
					value: getVersionLabel(item),
					versionId: item.id || '',
				}))
				.filter((item) => item.value);

			setVersionOptionsByDocumentId((prev) => ({
				...prev,
				[documentId]: options,
			}));
			updateReleaseVersionOptions(documentId, options);

			if (options.length > 0) {
				const current = form.values?.documents || [];
				const next = current.map((item: any) => {
					if (item.documentId !== documentId) return item;
					const matched = options.find((option) => option.value === item.releaseVersion);
					if (matched) {
						return {
							...item,
							documentVersionId: matched.versionId || item.documentVersionId,
						};
					}
					return {
						...item,
						releaseVersion: options[0].value,
						documentVersionId: options[0].versionId,
					};
				});
				form.setValues({ documents: next });
			}
		} catch (error) {
			setVersionOptionsByDocumentId((prev) => ({
				...prev,
				[documentId]: [],
			}));
		} finally {
			loadingVersionIdsRef.current.delete(documentId);
		}
	}, [versionOptionsByDocumentId, form, getVersionLabel, updateReleaseVersionOptions]);

	const documentsSchema: ISchema = useMemo(() => ({
		type: 'object',
		properties: {
			documents: {
				type: 'array',
				title: '文档发放项',
				'x-decorator': 'FormItem',
				'x-component': 'ArrayTable',
				'x-component-props': {
					gridKey: 'documentRelease.documents',
					pagination: false,
				},
				items: {
					type: 'object',
					properties: {
						documentId: {
							type: 'string',
							'x-decorator': 'FormItem',
							'x-component': 'Input',
							'x-hidden': true,
						},
						documentVersionId: {
							type: 'string',
							'x-decorator': 'FormItem',
							'x-component': 'Input',
							'x-hidden': true,
						},
						rowId: {
							type: 'string',
							'x-decorator': 'FormItem',
							'x-component': 'Input',
							'x-hidden': true,
						},
						col1: {
							type: 'void',
							'x-component': 'ArrayTable.Column',
							'x-component-props': { title: '文档编号', width: 150 },
							properties: {
								documentNumber: {
									type: 'string',
									'x-decorator': 'FormItem',
									'x-component': 'Input',
									'x-component-props': { disabled: true },
								},
							},
						},
						col2: {
							type: 'void',
							'x-component': 'ArrayTable.Column',
							'x-component-props': { title: '文档名称', width: 200 },
							properties: {
								documentName: {
									type: 'string',
									'x-decorator': 'FormItem',
									'x-component': 'Input',
									'x-component-props': { disabled: true },
								},
							},
						},
						col3: {
							type: 'void',
							'x-component': 'ArrayTable.Column',
							'x-component-props': { title: '份数', width: 80 },
							properties: {
								copies: {
									type: 'number',
									'x-decorator': 'FormItem',
									'x-component': 'NumberPicker',
									'x-component-props': { min: 1 },
								},
							},
						},
						col4: {
							type: 'void',
							'x-component': 'ArrayTable.Column',
							'x-component-props': { title: '首次发放', width: 100 },
							properties: {
								isFirstRelease: {
									type: 'boolean',
									'x-decorator': 'FormItem',
									'x-component': 'Checkbox',
								},
							},
						},
						col5: {
							type: 'void',
							'x-component': 'ArrayTable.Column',
							'x-component-props': { title: '发放版本', width: 120 },
							properties: {
								releaseVersion: {
									type: 'string',
									'x-decorator': 'FormItem',
									'x-component': 'Select',
									'x-component-props': {
										placeholder: '请选择',
									},
								},
							},
						},
						col6: {
							type: 'void',
							'x-component': 'ArrayTable.Column',
							'x-component-props': { title: '召回版本', width: 120 },
							properties: {
								recallVersion: {
									type: 'string',
									'x-decorator': 'FormItem',
									'x-component': 'Select',
									'x-component-props': {
										placeholder: '请选择',
									},
									'x-reactions': {
										dependencies: ['.isFirstRelease'],
										fulfill: {
											state: {
												disabled: '{{$deps[0] === true}}',
												value: '{{$deps[0] === true ? null : $self.value}}',
											},
										},
									},
								},
							},
						},
						col7: {
							type: 'void',
							'x-component': 'ArrayTable.Column',
							'x-component-props': { title: '生效日期', width: 150 },
							properties: {
								effectiveDate: {
									type: 'string',
									'x-decorator': 'FormItem',
									'x-component': 'DatePicker',
									'x-component-props': { style: { width: '100%' } },
								},
							},
						},
						col8: {
							type: 'void',
							'x-component': 'ArrayTable.Column',
							'x-component-props': { title: '需要确认', width: 100 },
							properties: {
								requiresConfirmation: {
									type: 'boolean',
									'x-decorator': 'FormItem',
									'x-component': 'Checkbox',
								},
							},
						},
						col9: {
							type: 'void',
							'x-component': 'ArrayTable.Column',
							'x-component-props': { title: '不回收对象', width: 220 },
							properties: {
								nonRecallUsers: {
									type: 'array',
									'x-decorator': 'FormItem',
									'x-component': 'UserSelect',
									'x-component-props': {
										mode: 'multiple',
										labelInValue: true,
										labelField: 'name',
										placeholder: '请选择',
										options: '{{getAllowedUsers($form.values.recipientIds)}}',
										maxTagCount: 1,
										maxTagPlaceholder: (omittedValues: any[]) => `+${omittedValues.length}人`,
									},
									'x-reactions': {
										dependencies: ['.isFirstRelease'],
										fulfill: {
											state: {
												disabled: '{{$deps[0] === true}}',
												value: '{{$deps[0] === true ? [] : $self.value}}',
											},
										},
									},
								},
							},
						},
						col10: {
							type: 'void',
							'x-component': 'ArrayTable.Column',
							'x-component-props': { title: '预计召回日期', width: 150 },
							properties: {
								expectedRecallDate: {
									type: 'string',
									'x-decorator': 'FormItem',
									'x-component': 'DatePicker',
									'x-component-props': { style: { width: '100%' } },
									'x-reactions': {
										dependencies: ['.isFirstRelease'],
										fulfill: {
											state: {
												disabled: '{{$deps[0] === true}}',
												value: '{{$deps[0] === true ? null : $self.value}}',
											},
										},
									},
								},
							},
						},
						col11: {
							type: 'void',
							'x-component': 'ArrayTable.Column',
							'x-component-props': { title: '备注', width: 150 },
							properties: {
								remarks: {
									type: 'string',
									'x-decorator': 'FormItem',
									'x-component': 'Input',
								},
							},
						},
						col12: {
							type: 'void',
							'x-component': 'ArrayTable.Column',
							'x-component-props': { title: '操作', width: 80, fixed: 'right' },
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
	}), [getAllowedUsers]);

	// 加载初始数据
	useEffect(() => {
		if (!isActive || !hasChanged) return;

		if (releaseId) {
			DocumentReleaseGetAsync({ id: releaseId })
				.then((data) => {
					const initialValues: any = {
						id: data.id,
						releaseNumber: data.releaseNumber,
						title: data.title,
						description: data.description,
					};

					// 处理审批人 - UserSelect 使用 labelInValue 格式
					if (data.approverCode) {
						initialValues.approverId = { value: data.approverCode, label: data.approverName };
					}

					// 处理发放对象
					if (data.recipients && data.recipients.length > 0) {
						initialValues.recipientIds = data.recipients.map((r: any) => ({
							value: r.recipientId,
							label: r.recipientName,
							name: r.recipientName,
						}));
					}

					form.setInitialValues(initialValues);

					// 加载文档明细列表
					if (data.documents && data.documents.length > 0) {
						const items = data.documents.map((doc: any, index: number) => ({
							...doc,
							rowId: `row_${index}`,
							effectiveDate: doc.effectiveDate ? dayjs(doc.effectiveDate) : null,
							expectedRecallDate: doc.expectedRecallDate ? dayjs(doc.expectedRecallDate) : null,
							nonRecallUsers: toLabelInValueArray(doc.nonRecallUsers || []),
						}));
						form.setValues({ documents: items });
						items.forEach((item) => {
							if (item.documentId) {
								const options = getVersionOptions(item.documentId);
								if (options.length > 0) {
									updateReleaseVersionOptions(item.documentId, options);
								}
							}
						});
						items
							.filter((item) => item.documentId)
							.forEach((item) => loadVersionOptions(item.documentId));

						Promise.all(
							items
								.filter((item) => item.documentVersionId && !item.documentId)
								.map((item) =>
									DocumentGetVersionAsync({ versionId: item.documentVersionId })
										.then((version) => ({ versionId: item.documentVersionId, version }))
										.catch(() => null)
								)
						).then((results) => {
							const versionMap = results
								.filter((item): item is { versionId: string; version: any } => !!item)
								.reduce<Record<string, any>>((acc, item) => {
									acc[item.versionId] = item.version;
									return acc;
								}, {});

							const current = form.values?.documents || [];
							const next = current.map((item: any) => {
								const version = versionMap[item.documentVersionId];
								if (!version?.documentId) return item;
								return {
									...item,
									documentId: version.documentId,
									releaseVersion: item.releaseVersion || getVersionLabel(version),
									documentNumber: item.documentNumber || version.documentNumber,
									documentName: item.documentName || version.documentName,
								};
							});
							form.setValues({ documents: next });

							const documentIds = Object.values(versionMap)
								.map((version: any) => version?.documentId)
								.filter(Boolean) as string[];
							documentIds.forEach((documentId) => {
								loadVersionOptions(documentId);
							});
						});
					}
				})
				.catch(() => {
					message.error('加载数据失败');
				});
		}
	}, [isActive, hasChanged, releaseId, form, loadVersionOptions]);

	// 添加文档
	const handleAddDocuments = () => {
		setShowDocumentSelect(true);
	};

	// 从文档选择弹窗确认
	const handleDocumentSelectConfirm = useCallback((selectedDocs: any[]) => {
		if (!selectedDocs || selectedDocs.length === 0) return;

		const newItems = selectedDocs.map((doc, index) => ({
			rowId: `row_${Date.now()}_${index}`,
			documentId: doc.id,
			documentVersionId: '',
			documentNumber: doc.documentNumber,
			documentName: doc.documentName,
			releaseVersion: '',
			copies: 1,
			isFirstRelease: false,
			recallVersion: '',
			effectiveDate: null,
			requiresConfirmation: false,
			nonRecallUsers: [],
			expectedRecallDate: null,
			remarks: '',
		}));

		const current = form.values?.documents || [];
		form.setValues({ documents: [...current, ...newItems] });
		setShowDocumentSelect(false);
		message.success(`已添加 ${selectedDocs.length} 个文档`);
		selectedDocs.forEach((doc) => {
			if (doc?.id) {
				loadVersionOptions(doc.id);
			}
		});
	}, [form, loadVersionOptions]);

	// 保存数据(提取公共逻辑)
	const saveData = async () => {
		const values = await form.submit();

		// 验证必填字段
		if (!values.title || !values.title.trim()) {
			message.error('发放标题不能为空');
			throw new Error('发放标题不能为空');
		}

		// 验证审批人
		if (!values.approverId?.value) {
			message.error('审批人不能为空');
			throw new Error('审批人不能为空');
		}

		// 验证发放对象
		if (!values.recipientIds || values.recipientIds.length === 0) {
			message.error('发放对象不能为空');
			throw new Error('发放对象不能为空');
		}

		// 验证明细列表
		if (!values.documents || values.documents.length === 0) {
			message.error('请至少添加一条文档');
			throw new Error('请至少添加一条文档');
		}

		// 处理发放对象
		const recipients = values.recipientIds.map((item: any) => ({
			recipientId: item.value || item.id || item,
			recipientName: item.name || item.label || '',
		}));

		// 构造提交数据
		const submitData: any = {
			title: values.title?.trim(),
			description: values.description?.trim(),
			approverCode: values.approverId?.value,
			approverName: values.approverId?.label,
			recipients,
			documents: (values.documents || []).map((item: any) => {
				const options = getVersionOptions(item.documentId);
				const matched = options.find((option) => option.value === item.releaseVersion);
				return {
					documentVersionId: matched?.versionId || item.documentVersionId,
					documentNumber: item.documentNumber,
					documentName: item.documentName,
					copies: item.copies || 1,
					isFirstRelease: item.isFirstRelease || false,
					releaseVersion: item.releaseVersion,
					recallVersion: item.recallVersion,
					effectiveDate: item.effectiveDate ? dayjs(item.effectiveDate).format('YYYY-MM-DD') : undefined,
					requiresConfirmation: item.requiresConfirmation || false,
					nonRecallUsers: toUserSnapshots(item.nonRecallUsers),
					expectedRecallDate: item.expectedRecallDate ? dayjs(item.expectedRecallDate).format('YYYY-MM-DD') : undefined,
					remarks: item.remarks,
				};
			}),
		};

		let savedId: string;

		if (isEdit) {
			await DocumentReleaseUpdateAsync(
				{ id: releaseId },
				{
					title: submitData.title,
					description: submitData.description,
					approverCode: submitData.approverCode,
					approverName: submitData.approverName,
				}
			);
			savedId = releaseId;
		} else {
			const result = await DocumentReleaseCreateAsync(submitData);
			savedId = result.id!;
		}

		return savedId;
	};

	// 提交表单（仅保存）
	const handleSubmit = async () => {
		if (submitting) return;

		try {
			setSubmitting(true);
			await saveData();
			message.success(isEdit ? '更新成功' : '创建成功');
			handleBack();
		} catch (error) {
			if (error instanceof Error &&
				!error.message.includes('不能为空') &&
				!error.message.includes('请至少')) {
				message.error(isEdit ? '更新失败' : '创建失败');
			}
		} finally {
			setSubmitting(false);
		}
	};

	// 保存并提交审批
	const handleSaveAndSubmit = async () => {
		if (submitting) return;

		try {
			setSubmitting(true);
			const savedId = await saveData();
			message.success(isEdit ? '更新成功' : '创建成功');

			// 提交审批
			await DocumentReleaseSubmitAsync({ id: savedId });
			message.success('提交成功');

			handleBack();
		} catch (error) {
			if (error instanceof Error &&
				!error.message.includes('不能为空') &&
				!error.message.includes('请至少')) {
				message.error('操作失败');
			}
		} finally {
			setSubmitting(false);
		}
	};

	// 返回列表
	const handleBack = () => {
		const currentPath = `${history.location.pathname}${history.location.search || ''}`;
		history.push('/appPdm/DocumentManagement/DocumentRelease');
		setTimeout(() => {
			closeTab(currentPath);
		}, 150);
	};

	return (
		<div style={{ height: '100%', overflow: 'auto', padding: '16px' }}>
			{/* 表单内容 */}
			<Card
				headStyle={{
					position: 'sticky',
					top: 0,
					zIndex: 100,
					backgroundColor: '#fff',
				}}
				title={isEdit ? '编辑文档发放单' : '新建文档发放单'}
				extra={
					<ToolBar>
						<Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
							返回
						</Button>
						<Button icon={<SaveOutlined />} onClick={handleSubmit} loading={submitting}>
							保存
						</Button>
						<Button
							type="primary"
							icon={<SendOutlined />}
							onClick={handleSaveAndSubmit}
							loading={submitting}
						>
							保存并提交
						</Button>
					</ToolBar>
				}
			>
				<FormProvider form={form}>
					<FormLayout {...formConfig}>
						<SchemaField schema={schema} scope={{ getVersionOptions, getAllowedUsers }} />
					</FormLayout>

					{/* 文档发放明细 */}
					<Card
						title="文档发放项"
						style={{ marginTop: 16 }}
						extra={
							<Button
								type="primary"
								size="small"
								icon={<PlusOutlined />}
								onClick={handleAddDocuments}
							>
								选择文档
							</Button>
						}
					>
						<SchemaField schema={documentsSchema} scope={{ getVersionOptions, getAllowedUsers }} />
					</Card>
				</FormProvider>
			</Card>

			{/* 文档选择弹窗 */}
			<DocumentSelectDialog
				title="选择文档版本"
				visible={showDocumentSelect}
				onCancel={() => setShowDocumentSelect(false)}
				onConfirm={handleDocumentSelectConfirm}
			/>
		</div>
	);
};

export default DocumentReleaseFormPage;








