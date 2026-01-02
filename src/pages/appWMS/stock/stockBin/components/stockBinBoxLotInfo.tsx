import React, { useRef } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { useAccess, useIntl } from '@umijs/max';
import { AgGridPlus } from '@/components/agGrid';
import { StockBinBoxLotInfoGetListAsync } from '@/services/wms/StockBinBoxLotInfo';

/**
 * LPN箱批次列表
 * @returns
 */
const StockBinBoxLotInfoPage = (props) => {
    const intl = useIntl();
    const gridRef = useRef<GridRef>();
    const access = useAccess();

    const columnDefs: any = [
        // {
        //     headerName: "仓库ID",
        //     field: "warehouseId",
        //     width: 150,
        // },
        // {
        //     headerName: "仓库区域ID",
        //     field: "warehouseZoneId",
        //     width: 150,
        // },
        {
            headerName: "库位编码",
            field: "wareHouseLocationCode",
            width: 150,
        },
        // {
        //     headerName: "父级跟踪ID",
        //     field: "parentTraceId",
        //     width: 150,
        // },
        // {
        //     headerName: "物料项ID",
        //     field: "materialItemId",
        //     width: 150,
        // },
        {
            headerName: "箱号",
            field: "boxNumber",
            width: 120,
        },
        {
            headerName: "型号",
            field: "modelNumber",
            width: 150,
        },
        {
            headerName: "批次号",
            field: "lotNumber",
            width: 150,
        },
        {
            headerName: "批号",
            field: "batchNo",
            width: 150,
        },
        {
            headerName: "日期代码",
            field: "dateCode",
            width: 150,
        },
        {
            headerName: "数量",
            field: "qty",
            width: 120,
            type: "numberColumn",
        },
        {
            headerName: "创建时间",
            field: "creationTime",
            width: 180,
            type: "dateTimeColumn",
        },
        {
            headerName: "最后修改时间",
            field: "lastModificationTime",
            width: 180,
            type: "dateTimeColumn",
        },

    ];
    

    return (
        <>
            <AgGridPlus
                gridRef={gridRef}
                headerTitle='LPN箱批次列表'
                search={false}
                gridKey='appWMS.stock.stockBinBoxLotInfo'
                params={{ traceId: props?.data?.traceId }}
                request={async (params: any) => {
                    let filter = `parentTraceId = ${params?.traceId}`;
                    let data = await StockBinBoxLotInfoGetListAsync({
                        PageSize: params!.maxResultCount,
                        Filter: filter,
                        MaxResultCount: params!.maxResultCount,
                        SkipCount: params!.skipCount,
                        Sorting: params!.sorter!
                    });
                    return {
                        success: true,
                        data: data.items!,
                        total: data.totalCount,
                    };
                }}
                toolBarRender={(gridApi, filter) => {
                    return [];
                }}
                columnDefs={columnDefs}
            >
            </AgGridPlus>
        </>
    );
};

export default StockBinBoxLotInfoPage;