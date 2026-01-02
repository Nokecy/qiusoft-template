import { Tag } from "antd";
import React from "react";

const renderOrganizationUnitType = (text) => {
    switch (text) {
        case 0:
            return "公司";
        case 1:
            return "部门";
        case 2:
            return "小组";
        default:
            break;
    }
}


export { renderOrganizationUnitType };
