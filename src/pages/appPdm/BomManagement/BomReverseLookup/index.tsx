/**
 * BOM反查页面
 * 根据子项物料编码反向查找所有使用该物料的父项BOM
 * 路由: /appPdm/BomManagement/BomReverseLookup
 */

import React, { useState, useCallback } from 'react';
import { Card, Button, message, Space } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { BomGetParentBomsAsync } from '@/services/pdm/Bom';
import type { API } from '@/services/typings';
import SearchBar from './components/SearchBar';
import StatisticsCards from './components/StatisticsCards';
import ResultView from './components/ResultView';
import { calculateStatistics, exportToCSV } from '../_utils/reverseLookupUtils';

export const routeProps = {
    name: 'BOM反向查找',
};

const BomReverseLookup: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<API.BurnAbpPdmBomManagementBomsBomReverseLookupDto[]>([]);
    const [currentMaterialCode, setCurrentMaterialCode] = useState<string>('');

    const statistics = calculateStatistics(data);

    const handleSearch = useCallback(async (materialCode: string) => {
        setLoading(true);
        setCurrentMaterialCode(materialCode);

        try {
            const result = await BomGetParentBomsAsync({
                childMaterialCode: materialCode,
            });

            if (result && Array.isArray(result)) {
                setData(result);
                if (result.length === 0) {
                    message.info('未找到该物料的引用关系');
                } else {
                    message.success(`查询成功，找到 ${result.length} 条引用记录`);
                }
            } else {
                setData([]);
                message.warning('查询结果为空');
            }
        } catch (error) {
            console.error('查询失败:', error);
            message.error('查询失败，请稍后重试');
            setData([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleExport = useCallback(() => {
        if (data.length === 0) {
            message.warning('暂无数据可导出');
            return;
        }

        try {
            exportToCSV(data, currentMaterialCode);
            message.success('导出成功');
        } catch (error) {
            console.error('导出失败:', error);
            message.error('导出失败');
        }
    }, [data, currentMaterialCode]);

    return (
        <div style={{ padding: 16, background: '#f0f2f5', minHeight: '100vh' }}>
            <Card
                title={
                    <Space>
                        <span>BOM反向查找</span>
                        {data.length === 0 && !loading && (
                            <span style={{ fontSize: 12, color: '#999', fontWeight: 'normal' }}>
                                - 查询子项物料被哪些父项BOM引用
                            </span>
                        )}
                    </Space>
                }
                size="small"
                extra={
                    <Button
                        size="small"
                        icon={<DownloadOutlined />}
                        onClick={handleExport}
                        disabled={data.length === 0}
                    >
                        导出
                    </Button>
                }
                style={{ marginBottom: 12 }}
            >
                <SearchBar onSearch={handleSearch} loading={loading} />

                {data.length > 0 && (
                    <StatisticsCards
                        directParents={statistics.directParents}
                        totalReferences={statistics.totalReferences}
                        maxLevel={statistics.maxLevel}
                        loading={loading}
                    />
                )}

                <ResultView data={data} loading={loading} />
            </Card>
        </div>
    );
};

export default BomReverseLookup;
