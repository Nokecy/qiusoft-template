import React, { useRef, useState } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from '@umijs/max';
import { Button, Space, message } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import DeleteConfirm from '@/components/deleteConfirm';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { UpdateGetListAsync } from '@/services/openApi/Update';
import ClientImport from './components/importPublic';
import DemandMadel from './components/demandMadel';

/**
 * 下载中心列表
 *
 * 功能说明:
 * - 统一上传: 支持动态选择应用类型（PDA客户端/打印客户端）
 * - 智能控制: 可选择是否强制覆盖已存在文件
 * - 文件管理: 查看、下载客户端文件
 */
const DownloadManagersPage: React.FC = () => {
    const gridRef = useRef<GridRef>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [codeText, setCodeText] = useState<string>('');

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    };

    const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
        const { data } = props;

        const handleDownload = () => {
            try {
                if (data.url) {
                    const link = document.createElement('a');
                    link.href = `${window.serverUrl.apiServerUrl}${data.url}`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    message.success('开始下载');
                } else {
                    message.warning('下载链接不可用');
                }
            } catch (error) {
                message.error('下载失败');
                console.error('下载失败:', error);
            }
        };

        return (
            <Space>
                <Access accessible={!!true}>
                    <DeleteConfirm title='确定下载?' onConfirm={handleDownload}>
                        <Button size='small' icon={<CloudDownloadOutlined />} type='link' title='下载' />
                    </DeleteConfirm>
                </Access>
            </Space>
        );
    };
    const columnDefs = [
        {
            headerName: '文件名称',
            field: 'fileName',
            width: 190,
            cellRenderer: (props: ICellRendererParams) => {
                const downloadUrl = `${window.serverUrl.apiServerUrl}${props?.data?.url}`;
                return (
                    <a
                        onClick={() => {
                            setCodeText(downloadUrl);
                            setIsModalOpen(true);
                        }}
                    >
                        {props.value}
                    </a>
                );
            },
        },
        { headerName: '当前版本', field: 'version', width: 120 },
        { headerName: '最后修改时间', field: 'lastModifiedTime', width: 160, type: 'dateTimeColumn', flex: 1 },
        {
            headerName: '操作',
            field: '',
            width: 120,
            pinned: 'right',
            filter: false,
            cellRenderer: (props: any) => <Options {...props} />,
            cellRendererParams: { onRefresh }
        }
    ];

    return (
        <>
            <AgGridPlus
                gridRef={gridRef}
                headerTitle='客户端列表'
                gridKey='appSYS.downloadManagers'
                request={async (params) => {
                    try {
                        const data = await UpdateGetListAsync({
                            PageSize: params!.maxResultCount,
                            Filter: params?.filter,
                            MaxResultCount: params!.maxResultCount,
                            SkipCount: params!.skipCount,
                            Sorting: params!.sorter!
                        });
                        return {
                            success: true,
                            data: data || [],
                            total: data?.length || 0,
                        };
                    } catch (error) {
                        message.error('加载数据失败');
                        return {
                            success: false,
                            data: [],
                            total: 0,
                        };
                    }
                }}
                toolBarRender={(gridApi, filter) => {
                    return [
                        <ClientImport
                            key="quick-upload"
                            onAfterSubmit={onRefresh}
                            title="上传客户端"
                            uploadUrl={`/api/update/upload`}
                            showAppSelector={true}
                        />,
                    ];
                }}
                columnDefs={columnDefs}
            />

            <DemandMadel
                codeText={codeText}
                state={isModalOpen}
                changeFun={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default DownloadManagersPage;
export const routeProps = {
    name: '下载中心',
};
