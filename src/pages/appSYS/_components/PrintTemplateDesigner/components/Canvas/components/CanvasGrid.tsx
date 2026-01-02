/**
 * 画布网格和标尺组件
 * 负责渲染画布的网格线、水平标尺和垂直标尺
 */

import React from 'react';
import { mmToPx } from '../../../utils';
import { Colors } from '../../../constants/designSystem';
import type { TemplateSections } from '../../../types';
import { calculateAreaPositions } from '../../../utils/multiContentAreaUtils';

export interface CanvasGridProps {
  width: number; // 画布宽度（毫米）
  height: number; // 画布高度（毫米）
  dpi: number;
  displayScale: number;
  showRuler: boolean;
  showGrid: boolean;
  gridSizeMm: number; // 网格大小（毫米）
  rulerSize: number; // 标尺高度/宽度（像素）
}

/**
 * 画布网格组件
 */
export const CanvasGrid: React.FC<CanvasGridProps> = ({
  width,
  height,
  dpi,
  displayScale,
  showRuler,
  showGrid,
  gridSizeMm,
  rulerSize,
}) => {
  const canvasWidthPx = mmToPx(width, dpi) * displayScale;
  const canvasHeightPx = mmToPx(height, dpi) * displayScale;
  const gridSizePx = mmToPx(gridSizeMm, dpi) * displayScale;

  /**
   * 渲染水平标尺
   */
  const renderHorizontalRuler = () => {
    const rulerWidth = canvasWidthPx;
    const ticks: React.ReactNode[] = [];
    const tickCount = Math.ceil(width / gridSizeMm);

    for (let i = 0; i <= tickCount; i++) {
      const position = i * gridSizePx;
      const mmValue = i * gridSizeMm;

      ticks.push(
        <div
          key={i}
          style={{
            position: 'absolute',
            left: position,
            top: rulerSize - 10,
            width: 1,
            height: i % 2 === 0 ? 10 : 5, // 每2个刻度（10mm）显示粗刻度
            background: '#999',
          }}
        />
      );

      if (i % 2 === 0) { // 每2个刻度（10mm）显示标签
        ticks.push(
          <div
            key={`label-${i}`}
            style={{
              position: 'absolute',
              left: position - 15,
              top: 2,
              fontSize: 10,
              color: Colors.textSecondary,
            }}
          >
            {mmValue}
          </div>
        );
      }
    }

    return (
      <div
        style={{
          position: 'relative',
          width: rulerWidth,
          height: rulerSize,
          background: Colors.toolbarBg,
          borderBottom: `1px solid ${Colors.borderDark}`,
        }}
      >
        {ticks}
      </div>
    );
  };

  /**
   * 渲染垂直标尺
   */
  const renderVerticalRuler = () => {
    const rulerHeight = canvasHeightPx;
    const ticks: React.ReactNode[] = [];
    const tickCount = Math.ceil(height / gridSizeMm);

    for (let i = 0; i <= tickCount; i++) {
      const position = i * gridSizePx;
      const mmValue = i * gridSizeMm;

      ticks.push(
        <div
          key={i}
          style={{
            position: 'absolute',
            left: rulerSize - 10,
            top: position,
            width: i % 2 === 0 ? 10 : 5, // 每2个刻度（10mm）显示粗刻度
            height: 1,
            background: '#999',
          }}
        />
      );

      if (i % 2 === 0) { // 每2个刻度（10mm）显示标签
        ticks.push(
          <div
            key={`label-${i}`}
            style={{
              position: 'absolute',
              left: 2,
              top: position - 6,
              fontSize: 10,
              color: Colors.textSecondary,
            }}
          >
            {mmValue}
          </div>
        );
      }
    }

    return (
      <div
        style={{
          position: 'relative',
          width: rulerSize,
          height: rulerHeight,
          background: Colors.toolbarBg,
          borderRight: `1px solid ${Colors.borderDark}`,
        }}
      >
        {ticks}
      </div>
    );
  };

  if (!showRuler) {
    return null;
  }

  return (
    /* 顶部左上角空白 + 水平标尺 */
    <div style={{ display: 'flex' }}>
      <div
        style={{
          width: rulerSize,
          height: rulerSize,
          background: '#fafafa',
          borderBottom: '1px solid #d9d9d9',
          borderRight: '1px solid #d9d9d9',
        }}
      />
      {renderHorizontalRuler()}
    </div>
  );
};

/**
 * 垂直标尺组件（独立导出供父组件使用）
 */
export const CanvasVerticalRuler: React.FC<{
  height: number;
  dpi: number;
  displayScale: number;
  showRuler: boolean;
  gridSizeMm: number;
  rulerSize: number;
  sections?: TemplateSections;
  activeAreaIndex?: number;
}> = ({ height, dpi, displayScale, showRuler, gridSizeMm, rulerSize, sections, activeAreaIndex }) => {
  if (!showRuler) {
    return null;
  }

  const canvasHeightPx = mmToPx(height, dpi) * displayScale;
  const gridSizePx = mmToPx(gridSizeMm, dpi) * displayScale;
  const rulerHeight = canvasHeightPx;
  const ticks: React.ReactNode[] = [];
  const tickCount = Math.ceil(height / gridSizeMm);

  for (let i = 0; i <= tickCount; i++) {
    const position = i * gridSizePx;
    const mmValue = i * gridSizeMm;

    ticks.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          left: rulerSize - 10,
          top: position,
          width: i % 2 === 0 ? 10 : 5, // 每2个刻度（10mm）显示粗刻度
          height: 1,
          background: '#999',
        }}
      />,
    );

    if (i % 2 === 0) { // 每2个刻度（10mm）显示标签
      ticks.push(
        <div
          key={`label-${i}`}
          style={{
            position: 'absolute',
            left: 2,
            top: position - 6,
            fontSize: 10,
            color: Colors.textSecondary,
          }}
        >
          {mmValue}
        </div>,
      );
    }
  }

  // 绘制区域范围标记
  const areaMarkers: React.ReactNode[] = [];
  if (sections) {
    // 多内容区域模式
    if (sections.contentAreas && sections.contentAreas.length > 0) {
      const areaPositions = calculateAreaPositions(sections);
      const colors = ['#52c41a', '#1890ff', '#722ed1', '#eb2f96', '#fa8c16'];

      areaPositions.forEach((areaPos, index) => {
        const area = sections.contentAreas![index];
        const yPx = mmToPx(areaPos.y, dpi) * displayScale;
        const heightPx = mmToPx(areaPos.height, dpi) * displayScale;
        const color = colors[index % colors.length];
        const isActive = activeAreaIndex === index;

        // 计算结束位置(确保是数字类型)
        const endY = typeof areaPos.height === 'number' ? areaPos.y + areaPos.height : areaPos.y;

        areaMarkers.push(
          <div
            key={`area-marker-${index}`}
            style={{
              position: 'absolute',
              left: 0,
              top: yPx,
              width: 4,
              height: heightPx,
              backgroundColor: color,
              opacity: isActive ? 1 : 0.3,
              transition: 'opacity 0.2s',
              borderRadius: '0 2px 2px 0',
            }}
            title={`${area.name || `内容区域${index + 1}`} (${areaPos.y.toFixed(1)}mm - ${endY.toFixed(1)}mm)`}
          />
        );
      });
    }

    // 页头标记
    if (sections.header && sections.header.height && sections.header.height > 0) {
      const headerHeightPx = mmToPx(sections.header.height, dpi) * displayScale;
      areaMarkers.push(
        <div
          key="header-marker"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 4,
            height: headerHeightPx,
            backgroundColor: '#1890ff',
            opacity: 0.3,
            borderRadius: '0 2px 2px 0',
          }}
          title={`页头 (0mm - ${sections.header.height.toFixed(1)}mm)`}
        />
      );
    }

    // 页尾标记
    if (sections.footer && sections.footer.height && sections.footer.height > 0) {
      const footerHeight = sections.footer.height;
      const footerY = height - footerHeight;
      const footerYPx = mmToPx(footerY, dpi) * displayScale;
      const footerHeightPx = mmToPx(footerHeight, dpi) * displayScale;

      areaMarkers.push(
        <div
          key="footer-marker"
          style={{
            position: 'absolute',
            left: 0,
            top: footerYPx,
            width: 4,
            height: footerHeightPx,
            backgroundColor: '#722ed1',
            opacity: 0.3,
            borderRadius: '0 2px 2px 0',
          }}
          title={`页尾 (${footerY.toFixed(1)}mm - ${height.toFixed(1)}mm)`}
        />
      );
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        width: rulerSize,
        height: rulerHeight,
        background: Colors.toolbarBg,
        borderRight: `1px solid ${Colors.borderDark}`,
      }}
    >
      {ticks}
      {/* 区域范围标记层 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 4,
          height: '100%',
        }}
      >
        {areaMarkers}
      </div>
    </div>
  );
};
