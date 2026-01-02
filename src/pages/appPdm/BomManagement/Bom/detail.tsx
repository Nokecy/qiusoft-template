/**
 * BOM 详情页面 - 可拖动分隔条布局
 * 路由: /appPdm/bomManagement/detail?id={bomId}&version={version}
 * 顶部: BOM 主物料详细信息
 * 左侧: BOM 树形结构（可拖动调整宽度）
 * 右侧: 选中子项详细信息（自适应宽度）
 */

import React, { useEffect, useState, useCallback } from 'react';
import { Spin, message } from 'antd';
import { history } from 'umi';
import type { BurnAbpPdmBomManagementBomsBomDto, BurnAbpPdmBomManagementBomsBomItemDto } from '@/services/pdm/typings';
import { useKeepAliveParams } from '@/hooks';
import { fetchBomDetail, deleteBomItem } from '../_utils/bomUtils';
import BomHeaderCard from '../_components/BomHeaderCard';
import BomTree from '../_components/BomTree';
import BomItemDetail from '../_components/BomItemDetail';
import ResizableBomPanel from '../_components/ResizableBomPanel';
import BomItemForm from '../_formWidgets/BomItemForm';

export const routeProps = {
  name: 'BOM 详情',
};

const BomDetailPage: React.FC = () => {
  // 使用 KeepAlive 参数 Hook，自动处理多 Tab 切换时的参数隔离
  const { id: bomId, version: urlVersion, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/bomManagement/Bom/detail',
    ['id', 'version']
  );

  const [bomData, setBomData] = useState<BurnAbpPdmBomManagementBomsBomDto | null>(null);
  const [currentVersion, setCurrentVersion] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<BurnAbpPdmBomManagementBomsBomItemDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [treeItems, setTreeItems] = useState<BurnAbpPdmBomManagementBomsBomItemDto[]>([]);
  const [itemFormVisible, setItemFormVisible] = useState(false);
  const [itemFormData, setItemFormData] = useState<BurnAbpPdmBomManagementBomsBomItemDto | null>(null);
  const [parentItem, setParentItem] = useState<BurnAbpPdmBomManagementBomsBomItemDto | null>(null);
  const [treeRefreshKey, setTreeRefreshKey] = useState(0);
  const [previousBomId, setPreviousBomId] = useState<string>('');

  // 加载 BOM 详情
  const loadBomDetail = useCallback(async (bomId: string, version?: string) => {
    if (!bomId) {
      message.error('参数缺失');
      history.push('/appPdm/bomManagement/Bom');
      return;
    }

    setLoading(true);
    try {
      const result = await fetchBomDetail(bomId);
      if (result.success && result.data) {
        setBomData(result.data);

        // 如果传入了版本参数,设置当前版本
        if (version) {
          setCurrentVersion(version);
        }

        // 如果URL没有传version参数，则需要等待VersionSelector自动加载并设置默认版本
        // 如果传了version，currentVersion已经设置好了
      }
    } catch (error) {
      message.error('加载BOM详情失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 监听 URL 参数变化 (使用 KeepAlive Hook 自动处理路径匹配)
  useEffect(() => {
    // Hook 已自动处理路径匹配，只有当前页面活跃且参数变化时才执行
    if (!isActive || !hasChanged) {
      return;
    }

    // 检查 bomId 是否变化
    if (bomId && bomId !== previousBomId) {
      setPreviousBomId(bomId);
      setSelectedItem(null); // 重置选中项
      loadBomDetail(bomId, urlVersion);
    }
  }, [isActive, hasChanged, bomId, urlVersion, loadBomDetail, previousBomId]);

  // 版本切换
  const handleVersionChange = useCallback((version: string) => {
    setCurrentVersion(version);
    setSelectedItem(null);
  }, []);

  // 删除子项
  const handleDeleteItem = async (item: BurnAbpPdmBomManagementBomsBomItemDto) => {
    const result = await deleteBomItem(item.id!, currentVersion);
    if (result.success) {
      setSelectedItem(null);
      // 触发树的刷新
      message.success('删除成功');
    }
  };

  // 编辑子项
  const handleEditItem = useCallback((item: BurnAbpPdmBomManagementBomsBomItemDto) => {
    setItemFormData(item);
    setParentItem(null);
    setItemFormVisible(true);
  }, []);

  // 添加子项
  const handleAddItem = useCallback((parent: BurnAbpPdmBomManagementBomsBomItemDto | null) => {
    setItemFormData(null);
    setParentItem(parent);
    setItemFormVisible(true);
  }, []);

  // 刷新树
  const handleTreeRefresh = useCallback(() => {
    setTreeRefreshKey(prev => prev + 1);
  }, []);

  // 返回列表
  const handleBack = () => {
    history.push('/appPdm/bomManagement/Bom');
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 顶部信息卡片 - 优化后 */}
      <Spin spinning={loading}>
        <BomHeaderCard
          bomData={bomData}
          currentVersion={currentVersion}
          onVersionChange={handleVersionChange}
          onBack={handleBack}
          loading={loading}
        />
      </Spin>

      {/* 可拖动分隔条布局 */}
      <div style={{ flex: 1, overflow: 'hidden', padding: '0 16px 16px 16px' }}>
        {bomData && currentVersion ? (
          <ResizableBomPanel
            leftPanel={
              <BomTree
                key={treeRefreshKey}
                bomId={bomData.id || ''}
                version={currentVersion}
                onSelect={setSelectedItem}
                loading={loading}
                onDataLoaded={setTreeItems}
                onAdd={handleAddItem}
                onDelete={handleDeleteItem}
                onRefresh={handleTreeRefresh}
              />
            }
            rightPanel={
              <BomItemDetail
                item={selectedItem}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
                loading={loading}
                allItems={treeItems}
              />
            }
            height="100%"
          />
        ) : null}
      </div>

      {/* BOM 子项表单 */}
      <BomItemForm
        visible={itemFormVisible}
        bomData={bomData}
        treeItems={treeItems}
        data={itemFormData}
        parentItem={parentItem}
        version={currentVersion}
        onClose={() => {
          setItemFormVisible(false);
          setItemFormData(null);
          setParentItem(null);
        }}
        onSuccess={() => {
          setSelectedItem(null);
          handleTreeRefresh();
        }}
      />
    </div>
  );
};

export default BomDetailPage;
