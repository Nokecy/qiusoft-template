/**
 * BOM文档视图页面
 * 以BOM树形结构展示物料组成，并联动显示每个节点关联的文档列表
 * 路由: /appPdm/BomManagement/BomDocumentView
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Card, Space, Select, message } from 'antd';
import { BomGetBomTreeRecursiveAsync, BomGetListAsync } from '@/services/pdm/Bom';
import { BomVersionGetByMaterialCodeAsync } from '@/services/pdm/BomVersion';
import BomTreePanel from './components/BomTreePanel';
import InfoTabs from './components/InfoTabs';
import PartSelect from '../../_utils/PartSelect';
import ResizableBomPanel from '../_components/ResizableBomPanel'; // Add this

export const routeProps = {
    name: 'BOM文档视图',
};

const BomDocumentView: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [materialCode, setMaterialCode] = useState<string>('');
    const [bomId, setBomId] = useState<number | null>(null);
    const [bomVersion, setBomVersion] = useState<string>('');
    const [versions, setVersions] = useState<API.BurnAbpPdmBomManagementBomVersionsBomVersionDto[]>([]);
    const [treeData, setTreeData] = useState<API.BurnAbpPdmBomManagementBomsBomItemTreeDto[]>([]);
    const [selectedNode, setSelectedNode] = useState<API.BurnAbpPdmBomManagementBomsBomItemTreeDto | null>(null);

    // 通过物料编码查询 bomId
    const loadBomId = useCallback(async (code: string) => {
        if (!code) {
            setBomId(null);
            return;
        }

        try {
            console.log('正在查询BOM, 物料编码:', code);
            // 使用正确的 Filter 语法: materialCode=值
            const result = await BomGetListAsync({
                Filter: `materialCode=${code}`,
                MaxResultCount: 10,
                SkipCount: 0,
            });
            console.log('BOM查询结果:', result);

            if (result?.items && result.items.length > 0) {
                const bom = result.items[0];
                console.log('找到BOM:', { id: bom.id, materialCode: bom.materialCode });
                setBomId(bom.id || null);
            } else {
                console.warn('未找到BOM');
                setBomId(null);
                message.warning(`未找到物料 ${code} 的BOM`);
            }
        } catch (error: any) {
            console.error('查询BOM失败:', error);
            message.error('查询BOM失败');
            setBomId(null);
        }
    }, []);

    // 加载版本列表
    const loadVersions = useCallback(async (code: string) => {
        if (!code) {
            setVersions([]);
            setBomVersion('');
            return;
        }

        try {
            console.log('正在查询版本, 物料编码:', code);
            const result = await BomVersionGetByMaterialCodeAsync({ materialCode: code });
            console.log('版本查询结果:', result);

            if (result?.items && result.items.length > 0) {
                setVersions(result.items);
                // 自动选择第一个版本
                if (result.items[0].version) {
                    console.log('自动选择版本:', result.items[0].version);
                    setBomVersion(result.items[0].version);
                }
            } else {
                setVersions([]);
                setBomVersion('');
                message.warning('未找到BOM版本');
            }
        } catch (error: any) {
            console.error('查询版本失败:', error);
            message.error('查询版本失败');
            setVersions([]);
            setBomVersion('');
        }
    }, []);


    // 加载BOM树
    const loadTreeData = useCallback(async () => {
        if (!bomId || !bomVersion) {
            message.warning('请选择物料编码和版本');
            return;
        }

        setLoading(true);
        try {
            console.log('正在加载BOM树:', { bomId, bomVersion });
            const result = await BomGetBomTreeRecursiveAsync({
                bomId,
                bomVersion,
            });
            console.log('BOM树加载结果:', result);

            if (result && Array.isArray(result)) {
                setTreeData(result);
                setSelectedNode(null);
                message.success('加载成功');
            } else {
                setTreeData([]);
                message.warning('未找到BOM数据');
            }
        } catch (error: any) {
            console.error('加载BOM树失败:', error);
            const errorMsg = error?.response?.data?.error?.message || error?.message || '加载失败，请稍后重试';
            message.error(errorMsg);
            setTreeData([]);
        } finally {
            setLoading(false);
        }
    }, [bomId, bomVersion]);

    // 物料编码变化时加载bomId和版本
    useEffect(() => {
        if (materialCode) {
            loadBomId(materialCode);
            loadVersions(materialCode);
        } else {
            setBomId(null);
            setVersions([]);
            setBomVersion('');
        }
    }, [materialCode, loadBomId, loadVersions]);

    // bomId和版本变化时自动加载数据
    useEffect(() => {
        if (bomId && bomVersion) {
            loadTreeData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bomId, bomVersion]);

    return (
        <div style={{ padding: 16, background: '#fff', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Card size="small" style={{ marginBottom: 12, flexShrink: 0 }}>
                <Space wrap size="small">
                    <span style={{ fontSize: 13, color: '#595959' }}>物料编码:</span>
                    <PartSelect
                        style={{ width: 200 }}
                        size="small"
                        placeholder="请选择物料"
                        onChange={(value: any) => {
                            if (value && typeof value === 'object' && value.value) {
                                setMaterialCode(value.value);
                            } else if (typeof value === 'string') {
                                setMaterialCode(value);
                            }
                        }}
                    />

                    <span style={{ fontSize: 13, color: '#595959' }}>版本:</span>
                    <Select
                        size="small"
                        style={{ width: 130 }}
                        placeholder={materialCode ? '请选择版本' : '请先选择物料'}
                        value={bomVersion}
                        onChange={setBomVersion}
                        options={versions.map((v) => ({
                            label: v.version,
                            value: v.version,
                        }))}
                        disabled={versions.length === 0}
                        loading={!materialCode && versions.length === 0}
                    />

                    {loading && (
                        <span style={{ fontSize: 12, color: '#1890ff', marginLeft: 8 }}>
                            ⏳ 正在加载...
                        </span>
                    )}

                    {!loading && treeData.length === 0 && !materialCode && (
                        <span style={{ fontSize: 12, color: '#8c8c8c', marginLeft: 8 }}>
                            💡 请选择物料和版本，系统将自动加载BOM树
                        </span>
                    )}

                    {!loading && treeData.length === 0 && materialCode && !bomVersion && (
                        <span style={{ fontSize: 12, color: '#faad14', marginLeft: 8 }}>
                            ⚠️ 请选择版本以查看BOM树
                        </span>
                    )}

                    {!loading && treeData.length > 0 && (
                        <span style={{ fontSize: 12, color: '#52c41a', marginLeft: 8 }}>
                            ✓ 已加载 {treeData.length} 个节点
                        </span>
                    )}
                </Space>
            </Card>

            <div style={{ flex: 1, overflow: 'hidden', border: '1px solid #f0f0f0' }}>
                <ResizableBomPanel
                    leftPanel={<BomTreePanel treeData={treeData} onSelect={setSelectedNode} loading={loading} />}
                    rightPanel={<InfoTabs selectedNode={selectedNode} loading={loading} />}
                    showLeftHeader={true}
                    leftTitle="BOM结构"
                    height="100%"
                />
            </div>
        </div>
    );
};

export default BomDocumentView;
