import { Upload, Image, message } from "antd"
import React, { useState } from "react"
import type { GetProp, UploadFile, UploadProps } from 'antd';
import {
    PlusOutlined,
    DeleteOutlined,
    InboxOutlined
} from '@ant-design/icons';
import { useControllableValue } from "ahooks";
import { MediaTempBlobUploadImagesAsync } from "@/services/attachment/MediaTempBlob";
import DraggerUploadCopy from "./draggerCopy";
import { useModel } from "@umijs/max";
import moment from "moment";
import { UploadChangeParam } from "antd/es/upload";
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const AttachmentVideoContent = (props: any, ref) => {

    const { disabled, removeCallBack, changeCallBack, notDelete, hidePercent, hideDownBtn, look } = props;

    const [state, setState] = useControllableValue<any>(props);
    const { initialState } = useModel("@@initialState");
    const onFileChange = (info: UploadChangeParam) => {
        let list = info.fileList.map((a: any) => {
            a.blobName = a.response?.blobName;
            a.filename = a.name;
            a.size = a.response?.size;
            a.thumbnailBlobName = a.response?.thumbnailBlobName;
            a.thumbnailSize = a.response?.thumbnailSize;
            a.contentType = a.type;
            return a
        });
        setState(list)
        changeCallBack && changeCallBack(list)

    };


    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传</div>
        </button>
    );

    return (
        <span ref={ref}>
            <DraggerUploadCopy fileList={state} disabled={false} onChange={onFileChange} showUploadList={false} multiple={true} maxCount={1}>

                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">把文件拖入或点击空白区域，完成上传</p>
            </DraggerUploadCopy>

            <div style={{ marginTop: 12 }}>
                {state && state.map((item: any) => {
                    return (
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                            <div style={{ width: 560,paddingLeft:8,paddingRight:8, backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <li>{item.name}</li>
                                <div onClick={()=>{setState(undefined)}}><DeleteOutlined /></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </span>)
}

export default React.forwardRef(AttachmentVideoContent)