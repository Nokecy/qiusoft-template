import React, { useRef } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { useIntl } from '@umijs/max';
import { Tag } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import { PrinterClientGetPrintersAsync } from '@/services/openApi/PrinterClient';
import TestPrintDialog from './components/testPrintDialog';

/**
 * 打印机列表
 * @returns
 */
const PrinterClientPage = () => {
    const intl = useIntl();
    const gridRef = useRef<GridRef>();

    const workStatus = (props: any) => {
        const { value } = props;
        const renderStatusTag = (status: string) => {
            switch (status) {
                case 'idle':
                    return <Tag color={'#87d068'}>空闲</Tag>;
                case 'busy':
                    return <Tag color={'#108ee9'}>忙碌</Tag>;
                case 'offline':
                    return <Tag color={'#f50'}>离线</Tag>;
                default:
                    return <Tag color={'#cccccc'}>未知状态</Tag>;
            }
        };

        return renderStatusTag(value);
    };

    const Options = (props: ICellRendererParams) => {
        const { data } = props;

        return (
            <TestPrintDialog
                printerId={data.id}
                printerName={data.displayName || data.name}
                status={data.status}
                isOnline={data.client?.isOnline}
            />
        );
    };

    const columnDefs: any = [
        {
            headerName: "名称",
            field: "name",
            flex: 1
        },
        {
            headerName: "显示名称",
            field: "displayName",
            width: 140,
        },
        {
            headerName: "型号",
            field: "model",
            width: 140,
        },
        {
            headerName: "状态",
            field: "status",
            width: 100,
            cellRenderer: workStatus,
        },
        {
            headerName: "客户端显示名称",
            field: "client.displayName",
            width: 160,
        },
        {
            headerName: "是否在线",
            field: "client.isOnline",
            width: 120,
            type: "bool",
        },
        {
            headerName: "客户端IP地址",
            field: "client.clientIpAddress",
            width: 160,
        },
        {
            headerName: "创建时间",
            field: "creationTime",
            width: 160,
            type: "dateTimeColumn",
        },
        {
            headerName: "操作",
            field: "options",
            width: 120,
            pinned: "right",
            filter: false,
            cellRenderer: (props: any) => <Options {...props} />,
        },
    ];

    return (
        <AgGridPlus
            gridRef={gridRef}
            headerTitle='打印机列表'
            gridKey='appSYS.baseInfo.PrinterClient'
            request={async (params: any) => {
                let data = await PrinterClientGetPrintersAsync({
                    PageSize: params!.maxResultCount,
                    Filter: params?.filter,
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
        />
    );
};

export default PrinterClientPage;
export const routeProps = {
    name: '打印机列表',
};
