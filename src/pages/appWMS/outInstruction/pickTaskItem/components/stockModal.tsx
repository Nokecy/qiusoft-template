import { useBoolean } from 'ahooks';
import { Modal, message, Button, InputNumber } from 'antd';
import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import React, { useEffect, useState } from 'react';
import { PickTaskItemManualAllocationAsync } from '@/services/wms/PickTaskItem';
import { StockBinInfoGetAvailableListAsync } from '@/services/wms/StockBinInfo'
import { GridApi } from "ag-grid-community";
import { Access, useAccess, useIntl, } from 'umi';
import { LocationType } from '@/pages/appWMS/baseInfo/_utils';

const ShipmentOrderProfileDrawer = (props: any) => {
    const { visible, setFalse, picktask } = props
    const [gridApi, setGridApi] = useState<GridApi | undefined>();
    const intl = useIntl();
    const handleOk = () => {
        submit()
    }
    const PromiseRows = (selectRows) => {
        return new Promise((resolve, reject) => {
            let b = selectRows.find(i => i.quantity > picktask.qty);
            if (b) resolve(false);
            else resolve(selectRows!.map(i => ({
                traceId: i.traceId,
                quantity: i.quantity
            })))

        })
    }
    const PickTaskItemManualAllocation = (pickTaskId: string,
        manualItems: any) => {
        const hide = message.loading('正在操作,请稍后', 0);
        PickTaskItemManualAllocationAsync({
            pickTaskId,
            manualItems
        }).then(() => {
            setFalse();

        }).finally(() => { hide(); });
    }

    const submit = async () => {
        const selectRows = gridApi?.getSelectedRows();
        if (!selectRows?.length) {
            message.error("请选择挑料对象")
        }
        let arr = await PromiseRows(selectRows)
        if (!arr) {
            message.error("挑料数量不可超过需求数量")
            return
        }
        await PickTaskItemManualAllocation(picktask?.id, arr)

    }
    return (
        (<Modal width={"90%"} title="手工挑料" destroyOnClose open={visible} onOk={handleOk} onCancel={(setFalse)}>
            <AgGridPlus
                style={{ height: 450 }}
                headerTitle="修改挑料数量进行手工挑料"
                request={async (params) => {
                    let filter = params?.filter ? `materialId=${picktask?.materialItem.id},${params?.filter}` : `materialId=${picktask?.materialItem.id}`;
                    let data = await StockBinInfoGetAvailableListAsync({ filter, sorting: params!.sorter, skipCount: params!.skipCount, maxResultCount: params!.maxResultCount });
                    data.items?.forEach((i: any) => { i.quantity = i.quantity || 0 })
                    let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                    return requestData;
                }}
                onGridReady={(e) => {
                    setGridApi(e.api);
                }}
                rowSelection={"multiple"}
            >
                <AgGridColumn field={"wareHouse.code"} headerName={intl.formatMessage({ id: "WMS:WareHouseCode" })} width={120} pinned hide></AgGridColumn>
                <AgGridColumn field={"wareHouse.name"} headerName={intl.formatMessage({ id: "WMS:WareHouseName" })} width={220} pinned></AgGridColumn>
                <AgGridColumn field={"warehouseZoneCode"} headerName={intl.formatMessage({ id: "WMS:WareHouseZoneCode" })} width={120} pinned></AgGridColumn>
                <AgGridColumn field={"warehouseZoneType"} headerName={intl.formatMessage({ id: "WMS:WareHouseZoneType" })} width={120} pinned cellRenderer={LocationType}></AgGridColumn>
                <AgGridColumn field={"wareHouseLocationCode"} headerName={intl.formatMessage({ id: "WMS:WareHouseLocationCode" })} width={150} pinned></AgGridColumn>
                <AgGridColumn field={"materialItem.code"} hideInSearch={true} headerName={intl.formatMessage({ id: "WMS:MaterialCode" })} width={120} pinned></AgGridColumn>
                <AgGridColumn field={"traceId"} hideInSearch={true} headerName={intl.formatMessage({ id: "WMS:TraceId" })} width={120} pinned></AgGridColumn>
                <AgGridColumn field={"qty"} headerName={intl.formatMessage({ id: "WMS:Qty" })} width={100} type={"numericColumn"} hideInSearch></AgGridColumn>
                <AgGridColumn field={"availableQuantity"} headerName={intl.formatMessage({ id: "WMS:AvailableQuantity" })} width={120} hideInSearch></AgGridColumn>
                <AgGridColumn field={"quantity"} headerName={"挑料数量"} editable={true} onCellValueChanged={(e) => {
                    if (e.newValue > picktask.qty) {
                        message.error("挑料数量不可超过需求数量")
                        e.data.quantity = picktask.qty;
                        e.api?.refreshCells()
                    }

                }} width={120} type={"numericColumn"} hideInSearch></AgGridColumn>
                <AgGridColumn field={"internalLotNumber"} headerName={intl.formatMessage({ id: "WMS:InternalLotNumber" })} width={150}></AgGridColumn>
                <AgGridColumn field={"businessLotNumber"} headerName={intl.formatMessage({ id: "WMS:BusinessLotNumber" })} width={120}></AgGridColumn>
                <AgGridColumn field={"isOpen"} headerName={intl.formatMessage({ id: "WMS:IsOpen" })} width={120} type={"bool"}></AgGridColumn>
                <AgGridColumn field={"openTime"} headerName={intl.formatMessage({ id: "WMS:OpenTime" })} width={150}></AgGridColumn>
                <AgGridColumn field={"putDate"} headerName={intl.formatMessage({ id: "WMS:PutDate" })} width={120} type={"dateColumn"}></AgGridColumn>
                <AgGridColumn field={"productionDate"} headerName={intl.formatMessage({ id: "WMS:ProductionDate" })} width={120} type={"dateColumn"}></AgGridColumn>
                <AgGridColumn field={"expiryDate"} headerName={intl.formatMessage({ id: "WMS:ExpiryDate" })} width={120} type={"dateColumn"}></AgGridColumn>
                <AgGridColumn field={"preRegisteredQuantity"} headerName={intl.formatMessage({ id: "WMS:PreRegisteredQuantity" })} type={"numericColumn"} hideInSearch width={120} type={"bool"}></AgGridColumn>
                <AgGridColumn field={"qualityStatus"} headerName={intl.formatMessage({ id: "WMS:QualityStatus" })} width={220} type={"bool"} ></AgGridColumn>
                <AgGridColumn field={"openTime"} headerName={intl.formatMessage({ id: "WMS:OpenTime" })} width={220} type={"dateTimeColumn"} ></AgGridColumn>
            </AgGridPlus>
        </Modal>)
    );
};

export default ShipmentOrderProfileDrawer;