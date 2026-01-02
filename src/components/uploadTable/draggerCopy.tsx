import { message, notification, Upload } from "antd";
import { DraggerProps } from 'antd/lib/upload';
import axios from 'axios';
import Cookies from 'js-cookie';
import React from "react";
import { serverUrl } from "umi";
const { Dragger } = Upload;
import {
    LoadingOutlined,
    SmileOutlined,
} from '@ant-design/icons';

const eachSize = 5 * 1024 * 1024;
const multiUploadSize = 5 * 1024 * 1024;

notification.config({
    top: 380
})

const DraggerUploadCopy = (props: DraggerProps & { loading?: boolean, children?: any }) => {

    const postFile: any = (param, onProgress) => {
        const formData = new FormData()
        for (let p in param) {
            formData.append(p, param[p])
        }
        //const { requestCancelQueue } = this
        const config = {
            //cancelToken: new axios.CancelToken(function executor(cancel) {
            //    if (requestCancelQueue[param.uid]) {
            //        requestCancelQueue[param.uid]()
            //        delete requestCancelQueue[param.uid]
            //    }
            //    requestCancelQueue[param.uid] = cancel
            //}),
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
        return axios.post(`${serverUrl()}/api/attachmentManage/temp-blob/upload-video-chunk`, formData, config).then(rs => {
            return { nextchunk: rs.data.nextchunk, filename: rs.data.filename };
        });
    }

    // 文件分块,利用Array.prototype.slice方法
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
        return postFile({ File: file, Uid: file.uid, FileName: file.fileName }, onProgress).then(async res => {
            try {
                const data = await validateFile({
                    Chunks: 1,
                    FileName: file.name,
                    FullSize: file.size,
                    Uid: file.uid
                })

                return data
            } catch (error) {

            }
        })
    }

    // 大文件分块上传
    const splitUpload = (file, onProgress) => {
        let EachSize = eachSize

        notification.open({
            icon: <LoadingOutlined style={{ color: '#00b96b', fontSize: 24 }} />,
            message: '文件上传中',
            btn: null,
            key: 'upload-progress-notification-copy',
            closeIcon: null,
            description:
                '您的文件正在传送中，耐心是一种美德，很快就会完成！',
            duration: 60,
            placement: 'top'
        });
        return new Promise(async (resolve, reject) => {
            try {
                const Chunks = Math.ceil(file.size / eachSize)
                const fileChunks = await splitFile(file, eachSize, Chunks)
                let currentChunk = 0
                //alert(fileChunks.length);
                for (let i = 0; i < fileChunks.length; i++) {
                    // 服务端检测已经上传到第currentChunk块了，那就直接跳到第currentChunk块，实现断点续传
                    let { nextchunk } = await postFile({
                        Chunked: true,
                        Chunk: i,
                        Chunks,
                        EachSize,
                        FileName: file.name,
                        FullSize: file.size,
                        Uid: file.uid,
                        File: fileChunks[i]
                    }, onProgress)

                }
                const data = await validateFile({
                    Chunks: fileChunks.length,
                    FileName: file.name,
                    FullSize: file.size,
                    Uid: file.uid
                })
                resolve(data)
                notification.destroy('upload-progress-notification-copy')
                message.success({
                    icon: <SmileOutlined style={{ color: '#00b96b', fontSize: 24 }} />,
                    content: '文件上传成功！感谢您的耐心，我们已成功收到您的文件。',
                })

            } catch (e) {
                reject(e)
                notification.destroy('upload-progress-notification-copy')
                message.error('抱歉，文件上传遇到了点小问题，但别担心，您可以再试一次。')
            }
        })
    }

    const validateFile = (file) => {
        //@ts-ignore
        return axios.post(`${serverUrl()}/api/attachmentManage/temp-blob/confirm-video`, file, { headers: { 'RequestVerificationToken': Cookies.get("XSRF-TOKEN") } }).then(rs => rs.data);
    }

    return <Dragger
        // multiple={true}
        {...props}
        withCredentials={true}
        action={`${serverUrl()}/api/attachmentManage/temp-blob/upload`}
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
};

export default DraggerUploadCopy
