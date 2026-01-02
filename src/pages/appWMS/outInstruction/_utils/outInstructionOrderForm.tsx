import { WareHouseSelect, MaterailItemSelect, ContactInfoSelect } from '@/pages/appWMS/baseInfo/_utils';
import { CustomerSelect } from '@/pages/appCommon/_utils';
import { OutInstructionOrderCreateAsync, OutInstructionOrderGetAsync, OutInstructionOrderUpdateAsync } from '@/services/wms/OutInstructionOrder';
import { MaterialItemGetAsync } from '@/services/wms/MaterialItem';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import { ToolBar } from '@/components';
import { ArrayTable, DatePicker, Form, FormGrid, FormItem, FormLayout, Input, NumberPicker, PreviewText, Select, Space, Submit, Checkbox } from '@formily/antd-v5';
import { createForm, onFormInit, onFieldInputValueChange, isField } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button } from 'antd';
import React, { useMemo } from 'react';
import { history, dropByCacheKey } from 'umi';
import { ShipmentOrderTypeSelect } from '@/pages/appWMS/outInstruction/_utils';
import { pubGoBack } from '@/components/public';
import { useKeepAliveParams } from '@/hooks';

const OutInstructionForm = (props: any) => {
	const { orderType, title } = props;
	const { id } = useKeepAliveParams();

	const handleSubmit = () => {
		return form
			.submit(values => {
				values.callBackStatus = values.callStatus === true ? 10 : 5;
				if (id) {
					///@ts-ignore
					return OutInstructionOrderUpdateAsync({ id: id }, values);
				} else {
					return OutInstructionOrderCreateAsync(values);
				}
			})
			.then(
				() => {
					pubGoBack()
				},
				() => {}
			);
	};
	const form = useMemo(
		() =>
			createForm({
				effects: () => {
					onFormInit(async form => {
						form.setValuesIn('orderType', orderType);
						if (id) {
							///@ts-ignore
							OutInstructionOrderGetAsync({ id }).then((saleOrder: any) => {
								saleOrder.callStatus = saleOrder.callBackStatus > 5 ? true : false;
								form.setInitialValues(saleOrder);
							});
						}
					});
					onFieldInputValueChange('items.*.{value:materialId,label:materialOutCode}', async field => {
						const materialCode = field.query(`.materialCode`).take();
						const materialDescript = field.query(`.materialDescript`).take();
						if (isField(materialCode) && isField(materialDescript)) {
							let materialData: any = await MaterialItemGetAsync({ id: field.value.value });
							materialCode.setValue(materialData.code);
							materialDescript.setValue(materialData.description);
						}
					});
				},
			}),
		[]
	);

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
					Space,
					PreviewText,
					FormLayout,
					WareHouseSelect,
					MaterailItemSelect,
					CustomerSelect,
					ShipmentOrderTypeSelect,
					ContactInfoSelect,
					Checkbox,
				},
			}),
		[]
	);

	const getHeight = () => {
		return document.getElementsByTagName('body')[0].clientHeight - 96 - 30 - 70;
	};

	return (
		<>
			<Form form={form} layout={'horizontal'} labelWidth={110} feedbackLayout={'terse'} previewTextPlaceholder={'无'} style={{ height: getHeight(), overflow: 'auto' }}>
				<SchemaField>
					<SchemaField.Void x-component='ProCard' x-component-props={{ title: '基本信息', collapsible: false, headerBordered: true }}>
						<SchemaField.Void x-component='FormGrid' x-component-props={{ maxColumns: [1, 4], strictAutoFit: true }}>
							<SchemaField.String name={'orderNo'} title={'发货单号'} x-decorator='FormItem' x-component='Input' x-read-pretty={true} />

							<SchemaField.String
								required
								name={'orderType'}
								title={'发货类型'}
								x-decorator='FormItem'
								x-component='ShipmentOrderTypeSelect'
								x-component-props={{ placeholder: '请输入单据类型' }}
								x-read-pretty={true}
							/>

							<SchemaField.String
								name={'{value:wareHouseId,label:wareHouseName}'}
								title={'发货仓库'}
								x-decorator='FormItem'
								x-component='WareHouseSelect'
								x-component-props={{ labelInValue: true, placeholder: '请输入收货仓库' }}
								x-validator={[{ required: true, message: '发料仓库必须填写' }]}
							/>

							<SchemaField.String name={'shouldCallBack'} title={'是否回传'} x-decorator='FormItem' x-component='Checkbox' />
							<SchemaField.Object name={'consignee'}>
								<SchemaField.String name={'name'} title={'收货人名称'} x-decorator='FormItem' x-component='Input' x-component-props={{ placeholder: '请输入收货人名称' }} />

								<SchemaField.String name={'contact'} title={'收货联系人'} x-decorator='FormItem' x-component='Input' x-component-props={{ placeholder: '请输入联系人' }} />

								<SchemaField.String name={'tel'} title={'联系电话'} x-decorator='FormItem' x-component='Input' x-component-props={{ placeholder: '请输入联系电话' }} />

								<SchemaField.String
									name={'address'}
									title={'收货地址'}
									x-decorator='FormItem'
									x-decorator-props={{ gridSpan: 4 }}
									x-component='Input'
									x-component-props={{ placeholder: '请输入供应商' }}
								/>
							</SchemaField.Object>

							<SchemaField.String
								required
								name={'requiredCompletedTime'}
								title={'要求交付日期'}
								x-decorator='FormItem'
								x-component='DatePicker'
								x-component-props={{ placeholder: '请输入要求交付日期' }}
							/>

							<SchemaField.String
								required
								name={'requiredStartTime'}
								title={'预期交付日期'}
								x-decorator='FormItem'
								x-component='DatePicker'
								x-component-props={{ placeholder: '请输入预期交付日期' }}
							/>
							<SchemaField.String name={'isReCheck'} title={'是否复核'} x-decorator='FormItem' x-component='Checkbox' />

							<SchemaField.String
								name={'remark'}
								title={'备注'}
								x-decorator='FormItem'
								x-decorator-props={{ gridSpan: 4 }}
								x-component='Input.TextArea'
								x-component-props={{ placeholder: '请输入备注' }}
							/>

							<SchemaField.Array
								name='items'
								title='交付明细'
								x-component='ArrayTable'
								x-validator={[{ message: '交付明细必须填写' }]}
								x-decorator='FormItem'
								x-decorator-props={{ gridSpan: 4 }}
							>
								<SchemaField.Object>
									<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ width: 150, title: '源单据', fixed: 'left' }}>
										<SchemaField.String name={'sourceOrderNo'} required x-decorator='FormItem' x-component='Input' x-read-pretty={true} />
										<SchemaField.String name={'sourceOrderItemId'} required x-decorator='FormItem' x-component='Input' x-hidden={true} />
									</SchemaField.Void>

									<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ width: 180, title: '客户料号', fixed: 'left' }}>
										<SchemaField.String
											name={'{value:materialId,label:materialOutCode}'}
											required
											x-decorator='FormItem'
											x-component='MaterailItemSelect'
											x-component-props={{
												labelInValue: true,
												placeholder: '请输入客户料号',
												valueField: 'id',
												labelField: 'outCode',
											}}
										/>
									</SchemaField.Void>

									<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ width: 150, title: '物料编码', fixed: 'left' }}>
										<SchemaField.String name={'materialCode'} x-component='Input' x-decorator='FormItem' x-read-pretty={true} />
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
										<SchemaField.String name={'version'} x-component='Input' x-decorator='FormItem' x-component-props={{ placeholder: '请输入物料版本' }} />
									</SchemaField.Void>

									<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ title: '物权', fixed: 'left', ellipsis: true }}>
										<SchemaField.String name={'realRightCode'} x-component='Input' x-decorator='FormItem' x-component-props={{ placeholder: '请输入物料物权' }} />
									</SchemaField.Void>

									<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ title: 'AC属性', fixed: 'left', ellipsis: true }}>
										<SchemaField.String
											name={'acProperty'}
											x-component='Select'
											x-decorator='FormItem'
											x-component-props={{ placeholder: '请输入AC属性' }}
											enum={[
												{ value: "A", label: 'A' },
												{ value: "B", label: 'B' },
												{ value: "C", label: 'C' },
											]}
										/>
									</SchemaField.Void>

									<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ width: 150, title: '捡料方式', ellipsis: true }}>
										<SchemaField.String
											name={'pickType'}
											x-component='Select'
											x-pattern='readPretty'
											enum={[
												{ value: 10, label: '先进先出' },
												{ value: 20, label: '滚动发料' },
											]}
										/>
									</SchemaField.Void>

									<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ width: 100, title: '数量' }}>
										<SchemaField.String name={'quantity'} required x-component='NumberPicker' x-decorator='FormItem' x-component-props={{ placeholder: '请输入数量' }} />
									</SchemaField.Void>

									<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ title: '操作', dataIndex: 'operations', width: 50, fixed: 'right' }}>
										<SchemaField.Void x-component='ArrayTable.Remove' />
									</SchemaField.Void>
								</SchemaField.Object>

								<SchemaField.Void x-component='ArrayTable.Addition' x-component-props={{ type: 'primary', block: false }} title='新增明细' />
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

export default OutInstructionForm;
