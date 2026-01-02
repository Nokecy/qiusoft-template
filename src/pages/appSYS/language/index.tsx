import { AgGridPlus } from "@/components/agGrid";
import { LanguageDeleteAsync, LanguageGetAllListAsync } from '@/services/openApi/Language';
import { ICellRendererParams } from "ag-grid-community";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Space, message, Tag } from "antd";
import React, { useRef, useMemo } from "react";
import { Access, useAccess, useIntl } from "umi";
import { Users } from "../../../services/identityPermission";
import LanguageForm from "./components/languageFormDialog";
import DeleteConfirm from "@/components/deleteConfirm";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import dayjs from 'dayjs';


const Options = (props: ICellRendererParams & { onRefresh }) => {
    const { data, api, onRefresh } = props;
    const intl = useIntl();
    const access = useAccess();

    const handleDelete = (id: any) => {
        const hide = message.loading('正在操作,请稍后', 0);
        LanguageDeleteAsync({ id }).then(() => { onRefresh(); }).finally(() => { hide(); });
    };

    return (
        <Space>
            <Access accessible={!!access[Users.Update]}>
                <LanguageForm title={"编辑"} entityId={data.id} onAfterSubmit={onRefresh} buttonProps={{ icon: <EditOutlined />, type: "link", size: "small", title: "编辑语言" }} />
            </Access>

            <Access accessible={!!access[Users.Delete]}>
                <DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
                    <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
                </DeleteConfirm>
            </Access>
        </Space>
    );
};

const LanguagePage = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    const columnDefs: any = useMemo(() => [
        {
            headerName: "显示名称",
            field: "displayName",
            width: 150
        },
        {
            headerName: "文化名称",
            field: "cultureName",
            width: 120
        },
        {
            headerName: "UI文化名称",
            field: "uiCultureName",
            flex: 1,
            width: 120
        },
        {
            headerName: "图标",
            field: "flagIcon",
            width: 100,
            cellRenderer: ({ value }: any) => value || '-'
        },
        {
            headerName: "是否启用",
            field: "isEnabled",
            width: 100,
            cellRenderer: ({ value }: any) => value ? "是" : "否"
        },
        {
            headerName: "默认语言",
            field: "isDefaultLanguage",
            width: 100,
            cellRenderer: ({ value }: any) => value ? <Tag color="blue">默认</Tag> : '-'
        },
        {
            headerName: "创建时间",
            field: "creationTime",
            width: 160,
            initialSort: 'desc',
            cellRenderer: ({ value }: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm') : ''
        },
        {
            headerName: intl.formatMessage({ id: "AbpUi:Actions" }),
            field: "action",
            width: 120,
            pinned: 'right',
            cellRenderer: (props: any) => <Options {...props} />,
            cellRendererParams: { onRefresh }
        }
    ], [intl, onRefresh]);

    return (
        <AgGridPlus
            gridRef={gridRef}
            gridKey="sys-language-list"
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data = await LanguageGetAllListAsync({})
                let requestData: any = { success: true, data: data.items!, total: data.items?.length };
                return requestData;
            }}
            toolBarRender={() => {
                return [
                    <Access accessible={!!access[Users.Create]}>
                        <LanguageForm
                            title={"新建"}
                            buttonProps={{
                                icon: <PlusOutlined />,
                                type: "primary"
                            }}
                            onAfterSubmit={onRefresh}
                        >
                            {"新建语言"}
                        </LanguageForm>
                    </Access>
                ];
            }}
            headerTitle={"语言列表"}
            columnDefs={columnDefs}
        />
    );
};

export default LanguagePage;
export const routeProps = {
    name: '语言列表',
};