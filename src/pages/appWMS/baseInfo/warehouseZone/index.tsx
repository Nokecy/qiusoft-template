import {AgGridPlus} from '@/components/agGrid';
import {WarehouseZoneDeleteAsync, WarehouseZoneGetListAsync} from '@/services/wms/WarehouseZone';
import {WarehouseZone} from '@/services/wmsPermission';
import {DeleteOutlined, EditOutlined, PrinterOutlined} from '@ant-design/icons';
import {GridRef} from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import {ICellRendererParams} from 'ag-grid-community';
import {Button, message, Space} from 'antd';
import React, {useRef} from 'react';
import {Access, serverUrl, useAccess, useIntl} from 'umi';
import {warehouseZoneTypeEnum} from '@/pages/appWMS/_utils';
import WareHouseZoneFormDialog from './components/wareHouseZoneFormDialog';
import DeleteConfirm from "@/components/deleteConfirm";
import ImportUpload from './components/uploadDialog';
import {DownOutlined} from '@ant-design/icons';
import {downloadBlob} from '@/_utils';
import {LocationTypeEnum} from "@/pages/appWMS/baseInfo/_utils";

const Options = (props: ICellRendererParams & { onRefresh }) => {
    const {data, api, onRefresh} = props;
    const intl = useIntl();
    const access = useAccess();

    const refresh = () => {
        onRefresh();
    };

    const handleDelete = (id: any) => {
        const hide = message.loading('正在操作,请稍后', 0);
        return WarehouseZoneDeleteAsync({id})
            .then(() => {
                refresh();
            })
            .finally(() => {
                hide();
            });
    };

    const print = () => {
        const frameElement = window.open(`${serverUrl()}/devExpressReport/print?reportUrl=ZonePrint&code=${data.code}&name=${data.wareHouseName}&type=${data.type}`, '_blank');

        frameElement!.addEventListener('afterprint', function (e) {
            frameElement!.location.href = 'about:blank';
            frameElement!.close();
        });

        frameElement!.addEventListener('load', function (e) {
            if (frameElement!.document.contentType !== 'text/html') frameElement!.print();
        });
    };

    return (
        <Space>
            <Access accessible={access[WarehouseZone.Update]}>
                <WareHouseZoneFormDialog
                    title={'编辑库区'}
                    entityId={data.id}
                    onAfterSubmit={() => {
                        refresh();
                    }}
                    buttonProps={{
                        icon: <EditOutlined/>,
                        type: 'link',
                        title: intl.formatMessage({id: 'AbpUi:Edit'}),
                        disabled: data.type === 6 // 虚拟区禁用编辑按钮
                    }}
                />
            </Access>

            <Button size={'small'} icon={<PrinterOutlined/>} type={'link'} title={'打印区域码'} onClick={print}/>

            <Access accessible={access[WarehouseZone.Delete]}>
                <DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
                    <Button size={'small'} icon={<DeleteOutlined/>} type={'link'}
                            title={intl.formatMessage({id: 'AbpUi:Delete'})}
                            disabled={data.type == LocationTypeEnum.VirtualArea}/>
                </DeleteConfirm>
            </Access>
        </Space>
    );
};

const WareHouseZonePage: React.FC<any> = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    };

    const printLocation = (code: string) => {
        const frameElement = window.open(`${serverUrl()}/devExpressReport/print?reportUrl=LocationPrint&code=${code}`, '_blank');

        frameElement!.addEventListener('afterprint', function (e) {
            frameElement!.location.href = 'about:blank';
            frameElement!.close();
        });

        frameElement!.addEventListener('load', function (e) {
            if (frameElement!.document.contentType !== 'text/html') frameElement!.print();
        });
    };

    return (
        <>
                <AgGridPlus
                gridRef={gridRef}
                headerTitle={'库区列表'}
                gridKey="appWMS.baseInfo.warehouseZone"
                request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
                    let data = await WarehouseZoneGetListAsync({
                        Filter: params?.filter,
                        Sorting: params!.sorter,
                        SkipCount: params!.skipCount,
                        MaxResultCount: params!.maxResultCount
                    });
                    let requestData: any = {success: true, data: data.items!, total: data.totalCount};
                    return requestData;
                }}
                rowSelection={'single'}
                toolBarRender={(girdApi, filter) => {
                    const selectRows = girdApi?.getSelectedRows();
                    return [

                        <Access accessible={access[WarehouseZone.Create]}>
                            <WareHouseZoneFormDialog title={'新建'} customerCode={true} buttonProps={{type: 'primary'}}
                                                     onAfterSubmit={onRefresh}>
                                {'新建'}
                            </WareHouseZoneFormDialog>
                        </Access>,

                        selectRows && selectRows.length > 0 ? (
                            <Access accessible={access[WarehouseZone.Create]}>
                                <Button
                                    icon={<PrinterOutlined/>}
                                    type={'default'}
                                    title={'打印库位码'}
                                    onClick={() => {
                                        const selectRows = girdApi?.getSelectedRows();
                                        if (selectRows && selectRows?.length > 0) {
                                            printLocation(selectRows![0].code);
                                        }
                                    }}
                                >
                                    打印库位码
                                </Button>
                            </Access>
                        ) : null,
                        <Access accessible={access[WarehouseZone.Import]}>
                            <ImportUpload onAfterSubmit={onRefresh}/>
                        </Access>,
                        <Access accessible={access[WarehouseZone.Export]}>
                            <Button
                                icon={<DownOutlined/>}
                                onClick={() => {
                                    downloadBlob(`/api/wms/warehouse-zone/export?filter=${filter}`, '库区信息.xlsx');
                                }}
                            >
                                导出
                            </Button>
                        </Access>,
                    ];
                }}
                columnDefs={[
                    {
                        field: 'wareHouseName',
                        colId: 'Warehouse.Name',
                        headerName: intl.formatMessage({id: 'WMS:WareHouseName'}),
                        width: 180
                    },
                    {
                        field: 'code',
                        headerName: intl.formatMessage({id: 'WMS:Code'}),
                        width: 100
                    },
                    {
                        field: 'factoryZoneName',
                        colId: 'FactoryZone.Name',
                        headerName: '区域',
                        width: 100
                    },
                    {
                        field: 'type',
                        headerName: intl.formatMessage({id: 'WMS:Type'}),
                        width: 100,
                        valueEnum: warehouseZoneTypeEnum
                    },
                    {
                        field: 'isRoHS',
                        headerName: intl.formatMessage({id: 'WMS:IsRoHS'}),
                        width: 80,
                        type: 'bool'
                    },
                    {
                        field: 'warehouseTeamName',
                        colId: 'WarehouseTeam.Name',
                        headerName: intl.formatMessage({id: 'WMS:WareHouseTeamName'}),
                        width: 150
                    },
                    {
                        field: 'remark',
                        headerName: intl.formatMessage({id: 'WMS:Remark'}),
                        width: 150
                    },
                    {
                        field: 'acProperty',
                        headerName: intl.formatMessage({id: 'WMS:AcProperty'}),
                        width: 100
                    },
                    {
                        field: 'creationTime',
                        headerName: intl.formatMessage({id: 'WMS:CreationTime'}),
                        width: 180,
                        type: 'dateTimeColumn',
                        initialSort: 'desc'
                    },
                    {
                        field: 'creator',
                        headerName: intl.formatMessage({id: 'WMS:Creator'}),
                        width: 120
                    },
                    {
                        field: 'lastModificationTime',
                        headerName: intl.formatMessage({id: 'WMS:LastModificationTime'}),
                        width: 180,
                        type: 'dateTimeColumn'
                    },
                    {
                        field: 'lastModifier',
                        headerName: intl.formatMessage({id: 'WMS:LastModifier'}),
                        width: 120
                    },
                    {
                        field: 'action',
                        headerName: intl.formatMessage({id: 'AbpUi:Actions'}),
                        width: 120,
                        pinned: 'right',
                        filter: false,
                        cellRenderer: Options,
                        cellRendererParams: {onRefresh}
                    }
                ]}
            >
            </AgGridPlus>
        </>
    );
};

export default WareHouseZonePage;

export const routeProps = {
    name: '库区管理',
};