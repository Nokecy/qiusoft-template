import React, { useRef, useState } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl, history } from '@umijs/max';
import { Button, Space, Tabs, Tag, message } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import DeleteConfirm from '@/components/deleteConfirm';
import { DeleteOutlined, RetweetOutlined } from '@ant-design/icons';
import { OutInstructionDemands } from '@/services/wmsPermission';
import { OutInstructionDemandDeleteAsync, OutInstructionDemandGetListAsync, OutInstructionDemandMergeAsync, OutInstructionDemandReCallBackAsync } from '@/services/wms/OutInstructionDemand';
import { DemandCallBackStatus, DemandStatus, OrderTypeRenderStatus } from '../../_utils/orderTypeRender';
import confirmationButton from '@/pages/_utils/confirmationButton';
import { Allotment } from 'allotment';
import OutInstructionDemandItem from './components/outInstructionDemandItem';
import GeneralSelectQuery from '@/components/generalSelectQuery';

/**
 * 出库需求列表
 * @returns
 */
const OutInstructionDemandPage = () => {
    const intl = useIntl();
    const gridRef = useRef<GridRef>();
    const access = useAccess();
    const [selectedRow, setSelectedRow] = useState<any>([]);

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    };


    const handleMerge = (id: any) => {
        const hide = message.loading('正在操作,请稍后', 0);
        return OutInstructionDemandMergeAsync({ ids: selectedRow.map((i) => { return i.id }) }).then(() => {
            onRefresh()
            message.success('操作成功');
        }).finally(() => { hide(); });
    }


    const Options = (props: ICellRendererParams & { onRefresh }) => {
        const { data, api, onRefresh } = props;
        const intl = useIntl();
        const access = useAccess();

        const refresh = () => {
            onRefresh();
        };

        const handleCallBack = (id: any) => {
            const hide = message.loading('正在重试回传需求到源系统,请稍后', 0);
            return OutInstructionDemandReCallBackAsync({ id }).then(() => {
                refresh()
                message.success('重试回传需求成功');
            }).catch((error) => {
                message.error('重试回传需求失败: ' + (error.message || error));
            }).finally(() => { hide(); });
        }

        const handleDelete = (id: any) => {
            const hide = message.loading('正在操作,请稍后', 0);
            return OutInstructionDemandDeleteAsync({ id }).then(() => {
                refresh()
            }).finally(() => { hide(); });
        }


        return (
            <Space>
                {/* 只有回传失败时才显示重试回传按钮 */}
                {data.callBackStatus === 25 && (
                    <Access accessible={!!access[OutInstructionDemands.ReCallBack]}>
                        <DeleteConfirm title='确定重试回传此需求到源系统?' onConfirm={() => handleCallBack(data.id)}>
                            <Button size={'small'} icon={<RetweetOutlined />} type={'link'} title={'重试回传'} />
                        </DeleteConfirm>
                    </Access>
                )}

                <Access accessible={!!access[OutInstructionDemands.Delete]}>
                    <DeleteConfirm title='确定删除此需求?' onConfirm={() => handleDelete(data.id)}>
                        <Button size={'small'} icon={<DeleteOutlined />} type={'link'} danger title={'删除'} />
                    </DeleteConfirm>
                </Access>
            </Space>
        );
    };

    const columnDefs: any = [
        {
            headerName: "集合单号",
            field: "outInstructionOrderNumber",
            width: 130,
            checkboxSelection: true
        },
        {
            headerName: "来源单据号",
            field: "sourceOrderNo",
            width: 120,
        },
        {
            headerName: "销售合同",
            field: "contractNo",
            width: 110,
            // hideInSearch: true,
        },
        {
            headerName: "任务令",
            field: "taskOrder",
            width: 110,
        },

        {
            headerName: "单据状态",
            field: "status",
            width: 110,
            cellRenderer: DemandStatus,
            searchComponent: GeneralSelectQuery,
            searchComponentProps: {
                gradeMap: [
                    { label: "待排产", value: -999 },
                    { label: "等待处理", value: 0 },
                    { label: "处理中", value: 5 },
                    { label: "欠料交付", value: 10 },
                    { label: "已交付", value: 15 },
                ]
            }
        },

        {
            headerName: "编码",
            field: "code",
            width: 140,
        },

        {
            headerName: "产品编码(生产件编码)",
            field: "productCode",
            width: 110,
        },
        {
            headerName: "产品描述",
            field: "productName",
            width: 140,
            hideInSearch: true,
        },



        {
            headerName: "订单类型",
            field: "orderType",
            width: 110,
            cellRenderer: OrderTypeRenderStatus,
            searchComponent: GeneralSelectQuery,
            searchComponentProps: {
                gradeMap: [
                    { label: "销售出库", value: 5 },
                    { label: "车间维修", value: 6 },
                    { label: "生产领料", value: 10 },
                    { label: "杂出", value: 11 },
                    { label: "采购退货", value: 15 },
                    { label: "客供退货", value: 16 },
                    { label: "转库出库", value: 20 }
                ]

            }
        },


        {
            headerName: "处理时间",
            field: "processingTime",
            width: 140,
            type: 'dateTimeColumn',
            hideInSearch: true,
        },
        {
            headerName: "预计合并时间",
            field: "expectedMergeTime",
            width: 140,
            type: 'dateTimeColumn',
            hideInSearch: true,
        },
        {
            headerName: "需求开始时间",
            field: "requiredStartTime",
            width: 140,
            type: 'dateTimeColumn',
            hideInSearch: true,
        },
        {
            headerName: "要求完成时间",
            field: "requiredCompletedTime",
            width: 140,
            type: 'dateTimeColumn',
            hideInSearch: true,
        },

        {
            headerName: "出库指令来源系统",
            field: "sourceOrderProvider",
            width: 120,
            hideInSearch: true,
        },


        {
            headerName: "发货库房编码",
            field: "warehouseCode",
            width: 110,
            hideInSearch: true,
        },
        {
            headerName: "发货库房名称",
            field: "warehouseName",
            width: 110,
        },
        {
            headerName: "收货人",
            field: "consignee.name",
            width: 110,
        },
        {
            headerName: "收货人电话",
            field: "consignee.tel",
            width: 110,
            hideInSearch: true,
        },


        {
            headerName: "数据来源",
            field: "sourceProvider",
            width: 110,
            hideInSearch: true,
        },
        {
            headerName: "是否复核",
            field: "isReCheck",
            width: 90,
            type: 'bool',
            hideInSearch: true,
        },
        {
            headerName: "下架任务类型",
            field: "taskType",
            width: 110,
        },
        {
            headerName: "是否已处理",
            field: "processed",
            width: 90,
            type: 'bool'
        },
        {
            headerName: "回传状态",
            field: "callBackStatus",
            width: 110,
            cellRenderer: DemandCallBackStatus,
            searchComponent: GeneralSelectQuery,
            searchComponentProps: {
                gradeMap: [
                    { label: "不回传", value: 5 },
                    { label: "等待回传", value: 10 },
                    { label: "回传中", value: 15 },
                    { label: "回传完成", value: 20 },
                    { label: "回传失败", value: 25 },
                ]
            }
        },
        {
            headerName: "开始回传时间",
            field: "startCallBackTime",
            width: 140,
            type: 'dateTimeColumn'
        },
        {
            headerName: "完成回传时间",
            field: "completedCallBackTime",
            width: 140,
            type: 'dateTimeColumn'
        },
        {
            headerName: "回传错误信息时间",
            field: "callBackErrorTime",
            width: 240,
            type: 'dateTimeColumn',
        },
        {
            headerName: "回传错误信息",
            field: "callBackError",
            width: 160,
            hideInSearch: true,
        },
        {
            headerName: "创建人",
            field: "creator",
            width: 90,
            hideInSearch: true,
        },
        {
            headerName: "创建时间",
            field: "creationTime",
            width: 140,
            type: 'dateTimeColumn'
        },
        {
            headerName: "最后修改人",
            field: "lastModifier",
            width: 90,
        },
        {
            headerName: "最后修改时间",
            field: "lastModificationTime",
            width: 140,
            type: 'dateTimeColumn'
        },
        {
            headerName: "备注",
            field: "remark",
            width: 160,
            hideInSearch: true,
        },
        {
            headerName: "操作",
            field: "operation",
            width: 110,
            pinned: "right",
            filter: false,
            cellRenderer: Options,
            cellRendererParams: { onRefresh }
        }
    ];



    return (
        <>
            <Allotment vertical={true}>
                <Allotment.Pane>
                    <AgGridPlus
                        gridRef={gridRef}
                        headerTitle='出库需求列表'
                        gridKey='appWMS.appOutInstruction.outInstructionDemand'
                        request={async (params: any) => {
                            setSelectedRow([])
                            let data = await OutInstructionDemandGetListAsync({
                                Filter: params?.filter,
                                MaxResultCount: params!.maxResultCount,
                                SkipCount: params!.skipCount,
                                Sorting: params!.sorter!
                            });
                            return { success: true, data: data.items!, total: data.totalCount, };
                        }}
                        rowSelection={'multiple'}
                        onRowSelected={(event) => {
                            let selectedRows = event.api.getSelectedRows();
                            setSelectedRow(selectedRows);
                        }}
                        toolBarRender={(gridApi, filter) => {
                            return [
                                <Access accessible={!!access[OutInstructionDemands.Merge] && selectedRow.length > 0}>
                                    <Button type='primary' onClick={() => {
                                        confirmationButton(handleMerge)
                                    }} > 合并</Button>
                                </Access>,
                            ];
                        }}
                        columnDefs={columnDefs}
                    >
                    </AgGridPlus>
                </Allotment.Pane>

                <Allotment.Pane snap>
                    <Tabs style={{ height: '100%', background: '#fff', paddingLeft: 10 }}>
                        <Tabs.TabPane tab='出库需求明细' key='0' style={{ height: '100%' }}>
                            <OutInstructionDemandItem outInstructionDemandId={selectedRow[selectedRow.length - 1]?.id} />
                        </Tabs.TabPane>
                    </Tabs>
                </Allotment.Pane>
            </Allotment>
        </>
    );
};

export default OutInstructionDemandPage;
export const routeProps = {
    name: '出库需求',
};
