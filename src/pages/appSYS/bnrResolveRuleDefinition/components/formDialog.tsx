import { BNRResolveRuleDefinitionCreateAsync, BNRResolveRuleDefinitionGetAsync, BNRResolveRuleDefinitionUpdateAsync } from '@/services/openApi/BNRResolveRuleDefinition';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, Spin } from 'antd';
import { useFormSchema, useSchemaField } from 'umi';
import React from 'react';
import { formId, formSchema } from './schema';

// 使用 React.lazy 延迟导入 FormilyRegexEditor
const FormilyRegexEditor = React.lazy(() => import('./FormilyRegexEditor'));

const BarCodeResolveRuleFormDialog = (props: any) => {
	const { entityId, title, buttonProps, onAfterSubmit } = props;

	const schema = useFormSchema(formId, formSchema);

	const formProps = {
		effects: () => {
			onFormInit(async form => {
				if (entityId) {
					let barCodeResolveRule = await BNRResolveRuleDefinitionGetAsync({ id: entityId });
					form.setInitialValues(barCodeResolveRule);
				}
			});
		},
	};

	const portalId = `BarCodeResolveRule${entityId}`;

	// 创建内部组件来处理 SchemaField，使 useSchemaField Hook 可以正常使用
	const DialogContent = () => {
		const SchemaField = useSchemaField({ FormilyRegexEditor });

		return (
			<React.Suspense fallback={<div style={{ textAlign: 'center', padding: '20px' }}><Spin tip="组件加载中..." /></div>}>
				<FormLayout {...schema.form}>
					<SchemaField schema={schema.schema}></SchemaField>
				</FormLayout>
			</React.Suspense>
		);
	};

	return (
		<FormDialog.Portal id={portalId}>
			<Button
				type={'primary'}
				onClick={async () => {
					console.log(schema);
					let formDialog = FormDialog({ title: title, width: 960 }, portalId, () => {
						return <DialogContent />;
					});

					formDialog
						.forConfirm((payload, next) => {
							let values: any = payload.values;
							if (!values.id) {
								return BNRResolveRuleDefinitionCreateAsync(values).then(() => {
									if (onAfterSubmit) onAfterSubmit();
									next(payload);
								});
							} else {
								return BNRResolveRuleDefinitionUpdateAsync({ id: values.id }, values).then(() => {
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

export default BarCodeResolveRuleFormDialog;
