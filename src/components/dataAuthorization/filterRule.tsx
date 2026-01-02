import { Col, Input, Row, Select } from 'antd';
import React, { useState } from 'react';
import DefaultDefinitionSelect from './defaultDefinitionSelect';
import { observer } from '@formily/reactive-react'

const FilterRule = observer((props: any) => {
    const { fields, operators, valueComponents, rule, onChange } = props;
    const { field, operator, value } = rule || {};
    const [fieldType, setFieldType] = useState("defaultDefinitionSelect");

    const handleFieldChange = (value) => {
        if(onChange ) onChange({ ...rule, field: value });

        setFieldType(fields.find(x => x.value === value).type)
    }

    const handleOperChange = (value) => {
        if(onChange ) onChange({ ...rule, operator: value });
    }

    const handleValueChange = (e) => {
        if(onChange ) onChange({ ...rule, value: e.target ? e.target.value : e });
    }

    const ValueComponent = fieldType === 'defaultDefinitionSelect' ? DefaultDefinitionSelect : valueComponents[fieldType];

    return <Row gutter={8} style={{ paddingTop: 5, paddingBottom: 5 }}>
        <Col span={8}>
            <Select placeholder="请选择资源" style={{ width: '100%' }} value={field} onChange={handleFieldChange}>
                {fields.map(function (operator) {
                    return (
                        <Select.Option key={'operator_option_' + operator.value} value={operator.value}>
                            {operator.text}
                        </Select.Option>
                    );
                })}
            </Select>
        </Col>

        <Col span={8}>
            <Select placeholder="请选择操作符" style={{ width: '100%' }} value={operator} onChange={handleOperChange}>
                {operators.map(function (operator) {
                    return (
                        <Select.Option key={'operator_option_' + operator.value} value={operator.value}>
                            {operator.text}
                        </Select.Option>
                    );
                })}
            </Select>
        </Col>

        <Col span={8}>
            <ValueComponent value={value} onChange={handleValueChange} />
        </Col>
    </Row>
});

export default FilterRule;
