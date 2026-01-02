import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { Users } from "@/services/identityPermission";
import { OpenIddictProScopeDeleteAsync, OpenIddictProScopeGetListAsync } from '@/services/openApi/OpenIddictProScope';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message,   Space, Tag } from "antd";
import React, { useRef, useState } from "react";
import { Access, useAccess, useIntl } from "umi";
import UserFormDialog from "./components/formModal";
import { ICellRendererParams } from "ag-grid-community";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import DeleteConfirm from "@/components/deleteConfirm";
const Options = (props: ICellRendererParams & { onRefresh }) => {
    const { data, api, onRefresh } = props;
    const intl = useIntl();
    const access = useAccess();

    const refresh = () => {
        onRefresh();
    }

    const handleDelete = (id: any) => {
        const hide = message.loading('正在操作,请稍后', 0);
        OpenIddictProScopeDeleteAsync({ id }).then(() => { refresh() }).finally(() => { hide(); });
    }

    return (
        <Space>
            <Access accessible={access[Users.Update]}>
                <UserFormDialog buttonProps={{ size: "small", type: "link", icon: < EditOutlined style={{ fontSize: 14 }} />, title: intl.formatMessage({ id: "AbpUi:Edit" }) }} entityId={data.id} onConfirm={refresh} title={"编辑用户"} />
            </Access>

            <Access accessible={access[Users.Delete]}>
                <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
                    <Button size={"small"} icon={<DeleteOutlined />} type={"link"} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
                </DeleteConfirm>
            </Access>
        </Space>
    );
}

const ScopePage = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    return <AgGridPlus
        gridRef={gridRef}
        request={async (params: { pageSize: number; current: number;[key: string]: any; }, sort: any, filter: any) => {
            let data = await OpenIddictProScopeGetListAsync({ Filter: filter?.userName?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
            let requestData: any = { success: true, data: data.items!, total: data.totalCount };
            return requestData;
        }}
        toolBarRender={(api) => {
            return [<Access accessible={access[Users.Create]}>
                <UserFormDialog onConfirm={onRefresh} title={"新建用户"}>{intl.formatMessage({ id: "AbpIdentity:NewUser" })}</UserFormDialog>
            </Access>
            ];
        }}
        headerTitle={"Scope列表"}>
        <AgGridColumn field={"name"} headerName={"名称"} width={100} hideInSearch />
        <AgGridColumn field={"displayName"} headerName={"显示名称"} width={150} hideInSearch />
        <AgGridColumn field={"description"} headerName={"描述"} flex={1} />

        <AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} width={120} pinned={"right"} filter={false} cellRenderer={Options}
            cellRendererParams={{ onRefresh }} />
    </AgGridPlus>
};

export default ScopePage;
export const routeProps = {
	name: 'Scope列表',
};