import { ICellRendererParams } from 'ag-grid-community';
import { Tag, Select, Space } from 'antd';
import React from 'react';

// 组织职能 Flag 枚举定义
export enum OrganizationFunctionEnum {
    Finance = 1,      // 财务职能
    Sales = 2,        // 销售职能
    Purchase = 4,     // 采购职能
    Factory = 8,      // 工厂职能
    RD = 16           // 研发职能
}

// 组织职能配置
export const organizationFunctionConfig = [
    { value: OrganizationFunctionEnum.Finance, label: '财务职能', color: '#00CED1' },
    { value: OrganizationFunctionEnum.Sales, label: '销售职能', color: '#9370DB' },
    { value: OrganizationFunctionEnum.Purchase, label: '采购职能', color: '#A0522D' },
    { value: OrganizationFunctionEnum.Factory, label: '工厂职能', color: '#708090' },
    { value: OrganizationFunctionEnum.RD, label: '研发职能', color: '#F4A460' }
];

const OrganizationFunction = (props: ICellRendererParams) => {
    const { value } = props;

    if (!value) return null;

    const tags = organizationFunctionConfig
        .filter(item => (value & item.value) === item.value)
        .map(item => (
            <Tag key={item.value} color={item.color}>
                {item.label}
            </Tag>
        ));

    return <Space size={4}>{tags}</Space>;
};

const OrganizationFunctionSelect = (props: any) => {
    return <Select
        allowClear
        mode="multiple"
        placeholder="请选择组织职能"
        maxTagCount={2}
    >
        {organizationFunctionConfig.map(item => (
            <Select.Option key={item.value} value={item.value}>
                {item.label}
            </Select.Option>
        ))}
    </Select>;
};

export default OrganizationFunction;

export { OrganizationFunctionSelect }
