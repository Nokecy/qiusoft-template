import React, { useRef } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { useAccess, useIntl } from '@umijs/max';
import { AgGridPlus } from '@/components/agGrid';

/**
 * 模具设计列表
 * @returns
 */
const BoxLotResolveRuleItemTable = (props: any) => {
    const { listData } = props;
    const intl = useIntl();
    const gridRef = useRef<GridRef>();
    const access = useAccess();

    const columnDefs: any = [
        {
            headerName: "属性名",
            field: "propertyName",
            width: 120,
        },
        {
            headerName: "序号",
            field: "index",
            width: 80,
        },
        {
            headerName: "键名",
            field: "keyName",
            width: 120,
        },
        {
            headerName: "属性解析模式",
            field: "valueResolveMode",
            width: 150,
            cellRenderer: (params)=>{
                return params.value === 0 ? '无' : '正则';
            },
        },
        {
            headerName: "正则表达式",
            field: "regexPattern",
            width: 180,
        },
        {
            headerName: "是否必填",
            field: "isRequired",
            width: 110,
            type: "bool",
        },
    ];
    

    return (
        <>
            <AgGridPlus
                gridRef={gridRef}
                style={{
                    height: 'calc(520px)',
                }}
                gridKey='appWMS.baseInfo.boxLotResolveRuleItem'
                rowSelection={'single'}
                // hideTool
                search={false}
                toolBarRender={gridApi => { return []; }}
                columnDefs={columnDefs}
                params={{ listData: listData }}
                request={async (params: any) => {
                    return { success: true, data: listData!, total: listData.length, };
                }}
            >
            </AgGridPlus>
        </>
    );
};

export default BoxLotResolveRuleItemTable;
