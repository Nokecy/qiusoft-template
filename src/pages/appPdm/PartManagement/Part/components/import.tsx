import { Alert, Button, message, Modal, Upload, Select, Space } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useBoolean } from 'ahooks';
import { downloadBlob } from '@/_utils';
import { request } from 'umi';
import { PartCategoryGetTreeAsync } from '@/services/pdm/PartCategory';

interface ImportProps {
    categoryCode?: string;
    onAfterSubmit?: () => void;
}

// 将树形数据扁平化为选项
const flattenTreeToOptions = (tree: any[]): { label: string; value: string }[] => {
    const options: { label: string; value: string }[] = [];
    const traverse = (nodes: any[], prefix = '') => {
        nodes.forEach(node => {
            const label = prefix + (node.categoryName || node.categoryCode || '-');
            options.push({
                label,
                value: node.categoryCode || String(node.id),
            });
            if (node.children && node.children.length > 0) {
                traverse(node.children, label + ' / ');
            }
        });
    };
    traverse(tree);
    return options;
};

const Import: React.FC<ImportProps> = (props) => {
    const { categoryCode: defaultCategoryCode, onAfterSubmit } = props;
    const [visible, { setTrue, setFalse }] = useBoolean(false);
    const [selectedCategoryCode, setSelectedCategoryCode] = useState<string | undefined>(defaultCategoryCode);
    const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        if (visible) {
            PartCategoryGetTreeAsync().then(res => {
                const options = flattenTreeToOptions(res || []);
                setCategoryOptions(options);
            });
        }
    }, [visible]);

    const handleDownloadTemplate = () => {
        if (!selectedCategoryCode) {
            message.warning('请先选择物料分类');
            return;
        }
        const url = `/api/pdm/part/import-template?categoryCode=${encodeURIComponent(selectedCategoryCode)}`;
        downloadBlob(url, '批量导入物料模版.xlsx');
    };

    return (
        <>
            <Button icon={<InboxOutlined />} onClick={setTrue}>导入</Button>

            <Modal title={'批量导入物料'} open={visible} onCancel={setFalse} destroyOnClose footer={null}>
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                    <div>
                        <div style={{ marginBottom: 8, fontWeight: 500 }}>选择物料分类</div>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="请选择物料分类"
                            value={selectedCategoryCode}
                            onChange={setSelectedCategoryCode}
                            options={categoryOptions}
                            showSearch
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </div>

                    <Alert
                        message={
                            <span>
                                点击下载{' '}
                                <a onClick={handleDownloadTemplate}>
                                    模版
                                </a>
                                {selectedCategoryCode && <span style={{ marginLeft: 8, color: '#666' }}>(已选分类)</span>}
                            </span>
                        }
                        type={'info'}
                    />

                    <Upload.Dragger
                        multiple={false}
                        action="/api/pdm/part/import"
                        customRequest={({ action, file, onError, onProgress, onSuccess }) => {
                            const formData = new FormData();
                            formData.append('file', file);
                            request(action as string, {
                                method: 'POST',
                                data: formData,
                                onUploadProgress: ({ total, loaded }) => {
                                    onProgress && onProgress({ percent: Math.round(loaded / (total || 1) * 100) } as any);
                                },
                            }).then(response => {
                                onSuccess && onSuccess(response, file as any);
                            }).catch(onError);
                        }}
                        onChange={info => {
                            if (info.file.status === 'done') {
                                const response = info.file.response;
                                if (response && response.failureCount > 0) {
                                    Modal.error({
                                        title: '导入失败',
                                        width: 600,
                                        content: (
                                            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                                                <p>成功: {response.successCount} 条, 失败: {response.failureCount} 条</p>
                                                {response.errors && response.errors.length > 0 && (
                                                    <div style={{ marginTop: 10 }}>
                                                        {response.errors.map((err: any, index: number) => (
                                                            <div key={index} style={{ marginBottom: 8, padding: '8px', background: '#fff1f0', border: '1px solid #ffccc7', borderRadius: '4px' }}>
                                                                <div><strong>行号:</strong> {err.rowNumber}</div>
                                                                <div><strong>字段:</strong> {err.fieldName}</div>
                                                                <div style={{ color: '#cf1322' }}>{err.errorMessage}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ),
                                    });
                                } else {
                                    message.success('导入成功');
                                    setFalse();
                                    if (onAfterSubmit) onAfterSubmit();
                                }
                            } else if (info.file.status === 'error') {
                                message.error(`${info.file.name} 导入失败.`);
                            }
                        }}
                    >
                        <p className='ant-upload-drag-icon'>
                            <InboxOutlined />
                        </p>
                        <p className='ant-upload-text'>单击或拖动文件到该区域上传</p>
                    </Upload.Dragger>
                </Space>
            </Modal>
        </>
    );
};

export default Import;
