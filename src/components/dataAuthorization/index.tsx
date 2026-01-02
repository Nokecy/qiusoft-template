import { Button, Col, Input } from 'antd';
import React from 'react';
import FilterGroup from './filterGroup';
import { getDefaultOper, getDefaultFields } from './default';

const DataFilter = (props: any) => {
    const { fields, operators, valueComponents, onChange, value } = props;

    return <FilterGroup
        fields={getDefaultFields(fields || [])}
        operators={getDefaultOper(operators || [])}
        valueComponents={valueComponents}
        group={value} onChange={onChange} />
}

export default DataFilter;
