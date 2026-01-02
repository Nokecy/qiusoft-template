import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { BNRSequenceItemGetListAsync } from '@/services/openApi/BNRSequenceItem';
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import React, { useRef } from "react";
import { Access, useAccess, useIntl } from "umi";


const BnrSequenceItemPage = (props: any) => {
    const intl = useIntl();
    const access = useAccess();
    const gridRef = useRef<GridRef>();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    return <>
        <AgGridPlus
            headerTitle={"序列号信息"}
            gridRef={gridRef}
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data = await BNRSequenceItemGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                return requestData;
            }}
            rowMultiSelectWithClick={true}
            toolBarRender={(gridApi) => {
                return [

                ];
            }}>
            <AgGridColumn field={"ruleCode"} headerName={"规则编码"} width={100} />
            <AgGridColumn field={"ruleContent"} headerName={"规则内容"} width={200} />
            <AgGridColumn field={"sequenceValue"} headerName={"序列号"} flex={1} />
            <AgGridColumn field={"creationTime"} headerName={"创建时间"} width={200} type={"dateTimeColumn"} />
        </AgGridPlus>
    </>
};

export default BnrSequenceItemPage;
export const routeProps = {
    name: '序列号信息',
};