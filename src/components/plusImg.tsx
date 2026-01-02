import { Modal, Upload } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from "react";
import { serverUrl } from "@@/plugin-appConfig";
import { useControllableValue } from "ahooks";

export default (props) => {
  const [state, setState] = useControllableValue<any>(props);

  const handleUpload = ({ fileList }) => {
    setState(fileList)
  };

  const handleRemove = (file) => {
    const newFileList = state.filter((f) => f.id ? f.id !== file.id : f.uid !== file.uid);
    setState(newFileList)
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj || file.url);
    }

    Modal.info({
      title: file.name,
      content: <img src={file.url || file.preview} alt={file.name} style={{ width: '100%' }} />,
    });
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  return (
    <Upload
      action={`${serverUrl()}/api/attachmentManage/static-file-blob/upload`}
      listType="picture-card"
      fileList={state || []}
      disabled={props.readPretty}
      onChange={handleUpload}
      onRemove={handleRemove}
      onPreview={handlePreview}
    >
      {state?.length >= (props.maxLength || 8) ? null : uploadButton}
    </Upload>
  );
};
