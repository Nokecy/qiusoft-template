import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { MaterialLocationMoveItemGetListAsync } from '@/services/wms/MaterialLocationMoveItem';
import { ActionType } from "@ant-design/pro-table";
import { sumBy } from "lodash";
import React, { useRef, useState } from "react";
import { useAccess, useIntl } from "umi";

const MaterialLocationMovePage: React.FC<any> = (props: any) => {
    const intl = useIntl();
    const ref = useRef<ActionType>();
    const access = useAccess();
    const [data,setData] = useState([])

    return <>
        <AgGridPlus
            headerTitle={"库位转移记录"}
            gridKey="appWMS.stock.locationMove"
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data:any = await MaterialLocationMoveItemGetListAsync({ Filter: params!.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                setData(data.items)
                return requestData;
            }}
            pinnedBottomRowData={[{qty: sumBy(data, (x: any) => x.qty! * 1)}]}
            >
            <AgGridColumn field={"sourceWareHouse.code"} headerName={intl.formatMessage({ id: "WMS:SourceWareHouseCode" })} width={120} />
            <AgGridColumn field={"sourceWareHouse.name"} headerName={intl.formatMessage({ id: "WMS:SourceWareHouseNode" })} width={150} />
            <AgGridColumn field={"targetWareHouse.code"} headerName={intl.formatMessage({ id: "WMS:TargetWareHouseCode" })} width={150} />
            <AgGridColumn field={"targetWareHouse.name"} headerName={intl.formatMessage({ id: "WMS:TargetWareHouseName" })} width={150} />
            <AgGridColumn field={"sourceWareHouseLocation.code"} headerName={intl.formatMessage({ id: "WMS:SourceWareHouseLocationCode" })} width={150} />
            <AgGridColumn field={"targetWareHouseLocation.code"} headerName={intl.formatMessage({ id: "WMS:TargetWareHouseLocationCode" })} width={150} />
            <AgGridColumn field={"materialItem.code"} headerName={intl.formatMessage({ id: "WMS:MaterialCode" })} width={120} />
            <AgGridColumn field={"materialItem.outCode"} headerName={intl.formatMessage({ id: "WMS:MaterialOutCode" })} width={120} />
            <AgGridColumn field={"materialManufacturer"} headerName={intl.formatMessage({ id: "WMS:MaterialManufacturer" })} width={100}/>
            <AgGridColumn field={"materialModel"} headerName={intl.formatMessage({ id: "WMS:MaterialModel" })} width={100}/>
            <AgGridColumn field={"batchNo"} headerName={intl.formatMessage({ id: "WMS:BatchNo" })} width={100}/>
            <AgGridColumn field={"barCode"} headerName={intl.formatMessage({ id: "WMS:BarCode" })} width={150}/>
            <AgGridColumn field={"dateCode"} headerName={intl.formatMessage({ id: "WMS:DateCode" })} width={120}/>
            <AgGridColumn field={"lotCode"} headerName={intl.formatMessage({ id: "WMS:LotCode" })} width={120}/>
            <AgGridColumn field={"putDate"} headerName={intl.formatMessage({ id: "WMS:PutDate" })} type={"dateColumn"} width={120}/>
            <AgGridColumn field={"expiryDate"} headerName={intl.formatMessage({ id: "WMS:ExpiryDate" })} />
            <AgGridColumn field={"qty"} headerName={intl.formatMessage({ id: "WMS:Qty" })} width={100} type={"numericColumn"} hideInSearch/>
        </AgGridPlus>
    </>
};

export default MaterialLocationMovePage;

export const routeProps = {
	name: '库位转移记录',
};