import { BomGetListAsync, BomCompareCrossBomAsync } from '@/services/pdm/Bom';
import { SwapOutlined, FileExcelOutlined, ReloadOutlined } from '@ant-design/icons';
import { Card, Row, Col, Button, Space, Checkbox, Select, Statistic, Tag, message, Empty, Tooltip } from 'antd';
import * as XLSX from 'xlsx';
import React, { useState, useEffect } from 'react';
import VersionSelector from './VersionSelector';
import type {
    BurnAbpPdmBomManagementCrossBomCompareResultDto,
    BurnAbpPdmBomManagementCrossBomItemCompareDto,
} from '@/services/pdm/typings';
import { AgGridColumn, AgGridPlus } from '@/components/agGrid';

// 跨BOM差异类型枚举
const CrossBomDifferenceType = {
    Same: 0,           // 相同
    ValueDifferent: 1, // 值不同
    Missing: 2,        // 缺失
} as const;

// 差异类型配置
const crossDifferenceTypeConfig = {
    [CrossBomDifferenceType.Same]: { label: '相同', icon: '⚪', color: '#8c8c8c', bg: '#ffffff' },
    [CrossBomDifferenceType.ValueDifferent]: { label: '值不同', icon: '🟡', color: '#faad14', bg: '#fffbe6' },
    [CrossBomDifferenceType.Missing]: { label: '缺失', icon: '🔴', color: '#ff4d4f', bg: '#fff1f0' },
};

interface CrossBomComparatorProps {
    onCompareComplete?: (data: BurnAbpPdmBomManagementCrossBomCompareResultDto) => void;
}

const CrossBomComparator: React.FC<CrossBomComparatorProps> = ({ onCompareComplete }) => {
    const [loading, setLoading] = useState(false);
    const [comparisonData, setComparisonData] = useState<BurnAbpPdmBomManagementCrossBomCompareResultDto | null>(null);

    // 基准BOM
    const [baseBom, setBaseBom] = useState<any>(null);
    const [baseVersion, setBaseVersion] = useState<string>('');

    // 比较BOM
    const [compareBom, setCompareBom] = useState<any>(null);
    const [compareVersion, setCompareVersion] = useState<string>('');

    // 筛选选项
    const [showSame, setShowSame] = useState(true);
    const [showValueDifferent, setShowValueDifferent] = useState(true);
    const [showMissing, setShowMissing] = useState(true);

    // BOM搜索相关
    const [bomOptions, setBomOptions] = useState<any[]>([]);
    const [bomSearchLoading, setBomSearchLoading] = useState(false);

    // 加载BOM列表
    const loadBomList = async (searchKeyword?: string) => {
        setBomSearchLoading(true);
        try {
            const result = await BomGetListAsync({
                Filter: searchKeyword || undefined,
                MaxResultCount: 20,
            });
            const options = (result.items || []).map((item: any) => ({
                label: `${item.materialCode} - ${item.materialDescription || ''}`,
                value: item.id,
                data: item,
            }));
            setBomOptions(options);
        } catch (error) {
            console.error('加载BOM列表失败:', error);
        } finally {
            setBomSearchLoading(false);
        }
    };

    // 初始加载
    useEffect(() => {
        loadBomList();
    }, []);

    // 基准BOM选择变化
    const handleBaseBomChange = async (value: number) => {
        const option = bomOptions.find(opt => opt.value === value);
        if (option) {
            setBaseBom(option.data);
            setBaseVersion('');
        }
    };

    // 比较BOM选择变化
    const handleCompareBomChange = async (value: number) => {
        const option = bomOptions.find(opt => opt.value === value);
        if (option) {
            setCompareBom(option.data);
            setCompareVersion('');
        }
    };

    // BOM搜索
    const handleBomSearch = (value: string) => {
        if (value) {
            loadBomList(value);
        } else {
            loadBomList();
        }
    };

    // 执行比对操作
    const handleCompare = async () => {
        if (!baseBom || !compareBom) {
            message.warning('请选择基准BOM和比较BOM');
            return;
        }
        if (!baseVersion || !compareVersion) {
            message.warning('请选择两个BOM的版本号');
            return;
        }
        if (baseBom.materialCode === compareBom.materialCode) {
            message.warning('基准BOM和比较BOM不能是同一个物料，请使用版本比对功能');
            return;
        }

        setLoading(true);
        try {
            const result = await BomCompareCrossBomAsync({
                baseMaterialCode: baseBom.materialCode,
                baseVersion,
                compareMaterialCode: compareBom.materialCode,
                compareVersion,
                includeUnchanged: true,
            });
            setComparisonData(result);
            onCompareComplete?.(result);
            message.success('比对完成');
        } catch (error) {
            message.error('比对失败，请重试');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // 互换基准和比较BOM
    const handleSwapBom = () => {
        const tempBom = baseBom;
        const tempVersion = baseVersion;
        setBaseBom(compareBom);
        setBaseVersion(compareVersion);
        setCompareBom(tempBom);
        setCompareVersion(tempVersion);
        // 清空之前的比对结果
        setComparisonData(null);
    };

    // 导出Excel
    const handleExportExcel = () => {
        if (!comparisonData) {
            message.warning('请先执行比对');
            return;
        }

        try {
            // 准备导出数据
            const exportData: any[] = [];
            const baseItems = filterData(comparisonData.baseItems) || [];
            const compareItems = filterData(comparisonData.compareItems) || [];
            const maxLength = Math.max(baseItems.length, compareItems.length);

            for (let i = 0; i < maxLength; i++) {
                const baseItem = baseItems[i];
                const compareItem = compareItems[i];

                const getDiffTypeLabel = (type: number | undefined) => {
                    if (type === undefined) return '';
                    const config = crossDifferenceTypeConfig[type as keyof typeof crossDifferenceTypeConfig];
                    return config?.label || '';
                };

                exportData.push({
                    '基准-状态': baseItem ? getDiffTypeLabel(baseItem.differenceType) : '',
                    '基准-序号': baseItem?.sequence || '',
                    '基准-物料编码': baseItem?.childMaterialCode || '',
                    '基准-名称': baseItem?.childMaterialDescription || '',
                    '基准-数量': baseItem?.quantity || '',
                    '基准-单位': baseItem?.unitOfMeasure || '',
                    '比较-状态': compareItem ? getDiffTypeLabel(compareItem.differenceType) : '',
                    '比较-序号': compareItem?.sequence || '',
                    '比较-物料编码': compareItem?.childMaterialCode || '',
                    '比较-名称': compareItem?.childMaterialDescription || '',
                    '比较-数量': compareItem?.quantity || '',
                    '比较-单位': compareItem?.unitOfMeasure || '',
                });
            }

            // 创建工作簿
            const worksheet = XLSX.utils.json_to_sheet(exportData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'BOM结构对照');

            // 设置列宽
            worksheet['!cols'] = [
                { wch: 10 }, { wch: 8 }, { wch: 15 }, { wch: 20 }, { wch: 10 }, { wch: 8 },
                { wch: 10 }, { wch: 8 }, { wch: 15 }, { wch: 20 }, { wch: 10 }, { wch: 8 },
            ];

            // 生成文件名
            const baseName = comparisonData.baseBom?.materialCode || 'Base';
            const compareName = comparisonData.compareBom?.materialCode || 'Compare';
            const fileName = `BOM结构对照_${baseName}_vs_${compareName}_${new Date().toISOString().slice(0, 10)}.xlsx`;

            // 导出文件
            XLSX.writeFile(workbook, fileName);
            message.success('导出成功');
        } catch (error) {
            console.error('导出失败:', error);
            message.error('导出失败');
        }
    };

    // 差异类型渲染器
    const differenceTypeRenderer = (params: any) => {
        const type = params.value as number;
        const config = crossDifferenceTypeConfig[type as keyof typeof crossDifferenceTypeConfig];
        if (!config) return null;

        return (
            <Tag color={config.color} style={{ marginLeft: 0 }}>
                <span style={{ marginRight: 4 }}>{config.icon}</span>
                {config.label}
            </Tag>
        );
    };

    // 行样式设置
    const getRowStyle = (params: any) => {
        const item = params.data as BurnAbpPdmBomManagementCrossBomItemCompareDto;
        const config = crossDifferenceTypeConfig[item.differenceType as keyof typeof crossDifferenceTypeConfig];
        return config ? { background: config.bg } : {};
    };

    // 过滤数据
    const filterData = (data: BurnAbpPdmBomManagementCrossBomItemCompareDto[] | undefined) => {
        if (!data) return [];
        return data.filter(item => {
            if (item.differenceType === CrossBomDifferenceType.Same && !showSame) return false;
            if (item.differenceType === CrossBomDifferenceType.ValueDifferent && !showValueDifferent) return false;
            if (item.differenceType === CrossBomDifferenceType.Missing && !showMissing) return false;
            return true;
        });
    };

    return (
        <div>
            {/* 选择器区域 */}
            <Card style={{ marginBottom: 16 }}>
                <Row gutter={16} align="middle">
                    {/* 基准BOM选择 */}
                    <Col span={5}>
                        <Space direction="vertical" style={{ width: '100%' }} size={4}>
                            <label style={{ fontSize: 12, color: '#666' }}>基准对象</label>
                            <Select
                                showSearch
                                placeholder="请选择基准BOM"
                                style={{ width: '100%' }}
                                options={bomOptions}
                                loading={bomSearchLoading}
                                filterOption={false}
                                onSearch={handleBomSearch}
                                onChange={handleBaseBomChange}
                                value={baseBom?.id}
                                notFoundContent={bomSearchLoading ? '加载中...' : '未找到匹配的BOM'}
                            />
                        </Space>
                    </Col>
                    <Col span={4}>
                        <Space direction="vertical" style={{ width: '100%' }} size={4}>
                            <label style={{ fontSize: 12, color: '#666' }}>BOM类型</label>
                            <VersionSelector
                                materialCode={baseBom?.materialCode}
                                currentVersion={baseVersion}
                                onChange={setBaseVersion}
                                disabled={!baseBom}
                                placeholder="选择版本"
                                style={{ width: '100%' }}
                            />
                        </Space>
                    </Col>

                    {/* 中间转换按钮 */}
                    <Col span={1} style={{ textAlign: 'center' }}>
                        <Tooltip title="互换基准和比较对象">
                            <Button
                                type="text"
                                icon={<SwapOutlined style={{ fontSize: 24 }} />}
                                onClick={handleSwapBom}
                                disabled={!baseBom && !compareBom}
                                style={{ color: '#1890ff' }}
                            />
                        </Tooltip>
                    </Col>

                    {/* 比较BOM选择 */}
                    <Col span={5}>
                        <Space direction="vertical" style={{ width: '100%' }} size={4}>
                            <label style={{ fontSize: 12, color: '#666' }}>比较对象</label>
                            <Select
                                showSearch
                                placeholder="请选择比较BOM"
                                style={{ width: '100%' }}
                                options={bomOptions}
                                loading={bomSearchLoading}
                                filterOption={false}
                                onSearch={handleBomSearch}
                                onChange={handleCompareBomChange}
                                value={compareBom?.id}
                                notFoundContent={bomSearchLoading ? '加载中...' : '未找到匹配的BOM'}
                            />
                        </Space>
                    </Col>
                    <Col span={4}>
                        <Space direction="vertical" style={{ width: '100%' }} size={4}>
                            <label style={{ fontSize: 12, color: '#666' }}>BOM类型</label>
                            <VersionSelector
                                materialCode={compareBom?.materialCode}
                                currentVersion={compareVersion}
                                onChange={setCompareVersion}
                                disabled={!compareBom}
                                placeholder="选择版本"
                                style={{ width: '100%' }}
                            />
                        </Space>
                    </Col>

                    {/* 操作按钮区 */}
                    <Col span={5}>
                        <Space direction="vertical" style={{ width: '100%' }} size={4}>
                            <Space size="small">
                                <Checkbox checked={showSame} onChange={e => setShowSame(e.target.checked)}>
                                    <span style={{ color: '#8c8c8c' }}>⚪ 相同</span>
                                </Checkbox>
                                <Checkbox checked={showValueDifferent} onChange={e => setShowValueDifferent(e.target.checked)}>
                                    <span style={{ color: '#faad14' }}>🟡 值不同</span>
                                </Checkbox>
                                <Checkbox checked={showMissing} onChange={e => setShowMissing(e.target.checked)}>
                                    <span style={{ color: '#ff4d4f' }}>🔴 缺失</span>
                                </Checkbox>
                            </Space>
                            <Button
                                type="primary"
                                icon={<SwapOutlined />}
                                loading={loading}
                                disabled={!baseBom || !compareBom || !baseVersion || !compareVersion}
                                onClick={handleCompare}
                            >
                                开始比对
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Card>

            {/* 差异统计卡片 */}
            {comparisonData && (
                <Card
                    style={{ marginBottom: 16 }}
                    bodyStyle={{ padding: '12px 24px' }}
                    extra={
                        <Button
                            icon={<FileExcelOutlined />}
                            onClick={handleExportExcel}
                        >
                            导出Excel
                        </Button>
                    }
                >
                    <Row gutter={16}>
                        <Col span={4}>
                            <Statistic
                                title="相同项"
                                value={comparisonData.statistics?.sameCount || 0}
                                valueStyle={{ color: '#8c8c8c' }}
                                prefix="⚪"
                            />
                        </Col>
                        <Col span={4}>
                            <Statistic
                                title="值不同"
                                value={comparisonData.statistics?.valueDifferentCount || 0}
                                valueStyle={{ color: '#faad14' }}
                                prefix="🟡"
                            />
                        </Col>
                        <Col span={4}>
                            <Statistic
                                title="基准独有"
                                value={comparisonData.statistics?.baseMissingCount || 0}
                                valueStyle={{ color: '#ff4d4f' }}
                                prefix="🔴"
                            />
                        </Col>
                        <Col span={4}>
                            <Statistic
                                title="比较独有"
                                value={comparisonData.statistics?.compareMissingCount || 0}
                                valueStyle={{ color: '#ff4d4f' }}
                                prefix="🔴"
                            />
                        </Col>
                        <Col span={4}>
                            <Statistic
                                title="基准BOM总数"
                                value={comparisonData.statistics?.baseTotalCount || 0}
                            />
                        </Col>
                        <Col span={4}>
                            <Statistic
                                title="比较BOM总数"
                                value={comparisonData.statistics?.compareTotalCount || 0}
                            />
                        </Col>
                    </Row>
                </Card>
            )}

            {/* 并排显示两个BOM的比对结果 */}
            {comparisonData ? (
                <Row gutter={16}>
                    {/* 基准BOM */}
                    <Col span={12}>
                        <Card
                            title={
                                <Space>
                                    <span>基准BOM</span>
                                    <Tag color="blue">{comparisonData.baseBom?.materialCode}</Tag>
                                    <span style={{ color: '#999', fontSize: 12 }}>
                                        版本: {comparisonData.baseBom?.version}
                                    </span>
                                </Space>
                            }
                            style={{ height: 'calc(100vh - 420px)', minHeight: 400 }}
                            bodyStyle={{ height: 'calc(100% - 57px)', padding: 0 }}
                        >
                            <div style={{ height: '100%' }}>
                                <AgGridPlus
                                    gridKey="appPdm.BomManagement.BomCrossComparison.Base"
                                    dataSource={filterData(comparisonData.baseItems)}
                                    rowHeight={40}
                                    getRowStyle={getRowStyle}
                                    toolBarRender={false}
                                    search={false}
                                >
                                    <AgGridColumn
                                        field="differenceType"
                                        headerName="状态"
                                        width={100}
                                        cellRenderer={differenceTypeRenderer}
                                        pinned="left"
                                    />
                                    <AgGridColumn
                                        field="sequence"
                                        headerName="序号"
                                        width={80}
                                    />
                                    <AgGridColumn
                                        field="childMaterialCode"
                                        headerName="物料编码"
                                        width={150}
                                    />
                                    <AgGridColumn
                                        field="childMaterialDescription"
                                        headerName="名称"
                                        width={180}
                                    />
                                    <AgGridColumn
                                        field="quantity"
                                        headerName="数量"
                                        width={80}
                                    />
                                    <AgGridColumn
                                        field="unitOfMeasure"
                                        headerName="单位"
                                        width={80}
                                    />
                                </AgGridPlus>
                            </div>
                        </Card>
                    </Col>

                    {/* 比较BOM */}
                    <Col span={12}>
                        <Card
                            title={
                                <Space>
                                    <span>比较BOM</span>
                                    <Tag color="green">{comparisonData.compareBom?.materialCode}</Tag>
                                    <span style={{ color: '#999', fontSize: 12 }}>
                                        版本: {comparisonData.compareBom?.version}
                                    </span>
                                </Space>
                            }
                            style={{ height: 'calc(100vh - 420px)', minHeight: 400 }}
                            bodyStyle={{ height: 'calc(100% - 57px)', padding: 0 }}
                        >
                            <div style={{ height: '100%' }}>
                                <AgGridPlus
                                    gridKey="appPdm.BomManagement.BomCrossComparison.Compare"
                                    dataSource={filterData(comparisonData.compareItems)}
                                    rowHeight={40}
                                    getRowStyle={getRowStyle}
                                    toolBarRender={false}
                                    search={false}
                                >
                                    <AgGridColumn
                                        field="differenceType"
                                        headerName="状态"
                                        width={100}
                                        cellRenderer={differenceTypeRenderer}
                                        pinned="left"
                                    />
                                    <AgGridColumn
                                        field="sequence"
                                        headerName="序号"
                                        width={80}
                                    />
                                    <AgGridColumn
                                        field="childMaterialCode"
                                        headerName="物料编码"
                                        width={150}
                                    />
                                    <AgGridColumn
                                        field="childMaterialDescription"
                                        headerName="名称"
                                        width={180}
                                    />
                                    <AgGridColumn
                                        field="quantity"
                                        headerName="数量"
                                        width={80}
                                    />
                                    <AgGridColumn
                                        field="unitOfMeasure"
                                        headerName="单位"
                                        width={80}
                                    />
                                </AgGridPlus>
                            </div>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <Card style={{ minHeight: 400 }}>
                    <Empty
                        description="请选择两个不同的BOM及其版本后点击比对按钮开始结构对照"
                        style={{ marginTop: 80 }}
                    />
                </Card>
            )}
        </div>
    );
};

export default CrossBomComparator;
