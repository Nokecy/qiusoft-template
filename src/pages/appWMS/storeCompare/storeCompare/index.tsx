import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { RealTimeCompareGetListAsync } from '@/services/wms/RealTimeCompare';
import { StoreDataCompareCompareAsyn } from '@/services/wms/StoreDataCompare';
import React, { useRef, useState } from "react";
import { useAccess, useIntl } from "umi";
import DeleteConfirm from "@/components/deleteConfirm";
import { Button, Checkbox, message } from "antd";
import moment from "dayjs";
import { DownOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { downloadBlob } from "@/_utils";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import { useBoolean } from "ahooks";
import StoreCompareDialog from "./components/storeCompareItem";

const StoreCompare: React.FC<any> = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();
    const [visible, { setTrue, setFalse }] = useBoolean(true);
    const [maxResultCount, setMaxResultCount] = useState(200);

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    const handleData = () => {
        //同步数据
        const hide = message.loading('正在操作,请稍后', 0);
        return StoreDataCompareCompareAsyn({}).then(() => {
            onRefresh();
        }).finally(() => {
            hide();
        });
    }

    return <>
        <AgGridPlus
            gridRef={gridRef}
            headerTitle={"三方库存对账"}
            gridKey="appWMS.storeCompare.storeCompare"
            params={{ availableQuantityFilter: visible }}
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                setMaxResultCount(params!.maxResultCount)
                //通过接口读取数据
                let filter = params?.availableQuantityFilter ? `differenceQty != 0 ${params.filter && `, ${params.filter}`}` : params?.filter;
                let data: any = await RealTimeCompareGetListAsync({ Filter: filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                return requestData;
            }}
            toolBarRender={(gridApi, filter, _, paginationInfo) => {
                const { current = 1, skipCount = 0, maxResultCount = 200 } = paginationInfo || {};
                const xfilter = visible ? `differenceQty != 0 ${filter && `, ${filter}`}` : filter;
                return [

                    <StoreCompareDialog children={'待回传明细'} />,

                    <Checkbox checked={visible} onChange={e => { e.target.checked ? setTrue() : setFalse(); }}>
                        仅显示差异
                    </Checkbox>,
                    <DeleteConfirm title="确定同步?" onConfirm={handleData}>
                        <Button type={'primary'} title="同步" icon={<CloudUploadOutlined />}>同步</Button>
                    </DeleteConfirm>,
                    <Button icon={<DownOutlined />} onClick={() => {
                        downloadBlob(`api/wms/erp-store/realtime-compare/export?filter=${xfilter}&SkipCount=${skipCount}&maxResultCount=${maxResultCount}`, "实时对账记录.xlsx")
                    }}>
                        导出
                    </Button>
                ]
            }}
        >
            <AgGridColumn field={"compareType"} headerName={"对账类型"} width={100} />
            <AgGridColumn field={"compareTime"} headerName={intl.formatMessage({ id: "WMS:StoreCompare:CompareTime" })} width={150} cellRenderer={({ value }) => {
                return value && (moment(value).format('YYYY-MM-DD HH:mm:ss'))
            }} />
            <AgGridColumn field={"materialCode"} headerName={intl.formatMessage({ id: "WMS:StoreCompare:MaterialCode" })} width={150} />
            <AgGridColumn field={"materialOutCode"} headerName={intl.formatMessage({ id: "WMS:StoreCompare:MaterialOutCode" })} width={150} />
            <AgGridColumn field={"materialDescription"} headerName={'物料描述'} width={150} />
            <AgGridColumn field={"wareHouseCode"} headerName={intl.formatMessage({ id: "WMS:WareHouseCode" })} width={120} />
            <AgGridColumn field={"realRight"} headerName={intl.formatMessage({ id: "WMS:StoreCompare:RealRight" })} width={150} />
            <AgGridColumn field={"wmsQty"} headerName={intl.formatMessage({ id: "WMS:StoreCompare:WMSQty" })} width={100} />
            <AgGridColumn field={"compareQty"} headerName={intl.formatMessage({ id: "WMS:StoreCompare:ERPQty" })} width={100} />
            <AgGridColumn field={"differenceQty"} headerName={intl.formatMessage({ id: "WMS:StoreCompare:DifferenceQty" })} width={150} />
            <AgGridColumn field={"waitForCallBackQuantity"} headerName={'待回传量'} width={120}

                cellRenderer={(params) => {
                    const { data } = params

                    let color = data.waitForCallBackQuantity > 0 ? 'blue' : 'red'

                    if (data.waitForCallBackQuantity === 0) {
                        color = 'black'
                    }
                    return (
                        <StoreCompareDialog
                            type={'link'}
                            color={color}
                            children={data.waitForCallBackQuantity}
                            materialCode={data.materialCode}
                            materialOutCode={data.materialOutCode}
                            warehouseCode={data.wareHouseCode}
                        />

                    )
                }}
            />
            <AgGridColumn field={"remarks"} headerName={intl.formatMessage({ id: "WMS:StoreCompare:Remarks" })} />
        </AgGridPlus>
    </>
}
export default StoreCompare;
export const routeProps = {
    name: '三方库存对账',
};