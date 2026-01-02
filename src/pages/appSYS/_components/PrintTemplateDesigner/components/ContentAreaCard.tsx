/**
 * ContentAreaCard.tsx
 * 内容区域卡片组件
 * 用于显示和编辑单个内容区域的配置信息
 */

import React, { useState } from 'react';
import {
  Card,
  Button,
  Space,
  Tag,
  Alert,
  Tooltip,
  Popconfirm,
  Drawer,
} from 'antd';
import {
  HolderOutlined,
  CopyOutlined,
  DeleteOutlined,
  PushpinOutlined,
  ArrowDownOutlined,
  ColumnHeightOutlined,
  DatabaseOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { SectionConfig } from '../types';
import { YPositionMode } from '../types';
import { calculateActualY } from '../utils/multiContentAreaUtils';
import type { LayoutConflict } from '../utils/multiContentAreaUtils';
import { SectionConfigPanel } from './SectionConfigPanel';

export interface ContentAreaCardProps {
  area: SectionConfig;
  index: number;
  isActive: boolean;
  conflicts: LayoutConflict[];
  previousAreas: SectionConfig[];
  headerHeight: number;
  onUpdate: (area: SectionConfig) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onActivate: () => void;
  dragHandleProps?: any; // 拖拽手柄属性
  dataSources: Record<string, import('../types').AtlDataSource>;
  canvasWidth: number;
  areaElements: import('../types').AtlElement[];
}

/**
 * 内容区域卡片组件
 */
export const ContentAreaCard: React.FC<ContentAreaCardProps> = ({
  area,
  index,
  isActive,
  conflicts,
  previousAreas,
  headerHeight,
  onUpdate,
  onDelete,
  onDuplicate,
  onActivate,
  dragHandleProps,
  dataSources,
  canvasWidth,
  areaElements,
}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [originalConfig, setOriginalConfig] = useState<SectionConfig>(area);
  const actualY = calculateActualY(area, previousAreas, headerHeight);

  // 打开配置抽屉
  const handleOpenDrawer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOriginalConfig(area); // 保存原始配置用于取消时恢复
    setDrawerVisible(true);
  };

  // 实时更新配置（在抽屉中修改时立即生效）
  const handleChange = (updatedConfig: SectionConfig) => {
    console.log('[ContentAreaCard] handleChange:', updatedConfig);
    onUpdate(updatedConfig); // 立即更新
  };

  // 确认配置
  const handleConfirm = () => {
    // 配置已经实时更新了，直接关闭抽屉
    setDrawerVisible(false);
  };

  // 取消配置
  const handleCancel = () => {
    onUpdate(originalConfig); // 恢复原始配置
    setDrawerVisible(false);
  };

  const hasConflicts = conflicts.length > 0;
  const cardClassName = hasConflicts
    ? 'content-area-card-error'
    : isActive
    ? 'content-area-card-active'
    : 'content-area-card-default';

  // 调试日志
  console.log('[ContentAreaCard] Render:', {
    index,
    areaName: area.name,
    yPositionMode: area.yPositionMode,
    yPositionModeType: typeof area.yPositionMode,
    isFixed: area.yPositionMode === YPositionMode.Fixed,
    isZero: area.yPositionMode === 0,
    YPositionModeEnum: YPositionMode,
  });

  return (
    <Card
      size="small"
      className={`content-area-card ${cardClassName}`}
      onClick={onActivate}
      style={{
        borderColor: hasConflicts
          ? '#ff4d4f'
          : isActive
          ? '#1890ff'
          : '#d9d9d9',
        backgroundColor: hasConflicts
          ? '#fff1f0'
          : isActive
          ? '#e6f7ff'
          : '#fff',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        marginBottom: 12,
      }}
    >
      {/* 顶部拖拽条 + 标题 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 8,
          gap: 8,
        }}
      >
        <div
          className="drag-handle"
          style={{ cursor: 'grab', color: '#8c8c8c' }}
          {...dragHandleProps}
        >
          <HolderOutlined />
        </div>
        <div style={{ flex: 1, fontWeight: 'bold', fontSize: 14 }}>
          {area.name || `内容区域${index + 1}`}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <Tooltip title="配置区域">
            <Button
              type="text"
              size="small"
              icon={<SettingOutlined />}
              onClick={handleOpenDrawer}
            />
          </Tooltip>
          <Tooltip title="复制区域">
            <Button
              type="text"
              size="small"
              icon={<CopyOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
              }}
            />
          </Tooltip>
          <Tooltip title="删除区域">
            <Popconfirm
              title="确认删除此内容区域？"
              description={
                area.elementIds?.length
                  ? `此区域包含${area.elementIds.length}个元素，删除后元素将移至未分配区域。`
                  : undefined
              }
              onConfirm={(e) => {
                e?.stopPropagation();
                onDelete();
              }}
              okText="确认删除"
              cancelText="取消"
            >
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={(e) => e.stopPropagation()}
              />
            </Popconfirm>
          </Tooltip>
        </div>
      </div>

      {/* 快速信息显示 */}
      <div style={{ marginBottom: hasConflicts ? 8 : 0 }}>
        <Space size="small" wrap>
          {/* Y轴定位模式 */}
          {area.yPositionMode === YPositionMode.Fixed || area.yPositionMode === 0 ? (
            <Tag icon={<PushpinOutlined />} color="blue">
              📍 固定定位 Y={area.fixedY?.toFixed(1)}mm
            </Tag>
          ) : (
            <Tag icon={<ArrowDownOutlined />} color="cyan">
              ⬇️ 自动跟随 间距={area.spacingAfterPrevious?.toFixed(1)}mm
            </Tag>
          )}

          {/* 高度 */}
          <Tag icon={<ColumnHeightOutlined />}>
            H={typeof area.height === 'number' ? area.height.toFixed(1) : area.height}mm
          </Tag>

          {/* 数据源 */}
          {area.dataSourceKey && (
            <Tag icon={<DatabaseOutlined />} color="green">
              🔗 {area.dataSourceKey}
            </Tag>
          )}

          {/* 元素数量 */}
          {area.elementIds && area.elementIds.length > 0 && (
            <Tag icon={<AppstoreOutlined />}>
              {area.elementIds.length}个元素
            </Tag>
          )}
        </Space>

        {/* 冲突警告 */}
        {hasConflicts && (
          <Alert
            type="error"
            message={conflicts.map((c) => c.message).join('；')}
            showIcon
            banner
            style={{ marginTop: 8 }}
          />
        )}

        {/* 计算位置信息（辅助显示） */}
        <div
          style={{
            marginTop: 8,
            fontSize: 12,
            color: '#8c8c8c',
          }}
        >
          实际Y坐标: {actualY.toFixed(1)}mm ~{' '}
          {typeof area.height === 'number'
            ? (actualY + area.height).toFixed(1)
            : area.height === 'auto'
              ? '自动'
              : (actualY + 0).toFixed(1)}mm
        </div>
      </div>

      {/* 配置抽屉 */}
      <Drawer
        title={`配置 - ${area.name || `内容区域${index + 1}`}`}
        placement="right"
        width={480}
        open={drawerVisible}
        onClose={handleCancel}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button onClick={handleCancel}>取消</Button>
            <Button type="primary" onClick={handleConfirm}>
              确定
            </Button>
          </div>
        }
      >
        <SectionConfigPanel
          sectionType="content"
          config={area}
          dataSources={dataSources}
          onChange={handleChange}
          canvasWidth={canvasWidth}
          sectionHeight={typeof area.height === 'number' ? area.height : 50}
          isMultiContentArea={true}
          areaIndex={index}
          previousAreas={previousAreas}
          headerHeight={headerHeight}
          sectionElements={areaElements}
        />
      </Drawer>
    </Card>
  );
};

export default ContentAreaCard;
