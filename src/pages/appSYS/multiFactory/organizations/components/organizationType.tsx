import { ICellRendererParams } from 'ag-grid-community';
import { Tag, Select } from 'antd';
import React from 'react';

const OrganizationType = (props: ICellRendererParams) => {
    const { value } = props;

    const render = text => {
        switch (text) {
            case '10':
                return <Tag color={'success'}>集团</Tag>;
            case '20':
                return <Tag color={'cyan'}>公司</Tag>;
            case '30':
                return <Tag color={'cyan'}>工厂</Tag>;
            default:
                return '未知';
        }
    };

    return render(value);
};

const OrganizationTypeSelect = (props: any) => {
    return <Select allowClear>
        <Select.Option value={"10"}>集团</Select.Option>
        <Select.Option value={"20"}>公司</Select.Option>
        <Select.Option value={"30"}>工厂</Select.Option>
    </Select>;
};

export default OrganizationType;

export { OrganizationTypeSelect }
