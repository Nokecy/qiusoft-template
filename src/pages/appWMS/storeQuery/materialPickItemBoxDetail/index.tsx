import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { MaterialPickItemBoxDetailGetListAsync } from "@/services/wms/MaterialPickItemBoxDetail";
import React, { useState } from "react";
import { useIntl } from "umi";
import { sumBy } from 'lodash';
import { DownOutlined } from "@ant-design/icons";
import { Button, Select } from 'antd';
import { downloadBlob } from '@/_utils';

const AsnItemCollectionPage: React.FC<any> = (props: any) => {
    const intl = useIntl();
    const [data, setData] = useState([])

    return <>
        <AgGridPlus
            headerTitle={"下架箱明细列表"}
            gridKey='appWMS.storeQuery.materialPickItemBoxDetail'
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data: any = await MaterialPickItemBoxDetailGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                setData(data.items)
                return requestData;
            }}
            pinnedBottomRowData={[{ qty: sumBy(data, (x: any) => x.qty! * 1) }]}
            toolBarRender={(gridApi, filter) => {
                return [
                    <Button icon={<DownOutlined />} onClick={() => {
                        downloadBlob(`/api/wms/materialpickitem-box-detail/export?filter=${filter}`, "下架箱SN信息.xlsx")
                    }}>导出</Button>
                ];
            }}>
            <AgGridColumn field={"materialCode"} headerName={intl.formatMessage({ id: "WMS:MaterialCode" })} width={120} hideInSearch />
            <AgGridColumn field={"materialOutCode"} headerName={intl.formatMessage({ id: "WMS:MaterialOutCode" })} width={120} hideInSearch />
            <AgGridColumn field={"material.outCode"} headerName={intl.formatMessage({ id: "WMS:MaterialOutCode" })} width={120} hideInTable />
            <AgGridColumn field={"materialDescript"} headerName={intl.formatMessage({ id: "WMS:MaterialDescript" })} width={500} hideInSearch />
            <AgGridColumn field={"wareHouseZoneCode"} headerName={intl.formatMessage({ id: "WMS:WareHouseZoneCode" })} width={120} />
            <AgGridColumn field={"traceId"} headerName={intl.formatMessage({ id: "WMS:TraceId" })} width={150} />
            <AgGridColumn field={"wareHouseLocationCode"} headerName={intl.formatMessage({ id: "WMS:WareHouseLocationCode" })} width={150} />
            <AgGridColumn field={"contractNo"} headerName={"合同号"} width={150} />
            <AgGridColumn field={"taskOrder"} headerName={"任务令"} width={150} />
            <AgGridColumn field={"boxNumber"} headerName={intl.formatMessage({ id: "WMS:BoxNumber" })} width={100} />
            <AgGridColumn field={"serialNumber"} headerName={intl.formatMessage({ id: "WMS:SerialNumber" })} width={150} />
            <AgGridColumn field={"qty"} headerName={intl.formatMessage({ id: "WMS:Qty" })} width={100} type={"numericColumn"} hideInSearch />
        </AgGridPlus>
    </>
};

export default AsnItemCollectionPage;

export const routeProps = {
    name: '下架箱明细',
};
