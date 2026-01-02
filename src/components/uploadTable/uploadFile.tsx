import { Upload, message, Button, Modal, Space, Progress } from "antd"
import React, { useEffect, useRef, useState } from "react"
import { useControllableValue } from "ahooks";
import DraggerUpload from "./dragger";
import moment from "moment";
import dayjs from "dayjs";
import { serverUrl, useModel } from "@umijs/max";
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { AgGridPlus } from "@nokecy/qc-ui";
import { InboxOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { isArray } from "lodash";



const AttachmentFileContent = (props: any, ref) => {
    const { disabled, removeCallBack, changeCallBack, notDelete, hidePercent, hideDownBtn, look } = props;
    let tableRef = useRef<any>();
    const [state, setState] = useControllableValue<any>(props);
    const { initialState } = useModel("@@initialState");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

    const tranfVerifyData = () => {
        if (state && isArray(state)) {
            return state.map((i) => i.fileName || i.name)
        } else {
            return []
        }
    }

    useEffect(() => {
        setUploadedFiles(tranfVerifyData())
    }, [state])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFileChange = (info: UploadChangeParam) => {
        const { file } = info
        if (file && file.error) {
            message.error(file?.error?.message || '上传失败请稍后重试');
            return
        }
        let list = info.fileList.map((a: any) => {
            a.blobName = a.response?.filename ? a.response?.filename : a.blobName;
            a.contentType = a.contentType ? a.contentType : a.type
            a.fileName = a.fileName ? a.fileName : a.name
            a.creator = initialState?.profile.name;
            a.ceaterTime = moment().format('YYYY-MM-DD HH:mm');
            return a
        });
        setState(list)
        changeCallBack && changeCallBack(list)

    };


    useEffect(() => {
        if (notDelete || disabled) {
            columnDefs[columnDefs.length - 1] = {
                field: "options",
                headerName: "操作",
                width: 150,
                hideInTable: hideDownBtn,
                cellRenderer: (props) => {
                    return (
                        <Space onClick={(event) => {
                            event.stopPropagation();
                            event.preventDefault();
                        }}>
                            <a
                                target="_blank"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    if (props?.data.blobName) {
                                        window.open(`${serverUrl()}/api/attachmentManage/blob/by-blob-name/${props?.data.blobName}`)
                                    } else {
                                        message.error('下载失败请稍后重试')
                                    }
                                }}
                                rel="noreferrer"
                            >
                                下载
                            </a>
                        </Space>
                    );
                }
            }
        }
    }, [notDelete, disabled])

    const removeFile = (props) => {
        const { data } = props;
        const res = (fileList) => {
            removeCallBack && removeCallBack(fileList.filter(a => a.uid != data.uid));
            let files = [...fileList];
            let index = files.findIndex(a => a.uid === data.uid);
            files.splice(index, 1);
            return files;
        }
        if (data.name) {
            // 同时移除uploadedFiles中的文件
            setUploadedFiles(uploadedFiles.filter(a => a !== data.name))
        }
        setState(res)
    }

    const chongfuVerify = (file, fileList) => {
        if (uploadedFiles.includes(file.name)) {
            message.error('上传文件重复');
            return Upload.LIST_IGNORE;
        }
        uploadedFiles.push(file.name);
        setUploadedFiles(uploadedFiles)
        return true;
    }
    const columnDefs = [
        {
            field: "fileName",
            headerName: "文档名称",
            flex: 1,
            cellRenderer: ({ value, data }) => {
                return (
                    <a
                        target="_blank"
                        onClick={(event) => {
                            event.stopPropagation();
                            if (data.blobName) {
                                window.open(`${serverUrl()}/api/attachmentManage/blob/by-blob-name/${data.blobName}`)
                            } else {
                                message.error('下载失败请稍后重试')
                            }
                        }}
                        rel="noreferrer"
                    >
                        {data.name || value || data.fileName}
                    </a>
                );
            }
        },
        {
            field: "creator",
            headerName: "上传者",
            width: 100,
            hideInSearch: true
        },
        {
            field: "creationTime",
            headerName: "时间",
            width: 130,
            hideInSearch: true,
            cellRenderer: (parms) => {
                return <div>{dayjs(parms.data?.creationTime || parms.data?.ceaterTime).format('YYYY-MM-DD')}</div>
            }
        },
        {
            field: "type",
            headerName: "类型",
            width: 150,
            hide: true,
            hideInSearch: true
        },
        // {
        //     field: "size",
        //     headerName: "大小",
        //     width: 60,
        //     hideInSearch: true,
        //     cellRenderer: ({ value }) => value ? `${(value / 1024).toFixed(1)}Kb` : ''
        // },
        {
            field: "percent",
            headerName: "上传进度",
            width: 100,
            hideInTable: hidePercent,
            hideInSearch: true,
            cellRenderer: ({ value, data }) => {
                return <Progress percent={data?.id !== null ? 100 : value} />;
            }
        },
        {
            field: "options",
            headerName: "操作",
            width: 150,
            hideInTable: hideDownBtn,
            cellRenderer: (props) => {
                return (
                    <Space onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                    }}>
                        <a
                            target="_blank"
                            onClick={(event) => {
                                event.stopPropagation();
                                if (props?.data.blobName) {
                                    window.open(`${serverUrl()}/api/attachmentManage/blob/by-blob-name/${props?.data.blobName}`)
                                } else {
                                    message.error('下载失败请稍后重试')
                                }
                            }}
                            rel="noreferrer"
                        >
                            下载
                        </a>
                        <a
                            style={{ display: (disabled || notDelete) ? 'none' : undefined, color: 'red' }}
                            onClick={(event) => {
                                event.stopPropagation();
                                event.preventDefault();
                                removeFile(props);
                            }}
                        >
                            移除
                        </a>
                    </Space>
                );
            }
        }
    ];

    const Files = (props) => {
        const { state } = props;
        return <div style={{ display: 'none' }}>传递state</div>
    }

    return (
        <span ref={ref}>
            <Files state={state}></Files>
            <Button type="primary" onClick={showModal}>
                {
                    state && state.length > 0 ? '已上传文件' : '上传'
                }
            </Button>
            <Modal title="文件列表" open={isModalOpen} width={1160} onOk={handleOk} onCancel={handleCancel}>
                <DraggerUpload fileList={state} disabled={disabled} onChange={onFileChange} showUploadList={false} multiple={true} chongfuVerify={chongfuVerify}>
                    {
                        disabled || state && state.length > 0 ?
                            <div>
                                <AgGridPlus
                                    pagination={false} style={{ minHeight: 130, overflowY: 'auto', textAlign: 'left', height: state?.length * 40 }}
                                    hideTool
                                    search={false}
                                    gridRef={tableRef}
                                    dataSource={state || []}
                                    columnDefs={columnDefs}
                                >
                                </AgGridPlus>
                                <p className="ant-upload-drag-icon">
                                    <CloudUploadOutlined />
                                </p>

                            </div>
                            :
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                    }
                </DraggerUpload>
            </Modal>
        </span>)
}
export default React.forwardRef(AttachmentFileContent)