import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { StockBinInfoGetAvailableListAsync } from "@/services/wms/StockBinInfo";
import { GridApi } from "ag-grid-community";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useIntl } from 'umi';
import ShipmentOrderProfileDrawer from "../../pickTaskItem/components/stockModal";

const BindTraceIdDialog = (props: any) => {
    const { onSelected, warehouseId } = props;
    const [gridApi, setGridApi] = useState<GridApi | undefined>();
    const intl = useIntl();
    const [visible, setVisible] = useState(false);

    const onSubmit = () => {
        const rows = gridApi?.getSelectedRows();
        if(onSelected ) onSelected(rows);
        setVisible(false);
    }

    const onCancel = () => {
        setVisible(false)
    }

    return (<>
        <Button type={"primary"} onClick={() => { setVisible(true) }}>下架绑定LPN</Button>
        <Modal title={"绑定LPN名称"} width={1200} bodyStyle={{ height: 500 }} destroyOnClose={true} open={visible} onCancel={onCancel} onOk={onSubmit}>
            <AgGridPlus
                headerTitle={"物料下架记录"}
                rowSelection={"multiple"}
                onGridReady={(e) => {
                    setGridApi(e.api);
                }}
                rowMultiSelectWithClick
                request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                    let filter = params?.filter ? `wareHouseId=${warehouseId},${params?.filter}` : `wareHouseId=${warehouseId}`;
                    let data = await StockBinInfoGetAvailableListAsync({ filter: filter, sorting: params!.sorter, skipCount: params!.skipCount, maxResultCount: params!.maxResultCount });
                    let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                    return requestData;
                }}
                toolBarRender={() => {
                    return [];
                }}>
                <AgGridColumn field={"wareHouse.code"} headerName={intl.formatMessage({ id: "WMS:WareHouseCode" })} width={150} cellRenderer={ShipmentOrderProfileDrawer}></AgGridColumn>
                <AgGridColumn field={"wareHouse.name"} headerName={intl.formatMessage({ id: "WMS:WareHouseName" })} width={160} ></AgGridColumn>
                <AgGridColumn field={"warehouseZoneCode"} headerName={intl.formatMessage({ id: "WMS:WareHouseZoneCode" })} width={150} ></AgGridColumn>
                <AgGridColumn field={"wareHouseLocationCode"} headerName={intl.formatMessage({ id: "WMS:WareHouseLocationCode" })} width={150} ></AgGridColumn>
                <AgGridColumn field={"material.code"} headerName={intl.formatMessage({ id: "WMS:MaterialItemCode" })} width={150} ></AgGridColumn>
                <AgGridColumn field={"material.outCode"} headerName={intl.formatMessage({ id: "WMS:MaterialItemOutCode" })} width={150}></AgGridColumn>
                <AgGridColumn field={"material.descript"} headerName={intl.formatMessage({ id: "WMS:MaterialItemDescript" })} width={150}></AgGridColumn>
                <AgGridColumn field={"internalLotNumber"} headerName={intl.formatMessage({ id: "WMS:InternalLotNumber" })} width={150}></AgGridColumn>
                <AgGridColumn field={"traceId"} headerName={intl.formatMessage({ id: "WMS:TraceId" })} width={150}></AgGridColumn>
                <AgGridColumn field={"contractNo"} headerName={"合同号"} width={180} ></AgGridColumn>
                <AgGridColumn field={"taskOrder"} headerName={"任务令"} width={180} ></AgGridColumn>
                <AgGridColumn field={"businessLotNumber"} headerName={intl.formatMessage({ id: "WMS:BusinessLotNumber" })} width={140}></AgGridColumn>
                <AgGridColumn field={"putDate"} headerName={intl.formatMessage({ id: "WMS:PutDate" })} width={150} type={"dateTimeColumn"} initialSort={"desc"}></AgGridColumn>
                <AgGridColumn field={"productionDate"} headerName={intl.formatMessage({ id: "WMS:ProductionDate" })} width={150} type={"dateTimeColumn"} initialSort={"desc"}></AgGridColumn>
                <AgGridColumn field={"dateCode"} headerName={intl.formatMessage({ id: "WMS:DateCode" })} width={150} ></AgGridColumn>
                <AgGridColumn field={"putDate"} hideInSearch headerName={"库龄(天)"} width={100} cellRenderer={'day'}></AgGridColumn>

                <AgGridColumn field={"creationTime"} headerName={intl.formatMessage({ id: "WMS:CreationTime" })} width={160} type={"dateTimeColumn"} initialSort={"desc"} />
                <AgGridColumn field={"creator"} headerName={intl.formatMessage({ id: "WMS:Creator" })} width={110} />
                <AgGridColumn field={"lastModificationTime"} headerName={intl.formatMessage({ id: "WMS:LastModificationTime" })} width={120} type={"dateTimeColumn"} />
                <AgGridColumn field={"lastModifier"} headerName={intl.formatMessage({ id: "WMS:LastModifier" })} width={110} />
            </AgGridPlus>
        </Modal>
    </>);
}

export default BindTraceIdDialog