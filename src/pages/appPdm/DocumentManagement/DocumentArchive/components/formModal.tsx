import React, { useEffect, useMemo } from 'react';
import { Button, message } from 'antd';
import { Form } from '@formily/antd-v5';
import { createForm, onFormInit, onFieldValueChange } from '@formily/core';
import { useFormSchema, useSchemaField } from '@umijs/max';
import { ToolBar as FooterToolbar } from '@/components';
import { closeTab, history } from 'umi';
import {
	DocumentArchiveGetAsync,
	DocumentArchiveCreateAsync,
	DocumentArchiveUpdateAsync,
} from '@/services/pdm/DocumentArchive';
import { DocumentTypeGetAsync } from '@/services/pdm/DocumentType';
import DocumentTypeSelect from '../../Document/components/DocumentTypeSelect';
import AttachmentUpload from '@/components/AttachmentUpload';
import PartSelect from '@/pages/appPdm/_utils/PartSelect';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import DocumentSelect from '@/pages/appPdm/_formWidgets/DocumentSelect';
import { formId, formSchema } from './schema';
import { DocumentArchiveType, documentArchiveTypeOptions } from '../_enums';
import { isGuidLike, normalizeDocNoInput } from '@/pages/appPdm/_utils/docNo';

/**
 * 文档归档表单组件
 * @param props
 * @returns
 */
const DocumentArchiveFormModal = (props: any) => {
	const { query, isNew } = props;
	const { id } = query;
	const isEdit = !!id;

	const schema = useFormSchema(formId, formSchema);
	const SchemaField = useSchemaField({
		DocumentTypeSelect,
		DocumentSelect,
		AttachmentUpload,
		PartSelect,
		UserSelect
	});

	const handleBack = () => {
		const currentPath = `${history.location.pathname}${history.location.search || ''}`;
		history.push('/appPdm/DocumentManagement/DocumentArchive');
		setTimeout(() => {
			closeTab(currentPath);
		}, 150);
	};

	/**
	 * 提交表单
	 * @param formValues
	 * @returns
	 */
	const handleSubmit = (formValues: any) => {
		return form.submit((values) => {
			const { docNo, selectedDocumentId } = normalizeDocNoInput(values.docNo);
			const resolvedPartNo = typeof values.partNo === 'object' ? values.partNo.value : values.partNo;
			const resolvedPartName =
				(values.partName as string | undefined) ?? (typeof values.partNo === 'object' ? values.partNo.label : undefined);

			// 处理表单数据
			const submitData = {
				...values,
				docNo,
				targetDocumentId: isGuidLike(selectedDocumentId) ? selectedDocumentId : null,
				// 处理附件 uploadId
				uploadId: values.attachment?.uploadId,
				// 处理物料编码（PartSelect 返回 labelInValue 格式）
				partNo: resolvedPartNo,
				partName: resolvedPartName,
				// 处理审批人（UserSelect 返回 labelInValue 格式）
				approverCode: typeof values.approverCode === 'object' ? values.approverCode.value : values.approverCode,
			};

			// 移除不需要提交的字段
			delete submitData.attachment;
			if (resolvedPartNo === undefined || resolvedPartNo === null || `${resolvedPartNo}`.trim() === '') {
				delete submitData.partNo;
				delete submitData.partName;
			}

			if (isEdit) {
				return DocumentArchiveUpdateAsync({ id }, submitData as any).then(() => {
					message.success('更新成功');
					handleBack();
				});
			} else {
				return DocumentArchiveCreateAsync(submitData as any).then(() => {
					message.success('创建成功');
					handleBack();
				});
			}
		}).catch((error) => {
			console.error(error);
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
						// 设置归档类型选项
						form.setFieldState('basicInfo.grid1.archiveType', (state) => {
							state.dataSource = documentArchiveTypeOptions;
					if (isEdit) {
						form.setFieldState('basicInfo.grid1.archiveType', (state) => {
							state.disabled = true;
						});
					}
						});

						if (id) {
							DocumentArchiveGetAsync({ id }).then((data) => {
								// 处理编辑时的数据回显
								const formData: any = { ...data };

								// 非首次归档：docNo 用 DocumentSelect 回显（labelInValue）
								if (data.archiveType !== DocumentArchiveType.FirstArchive && data.docNo) {
									formData.docNo = {
										value: (data as any).targetDocumentId ?? data.docNo,
										id: (data as any).targetDocumentId ?? undefined,
										label: data.docNo,
										documentNumber: data.docNo,
									};
								}

								// 处理物料数据（转换为 labelInValue 格式）
								if (data.partNo) {
									formData.partNo = {
										value: data.partNo,
										label: data.partName || data.partNo,
									};
								}

								// 处理审批人数据（转换为 labelInValue 格式）
								if (data.approverCode) {
									formData.approverCode = {
										value: data.approverCode,
										label: data.approverName || data.approverCode,
									};
								}

								form.setValues(formData);
							});
						}
					});

					/**
					 * 归档类型变化：新建单据时切换类型，清理与文档选择强绑定的字段，避免残留脏数据
					 */
					onFieldValueChange('basicInfo.grid1.archiveType', (field) => {
						if (isEdit) return;

						const archiveType = field.value as number | undefined;
						if (archiveType === DocumentArchiveType.FirstArchive) {
							// 切回首次归档：清空 docNo 选择对象，但保留用户后续可手动输入
							form.setValues({
								docNo: undefined,
								documentName: undefined,
								documentTypeId: undefined,
								docVersion: undefined,
								partNo: undefined,
								partName: undefined,
							});
						} else {
							// 非首次归档：强制从已有文档选择，清空相关字段等待联动回填
							form.setValues({
								docNo: undefined,
								documentName: undefined,
								documentTypeId: undefined,
								docVersion: undefined,
								partNo: undefined,
								partName: undefined,
							});
						}
					});

					/**
					 * 文档编码选择变化（非首次归档）：带出主物料、文档类型、文档版本(version+revision)
					 */
					onFieldValueChange('basicInfo.grid1.docNo', (field) => {
						const archiveType = (form.values as any)?.archiveType as number | undefined;
						if (archiveType !== DocumentArchiveType.OptimizationArchive && archiveType !== DocumentArchiveType.ChangeArchive) return;

						const selected = field.value as any;
						if (!selected) {
							form.setValues({
								documentName: undefined,
								documentTypeId: undefined,
								docVersion: undefined,
								partNo: undefined,
								partName: undefined,
							});
							return;
						}

						if (typeof selected === 'object') {
							// 文档名称
							if (selected.documentName) {
								form.setFieldState('basicInfo.grid1.documentName', (state) => {
									state.value = selected.documentName;
								});
							}

							// 文档类型
							if (selected.documentTypeId) {
								form.setFieldState('basicInfo.grid1.documentTypeId', (state) => {
									state.value = selected.documentTypeId;
								});
							}

							// 文档版本：按业务要求改为手动输入，不再从所选文档自动带出

							// 主物料信息
							const primaryPartLink = selected.primaryPartLink;
							const partNumber = primaryPartLink?.partNumber;
							const partName = primaryPartLink?.partName;
							if (partNumber) {
								form.setFieldState('basicInfo.grid1.partNo', (state) => {
									state.value = {
										value: partNumber,
										label: partName || partNumber,
									};
								});
								form.setFieldState('basicInfo.grid1.partName', (state) => {
									state.value = partName || partNumber;
								});
							} else {
								form.setFieldState('basicInfo.grid1.partNo', (state) => {
									state.value = undefined;
								});
								form.setFieldState('basicInfo.grid1.partName', (state) => {
									state.value = undefined;
								});
							}
						}
					});

					/**
					 * 文档类型选择变化
					 * 联动设置 documentTypeCode 和 documentTypeName
					 */
					onFieldValueChange('basicInfo.grid1.documentTypeId', async (field) => {
						const documentTypeId = field.value;
						if (documentTypeId) {
							try {
								const docType = await DocumentTypeGetAsync({ id: documentTypeId });
								// 设置文档类型编码和名称
								form.setFieldState('documentTypeCode', (state) => {
									state.value = docType.typeCode;
								});
								form.setFieldState('documentTypeName', (state) => {
									state.value = docType.typeName;
								});
							} catch (error) {
								console.error('获取文档类型详情失败:', error);
							}
						} else {
							form.setFieldState('documentTypeCode', (state) => {
								state.value = undefined;
							});
							form.setFieldState('documentTypeName', (state) => {
								state.value = undefined;
							});
						}
					});

					/**
					 * 物料选择变化
					 * 联动设置 partName
					 */
					onFieldValueChange('basicInfo.grid1.partNo', (field) => {
						const partValue = field.value;
						if (partValue) {
							// PartSelect 使用 labelInValue 模式，返回格式: { label, value }
							const partName = typeof partValue === 'object' ? partValue.label : '';
							form.setFieldState('basicInfo.grid1.partName', (state) => {
								state.value = partName;
							});
						} else {
							form.setFieldState('basicInfo.grid1.partName', (state) => {
								state.value = undefined;
							});
						}
					});

					/**
					 * 审批人选择变化
					 * 联动设置 approverName
					 */
					onFieldValueChange('basicInfo.grid1.approverCode', (field) => {
						const approverValue = field.value;
						if (approverValue) {
							// UserSelect 使用 labelInValue 模式，返回格式: { label, value }
							const approverName = typeof approverValue === 'object' ? approverValue.label : approverValue;
							form.setFieldState('approverName', (state) => {
								state.value = approverName;
							});
						} else {
							form.setFieldState('approverName', (state) => {
								state.value = undefined;
							});
						}
					});
				},
			}),
		[id],
	);

	return (
		<Form form={form} {...schema.form}>
			<SchemaField schema={schema.schema}></SchemaField>

			<FooterToolbar>
				<Button
					onClick={() => {
						handleBack();
					}}
				>
					返回
				</Button>

				<Button type="primary" onClick={() => handleSubmit(form.values)}>
					保存
				</Button>
			</FooterToolbar>
		</Form>
	);
};

export default DocumentArchiveFormModal;
