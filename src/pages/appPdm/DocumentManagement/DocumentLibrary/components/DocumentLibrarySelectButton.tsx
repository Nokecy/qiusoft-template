import React, { useState, useEffect } from 'react';
import { Input, Button, Space } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import DocumentLibrarySelectDialog from './DocumentLibrarySelectDialog';
import { DocumentLibraryGetAsync } from '@/services/pdm/DocumentLibrary';

// 文档库类型枚举
enum DocumentLibraryType {
    Storage = 1,  // 存储库
    Recycle = 2,  // 回收库
}

interface DocumentLibrarySelectButtonProps {
    value?: string; // 文档库ID
    onChange?: (value: string | undefined) => void;
    libraryType?: DocumentLibraryType; // 文档库类型筛选
    placeholder?: string;
    disabled?: boolean;
    allowClear?: boolean;
    style?: React.CSSProperties;
}

const DocumentLibrarySelectButton: React.FC<DocumentLibrarySelectButtonProps> = (props) => {
    const {
        value,
        onChange,
        libraryType,
        placeholder = '请选择',
        disabled = false,
        allowClear = true,
        style,
    } = props;

    const [dialogVisible, setDialogVisible] = useState(false);
    const [displayName, setDisplayName] = useState<string>('');
    const [loading, setLoading] = useState(false);

    // 当 value 变化时，加载对应的文档库名称
    useEffect(() => {
        if (value) {
            setLoading(true);
            DocumentLibraryGetAsync({ id: value })
                .then((res) => {
                    setDisplayName(res?.libraryName || '');
                })
                .catch(() => {
                    setDisplayName('');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setDisplayName('');
        }
    }, [value]);

    // 打开选择弹窗
    const handleOpenDialog = () => {
        if (!disabled) {
            setDialogVisible(true);
        }
    };

    // 确认选择
    const handleConfirm = (library: any) => {
        if (library) {
            setDisplayName(library.libraryName || '');
            onChange?.(library.id);
        }
        setDialogVisible(false);
    };

    // 清除选择
    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDisplayName('');
        onChange?.(undefined);
    };

    return (
        <>
            <Space.Compact style={{ width: '100%', ...style }}>
                <Input
                    value={displayName}
                    placeholder={loading ? '加载中...' : placeholder}
                    readOnly
                    disabled={disabled}
                    style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
                    onClick={handleOpenDialog}
                    suffix={
                        allowClear && value && !disabled ? (
                            <CloseCircleOutlined
                                style={{ color: '#999', cursor: 'pointer' }}
                                onClick={handleClear}
                            />
                        ) : null
                    }
                />
                <Button
                    icon={<SearchOutlined />}
                    disabled={disabled}
                    onClick={handleOpenDialog}
                />
            </Space.Compact>

            <DocumentLibrarySelectDialog
                visible={dialogVisible}
                onCancel={() => setDialogVisible(false)}
                onConfirm={handleConfirm}
                libraryType={libraryType}
            />
        </>
    );
};

export default DocumentLibrarySelectButton;
