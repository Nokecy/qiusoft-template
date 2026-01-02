import { Form } from '@formily/antd-v5';
import { createForm, onFormInit, onFieldInit, onFieldInputValueChange } from '@formily/core';
import { Button, Spin, message } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { MaterialGetByCodeAsync, MaterialGetMaterialAttributeListAsync } from '@/services/common/Material';
import { CustomerGetByCodeAsync } from '@/services/common/Customer';
import { CustomerContactGetMainContactAsync } from '@/services/common/CustomerContact'; 
import { CurrencyGetByCodeAsync } from '@/services/common/Currency'; 
import { TaxRateGetByCodeAsync } from '@/services/common/TaxRate';
import { history } from 'umi';
import { SaleOrderGetAsync, SaleOrderUpdateAsync } from '@/services/smarterp/SaleOrder';
import { useFormSchema, useSchemaField, closeTab, useSearchParams, useMatch } from 'umi';
import { formId, formSchema } from './components/schema';
import ToolBar from '@/components/toolBar';
import {
	CurrencySelect,
	PaymentMethodSelect,
	DeliveryWaySelect,
	PriceClauseSelect,
	TaxRateSelect,
} from '@/pages/appCommon/_utils';
import {
	SaleManSelect,
	BomField,
	AttributeField
} from '@/pages/appSmartErp/_utils';
import {
	CustomerSelect,
	CustomerContactSelect,
	CustomerDeliveryAddressSelect,
	ConsignerSelect
} from '@/pages/appCommon/_utils';
import { MaterialSelect, UnitSelect } from '@/pages/appCommon/_utils';
import { UnitGetByCodeAsync } from '@/services/common/Unit';

const updateRoute = '/appSmartErp/saleManagement/saleOrders/update';

const SaleOrderUpdatePage = () => {
	let [searchParams] = useSearchParams();
	const correlationId = searchParams.get('correlationId');

	const match = useMatch(updateRoute);
	let [loading, setLoading] = useState(false);
	let [isFetching, setIsFetching] = useState(false);
	let [isLoading, setIsLoading] = useState(false);
	let [data, setData] = useState(null);
	const schema = useFormSchema(formId, formSchema);

	// 获取销售订单数据
	const refetch = async () => {
		if (!correlationId) return;
		setIsFetching(true);
		try {
			const result = await SaleOrderGetAsync({ id: correlationId });
			setData(result);
		} catch (error) {
			console.error('获取销售订单数据失败:', error);
		} finally {
			setIsFetching(false);
		}
	};

	// 更新销售订单
	const saleOrderExecute = async (formValues) => {
		setIsLoading(true);
		try {
			const result = await SaleOrderUpdateAsync({ id: formValues.id }, formValues);
			return result;
		} catch (error) {
			console.error('更新销售订单失败:', error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};
	const SchemaField = useSchemaField({
		CurrencySelect,
		PaymentMethodSelect,
		DeliveryWaySelect,
		PriceClauseSelect,
		TaxRateSelect,
		CustomerSelect,
		CustomerContactSelect,
		CustomerDeliveryAddressSelect,
		ConsignerSelect,
		SaleManSelect,
		BomFieldSelect: BomField,
		AttributeFieldSelect: AttributeField,
		MaterialSelect,
		UnitSelect
	});

	const form = useMemo(
		() =>
			createForm({
				initialValues: {},
				effects: () => {
					onFormInit(() => {
						if (correlationId) {
							refetch();
						}
					});

					onFieldInit('saleOrderItems', (field, form) => {
						field.setComponentProps({
							onCopy: (index) => {
								let copyData = form.values.saleOrderItems[index];
								let attributes = [...copyData.attributes];
								attributes.forEach(x => {
									x.id = undefined;
									x.saleOrderItemId = undefined;
								})

								form.values.saleOrderItems[index] = { ...copyData, attributes };
							}
						});
					});

					onFieldInputValueChange('{value:customerCode,label:customerAbb}', async (field, form) => {
						const customerId = field.value?.value;
						
						if (!customerId) return;

						try {
							// 获取客户详情
							const customer = await CustomerGetByCodeAsync({ code: customerId });
							
							// 设置客户名称
							form.setValuesIn('customerName', customer.name);
							
							// 获取客户主要联系人
							const mainContact = await CustomerContactGetMainContactAsync({ 
								customerCode: customerId 
							});
							
							if (mainContact) {
								form.setValuesIn('{label:reciver,value:reciverTel}', {
									label: mainContact.contactName,
									value: mainContact.tel
								});
							}
							
							// 如果客户有默认税率，获取税率信息
							if (customer.invoiceCode) {
								const taskRate = await TaxRateGetByCodeAsync({ 
									code: customer.invoiceCode 
								});
								
								form.setValuesIn('{value:invoiceCode,label:invoiceName}', {
									value: taskRate.code,
									label: taskRate.name
								});
								form.setValuesIn('invoiceRate', taskRate.rate);
							}
							
							// 如果客户有默认货币，获取货币信息
							if (customer.currencyCode) {
								const currency = await CurrencyGetByCodeAsync({ 
									code: customer.currencyCode 
								});
								
								form.setValuesIn('{value:currencyCode,label:currencyAbb}', {
									label: currency.name,
									value: currency.code
								});
								form.setValuesIn('currencyRate', currency.rate);
							}
							
							// 设置其他客户相关信息
							form.setValuesIn('priceIsTax', customer.priceIsTax || "1");
							if (customer.payMethod) form.setValuesIn('payMethod', customer.payMethod);
							if (customer.businessType) form.setValuesIn('businessType', customer.businessType);
							if (customer.earnestType) form.setValuesIn('earnestType', customer.earnestType);
							if (customer.earnest) form.setValuesIn('earnest', customer.earnest);
							if (customer.salesmanCode) form.setValuesIn('saleCode', customer.salesmanCode);
							if (customer.salesmanName) form.setValuesIn('saleName', customer.salesmanName);
							
						} catch (error) {
							console.error('获取客户信息失败:', error);
							// 至少设置默认含税价格
							form.setValuesIn('priceIsTax', "1");
						}
					});

					// 税率选择联动
					onFieldInputValueChange('{value:invoiceCode,label:invoiceName}', async (field, form) => {
						const invoiceCode = field.value?.value;
						
						if (!invoiceCode) return;

						try {
							const taskRate = await TaxRateGetByCodeAsync({ code: invoiceCode });
							form.setValuesIn('invoiceRate', taskRate.rate);
						} catch (error) {
							console.error('获取税率信息失败:', error);
						}
					});

					// 货币选择联动
					onFieldInputValueChange('{value:currencyCode,label:currencyAbb}', async (field, form) => {
						const currencyCode = field.value?.value;
						
						if (!currencyCode) return;

						try {
							const currency = await CurrencyGetByCodeAsync({ code: currencyCode });
							form.setValuesIn('currencyRate', currency.rate);
						} catch (error) {
							console.error('获取货币信息失败:', error);
						}
					});

					// 物料选择联动 - 只监听用户输入变化
					onFieldInputValueChange('saleOrderItems.*.{value:materialCode,label:materialOutCode}', async (field, form) => {
						const materialData = field.value;
						
						if (!materialData?.value) return;

						const fieldPath = field.address?.toString() || '';
						const indexMatch = fieldPath.match(/saleOrderItems\.(\d+)/);
						const currentIndex = indexMatch ? parseInt(indexMatch[1]) : 0;

						setLoading(true);

						try {
							const material = await MaterialGetByCodeAsync({ code: materialData.value });
							
							if (material) {
								// 使用正确的 Formily API 更新物料相关字段
								form.setValuesIn(`saleOrderItems.${currentIndex}.materialOutCode`, material.outCode);
								form.setValuesIn(`saleOrderItems.${currentIndex}.materialDescription`, material.description);
								form.setValuesIn(`saleOrderItems.${currentIndex}.specificationModel`, material.specificationModel);
								form.setValuesIn(`saleOrderItems.${currentIndex}.comeFrom`, material.comeFrom);
								form.setValuesIn(`saleOrderItems.${currentIndex}.unitCode`, material.unitCode);
								form.setValuesIn(`saleOrderItems.${currentIndex}.unitName`, material.unitName);
								if (material.salePrice !== undefined && material.salePrice !== null) {
									form.setValuesIn(`saleOrderItems.${currentIndex}.price`, material.salePrice);
								}
								
								// 延迟后自动触发特性按钮点击
								setTimeout(async () => {
									try {
										const attributeResponse = await MaterialGetMaterialAttributeListAsync({ 
											materialId: material.id 
										});
										
										const attributeSchema = attributeResponse.items || [];
										
										if (attributeSchema.length > 0) {
											// 物料有特性时，自动点击特性按钮
											const attributeButton = document.getElementById(`attribute${currentIndex}`);
											if (attributeButton) {
												attributeButton.click();
											}
										}
									} catch (attrError) {
										// 获取特性失败，不影响主流程
										console.warn('获取物料特性失败:', attrError);
									}
								}, 800); // 延迟800ms，确保字段更新完成
							}
							
						} catch (error) {
							console.error('获取物料信息失败:', error);
						} finally {
							setLoading(false);
						}
					});

					// 单位选择联动 - 只监听用户输入变化
					onFieldInputValueChange('saleOrderItems.*.unitCode', async (field) => {
						const unitCode = field.value;
						if (!unitCode) return;

						try {
							const unit = await UnitGetByCodeAsync({ code: unitCode });
							
							field.query('.unitName').take().setState(state => (state.value = unit.name));
							field.query('.exchangeRate').take().setState(state => (state.value = unit.exchangeRate));
							field.query('.exchangeFlag').take().setState(state => (state.value = unit.exchangeFlag));
						} catch (error) {
							console.error('获取单位信息失败:', error);
						}
					});
				},
			}),
		[]
	);

	// 当数据变化时更新表单
	useEffect(() => {
		if (data) {
			form.setInitialValues(data);
		}
	}, [data, form]);

	// 路由匹配时获取数据
	useEffect(() => {
		if (match) {
			refetch();
		}
	}, [match]);

	const handleSubmit = () => {
		form.submit((formValues) => {
			return saleOrderExecute(formValues).then(() => {
				message.success('保存成功');
				handleBack();
			}).catch((error) => {
				message.error('保存失败');
			});
		});
	};

	const handleBack = () => {
		closeTab(history.location.pathname);
		history.push('/appSmartErp/saleManagement/saleOrders');
	};

	return (
		<Spin spinning={isFetching || isLoading || loading} tip={'修改中'}>
			<Form form={form} {...schema.form}>

				<SchemaField schema={schema.schema}></SchemaField>

				<ToolBar>
					<Button onClick={handleBack}>返回</Button>
					<Button type="primary" loading={isLoading} onClick={handleSubmit}>
						保存
					</Button>
				</ToolBar>
			</Form>
		</Spin>
	);
};

export default SaleOrderUpdatePage;

export const routeProps = {
	name: '更新销售订单',
};
