import { AgGridPlus } from "@/components/agGrid";
import { InInstructionSourceItemGetPurchaseItemAsync } from '@/services/wms/InInstructionSourceItem';
import { Button, Modal } from "antd";
import React, { useRef, useState, useEffect } from "react";

const PurchaseItemSourceSelectButton = (props: any) => {
    const { supplierCode, onSelect } = props;
    const tableRef = useRef<any>();
    const [selectRows, setSelectRows] = useState<any[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    
    // 直接计算是否禁用，不使用额外的 state
    const isDisabled = !supplierCode || supplierCode.trim() === '';

    // 列定义
    const columnDefs = [
        { field: "purchaseOrderNo", headerName: "采购单号", width: 150, sortable: true, checkboxSelection: true },
        { field: "supplierCode", headerName: "供应商编码", width: 150, sortable: true },
        { field: "supplierName", headerName: "供应商名称", width: 150, sortable: true },
        { field: "materialCode", headerName: "物料编码", width: 150, sortable: true },
        { field: "materialOutCode", headerName: "物料外码", width: 150, sortable: true },
        { field: "materialDescript", headerName: "物料描述", width: 200, sortable: true },
        { field: "qty", headerName: "采购数量", width: 120, sortable: true },
        { field: "acceptQty", headerName: "已交货数量", width: 130, sortable: true },
        { 
            field: "deliveryDate", 
            headerName: "交货时间", 
            width: 150, 
            sortable: true,
            valueFormatter: (params: any) => {
                if (params.value) {
                    return new Date(params.value).toLocaleDateString();
                }
                return '';
            }
        }
    ];

    const onSubmit = () => {
        let selectValues = selectRows.map(x => { return { ...x, sourceOrderNo: x.purchaseOrderNo, sourceOrderItemId: x.purchaseOrderItemId, deliveryQty: x.qty,supplierCode:x.supplierCode,supplierName:x.supplierName } })
        setVisible(false);
        onSelect && onSelect(selectValues);
    }

    // 数据获取函数
    const fetchData = async (params: any) => {
        try {
            const page = params.page || 1;
            const pageSize = params.pageSize || 20;
            const data = await InInstructionSourceItemGetPurchaseItemAsync({
                SupplierCode: supplierCode?.trim(),
                PO: params.purchaseOrderNo,
                MaterialCode: params.materialCode,
                StartDate: params.startDate,
                EndDate: params.endDate,
                Sorting: params.sorting,
                SkipCount: (page - 1) * pageSize,
                MaxResultCount: pageSize
            });
            return {
                data: data.items || [],
                total: data.totalCount || 0,
                success: true
            };
        } catch (error) {
            console.error('获取采购订单数据失败:', error);
            return {
                data: [],
                total: 0,
                success: false
            };
        }
    };

    // 选择回调
    const onSelectionChanged = (params: any) => {
        const selectedNodes = params.api.getSelectedNodes();
        const selectedData = selectedNodes.map((node: any) => node.data);
        setSelectRows(selectedData);
    };

    return <>
        <Button 
            type={"primary"} 
            disabled={isDisabled} 
            onClick={() => { setVisible(true); setSelectRows([]) }}
        >
            选择PO
        </Button>

        <Modal title={"选择单据"} width={1500} open={visible} destroyOnClose={true} onCancel={() => { setVisible(false) }} onOk={onSubmit}>
            <AgGridPlus
                ref={tableRef}
                gridKey="purchaseItemSelect"
                columnDefs={columnDefs}
                request={fetchData}
                rowSelection="multiple"
                onSelectionChanged={onSelectionChanged}
                pagination={true}
                paginationPageSize={20}
                height={500}
                searchFields={[
                    { field: "purchaseOrderNo", label: "采购单号", type: "input" },
                    { field: "materialCode", label: "物料编码", type: "input" },
                    { field: "startDate", label: "开始时间", type: "date" },
                    { field: "endDate", label: "结束时间", type: "date" }
                ]}
            />
        </Modal>
    </>;
};

export default PurchaseItemSourceSelectButton;
