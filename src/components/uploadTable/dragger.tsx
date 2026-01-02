import { message, Modal, notification, Spin, Upload } from "antd";
import { DraggerProps } from 'antd/lib/upload';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { } from "react";
import { serverUrl } from "umi";
import {
    LoadingOutlined,
    SmileOutlined,
} from '@ant-design/icons';


const { Dragger } = Upload;

const eachSize = 5 * 1024 * 1024;
const multiUploadSize = 5 * 1024 * 1024;

notification.config({
    top: 380
})

const DraggerUpload = (props: DraggerProps & { loading?: boolean, children?: any, chongfuVerify?: any }) => {
    const { chongfuVerify } = props;

    const [spinning, setSpinning] = React.useState(false);

    const postFile: any = (param, onProgress) => {
        const formData = new FormData()
        for (let p in param) {
            formData.append(p, param[p])
        }
        const config = {
            headers: { 'RequestVerificationToken': Cookies.get("XSRF-TOKEN") },
            onUploadProgress: e => {
                if (param.chunked) {
                    e.percent = Number(((((param.chunk * (param.eachSize - 1)) + (e.loaded)) / param.fullSize) * 100).toFixed(2))
                } else {
                    e.percent = Number(((e.loaded / e.total) * 100).toFixed(2))
                }
                onProgress(e)
            }
        }
        //@ts-ignore
        return axios.post(`${serverUrl()}/api/attachmentManage/temp-blob/upload`, formData, config).then(rs => {
            return { nextchunk: rs.data.nextchunk, filename: rs.data.filename };
        });
    }

    const splitFile = (file, eachSize, chunks) => {
        return new Promise<any[]>((resolve, reject) => {
            try {
                setTimeout(() => {
                    const fileChunk: any[] = []
                    for (let chunk = 0; chunks > 0; chunks--) {
                        fileChunk.push(file.slice(chunk, chunk + eachSize))
                        chunk += eachSize
                    }
                    resolve(fileChunk)
                }, 0)
            } catch (e) {
                console.error(e)
                reject(new Error('文件切块发生错误'))
            }
        })
    }

    const singleUpload = (file, onProgress) => {
        setSpinning(true)
        return postFile({ file, uid: file.uid, fileName: file.fileName }, onProgress).then(res => {
            message.success({
                icon: <SmileOutlined style={{ color: '#00b96b', fontSize: 24 }} />,
                content: '文件上传成功！感谢您的耐心，我们已成功收到您的文件。',
            })
            setSpinning(false)
            return res
        })
    }

    const splitUpload = (file, onProgress) => {

        setSpinning(true)
        notification.open({
            icon: <LoadingOutlined style={{ color: '#00b96b', fontSize: 24 }} />,
            message: '文件上传中',
            btn: null,
            key: 'upload-progress-notification',
            closeIcon: null,
            description:
                '您的文件正在传送中，耐心是一种美德，很快就会完成！',
            duration: 60,
            placement: 'top'
        });

        return new Promise(async (resolve, reject) => {
            try {
                const chunks = Math.ceil(file.size / eachSize)
                const fileChunks = await splitFile(file, eachSize, chunks)
                let currentChunk = 0
                for (let i = 0; i < fileChunks.length; i++) {
                    if (Number(currentChunk) === i) {
                        let { nextchunk } = await postFile({
                            chunked: true,
                            chunk: i,
                            chunks,
                            eachSize,
                            fileName: file.name,
                            fullSize: file.size,
                            uid: file.uid,
                            file: fileChunks[i]
                        }, onProgress)
                        currentChunk = nextchunk;
                    }
                }
                const data = await validateFile({
                    chunks: fileChunks.length,
                    fileName: file.name,
                    fullSize: file.size,
                    uid: file.uid
                })
                if (!data.isValid) {
                    throw new Error('文件校验异常')
                }
                resolve(data)
                notification.destroy('upload-progress-notification')
                setSpinning(false)
                message.success({
                    icon: <SmileOutlined style={{ color: '#00b96b', fontSize: 24 }} />,
                    content: '文件上传成功！感谢您的耐心，我们已成功收到您的文件。',
                })

            } catch (e) {
                reject(e)
                notification.destroy('upload-progress-notification')
                setSpinning(false)
                message.error('抱歉，文件上传遇到了点小问题，但别担心，您可以再试一次。')
            }
        })
    }

    const validateFile = (file) => {
        //@ts-ignore
        return axios.post(`${serverUrl()}/api/attachmentManage/temp-blob/valiate`, file, { headers: { 'RequestVerificationToken': Cookies.get("XSRF-TOKEN") } }).then(rs => rs.data);
    }

    return <>
        <Dragger
            multiple={true}
            {...props}
            withCredentials={true}
            action={`${serverUrl()}/api/attachmentManage/temp-blob/upload`}
            beforeUpload={chongfuVerify}
            customRequest={async ({ action, data, file, filename, headers, onError, onProgress, onSuccess, withCredentials }) => {
                const formData = new FormData();
                if (data) {
                    Object.keys(data).forEach(key => {

                        //@ts-ignore
                        formData.append(key, data[key]);
                    });
                }
                //@ts-ignore
                formData.append(filename, file);

                //@ts-ignore
                const uploadFunc = file.size > multiUploadSize ? splitUpload : singleUpload

                uploadFunc(file, onProgress)
                    .then((res: any) => {
                        //@ts-ignore
                        onSuccess && onSuccess(res, file);
                    }).catch((error) => {
                        onError && onError(error);
                    });
            }}>
            {
                props.children
            }
        </Dragger >
        <Spin spinning={spinning} fullscreen />
    </>
};

export default DraggerUpload;
