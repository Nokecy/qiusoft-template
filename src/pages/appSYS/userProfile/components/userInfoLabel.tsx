import { Space } from "antd";
import React from "react";

const UserInfoLabel = (props: any) => {
    const { icon, leftText, rightText } = props;
    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #f0f0f0", lineHeight: "30px" }}>
            <Space>
                {icon}
                <span>{leftText}</span>
            </Space>

            <div>{rightText}</div>
        </div>
    );
}
export default UserInfoLabel;
