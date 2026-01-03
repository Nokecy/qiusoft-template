import { ElsaWorkflowsApiEndpointsWorkflowDefinitionsPostPost } from '@/services/workflow/WorkflowDefinitions';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { Button } from 'antd';
import React, { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useFormSchema, useSchemaField } from 'umi';
import { formId, formSchema } from './schema';

const WorkflowDefinitionFormDialog = (props: any) => {
	const { onAfterSubmit, buttonProps } = props;

	const schema = useFormSchema(formId, formSchema);

	const SchemaField = useSchemaField({});

	const formProps = {
		effects: () => {},
	};

	const portalId = `workflowDefinition`;

	return (
		<FormDialog.Portal id={portalId}>
			<Button
				type={'primary'}
				onClick={() => {
					let formDialog1 = FormDialog({ title: '新建流程定义', width: 560 }, portalId, () => {
						return (
							<FormLayout {...schema.form}>
								<SchemaField schema={schema.schema}></SchemaField>
							</FormLayout>
						);
					});

					formDialog1
						.forConfirm((payload, next) => {
							let values: any = payload.values;
							return ElsaWorkflowsApiEndpointsWorkflowDefinitionsPostPost({
								model: {
									name: values.name,
									description: values.description,
									version: 1,
									isLatest: true,
									isPublished: false,
									toolVersion: '3.0',
									root: {
										id: uuidv4(),
										type: 'Elsa.Flowchart',
										version: 1,
										name: 'Flowchart1',
									},
								},
							}).then(() => {
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

export default WorkflowDefinitionFormDialog;
