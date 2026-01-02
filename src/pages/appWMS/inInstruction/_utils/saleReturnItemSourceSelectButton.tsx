import { ProTable } from "@/components";
import { InInstructionSourceItemGetSaleOrderIncomItemAsync } from '@/services/wms/InInstructionSourceItem';
import { ActionType } from "@ant-design/pro-table";
import { Button, Modal } from "antd";
import React, { useRef, useState } from "react";

const SaleReturnItemSourceSelectButton = (props: any) => {
    const { supplierCode, onSelect } = props;
    const tableRef = useRef<ActionType>();
    const [selectRows, setSelectRows] = useState<any[]>([]);
    const [visible, setVisible] = useState<boolean>(false);

    const onSubmit = () => {
        let selectValues = selectRows.map(x => { return { ...x, deliveryQty: x.qty } })
        setVisible(false);
        onSelect && onSelect(selectValues);
    }

    return <>
        <Button type={"primary"} onClick={() => { setVisible(true); setSelectRows([]) }}>选择退回处理单</Button>

        <Modal title={"选择单据"} width={1500} open={visible} destroyOnClose={true} onCancel={() => { setVisible(false) }} onOk={onSubmit}>
            <ProTable
                actionRef={tableRef}
                rowKey={(record) => record.sourceOrderNo + record.materialCode}
                headerTitle={"退货订单列表"}
                request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                    let po = params!.purchaseOrderNo;
                    let materialCode = params!.materialCode;
                    let startDate = params!.startDate;
                    let endDate = params!.endDate;

                    let data = await InInstructionSourceItemGetSaleOrderIncomItemAsync({
                        SupplierCode: supplierCode?.trim(),
                        PO: po,
                        MaterialCode: materialCode,
                        StartDate: startDate,
                        EndDate: endDate,

                        Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount
                    });
                    let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                    return requestData;
                }}
                rowSelection={{
                    type: "checkbox",
                    onChange: (selectRowKeys, selectRows) => {
                        setSelectRows(selectRows);
                    }
                }}
                tableAlertRender={false}
            >
                <ProTable.Column dataIndex={"sourceOrderNo"} title={"退回单号"} width={150} sorter />
                <ProTable.Column dataIndex={"customerCode"} title={"客户编码"} width={150} sorter hideInSearch />
                <ProTable.Column dataIndex={"customerName"} title={"客户名称"} width={150} sorter hideInSearch />
                <ProTable.Column dataIndex={"materialCode"} title={"物料编码"} width={150} sorter />
                <ProTable.Column dataIndex={"materialOutCode"} title={"物料外码"} width={150} sorter hideInSearch />
                <ProTable.Column dataIndex={"materialDescript"} title={"物料描述"} width={150} sorter hideInSearch />
                <ProTable.Column dataIndex={"qty"} title={"数量"} width={150} sorter hideInSearch />

                <ProTable.Column dataIndex={"startDate"} title={"开始时间"} width={150} valueType={"date"} hideInTable />
                <ProTable.Column dataIndex={"endDate"} title={"结束时间"} width={150} valueType={"date"} hideInTable />
            </ProTable>
        </Modal>
    </>;
};

export default SaleReturnItemSourceSelectButton;
