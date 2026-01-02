import { MenuItemCreateAsync, MenuItemGetAsync, MenuItemUpdateAsync } from '@/services/openApi/MenuItem';
import { FormDialog, DatePicker, FormGrid, FormItem, FormLayout, FormTab, Input, Select, Space, Checkbox } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button } from 'antd';
import React, { useMemo } from 'react';

const MenuItemFormDialog = (props: any) => {
	const { name, title, buttonProps, onAfterSubmit } = props;

	const SchemaField = useMemo(
		() =>
			createSchemaField({
				components: {
					FormTab,
					FormItem,
					FormGrid,
					Space,
					Input,
				},
			}),
		[]
	);

	const formProps = {
		effects: () => {
			onFormInit(async form => {
				if (name) {
					let workshiftsInfo = await MenuItemGetAsync({ Name: name });
					form.setInitialValues(workshiftsInfo);
				}
			});
		},
	};
	const portalId = `menuitem_${name}`;
	return (
		<FormDialog.Portal id={portalId}>
			<Button
				type={'primary'}
				onClick={() => {
					let formDialog = FormDialog({ title: title, width: 720 }, portalId, () => {
						return (
							<FormLayout labelWidth={80} feedbackLayout={'none'} shallow={false}>
								<SchemaField>
									<SchemaField.Void x-component={'FormGrid'} x-component-props={{ maxColumns: [1, 3, 4], strictAutoFit: true }}>
									<SchemaField.String title={'序号'} name={'sort'} x-decorator='FormItem' x-component={'Input'} x-component-props={{  }} />
										<SchemaField.String title={'上级菜单'} name={'parentName'} x-decorator='FormItem' x-component={'Input'} x-component-props={{ placeholder: '请输入上级菜单' }} />
										<SchemaField.String
											title={'菜单名称'}
											required
											name={'name'}
											x-decorator='FormItem'
											x-component={'Input'}
											x-component-props={{ placeholder: '请输入应用名称' }}
										/>
										<SchemaField.String
											title={'显示名称'}
											required
											name={'displayName'}
											x-decorator='FormItem'
											x-component={'Input'}
											x-component-props={{ placeholder: '请输入显示名称' }}
										/>
										<SchemaField.String title={'地址'} name={'url'} x-decorator='FormItem' x-component={'Input'} x-component-props={{ placeholder: '请输入地址' }} />
										<SchemaField.String title={'图标'} name={'icon'} x-decorator='FormItem' x-component={'Input'} x-component-props={{ placeholder: '请输入图标' }} />
										<SchemaField.String title={'权限'} name={'permission'} x-decorator='FormItem' x-component={'Input'} x-component-props={{ placeholder: '请输入权限' }} />
									</SchemaField.Void>
								</SchemaField>
							</FormLayout>
						);
					});

					formDialog
						.forConfirm((payload, next) => {
							let values: any = payload.values;
							if (!name) {
								return MenuItemCreateAsync(values).then(() => {
									if (onAfterSubmit) onAfterSubmit();
									next(payload);
								});
							} else {
								return MenuItemUpdateAsync({ Name: values.name }, values).then(() => {
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

export default MenuItemFormDialog;
