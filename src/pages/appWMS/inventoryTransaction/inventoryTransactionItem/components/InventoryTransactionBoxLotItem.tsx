import React, { useRef } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { useAccess, useIntl } from '@umijs/max';
import { AgGridPlus } from '@/components/agGrid';
import { InInstructionOrderLpnSubItemGetListAsync } from '@/services/wms/InInstructionOrderLpnSubItem';
import { InventoryTransactionItemGetBoxLotListAsync } from '@/services/wms/InventoryTransactionItem';

/**
 * 库存交易批次记录
 * @returns
 */
const InventoryTransactionBoxLotItemPage = (props) => {
    const intl = useIntl();
    const gridRef = useRef<GridRef>();
    const access = useAccess();

    const { data } = props;

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    };
    const columnDefs: any = [
        {
            headerName: "交易单号",
            field: "transactionNumber",
            width: 150,
        },
        {
            headerName: "仓库代码",
            field: "warehouseCode",
            width: 150,
        },
        {
            headerName: "仓库名称",
            field: "warehouseName",
            width: 150,
        },
        {
            headerName: "仓库区域代码",
            field: "warehouseZoneCode",
            width: 150,
        },
        {
            headerName: "仓位代码",
            field: "wareHouseLocationCode",
            width: 150,
        },
        {
            headerName: "跟踪ID",
            field: "traceId",
            width: 150,
        },
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
            field: "quantity",
            width: 120,
            type: "numberColumn",
        },
        {
            headerName: "创建时间",
            field: "creationTime",
            width: 180,
            type: "dateColumn",
        },
        {
            headerName: "最后修改时间",
            field: "lastModificationTime",
            width: 180,
            type: "dateColumn",
        },
        {
            headerName: "是否已删除",
            field: "isDeleted",
            width: 120,
            type: "bool",
        },
        {
            headerName: "删除时间",
            field: "deletionTime",
            width: 180,
            type: "dateColumn",
        },
        {
            headerName: "创建者",
            field: "creator",
            width: 150,
        },
        {
            headerName: "最后修改者",
            field: "lastModifier",
            width: 150,
        },
        {
            headerName: "删除者",
            field: "deleter",
            width: 150,
        },
        {
            headerName: "组织代码",
            field: "organizationCode",
            width: 150,
        },
        {
            headerName: "组织名称",
            field: "organizationName",
            width: 150,
        },
        {
            headerName: "公司代码",
            field: "companyCode",
            width: 150,
        },
        {
            headerName: "工厂代码",
            field: "factoryCode",
            width: 150,
        },
    ];



    return (
        <>
            <AgGridPlus
                gridRef={gridRef}
                search={false}
                headerTitle='库存交易批次记录列表'
                gridKey='appWMS.inventoryTransaction.inventoryTransactionBoxLotItem'
                params={{ transactionNumber: data?.transactionNumber }}
                request={async (params?: any) => {
                    let filter = `transactionNumber=${params?.transactionNumber}`;
                    let data = await InventoryTransactionItemGetBoxLotListAsync({
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

export default InventoryTransactionBoxLotItemPage;
export const routeProps = {
    name: '库存交易批次记录',
};
