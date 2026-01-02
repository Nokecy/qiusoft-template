import { ContactInfoSelect, MaterailItemSelect, WareHouseSelect } from '@/pages/appWMS/baseInfo/_utils/index';
import { InInstructionOrderCreateAsync, InInstructionOrderGetAsync, InInstructionOrderUpdateAsync } from '@/services/wms/InInstructionOrder';
import ProCard from '@ant-design/pro-card';
import { ToolBar } from '@/components';
import { ArrayTable, DatePicker, Form, FormGrid, FormItem, FormLayout, FormTab, Input, NumberPicker, PreviewText, Select, Space, Submit } from '@formily/antd-v5';
import { createForm, onFormInit, onFieldInputValueChange, isField } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button } from 'antd';
import React, { useMemo, useEffect } from 'react';
import { pubGoBack } from '@/components/public';
import { MaterialItemGetAsync, MaterialItemGetListAsync } from '@/services/wms/MaterialItem';
import SaleReturnItemSourceSelectButton from '../../_utils/saleReturnItemSourceSelectButton';
import { AsnOrderTypeSelect } from '../../_utils';
import { useKeepAliveParams } from '@/hooks';

const InInstructionOrderForm = (props: any) => {
	const { id } = useKeepAliveParams();
	const { orderType, title } = props;

	const handleSubmit = () => {
		return form
			.submit(values => {
				// 清理 Formily 内部字段并转换数据结构
				const cleanValues = { ...values };
				if (cleanValues.items && Array.isArray(cleanValues.items)) {
					cleanValues.items = cleanValues.items.map(item => {
						const cleanItem = { ...item };
						delete cleanItem.__DO_NOT_USE_THIS_PROPERTY_index__;

						// 将物料字段整合到MaterialItem对象中
						cleanItem.materialItem = {
							id: cleanItem.materialId,
							code: cleanItem.materialCode,
							outCode: cleanItem.materialOutCode,
							description: cleanItem.materialDescript
						};

						// 删除原始的平铺字段
						delete cleanItem.materialId;
						delete cleanItem.materialCode;
						delete cleanItem.materialOutCode;
						delete cleanItem.materialDescript;

						return cleanItem;
					});
				}

				if (id) {
					return InInstructionOrderUpdateAsync({ id: id }, cleanValues);
				} else {
					return InInstructionOrderCreateAsync(cleanValues);
				}
			})
			.then(
				() => {
					pubGoBack()
				},
				() => {}
			);
	};

	const onSelectPurchaseOrder = items => {
		form.setValuesIn('items', items);
	};

	const form = useMemo(
		() =>
			createForm({
				effects: () => {
					onFormInit(async form => {
						if (id) {
							try {
								const saleOrder = await InInstructionOrderGetAsync({ id });
								
								// 处理编辑时的数据回填，将materialItem对象映射到表单字段
								if (saleOrder.items && Array.isArray(saleOrder.items)) {
									saleOrder.items = saleOrder.items.map(item => {
										const mappedItem = { ...item };
										
										// 将materialItem对象的属性映射到表单字段
										if (item.materialItem) {
											//@ts-ignore
											mappedItem.materialId = item.materialItem.id;
											//@ts-ignore
											mappedItem.materialCode = item.materialItem.code;
											//@ts-ignore
											mappedItem.materialOutCode = item.materialItem.outCode;
											//@ts-ignore
											mappedItem.materialDescription = item.materialItem.description;
										}
										
										return mappedItem;
									});
								}
								
								console.log('期初入库编辑回填数据:', saleOrder);
								
								// 设置初始值和当前值
								form.setInitialValues(saleOrder);
								form.setValues(saleOrder);
							} catch (error) {
								console.error('加载期初入库指令数据失败:', error);
							}
						}
						form.setValuesIn('sourceOrderType', orderType);

						form.setFieldState('items.addition', async state => {
							state.visible = orderType != 5 && orderType != 10;
						});
					});

					// 监听物料选择变化，自动填充物料信息
					onFieldInputValueChange('items.*.{value:materialId,label:materialCode}', async field => {
						const materialOutCode = field.query(`.materialOutCode`).take();
						const materialDescript = field.query(`.materialDescript`).take();
						const version = field.query(`.version`).take();
						const acProperty = field.query(`.acProperty`).take();
						const minPackQty = field.query(`.minPackQty`).take();
						
						if (isField(materialOutCode) && isField(materialDescript) && isField(version) && 
							isField(acProperty) && isField(minPackQty)) {
							
							if (field.value?.value && field.value?.value.length > 30) {
								// 通过ID获取物料信息
								let materialData = await MaterialItemGetAsync({ id: field.value?.value });
								materialOutCode.setValue(materialData.outCode || '');
								materialDescript.setValue(materialData.description || '');
								version.setValue(materialData.version || '');
								acProperty.setValue(materialData.acProperty || '');
								minPackQty.setValue(materialData.minPackQty || '');
							} else if (field.value?.value) {
								// 通过编码获取物料信息
								let materialDatas = await MaterialItemGetListAsync({ Filter: `code=${field.value?.value}` });
								if (materialDatas.items && materialDatas.items?.length > 0) {
									const material = materialDatas.items[0];
									materialOutCode.setValue(material?.outCode || '');
									materialDescript.setValue(material?.description || '');
									version.setValue(material?.version || '');
									acProperty.setValue(material?.acProperty || '');
									minPackQty.setValue(material?.minPackQty || '');
								}
							} else {
								// 清空相关字段
								materialOutCode.setValue('');
								materialDescript.setValue('');
								version.setValue('');
								acProperty.setValue('');
								minPackQty.setValue('');
							}
						}
					});
				},
			}),
		[orderType]
	);

	// 监听URL参数变化，重新加载数据（适用于KeepAlive模式）
	useEffect(() => {
		const currentId = id;

		if (currentId && currentId !== id) {
			console.log('期初入库检测到ID参数变化，重新加载数据:', { oldId: id, newId: currentId });

			// 重新加载表单数据
			InInstructionOrderGetAsync({ id: currentId }).then(saleOrder => {
				// 处理编辑时的数据回填，将materialItem对象映射到表单字段
				if (saleOrder.items && Array.isArray(saleOrder.items)) {
					saleOrder.items = saleOrder.items.map(item => {
						const mappedItem = { ...item };

						// 将materialItem对象的属性映射到表单字段
						if (item.materialItem) {
							//@ts-ignore
							mappedItem.materialId = item.materialItem.id;
							//@ts-ignore
							mappedItem.materialCode = item.materialItem.code;
							//@ts-ignore
							mappedItem.materialOutCode = item.materialItem.outCode;
							//@ts-ignore
							mappedItem.materialDescription = item.materialItem.description;
						}

						return mappedItem;
					});
				}

				console.log('期初入库重新加载数据:', saleOrder);

				// 清空并重新设置表单数据
				form.reset();
				form.setInitialValues(saleOrder);
				form.setValues(saleOrder);
			}).catch(error => {
				console.error('重新加载期初入库指令数据失败:', error);
			});
		} else if (!currentId) {
			// 如果没有ID参数（创建模式），清空表单
			form.reset();
		}
	}, [id]); // 监听id参数变化

	const SchemaField = useMemo(
		() =>
			createSchemaField({
				components: {
					Input,
					NumberPicker,
					DatePicker,
					Select,
					ProCard,
					FormItem,
					FormGrid,
					ArrayTable,
					FormTab,
					Space,
					PreviewText,
					FormLayout,
					WareHouseSelect,
					MaterailItemSelect,
					AsnOrderTypeSelect,
					SaleReturnItemSourceSelectButton,
					ContactInfoSelect,
				},
			}),
		[]
	);

	return (
		<>
			<Form form={form} layout={'horizontal'} labelWidth={110} feedbackLayout={'none'} previewTextPlaceholder={'无'}>
				<SchemaField>
					<SchemaField.Void x-component='ProCard' x-component-props={{ title: '期初基本信息', collapsible: false, headerBordered: true }}>
						<SchemaField.Void x-component='FormGrid' x-component-props={{ maxColumns: [1, 4], strictAutoFit: true }}>
							<SchemaField.String name={'orderNo'} title={'入库单号'} x-decorator='FormItem' x-component='Input' x-read-pretty={true} />

							<SchemaField.String
								required
								name={'{value:wareHouseId,label:wareHouseName}'}
								title={'入库仓库'}
								x-decorator='FormItem'
								x-component='WareHouseSelect'
								x-component-props={{ placeholder: '请输入入库仓库' }}
							/>

							<SchemaField.String
								name={'remark'}
								title={'备注'}
								x-decorator='FormItem'
								x-decorator-props={{ gridSpan: 4 }}
								x-component='Input.TextArea'
								x-component-props={{ placeholder: '请输入备注' }}
							/>

							<SchemaField.Array
								required
								name='items'
								title='到货明细'
								x-component='ArrayTable'
								x-validator={[{ message: '到货明细必须填写' }]}
								x-decorator='FormItem'
								x-decorator-props={{ gridSpan: 4 }}
							>
								<SchemaField.Object>

									<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ width: 180, title: '物料编码', fixed: 'left' }}>
										<SchemaField.String
											name={'{value:materialId,label:materialCode}'}
											required
											x-decorator='FormItem'
											x-component='MaterailItemSelect'
											x-component-props={{ labelInValue: true, placeholder: '请输入物料编码' }}
										/>
									</SchemaField.Void>

									<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ width: 150, title: '物料外码', fixed: 'left' }}>
										<SchemaField.String name={'materialOutCode'} x-component='Input' x-decorator='FormItem' x-read-pretty={true} />
									</SchemaField.Void>

									<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ title: '物料描述', fixed: 'left', ellipsis: true }}>
										<SchemaField.String
											name={'materialDescript'}
											x-component='Input'
											x-decorator='FormItem'
											x-component-props={{ placeholder: '请输入物料描述' }}
											x-read-pretty={true}
										/>
									</SchemaField.Void>

									<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ title: '物料版本', fixed: 'left', ellipsis: true }}>
										<SchemaField.String name={'version'} x-component='Input' x-decorator='FormItem' x-component-props={{ placeholder: '请输入物料版本' }} x-read-pretty={true} />
									</SchemaField.Void>

									<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ title: 'AC属性', fixed: 'left', ellipsis: true }}>
										<SchemaField.String name={'acProperty'} x-component='Input' x-decorator='FormItem' x-component-props={{ placeholder: '请输入AC属性' }} />
									</SchemaField.Void>

									<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ title: '最小包装', fixed: 'left', ellipsis: true }}>
										<SchemaField.String
											name={'minPackQty'}
											x-component='NumberPicker'
											x-decorator='FormItem'
											x-component-props={{ placeholder: '请输入最小包装' }}
										/>
									</SchemaField.Void>
									<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ width: 100, title: '交付数量' }}>
										<SchemaField.String name={'deliveryQty'} required x-component='NumberPicker' x-decorator='FormItem' x-component-props={{ placeholder: '请输入数量' }} />
									</SchemaField.Void>
									<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ title: '操作', dataIndex: 'operations', width: 50, fixed: 'right' }}>
										<SchemaField.Void x-component='ArrayTable.Remove' />
									</SchemaField.Void>
								</SchemaField.Object>

								<SchemaField.Void name={'addition'} x-component='ArrayTable.Addition' x-component-props={{ type: 'primary', block: false }} title='新增明细' />
							</SchemaField.Array>
						</SchemaField.Void>
					</SchemaField.Void>
				</SchemaField>

				{
					<ToolBar style={{ zIndex: window.location.pathname.indexOf('form') != -1 ? 0 : -1 }}>
						<Button
							onClick={() => {
								pubGoBack()
							}}
						>
							返回
						</Button>

						<Submit type={'primary'} onSubmit={handleSubmit}>
							提交
						</Submit>
					</ToolBar>
				}
			</Form>
		</>
	);
};

export default InInstructionOrderForm;
