import { UserCreateAsync, UserGetAsync, UserUpdateAsync, UserGetRolesAsync, UserGetAssignableRolesAsync } from '@/services/openApi/User';
import { ArrayItems, Checkbox, FormDialog, FormGrid, FormItem, FormLayout, Space, Select } from '@formily/antd-v5';
import { isField, onFormInit, onFormMount } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button, Input } from 'antd';
import React, { useMemo } from 'react';
import { useIntl } from 'umi';
import RoleSelect from './roleSelect';

const UserFormDialog = (props: any) => {
	const { entityId, buttonProps, title, onConfirm } = props;
	const intl = useIntl();

	const SchemaField = useMemo(
		() =>
			createSchemaField({
				components: {
					FormItem,
					FormGrid,
					Checkbox,
					RoleSelect,
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
					UserGetAsync({ id: entityId }).then(appUser => {
						if (!appUser.extraProperties) {
							appUser.extraProperties = {};
						}
						form.setInitialValues(appUser);
					});

					UserGetRolesAsync({ id: entityId }).then(value => {
						let checkRoles = value.items?.map(x => x.name);
						form.setInitialValuesIn('roleNames', checkRoles);
					});

					const passwordFile = form.query('password').take();
					if (isField(passwordFile)) {
						passwordFile.setDisplay('hidden');
					}
				}

				UserGetAssignableRolesAsync({}).then(value => {
					let roles = value.items?.map(x => {
						return { value: x.name, label: x.extraProperties!['DisplayName'] };
					});
					let roleNamesField = form.query('roleNames').take();
					if (isField(roleNamesField)) {
						roleNamesField.setDataSource(roles);
					}
				});
			});

			onFormMount(form => {
				if (entityId) {
					const passwordFile = form.query('password').take();
					if (isField(passwordFile)) {
						passwordFile.setDisplay('none');
					}
				}
			});
		},
	};

	const PortalId = `user${entityId}`;
	return (
		<FormDialog.Portal id={PortalId}>
			<Button
				type={'primary'}
				onClick={() => {
					let formDialog = FormDialog({ title: title, width: 1024 }, PortalId, form => {
						return (
							<FormLayout labelWidth={80} feedbackLayout={'terse'}>
								<SchemaField>
									<SchemaField.Void x-component={'FormGrid'} x-component-props={{ maxColumns: [1, 3, 4], strictAutoFit: true }}>
										<SchemaField.String
											title={'账号'}
											required
											name={'userName'}
											x-decorator='FormItem'
											x-component={'Input'}
											x-component-props={{ placeholder: '登陆名称必须填写' }}
										/>

										<SchemaField.String
											title={'姓名'}
											required
											name={'name'}
											x-decorator='FormItem'
											x-component={'Input'}
											x-component-props={{ placeholder: '请输入姓名' }}
										/>

										<SchemaField.Object name={'extraProperties'}>
											<SchemaField.String
												title={'性别'}
												name={'Sex'}
												required
												x-decorator='FormItem'
												x-component={'Select'}
												enum={[
													{ value: 0, label: '男' },
													{ value: 1, label: '女' },
												]}
												x-component-props={{ placeholder: '请输入性别' }}
											/>

											{/* <SchemaField.String
												title={'内部邮箱'}
												name={'InternalEmail'}
												x-decorator='FormItem'
												x-component={'Input'}
												x-component-props={{ placeholder: '请输入内部邮箱' }}
												x-validator="email"
											/> */}
										</SchemaField.Object>

										<SchemaField.String
											title={intl.formatMessage({ id: 'AbpIdentity:DisplayName:Password' })}
											required
											name={'password'}
											x-decorator='FormItem'
											x-component={'Input'}
											x-component-props={{ type: 'password', placeholder: '请输入密码' }}
										/>

										<SchemaField.String
											title={'邮箱'}
											required
											name={'email'}
											x-decorator='FormItem'
											x-component={'Input'}
											x-component-props={{ placeholder: '请输入Email' }}
										/>



										<SchemaField.String
											title={'手机'}
											name={'phoneNumber'}
											x-decorator='FormItem'
											x-component={'Input'}
											x-component-props={{ placeholder: '请输入手机号码' }}
										/>



										<SchemaField.String title={'是否启用'} name={'isActive'} x-decorator='FormItem' x-component={'Checkbox'} default={true} />

										<SchemaField.String title={'启用锁定'} name={'lockoutEnabled'} x-decorator='FormItem' x-component={'Checkbox'} default={false} />

										<SchemaField.String
											title={'角色'}
											name={'roleNames'}
											x-decorator='FormItem'
											x-decorator-props={{ gridSpan: 4 }}
											x-component={'RoleSelect'}
										/>
									</SchemaField.Void>
								</SchemaField>
							</FormLayout>
						);
					});

					formDialog
						.forConfirm((payload, next) => {
							let values: any = payload.values;
							if (!values.id) {
								return UserCreateAsync(values).then(() => {
									if (onConfirm) onConfirm();
									next(payload);
								});
							} else {
								return UserUpdateAsync({ id: values.id }, values).then(() => {
									if (onConfirm) onConfirm();
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

export default UserFormDialog;
