import { Alert, Button, message, Modal, Upload } from "antd";
import { CloudUploadOutlined, InboxOutlined } from "@ant-design/icons";
import React, { useMemo } from "react";
import { useBoolean } from "ahooks";
import { downloadBlob } from "@/_utils";
import Cookies from "js-cookie";
import { serverUrl } from "umi";

const MergetUploadDialog = (props: any) => {
    const { onAfterSubmit } = props;
    const [visible, { setTrue, setFalse }] = useBoolean(false);
    return <>
        <Button onClick={setTrue}><CloudUploadOutlined />批量移动库位</Button>

        <Modal title={"批量移动库位"} open={visible} onCancel={setFalse} destroyOnClose>
            <Alert message={<span>点击下载 <a onClick={() => { downloadBlob("/api/wms/stock-bin/import-switch-location-template", "批量移动库位模版.xlsx") }}>模版</a></span>} type={"info"} />

            <Upload.Dragger style={{ marginTop: 10 }} multiple={false}
                action={`${serverUrl()}/api/wms/stock-bin/import-merge-location`}
                onChange={(info) => {
                    if (info.file.status === "done") {
                        message.success("导入成功");
                        setFalse();
                        if(onAfterSubmit) onAfterSubmit();
                    }

                    if (info.file.status === "error") {
                        message.error(info.file.response.error.message);
                    }
                }}
            >
                <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                <p className="ant-upload-text">单击或拖动文件到该区域上传</p>
            </Upload.Dragger>
        </Modal>
    </>;
}

export default MergetUploadDialog