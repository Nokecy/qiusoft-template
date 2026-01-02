import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { StoreTransferOrderItemGetListAsync } from "@/services/wms/StoreTransferOrderItem";
import React, { useState } from "react";
import { useAccess, useIntl } from "umi";

const StoreTransferOrderItemPage: React.FC<any> = (props: any) => {
    const intl = useIntl();
    const access = useAccess();

    return <AgGridPlus
        headerTitle={`调拨明细列表`}
        rowSelection={"single"}
        gridKey='appWMS.storeTransfer.storeTransferOrderItem'
        rowMultiSelectWithClick={true}
        request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
            let filter = params?.filter;
            let data = await StoreTransferOrderItemGetListAsync({ Filter: filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
            let requestData: any = { success: true, data: data.items!, total: data.totalCount };
            return requestData;
        }}
        toolBarRender={() => {
            return [
            ];
        }}>
        <AgGridColumn field={"sourceOrderNo"} headerName={intl.formatMessage({ id: "WMS:SourceOrderNo" })} width={180} checkboxSelection />
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

export default StoreTransferOrderItemPage;
export const routeProps = {
    name: '调拨明细列表',
};