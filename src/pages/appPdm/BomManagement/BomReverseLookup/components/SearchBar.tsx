import React, { useState, useCallback } from 'react';
import { Button, Space, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface SearchBarProps {
    onSearch: (materialCode: string) => void;
    loading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading = false }) => {
    const [materialCode, setMaterialCode] = useState<string>('');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);

    const handleSearch = useCallback(() => {
        if (!materialCode.trim()) {
            return;
        }

        setSearchHistory((prev) => {
            const newHistory = [materialCode, ...prev.filter((item) => item !== materialCode)];
            return newHistory.slice(0, 5);
        });

        onSearch(materialCode.trim());
    }, [materialCode, onSearch]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div style={{ marginBottom: 12 }}>
            <Space.Compact style={{ width: '100%' }}>
                <AutoComplete
                    style={{ flex: 1 }}
                    value={materialCode}
                    onChange={setMaterialCode}
                    onKeyDown={handleKeyPress}
                    options={searchHistory.map((item) => ({ value: item }))}
                    placeholder="请输入子项物料编码..."
                    size="middle"
                />
                <Button
                    type="primary"
                    size="middle"
                    icon={<SearchOutlined />}
                    onClick={handleSearch}
                    loading={loading}
                >
                    查询
                </Button>
            </Space.Compact>
        </div>
    );
};

export default SearchBar;
