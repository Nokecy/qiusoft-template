import React, { useEffect, useMemo, useState } from 'react';
import { Button, message, Modal } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Form } from '@formily/antd-v5';
import { createForm, onFormInit, onFieldValueChange } from '@formily/core';
import { useFormSchema, useSchemaField } from '@umijs/max';
import { history, closeTab } from 'umi';
import { observable } from '@formily/reactive';
import { ToolBar as FooterToolbar } from '@/components';
import { WorkflowCompleteDialog, WorkflowRejectDialog, WorkflowSubmit } from '@/pages/appWorkflow/_utils';
import useWorkflow from '@/hooks/useWorkflow';
import {
	PartDocumentChangeOrderCreateAsync,
	PartDocumentChangeOrderExecuteWorkflowAsync,
	PartDocumentChangeOrderGetAsync,
	PartDocumentChangeOrderUpdateAsync,
	PartDocumentChangeOrderGetMaterialCodesAsync,
	PartDocumentChangeOrderGetDocumentsByMaterialCodeAsync,
	PartDocumentChangeOrderMatchDocumentByAttachmentNameAsync,
} from '@/services/pdm/PartDocumentChangeOrder';
import AttachmentUpload from '@/components/AttachmentUpload';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import MaterialCodeSelect from '@/pages/appPdm/_formWidgets/MaterialCodeSelect';
import { formId, formSchema } from './schema';

/**
 * 技术图纸更改单表单组件（图纸文件升级）
 */
const PartDocumentChangeOrderFormModal = (props: any) => {
	const { query, isNew } = props;
	const { definitionId, workflowInstanceId, activityId, correlationId } = query;
	const isView = props.isView || query.isView;
	const [submitting, setSubmitting] = useState(false);

	const schema = useFormSchema(formId, formSchema);
	const SchemaField = useSchemaField({ AttachmentUpload, UserSelect, MaterialCodeSelect });
	const workflowInfo = useWorkflow(workflowInstanceId, activityId, correlationId);

	const isCreateMode = isNew && !workflowInstanceId && !correlationId;

	const $workflowInfo = useMemo(
		() => observable({ currentActivityName: '', executionActivityNames: [], isCreateMode }),
		[isCreateMode],
	);

	const callback = () => {
		const currentPath = window.location.pathname;
		const listPath = '/appPdm/DocumentManagement/PartDocumentChangeOrder';
		history.push(listPath);
		setTimeout(() => {
			closeTab(currentPath);
		}, 150);
	};

	const FIXED_ORDER_TYPE = '图纸文件升级';

	const extractVersionFromFileName = (fileName?: string): string | undefined => {
		if (!fileName) return undefined;
		const baseName = fileName.replace(/\.[^/.]+$/, '');
		const lastUnderscoreIndex = baseName.lastIndexOf('_');
		if (lastUnderscoreIndex < 0 || lastUnderscoreIndex === baseName.length - 1) return undefined;
		return baseName.slice(lastUnderscoreIndex + 1);
	};

	const confirmReplaceDocNo = async (currentDocNo: string, nextDocNo: string) => {
		return new Promise<boolean>((resolve) => {
			Modal.confirm({
				title: '文档编码不一致',
				content: `附件匹配到的文档编码为【${nextDocNo}】，与当前选择的【${currentDocNo}】不一致，是否确认替换？`,
				okText: '替换',
				cancelText: '不替换',
				onOk: () => resolve(true),
				onCancel: () => resolve(false),
			});
		});
	};

	const processFormData = (formValues: any) => {
		const docNo = formValues.docNo;
		if (!docNo) {
			message.error('文档编码不能为空');
			throw new Error('docNo is required');
		}

		let partNo = formValues.partNo;
		if (typeof partNo === 'object' && partNo !== null) {
			partNo = partNo.partNumber || partNo.value || '';
		}

		const result = {
			...formValues,
			orderType: FIXED_ORDER_TYPE,
			docNo,
			partNo,
			uploadId: formValues.attachment?.uploadId,
		};

		// 移除不再展示/不再提交的字段（兼容后端旧字段）
		delete (result as any).effectiveDate;
		delete (result as any).assignDate;
		delete (result as any).engineerId;
		delete (result as any).engineer;

		return result;
	};

	const handleSubmit = (formValues: any) => {
		return form.submit(() => {
			const submitData = processFormData(formValues);
			delete submitData.attachment;

			// 工作流模式：先更新单据数据，再推进工作流
			if (workflowInstanceId && correlationId) {
				return PartDocumentChangeOrderUpdateAsync({ id: correlationId }, submitData as any)
					.then(async () => {
						if (formValues?.workflowInput) {
							await PartDocumentChangeOrderExecuteWorkflowAsync(
								{ id: correlationId },
								{
									workflowInput: { ...formValues.workflowInput, activityId },
									auditEngineeringUserCode: formValues.auditEngineeringUserCode,
									auditEngineeringUserName: formValues.auditEngineeringUserName,
									auditEngineeringReason: formValues.auditEngineeringReason,
									auditMaterialUserCode: formValues.auditMaterialUserCode,
									auditMaterialUserName: formValues.auditMaterialUserName,
									auditMaterialReason: formValues.auditMaterialReason,
									auditPurchaseUserCode: formValues.auditPurchaseUserCode,
									auditPurchaseUserName: formValues.auditPurchaseUserName,
									auditPurchaseReason: formValues.auditPurchaseReason,
									auditPlanUserCode: formValues.auditPlanUserCode,
									auditPlanUserName: formValues.auditPlanUserName,
									auditPlanReason: formValues.auditPlanReason,
									auditMarketplaceUserCode: formValues.auditMarketplaceUserCode,
									auditMarketplaceUserName: formValues.auditMarketplaceUserName,
									auditMarketplaceReason: formValues.auditMarketplaceReason,
								} as any,
							);
						}
					})
					.then(callback);
			}

			// 新建模式：创建并返回
			return PartDocumentChangeOrderCreateAsync({
				...submitData,
				workflowDefinitionId: definitionId,
			} as any).then(callback);
		});
	};

	const handleSave = async () => {
		if (submitting) return;

		try {
			setSubmitting(true);
			const formValues = await form.submit();
			const submitData = processFormData(formValues);
			delete submitData.attachment;

			await PartDocumentChangeOrderCreateAsync(submitData as any);
			message.success('创建成功');
			callback();
		} catch (error) {
			if (error instanceof Error && error.name !== 'ValidateFormError') {
				message.error('操作失败');
			}
		} finally {
			setSubmitting(false);
		}
	};

	const form = useMemo(
		() =>
			createForm({
				effects: () => {
					let currentForm: any;
					let documentsByMaterialCode: any[] = [];
					let lastAttachmentFileName: string | undefined;

					const clearDocumentDerivedFields = () => {
						currentForm?.setFieldState('basicInfo.grid.docName', (state) => {
							state.value = undefined;
						});
						currentForm?.setFieldState('basicInfo.grid.documentTypeId', (state) => {
							state.value = undefined;
						});
						currentForm?.setFieldState('basicInfo.grid.documentTypeName', (state) => {
							state.value = undefined;
						});
						currentForm?.setFieldState('basicInfo.grid.expirationPath', (state) => {
							state.value = undefined;
						});
					};

					const setDocNoOptions = (docs: any[]) => {
						currentForm?.setFieldState('basicInfo.grid.docNo', (state) => {
							state.dataSource = (docs || []).map((x) => ({
								label: x?.docNo ? `${x.docNo}${x.docName ? ` - ${x.docName}` : ''}` : x?.docName,
								value: x?.docNo,
							}));
						});
					};

					const applyDocumentDerivedFields = (doc: any) => {
						if (!doc) {
							clearDocumentDerivedFields();
							return;
						}
						currentForm?.setFieldState('basicInfo.grid.docName', (state) => {
							state.value = doc.docName;
						});
						currentForm?.setFieldState('basicInfo.grid.documentTypeId', (state) => {
							state.value = doc.documentTypeId;
						});
						currentForm?.setFieldState('basicInfo.grid.documentTypeName', (state) => {
							state.value = doc.documentTypeName;
						});
						currentForm?.setFieldState('basicInfo.grid.expirationPath', (state) => {
							state.value = doc.expirationPath;
						});
					};

					onFormInit((f) => {
						currentForm = f;
						if (isView && !definitionId) f.setPattern('readPretty');

						// 固定变更类型（后端也会兜底）
						f.setFieldState('basicInfo.grid.orderType', (state) => {
							state.value = FIXED_ORDER_TYPE;
						});

						if (correlationId) {
							PartDocumentChangeOrderGetAsync({ id: correlationId }).then((data: any) => {
								let attachmentData: any = undefined;
								if (data.blobName) {
									attachmentData = {
										fileName: data.blobName.split('/').pop() || data.blobName.split('\\').pop() || data.docName || '附件',
										blobName: data.blobName,
									};
								}

								f.setValues({
									...data,
									attachment: attachmentData,
									orderType: FIXED_ORDER_TYPE,
								});

								if (data.partNo) {
									PartDocumentChangeOrderGetDocumentsByMaterialCodeAsync({
										materialCode: data.partNo,
									}).then((res) => {
										documentsByMaterialCode = res?.items || [];
										setDocNoOptions(documentsByMaterialCode);
									});
								}
							});
						}
					});

					onFieldValueChange('basicInfo.grid.partNo', async (field) => {
						const materialCode = typeof field.value === 'object' ? field.value?.value : field.value;

						currentForm?.setFieldState('basicInfo.grid.docNo', (state) => {
							state.loading = true;
						});

						try {
							if (!materialCode) {
								documentsByMaterialCode = [];
								setDocNoOptions([]);
								currentForm?.setFieldState('basicInfo.grid.docNo', (state) => {
									state.value = undefined;
								});
								clearDocumentDerivedFields();
								return;
							}

							const res = await PartDocumentChangeOrderGetDocumentsByMaterialCodeAsync({
								materialCode,
							});
							documentsByMaterialCode = res?.items || [];
							setDocNoOptions(documentsByMaterialCode);

							if (documentsByMaterialCode.length === 1) {
								currentForm?.setFieldState('basicInfo.grid.docNo', (state) => {
									state.value = documentsByMaterialCode[0]?.docNo;
								});
								applyDocumentDerivedFields(documentsByMaterialCode[0]);
								return;
							}

							const currentDocNo = currentForm?.values?.docNo;
							const currentDoc = documentsByMaterialCode.find((x) => x.docNo === currentDocNo);
							if (currentDoc) {
								applyDocumentDerivedFields(currentDoc);
							} else {
								currentForm?.setFieldState('basicInfo.grid.docNo', (state) => {
									state.value = undefined;
								});
								clearDocumentDerivedFields();
							}
						} finally {
							currentForm?.setFieldState('basicInfo.grid.docNo', (state) => {
								state.loading = false;
							});
						}
					});

					onFieldValueChange('basicInfo.grid.docNo', (field) => {
						const docNo = field.value;
						if (!docNo) {
							clearDocumentDerivedFields();
							return;
						}
						const doc = documentsByMaterialCode.find((x) => x.docNo === docNo);
						if (doc) applyDocumentDerivedFields(doc);
					});

					onFieldValueChange('basicInfo.grid.attachment', async (field) => {
						const fileName = field.value?.fileName;
						if (!fileName || lastAttachmentFileName === fileName) return;
						lastAttachmentFileName = fileName;

						const version = extractVersionFromFileName(fileName);
						if (version) {
							currentForm?.setFieldState('basicInfo.grid.docVersion', (state) => {
								state.value = version;
							});
						}

						try {
							const res = await PartDocumentChangeOrderMatchDocumentByAttachmentNameAsync({
								fileName,
							});
							const docs = res?.items || [];
							if (docs.length === 0) return;

							const matched = docs[0];
							const currentDocNo = currentForm?.values?.docNo;
							if (currentDocNo && matched?.docNo && currentDocNo !== matched.docNo) {
								const shouldReplace = await confirmReplaceDocNo(currentDocNo, matched.docNo);
								if (!shouldReplace) return;
							}

							if (!documentsByMaterialCode.find((x) => x.docNo === matched.docNo)) {
								documentsByMaterialCode = [matched, ...documentsByMaterialCode];
								setDocNoOptions(documentsByMaterialCode);
							}

							currentForm?.setFieldState('basicInfo.grid.docNo', (state) => {
								state.value = matched.docNo;
							});
							applyDocumentDerivedFields(matched);
						} catch (e) {
							console.error('[PartDocumentChangeOrder] 附件匹配文档失败:', e);
						}
					});
				},
			}),
		[correlationId, isView, definitionId],
	);

	useEffect(() => {
		if (workflowInfo.executionLogs) {
			$workflowInfo.currentActivityName = workflowInfo.currentActivityName!;
			// @ts-ignore
			$workflowInfo.executionActivityNames = workflowInfo.executionLogs?.map((x) => x.activityDisplayName);
		}
	}, [workflowInfo]);

	useEffect(() => {
		$workflowInfo.isCreateMode = isCreateMode;
	}, [isCreateMode, $workflowInfo]);

	return (
		<Form form={form} {...schema.form}>
			<SchemaField schema={schema.schema} scope={{ $workflowInfo }} />

			<FooterToolbar>
				<Button onClick={callback} disabled={submitting}>
					返回
				</Button>

				{isCreateMode && (
					<Button type="primary" icon={<SaveOutlined />} onClick={handleSave} loading={submitting}>
						保存
					</Button>
				)}

				{!isCreateMode && (
					<>
						<WorkflowSubmit
							workflowInfo={{ workflowDefinitionId: definitionId, workflowInstanceId }}
							entityForm={form}
							onConfirm={() => { }}
							onComplete={handleSubmit}
						/>

						<WorkflowCompleteDialog
							workflowInfo={{ workflowDefinitionId: definitionId, workflowInstanceId, activityId }}
							entityForm={form}
							onConfirm={() => { }}
							onComplete={handleSubmit}
						/>

						<WorkflowRejectDialog
							workflowInfo={{ workflowDefinitionId: definitionId, workflowInstanceId, activityId }}
							entityForm={form}
							onConfirm={callback}
						/>
					</>
				)}
			</FooterToolbar>
		</Form>
	);
};

export default PartDocumentChangeOrderFormModal;
