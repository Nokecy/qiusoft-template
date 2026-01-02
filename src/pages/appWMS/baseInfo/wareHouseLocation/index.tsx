import {AgGridPlus} from '@/components/agGrid';
import {WareHouseLocationDeleteAsync, WareHouseLocationGetListAsync} from '@/services/wms/WareHouseLocation';
import {WareHouseLocations} from '@/services/wmsPermission';
import {CloudUploadOutlined, DeleteOutlined, EditOutlined, PrinterOutlined} from '@ant-design/icons';
import {ICellRendererParams} from 'ag-grid-community';
import {Button, message, Space} from 'antd';
import React, {useRef} from 'react';
import {Access, serverUrl, useAccess, useIntl} from 'umi';
import {locationTypeEnum, usePriorityEnum, LocationTypeSelect, UsePrioritySelect, LocationTypeEnum} from '../_utils';
import WareHouseLocationFormDialog from './components/wareHouseLocationFormDialog';
import WareHouseLocationBatchCreateDialog from './components/wareHouseLocationBatchCreateDialog';
import {GridRef} from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import DeleteConfirm from "@/components/deleteConfirm";
import {DownOutlined} from '@ant-design/icons';
import {downloadBlob} from '@/_utils';
import ImportPublic from '@/components/importPublic';

const Options = (props: ICellRendererParams & { onRefresh }) => {
    const {data, api, onRefresh} = props;
    const intl = useIntl();
    const access = useAccess();

    const refresh = () => {
        onRefresh();
    };

    const handleDelete = (id: any) => {
        const hide = message.loading('正在操作,请稍后', 0);
        return WareHouseLocationDeleteAsync({id})
            .then(() => {
                refresh();
            })
            .finally(() => {
                hide();
            });
    };

    const print = () => {
        const frameElement = window.open(`${serverUrl()}/devExpressReport/print?reportUrl=SingleLocationPrint&code=${data.code}`, '_blank');

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
            <Access accessible={access[WareHouseLocations.Update]}>
                <WareHouseLocationFormDialog
                    title={'编辑库位'}
                    entityId={data.id}
                    onAfterSubmit={() => {
                        refresh();
                    }}
                    buttonProps={{
                        icon: <EditOutlined/>,
                        type: 'link',
                        title: intl.formatMessage({id: 'AbpUi:Edit'}),
                        disabled: data.type == LocationTypeEnum.VirtualArea
                    }}
                />
            </Access>

            <Button size={'small'} icon={<PrinterOutlined/>} type={'link'} title={'打印库位码'} onClick={print}/>

            <Access accessible={access[WareHouseLocations.Delete]}>
                <DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
                    <Button size={'small'} icon={<DeleteOutlined/>} type={'link'}
                            title={intl.formatMessage({id: 'AbpUi:Delete'})}
                            disabled={data.type == LocationTypeEnum.VirtualArea}/>
                </DeleteConfirm>
            </Access>
        </Space>
    );
};

const WarehouseLocationPage: React.FC<any> = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    };

    return (
        <>
            <AgGridPlus
                gridRef={gridRef}
                headerTitle={'库房库位列表'}
                gridKey='appWMS.baseInfo.wareHouseLocation'
                request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
                    let data = await WareHouseLocationGetListAsync({
                        Filter: params?.filter,
                        Sorting: params!.sorter,
                        SkipCount: params!.skipCount,
                        MaxResultCount: params!.maxResultCount
                    });
                    let requestData: any = {success: true, data: data.items!, total: data.totalCount};
                    return requestData;
                }}
                toolBarRender={(gridApi, filter) => {
                    return [
                        <Access accessible={access[WareHouseLocations.Create]}>
                            <WareHouseLocationFormDialog title={'新建库位'} onAfterSubmit={onRefresh}>
                                {'新建'}
                            </WareHouseLocationFormDialog>
                        </Access>,

                        <Access accessible={access[WareHouseLocations.Import]}>
                            <ImportPublic onAfterSubmit={onRefresh} icon={<CloudUploadOutlined/>} title='库位'
                                          downUrl='/api/wms/warehouselocation/import-template'
                                          uploadUrl='/api/wms/warehouselocation/import'>
                                批量上传
                            </ImportPublic>
                        </Access>,

                        <Access accessible={access[WareHouseLocations.Create]}>
                            <WareHouseLocationBatchCreateDialog title={'批量新建'} buttonProps={{type: 'default'}}
                                                                onAfterSubmit={onRefresh}>
                                {'批量新建'}
                            </WareHouseLocationBatchCreateDialog>
                        </Access>,
                        <Access accessible={access[WareHouseLocations.Export]}>
                            <Button
                                icon={<DownOutlined/>}
                                onClick={() => {
                                    downloadBlob(`/api/wms/warehouselocation/export?filter=${filter}`, '库位信息.xlsx');
                                }}
                            >
                                导出
                            </Button>
                        </Access>,
                    ];
                }}
                columnDefs={[
                    {
                        field: 'wareHouse.code',
                        headerName: intl.formatMessage({id: 'WMS:WareHouseCode'}),
                        width: 120,
                        hide: true
                    },
                    {
                        field: 'warehouse.name',
                        headerName: intl.formatMessage({id: 'WMS:WareHouseName'}),
                        width: 120
                    },
                    {
                        field: 'code',
                        headerName: intl.formatMessage({id: 'WMS:Code'}),
                        width: 180
                    },
                    {
                        field: 'wareHouseZone.code',
                        headerName: intl.formatMessage({id: 'WMS:WareHouseZoneCode'}),
                        width: 150
                    },
                    {
                        field: 'type',
                        headerName: intl.formatMessage({id: 'WMS:Type'}),
                        width: 100,
                        valueEnum: locationTypeEnum,
                        searchComponent: LocationTypeSelect
                    },
                    {
                        field: 'usePriority',
                        headerName: '优先级',
                        width: 100,
                        valueEnum: usePriorityEnum,
                        searchComponent: UsePrioritySelect
                    },
                    {
                        field: 'weight',
                        headerName: intl.formatMessage({id: 'WMS:Weight'}),
                        width: 120,
                        hideInSearch: true
                    },
                    {
                        field: 'lenght',
                        headerName: intl.formatMessage({id: 'WMS:Lenght'}),
                        width: 120,
                        hideInSearch: true
                    },
                    {
                        field: 'width',
                        headerName: intl.formatMessage({id: 'WMS:Width'}),
                        width: 120,
                        hideInSearch: true
                    },
                    {
                        field: 'height',
                        headerName: intl.formatMessage({id: 'WMS:Height'}),
                        width: 120,
                        hideInSearch: true
                    },
                    {
                        field: 'isRoHs',
                        headerName: intl.formatMessage({id: 'WMS:IsRoHS'}),
                        width: 150,
                        type: 'bool'
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
            />
        </>
    );
};

export default WarehouseLocationPage;

export const routeProps = {
    name: '库位管理',
};