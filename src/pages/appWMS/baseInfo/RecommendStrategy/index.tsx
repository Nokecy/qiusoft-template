import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import React, { useRef, useState } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from '@umijs/max';
import { message, Button, Modal, Space, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ImportPublic from '@/components/importPublic';
import { SelectionChangedEvent } from 'ag-grid-community';
import DeleteConfirm from '@/components/deleteConfirm';
import ModelFormDialog from './components/FormDialog';
import { PutItemRecommendStrategyDeleteAsync, PutItemRecommendStrategyGetListAsync } from '@/services/wms/PutItemRecommendStrategy';
import { PutItemRecommendStrategyItemDeleteAsync, PutItemRecommendStrategyItemGetListAsync } from '@/services/wms/PutItemRecommendStrategyItem';
import ItemModelFormDialog from './components/ItemFormDialog';
import { PutItemRecommendStrategies } from '@/services/wmsPermission';
import { Allotment } from 'allotment';

const Options = (props: any & { onRefresh }) => {
    const { data, api, onRefresh } = props;
    const intl = useIntl();
    const access = useAccess();

    const refresh = () => {
        onRefresh();
    }

    const handleDelete = (id: any) => {
        const hide = message.loading('正在操作,请稍后', 0);
       return PutItemRecommendStrategyDeleteAsync({ id }).then(() => {
            refresh()
            message.success('删除成功')
        }).finally(() => { hide(); });
    }

    return (
        <Space>
            <Access accessible={access[PutItemRecommendStrategies.Update]}>
                <ModelFormDialog title={"编辑"} entityId={data.id} onAfterSubmit={() => { refresh(); }} buttonProps={{ icon: < EditOutlined />, type: "link", headerName: intl.formatMessage({ id: "AbpUi:Edit" }) }} />
            </Access>

            <Access accessible={access[PutItemRecommendStrategies.Delete]}>
                <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
                    <Button size={"small"} icon={<DeleteOutlined />} type={"link"} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
                </DeleteConfirm>
            </Access>
        </Space>
    );
}





const RecommendStrategyPage = () => {
    const intl = useIntl();
    const gridRef = useRef<GridRef>();
    const gridRef2 = useRef<GridRef>();
    const access = useAccess();
    const [selectedRow, setSelectedRow] = useState<any>([]);
    const [modal, contextHolder] = Modal.useModal();
    const onRefresh = () => {
        setSelectedRow([]);
        gridRef.current?.onRefresh();
    }
    const onRefresh2 = () => {
        gridRef2.current?.onRefresh();
    }

    const onSelectionChanged = (e: SelectionChangedEvent) => {
        let selectedRows = e.api.getSelectedRows();
        setSelectedRow(selectedRows);
    };

    const Status = (value) => {
        switch (value) {
            case 0:
                return <Tag color={"blue"}>物料编码</Tag>;
            case 1:
                return <Tag color={"green"}>物料分类</Tag>;
            default:
                return <Tag color={"pink"}>无</Tag>;
        }
    }

    const Options2 = (props: any & { onRefresh }) => {
        const { data, api, onRefresh } = props;
        const intl = useIntl();
        const access = useAccess();

        const refresh = () => {
            onRefresh2();
        }

        const handleDelete = (id: any) => {
            const hide = message.loading('正在操作,请稍后', 0);
           return PutItemRecommendStrategyItemDeleteAsync({ id }).then(() => {
                refresh()
                message.success('删除成功')
            }).finally(() => { hide(); });
        }

        return (
            <Space>
                <Access accessible={access[PutItemRecommendStrategies.Create]}>
                    <ItemModelFormDialog title={"编辑"} entityId={data.id} fatherId={data.bomPriceId} onAfterSubmit={() => { refresh(); }} buttonProps={{ icon: < EditOutlined />, type: "link", headerName: intl.formatMessage({ id: "AbpUi:Edit" }) }} />
                </Access>

                <Access accessible={access[PutItemRecommendStrategies.Delete]}>
                    <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
                        <Button size={"small"} icon={<DeleteOutlined />} type={"link"} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
                    </DeleteConfirm>
                </Access>
            </Space>
        );
    }

    return (
        <>
            <Allotment vertical={true}>
                <Allotment.Pane>
                    <AgGridPlus
                        gridRef={gridRef}
                        request={async (params: any) => {
                            let data = await PutItemRecommendStrategyGetListAsync({ Filter: params?.filter, MaxResultCount: params!.maxResultCount, SkipCount: params!.skipCount, Sorting: params!.sorter! })
                            return {
                                success: true,
                                data: data.items!,
                                total: data.totalCount
                            }
                        }}
                        headerTitle='上架推荐策略列表'
                        gridKey='appWMS.BaseInfo.RecommendStrategy'
                        onSelectionChanged={onSelectionChanged}
                        rowSelection={'single'}
                        toolBarRender={(gridApi, filter) => {
                            return [
                                <Access accessible={access[PutItemRecommendStrategies.Create]}>
                                    <ModelFormDialog title={"新建上架策略"} onAfterSubmit={onRefresh}>{"新建"}</ModelFormDialog>
                                </Access>,
                            ];
                        }}>
                        <AgGridColumn field={"name"} headerName={"名称"} width={140} />
                        <AgGridColumn field={"warehouseName"} headerName={"仓库名称"} width={140} />
                        <AgGridColumn field={"materialCategoryCodes"} headerName={"物料分类编码"} width={140} />
                        <AgGridColumn field={"materialRecommendType"} headerName={"物料推荐类型"} width={140} cellRenderer={({ value }) => { return Status(value) }} />
                        <AgGridColumn field={"warehouseZoneCodes"} headerName={"库区编码"} width={140} />
                        <AgGridColumn field={"warehouseLocationCodes"} headerName={"库位编码"} width={140} />
                        <AgGridColumn field={"providerName"} headerName={"策略名称"} width={180} />
                        <AgGridColumn field={"providerDescription"} headerName={"策略描述"} width={180} />
                        <AgGridColumn field={"priorityLevel"} headerName={"优先级"} width={110} />
                        <AgGridColumn field={"creationTime"} headerName={"创建时间"} type={"dateTimeColumn"} width={160} />
                        <AgGridColumn field={"lastModificationTime"} headerName={"更改日期"} type={"dateTimeColumn"} width={160} />
                        <AgGridColumn field={"description"} headerName={"描述"} width={220} />
                        <AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} width={120} pinned={"right"} filter={false} sortable={false} cellRenderer={Options}
                            cellRendererParams={{ onRefresh }} />
                    </AgGridPlus>
                </Allotment.Pane>

                <Allotment.Pane snap>
                    <AgGridPlus
                        gridRef={gridRef2}
                        search={false}
                        params={{ putItemRecommendStrategyId: selectedRow[0]?.id }}
                        headerTitle='上架推荐策略明细列表'
                        gridKey='appWMS.BaseInfo.RecommendStrategy.Item'
                        request={async (params: any) => {
                            if (!params?.putItemRecommendStrategyId) {
                                return { success: true, data: [], total: 0 };
                            }
                            let data = await PutItemRecommendStrategyItemGetListAsync({ Filter: `putItemRecommendStrategyId=${params?.putItemRecommendStrategyId}`, MaxResultCount: params!.maxResultCount, SkipCount: params!.skipCount, Sorting: params!.sorter! })
                            return {
                                success: true,
                                data: data.items!,
                                total: data.totalCount
                            }
                        }}
                        toolBarRender={(gridApi, filter) => {
                            return [
                                <Access accessible={access[PutItemRecommendStrategies.Create]}>
                                    <ItemModelFormDialog title={"新建上架策略明细"} fatherId={selectedRow[0]?.id} onAfterSubmit={onRefresh2}>{"新建"}</ItemModelFormDialog>
                                </Access>,

                                <Access key="BomPriceSub" accessible={access[PutItemRecommendStrategies.Create]}>
                                    <ImportPublic id={selectedRow[0]?.id || ''} onAfterSubmit={onRefresh2} title="上架策略明细" children='导入' downUrl="/api/wms/put-item-recommend-strategy-item/import-template" uploadUrl="/api/wms/put-item-recommend-strategy-item/import" />
                                </Access>
                            ];
                        }}
                    >
                        <AgGridColumn field={"materialCodePrefix"} headerName={"物料编码前缀"} width={120} flex={1} />
                        <AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} width={120} pinned={"right"} filter={false} sortable={false} cellRenderer={Options2}
                            cellRendererParams={{ onRefresh2 }} />
                    </AgGridPlus>
                </Allotment.Pane>
            </Allotment>
        </>
    )
}

export default RecommendStrategyPage
export const routeProps = {
    name: '上架推荐策略',
};
