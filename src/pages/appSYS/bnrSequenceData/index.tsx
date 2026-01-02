import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { BNRSequenceDataGetListAsync } from '@/services/openApi/BNRSequenceData';
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import React, { useRef } from "react";
import { Access, useAccess, useIntl } from "umi";


const BnrSequenceDataPage: React.FC<any> = (props: any) => {
    const intl = useIntl();
    const access = useAccess();
    const gridRef = useRef<GridRef>();
    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }
    return <>
        <AgGridPlus
            headerTitle={"序列号序号信息"}
            gridRef={gridRef}
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data = await BNRSequenceDataGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                return requestData;
            }}
            rowMultiSelectWithClick={true}
            toolBarRender={(gridApi) => {
                return [

                ];
            }}>
            <AgGridColumn field={"ruleName"} headerName={"规则名称"} width={200} />
            <AgGridColumn field={"sequenceKey"} headerName={"键值"} width={200} />
            <AgGridColumn field={"value"} headerName={"顺序号"} flex={1} />
        </AgGridPlus>
    </>
};

export default BnrSequenceDataPage;
export const routeProps = {
    name: '序列号序号',
};