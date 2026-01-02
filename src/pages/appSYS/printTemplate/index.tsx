import { PrintTemplateInfoDeleteAsync, PrintTemplateInfoExportTemplateAsync, PrintTemplateInfoGetListAsync } from '@/services/openApi/PrintTemplateInfo';
import { EditOutlined, DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import React, { useRef } from "react";
import { useNavigate, useIntl } from "umi";
import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { message, Button, Space, } from "antd";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import PrintTemplateFormModal from "./components/printTemplateFormModal";
import DeleteConfirm from "@/components/deleteConfirm";
import PrintTemplateType from './components/printTemplateType';
import ImportPublic from '@/components/importPublic';

const Options = (props: any) => {
    const { data, onRefresh } = props;
    const intl = useIntl();

    const navigate = useNavigate();

    const refresh = () => {
        onRefresh();
    }

    const handleDelete = (id: any) => {
        const hide = message.loading('正在操作,请稍后', 0);
        PrintTemplateInfoDeleteAsync({ id }).then(() => { refresh() }).finally(() => { hide(); });
    }

    return (
        <Space>
            {
                data.templateType !== 5 ? <PrintTemplateFormModal
                    title={'编辑'}
                    entityId={data.id}
                    onAfterSubmit={() => {
                        refresh();
                    }}
                    buttonProps={{ icon: <EditOutlined />, size: 'small', type: 'link', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
                /> : <Button size={"small"} type={"link"} icon={<EditOutlined />} onClick={() => { navigate({ pathname: `/appSYS/printTemplate/edit?id=${data.id}` }); }} />
            }

            <DeleteConfirm title="确定删除?" placement={"left"} onConfirm={() => handleDelete(data.id)} okText="确定" cancelText="取消">
                <Button key="update" size={"small"} type={"link"} icon={<DeleteOutlined />} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
            </DeleteConfirm>

            <Button type='link' icon={<DownloadOutlined />} onClick={() => {
                window.open(`${window?.serverUrl?.apiServerUrl}/api/PrintTemplateManagement/printTemplateInfo/${data.id}/export`);
            }} />

            <ImportPublic
                onAfterSubmit={onRefresh}
                method='PUT'
                type='link'
                children=' '
                title='模板'
                downUrl=''
                uploadUrl={`/api/PrintTemplateManagement/printTemplateInfo/${data.id}/import`}
            />
        </Space>
    );
}

const PrintTemplateInfoPage: React.FC<any> = () => {
    const intl = useIntl();

    const gridRef = useRef<GridRef>();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    return <>
        <AgGridPlus
            gridRef={gridRef}
            headerTitle={"打印模板列表"}
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data = await PrintTemplateInfoGetListAsync({ MaxResultCount: params!.maxResultCount, SkipCount: params!.skipCount, Sorting: params!.sorter ? params!.sorter : "Name desc" })
                let requestData: any = { success: true, data: data.items, total: data.totalCount };
                return requestData;
            }}
            toolBarRender={() => {
                return [
                    <PrintTemplateFormModal key="printModelNew" onConfirm={onRefresh}>{"新建"}</PrintTemplateFormModal>
                ]
            }}>
            <AgGridColumn field={"name"} headerName={"名称"} width={200} />
            <AgGridColumn field={"templateType"} headerName={"模板类型"} width={100} cellRenderer={PrintTemplateType} />
            <AgGridColumn field={"describe"} headerName={"描述"} flex={1} />
            <AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} width={160} cellRenderer={Options} filter={false} cellRendererParams={{ onRefresh }} />
        </AgGridPlus>
    </>
};

export default PrintTemplateInfoPage;

export const routeProps = {
    name: '打印模板列表',
};