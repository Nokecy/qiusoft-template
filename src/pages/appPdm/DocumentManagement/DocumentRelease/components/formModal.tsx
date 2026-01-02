import React, { useMemo, useState, useCallback } from 'react';
import { Button, message } from 'antd';
import { Form } from '@formily/antd-v5';
import { createForm, onFormInit } from '@formily/core';
import { useFormSchema, useSchemaField } from '@umijs/max';
import { ToolBar as FooterToolbar } from '@/components';
import { pubGoBack } from '@/components/public';
import {
	DocumentReleaseGetAsync,
	DocumentReleaseCreateAsync,
	DocumentReleaseUpdateAsync,
} from '@/services/pdm/DocumentRelease';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import DocumentSelectDialog from '../_components/DocumentSelectDialog';
import { formId, formSchema } from './schema';
import dayjs from 'dayjs';

/**
 * 文档发放表单组件
 * @param props
 * @returns
 */
const DocumentReleaseFormModal = (props: any) => {
	const { query, isNew } = props;
	const { id } = query;
	const isEdit = !!id;

	const schema = useFormSchema(formId, formSchema);
	const SchemaField = useSchemaField({ UserSelect });

	// 文档选择弹窗状态
	const [documentSelectVisible, setDocumentSelectVisible] = useState(false);

	const callback = pubGoBack;

	/**
	 * 提交表单
	 * @param formValues
	 * @returns
	 */
	const handleSubmit = (formValues: any) => {
		return form.submit((values) => {
			// 验证审批人必填字段 - UserSelect 使用 labelInValue 格式
			if (!values.approverId?.value || !values.approverId?.label) {
				message.error('审批人不能为空');
				throw new Error('审批人不能为空');
			}

			// 从 UserSelect labelInValue 中提取值
			const approverCode = values.approverId.value;
			const approverName = values.approverId.label;

			// 处理接收人字段（使用 labelInValue 格式，值为对象数组 [{ value, label, name, id }]）
			const recipientValues = values.recipientIds || [];
			const recipients = recipientValues.map((item: any) => {
				// labelInValue 格式: { value: userId, label: displayText, name?: userName }
				const recipientId = item.value || item.id || item;
				const recipientName = item.name || item.label || '';
				return {
					recipientId,
					recipientName,
				};
			});

			// 处理文档明细,从documentSelect中提取documentVersionId、documentNumber和documentName
			const submitData = {
				...values,
				documents: values.documents?.map((doc: any) => {
					// 从documentSelect对象中提取必要字段
					const documentVersionId = doc.documentSelect?.documentVersionId || '';
					const documentNumber = doc.documentSelect?.documentNumber || '';
					const documentName = doc.documentSelect?.documentName || '';

					// 验证必填字段
					if (!documentVersionId) {
						message.error('请选择文档版本');
						throw new Error('文档版本ID不能为空');
					}

					if (!documentNumber) {
						message.error('请选择文档');
						throw new Error('文档编号不能为空');
					}

					if (!documentName) {
						message.error('文档名称不能为空');
						throw new Error('文档名称不能为空');
					}

					// 返回API需要的格式
					return {
						documentVersionId,
						documentNumber,
						documentName,
						copies: doc.copies || 1,
						isFirstRelease: doc.isFirstRelease,
						releaseVersion: doc.releaseVersion,
						recallVersion: doc.recallVersion,
						effectiveDate: doc.effectiveDate ? dayjs(doc.effectiveDate).format('YYYY-MM-DD') : undefined,
						requiresConfirmation: doc.requiresConfirmation,
						nonRecallRecipientIds: doc.nonRecallRecipientIds,
						expectedRecallDate: doc.expectedRecallDate ? dayjs(doc.expectedRecallDate).format('YYYY-MM-DD') : undefined,
						remarks: doc.remarks,
					};
				}),
			};

			// 构建最终提交数据，添加处理后的 recipients 和 审批人信息
			const finalSubmitData = {
				...submitData,
				recipients,
				approverCode,
				approverName,
			};

			if (isEdit) {
				return DocumentReleaseUpdateAsync(
					{ id },
					{
						title: submitData.title,
						description: submitData.description,
						approverCode: submitData.approverCode,
						approverName: submitData.approverName,
					}
				).then(() => {
					message.success('更新成功');
					callback();
				});
			} else {
				return DocumentReleaseCreateAsync(finalSubmitData as any).then(() => {
					message.success('创建成功');
					callback();
				});
			}
		}).catch((errors) => {
			console.error('表单提交失败:', errors);
			if (Array.isArray(errors)) {
				const errorMessages = errors.map((e: any) => e.messages || e.message).filter(Boolean);
				if (errorMessages.length > 0) {
					message.error(`表单验证失败: ${errorMessages.join(', ')}`);
				}
			}
		});
	};

	const form = useMemo(
		() =>
			createForm({
				effects: () => {
					/**
					 * 表单初始化
					 */
					onFormInit((form) => {
						if (id) {
							DocumentReleaseGetAsync({ id }).then((data) => {
								form.setValues({
									releaseNumber: data.releaseNumber,
									title: data.title,
									description: data.description,
									// 审批人使用 UserSelect labelInValue 格式
									approverId: data.approverCode ? { value: data.approverCode, label: data.approverName } : undefined,
									recipientIds: data.recipients?.map((r) => ({
										value: r.recipientId,
										label: r.recipientName,
										name: r.recipientName,
									})),
									documents: data.documents?.map((doc) => ({
										documentSelect: {
											documentVersionId: doc.documentVersionId,
											documentNumber: doc.documentNumber,
											documentName: doc.documentName,
											version: doc.releaseVersion,
										},
										documentNumber: doc.documentNumber,
										documentName: doc.documentName,
										copies: doc.copies,
										isFirstRelease: doc.isFirstRelease,
										releaseVersion: doc.releaseVersion,
										recallVersion: doc.recallVersion,
										effectiveDate: doc.effectiveDate ? dayjs(doc.effectiveDate) : null,
										requiresConfirmation: doc.requiresConfirmation,
										nonRecallRecipientIds: doc.nonRecallRecipientIds,
										expectedRecallDate: doc.expectedRecallDate ? dayjs(doc.expectedRecallDate) : null,
										remarks: doc.remarks,
									})),
								});
							});
						}
					});
				},
			}),
		[id],
	);

	// 处理文档选择确认
	const handleDocumentSelectConfirm = useCallback((selectedDocs: any[]) => {
		if (!selectedDocs || selectedDocs.length === 0) return;

		// 获取当前的 documents 数组
		const currentDocuments = form.getValuesIn('documents') || [];

		// 将选中的文档转换为表单需要的格式
		const newDocuments = selectedDocs.map(doc => ({
			documentSelect: {
				documentVersionId: doc.id,
				documentNumber: doc.documentNumber,
				documentName: doc.documentName,
				version: doc.version,
			},
			documentNumber: doc.documentNumber,
			documentName: doc.documentName,
			copies: 1,
			isFirstRelease: false,
			releaseVersion: doc.version,
			recallVersion: '',
			effectiveDate: null,
			requiresConfirmation: false,
			nonRecallRecipientIds: [],
			expectedRecallDate: null,
			remarks: '',
		}));

		// 合并到现有的 documents 数组
		form.setValuesIn('documents', [...currentDocuments, ...newDocuments]);

		// 关闭弹窗
		setDocumentSelectVisible(false);
		message.success(`已添加 ${selectedDocs.length} 个文档`);
	}, [form]);

	return (
		<>
			<Form form={form} {...schema.form}>
				<SchemaField schema={schema.schema}></SchemaField>

				{/* 选择文档按钮 - 使用 CSS 定位放在文档明细 Card 标题右侧 */}
				<div style={{
					position: 'relative',
					marginTop: -45,  // 向上偏移到 Card 标题区域
					marginBottom: 8,
					textAlign: 'right',
					paddingRight: 12,
					zIndex: 1,
				}}>
					<Button type="primary" size="small" onClick={() => setDocumentSelectVisible(true)}>
						选择文档
					</Button>
				</div>

				<FooterToolbar>
					<Button
						onClick={() => {
							callback();
						}}
					>
						返回
					</Button>

					<Button type="primary" onClick={() => handleSubmit(form.values)}>
						保存
					</Button>
				</FooterToolbar>
			</Form>

			{/* 文档选择弹窗 */}
			<DocumentSelectDialog
						title="选择文档版本"
				visible={documentSelectVisible}
				onCancel={() => setDocumentSelectVisible(false)}
				onConfirm={handleDocumentSelectConfirm}
			/>
		</>
	);
};

export default DocumentReleaseFormModal;
