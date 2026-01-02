import { ContactInfoSelect, MaterailItemSelect, WareHouseSelect } from '@/pages/appWMS/baseInfo/_utils/index';
import SupplierSelect from '@/pages/appCommon/_utils/SupplierSelect';
import CustomerSelect from '@/pages/appCommon/_utils/CustomerSelect';
import { InInstructionOrderCreateAsync, InInstructionOrderGetAsync, InInstructionOrderUpdateAsync } from '@/services/wms/InInstructionOrder';
import ProCard from '@ant-design/pro-card';
import { ToolBar } from '@/components';
import { ArrayTable, Checkbox, DatePicker, Form, FormGrid, FormItem, FormLayout, FormTab, Input, NumberPicker, PreviewText, Select, Space, Submit } from '@formily/antd-v5';
import { createForm, onFormInit, onFieldInputValueChange, isField } from '@formily/core';
import { Button } from 'antd';
import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { history, useModel, useSchemaField } from 'umi';
import { AsnOrderTypeSelect } from '.';
import PurchaseItemSourceSelectButton from './purchaseItemSourceSelectButton';
import SaleReturnItemSourceSelectButton from './saleReturnItemSourceSelectButton';
import SaleOrderIncomSourceSelectButton from './saleOrderIncomSourceSelectButton';
import { pubGoBack } from '@/components/public';
import { MaterialItemGetAsync, MaterialItemGetListAsync } from '@/services/wms/MaterialItem';
import { getFormSchema } from './inInstructionOrderFormSchema';
import { useKeepAliveParams } from '@/hooks';

const InInstructionOrderForm = (props: any) => {
	const { id } = useKeepAliveParams();
	const { orderType, title } = props;
	const { initialState } = useModel("@@initialState");
	const OtherInINstructionOrderCallbackDefaultEnabled = initialState?.configuration?.setting?.values ? initialState?.configuration?.setting?.values['WMS.OtherOutInstructionOrderCallbackDefaultEnabled'] === 'True' : false

	const handleSubmit = () => {
		// 先验证表单
		return form.validate().then(() => {
			return form
				.submit(values => {
					
					// 处理回传状态
					values.callBackStatus = values.shouldCallBack ? 10 : 5;
					
					// 处理到货明细中的复合对象
					if (values.items && Array.isArray(values.items)) {
						values.items = values.items.map(item => {
							const processedItem = { ...item };
							
							// 根据Formily复合字段取值规则，直接使用materialId和materialCode
							if (item.materialId || item.materialCode) {
								// 构建materialItem对象，符合MaterialReferenceDto结构
								processedItem.materialItem = {
									id: item.materialId,
									code: item.materialCode,
									outCode: item.materialOutCode,
									description: item.materialDescript
								};
								
								// 移除前端展示字段和原始的materialId、materialCode字段
								delete processedItem.materialId;
								delete processedItem.materialCode;
								delete processedItem.materialOutCode;
								delete processedItem.materialDescript;
							}
							
							return processedItem;
						});
					}

					if (id) {
						return InInstructionOrderUpdateAsync({ id: id }, values);
					} else {
						return InInstructionOrderCreateAsync(values);
					}
				})
				.then(
					() => {
						pubGoBack()
					}
				);
		});
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

								// 设置初始值和当前值
								form.setInitialValues(saleOrder);
								form.setValues(saleOrder); // 确保当前值也被设置
								form.setValuesIn('shouldCallBack', saleOrder.callBackStatus == 10);
							} catch (error) {
								// 加载入库指令数据失败
							}
						} else {
							form.setValuesIn('shouldCallBack', OtherInINstructionOrderCallbackDefaultEnabled);
						}
						form.setValuesIn('sourceOrderType', orderType);

						form.setFieldState('items.addition', async state => {
							// 只在期初入库(orderType=0)和其他入库(orderType=25)时显示新增明细按钮
						state.visible = orderType === 0 || orderType === 25;
						});

					});

					onFieldInputValueChange('items.*.{value:materialId,label:materialCode}', async field => {
						const materialOutCode = field.query(`.materialOutCode`).take();
						const materialDescript = field.query(`.materialDescript`).take();
						if (isField(materialOutCode) && isField(materialDescript)) {
							if (field.value?.value && field.value?.value.length > 30) {
								let materialData = await MaterialItemGetAsync({ id: field.value?.value });
								materialOutCode.setValue(materialData.outCode);
								materialDescript.setValue(materialData.description);
							} else {
								let materialDatas = await MaterialItemGetListAsync({ Filter: `code=${field.value?.value}` });
								if (materialDatas.items && materialDatas.items?.length > 0) {
									materialOutCode.setValue(materialDatas.items[0]?.outCode);
									materialDescript.setValue(materialDatas.items[0]?.description);
								}
							}
						}
					});
				},
			}),
		[orderType]
	);

	// 用于存储上一次的ID，避免无效的重复加载
	const previousIdRef = React.useRef(id);

	// 监听URL参数变化，重新加载数据（适用于KeepAlive模式）
	useEffect(() => {
		const currentId = id;
		const previousId = previousIdRef.current;

		if (currentId && currentId !== previousId) {

			// 更新引用值
			previousIdRef.current = currentId;

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

				// 清空并重新设置表单数据
				form.reset();
				form.setInitialValues(saleOrder);
				form.setValues(saleOrder);
				form.setValuesIn('shouldCallBack', saleOrder.callBackStatus == 10);
			});
		} else if (!currentId && previousId) {
			// 从编辑模式切换到创建模式，清空表单
			previousIdRef.current = undefined;
			form.reset();
			form.setValuesIn('shouldCallBack', OtherInINstructionOrderCallbackDefaultEnabled);
		} else if (currentId) {
			// 更新引用值，即使没有重新加载
			previousIdRef.current = currentId;
		}
	}, [id]); // 监听id参数变化

	const onSelectPurchaseOrder = useCallback(items => {
		form.setValuesIn('items', items);
	}, [form]);

	//为采购订单初始化按钮显示 - 移除有问题的初始化逻辑
	React.useEffect(() => {
		if (orderType === 5) {
			form.setFieldState('items', async state => {
				const ComponentBtn = () => {
					// 这里的问题：form.getValuesIn 不是响应式的，获取的是定义时的值
					const currentSupplierCode = form.getValuesIn('sender.id') || "";
					return <PurchaseItemSourceSelectButton onSelect={onSelectPurchaseOrder} supplierCode={currentSupplierCode} />;
				};
				state.componentProps = {
					title: ComponentBtn,
				};
			});
		}
	}, [orderType, form, onSelectPurchaseOrder]);

	const onContactChange = useCallback(item => {
		// 对于无订单入库（orderType=25），不执行复杂的联系人信息设置逻辑
		if (orderType === 25) {
			return;
		}

		// 使用setValuesIn设置当前表单值，而不是setInitialValuesIn
		form.setValuesIn('sender.id', item.code);
		form.setValuesIn('sender.name', item.name);
		form.setValuesIn('sender.contact', item.contact);
		form.setValuesIn('sender.tel', item.tel);
		form.setValuesIn('sender.address', item.address);

		// 清空明细数据
		form.setValuesIn('items', []);
		
		// 使用getValuesIn获取表单值
		const sourceOrderType = form.getValuesIn('sourceOrderType');

		form.setFieldState('items', async state => {
			let ComponentBtn: any = undefined;
			if (sourceOrderType === 5) {
				ComponentBtn = () => <PurchaseItemSourceSelectButton onSelect={onSelectPurchaseOrder} supplierCode={item.code} />;
			}
			if (sourceOrderType === 6) {
				ComponentBtn = () => <SaleOrderIncomSourceSelectButton onSelect={onSelectPurchaseOrder} customerCode={item.code} />;
			}
			if (sourceOrderType === 10) {
				ComponentBtn = () => <SaleReturnItemSourceSelectButton onSelect={onSelectPurchaseOrder} supplierCode={item.code} />;
			}
			state.componentProps = {
				title: ComponentBtn,
			};
		});
	}, [form, onSelectPurchaseOrder, orderType]);

	// 供应商选择回调
	const onSupplierChange = useCallback(item => {
		// 使用setValuesIn设置供应商信息
		form.setValuesIn('sender.id', item.code);
		form.setValuesIn('sender.name', item.name);
		form.setValuesIn('sender.contact', item.contact);
		form.setValuesIn('sender.tel', item.tel);
		form.setValuesIn('sender.address', item.address);

		// 清空明细数据
		form.setValuesIn('items', []);

		// 为采购订单添加采购项目选择按钮，传递最新的供应商编码
		form.setFieldState('items', async state => {
			const ComponentBtn = () => <PurchaseItemSourceSelectButton key={`purchase-btn-${item.code}-${Date.now()}`} onSelect={onSelectPurchaseOrder} supplierCode={item.code} />;
			state.componentProps = {
				title: ComponentBtn,
			};
		});
	}, [form, onSelectPurchaseOrder]);

	// 客户选择回调
	const onCustomerChange = useCallback(item => {
		// 使用setValuesIn设置客户信息
		form.setValuesIn('sender.id', item.code);
		form.setValuesIn('sender.name', item.name);
		form.setValuesIn('sender.contact', item.contact);
		form.setValuesIn('sender.tel', item.tel);
		form.setValuesIn('sender.address', item.address);

		// 清空明细数据
		form.setValuesIn('items', []);

		// 为客供入库添加销售订单项目选择按钮，传递最新的客户编码
		form.setFieldState('items', async state => {
			const ComponentBtn = () => <SaleOrderIncomSourceSelectButton key={`customer-btn-${item.code}-${Date.now()}`} onSelect={onSelectPurchaseOrder} customerCode={item.code} />;
			state.componentProps = {
				title: ComponentBtn,
			};
		});
	}, [form, onSelectPurchaseOrder]);

	const SchemaField = useSchemaField({
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
			Checkbox,
			SupplierSelect,
			CustomerSelect,
			WareHouseSelect,
			MaterailItemSelect,
			AsnOrderTypeSelect,
			SaleReturnItemSourceSelectButton,
			ContactInfoSelect: (props: any) => (
				<ContactInfoSelect
					{...props}
					type={orderType === 6 || orderType === 10 ? 10 : 5}
					onChangeItem={orderType === 25 ? undefined : onContactChange}
				/>
			)
		},
	});
	// 根据orderType获取对应的Schema
	const currentFormSchema = getFormSchema(orderType);

	return (
		<>
			<Form form={form} {...currentFormSchema.form}>
				<SchemaField schema={currentFormSchema.schema} />

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
