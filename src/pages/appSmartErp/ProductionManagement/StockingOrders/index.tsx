import { AgGridPlus } from '@/components/agGrid';
import { StockingOrderDeleteAsync, StockingOrderCopyAsync, StockingOrderGetListAsync, StockingOrderApproveAsync, StockingOrderUnapproveAsync, StockingOrderSubmitAsync } from '@/services/smarterp/StockingOrder';
import { DeleteOutlined, CopyOutlined, FormOutlined, PlusOutlined, CheckOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag, Modal, Input } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, history, useIntl } from 'umi';
import DeleteConfirm from '@/components/deleteConfirm';
import StockingOrderProfile from './components/stockingOrderProfile';
import { StockingOrderStatus, stockingOrderStatusEnum } from './_utils/statusEnum';
import { StockingOrders } from '@/pages/appSmartErp/_permissions';

const updateRoute = '/appSmartErp/ProductionManagement/StockingOrders/update';
const createRoute = '/appSmartErp/ProductionManagement/StockingOrders/create';

const Options = (params: ICellRendererParams & { onRefresh?: () => void }) => {
    const { data, onRefresh, api, node } = params;
    const intl = useIntl();
    const access = useAccess();

    const refresh = () => {
        onRefresh?.();
    };

    // 更新当前行数据并强制刷新
    const updateRowData = (newData: any) => {
        if (node && api) {
            // 更新节点数据
            const updatedData = { ...data, ...newData };
            node.setData(updatedData);

            // 强制刷新整行的所有单元格
            api.refreshCells({
                rowNodes: [node],
                force: true,
                suppressFlash: false
            });

            // 额外触发行重新渲染
            api.redrawRows({ rowNodes: [node] });
        }
    };

    const handleCopy = async (id: any, stockingOrderNo: string) => {
        if (!id || id === undefined || id === null) {
            message.error('备货单ID无效，无法进行复制操作');
            return;
        }

        // 弹出对话框让用户输入新的备货单号
        let newStockingOrderNo = '';

        Modal.confirm({
            title: '复制备货单',
            content: (
                <div>
                    <p>原备货单号: {stockingOrderNo}</p>
                    <p style={{ marginTop: 16, marginBottom: 8 }}>请输入新的备货单号:</p>
                    <Input
                        placeholder="请输入新备货单号"
                        onChange={(e) => {
                            newStockingOrderNo = e.target.value;
                        }}
                    />
                </div>
            ),
            onOk: async () => {
                if (!newStockingOrderNo || newStockingOrderNo.trim() === '') {
                    message.error('新备货单号不能为空');
                    return Promise.reject();
                }

                const hide = message.loading('正在复制,请稍后', 0);
                try {
                    await StockingOrderCopyAsync({
                        sourceId: id,
                        newStockingOrderNo: newStockingOrderNo.trim()
                    });
                    refresh();
                    message.success('复制成功');
                } catch (error) {
                    console.error('复制操作失败:', error);
                    message.error('复制失败，请联系管理员');
                    return Promise.reject(error);
                } finally {
                    hide();
                }
            }
        });
    };

    const handleDelete = async (id: any) => {
        if (!id || id === undefined || id === null) {
            message.error('备货单ID无效，无法进行删除操作');
            return;
        }

        const hide = message.loading('正在删除,请稍后', 0);
        try {
            await StockingOrderDeleteAsync({ id });
            refresh();
            message.success('删除成功');
        } catch (error) {
            console.error('删除操作失败:', error);
            message.error('删除失败，请检查备货单状态或联系管理员');
        } finally {
            hide();
        }
    };

    const handleApprove = async (id: any) => {
        if (!id || id === undefined || id === null) {
            message.error('备货单ID无效，无法进行审核操作');
            return;
        }

        const hide = message.loading('正在审核,请稍后', 0);
        try {
            const result = await StockingOrderApproveAsync({ id });

            // 直接更新当前行数据
            if (result && result.status !== undefined) {
                updateRowData(result);
            }

            message.success('审核成功');
        } catch (error) {
            console.error('审核操作失败:', error);
            message.error('审核失败，请检查备货单状态或联系管理员');
        } finally {
            hide();
        }
    };

    const handleUnapprove = async (id: any) => {
        if (!id || id === undefined || id === null) {
            message.error('备货单ID无效，无法进行反审核操作');
            return;
        }

        const hide = message.loading('正在反审核,请稍后', 0);
        try {
            const result = await StockingOrderUnapproveAsync({ id });

            // 直接更新当前行数据
            if (result && result.status !== undefined) {
                updateRowData(result);
            }

            message.success('反审核成功');
        } catch (error) {
            console.error('反审核操作失败:', error);
            message.error('反审核失败，请检查备货单状态或联系管理员');
        } finally {
            hide();
        }
    };

    const handleSubmit = async (id: any) => {
        if (!id || id === undefined || id === null) {
            message.error('备货单ID无效，无法进行提交操作');
            return;
        }

        const hide = message.loading('正在提交,请稍后', 0);
        try {
            const result = await StockingOrderSubmitAsync({ id });

            // 直接更新当前行数据
            if (result && result.status !== undefined) {
                updateRowData(result);
            }

            message.success('提交成功');
        } catch (error) {
            console.error('提交操作失败:', error);
            message.error('提交失败，请检查备货单状态或联系管理员');
        } finally {
            hide();
        }
    };

    return (
        <Space>
            <Access accessible={!!access[StockingOrders.Update]}>
                <Button
                    size={'small'}
                    icon={<FormOutlined />}
                    type={'link'}
                    title={'编辑'}
                    onClick={() => {
                        history.push(`${updateRoute}?correlationId=${data.id}`);
                    }}
                />
            </Access>

            {/* 提交按钮 - 草稿状态时显示 */}
            {data && data.id && data.status === StockingOrderStatus.Draft && (
                <Access accessible={!!access[StockingOrders.Submit]}>
                    <DeleteConfirm
                        title={`确定提交备货单 ${data.stockingOrderNo || ''}? 提交后将进入审批中状态。`}
                        onConfirm={() => handleSubmit(data.id)}
                    >
                        <Button
                            size={'small'}
                            icon={<SendOutlined />}
                            type={'link'}
                            title={'提交'}
                            style={{ color: '#1890ff' }}
                        />
                    </DeleteConfirm>
                </Access>
            )}

            {/* 复制按钮 */}
            {data && data.id && data.stockingOrderNo && (
                <Access accessible={!!access[StockingOrders.Create]}>
                    <Button
                        size={'small'}
                        icon={<CopyOutlined />}
                        type={'link'}
                        title={'复制单据'}
                        onClick={() => handleCopy(data.id, data.stockingOrderNo)}
                    />
                </Access>
            )}

            {/* 审核按钮 - 审批中状态时显示 */}
            {data && data.id && data.status === StockingOrderStatus.Approving && (
                <Access accessible={!!access[StockingOrders.Approve]}>
                    <DeleteConfirm
                        title={`确定审批通过备货单 ${data.stockingOrderNo || ''}?`}
                        onConfirm={() => handleApprove(data.id)}
                    >
                        <Button
                            size={'small'}
                            icon={<CheckOutlined />}
                            type={'link'}
                            title={'审批通过'}
                            style={{ color: '#52c41a' }}
                        />
                    </DeleteConfirm>
                </Access>
            )}

            {/* 反审核按钮 - 已审批状态时显示 */}
            {data && data.id && data.status === StockingOrderStatus.Approved && (
                <Access accessible={!!access[StockingOrders.Unapprove]}>
                    <DeleteConfirm
                        title={`确定反审核备货单 ${data.stockingOrderNo || ''}? 反审核后单据将变为草稿状态。`}
                        onConfirm={() => handleUnapprove(data.id)}
                    >
                        <Button
                            size={'small'}
                            icon={<CloseOutlined />}
                            type={'link'}
                            title={'反审核'}
                            danger
                        />
                    </DeleteConfirm>
                </Access>
            )}

            {/* 删除按钮 */}
            {data && data.id && data.stockingOrderNo && (
                <Access accessible={!!access[StockingOrders.Delete]}>
                    <DeleteConfirm
                        title={`确定删除备货单 ${data.stockingOrderNo}? 此操作不可恢复！`}
                        onConfirm={() => handleDelete(data.id)}
                    >
                        <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
                    </DeleteConfirm>
                </Access>
            )}
        </Space>
    );
};

const StockingOrderPage: React.FC = () => {
    const gridRef = useRef<GridRef>();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    };

    const columnDefs = [
        {
            field: 'stockingOrderNo',
            headerName: '备货单号',
            width: 150,
            pinned: 'left',
            cellRenderer: ({ value, data }: any) => {
                return <StockingOrderProfile stockingOrderId={data.id} content={value} />;
            }
        },
        {
            field: 'stockingOrderName',
            headerName: '备货计划名称',
            width: 180
        },
        {
            field: 'startWeek',
            headerName: '开始周',
            width: 100
        },
        {
            field: 'customerCode',
            headerName: '客户编码',
            width: 120
        },
        {
            field: 'productionDate',
            headerName: '生产日期',
            width: 120,
            type: 'dateColumn',
            initialSort: 'desc'
        },
        {
            field: 'status',
            headerName: '状态',
            width: 100,
            valueEnum: stockingOrderStatusEnum
        },
        {
            field: 'statusDisplay',
            headerName: '状态描述',
            width: 120,
            hideInSearch: true
        },
        {
            field: 'memo',
            headerName: '备注',
            width: 250
        },
        {
            field: 'creationTime',
            headerName: '创建时间',
            width: 150,
            type: 'dateTimeColumn',
            hideInSearch: true
        },
        {
            field: 'creator',
            headerName: '创建人',
            width: 100,
            hideInSearch: true
        },
        {
            field: 'options',
            headerName: '操作',
            pinned: 'right',
            width: 200,
            cellRenderer: Options,
            cellRendererParams: { onRefresh: onRefresh },
            hideInSearch: true
        }
    ];

    return (
        <AgGridPlus
            gridRef={gridRef}
            headerTitle={'备货单列表'}
            gridKey="stocking-orders-list"
            columnDefs={columnDefs}
            request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
                let data = await StockingOrderGetListAsync({
                    Filter: params?.filter,
                    Sorting: params!.sorter,
                    SkipCount: params!.skipCount,
                    MaxResultCount: params!.maxResultCount
                });
                let requestData: any = { success: true, data: data.items || [], total: data.totalCount || 0 };
                return requestData;
            }}
            toolBarRender={() => {
                return [
                    <Access accessible={!!access[StockingOrders.Create]} key="create-btn">
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                history.push(createRoute);
                            }}
                        >
                            创建备货单
                        </Button>
                    </Access>,
                ];
            }}
        />
    );
};

export default StockingOrderPage;
export const routeProps = {
    name: '备货单',
};
