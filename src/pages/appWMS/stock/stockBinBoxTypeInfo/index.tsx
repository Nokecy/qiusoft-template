import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { StockBinBoxInfoGetBoxTypeByTraceListAsync } from '@/services/wms/StockBinBoxInfo';
import React from "react";
import { useIntl } from "umi";

const StockBinBoxTypePage: React.FC<any> = (props: any) => {
    const intl = useIntl();

    return <>
        <AgGridPlus
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data = await StockBinBoxInfoGetBoxTypeByTraceListAsync({ Filter: params!.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data, total: data.length };
                return requestData;
            }}
            headerTitle={"LPN箱包规列表"}
            gridKey="appWMS.stock.stockBinBoxTypeInfo"
            toolBarRender={(gridApi) => {
                return [

                ];
            }}
        >
            <AgGridColumn field={"traceId"} headerName={intl.formatMessage({ id: "WMS:TraceId" })} width={180} queryField={"parentTraceId"}></AgGridColumn>
            <AgGridColumn field={"materialCode"} headerName={intl.formatMessage({ id: "WMS:MaterialCode" })} width={100} queryField={"materialItem.code"}></AgGridColumn>
            <AgGridColumn field={"materialOutCode"} headerName={intl.formatMessage({ id: "WMS:MaterialOutCode" })} width={100} queryField={"materialItem.outCode"}></AgGridColumn>
            <AgGridColumn field={"contractNo"} headerName={"合同号"} width={150} ></AgGridColumn>
            <AgGridColumn field={"taskOrder"} headerName={"任务令"} width={150} ></AgGridColumn>
            <AgGridColumn field={"boxType"} headerName={"包规"} width={100} hideInSearch type={"numericColumn"}></AgGridColumn>
            <AgGridColumn field={"quantity"} headerName={"箱数"} width={100} hideInSearch type={"numericColumn"}></AgGridColumn>
            <AgGridColumn field={"test"} headerName={""} flex={1} hideInSearch type={"numericColumn"}></AgGridColumn>
        </AgGridPlus>
    </>
};

export default StockBinBoxTypePage;
export const routeProps = {
	name: 'LPN箱包规列表',
};