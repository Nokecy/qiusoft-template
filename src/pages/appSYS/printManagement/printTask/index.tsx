import React, { useRef } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from '@umijs/max';
import { Button, Space, Tag, message, Modal } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import { PrinterOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { PrintTaskGetListAsync, PrintTaskReprintAsync } from '@/services/openApi/PrintTask';

/**
 * 打印任务列表
 * @returns
 */
const PrintTaskPage = () => {
    const intl = useIntl();
    const gridRef = useRef<GridRef>();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    };

    const workStatus = (props: any) => {
        const { value } = props;

        const renderStatusTag = (status: string) => {
            switch (status) {
                case "waiting":
                    return <Tag color={'#108ee9'}>等待中</Tag>;
                case "printing":
                    return <Tag color={'#2db7f5'}>打印中</Tag>;
                case "completed":
                    return <Tag color={'#87d068'}>已完成</Tag>;
                case "failed":
                    return <Tag color={'#f50'}>失败</Tag>;
                case "canceled":
                    return <Tag color={'#d9d9d9'}>已取消</Tag>;
                default:
                    return <Tag color={'#cccccc'}>未知状态</Tag>;
            }
        };

        return renderStatusTag(value);
    };

    const Options = (props: ICellRendererParams & { onRefresh }) => {
        const { data, api, onRefresh } = props;
        const intl = useIntl();
        const access = useAccess();

        const refresh = () => {
            onRefresh();
        };

        const printAgain = (data) => {
            Modal.confirm({
                title: '确认重新打印',
                icon: <ExclamationCircleOutlined />,
                content: `确定要重新打印此任务吗？打印机: ${data.printerName || '未知'}`,
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    const hide = message.loading('正在重新打印,请稍后', 0);
                    return PrintTaskReprintAsync(
                        { id: data.id },
                        { printerId: data.printerId }
                    ).then(() => {
                        message.success('重新打印成功');
                        refresh();
                    }).catch((error) => {
                        message.error('重新打印失败: ' + (error.message || '未知错误'));
                    }).finally(() => {
                        hide();
                    });
                }
            });
        }

        return (
            <Space>
                <Access accessible={true}>
                    <Button
                        type="link"
                        icon={<PrinterOutlined />}
                        onClick={() => printAgain(data)}
                    >
                        重新打印
                    </Button>
                </Access>
            </Space>
        );
    };
    const columnDefs: any = [
        {
            headerName: "打印客户端显示名",
            field: "printerClientDisplayName",
            width: 160,
        },
        {
            headerName: "打印机名称",
            field: "printerName",
            width: 160,
        },
        {
            headerName: "测试任务",
            field: "pageTest",
            width: 160,
        },
        {
            headerName: "状态",
            field: "status",
            width: 160,
            cellRenderer: workStatus,
        },
        {
            headerName: "标签模板编码",
            field: "labelTemplateCode",
            width: 160,
        },
        {
            headerName: "标识符",
            field: "identifier",
            width: 160,
        },
        {
            headerName: "是否测试",
            field: "isTest",
            width: 120,
            type: "bool",
        },
        {
            headerName: "URL",
            field: "url",
            width: 120,
        },
        {
            headerName: "宽度",
            field: "width",
            width: 120,
        },
        {
            headerName: "高度",
            field: "height",
            width: 120,
        },
        {
            headerName: "打印数量",
            field: "printQuantity",
            width: 120,
        },
        { headerName: "创建人", field: "creator", width: 90, },
        { headerName: "创建时间", field: "creationTime", width: 160, type: "dateTimeColumn", },
        { headerName: "最后修改人", field: "lastModifier", width: 90, },
        { headerName: "最后修改时间", field: "lastModificationTime", width: 160, type: "dateTimeColumn", },
        {
            headerName: "操作",
            field: "options",
            width: 110,
            pinned: "right",
            filter: false,
            cellRenderer: (props: any) => <Options {...props} />,
            cellRendererParams: { onRefresh },
        },
    ];

    return (
        <>
            <AgGridPlus
                gridRef={gridRef}
                headerTitle='打印任务'
                gridKey='appSYS.baseInfo.PrintTask'
                request={async (params: any) => {
                    let data = await PrintTaskGetListAsync({
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
            >
            </AgGridPlus>
        </>
    );
};

export default PrintTaskPage;
export const routeProps = {
    name: '打印任务',
};
