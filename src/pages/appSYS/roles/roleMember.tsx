import { AgGridPlus } from "@/components/agGrid";
import { PlusOutlined } from "@ant-design/icons";
import React, { useRef, useMemo } from "react";
import { useAccess, useIntl, Access } from "umi";
import { UserGetListWithRoleAsync } from "@/services/openApi/User";
import { useKeepAliveParams } from '@/hooks';
import { Roles } from "@/services/identityPermission";
import UseraddPage from "./components/useradd";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import dayjs from 'dayjs';

const RoleMemberPage = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    const { roleId, roleName } = useKeepAliveParams(
        '/appSYS/roles/roleMember',
        ['roleId', 'roleName']
    );

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    const columnDefs: any = useMemo(() => [
        {
            headerName: intl.formatMessage({ id: "AbpIdentity:DisplayName:UserName" }),
            field: "userName",
            width: 150
        },
        {
            headerName: intl.formatMessage({ id: "AbpIdentity:DisplayName:Name" }),
            field: "name",
            width: 120,
            hideInSearch: true
        },
        {
            headerName: "姓",
            field: "surname",
            width: 100,
            hideInSearch: true
        },
        {
            headerName: "性别",
            field: "extraProperties.Sex",
            width: 80,
            hideInSearch: true,
            cellRenderer: ({ value }: any) => value === 0 ? "男" : "女"
        },
        {
            headerName: intl.formatMessage({ id: "AbpIdentity:DisplayName:PhoneNumber" }),
            field: "phoneNumber",
            width: 130,
            hideInSearch: true
        },
        {
            headerName: intl.formatMessage({ id: "AbpIdentity:DisplayName:Email" }),
            field: "email",
            width: 200,
            hideInSearch: true
        },
        {
            headerName: "邮箱已验证",
            field: "emailConfirmed",
            width: 100,
            hideInSearch: true,
            cellRenderer: ({ value }: any) => value ? '是' : '否'
        },
        {
            headerName: "激活状态",
            field: "isActive",
            width: 100,
            hideInSearch: true,
            cellRenderer: ({ value }: any) => value ? '已激活' : '未激活'
        },
        {
            headerName: "创建时间",
            field: "creationTime",
            width: 160,
            hideInSearch: true,
            initialSort: 'desc',
            cellRenderer: ({ value }: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm') : ''
        }
    ], [intl]);

    return (
        <AgGridPlus
            gridRef={gridRef}
            gridKey="sys-role-member-list"
            request={async (params: { pageSize: number; current: number;[key: string]: any; }, sort: any, filter: any) => {
                let data: any = await UserGetListWithRoleAsync({
                    RoleId: roleId,
                    Filter: filter?.userName?.filter,
                    Sorting: params!.sorter,
                    SkipCount: params!.skipCount,
                    MaxResultCount: params!.maxResultCount
                });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                return requestData;
            }}
            params={{ RoleId: roleId }}
            headerTitle={`角色成员列表 - ${roleName || ''}`}
            columnDefs={columnDefs}
            toolBarRender={(api) => {
                return [
                    <Access accessible={!!access[Roles.Create]}>
                        <UseraddPage
                            roleName={roleName}
                            onConfirm={onRefresh}
                            buttonProps={{
                                type: "primary",
                                icon: <PlusOutlined />
                            }}
                        >
                            添加用户
                        </UseraddPage>
                    </Access>
                ];
            }}
        />
    );
};

export default RoleMemberPage;

export const routeProps = {
    name: '角色成员管理',
};