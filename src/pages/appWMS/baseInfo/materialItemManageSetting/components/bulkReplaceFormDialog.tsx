import { MaterialItemManagerSettingGetAsync, MaterialItemManagerSettingBulkReplaceAsync } from '@/services/wms/MaterialItemManagerSetting';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from 'antd';
import React from 'react';
import { formId, formSchema } from "./twoSchema";
import { useFormSchema, useSchemaField } from "umi";
import FormLayoutMode from '@/pages/_utils/editMode';


const BulkReplaceFormDialog = (props: any) => {
	const { entityId, title, buttonProps, onAfterSubmit } = props;

	const schema = useFormSchema(formId, formSchema);

	const SchemaField = useSchemaField({});

	const formProps = {
		effects: () => {
			onFormInit(form => {
				if (entityId) {
					MaterialItemManagerSettingGetAsync({ id: entityId }).then((setting: any) => {
						form.setInitialValues({ ...setting });
					});
				}
			});
		},
	};
	const portalId = `WMS.base.materialItemManageSetting.two${entityId}`;
	return (
		<FormDialog.Portal id={portalId}>
			<Button
				type={'primary'}
				onClick={() => {
					let formDialog = FormDialog({ title: title, width: 960 }, portalId, () => {
						return (
							<FormLayoutMode formId={formId} {...schema.form} editClickAfter={() => formDialog.close()}>
								<SchemaField schema={schema.schema} />
							</FormLayoutMode>
						);
					});

					formDialog
						.forConfirm((payload, next) => {
							let values: any = payload.values;
							return MaterialItemManagerSettingBulkReplaceAsync(
								{ materialItemId: values.materialItemId, formManagerId: values.managerId, toManagerId: values.toManagerId, toManagerName: values.toManagerName },
								values
							)
								.then(() => {
									if (onAfterSubmit) onAfterSubmit();
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

export default BulkReplaceFormDialog;
