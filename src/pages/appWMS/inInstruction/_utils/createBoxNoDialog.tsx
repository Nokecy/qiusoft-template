import { InInstructionOrderLpnItemGenerateBoxNumberAsync } from '@/services/wms/InInstructionOrderLpnItem';
import { FormDialog, FormGrid, FormItem, FormLayout, NumberPicker, Input, Select, Space } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button, InputNumber } from 'antd';
import React, { useMemo } from 'react';

const CreateBoxNoDialog = (props: any) => {
	const { data, orderNo, title, buttonProps, onAfterSubmit } = props;

	const SchemaField = useMemo(
		() =>
			createSchemaField({
				components: {
					NumberPicker,
					FormItem,
					FormGrid,
					Space,
					Input,
					Select,
				},
			}),
		[]
	);

	const formProps = {
		initialValues: {
			asnOrderItemId: data.id,
			materialId: data.materialId || data.materialItem?.id,
			asnOrderNo: orderNo,
			deliveryQty: data.deliveryQty,
			minPackQty: data.minPackQty || 0, // 自动带入最小包装数，默认为0
		},
		effects: () => {
			onFormInit(form => {
				console.log('生成箱条码 - 选中的数据:', data);
				console.log('materialId:', data.materialId);
				console.log('minPackQty:', data.minPackQty);
				
				// 确保字段值正确设置
				form.setFieldState('minPackQty', state => {
					state.value = data.minPackQty || 0;
				});
			});
		},
	};

	const portalId = `batchNo${data.materialId}`;
	return (
		<FormDialog.Portal id={portalId}>
			<Button
				type={'primary'}
				onClick={() => {
					let formDialog = FormDialog({ title: title, width: 720 }, portalId, () => {
						return (
							<FormLayout labelWidth={120} feedbackLayout={'none'} shallow={false}>
								<SchemaField>
									{/* 显示区域 - 入库指令信息 */}
									<SchemaField.Void x-component={'FormGrid'} x-component-props={{ maxColumns: [1, 2, 2] }}>
										<SchemaField.String 
											title={'入库指令单号'} 
											name={'displayOrderNo'} 
											default={orderNo}
											x-decorator='FormItem' 
											x-component={'Input'} 
											x-read-pretty 
										/>
										<SchemaField.String 
											title={'来源单据号'} 
											name={'displaySourceOrderNo'} 
											default={data.sourceOrderNo || ''}
											x-decorator='FormItem' 
											x-component={'Input'} 
											x-read-pretty 
										/>
									</SchemaField.Void>

									{/* 显示区域 - 物料信息 */}
									<SchemaField.Void x-component={'FormGrid'} x-component-props={{ maxColumns: [1, 2, 2] }}>
										<SchemaField.String 
											title={'物料编码'} 
											name={'displayMaterialCode'} 
											default={data.materialItem?.code || ''}
											x-decorator='FormItem' 
											x-component={'Input'} 
											x-read-pretty 
										/>
										<SchemaField.String 
											title={'外部物料编码'} 
											name={'displayMaterialOutCode'} 
											default={data.materialItem?.outCode || ''}
											x-decorator='FormItem' 
											x-component={'Input'} 
											x-read-pretty 
										/>
									</SchemaField.Void>

									<SchemaField.Void x-component={'FormGrid'} x-component-props={{ maxColumns: [1, 1, 1] }}>
										<SchemaField.String 
											title={'物料描述'} 
											name={'displayMaterialDescription'} 
											default={data.materialItem?.description || ''}
											x-decorator='FormItem' 
											x-component={'Input'} 
											x-read-pretty 
										/>
									</SchemaField.Void>

									{/* 隐藏字段 */}
									<SchemaField.Void x-component={'FormGrid'} x-component-props={{ maxColumns: [1, 3, 4] }}>
										<SchemaField.String title={'到货明细ID'} name={'asnOrderItemId'} x-decorator='FormItem' x-component={'Input'} x-hidden={true} />
										<SchemaField.String title={'物料ID'} name={'materialId'} x-decorator='FormItem' x-component={'Input'} x-hidden={true} />
										<SchemaField.String title={'到货通知单号'} name={'asnOrderNo'} x-decorator='FormItem' x-component={'Input'} x-hidden={true} />

										{/* 操作字段 */}
										<SchemaField.String
											title={'批次'}
											name={'lotNumber'}
											x-decorator='FormItem'
											x-component={'Input'}
											x-component-props={{ placeholder: '不输入自动生成新的LPN' }}
										/>

										<SchemaField.String title={'送货数量'} name={'deliveryQty'} x-decorator='FormItem' x-component={'Input'} x-read-pretty />

										<SchemaField.Number
											required
											title={'最小包装数'}
											name={'minPackQty'}
											x-decorator='FormItem'
											x-component={'NumberPicker'}
											x-component-props={{ placeholder: '输入最小包装数量', min: 1, precision: 0 }}
											x-reactions={{
												dependencies: ['deliveryQty'],
												when: '{{$self.modified}}',
												fulfill: {
													run: '{{$form.setFieldState("count", state => { const minPackQty = $self.value; const deliveryQty = $deps[0]; if (minPackQty && deliveryQty && minPackQty > 0) { state.value = Math.ceil(deliveryQty / minPackQty); } })}}'
												}
											}}
										/>
										<SchemaField.Number
											required
											title={'箱数'}
											name={'count'}
											x-decorator='FormItem'
											x-component={'NumberPicker'}
											x-component-props={{ placeholder: '输入箱数', min: 1, precision: 0 }}
											x-reactions={{
												dependencies: ['deliveryQty'],
												when: '{{$self.modified}}',
												fulfill: {
													run: '{{$form.setFieldState("minPackQty", state => { const count = $self.value; const deliveryQty = $deps[0]; if (count && deliveryQty && count > 0) { state.value = Math.ceil(deliveryQty / count); } })}}'
												}
											}}
										/>
									</SchemaField.Void>
								</SchemaField>
							</FormLayout>
						);
					});

					formDialog
						.forConfirm((payload, next) => {
							let values: any = payload.values;
							console.log('提交的表单数据:', values);
							console.log('最小包装数值:', values.minPackQty);
							return InInstructionOrderLpnItemGenerateBoxNumberAsync(values).then(() => {
								if (onAfterSubmit) onAfterSubmit();
								next(payload);
							});
						})
						.open(formProps);
				}}
				{...buttonProps}
			>
				{props.children}
			</Button>
		</FormDialog.Portal>
	);
};

export default CreateBoxNoDialog;
