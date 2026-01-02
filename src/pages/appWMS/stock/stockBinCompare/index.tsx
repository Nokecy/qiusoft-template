import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import React, { useRef, useState } from "react";
import { Access, useAccess, useIntl } from "umi";
import { StockBinInfoCompareStockBinAndStockAsync } from '@/services/wms/StockBinInfo';
import { ICellRendererParams } from "ag-grid-community";
import { Button, message, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import DeleteConfirm from "@/components/deleteConfirm";
const StockBinComparePage: React.FC<any> = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    return <>
        <AgGridPlus
            gridRef={gridRef}
            request={async (params, sort, filterModel) => {
                let data = await StockBinInfoCompareStockBinAndStockAsync({});
                let requestData: any = { success: true, data: data!, total: data.length };
                return requestData;
            }}
            headerTitle={"库位对账列表"}
            gridKey="appWMS.stock.stockBinCompare"
            toolBarRender={(gridApi) => {
                return [];
            }}
        >
            <AgGridColumn field={"wareHouseCode"} headerName={"库房"} flex={1}></AgGridColumn>
            <AgGridColumn field={"materialCode"} headerName={"物料编码"} width={100} hideInSearch></AgGridColumn>
            <AgGridColumn field={"materialOutCode"} headerName={"物料外码"} width={100} hideInSearch></AgGridColumn>
            <AgGridColumn field={"acProperty"} headerName={"AC属性"} width={80} hideInSearch></AgGridColumn>
            <AgGridColumn field={"realRightCode"} headerName={"物权"} width={100} hideInSearch></AgGridColumn>

            <AgGridColumn field={"stockBinQty"} headerName={"库位库存"} width={100} type={"numericColumn"} hideInSearch></AgGridColumn>
            <AgGridColumn field={"stockBinPreRegisteredQuantity"} headerName={"预占数量"} width={100} type={"numericColumn"} hideInSearch></AgGridColumn>
            <AgGridColumn field={"stockBinAvailableQuantity"} headerName={"可用数量"} width={100} type={"numericColumn"} hideInSearch></AgGridColumn>

            <AgGridColumn field={"stockQty"} headerName={"ITEM库存"} width={100} type={"numericColumn"} hideInSearch></AgGridColumn>
            <AgGridColumn field={"stockPreRegisteredQuantity"} headerName={"ITEM预占数量"} width={100} type={"numericColumn"} hideInSearch></AgGridColumn>
            <AgGridColumn field={"stockAvailableQuantity"} headerName={"ITEM可用数量"} width={100} type={"numericColumn"} hideInSearch></AgGridColumn>
        </AgGridPlus>
    </>
};

export default StockBinComparePage;
export const routeProps = {
    name: '库存对账',
};