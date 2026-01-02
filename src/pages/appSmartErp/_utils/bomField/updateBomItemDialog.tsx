import { SaleOrderGetBomItemAsync, SaleOrderUpdateBomItemAsync } from '@/services/smarterp/SaleOrder';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { useSchemaField } from 'umi';
import { Button } from 'antd';
import React from 'react';

interface UpdateFormDialogProps {
	entityId: string;
	title: string;
	buttonProps?: any;
	onAfterSubmit?: () => void;
	children?: React.ReactNode;
	rowData?: any; // 添加行数据支持
	onSelectRow?: (rowId: string) => void; // 添加选中行的回调
}

const UpdateFormDialog: React.FC<UpdateFormDialogProps> = (props) => {
	const { entityId, title, buttonProps, onAfterSubmit, children, rowData, onSelectRow } = props;

	const SchemaField = useSchemaField({});


	const portalId = `UpdateBomItemDialog${entityId}`;

	const handleClick = async () => {
		// 首先选中对应的行
		if (onSelectRow && entityId) {
			onSelectRow(entityId);
			// 添加短暂延时确保选中状态在UI中可见
			await new Promise(resolve => setTimeout(resolve, 100));
		}

		let formData = rowData;

		// 如果没有 rowData，先从 API 加载
		if (!rowData || Object.keys(rowData).length === 0) {
			if (entityId) {
				try {
					formData = await SaleOrderGetBomItemAsync({ bomItemId: entityId });
				} catch (error) {
					console.error('Failed to load entity:', error);
					formData = {};
				}
			}
		}

		const formDialog = FormDialog(
			{ title: title, width: 900 },
			portalId,
			() => (
				<FormLayout labelWidth={100} feedbackLayout={'none'}>
					<SchemaField>
						<SchemaField.Void
							x-component="FormGrid"
							x-component-props={{
								maxColumns: [1, 2, 2],
								minColumns: [1, 2, 2],
								columnGap: 16,
								rowGap: 16
							}}
						>
							{/* 基础信息 - 只读展示 */}
							<SchemaField.String
								title="物料编码"
								name="materialCode"
								x-decorator="FormItem"
								x-component="Input"
								x-read-pretty={true}
								x-decorator-props={{
									gridSpan: 1
								}}
							/>
							<SchemaField.String
								title="外部编码"
								name="materialOutCode"
								x-decorator="FormItem"
								x-component="Input"
								x-read-pretty={true}
								x-decorator-props={{
									gridSpan: 1
								}}
							/>

							{/* 物料描述 - 单独一行 */}
							<SchemaField.String
								title="物料描述"
								name="materialDescription"
								x-decorator="FormItem"
								x-component="Input"
								x-read-pretty={true}
								x-decorator-props={{
									gridSpan: 2
								}}
							/>

							{/* 可编辑字段 */}
							<SchemaField.String
								title="来源"
								name="comeFrom"
								x-decorator="FormItem"
								x-component="Input"
								x-read-pretty={true}
								x-decorator-props={{
									gridSpan: 1
								}}
							/>
							<SchemaField.String
								title="用量"
								name="qty"
								required
								x-decorator="FormItem"
								x-component="Input"
								x-component-props={{
									placeholder: '请输入用量',
									style: { width: '100%' },
									type: 'number',
									step: 0.01,
									min: 0
								}}
								x-decorator-props={{
									gridSpan: 1
								}}
							/>

							{/* 备注 - 占满一行 */}
							<SchemaField.String
								title="备注"
								name="memo"
								x-decorator="FormItem"
								x-component="Input.TextArea"
								x-component-props={{
									placeholder: '请输入备注',
									autoSize: { minRows: 2, maxRows: 4 }
								}}
								x-decorator-props={{
									gridSpan: 2
								}}
							/>
						</SchemaField.Void>
					</SchemaField>
				</FormLayout>
			)
		);

		formDialog
			.forConfirm((payload, next) => {
				const values: any = payload.values;

				// 只传递 UpdateBomItemDto 需要的字段
				const updateData = {
					id: entityId,
					qty: values.qty,
					memo: values.memo
				};

				return SaleOrderUpdateBomItemAsync(updateData).then(() => {
					if (onAfterSubmit) onAfterSubmit();
					next(payload);
				});
			})
			.open({
				initialValues: formData
			});
	};

	return (
		<FormDialog.Portal id={portalId}>
			<Button
				type={'primary'}
				onClick={handleClick}
				{...buttonProps}
			>
				{children}
			</Button>
		</FormDialog.Portal>
	);
};

export default UpdateFormDialog;