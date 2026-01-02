/**
 * SectionPropertyPanel 组件
 * 用于在右侧属性面板显示选中区域的属性配置
 */

import React from 'react';
import { Card, Typography, Space, Button, Divider, Tag } from 'antd';
import { LayoutOutlined, CloseOutlined } from '@ant-design/icons';
import { SectionConfigPanel } from './SectionConfigPanel';
import type { SectionType, SectionConfig, AtlDataSource, TemplateSections } from '../types';
import { SectionType as SectionTypeEnum } from '../types';
import { getSectionVisualConfig } from '../utils/sectionUtils';

const { Title, Text } = Typography;

export interface SectionPropertyPanelProps {
  sectionType: SectionType;
  sections: TemplateSections;
  dataSources: Record<string, AtlDataSource>;
  onUpdateSection: (sectionType: SectionType, config: SectionConfig) => void;
  onDisableSection: (sectionType: SectionType) => void;
  onDeselectSection: () => void;
  /** 画布宽度（毫米） */
  canvasWidth?: number;
  /** 区域高度（毫米） */
  sectionHeight?: number;
}

/**
 * SectionPropertyPanel - 区域属性面板
 * 显示选中区域的属性配置和操作按钮
 */
export const SectionPropertyPanel: React.FC<SectionPropertyPanelProps> = ({
  sectionType,
  sections,
  dataSources,
  onUpdateSection,
  onDisableSection,
  onDeselectSection,
  canvasWidth = 100,
  sectionHeight = 100,
}) => {
  // 获取区域配置
  const getSectionConfig = (): SectionConfig | undefined => {
    switch (sectionType) {
      case SectionTypeEnum.Header:
        return sections.header;
      case SectionTypeEnum.Content:
        return sections.content;
      case SectionTypeEnum.Footer:
        return sections.footer;
      default:
        return undefined;
    }
  };

  // 获取区域名称
  const getSectionName = (): string => {
    switch (sectionType) {
      case SectionTypeEnum.Header:
        return '页头区域';
      case SectionTypeEnum.Content:
        return '内容区域';
      case SectionTypeEnum.Footer:
        return '页尾区域';
      default:
        console.warn(`[SectionPropertyPanel] 收到未知的 sectionType 值:`, sectionType, typeof sectionType);
        return `未知区域 (${sectionType})`;
    }
  };

  // 检查是否可以禁用该区域
  const canDisable = (): boolean => {
    // 内容区域不能禁用
    return sectionType !== SectionTypeEnum.Content;
  };

  const visualConfig = getSectionVisualConfig(sectionType);
  const sectionConfig = getSectionConfig();

  // 处理配置变化
  const handleConfigChange = (config: SectionConfig) => {
    onUpdateSection(sectionType, config);
  };

  // 处理禁用区域
  const handleDisable = () => {
    if (canDisable()) {
      onDisableSection(sectionType);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 头部标题栏 */}
      <Card
        size="small"
        style={{ marginBottom: 16, borderColor: visualConfig.color }}
        bodyStyle={{ padding: '12px 16px' }}
      >
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space>
              <LayoutOutlined style={{ color: visualConfig.color, fontSize: 18 }} />
              <Title level={5} style={{ margin: 0 }}>
                {getSectionName()}
              </Title>
            </Space>
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={onDeselectSection}
              title="取消选择"
            />
          </div>

          <Space size={4}>
            <Tag color={visualConfig.color}>{getSectionName()}</Tag>
            {!canDisable() && <Tag color="blue">始终启用</Tag>}
          </Space>
        </Space>
      </Card>

      {/* 配置表单区域 */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Card
          title="区域配置"
          size="small"
          extra={
            canDisable() && (
              <Button
                type="link"
                danger
                size="small"
                onClick={handleDisable}
              >
                禁用区域
              </Button>
            )
          }
        >
          <SectionConfigPanel
            sectionType={sectionType}
            config={sectionConfig}
            dataSources={dataSources}
            onChange={handleConfigChange}
            canvasWidth={canvasWidth}
            sectionHeight={sectionHeight}
            isMultiContentArea={false}
          />
        </Card>

        <Divider style={{ margin: '16px 0' }} />

        {/* 说明信息 */}
        <Card size="small" title="区域说明" style={{ marginTop: 16 }}>
          <Space direction="vertical" size={12} style={{ width: '100%' }}>
            <div>
              <Text strong>区域功能：</Text>
              <div style={{ marginTop: 4, color: '#666', fontSize: 12 }}>
                {sectionType === SectionTypeEnum.Header && '页头区域显示在每页顶部，适合放置标题、公司信息等固定内容。'}
                {sectionType === SectionTypeEnum.Content && '内容区域是模板的主要内容部分，包含所有未指定区域的元素。'}
                {sectionType === SectionTypeEnum.Footer && '页尾区域显示在每页底部，适合放置页码、签名、合计等信息。'}
              </div>
            </div>

            <div>
              <Text strong>操作提示：</Text>
              <div style={{ marginTop: 4, color: '#666', fontSize: 12 }}>
                • 从元素库拖放元素到该区域，元素会自动归属到该区域
                <br />
                • 可以在属性面板中手动修改元素的所属区域
                <br />
                • 区域高度可以手动指定，或根据内部元素自动计算
              </div>
            </div>

            {sectionType !== SectionTypeEnum.Content && (
              <div>
                <Text strong>打印控制：</Text>
                <div style={{ marginTop: 4, color: '#666', fontSize: 12 }}>
                  可以通过"打印频率"设置控制该区域在多页打印时的显示规则，
                  例如仅在首页或末页显示。
                </div>
              </div>
            )}
          </Space>
        </Card>
      </div>
    </div>
  );
};
