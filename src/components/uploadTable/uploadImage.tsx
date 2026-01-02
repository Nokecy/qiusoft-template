import { Upload, Image, message } from "antd"
import React, { useEffect, useState } from "react"
import type { UploadFile, UploadProps } from 'antd';
import {
    PlusOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
import { useControllableValue } from "ahooks";
import { MediaTempBlobUploadImagesAsync } from "@/services/attachment/MediaTempBlob";
import { serverUrl } from "@umijs/max";
type FileType = Parameters<any>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();

        //@ts-ignore
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const AttachmentImageContent = (props: any, ref) => {

    const { quantity, readOnly } = props
    const quantityVisible = quantity && quantity > 1

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const [state, setState] = useControllableValue<any>(props, { defaultValue: null });

    const [fileList, setFileList] = useState<UploadFile[]>([])

    const [action, setaction] = useState(false)

    useEffect(() => {
        if (action) return;
        if (state) {
            let arr: any = []
            if (state.length > 0) {
                state.map((i: any) => {
                    arr.push({
                        ...i,
                        name: i.blobName,
                        url: serverUrl() + '/api/attachmentManage/blob/by-blob-name/' + i.blobName
                    })
                })
            }
            setFileList(arr)
        }
    }, [state])

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }: any) => {
        if (newFileList.length > 0) {
            setaction(true)
            // 创建一个用来存储唯一文件名的Set
            const uniqueFilesSet = new Set();
            const uniqueFileList = newFileList.filter((item: any) => {
                if (!uniqueFilesSet.has(item.name)) {
                    uniqueFilesSet.add(item.name);
                    return true;
                }
                return false;
            });

            const files = uniqueFileList.map((item: any) => item.originFileObj);

            MediaTempBlobUploadImagesAsync({}, files).then((res) => {
                if (res && res.length > 0) {
                    let stateCopy = [];

                    uniqueFileList.forEach((item) => {
                        res.forEach((item2) => {
                            if (item.name === item2.fileName) {
                                //@ts-ignore
                                stateCopy.push({ ...item, ...item2 });
                            }
                        });
                    });
                    setFileList(uniqueFileList);
                    setState(quantityVisible ? stateCopy : res[0]?.blobName);
                }
            }).catch((err) => {
                setFileList(uniqueFileList);
                setState(undefined);
            });
        } else {
            setFileList(newFileList);
            setState(undefined);
        }
    };


    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传</div>
        </button>
    );

    return (
        <div ref={ref}>
            <Upload
                action=""
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={(file) => {
                    if (readOnly) return false;

                    //@ts-ignore
                    if (fileList && fileList.length > 0) setFileList(fileList.filter((item) => item.id !== file.id));

                    //@ts-ignore
                    if (state && state.length > 0) setState(state.filter((item) => item.id !== file.id));
                }}
                beforeUpload={(file) => {
                    // 判断上传的文件是否重复
                    if (fileList.some((item) => item.name === file.name)) {
                        message.error('文件名重复，请重新上传');
                        return false;
                    }

                    return false;
                }}
            >
                {fileList?.length >= (quantityVisible ? quantity : 1) ? null : readOnly ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </div>
    )
}

export default React.forwardRef(AttachmentImageContent)