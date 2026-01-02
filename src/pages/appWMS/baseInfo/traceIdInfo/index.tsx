import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { TraceIdGetListAsync } from "@/services/wms/TraceId";
import { TraceId } from "@/services/wmsPermission";
import { PrinterOutlined } from "@ant-design/icons";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import { ICellRendererParams } from "ag-grid-community";
import { Button, Space } from "antd";
import React, { useRef } from "react";
import { Access, useAccess, useIntl, serverUrl } from "umi";
import TraceIdInfoFormDialog from "./components/formDialog";

const Options = (props: ICellRendererParams) => {
    const { data, api } = props;
    const intl = useIntl();
    const access = useAccess();

    const print = () => {
        const frameElement = window.open(`${serverUrl()}/devExpressReport/print?reportUrl=SingleLocationPrint&code=${data.traceId}`, "_blank");

        frameElement!.addEventListener("afterprint", function (e) {
            frameElement!.location.href = "about:blank";
            frameElement!.close();
        });

        frameElement!.addEventListener("load", function (e) {
            if (frameElement!.document.contentType !== "text/html")
                frameElement!.print();
        });
    }

    return (
        <Space>
            <Button size={"small"} icon={<PrinterOutlined />} type={"link"} title={"打印"} onClick={print} />
        </Space>
    );
}

const TraceIdInfoPage: React.FC<any> = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    const onRefresh = (value) => {
        gridRef.current?.onRefresh();
    }

    const printGroup = (traceType: any, sort: any) => {
        const frameElement = window.open(`${serverUrl()}/devExpressReport/print?reportUrl=TracelIdPrint&traceType=${traceType}&sort=${sort}`, "_blank");

        frameElement!.addEventListener("afterprint", function (e) {
            frameElement!.location.href = "about:blank";
            frameElement!.close();
        });

        frameElement!.addEventListener("load", function (e) {
            if (frameElement!.document.contentType !== "text/html")
                frameElement!.print();
        });
    }


    return <>
        <AgGridPlus
            gridRef={gridRef}
            headerTitle={"栈板LPN管理列表"}
            gridKey="appWMS.baseInfo.traceIdInfo"
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data = await TraceIdGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                return requestData;
            }}
            toolBarRender={(gridApi) => {
                const selectRows = gridApi?.getSelectedRows();
                return [<Access accessible={access[TraceId.Create]}>
                    <TraceIdInfoFormDialog title={"新建栈板LPN"} onAfterSubmit={onRefresh}>{"新建栈板LPN"}</TraceIdInfoFormDialog>
                </Access>,

                selectRows && selectRows.length > 0 ? <Button icon={<PrinterOutlined />} title={"打印栈板码"} onClick={() => {
                    printGroup(selectRows[0].traceType, selectRows[0].sort);
                }} >{"打印"}</Button> : null
                ];
            }}>

            <AgGridColumn field={"traceId"} headerName={"栈板号"} width={150} />

            <AgGridColumn field={"creationTime"} headerName={intl.formatMessage({ id: "WMS:CreationTime" })} width={150} type={"dateTimeColumn"} initialSort={"desc"} />
            <AgGridColumn field={"creator"} headerName={intl.formatMessage({ id: "WMS:Creator" })} width={150} />
            <AgGridColumn field={"lastModificationTime"} headerName={intl.formatMessage({ id: "WMS:LastModificationTime" })} width={150} type={"dateTimeColumn"} />
            <AgGridColumn field={"lastModifier"} headerName={intl.formatMessage({ id: "WMS:LastModifier" })} flex={1} />

            <AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} width={60} pinned={"right"} cellRenderer={Options} filter={false} sortable={false} />
        </AgGridPlus>
    </>
};

export default TraceIdInfoPage;

export const routeProps = {
    name: '栈板管理',
};