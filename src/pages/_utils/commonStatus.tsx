
import { ICellRendererParams } from "ag-grid-community";
import { Tag } from "antd";
import React from "react";

const renderCommonStatus = (props: ICellRendererParams) => {
    const { value } = props;
    switch (value) {
        case 'B1':
            return <Tag color={'default'} >草稿</Tag>
        case 'B2':
            return <Tag color={'error'} >退回修改</Tag>
        case 'B3':
            return <Tag color={'success'} >退回修改(通过)</Tag>
        case 'C1':
            return <Tag color={'processing'} >待审批</Tag>
        case 'C2':
            return <Tag color={'processing'} >重新审批</Tag>
        case 'C3':
            return <Tag color={'success'} >重新审批(通过)</Tag>
        case 'D1':
            return <Tag color={'cyan'} >计划下达</Tag>
        case 'D3':
            return <Tag color={'warning'} >否决</Tag>
        case 'E1':
            return <Tag color={'success'} >确认下达</Tag>
        case 'F1':
            return <Tag color={'#f50'} >确认开工</Tag>
        case 'H1':
            return <Tag color={'#87d068'} >完工入库</Tag>
        default:
            break;
    }
}
export default renderCommonStatus;