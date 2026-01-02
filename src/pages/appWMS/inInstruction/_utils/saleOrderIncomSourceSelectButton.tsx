import { AgGridPlus } from "@/components/agGrid";
import { InInstructionSourceItemGetSaleOrderItemAsync } from '@/services/wms/InInstructionSourceItem';
import { Button, Modal } from "antd";
import React, { useRef, useState } from "react";

const SaleOrderIncomSourceSelectButton = (props: any) => {
    const { customerCode, onSelect } = props;
    const tableRef = useRef<any>();
    const [selectRows, setSelectRows] = useState<any[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    
    // 直接计算是否禁用
    const isDisabled = !customerCode || customerCode.trim() === '';

    // 列定义
    const columnDefs = [
        { field: "saleOrderNo", headerName: "销售单号", width: 150, sortable: true, checkboxSelection: true },
        { field: "customerCode", headerName: "客户编码", width: 150, sortable: true },
        { field: "customerName", headerName: "客户名称", width: 150, sortable: true },
        { field: "mainMaterialOutCode", headerName: "生产编码", width: 150, sortable: true },
        { field: "materialCode", headerName: "物料编码", width: 150, sortable: true },
        { field: "materialOutCode", headerName: "物料外码", width: 150, sortable: true },
        { field: "materialDescription", headerName: "物料描述", width: 200, sortable: true },
        { field: "qty", headerName: "来料数量", width: 120, sortable: true, hideInSearch: true }
    ];

    const onSubmit = () => {
        let selectValues = selectRows.map(x => { 
            return { 
                ...x, 
                materialDescript: x.materialDescription, 
                sourceOrderNo: x.saleOrderNo, 
                sourceOrderItemId: x.saleOrderItemId || x.saleOrderInComItemId, // 兼容两种字段名
                deliveryQty: x.qty 
            } 
        })
        setVisible(false);
        onSelect && onSelect(selectValues);
    }

    // 数据获取函数
    const fetchData = async (params: any) => {
        try {
            const page = params.page || 1;
            const pageSize = params.pageSize || 20;
            const data = await InInstructionSourceItemGetSaleOrderItemAsync({
                CustomerCode: customerCode?.trim(),
                SaleOrderNo: params.saleOrderNo,
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
            console.error('获取销售配料数据失败:', error);
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
            选择销售来料配置
        </Button>

        <Modal title={"选择单据"} width={1500} open={visible} destroyOnClose={true} onCancel={() => { setVisible(false) }} onOk={onSubmit}>
            <AgGridPlus
                ref={tableRef}
                gridKey="saleOrderIncomSelect"
                columnDefs={columnDefs}
                request={fetchData}
                rowSelection="multiple"
                onSelectionChanged={onSelectionChanged}
                pagination={true}
                paginationPageSize={20}
                height={500}
                searchFields={[
                    { field: "saleOrderNo", label: "销售单号", type: "input" },
                    { field: "mainMaterialOutCode", label: "生产编码", type: "input" },
                    { field: "materialCode", label: "物料编码", type: "input" },
                    { field: "startDate", label: "开始时间", type: "date" },
                    { field: "endDate", label: "结束时间", type: "date" }
                ]}
            />
        </Modal>
    </>;
};

export default SaleOrderIncomSourceSelectButton;
