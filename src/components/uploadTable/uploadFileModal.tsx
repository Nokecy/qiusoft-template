import DraggerUpload from "./dragger";
import { Button, Modal, Progress, Space } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import React, { useEffect, useRef, useState } from 'react';
import { serverUrl, useModel } from 'umi'
import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { useControllableValue } from "ahooks";
import { ICellRendererParams } from "ag-grid-enterprise";
import { InboxOutlined } from '@ant-design/icons';
import moment from 'dayjs'
const AttachmentUploadFileModal = (props: any, ref) => {
    const { disabled, removeCallBack, changeCallBack, notDelete, hidePercent, hideDownBtn, look } = props;
    let tableRef = useRef<any>();
    const [state, setState] = useControllableValue<any>(props);
    const { initialState } = useModel("@@initialState");
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        let list = info.fileList.map((a: any) => {
            a.blobName = a.response?.filename ? a.response?.filename : a.blobName;
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
                                onClick={(event) => { event.stopPropagation(); }}
                                href={`${serverUrl()}/api/attachmentManage/blob/by-blob-name/${props?.data.blobName}`}
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
        setState(res)
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
                        onClick={(event) => { event.stopPropagation(); }}
                        // href={`${serverUrl()}/api/attachmentManage/blob/${data.id}`}
                        href={`${serverUrl()}/api/attachmentManage/blob/by-blob-name/${data.blobName}`}
                        rel="noreferrer"
                    >
                        {data.name || value}
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
            width: 100,
            hideInSearch: true
        },
        {
            field: "type",
            headerName: "类型",
            width: 150,
            hideInSearch: true
        },
        {
            field: "size",
            headerName: "大小",
            width: 60,
            hideInSearch: true,
            cellRenderer: ({ value }) => value ? `${(value / 1024).toFixed(1)}Kb` : ''
        },
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
                            onClick={(event) => { event.stopPropagation(); }}
                            // href={`${serverUrl()}/api/attachmentManage/blob/${props?.data.id}`}
                            href={`${serverUrl()}/api/attachmentManage/blob/by-blob-name/${props?.data.blobName}`}
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

    // const renderFileImg = (fileName) => {
    //     const whiteList = [
    //         'accdb',
    //         'avi',
    //         'bmp',
    //         'css',
    //         'doc',
    //         'docx',
    //         'eml',
    //         'eps',
    //         'exe',
    //         'fla',
    //         'gif',
    //         'html',
    //         'ind',
    //         'ini',
    //         'jpeg',
    //         'jsf',
    //         'midi',
    //         'mov',
    //         'mp3',
    //         'mpeg',
    //         'ofd',
    //         'pdf',
    //         'png',
    //         'ppt',
    //         'pptx',
    //         'proj',
    //         'psd',
    //         'pst',
    //         'pub',
    //         'rar',
    //         'readme',
    //         'settings',
    //         'text',
    //         'tiff',
    //         'txt',
    //         'url',
    //         'vsd',
    //         'wav',
    //         'wma',
    //         'wmv',
    //         'xls',
    //         'xlsx',
    //         'zip'
    //     ];
    //     const name = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    //     let type = 'unknow';
    //     if (whiteList.indexOf(name) > -1) {
    //         type = name;
    //     }

    //     return require('../assets/file/' + type + '.png');
    // }

    return (
        <span ref={ref}>
            <Button type="primary" onClick={showModal}>
                上传文件
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <DraggerUpload fileList={state} disabled={disabled} onChange={onFileChange} showUploadList={false} multiple={true}>
                    {
                        state ?
                            <AgGridPlus
                                pagination={false} style={{ minHeight: 130, overflowY: 'auto', textAlign: 'left', height: state?.length * 40 }}
                                hideTool
                                search={false}
                                gridRef={tableRef}
                                dataSource={state || []}
                                columnDefs={columnDefs}
                            >
                            </AgGridPlus>
                            :
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                    }
                </DraggerUpload>
            </Modal>
        </span>)
}
export default React.forwardRef(AttachmentUploadFileModal);