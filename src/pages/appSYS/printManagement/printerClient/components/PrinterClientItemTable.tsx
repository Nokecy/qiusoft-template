import { AgGridPlus } from '@/components/agGrid';
import { Tag } from 'antd';
import React, { } from 'react';
import { useIntl } from 'umi';

/**
 * 客户端详情
 * @param props 
 * @returns 
 */
const PrinterClientItemTable = (props: any) => {
    const { itemData } = props;
    const intl = useIntl();

    const workStatus = (props: any) => {
        const { value } = props;
    
        const renderStatusTag = (status: number) => {
            switch (status) {
                case 0:
                    return <Tag color={'#87d068'}>空闲</Tag>;
                case 1:
                    return <Tag color={'#108ee9'}>忙碌</Tag>;
                case -1:
                    return <Tag color={'#f50'}>离线</Tag>;
                default:
                    return <Tag color={'#cccccc'}>未知状态</Tag>;
            }
        };
    
        return renderStatusTag(value);
    };
    

    const columnDefs: any = [
        {
            headerName: "名称",
            field: "name",
            width: 140,
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
            headerName: "IP地址",
            field: "ipAddress",
            width: 140,
        },
        {
            headerName: "MAC地址",
            field: "mac",
            width: 140,
        },
        {
            headerName: "状态",
            field: "status",
            width: 140,
            cellRenderer: workStatus,
        },
        {
            headerName: "创建时间",
            field: "creationTime",
            width: 160,
            type: "dateTimeColumn",
        },
        // {
        //     headerName: "操作",
        //     field: "options",
        //     width: 160,
        //     pinned: "right",
        //     filter: false,
        //     cellRenderer: (props: any) => <Options {...props} />,
        //     cellRendererParams: { onRefresh },
        // },
    ];
    

    return (
        <>
            <AgGridPlus
                // params={{ mouldProjectId: mouldProjectId }}
                // rowSelection={'single'}
                gridKey='appSYS.baseInfo.PrinterClient.item'
                dataSource={itemData}
                // hideTool
                search={false}
                toolBarRender={gridApi => { return []; }}
                columnDefs={columnDefs}
            >

            </AgGridPlus>
        </>
    );
};


export default PrinterClientItemTable;
