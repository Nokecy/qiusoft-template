import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { MaterialLoopPickInfoGetListAsync } from '@/services/wms/MaterialLoopPickInfo';
import { sumBy } from "lodash";
import React, { useState } from "react";
import { useIntl } from "umi";
import { PickSourceType } from "../../outInstruction/_utils";

const LoopPickItemInfoPage: React.FC<any> = (props: any) => {
    const intl = useIntl();
    const [data, setData] = useState([])

    return <>
        <AgGridPlus
            headerTitle={"物料滚动发料记录"}
            gridKey='appWMS.storeQuery.loopPickItemInfo'
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data: any = await MaterialLoopPickInfoGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                setData(data.items)
                return requestData;
            }}
            pinnedBottomRowData={[{ qty: sumBy(data, (x: any) => x.qty! * 1) }]}
            toolBarRender={() => {
                return [];
            }}>
            <AgGridColumn field={"sourceOrderNo"} headerName={"来源单据"} width={150} />
            <AgGridColumn field={"loopType"} headerName={"滚动类型"} width={150} />
            <AgGridColumn field={"traceId"} headerName={"载具号"} width={120} cellRenderer={PickSourceType} />
            <AgGridColumn field={"boxNumber"} headerName={"箱号"} width={120} />
            <AgGridColumn field={"dateCode"} headerName={"库存DC"} width={220} />
            <AgGridColumn field={"businessLotNumber"} headerName={"批次号"} width={120} />
            <AgGridColumn field={"wareHouseLocationCode"} headerName={intl.formatMessage({ id: "WMS:WareHouseLocationCode" })} width={150} />
            <AgGridColumn field={"materialItem.code"} headerName={intl.formatMessage({ id: "WMS:MaterialCode" })} width={120} />
            <AgGridColumn field={"materialItem.outCode"} headerName={intl.formatMessage({ id: "WMS:MaterialOutCode" })} width={120} />
            <AgGridColumn field={"materialItem.description"} headerName={'物料描述'} width={120} />
            <AgGridColumn field={"pickQty"} headerName={intl.formatMessage({ id: "WMS:Qty" })} width={100} type={"numericColumn"} hideInSearch />
            <AgGridColumn field={"creationTime"} headerName={intl.formatMessage({ id: "WMS:CreationTime" })} width={160} type={"dateTimeColumn"} initialSort={"desc"} />
            <AgGridColumn field={"creator"} headerName={intl.formatMessage({ id: "WMS:Creator" })} width={110} />
        </AgGridPlus>
    </>
};

export default LoopPickItemInfoPage;
export const routeProps = {
    name: '滚动发料记录',
};