import { BNRSequenceTypeCreateAsync, BNRSequenceTypeGetAsync, BNRSequenceTypeUpdateAsync } from '@/services/openApi/BNRSequenceType';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from 'antd';
import { useFormSchema, useSchemaField } from 'umi';
import React from 'react';
import { formId, formSchema } from './schema';

const SequenceTypeFormDialog = (props: any) => {
	const { entityId, title, buttonProps, onAfterSubmit } = props;

	const schema = useFormSchema(formId, formSchema);

	const SchemaField = useSchemaField({});

	const formProps = {
		effects: () => {
			onFormInit(async form => {
				if (entityId) {
					let barCodeResolveRule = await BNRSequenceTypeGetAsync({ id: entityId });
					form.setInitialValues(barCodeResolveRule);
				}
			});
		},
	};

	const portalId = `SequenceType${entityId}`;

	return (
		<FormDialog.Portal id={portalId}>
			<Button
				type={'primary'}
				onClick={async () => {
					console.log(schema);
					let formDialog = FormDialog({ title: title, width: 960 }, portalId, () => {
						return (
							<FormLayout {...schema.form}>
								<SchemaField schema={schema.schema}></SchemaField>
							</FormLayout>
						);
					});

					formDialog
						.forConfirm((payload, next) => {
							let values: any = payload.values;
							if (!values.id) {
								return BNRSequenceTypeCreateAsync(values).then(() => {
									if (onAfterSubmit) onAfterSubmit();
									next(payload);
								});
							} else {
								return BNRSequenceTypeUpdateAsync({ id: values.id }, values).then(() => {
									if (onAfterSubmit) onAfterSubmit();
									next(payload);
								});
							}
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

export default SequenceTypeFormDialog;
