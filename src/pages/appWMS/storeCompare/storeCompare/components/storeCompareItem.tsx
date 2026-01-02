import { Alert, Button, message, Modal, Upload } from "antd";
import { CloudUploadOutlined, InboxOutlined } from "@ant-design/icons";
import React, { useMemo, useRef } from "react";
import { useBoolean } from "ahooks";
import { downloadBlob } from "@/_utils";
import Cookies from "js-cookie";
import { serverUrl } from "umi";
import { AgGridPlus } from "@nokecy/qc-ui";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import { RealTimeCompareGetWaitForCallbackDataAsync } from "@/services/wms/RealTimeCompare";
import { head } from "lodash";

const StoreCompareDialog = (props: any) => {
    const { onAfterSubmit, type, children, color, materialCode, materialOutCode, warehouseCode } = props;

    const searchVisible = (type === 'link' ? false : true)

    const gridRef = useRef<GridRef>();
    const [visible, { setTrue, setFalse }] = useBoolean(false);

    const columnDefs = [
        {
            field: 'timeSort', headerName: '序号', width: 74, hideInSearch: true, filter: false, sortable: false,
            cellRenderer: (params: any) => {
                return params.node?.rowIndex + 1;
            }
        },
        { field: 'time', headerName: '上下架日期', width: 160, type: 'dateTimeColumn', hideInSearch: true },
        { field: 'orderNo', headerName: '出入库指令号', width: 130, hideInSearch: true },
        { field: 'materialCode', headerName: '物料编码', width: 120 },
        { field: 'materialOutCode', headerName: '物料外码', width: 120 },
        { field: 'materialDescription', headerName: '物料描述', width: 170, flex: 1 },
        { field: 'waitForCallBackInstructionQuantity', headerName: '入库待回传数量', width: 120, hideInSearch: true },
        { field: 'waitForCallBackOutInstructionQuantity', headerName: '出库待回传数量', width: 120, hideInSearch: true },
        // { field: 'warehouseCode', headerName: '仓库编码', width: 120 },
        { field: 'warehouseName', headerName: '库房名称', width: 120 },
    ];


    return <>
        <Button onClick={setTrue} style={{ color: color || 'white' }} type={type || 'primary'}>{children}</Button>

        <Modal title={"待回传明细"} width={1500} open={visible} onCancel={setFalse} destroyOnClose>
            <AgGridPlus
                gridRef={gridRef}
                headerTitle='待回传明细列表'
                style={{ height: 600 }}
                search={searchVisible}
                gridKey='appWMS.storeCompFare.storeCompareItem'
                rowSelection={'multiple'}
                request={async (params: any, _, c) => {
                    const data = await RealTimeCompareGetWaitForCallbackDataAsync({
                        // PageSize: params!.maxResultCount,
                        // Filter: params?.filter,
                        MaterialCode: materialCode || c.materialCode,
                        MaterialOutCode:materialOutCode || c.materialOutCode,
                        MaterialDescription: c.materialDescription,
                        WarehouseName: c.warehouseName,
                        WarehouseCode: warehouseCode,
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
                    return [
                        // <Access accessible={access[Customer.Create]}>
                        //     <CustomerFormDialog title={'新建客户'} onAfterSubmit={onRefresh}>
                        //         {'新建'}
                        //     </CustomerFormDialog>
                        // </Access>,
                    ];
                }}
                columnDefs={columnDefs}
            >
            </AgGridPlus>
        </Modal>
    </>;
}

export default StoreCompareDialog