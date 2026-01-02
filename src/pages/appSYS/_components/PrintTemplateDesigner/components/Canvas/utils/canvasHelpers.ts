/**
 * Canvas画布工具函数
 */
import { pxToMm } from '../../../utils';

/**
 * 坐标转换辅助函数：将viewport坐标转换为画布中的毫米坐标
 *
 * 转换链：
 * 1. Viewport坐标 (clientX, clientY) - 相对于浏览器窗口
 * 2. 减去画布位置 → Canvas坐标（显示像素）
 * 3. 除以displayScale → 物理像素
 * 4. 调用pxToMm → 毫米单位
 *
 * @param canvasElement - 画布DOM元素
 * @param clientX - 鼠标在viewport中的X坐标
 * @param clientY - 鼠标在viewport中的Y坐标
 * @param displayScale - 显示缩放比例
 * @param dpi - DPI设置
 * @returns 鼠标在画布中的位置（毫米单位）
 */
export const clientToCanvasMm = (
  canvasElement: HTMLDivElement | null,
  clientX: number,
  clientY: number,
  displayScale: number,
  dpi: number,
): { x: number; y: number } => {
  if (!canvasElement) return { x: 0, y: 0 };

  // 获取画布在viewport中的位置
  const canvasRect = canvasElement.getBoundingClientRect();

  // 计算鼠标相对于画布的显示像素坐标
  const displayX = clientX - canvasRect.left;
  const displayY = clientY - canvasRect.top;

  // 转换为物理像素（考虑缩放）
  const physicalX = displayX / displayScale;
  const physicalY = displayY / displayScale;

  // 转换为毫米单位
  const mmX = pxToMm(physicalX, dpi);
  const mmY = pxToMm(physicalY, dpi);

  return { x: mmX, y: mmY };
};
