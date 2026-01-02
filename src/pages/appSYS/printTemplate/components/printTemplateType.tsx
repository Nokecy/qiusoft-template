import { Tag } from "antd";
import React from "react";

const PrintTemplateType = (props: any) => {
    const { value } = props;
    switch (value) {
        case 5:
            return <Tag color={'success'}>报表</Tag>
        case 10:
            return <Tag color={'error'}>ZPL</Tag>
        case 15:
            return <Tag color={'cyan'}>EPL</Tag>
        case 20:
            return <Tag color={'processing'}>CPCL</Tag>
        case 25:
            return <Tag color={'purple'}>TSPL</Tag>
        default:
            break;
    }
}
export default PrintTemplateType;