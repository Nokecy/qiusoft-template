import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { HistoryCompareGetListAsync } from '@/services/wms/HistoryCompare';
import React, { useState } from "react";
import { Access, useAccess, useIntl } from "umi";
import moment from "dayjs";
import { downloadBlob } from "@/_utils";
import { Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const StoreCompare: React.FC<any> = (props: any) => {
    const intl = useIntl();
    const access = useAccess();

    return <>
        <AgGridPlus
            headerTitle={"对账记录"}
            gridKey="appWMS.storeCompare.historyCompare"
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                //通过接口读取数据
                let data: any = await HistoryCompareGetListAsync({ Filter: params!.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                return requestData;
            }}

            toolBarRender={(gridApi, filter) => {
                return [
                    <Button icon={<DownOutlined />} onClick={() => {
                        downloadBlob(`api/wms/erp-store/history-compare/export?filter=${filter}`, "历史对账记录.xlsx")
                    }}>
                        导出
                    </Button>
                ]
            }}
        >
            
            <AgGridColumn field={"compareType"} headerName={"对账类型"} width={100} />
            <AgGridColumn field={"compareTime"} headerName={intl.formatMessage({ id: "WMS:StoreCompare:CompareTime" })} width={150} cellRenderer={({ value }) => {
                return value && (moment(value).format('YYYY-MM-DD HH:mm:ss'))
            }} type={"dateTimeColumn"} />
            <AgGridColumn field={"materialCode"} headerName={intl.formatMessage({ id: "WMS:StoreCompare:MaterialCode" })} width={150} />
            <AgGridColumn field={"materialOutCode"} headerName={intl.formatMessage({ id: "WMS:StoreCompare:MaterialOutCode" })} width={150} />
            <AgGridColumn field={"wareHouseCode"} headerName={intl.formatMessage({ id: "WMS:StoreCompare:WareHouseCode" })} width={150} />
            <AgGridColumn field={"realRight"} headerName={intl.formatMessage({ id: "WMS:StoreCompare:RealRight" })} width={150} />
            <AgGridColumn field={"wmsQty"} headerName={intl.formatMessage({ id: "WMS:StoreCompare:WMSQty" })} width={100} />
            <AgGridColumn field={"compareQty"} headerName={intl.formatMessage({ id: "WMS:StoreCompare:ERPQty" })} width={100} />
            <AgGridColumn field={"differenceQty"} headerName={intl.formatMessage({ id: "WMS:StoreCompare:DifferenceQty" })} width={150} />
            <AgGridColumn field={"remarks"} headerName={intl.formatMessage({ id: "WMS:StoreCompare:Remarks" })} />
        </AgGridPlus>
    </>
}
export default StoreCompare;
export const routeProps = {
    name: '三方对账历史',
};