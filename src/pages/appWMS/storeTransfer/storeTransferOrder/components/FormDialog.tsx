import {
	StoreTransferOrderGetAsync,
	StoreTransferOrderCreateAsync,
} from '@/services/wms/StoreTransferOrder';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit, onFieldInputValueChange, isField } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button, InputNumber } from 'antd';
import React, { useMemo } from 'react';
import { useFormSchema, useSchemaField } from 'umi';
import { formId, formSchema } from './schema';
import { MaterialItemGetListAsync } from '@/services/wms/MaterialItem';
import { WareHouseGetListAsync } from '@/services/wms/WareHouse';

const StoreTransferOrderFormDialog = (props: any) => {
	const { entityId, title, buttonProps, onAfterSubmit } = props;

	const schema = useFormSchema(formId, formSchema);
	const SchemaField = useSchemaField({});

	const formProps = {
		effects: () => {
			onFormInit(() => {
				if (entityId) {
				}
			});
			onFieldInputValueChange('sourceWarehouseCode', async (field, ) => {
				let res: any = await WareHouseGetListAsync({ Filter: `code=${field.value}` });
				const sourceWarehouseId = field.query(`sourceWarehouseId`).take();
				let item = res?.items[0];
				if (isField(sourceWarehouseId) && item) {
					sourceWarehouseId.setValue(item.id);
				}
			});
	
			onFieldInputValueChange('targetWarehouseCode', async (field, ) => {
				let res: any = await WareHouseGetListAsync({ Filter: `code=${field.value}` });
				const targetWarehouseId = field.query(`targetWarehouseId`).take();
				let item = res?.items[0];
				if (isField(targetWarehouseId) && item) {
					targetWarehouseId.setValue(item.id);
				}
			});

			onFieldInputValueChange('materialItemDtos.*.materialId', async (field, ) => {
				let res: any = await MaterialItemGetListAsync({ Filter: `id=${field.value}` });
				const materialOutCode = field
					.query(`materialItemDtos[${field.indexes[0]}].materialOutCode`)
					.take();
				const materialDescript = field
					.query(`materialItemDtos[${field.indexes[0]}].materialDescript`)
					.take();
				const materialCode = field
					.query(`materialItemDtos[${field.indexes[0]}].materialCode`)
					.take();
				let item = res?.items[0];
				if (isField(materialOutCode) && isField(materialDescript) && item) {
					materialOutCode.setValue(item.outCode);
					materialDescript.setValue(item.descript);
				}

				if (isField(materialCode) && item) {
					materialCode.setValue(item.code);
				}
			});
		},
	};
	const portalId = `StoreTransferOrder${entityId}`;
	return (
		<FormDialog.Portal id={portalId}>
			<Button
				type={'primary'}
				onClick={() => {
					let formDialog = FormDialog({ title: title, width: 1100, zIndex: 999 }, portalId, () => {
						return (
							<>
								<FormLayout {...schema.form}>
									<SchemaField schema={schema.schema}></SchemaField>
								</FormLayout>
							</>
						);
					});

					formDialog
						.forConfirm((payload, next) => {
							let values: any = payload.values;
							return StoreTransferOrderCreateAsync(values)
								.then(() => {
									if(onAfterSubmit) onAfterSubmit();
								})
								.then(() => {
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

export default StoreTransferOrderFormDialog;
