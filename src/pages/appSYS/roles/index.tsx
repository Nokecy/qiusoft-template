import { AgGridPlus } from "@/components/agGrid";
import { RoleDeleteAsync, RoleGetListAsync } from "@/services/openApi/Role";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { RequestData } from "@ant-design/pro-table";
import { Button, message, Space } from "antd";
import React, { useRef, useMemo } from "react";
import { Access, useAccess, useIntl, Link } from "umi";
import { Roles } from "../../../services/identityPermission";
import RoleFormDialog from "./components/formModal";
import { ICellRendererParams } from "ag-grid-community";
import RolePermissionDialog from "./components/rolePermissionModal";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import DeleteConfirm from "@/components/deleteConfirm";
const Options = (props: ICellRendererParams & { onRefresh }) => {
    const { onRefresh, data, api } = props;
    const intl = useIntl();
    const access = useAccess();

    const refresh = () => {
        onRefresh();
    }

    const handleDelete = (id: any) => {
        const hide = message.loading('正在操作,请稍后', 0);
        RoleDeleteAsync({ id }).then(() => { refresh() }).finally(() => { hide(); });
    }

    return (
        <Space>
            <Access accessible={!!access[Roles.Update]}>
                <RoleFormDialog buttonProps={{ size: "small", type: "link", icon: < EditOutlined style={{ fontSize: 14 }} />, title: intl.formatMessage({ id: "AbpUi:Edit" }) }} entityId={data.id} onConfirm={refresh} />
            </Access>

            <Access accessible={!!access[Roles.ManagePermissions]}>
                <RolePermissionDialog roleName={data.name} />
            </Access>

            <Access accessible={!!(access[Roles.Delete] && !data.isStatic)}>
                <DeleteConfirm title="确定删除?" placement={"left"} onConfirm={() => handleDelete(data.id)} okText="确定" cancelText="取消">
                    <Button key="update" size={"small"} type={"link"} icon={<DeleteOutlined />} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
                </DeleteConfirm>
            </Access>
        </Space>
    );
}
const NameLink = ({ value, data }: any) => <Link to={`/appSYS/roles/roleMember?roleId=${data.id}&roleName=${data.name}`}>{value}</Link>

const RolePage = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    const columnDefs = useMemo(() => [
        {
            headerName: intl.formatMessage({ id: "AbpIdentity:DisplayName:RoleName" }),
            field: "name",
            width: 200,
            cellRenderer: NameLink
        },
        {
            headerName: intl.formatMessage({ id: "AbpIdentity:DisplayName:DisplayName" }),
            field: "DisplayName",
            width: 200, flex: 1
        },
        {
            headerName: "默认角色",
            field: "isDefault",
            width: 100,
            cellRenderer: ({ value }: any) => value ? '是' : '否'
        },
        {
            headerName: intl.formatMessage({ id: "AbpUi:Actions" }),
            field: "action",
            width: 150,
            hideInSearch: true,
            cellRenderer: (props: any) => <Options {...props} />,
            cellRendererParams: { onRefresh }
        }
    ], [intl, onRefresh]);

    return (
        <AgGridPlus
            gridRef={gridRef}
            gridKey="sys-roles-list"
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data = await RoleGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                data.items!.forEach((i: any) => {
                    i.DisplayName = i.extraProperties.DisplayName;
                })
                let requestData: RequestData<any> = { success: true, data: data.items!, total: data.totalCount };
                return requestData;
            }}
            headerTitle={"角色列表"}
            columnDefs={columnDefs}
            toolBarRender={(api) => {
                return [
                    <Access accessible={!!access[Roles.Create]}>
                        <RoleFormDialog
                            buttonProps={{
                                type: "primary",
                                icon: <PlusOutlined />
                            }}
                            onConfirm={onRefresh}
                        >
                            {intl.formatMessage({ id: "AbpIdentity:NewRole" })}
                        </RoleFormDialog>
                    </Access>
                ]
            }}
        />
    );
};

RolePage.title = "角色管理";

export default RolePage;
export const routeProps = {
    name: '角色管理',
};