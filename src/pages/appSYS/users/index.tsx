import { AgGridPlus } from '@/components/agGrid';
import { Users } from '@/services/identityPermission';
import { UserDeleteAsync, UserGetListWithRoleAsync } from '@/services/openApi/User';
import { DeleteOutlined, EditOutlined, SyncOutlined, PlusOutlined } from '@ant-design/icons';
import { AccountProResetDefaultPasswordAsync } from '@/services/openApi/AccountPro';
import { Button, message, Space } from 'antd';
import React, { useRef, useState, useMemo } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import UserFormDialog from './components/formModal';
import { ICellRendererParams } from 'ag-grid-community';
import UserPermissionDialog from './components/userPermissionModal';
import { RoleGetListAsync } from '@/services/openApi/Role';
import { RequestData } from '@ant-design/pro-table';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Allotment } from 'allotment';
import DeleteConfirm from "@/components/deleteConfirm";
import dayjs from 'dayjs';
const Options = (props: ICellRendererParams & { onRefresh }) => {
	const { data, api, onRefresh } = props;
	const intl = useIntl();
	const access = useAccess();

	const refresh = () => {
		onRefresh();
	};

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		UserDeleteAsync({ id })
			.then(() => {
				refresh();
			})
			.finally(() => {
				hide();
			});
	};
	const resetPassword = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		AccountProResetDefaultPasswordAsync({ userId: id })
			.then(() => {
				refresh();
			})
			.finally(() => {
				hide();
			});
	};
	return (
		<Space>
			<Access accessible={!!access[Users.Delete]}>
				<DeleteConfirm title='确定重置密码?' onConfirm={() => resetPassword(data.id)}>
					<Button size={'small'} icon={<SyncOutlined />} type={'link'} title={'重置密码'} />
				</DeleteConfirm>
			</Access>
			<Access accessible={!!access[Users.Update]}>
				<UserFormDialog buttonProps={{ size: 'small', type: 'link', icon: <EditOutlined style={{ fontSize: 14 }} />, title: intl.formatMessage({ id: 'AbpUi:Edit' }) }} entityId={data.id} onConfirm={refresh} title={'编辑用户'} />
			</Access>

			<Access accessible={!!access[Users.ManagePermissions]}>
				<UserPermissionDialog entityId={data.id} />
			</Access>

			<Access accessible={!!access[Users.Delete]}>
				<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
					<Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const UserPage = (props: any) => {
	const intl = useIntl();
	const access = useAccess();
	const [roleId, setRoleId] = useState(undefined);
	const gridRef = useRef<GridRef>();
	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	// 角色列表列定义
	const roleColumnDefs: any = useMemo(() => [
		{
			headerName: intl.formatMessage({ id: 'AbpIdentity:DisplayName:RoleName' }),
			field: 'name',
			flex: 1,
			hideInSearch: true
		},
		{
			headerName: intl.formatMessage({ id: "AbpIdentity:DisplayName:DisplayName" }),
			field: 'DisplayName',
			flex: 1,
			hideInSearch: true
		}
	], [intl]);

	// 用户列表列定义
	const userColumnDefs: any = useMemo(() => [
		{
			headerName: '信息查询',
			field: 'userName',
			width: 150,
			hideInTable: true
		},
		{
			headerName: '账号',
			field: 'userName',
			width: 130,
			hideInSearch: true
		},
		{
			headerName: '姓名',
			field: 'name',
			width: 100,
			hideInSearch: true
		},
		{
			headerName: '姓',
			field: 'surname',
			width: 100,
			hideInSearch: true
		},
		{
			headerName: '性别',
			field: 'extraProperties.Sex',
			width: 80,
			hideInSearch: true,
			cellRenderer: ({ value }: any) => value === 0 ? '男' : '女'
		},
		{
			headerName: intl.formatMessage({ id: 'AbpIdentity:DisplayName:PhoneNumber' }),
			field: 'phoneNumber',
			width: 130,
			hideInSearch: true
		},
		{
			headerName: '手机已验证',
			field: 'phoneNumberConfirmed',
			width: 100,
			hideInSearch: true,
			cellRenderer: ({ value }: any) => value ? '是' : '否'
		},
		{
			headerName: intl.formatMessage({ id: 'AbpIdentity:DisplayName:Email' }),
			field: 'email',
			width: 200,
			hideInSearch: true
		},
		{
			headerName: '邮箱已验证',
			field: 'emailConfirmed',
			width: 100,
			hideInSearch: true,
			cellRenderer: ({ value }: any) => value ? '是' : '否'
		},
		{
			headerName: '启用状态',
			field: 'isActive',
			width: 100,
			hideInSearch: true,
			cellRenderer: ({ value }: any) => value ? '已启用' : '未启用'
		},
		{
			headerName: '启用锁定',
			field: 'lockoutEnabled',
			width: 80,
			hideInSearch: true,
			cellRenderer: ({ value }: any) => value ? '是' : '否'
		},
		{
			headerName: '锁定结束时间',
			field: 'lockoutEnd',
			width: 160,
			hideInSearch: true,
			cellRenderer: ({ value }: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-'
		},
		{
			headerName: '失败次数',
			field: 'accessFailedCount',
			width: 90,
			hideInSearch: true
		},
		{
			headerName: '最后修改时间',
			field: 'lastModificationTime',
			width: 160,
			hideInSearch: true,
			cellRenderer: ({ value }: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-'
		},
		{
			headerName: '密码修改时间',
			field: 'lastPasswordChangeTime',
			width: 160,
			hideInSearch: true,
			cellRenderer: ({ value }: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-'
		},
		{
			headerName: '创建时间',
			field: 'creationTime',
			width: 160,
			hideInSearch: true,
			initialSort: 'desc',
			cellRenderer: ({ value }: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm') : ''
		},
		{
			headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
			field: 'action',
			width: 160,
			pinned: 'right',
			hideInSearch: true,
			cellRenderer: (props: any) => <Options {...props} />,
			cellRendererParams: { onRefresh }
		}
	], [intl, onRefresh]);

	return (
		<div style={{ display: 'flex', height: '100%' }}>
			<Allotment vertical={false}>
				<Allotment.Pane maxSize={300}>
					<AgGridPlus
						gridKey="sys-users-role-filter"
						request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
							let data = await RoleGetListAsync({ Filter: '', Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
							data.items!.forEach((i: any) => {
								i.DisplayName = i.extraProperties.DisplayName;
							});
							let requestData: RequestData<any> = { success: true, data: data.items!, total: data.totalCount };
							return requestData;
						}}
						rowSelection={'single'}
						onSelectionChanged={e => {
							let arr: any = e.api.getSelectedRows();
							setRoleId(arr[0]?.id);
						}}
						pagination={false}
						headerTitle={'角色筛选'}
						columnDefs={roleColumnDefs}
					/>
				</Allotment.Pane>

				<Allotment.Pane snap>
					<AgGridPlus
						gridKey="sys-users-list"
						style={{ flex: 1 }}
						request={async (params: any, sort: any, filter: any) => {
							let data = await UserGetListWithRoleAsync({ RoleId: params.RoleId, Filter: filter?.userName, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
							let requestData: any = { success: true, data: data.items!, total: data.totalCount };
							return requestData;
						}}
						gridRef={gridRef}
						params={{ RoleId: roleId }}
						toolBarRender={api => {
							return [
								<Access accessible={!!access[Users.Create]}>
									<UserFormDialog
										onConfirm={onRefresh}
										title={'新建用户'}
										buttonProps={{
											type: "primary",
											icon: <PlusOutlined />
										}}
									>
										{intl.formatMessage({ id: 'AbpIdentity:NewUser' })}
									</UserFormDialog>
								</Access>,
							];
						}}
						headerTitle={'用户列表'}
						columnDefs={userColumnDefs}
					/>
				</Allotment.Pane>
			</Allotment>
		</div>
	);
};

export default UserPage;
export const routeProps = {
	name: '用户列表',
};