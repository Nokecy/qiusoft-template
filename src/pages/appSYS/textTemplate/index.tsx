import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { TextTemplateDefinitionsGetListAsync } from "@/services/openApi/TextTemplateDefinitions";
import { RequestData } from "@ant-design/pro-table";
import React, { useRef, useState } from "react";
import { Access, useAccess, useIntl } from "umi";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import UpdateFormDialog from "./components/formModal";

const checkIconRender = ({ value }) => value ? <CheckOutlined style={{ color: '#58bc58' }} /> : <CloseOutlined style={{ color: '#f00' }} />
const nameRender = ({ value ,data}) => <UpdateFormDialog buttonProps={{ size: "small", type: "link", icon: value, title: '' }} entityData={data} title={'更新文本模板'} />
const RolePage = (props: any) => {
    const access = useAccess();
    const intl = useIntl();

    return <>
        <AgGridPlus
       
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data = await TextTemplateDefinitionsGetListAsync({ FilterText: params!.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: RequestData<any> = { success: true, data: data.items, total: data.totalCount };
                return requestData;
            }}
            headerTitle={"文本模板列表"}
            toolBarRender={(api) => {
                return [

                ]
            }}>
            <AgGridColumn headerName={intl.formatMessage({ id: "WMS:Name" })} field={"name"} width={250} cellRenderer={nameRender} />
            <AgGridColumn headerName={intl.formatMessage({ id: "AbpIdentity:DisplayName:DisplayName" })} field={"displayName"} width={300} hideInSearch />
            <AgGridColumn headerName={intl.formatMessage({ id: "isInlineLocalized" })} field={"isInlineLocalized"} width={120} cellRenderer={checkIconRender} hideInSearch />
            <AgGridColumn headerName={intl.formatMessage({ id: "isLayout" })} field={"isLayout"} width={80} cellRenderer={checkIconRender} hideInSearch />
            <AgGridColumn headerName={intl.formatMessage({ id: "Layout" })} field={"layout"} flex={1} hideInSearch />
            <AgGridColumn headerName={intl.formatMessage({ id: "defaultCultureName" })} field={"defaultCultureName"} width={180} hideInSearch />
        </AgGridPlus>
    </>
};

RolePage.title = "角色管理";
//RolePage.access = "A0E";

export default RolePage;
export const routeProps = {
	name: '文本模板列表',
};