import { OutInstructionOrderCreateAsync, OutInstructionOrderGetAsync, OutInstructionOrderUpdateAsync } from '@/services/wms/OutInstructionOrder';
import { MaterialItemGetAsync } from '@/services/wms/MaterialItem';
import { ToolBar } from '@/components';
import { Form } from '@formily/antd-v5';
import { createForm, onFormInit, onFieldInputValueChange, isField } from '@formily/core';
import { Button, Spin } from 'antd';
import React, { useMemo } from 'react';
import { pubGoBack } from '@/components/public';
import { formId, formSchema } from "./schema";
import { useFormSchema, useSchemaField } from "umi";
import { useBoolean } from 'ahooks';
import { useKeepAliveParams } from '@/hooks';

const OutInstructionForm = (props: any) => {
	const { orderType, title } = props;
	const { id } = useKeepAliveParams();
	const [loading, { setTrue, setFalse }] = useBoolean(false);

	const handleSubmit = () => {
		return form
			.submit(values => {
				setTrue()
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
								saleOrder.callStatus = saleOrder.callBackStatus > 5 ? true : false;
								form.setInitialValues(saleOrder);
							});
						}
					});
					onFieldInputValueChange('items.*.{value:materialId,label:materialOutCode}', async field => {
						const materialOutCode = field.query(`.materialOutCode`).take();
						const materialDescript = field.query(`.materialDescript`).take();
						if (isField(materialOutCode) && isField(materialDescript)) {
							let materialData: any = await MaterialItemGetAsync({ id: field.value.value });
							materialOutCode.setValue(materialData.outCode);
							materialDescript.setValue(materialData.descript);
						}
					});
				},
			}),
		[]
	);

	const schema = useFormSchema(formId, formSchema);

	const SchemaField = useSchemaField({});

	const getHeight = () => {
		return document.getElementsByTagName('body')[0].clientHeight - 96 - 30 - 70;
	};

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
