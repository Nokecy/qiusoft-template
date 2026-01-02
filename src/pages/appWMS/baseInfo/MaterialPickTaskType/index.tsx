import React, { useRef } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from '@umijs/max';
import { Button, Space, message } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import MaterialPickTaskTypeFormDialog from './components/formDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { MaterialPickTaskTypes } from '@/services/wmsPermission';
import { MaterialPickTaskTypeGetAsync, MaterialPickTaskTypeGetListAsync } from '@/services/wms/MaterialPickTaskType';

/**
 * 下架任务类型列表
 * @returns
 */
const MaterialPickTaskTypePage = () => {
    const intl = useIntl();
    const gridRef = useRef<GridRef>();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
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
            return MaterialPickTaskTypeGetAsync({ id }).then(() => {
                refresh()
            }).finally(() => { hide(); });
        }

        return (
            <Space>
                <Access accessible={access[MaterialPickTaskTypes.Update]}>
                    <MaterialPickTaskTypeFormDialog
                        title={'编辑'}
                        entityId={data.id}
                        onAfterSubmit={() => {
                            refresh();
                        }}
                        buttonProps={{ icon: <EditOutlined />, type: 'link', headerName: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
                    />
                </Access>

                <Access accessible={access[MaterialPickTaskTypes.Delete]}>
                    <DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
                        <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
                    </DeleteConfirm>
                </Access>
            </Space>
        );
    };
    const columnDefs: any = [
        {
            headerName: "类型",
            field: "type",
            width: 120,
        },
        {
            headerName: "名称",
            field: "name",
            width: 150,
        },
        {
            headerName: "备注",
            field: "remark",
            width: 200,
        },
        {
            headerName: "是否启用",
            field: "isEnabled",
            width: 90,
            type: 'bool'
        },
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
                headerTitle='下架任务类型列表'
                gridKey='appWMS.baseInfo.MaterialPickTaskType'
                request={async (params: any) => {
                    let data = await MaterialPickTaskTypeGetListAsync({
                        Filter: params?.filter,
                        MaxResultCount: params!.maxResultCount,
                        SkipCount: params!.skipCount,
                        Sorting: params!.sorter!
                    });
                    return { success: true, data: data.items!, total: data.totalCount, };
                }}
                toolBarRender={(gridApi, filter) => {
                    return [
                        <Access accessible={access[MaterialPickTaskTypes.Create]}>
                            <MaterialPickTaskTypeFormDialog title={'新建下架任务类型'} onAfterSubmit={onRefresh}>
                                {'新建'}
                            </MaterialPickTaskTypeFormDialog>
                        </Access>,
                    ];
                }}
                columnDefs={columnDefs}
            >
            </AgGridPlus>
        </>
    );
};

export default MaterialPickTaskTypePage;
export const routeProps = {
    name: '下架任务类型',
};
