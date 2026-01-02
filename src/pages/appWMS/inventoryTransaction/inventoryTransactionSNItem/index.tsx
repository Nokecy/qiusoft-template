import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { InventoryTransactionItemGetSerialListAsync } from "@/services/wms/InventoryTransactionItem";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import { Tag } from "antd";
import React, { useRef } from "react";
import { Access, useAccess, useIntl } from "umi";

const InventoryTransactionSNItemPage = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    return <>
        <AgGridPlus
            gridRef={gridRef}
            headerTitle={"库存SN交易记录"}
            gridKey="appWMS.inventoryTransaction.inventoryTransactionSNItem"
            request={async (params?: any) => {
                let data = await InventoryTransactionItemGetSerialListAsync({ Filter: params.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                return requestData;
            }}
        >
            <AgGridColumn field={"transactionNumber"} headerName={"交易号"} width={150} />
            <AgGridColumn field={"transactionType"} headerName={"交易类型"} width={100} cellRenderer={({ value }) => {
                switch (value) {
                    case 5:
                        return <Tag color={'success'}>收货</Tag>;
                    case 10:
                        return <Tag color={'waring'}>转移</Tag>;
                    case 15:
                        return <Tag color={'error'}>调整</Tag>;
                    case 20:
                        return <Tag color={'cyan'}>发货</Tag>;
                    default:
                        return '未知';
                }
            }} />
            <AgGridColumn field={'transactionTime'} headerName={'交易时间'} width={150} type={"dateTimeColumn"} />
            <AgGridColumn field={'instructionOrderNo'} headerName={'指令单号'} width={120} />
            <AgGridColumn field={"sourceOrderNo"} headerName={"来源单号"} width={120} />
            <AgGridColumn field={"warehouseCode"} headerName={"库房编码"} width={100} />
            <AgGridColumn field={"warehouseName"} headerName={"库房名称"} width={150} />
            <AgGridColumn field={"warehouseLocationCode"} headerName={"交易库位"} width={100} />
            <AgGridColumn field={"materialCode"} headerName={"物料编码"} width={100} />
            <AgGridColumn field={"materialOutCode"} headerName={"物料外码"} width={100} />
            <AgGridColumn field={"materialDescription"} headerName={"物料描述"} width={100} />
            <AgGridColumn field={"serialNumber"} headerName={"SN"} width={150} />
            <AgGridColumn field={"transactionQuantity"} headerName={"交易数量"} width={100} hideInSearch={true} />
            <AgGridColumn field={"sourceTraceId"} headerName={"来源LPN"} width={100} />
            <AgGridColumn field={"newTraceId"} headerName={"新LPN"} width={100} />
            <AgGridColumn field={"sourceBoxNumber"} headerName={"来源箱号"} width={100} />
            <AgGridColumn field={"newBoxNumber"} headerName={"捡料箱号"} width={100} />
            <AgGridColumn field={"realRightCode"} headerName={"物权"} width={100} />
            <AgGridColumn field={"supplierName"} headerName={"供应商"} width={100} />
            <AgGridColumn field={"dateCode"} headerName={"日期编码"} width={100} />
            <AgGridColumn field={"lotNo"} headerName={"批次号"} width={100} />
            <AgGridColumn field={"expiryDate"} headerName={"过期时间"} width={150} type={"dateTimeColumn"} />
        </AgGridPlus>
    </>
};

export default InventoryTransactionSNItemPage;
export const routeProps = {
    name: '库存SN交易记录',
};