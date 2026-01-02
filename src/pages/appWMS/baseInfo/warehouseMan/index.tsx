import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { WarehouseManDeleteAsync, WarehouseManGetListAsync } from '@/services/wms/WarehouseMan';
import { WarehouseMan } from "@/services/wmsPermission";
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
       return WarehouseManDeleteAsync({ id }).then(() => { refresh() }).finally(() => { hide(); });
    }

    return (
        <Space>
            <Access accessible={access[WarehouseMan.Update]}>
                <CustomerFormDialog title={"编辑仓管员"} entityId={data.id} onAfterSubmit={() => { refresh() }} buttonProps={{ icon: < EditOutlined />, type: "link", title: intl.formatMessage({ id: "AbpUi:Edit" }) }} />
            </Access>

            <Access accessible={access[WarehouseMan.Delete]}>
                <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
                    <Button size={"small"} icon={<DeleteOutlined />} type={"link"} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
                </DeleteConfirm>
            </Access>
        </Space>
    );
}

const WarehouseManPage: React.FC<any> = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    return <>
        <AgGridPlus
            gridRef={gridRef}
            headerTitle={"仓管员列表"}
            gridKey="appWMS.baseInfo.warehouseMan"
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data = await WarehouseManGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                return requestData;
            }}
            toolBarRender={(girdApi) => {
                return [<Access accessible={access[WarehouseMan.Create]}>
                    <CustomerFormDialog title={"新建仓管员"} onAfterSubmit={onRefresh}>{"新建仓管员"}</CustomerFormDialog>
                </Access>
                ];
            }}>
            <AgGridColumn field={"name"} headerName={"姓名"} width={150} />
            {/* <AgGridColumn field={"wareHouse.name"} headerName={intl.formatMessage({ id: "WMS:WareHouseName" })} width={200} /> */}
            <AgGridColumn field={"warehouseTeamName"} headerName={intl.formatMessage({ id: "WMS:WareHouseTeamName" })} width={200} colId={"WarehouseTeam.Name"}/>
            <AgGridColumn field={"phoneTel"} headerName={intl.formatMessage({ id: "WMS:Tel" })} width={150} />
            <AgGridColumn field={"userName"} headerName={intl.formatMessage({ id: "WMS:UserName" })} />
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

export default WarehouseManPage;

export const routeProps = {
	name: '仓管员管理',
};