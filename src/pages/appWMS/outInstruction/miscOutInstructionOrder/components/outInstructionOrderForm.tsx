import { OutInstructionOrderCreateAsync, OutInstructionOrderGetAsync, OutInstructionOrderUpdateAsync } from '@/services/wms/OutInstructionOrder';
import { MaterialItemGetAsync } from '@/services/wms/MaterialItem';
import { ToolBar } from '@/components';
import { Form } from '@formily/antd-v5';
import { createForm, onFormInit, onFieldInputValueChange, isField } from '@formily/core';
import { Button, Spin } from 'antd';
import React, { useMemo } from 'react';
import { useModel } from 'umi';
import { pubGoBack } from '@/components/public';
import { formId, formSchema } from "./schema";
import { useFormSchema, useSchemaField } from "umi";
import { useBoolean } from 'ahooks';
import { useKeepAliveParams } from '@/hooks';

const OutInstructionForm = (props: any) => {
	const { orderType, title } = props;
	const { id } = useKeepAliveParams();
	const [loading, { setTrue, setFalse }] = useBoolean(false);
	const { initialState } = useModel("@@initialState");
	let OtherOutInstructionOrderCallbackDefaultEnabled = initialState?.configuration?.setting?.values ? initialState?.configuration?.setting?.values['WMS.OtherOutInstructionOrderCallbackDefaultEnabled'] === 'True' : false

	const handleSubmit = () => {
		return form
			.submit(values => {
				setTrue()

				// 处理回传状态
				values.callBackStatus = values.shouldCallBack ? 10 : 5;

				// 处理出库明细中的复合对象
				if (values.items && Array.isArray(values.items)) {
					values.items = values.items.map(item => {
						const processedItem = { ...item };

						// 根据Formily复合字段取值规则，直接使用materialId和materialOutCode
						if (item.materialId || item.materialOutCode) {
							// 出库API期望分别的字段，不是复合的materialItem对象
							processedItem.materialId = item.materialId;
							processedItem.materialCode = item.materialCode;
							processedItem.materialOutCode = item.materialOutCode;
							processedItem.materialDescript = item.materialDescript;
						}

						return processedItem;
					});
				}
				
				if (id) {
					///@ts-ignore
					return OutInstructionOrderUpdateAsync({ id: id }, values);
				} else {
					return OutInstructionOrderCreateAsync(values);
				}
			})
			.then(
				() => {
					setFalse()
					pubGoBack()
				},
				() => { }
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
								// 处理编辑时的数据回填，将物料信息映射到复合字段
								if (saleOrder.items && Array.isArray(saleOrder.items)) {
									saleOrder.items = saleOrder.items.map(item => {
										const mappedItem = { ...item };

										// 将物料信息映射到复合字段，供表单组件使用
										if (item.materialItem) {
											// 如果API返回了materialItem对象，映射其属性
											mappedItem.materialId = item.materialItem.id;
											mappedItem.materialCode = item.materialItem.code;
											mappedItem.materialOutCode = item.materialItem.outCode;
											mappedItem.materialDescript = item.materialItem.description;
										} else {
											// 如果API返回了分散的物料字段，直接使用
											mappedItem.materialId = item.materialId;
											mappedItem.materialCode = item.materialCode;
											mappedItem.materialOutCode = item.materialOutCode;
											mappedItem.materialDescript = item.materialDescript;
										}

										return mappedItem;
									});
								}

								// 处理仓库信息映射到复合字段
								if (saleOrder.wareHouse) {
									saleOrder.wareHouseId = saleOrder.wareHouse.id;
									saleOrder.wareHouseName = saleOrder.wareHouse.name;
								}

									form.setInitialValues(saleOrder);
								form.setValuesIn('shouldCallBack', saleOrder.callBackStatus == 10);
							});
						}else{
							form.setValuesIn('shouldCallBack', OtherOutInstructionOrderCallbackDefaultEnabled)
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

	const schema = useFormSchema(formId, formSchema);

	const SchemaField = useSchemaField({});

	return (
		<Form form={form} {...schema.form} previewTextPlaceholder={'无'} key={formId}>
			<Spin spinning={loading} tip={'正在请求服务器'}>
				<SchemaField schema={schema.schema}></SchemaField>

				{
					<ToolBar style={{ zIndex: window.location.pathname.indexOf('form') != -1 ? 0 : -1 }}>
						<Button onClick={pubGoBack}>
							返回
						</Button>

						<Button type={"primary"} onClick={handleSubmit}>
							提交
						</Button>
					</ToolBar>
				}
			</Spin>
		</Form>
	);
};

export default OutInstructionForm;
