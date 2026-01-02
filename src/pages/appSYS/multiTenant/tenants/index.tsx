import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { TenantGetListAsync, TenantDeleteAsync } from '@/services/openApi/Tenant';
import { Tenants } from "@/services/TenantPermission";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import DeleteConfirm from "@/components/deleteConfirm";
import { Button, message, Space } from "antd";
import React, { useRef } from "react";
import { Access, useAccess, useIntl, history } from "umi";
import FormDialog from "./components/formDialog";

const Options = (props: any) => {
    const { data, onRefresh } = props;
    const intl = useIntl();
    const access = useAccess();

    const refresh = onRefresh

    const handleDelete = (id: any) => {
        const hide = message.loading('正在操作,请稍后', 0);
        TenantDeleteAsync({ id }).then(() => { refresh() }).finally(() => { hide(); });
    }

    return (
        <Space>
            <Access accessible={access[Tenants.Update]}>
                <FormDialog title={"编辑租户"} entityId={data.id} onAfterSubmit={() => { refresh(); }} buttonProps={{ icon: <EditOutlined />, type: "link", title: intl.formatMessage({ id: "AbpUi:Edit" }) }} />
            </Access>

            <Access accessible={access[Tenants.Delete]}>
                <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
                    <Button size={"small"} icon={<DeleteOutlined />} type={"link"} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
                </DeleteConfirm>
            </Access>
        </Space>
    );
}

const TenantPage = (props: any) => {
    const intl = useIntl();
    const access = useAccess();
    const gridRef = useRef<GridRef>();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    return <>
        <AgGridPlus
            headerTitle={"租户列表"}
            gridRef={gridRef}
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data = await TenantGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                return requestData;
            }}
            rowMultiSelectWithClick={true}
            toolBarRender={(gridApi) => {
                return [
                    <Access accessible={access[Tenants.Create]}>
                        <FormDialog title={"新建"} onAfterSubmit={onRefresh}>新建</FormDialog>
                    </Access>
                ];
            }}>
            <AgGridColumn field={"name"} headerName={"租户名称"} flex={1} />
            <AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} pinned={"right"} width={120} cellRenderer={Options} filter={false} cellRendererParams={{ onRefresh }} />
        </AgGridPlus>
    </>
};

export default TenantPage;
export const routeProps = {
    name: '租户管理',
};