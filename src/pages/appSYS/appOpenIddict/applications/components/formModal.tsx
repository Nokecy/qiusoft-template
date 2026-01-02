import {
	OpenIddictProApplicationCreateAsync,
	OpenIddictProApplicationUpdateAsync,
	OpenIddictProApplicationGetAsync,
} from '@/services/openApi/OpenIddictProApplication';
import { OpenIddictProScopeGetListAsync } from '@/services/openApi/OpenIddictProScope';
import { ArrayItems, Input, Checkbox, FormDialog, FormGrid, FormItem, FormLayout, Space, Select } from '@formily/antd-v5';
import { isField, onFormInit } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button } from 'antd';
import React, { useMemo } from 'react';
import { useIntl } from 'umi';

const ApplicationFormDialog = (props: any) => {
	const { entityId, buttonProps, title, onConfirm } = props;
	const intl = useIntl();

	const SchemaField = useMemo(
		() =>
			createSchemaField({
				components: {
					FormItem,
					FormGrid,
					Checkbox,
					Space,
					Input,
					ArrayItems,
					Select,
				},
			}),
		[]
	);

	const formProps = {
		effects: () => {
			onFormInit(form => {
				if (entityId) {
					OpenIddictProApplicationGetAsync({ clientId: entityId }).then(appUser => {
						form.setInitialValues(appUser);
					});
				}

				OpenIddictProScopeGetListAsync({}).then(value => {
					let roles = value.items?.map(x => {
						return { value: x.name, label: x.displayName };
					});
					let roleNamesField = form.query('scopes').take();
					if (isField(roleNamesField)) {
						roleNamesField.setDataSource(roles);
					}
				});
			});
		},
	};

	const PortalId = `openIddictApplication${entityId}`;
	return (
		<FormDialog.Portal id={PortalId}>
			<Button
				type={'primary'}
				onClick={() => {
					let formDialog = FormDialog({ title: title, width: 1024 }, PortalId, form => {
						return (
							<FormLayout labelWidth={150} feedbackLayout={'terse'}>
								<SchemaField>
									<SchemaField.Void x-component={'FormGrid'} x-component-props={{ maxColumns: [1, 3, 4], strictAutoFit: true }}>
										<SchemaField.String
											required
											name={'clientId'}
											title={'ClientId'}
											x-decorator='FormItem'
											x-component={'Input'}
											x-component-props={{ placeholder: 'ClientId必须填写' }}
										/>

										<SchemaField.String
											name={'displayName'}
											title={'显示名称'}
											x-decorator='FormItem'
											x-component={'Input'}
											x-component-props={{ placeholder: '请输入显示名称' }}
										/>

										<SchemaField.String
											name={'clientSecret'}
											title={'客户端密钥'}
											x-decorator='FormItem'
											x-component={'Input'}
											x-component-props={{ type: 'password', placeholder: '请输入客户端密钥' }}
										/>

										<SchemaField.String
											name={'consentType'}
											title={'consentType'}
											x-decorator='FormItem'
											x-component={'Select'}
											x-component-props={{ placeholder: '请输入consentType' }}
											enum={[
												{ value: 'Implicit', label: 'implicit' },
												{ value: 'Systematic', label: 'systematic' },
											]}
										/>

										<SchemaField.String
											required
											name={'type'}
											title={'类型'}
											x-decorator='FormItem'
											x-component={'Select'}
											x-component-props={{ placeholder: '请输入类型' }}
											enum={[
												{ value: 'Confidential', label: 'confidential' },
												{ value: 'public', label: 'Public' },
											]}
										/>

										<SchemaField.String
											name={'clientUri'}
											title={'客户端Uri'}
											x-decorator='FormItem'
											x-decorator-props={{ gridSpan: 4 }}
											x-component={'Input'}
										/>

										<SchemaField.String
											name={'logoUri'}
											title={'LogoUri'}
											x-decorator='FormItem'
											x-decorator-props={{ gridSpan: 4 }}
											x-component={'Input'}
										/>

										<SchemaField.String
											name={'allowAuthorizationCode'}
											title={'AllowAuthorizationCode'}
											x-decorator='FormItem'
											x-component={'Checkbox'}
										/>
										<SchemaField.String name={'allowImplicit'} title={'AllowImplicit'} x-decorator='FormItem' x-component={'Checkbox'} />
										<SchemaField.String name={'allHybrid'} title={'AllHybrid'} x-decorator='FormItem' x-component={'Checkbox'} />
										<SchemaField.String name={'allowPassword'} title={'AllowPassword'} x-decorator='FormItem' x-component={'Checkbox'} />
										<SchemaField.String
											name={'allowClientCredentials'}
											title={'AllowClientCredentials'}
											x-decorator='FormItem'
											x-component={'Checkbox'}
										/>
										<SchemaField.String name={'allowRefreshToken'} title={'AllowRefreshToken'} x-decorator='FormItem' x-component={'Checkbox'} />
										<SchemaField.String name={'allowDeviceCode'} title={'AllowDeviceCode'} x-decorator='FormItem' x-component={'Checkbox'} />

										<SchemaField.String
											name={'scopes'}
											title={'Scopes'}
											x-decorator='FormItem'
											x-decorator-props={{ gridSpan: 4 }}
											x-component={'Checkbox.Group'}
										/>

										<SchemaField.Array
											name={'postLogoutRedirectUris'}
											title={'postLogoutRedirectUris'}
											x-decorator='FormItem'
											x-decorator-props={{ gridSpan: 4 }}
											x-component='ArrayItems'
											default={['']}
										>
											<SchemaField.String
												name={'input'}
												x-decorator='FormItem'
												x-component={'Input'}
												x-component-props={{ placeholder: '请输入postLogoutRedirectUri' }}
											/>

											<SchemaField.Void x-component='ArrayItems.Addition' title='新增' />
										</SchemaField.Array>

										<SchemaField.Array
											name={'redirectUris'}
											title={'redirectUris'}
											x-decorator='FormItem'
											x-component='ArrayItems'
											x-decorator-props={{ gridSpan: 4 }}
											default={['']}
										>
											<SchemaField.String
												name={'input'}
												x-decorator='FormItem'
												x-component={'Input'}
												x-component-props={{ placeholder: '请输入redirectUri' }}
											/>

											<SchemaField.Void x-component='ArrayItems.Addition' title='新增' />
										</SchemaField.Array>
									</SchemaField.Void>
								</SchemaField>
							</FormLayout>
						);
					});

					formDialog
						.forConfirm((payload, next) => {
							let values: any = payload.values;
							if (!entityId) {
								return OpenIddictProApplicationCreateAsync(values).then(() => {
									if(onConfirm ) onConfirm();
									next(payload);
								});
							} else {
								return OpenIddictProApplicationUpdateAsync(values).then(() => {
									if(onConfirm ) onConfirm();
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

export default ApplicationFormDialog;
