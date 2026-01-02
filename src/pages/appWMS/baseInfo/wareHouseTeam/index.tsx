import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { WareHouseTeamDeleteAsync, WareHouseTeamGetListAsync } from '@/services/wms/WareHouseTeam';
import { WarehouseTeam } from "@/services/wmsPermission";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import { ICellRendererParams } from "ag-grid-community";
import { Button, message,   Space } from "antd";
import React, { useRef } from "react";
import { Access, useAccess, useIntl } from "umi";
import CustomerFormDialog from "./components/warehouseManFormDialog";
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
       return WareHouseTeamDeleteAsync({ id }).then(() => { refresh() }).finally(() => { hide(); });
    }

    return (
        <Space>
            <Access accessible={access[WarehouseTeam.Update]}>
                <CustomerFormDialog title={"编辑仓库班组"} entityId={data.id} onAfterSubmit={() => { refresh() }} buttonProps={{ icon: < EditOutlined />, type: "link", title: intl.formatMessage({ id: "AbpUi:Edit" }) }} />
            </Access>

            <Access accessible={access[WarehouseTeam.Delete]}>
                <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
                    <Button size={"small"} icon={<DeleteOutlined />} type={"link"} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
                </DeleteConfirm>
            </Access>
        </Space>
    );
}

const WarehouseTeamPage: React.FC<any> = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    return <>
        <AgGridPlus
            gridRef={gridRef}
            headerTitle={"班组列表"}
            gridKey="appWMS.baseInfo.wareHouseTeam"
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data = await WareHouseTeamGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                return requestData;
            }}
            toolBarRender={(girdApi) => {
                return [<Access accessible={access[WarehouseTeam.Create]}>
                    <CustomerFormDialog title={"新建仓库班组"} onAfterSubmit={onRefresh}>{"新建"}</CustomerFormDialog>
                </Access>
                ];
            }}>
            <AgGridColumn field={"code"} headerName={intl.formatMessage({ id: "WMS:Code" })} width={120} />
            <AgGridColumn field={"name"} headerName={intl.formatMessage({ id: "WMS:Name" })} width={200} />
            <AgGridColumn field={"leaderName"} headerName={intl.formatMessage({ id: "WMS:LeaderName" })} />
            <AgGridColumn field={"remark"} headerName={intl.formatMessage({ id: "WMS:Remark" })} />

            <AgGridColumn field={"creationTime"} headerName={intl.formatMessage({ id: "WMS:CreationTime" })} width={180} type={"dateTimeColumn"} initialSort={"desc"} />
            <AgGridColumn field={"creator"} headerName={intl.formatMessage({ id: "WMS:Creator" })} width={120} />
            <AgGridColumn field={"lastModificationTime"} headerName={intl.formatMessage({ id: "WMS:LastModificationTime" })} width={180} type={"dateTimeColumn"} />
            <AgGridColumn field={"lastModifier"} headerName={intl.formatMessage({ id: "WMS:LastModifier" })} width={120} />

            <AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} width={120} pinned={"right"} filter={false} sortable={false} cellRenderer={Options}
                cellRendererParams={{ onRefresh }} />
        </AgGridPlus>
    </>
};

export default WarehouseTeamPage;

export const routeProps = {
	name: '仓库班组管理',
};