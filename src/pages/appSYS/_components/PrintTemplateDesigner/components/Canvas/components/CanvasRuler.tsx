/**
 * CanvasRuler 组件
 * Y轴标尺，用于显示画布的垂直尺寸标记
 */

import React from 'react';
import type { TemplateSections } from '../../../types';
import { mmToPx } from '../../../utils';
import { calculateAreaPositions } from '../../../utils/multiContentAreaUtils';

export interface CanvasRulerProps {
  /** 画布高度（毫米） */
  height: number;
  /** DPI */
  dpi: number;
  /** 显示缩放比例 */
  displayScale: number;
  /** 区域配置 */
  sections?: TemplateSections;
  /** 当前激活的内容区域索引 */
  activeAreaIndex?: number;
}

/**
 * CanvasRuler - Y轴标尺组件
 * 显示画布的垂直尺寸标记和区域范围
 */
export const CanvasRuler: React.FC<CanvasRulerProps> = ({
  height,
  dpi,
  displayScale,
  sections,
  activeAreaIndex,
}) => {
  const canvasHeightPx = mmToPx(height, dpi) * displayScale;

  // 计算刻度间隔（固定5mm）
  const tickInterval = 5; // 每5mm一个刻度
  const tickCount = Math.ceil(height / tickInterval);

  // 生成刻度标记
  const ticks: React.ReactNode[] = [];
  for (let i = 0; i <= tickCount; i++) {
    const mmValue = i * tickInterval;
    const yPx = mmToPx(mmValue, dpi) * displayScale;

    if (yPx > canvasHeightPx) break;

    const isMainTick = i % 2 === 0; // 每2个刻度（10mm）加粗显示

    ticks.push(
      <div
        key={`tick-${i}`}
        style={{
          position: 'absolute',
          top: yPx,
          left: 0,
          width: '100%',
          height: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* 刻度线 */}
        <div
          style={{
            width: isMainTick ? 12 : 8,
            height: 1,
            backgroundColor: isMainTick ? '#595959' : '#bfbfbf',
          }}
        />
        {/* 刻度标签 */}
        {isMainTick && (
          <span
            style={{
              marginLeft: 4,
              fontSize: 10,
              color: '#595959',
              fontFamily: 'monospace',
              userSelect: 'none',
            }}
          >
            {mmValue}mm
          </span>
        )}
      </div>
    );
  }

  // 绘制区域范围标记
  const areaMarkers: React.ReactNode[] = [];
  if (sections) {
    if (sections.contentAreas && sections.contentAreas.length > 0) {
      // 多内容区域模式
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
        position: 'absolute',
        left: -60,
        top: 0,
        width: 60,
        height: canvasHeightPx,
        backgroundColor: '#fafafa',
        borderRight: '1px solid #d9d9d9',
        overflow: 'hidden',
      }}
    >
      {/* 刻度标记 */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          paddingLeft: 8,
        }}
      >
        {ticks}
      </div>

      {/* 区域范围标记 */}
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
