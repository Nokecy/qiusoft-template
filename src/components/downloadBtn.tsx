import { Button } from "antd"
import React from "react";
import { CloudDownloadOutlined } from '@ant-design/icons';
import { useControllableValue } from "ahooks";
import { serverUrl } from "@umijs/max";

const DownloadBtn = (props) => {
    const [state, setState] = useControllableValue<any>(props);

    return <Button type="link" icon={<CloudDownloadOutlined />} onClick={() => {
        window.open(`${serverUrl()}/api/attachmentManage/blob/by-blob-name/${state}`);
    }} ></Button>
}

export default React.forwardRef(DownloadBtn);