/**
 * 元素面板组件 - 可拖拽的元素库
 */

import React from 'react';
import {
  FileTextOutlined,
  AlignLeftOutlined,
  BarcodeOutlined,
  LineOutlined,
  BorderInnerOutlined,
  PictureOutlined,
  BorderOuterOutlined,
} from '@ant-design/icons';
import { ElementType } from '../types';
import { Colors, Spacing, FontSize, BorderRadius, IconSize } from '../constants/designSystem';

export interface ElementPanelProps {
  onAddElement?: (type: ElementType) => void;
}

interface ElementItem {
  type: ElementType;
  name: string;
  icon: React.ReactNode;
  description?: string;
}

const elementItems: ElementItem[] = [
  {
    type: ElementType.Text,
    name: '文本',
    icon: <FileTextOutlined style={{ fontSize: IconSize.large }} />,
    description: '添加文本标签',
  },
  {
    type: ElementType.MultilineText,
    name: '多行文本',
    icon: <AlignLeftOutlined style={{ fontSize: IconSize.large }} />,
    description: '支持换行的多行文本',
  },
  {
    type: ElementType.Barcode,
    name: '条码',
    icon: <BarcodeOutlined style={{ fontSize: IconSize.large }} />,
    description: '一维码/二维码/DataMatrix',
  },
  {
    type: ElementType.Shape,
    name: '图形',
    icon: <BorderOuterOutlined style={{ fontSize: IconSize.large }} />,
    description: '矩形、圆形、三角形等',
  },
  {
    type: ElementType.Line,
    name: '线条',
    icon: <LineOutlined style={{ fontSize: IconSize.large }} />,
    description: '直线、虚线',
  },
  {
    type: ElementType.Table,
    name: '表格',
    icon: <BorderInnerOutlined style={{ fontSize: IconSize.large }} />,
    description: '表格元素',
  },
  {
    type: ElementType.Image,
    name: '图片',
    icon: <PictureOutlined style={{ fontSize: IconSize.large }} />,
    description: '图片元素',
  },
];

export const ElementPanel: React.FC<ElementPanelProps> = ({ onAddElement }) => {
  const handleDragStart = (e: React.DragEvent, type: ElementType) => {
    // 设置拖拽数据
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('application/element-type', type.toString());

    // 设置拖拽图片的透明度
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    // 恢复透明度
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
  };

  const handleClick = (type: ElementType) => {
    // 点击也可以添加元素（备用方式）
    onAddElement?.(type);
  };

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: Colors.sidebarBg,
      }}
    >
      {/* 面板标题 */}
      <div
        style={{
          padding: `${Spacing.md}px ${Spacing.md}px ${Spacing.sm}px`,
          borderBottom: `1px solid ${Colors.border}`,
          fontWeight: 500,
          fontSize: FontSize.sm,
          color: Colors.textPrimary,
        }}
      >
        元素库
        <div style={{ fontSize: FontSize.xs, color: Colors.textDisabled, marginTop: Spacing.xs, fontWeight: 'normal' }}>
          拖拽元素到画布中
        </div>
      </div>

      {/* 元素列表 */}
      <div
        style={{
          flex: 1,
          padding: `${Spacing.sm}px ${Spacing.sm}px`,
          overflowY: 'auto',
        }}
      >
        {elementItems.map((item) => (
          <div
            key={item.type}
            draggable
            onDragStart={(e) => handleDragStart(e, item.type)}
            onDragEnd={handleDragEnd}
            onClick={() => handleClick(item.type)}
            style={{
              padding: Spacing.sm,
              margin: `0 0 ${Spacing.sm}px 0`,
              background: Colors.propertyBg,
              border: `1px solid ${Colors.borderDark}`,
              borderRadius: BorderRadius.md,
              cursor: 'grab',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: Spacing.sm,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = Colors.info;
              e.currentTarget.style.boxShadow = `0 2px 8px ${Colors.info}33`;
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = Colors.borderDark;
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* 图标 */}
            <div
              style={{
                color: Colors.info,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </div>

            {/* 名称和描述 */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: FontSize.sm, fontWeight: 500, color: Colors.textPrimary }}>
                {item.name}
              </div>
              {item.description && (
                <div style={{ fontSize: FontSize.xs, color: Colors.textDisabled, marginTop: 2 }}>
                  {item.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 底部提示 */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid #f0f0f0',
          fontSize: 12,
          color: '#8c8c8c',
          background: '#fafafa',
        }}
      >
        💡 提示：可以拖拽或点击添加元素
      </div>
    </div>
  );
};
