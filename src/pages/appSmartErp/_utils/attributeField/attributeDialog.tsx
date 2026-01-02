import { FormDialog, FormLayout, FormGrid, FormItem, Input, Select, NumberPicker } from '@formily/antd-v5';
import { createSchemaField } from '@formily/react';
import { Empty } from 'antd';
import React from 'react';

interface AttributeDialogProps {
	attributeSchema: any[];
	initValues: any;
	portalId?: string;
}

const SchemaField = createSchemaField({
	components: {
		FormItem,
		FormGrid,
		Input,
		Select,
		NumberPicker,
	},
});

const showAttributeDialog = (props: AttributeDialogProps) => {
	const { attributeSchema, initValues } = props;
	const attributeCount = attributeSchema?.length || 0;
	const dialogTitle = `物料特性配置 ${attributeCount > 0 ? `(共${attributeCount}个特性)` : ''}`;
	
	return FormDialog({ 
		title: dialogTitle,
		width: 1200,
		closable: true,
		maskClosable: true,
		okText: '确认设置',
		cancelText: '取消'
	}, `${props.portalId}`, () => {
		if (!attributeSchema || attributeSchema.length === 0) {
			return (
				<Empty 
					description="该物料暂无可配置的特性"
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					style={{ padding: '60px 20px' }}
				/>
			);
		}
		
		return (
			<FormLayout layout={'horizontal'} labelWidth={100} feedbackLayout={'none'}>
				<SchemaField>
					<SchemaField.Void 
						x-component='FormGrid' 
						x-component-props={{ 
							maxColumns: 4, 
							minColumns: 1, 
							rowGap: 16, 
							columnGap: 16
						}}
					>
						{attributeSchema.map((attribute) => {
							const component = attribute.dataType === 1 ? 'NumberPicker' : 'Input';
							const hasOptions = attribute.attributeValues && attribute.attributeValues.length > 0;
							
							if (hasOptions) {
								return (
									<SchemaField.String
										key={attribute.name}
										name={attribute.name}
										title={attribute.displayName}
										required={attribute.required}
										x-component='Select'
										x-decorator='FormItem'
										enum={attribute.attributeValues.map(a => ({
											label: a.value,
											value: a.value
										}))}
										x-component-props={{ 
											placeholder: `请选择${attribute.displayName}`,
											showSearch: true,
											allowClear: true,
											style: { width: '100%' }
										}}
									/>
								);
							} else {
								return (
									<SchemaField.String
										key={attribute.name}
										name={attribute.name}
										title={attribute.displayName}
										required={attribute.required}
										x-component={component}
										x-decorator='FormItem'
										x-component-props={{ 
											placeholder: `请输入${attribute.displayName}`,
											style: { width: '100%' },
											...(component === 'NumberPicker' ? {
												min: attribute.minValue,
												max: attribute.maxValue
											} : {})
										}}
									/>
								);
							}
						})}
					</SchemaField.Void>
				</SchemaField>
			</FormLayout>
		);
	})
	.forConfirm(async (payload, next) => {
		// 在确认时先进行 BOM 计算验证
		next(payload);
	})
	.open({
		initialValues: initValues,
	});
};

export default showAttributeDialog;
