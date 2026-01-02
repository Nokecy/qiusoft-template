import React, { useRef } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from '@umijs/max';
import { Button, Modal, Space, message } from 'antd';
import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { ICellRendererParams } from "ag-grid-community";
import CountDiffReasonDialog from './components/FormDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { CountDiffReasonGetListAsync, CountDiffReasonDeleteAsync } from '@/services/wms/CountDiffReason';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ImportPublic from '@/components/importPublic';
import { downloadBlob } from '@/_utils';
import { CountDiffReasons } from '@/services/wmsPermission';

const CountDiffReasonPage = () => {
    const intl = useIntl();
    const gridRef = useRef<GridRef>();
    const access = useAccess();
    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }
    const Options = (props: ICellRendererParams & { onRefresh }) => {
        const { data, api, onRefresh } = props;
        const intl = useIntl();
        const access = useAccess();

        const refresh = () => {
            onRefresh();
        }

        const handleDelete = (id: any) => {
            const hide = message.loading('正在操作,请稍后', 0);
            CountDiffReasonDeleteAsync({ id }).then(() => {
                refresh()
            }).finally(() => { hide(); });
        }

        return (
            <Space>

                <Access accessible={access[CountDiffReasons.Update]}>
                    <CountDiffReasonDialog title={"编辑"} entityId={data.id} onAfterSubmit={() => { refresh(); }} buttonProps={{ icon: < EditOutlined />, type: "link", headerName: intl.formatMessage({ id: "AbpUi:Edit" }) }} />
                </Access>

                <Access accessible={access[CountDiffReasons.Delete]}>
                    <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
                        <Button size={"small"} icon={<DeleteOutlined />} type={"link"} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
                    </DeleteConfirm>
                </Access>

            </Space>
        );
    }



    return (
        <>
            <AgGridPlus
                gridRef={gridRef}
                headerTitle='盘点差异原因列表'
                gridKey='appWMS.countStore.countDiffReason'
                request={async (params: any) => {
                    let data = await CountDiffReasonGetListAsync({ Filter: params?.filter, MaxResultCount: params!.maxResultCount, SkipCount: params!.skipCount, Sorting: params!.sorter! })
                    return {
                        success: true,
                        data: data.items!,
                        total: data.totalCount
                    }
                }}
                toolBarRender={(gridApi, filter) => {
                    return [
                        <Access accessible={access[CountDiffReasons.Create]}>
                            <CountDiffReasonDialog title={"新建盘点差异原因"} onAfterSubmit={onRefresh}>{"新建"}</CountDiffReasonDialog>
                        </Access>,
                        <Access accessible={access[CountDiffReasons.Create]}>
                            <ImportPublic onAfterSubmit={onRefresh} title="盘点差异原因导入" children='导入' downUrl="/api/wms/count-diff-reason/import-template" uploadUrl="/api/wms/count-diff-reason/import" />
                        </Access>,
                        <Access key="export" accessible={access[CountDiffReasons.Create]}>
                            <Button
                                onClick={() => {
                                    downloadBlob(`/api/wms/count-diff-reason/export?filter=${filter}`, '盘点差异原因信息.xlsx');
                                }}
                            >
                                导出
                            </Button>
                        </Access>
                    ];
                }}
            >
                <AgGridColumn field={"reason"} headerName={"差异原因"} width={210} />
                <AgGridColumn field={"creator"} headerName={"创建人"} width={100} />
                <AgGridColumn field={"creationTime"} headerName={"创建时间"} type={"dateTimeColumn"} width={160} />
                <AgGridColumn field={"lastModificationTime"} headerName={"最后修改时间"} type={"dateTimeColumn"} width={160} />
                <AgGridColumn field={"remark"} headerName={"备注"} width={180} flex={1} />
                <AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} width={180} pinned={"right"} filter={false} sortable={false} cellRenderer={Options}
                    cellRendererParams={{ onRefresh }} />
            </AgGridPlus>
            <Modal>

            </Modal>
        </>
    )
}

export default CountDiffReasonPage
export const routeProps = {
    name: '盘点差异原因',
};
