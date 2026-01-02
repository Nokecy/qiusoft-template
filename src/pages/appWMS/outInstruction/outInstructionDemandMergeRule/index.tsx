import React, { useRef } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from '@umijs/max';
import { Button, Space, message } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import OutInstructionDemandMergeRuleFormDialog from './components/formDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { OutInstructionDemandMergeRules } from '@/services/wmsPermission';
import { OutInstructionDemandMergeRuleDeleteAsync, OutInstructionDemandMergeRuleGetListAsync } from '@/services/wms/OutInstructionDemandMergeRule';
import { OrderTypeRenderStatus } from '../../_utils/orderTypeRender';
import { isArray } from 'lodash';

/**
 * 出库需求合并策略列表
 * @returns
 */
const OutInstructionDemandMergeRulePage = () => {
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
            return OutInstructionDemandMergeRuleDeleteAsync({ id }).then(() => {
                refresh()
            }).finally(() => { hide(); });
        }

        return (
            <Space>
									<Access accessible={!!access[OutInstructionDemandMergeRules.Update]}>
                    <OutInstructionDemandMergeRuleFormDialog
                        title={'编辑'}
                        entityId={data.id}
                        onAfterSubmit={() => {
                            refresh();
                        }}
                        buttonProps={{ icon: <EditOutlined />, type: 'link', headerName: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
                    />
                </Access>

                <Access accessible={!!access[OutInstructionDemandMergeRules.Delete]}>
                    <DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
                        <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
                    </DeleteConfirm>
                </Access>
            </Space>
        );
    };
    const columnDefs: any = [
        {
            headerName: "订单类型",
            field: "orderType",
            width: 110,
            cellRenderer: OrderTypeRenderStatus
        },
        {
            headerName: "下架任务类型",
            field: "taskType",
            width: 120,
        },
        {
            headerName: "库房名称",
            field: "warehouseName",
            width: 130,
        },
        {
            headerName: "库房编码",
            field: "warehouseCode",
            width: 100,
        },
        {
            headerName: "提供者编码",
            field: "providerName",
            width: 120,
        },
        {
            headerName: "提供者名称",
            field: "providerDisplayName",
            width: 120,
        },
        {
            headerName: "时间间隔(分钟)",
            field: "timePeriodMinute",
            width: 90,
        },
        {
            headerName: "合并条件",
            field: "condition",
            width: 180,
            cellRenderer: (params: any) => {
                switch (params.value) {
                    case 1:
                        return '交付对象';
                    case 2:
                        return '交付对象';
                    case 3:
                        return '交付对象;加工件';
                }
            }
        },
        {
            headerName: "合并模式",
            field: "mergeMode",
            width: 100,
            cellRenderer: (params: any) => {
                switch (params.value) {
                    case 0:
                        return '需求时间';
                    case 1:
                        return '自然时间';
                }
            }
        },
        {
            headerName: "阈值",
            field: "quantityThreshold",
            width: 90,
        },
        {
            headerName: "最大合并数",
            field: "maxMergeCount",
            width: 90,
        },
        {
            headerName: "排除时间",
            field: "exclusionTimePeriods",
            width: 160,
            cellRenderer: (params: any) => {
                if (isArray(params.value)) {
                    return params.value.map((i) => {
                        return `${i.startTime}-${i.endTime}`
                    }).join('；')
                } else {
                    return ''
                }
            }
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
                headerTitle='出库需求合并策略列表'
                gridKey='appWMS.appOutInstruction.outInstructionDemandMergeRule'
                request={async (params: any) => {
                    let data = await OutInstructionDemandMergeRuleGetListAsync({
                        Filter: params?.filter,
                        MaxResultCount: params!.maxResultCount,
                        SkipCount: params!.skipCount,
                        Sorting: params!.sorter!
                    });
                    return { success: true, data: data.items!, total: data.totalCount, };
                }}
                toolBarRender={(gridApi, filter) => {
                    return [
                        <Access accessible={!!access[OutInstructionDemandMergeRules.Create]}>
                            <OutInstructionDemandMergeRuleFormDialog title={'新建出库需求合并策略'} onAfterSubmit={onRefresh}>
                                {'新建'}
                            </OutInstructionDemandMergeRuleFormDialog>
                        </Access>,
                    ];
                }}
                columnDefs={columnDefs}
            >
            </AgGridPlus>
        </>
    );
};

export default OutInstructionDemandMergeRulePage;
export const routeProps = {
    name: '出库需求合并策略',
};
