import { connect } from "@formily/react";
import { Select } from "antd";
import React from "react";
const { Option } = Select;
const GeneralSelectQuery: React.FC = (props: any) => {
    const { gradeMap } = props

    return (
        <Select
            {...props}
        >
            {gradeMap.map((i: any) => <Option value={i.value}>{i.label}</Option>)}    </Select>
    );
};

export default connect(GeneralSelectQuery);
