/**
 * 画布坐标转换Hook
 */
import { useCallback, RefObject } from 'react';
import { clientToCanvasMm } from '../utils/canvasHelpers';

export interface UseCanvasCoordinatesParams {
  canvasRef: RefObject<HTMLDivElement>;
  displayScale: number;
  dpi: number;
}

export const useCanvasCoordinates = ({
  canvasRef,
  displayScale,
  dpi,
}: UseCanvasCoordinatesParams) => {
  /**
   * 将viewport坐标转换为画布中的毫米坐标
   */
  const toCanvasMm = useCallback(
    (clientX: number, clientY: number) => {
      return clientToCanvasMm(canvasRef.current, clientX, clientY, displayScale, dpi);
    },
    [canvasRef, displayScale, dpi],
  );

  return { toCanvasMm };
};
