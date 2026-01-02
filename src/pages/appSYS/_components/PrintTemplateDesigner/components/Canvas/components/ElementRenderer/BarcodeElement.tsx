/**
 * 条码/二维码元素渲染器
 */
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Barcode from 'react-barcode';
import {
  AtlElement,
  BarcodeProperties,
  QRCodeProperties,
  DataMatrixProperties,
  BarcodeType,
} from '../../../../types';
import {
  resolveBindingValue,
  getEffectiveContentBinding,
} from '../../../../utils';
import { DataMatrixComponent } from '../../utils/DataMatrixComponent';

export interface BarcodeElementProps {
  element: AtlElement;
  displayScale: number;
  dpi: number;
  w: number; // 显示宽度（像素）
  h: number; // 显示高度（像素）
  context: Record<string, any>;
}

export const BarcodeElement: React.FC<BarcodeElementProps> = ({
  element,
  displayScale,
  w: width,
  h: height,
  context: bindingContext,
}) => {
  const properties = element.properties as BarcodeProperties | QRCodeProperties | DataMatrixProperties;
  const barcodeType = (properties as BarcodeProperties).barcodeType;

  const contentBinding = getEffectiveContentBinding(properties as any);
  // 设计器模式:显示数据路径占位符
  const barcodeContent =
    resolveBindingValue(contentBinding, bindingContext, 'string', { showPlaceholder: true }) || 'SAMPLE';

  // QRCode类型
  if (barcodeType === BarcodeType.QRCode) {
    const qrProps = properties as QRCodeProperties;
    const getErrorCorrectionLevel = (level?: number): 'L' | 'M' | 'Q' | 'H' => {
      switch (level) {
        case 0:
          return 'L';
        case 1:
          return 'M';
        case 2:
          return 'Q';
        case 3:
          return 'H';
        default:
          return 'M';
      }
    };

    try {
      const qrSize = Math.min(width, height);
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: qrProps.backgroundColor || '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <QRCodeSVG
            value={barcodeContent}
            size={qrSize}
            level={getErrorCorrectionLevel(qrProps.errorCorrectionLevel)}
            fgColor={qrProps.foregroundColor || '#000000'}
            bgColor={qrProps.backgroundColor || '#FFFFFF'}
            includeMargin={false}
          />
        </div>
      );
    } catch (error) {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10 * displayScale,
            color: '#ff4d4f',
          }}
        >
          二维码错误
        </div>
      );
    }
  }

  // DataMatrix类型
  if (barcodeType === BarcodeType.DataMatrix) {
    const dmProps = properties as DataMatrixProperties;
    try {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: dmProps.backgroundColor || '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DataMatrixComponent
            content={barcodeContent}
            width={width}
            height={height}
            foregroundColor={dmProps.foregroundColor}
            backgroundColor={dmProps.backgroundColor}
          />
        </div>
      );
    } catch (error) {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10 * displayScale,
            color: '#ff4d4f',
          }}
        >
          DataMatrix错误
        </div>
      );
    }
  }

  // 一维码类型
  const bcProps = properties as BarcodeProperties;
  const getBarcodeFormat = (type: BarcodeType): string => {
    switch (type) {
      case BarcodeType.Code128:
        return 'CODE128';
      case BarcodeType.Code39:
        return 'CODE39';
      case BarcodeType.EAN13:
        return 'EAN13';
      default:
        return 'CODE128';
    }
  };

  try {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Barcode
          value={barcodeContent}
          format={getBarcodeFormat(barcodeType)}
          width={bcProps.moduleWidth || 2}
          height={bcProps.showText ? height * 0.7 : height}
          displayValue={bcProps.showText !== false}
          fontSize={12}
          margin={0}
        />
      </div>
    );
  } catch (error) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 10 * displayScale,
          color: '#ff4d4f',
        }}
      >
        条码错误
      </div>
    );
  }
};
