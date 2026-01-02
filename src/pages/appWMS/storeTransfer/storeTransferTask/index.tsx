import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { StoreTransferTaskItemGetListAsync } from "@/services/wms/StoreTransferTaskItem";
import React, { } from "react";
import { useAccess, useIntl } from "umi";
import { storeTransferTaskStatusEnum } from "@/pages/appWMS/_utils";

const StoreTransferTaskItemPage: React.FC<any> = (props: any) => {
    const intl = useIntl();
    const access = useAccess();

    return <AgGridPlus
        headerTitle={`调拨任务列表`}
        rowMultiSelectWithClick={true}
        gridKey='appWMS.storeTransfer.storeTransferTask'
        request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
            let filter = params?.filter;
            let data = await StoreTransferTaskItemGetListAsync({ Filter: filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
            let requestData: any = { success: true, data: data.items!, total: data.totalCount };
            return requestData;
        }}
        toolBarRender={() => {
            return [
            ];
        }}>
        <AgGridColumn field={"storeTransferOrderNo"} headerName={"调拨单号"} width={150} />
        <AgGridColumn field={"sourceWarehouse.code"} headerName={"原库房"} width={150} />
        <AgGridColumn field={"targetWarehouse.code"} headerName={"目标库房"} width={150} />
        <AgGridColumn field={"sourceWarehouseZoneCode"} headerName={"原库区"} width={100} />
        <AgGridColumn field={"sourceWarehouseLocationCode"} headerName={"原库位"} width={150} />
        <AgGridColumn field={"transferTaskStatus"} headerName={"状态"} width={120} valueEnum={storeTransferTaskStatusEnum} />
        <AgGridColumn field={"sourceTraceId"} headerName={"载具LPN"} width={200} />
        <AgGridColumn field={"materialItem.code"} headerName={intl.formatMessage({ id: "WMS:MaterialItemCode" })} width={120} />
        <AgGridColumn field={"materialItem.outCode"} headerName={intl.formatMessage({ id: "WMS:MaterialItemOutCode" })} width={120} />
        <AgGridColumn field={"materialItem.descript"} headerName={intl.formatMessage({ id: "WMS:MaterialItemDescript" })} width={120} />
        <AgGridColumn field={"quantity"} headerName={"调拨数量"} width={120} hideInSearch={true} />
        <AgGridColumn field={"pickQuantity"} headerName={"下架数量"} width={120} hideInSearch={true} />
        <AgGridColumn field={"putQuantity"} headerName={"上架数量"} width={120} hideInSearch={true} />
        <AgGridColumn field={"remark"} headerName={intl.formatMessage({ id: "WMS:Remark" })} />

        <AgGridColumn field={"creationTime"} headerName={intl.formatMessage({ id: "WMS:CreationTime" })} width={150} type={"dateTimeColumn"} initialSort={"desc"} />
        <AgGridColumn field={"creator"} headerName={intl.formatMessage({ id: "WMS:Creator" })} width={120} />
        <AgGridColumn field={"lastModificationTime"} headerName={intl.formatMessage({ id: "WMS:LastModificationTime" })} width={150} type={"dateTimeColumn"} />
        <AgGridColumn field={"lastModifier"} headerName={intl.formatMessage({ id: "WMS:LastModifier" })} width={120} />
    </AgGridPlus>
};

export default StoreTransferTaskItemPage;
export const routeProps = {
    name: '调拨任务列表',
};