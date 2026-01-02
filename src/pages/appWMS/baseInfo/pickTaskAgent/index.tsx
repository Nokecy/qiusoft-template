import React, { useRef } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from '@umijs/max';
import { Button, Space, Tag, message } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import PickTaskAgentFormDialog from './components/formDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { PickTaskAgentDeleteAsync, PickTaskAgentGetListAsync } from '@/services/wms/PickTaskAgent';

/**
 * 任务代理人列表
 * @returns
 */
const PickTaskAgentPage = () => {
    const intl = useIntl();
    const gridRef = useRef<GridRef>();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    };

    const workStatus = (props: any) => {
        const { value } = props;
        const renderLineStatus = text => {
            switch (text) {
                case 0:
                    return <Tag color={'#108ee9'}>未审核</Tag>;
                case 5:
                    return <Tag color={'#2db7f5'}>审核中</Tag>;
                case 10:
                    return <Tag color={'#87d068'}>已审核</Tag>;
                case 15:
                    return <Tag color={'#f50'}>已驳回</Tag>;
                default:
                    return;
            }
        };

        return renderLineStatus(value);
    };

    const Options = (props: ICellRendererParams & { onRefresh }) => {
        const { data, api, onRefresh } = props;
        const intl = useIntl();
        const access = useAccess();

        const refresh = () => {
            onRefresh();
        };

        const handleDelete = (id: any) => {
            const hide = message.loading('正在操作,请稍后', 0);
            return PickTaskAgentDeleteAsync({ id }).then(() => {
                refresh()
            }).finally(() => { hide(); });
        }

        return (
            <Space>
                <Access accessible={true}>
                    <PickTaskAgentFormDialog
                        title={'编辑'}
                        entityId={data.id}
                        onAfterSubmit={() => {
                            refresh();
                        }}
                        buttonProps={{ icon: <EditOutlined />, type: 'link', headerName: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
                    />
                </Access>

                <Access accessible={true}>
                    <DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
                        <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
                    </DeleteConfirm>
                </Access>
            </Space>
        );
    };

    const columnDefs: any = [
        // { field: 'principalId', headerName: '委托人Id', width: 150 },
        { field: 'principalName', headerName: '委托人名称', width: 180 },
        // { field: 'agentId', headerName: '代理人Id', width: 150 },
        { field: 'agentName', headerName: '代理人名称', width: 180 },
        { field: 'startTime', headerName: '开始时间', width: 180, type: 'dateTimeColumn' },
        { field: 'endTime', headerName: '结束时间', width: 180, type: 'dateTimeColumn' },
        { field: 'creationTime', headerName: '创建时间', width: 180, type: 'dateTimeColumn' },
        { field: 'lastModificationTime', headerName: '修改时间', width: 180, type: 'dateTimeColumn' },
        {
            headerName: "操作",
           field: "operation",
            width: 160,
            pinned: "right",
            filter: false,
            cellRenderer: Options,
            cellRendererParams: { onRefresh }
        }
    ];


    return (
        <>
            <AgGridPlus
                gridRef={gridRef}
                headerTitle='任务代理人列表'
                gridKey='appWMS.baseInfo.pickTaskAgent'
                rowSelection={'single'}
                request={async (params: any) => {
                    let data = await PickTaskAgentGetListAsync({
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
                    return [
                        <Access accessible={true}>
                            <PickTaskAgentFormDialog title={'新建任务代理人'} onAfterSubmit={onRefresh}>
                                {'新建'}
                            </PickTaskAgentFormDialog>
                        </Access>,
                    ];
                }}
                columnDefs={columnDefs}
            >
            </AgGridPlus>
        </>
    );
};

export default PickTaskAgentPage;
export const routeProps = {
    name: '任务代理人信息',
};
