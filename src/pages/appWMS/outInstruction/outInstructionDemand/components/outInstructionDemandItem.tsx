import React, { useRef, useState } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl, history } from '@umijs/max';
import { Button, Space, Tag, message } from 'antd';
import { ICellRendererParams } from 'ag-grid-community';
import { AgGridPlus } from '@/components/agGrid';
import { OutInstructionDemandGetAsync, OutInstructionDemandReCallBackItemAsync } from '@/services/wms/OutInstructionDemand';
import { PreRegisteredModel } from '../../_utils/preRegisteredModel';
import { DemandCallBackStatus } from '../../../_utils/orderTypeRender';
import { OutInstructionDemands } from '@/services/wmsPermission';
import DeleteConfirm from '@/components/deleteConfirm';
import { RetweetOutlined } from '@ant-design/icons';

/**
 * 出库需求子表
 * @returns
 */
const OutInstructionDemandItem = (props: any) => {
    const { outInstructionDemandId } = props;
    const intl = useIntl();
    const gridRef = useRef<GridRef>();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    };

    const workStatus = (props: any) => {
        const { value } = props;

        const renderStatus = (status: number) => {
            switch (status) {
                case 0:
                    return <Tag color="red">等待处理</Tag>;
                case 5:
                    return <Tag color="orange">部分下发</Tag>;
                case 10:
                    return <Tag color="blue">指令已下发</Tag>;
                case 11:
                    return <Tag color="purple">部分交付</Tag>;
                case 20:
                    return <Tag color="green">已交付</Tag>;
                default:
                    return <Tag color="gray">未知状态</Tag>;
            }
        };

        return renderStatus(value);
    };

    // 明细项操作按钮组件
    const ItemOptions = (props: ICellRendererParams & { onRefresh }) => {
        const { data, onRefresh } = props;
        const access = useAccess();

        const handleItemCallBack = (id: any, itemId: any) => {
            const hide = message.loading('正在重试回传明细到源系统,请稍后', 0);
            return OutInstructionDemandReCallBackItemAsync({ id: id, itemId: itemId }).then(() => {
                onRefresh()
                message.success('重试回传明细成功');
            }).catch((error) => {
                message.error('重试回传明细失败: ' + (error.message || error));
            }).finally(() => { hide(); });
        }

        return (
            <Space>
                {/* 只有明细回传失败时才显示重试回传按钮 */}
                {data.itemCallBackStatus === 25 && (
                    <Access accessible={!!access[OutInstructionDemands.ReCallBack]}>
                        <DeleteConfirm title='确定重试回传此明细到源系统?' onConfirm={() => handleItemCallBack(data.outInstructionDemandId, data.id)}>
                            <Button size={'small'} icon={<RetweetOutlined />} type={'link'} title={'重试明细回传'} />
                        </DeleteConfirm>
                    </Access>
                )}
            </Space>
        );
    };




    const columnDefs: any = [
        {
            headerName: "来源单号",
            field: "sourceOrderNo",
            width: 130,
        },
        {
            headerName: "物料编码",
            field: "materialCode",
            width: 110,
        },
        {
            headerName: "物料外码",
            field: "materialOutCode",
            width: 110,
        },
        {
            headerName: "处理状态",
            field: "status",
            width: 110,
            cellRenderer: workStatus
        },
        {
            headerName: "明细回传状态",
            field: "itemCallBackStatus",
            width: 110,
            cellRenderer: DemandCallBackStatus
        },
        {
            headerName: "明细回传时间",
            field: "itemCallBackTime",
            width: 140,
            type: 'dateTimeColumn'
        },
        {
            headerName: "明细回传消息",
            field: "itemCallBackMessage",
            width: 200,
        },
        {
            headerName: "物料描述",
            field: "materialDescription",
            width: 180,
        },
        {
            headerName: "物料版本",
            field: "version",
            width: 100,
        },
        {
            headerName: "物权编码",
            field: "realRightCode",
            width: 100,
        },
        {
            headerName: "物料下架预占模式",
            field: "preRegisteredModel",
            width: 140,
            cellRenderer: PreRegisteredModel
        },
        {
            headerName: "AC属性",
            field: "acProperty",
            width: 100,
        },
        {
            headerName: "销售合同号",
            field: "contractNo",
            width: 110,
        },
        {
            headerName: "任务令",
            field: "taskOrder",
            width: 100,
        },
        {
            headerName: "交付数量",
            field: "quantity",
            width: 90,
        },
        {
            headerName: "分配数量",
            field: "sharedQuantity",
            width: 90,
        },
        {
            headerName: "下架数量",
            field: "pickQuantity",
            width: 90,
        },
        {
            headerName: "创建人",
            field: "creator",
            width: 90,
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
            headerName: "操作",
           field: "operation",
            width: 80,
            pinned: "right",
            filter: false,
            cellRenderer: ItemOptions,
            cellRendererParams: { onRefresh }
        }
    ];


    return (
        <>
            <AgGridPlus
                gridRef={gridRef}
                gridKey='WMS.OutInstructionDemand.item'
                search={false}
                toolBarRender={gridApi => { return []; }}
                columnDefs={columnDefs}
                params={{ outInstructionDemandId: outInstructionDemandId }}
                request={async (params: any) => {
                    if (!params?.outInstructionDemandId) {
                        return { success: true, data: [], total: 0, };
                    }
                    let data = await OutInstructionDemandGetAsync({ id: params?.outInstructionDemandId });
                    return { success: true, data: data.items!, total: data.items?.length, };
                }}
            >
            </AgGridPlus>
        </>
    );
};

export default OutInstructionDemandItem;
