/**
 * YPositionConfigurator.tsx
 * Y轴定位配置器组件
 * 提供直观的Y轴定位模式选择和参数配置
 */

import React from 'react';
import { Form, Radio, InputNumber, Space } from 'antd';
import { PushpinOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { YPositionMode } from '../types';

export interface YPositionConfiguratorValue {
  yPositionMode: YPositionMode;
  fixedY?: number;
  spacingAfterPrevious?: number;
}

export interface YPositionConfiguratorProps {
  value?: YPositionConfiguratorValue;
  onChange?: (value: YPositionConfiguratorValue) => void;
  isFirst?: boolean; // 是否为第一个内容区域
  suggestedY?: number; // 建议的Y坐标
  previousAreaEndY?: number; // 前一区域的结束Y坐标
}

/**
 * Y轴定位配置器组件
 */
export const YPositionConfigurator: React.FC<YPositionConfiguratorProps> = ({
  value = {
    yPositionMode: YPositionMode.Fixed,
    fixedY: 0,
    spacingAfterPrevious: 5,
  },
  onChange,
  isFirst = false,
  suggestedY = 0,
  previousAreaEndY = 0,
}) => {
  const { yPositionMode, fixedY, spacingAfterPrevious } = value;

  const handleModeChange = (newMode: YPositionMode) => {
    onChange?.({
      yPositionMode: newMode,
      fixedY: newMode === YPositionMode.Fixed ? fixedY || suggestedY : undefined,
      spacingAfterPrevious:
        newMode === YPositionMode.AfterPrevious ? spacingAfterPrevious || 5 : undefined,
    });
  };

  const handleFixedYChange = (newY: number | null) => {
    onChange?.({
      ...value,
      fixedY: newY || 0,
    });
  };

  const handleSpacingChange = (newSpacing: number | null) => {
    onChange?.({
      ...value,
      spacingAfterPrevious: newSpacing || 0,
    });
  };

  return (
    <div className="y-position-configurator">
      <Form.Item label="Y轴定位模式">
        <Radio.Group
          value={yPositionMode}
          onChange={(e) => handleModeChange(e.target.value)}
        >
          <Space direction="vertical" size="large">
            <Radio value={YPositionMode.Fixed}>
              <Space>
                <PushpinOutlined style={{ color: '#1890ff' }} />
                <div>
                  <div>
                    <strong>固定定位</strong>
                  </div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                    指定区域的绝对Y坐标，不受其他区域影响
                  </div>
                </div>
              </Space>
            </Radio>

            <Radio value={YPositionMode.AfterPrevious} disabled={isFirst}>
              <Space>
                <ArrowDownOutlined style={{ color: '#52c41a' }} />
                <div>
                  <div>
                    <strong>自动跟随</strong>
                  </div>
                  <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                    紧跟前一区域下方，设置间距即可
                    {isFirst && ' （第一个区域不可用）'}
                  </div>
                </div>
              </Space>
            </Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      {/* 固定定位参数 */}
      {yPositionMode === YPositionMode.Fixed && (
        <Form.Item
          label="Y坐标"
          extra={suggestedY > 0 && `建议值: ${suggestedY.toFixed(1)}mm`}
        >
          <InputNumber
            value={fixedY}
            onChange={handleFixedYChange}
            min={0}
            max={300}
            precision={1}
            step={1}
            addonAfter="mm"
            placeholder={`建议 ${suggestedY.toFixed(1)}`}
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}

      {/* 自动跟随参数 */}
      {yPositionMode === YPositionMode.AfterPrevious && (
        <Form.Item
          label="间距"
          extra={`前一区域结束于 ${previousAreaEndY.toFixed(1)}mm`}
        >
          <InputNumber
            value={spacingAfterPrevious}
            onChange={handleSpacingChange}
            min={0}
            max={50}
            precision={1}
            step={0.5}
            addonAfter="mm"
            placeholder="5.0"
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}

      {/* 可视化预览图 */}
      <div
        className="position-preview"
        style={{
          marginTop: 16,
          padding: 12,
          background: '#fafafa',
          borderRadius: 4,
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: '#8c8c8c',
            marginBottom: 8,
          }}
        >
          位置预览
        </div>
        {yPositionMode === YPositionMode.Fixed ? (
          <div style={{ position: 'relative', height: 60 }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: 1,
                background: '#d9d9d9',
              }}
            >
              <span style={{ fontSize: 10, color: '#8c8c8c' }}>0mm</span>
            </div>
            <div
              style={{
                position: 'absolute',
                top: `${Math.min((fixedY || 0) / 3, 50)}px`,
                left: 0,
                width: '100%',
                height: 8,
                background: '#1890ff',
                borderRadius: 2,
              }}
            >
              <span style={{ fontSize: 10, color: '#fff', paddingLeft: 4 }}>
                当前区域 Y={fixedY?.toFixed(1)}mm
              </span>
            </div>
          </div>
        ) : (
          <div style={{ position: 'relative', height: 60 }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: 8,
                background: '#d9d9d9',
                borderRadius: 2,
              }}
            >
              <span style={{ fontSize: 10, color: '#595959', paddingLeft: 4 }}>
                前一区域
              </span>
            </div>
            <div
              style={{
                position: 'absolute',
                top: 12,
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: 10,
                color: '#52c41a',
              }}
            >
              ↓ 间距 {spacingAfterPrevious?.toFixed(1)}mm
            </div>
            <div
              style={{
                position: 'absolute',
                top: 25,
                left: 0,
                width: '100%',
                height: 8,
                background: '#52c41a',
                borderRadius: 2,
              }}
            >
              <span style={{ fontSize: 10, color: '#fff', paddingLeft: 4 }}>
                当前区域
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YPositionConfigurator;
