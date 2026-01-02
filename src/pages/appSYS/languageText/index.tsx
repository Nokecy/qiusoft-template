import { AgGridPlus } from "@/components/agGrid";
import { ICellRendererParams } from "ag-grid-community";
import { LanguageTextGetListAsync } from '@/services/openApi/LanguageText';
import { EditOutlined } from "@ant-design/icons";
import { Space } from "antd";
import React, { useRef, useMemo } from "react";
import { Access, useAccess, useIntl } from "umi";
import { Users } from "../../../services/identityPermission";
import CultureSelect from "./components/cultureSelect";
import LanguageTextForm from "./components/languageTextFormDialog";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";


const Options = (props: ICellRendererParams & { onRefresh }) => {
    const { data, api, onRefresh } = props;
    const intl = useIntl();
    const access = useAccess();

    return (
        <Space>
            <Access accessible={!!access[Users.Update]}>
                <LanguageTextForm
                    title={"编辑"}
                    resourceName={data.resourceName}
                    cultureName={data.cultureName}
                    name={data.name}
                    baseCultureName={data.baseCultureName}
                    onAfterSubmit={onRefresh}
                    buttonProps={{
                        icon: <EditOutlined />,
                        type: "link",
                        size: "small",
                        title: "编辑语言文本"
                    }}
                />
            </Access>
        </Space>
    );
};

const LanguageTextPage = (props: any) => {
    const intl = useIntl();
    const gridRef = useRef<GridRef>();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    const columnDefs: any = useMemo(() => [
        {
            headerName: "基础文化",
            field: "baseCultureName",
            width: 150,
            hideInTable: true,
            searchComponent: CultureSelect
        },
        {
            headerName: "目标文化",
            field: "targetCultureName",
            width: 150,
            hideInTable: true,
            searchComponent: CultureSelect
        },
        {
            headerName: "键",
            field: "name",
            width: 250
        },
        {
            headerName: "基础值",
            field: "baseValue",
            width: 200,
            hideInSearch: true
        },
        {
            headerName: "值",
            field: "value",
            width: 200,
            hideInSearch: true
        },
        {
            headerName: "资源名称",
            field: "resourceName",
            flex: 1,
            width: 150,
            hideInSearch: true
        },
        {
            headerName: intl.formatMessage({ id: "AbpUi:Actions" }),
            field: "action",
            width: 100,
            pinned: 'right',
            hideInSearch: true,
            cellRenderer: (props: any) => <Options {...props} />,
            cellRendererParams: { onRefresh }
        }
    ], [intl, onRefresh]);

    return (
        <AgGridPlus
            gridRef={gridRef}
            gridKey="sys-language-text-list"
            request={async (params, sort, filter) => {
                if (filter!.baseCultureName) {
                    let data = await LanguageTextGetListAsync({
                        BaseCultureName: filter!.baseCultureName,
                        TargetCultureName: filter!.targetCultureName,
                        Name: filter!.name,
                        Sorting: params!.sorter,
                        SkipCount: params!.skipCount,
                        MaxResultCount: params!.maxResultCount
                    });
                    let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                    return requestData;
                }
                return { success: true, data: [], total: 0 };
            }}
            headerTitle={"语言文本列表"}
            columnDefs={columnDefs}
        />
    );
};

export default LanguageTextPage;
export const routeProps = {
    name: '语言文本列表',
};