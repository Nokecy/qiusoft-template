/**
 * SectionConfigPanel 组件
 * 用于配置单个区域（页头/页尾/内容）的属性
 */

import React, { useEffect, useRef } from 'react';
import { Form, Select, Radio, InputNumber, Collapse, Switch, Space, Alert, Typography, Input } from 'antd';
import { InfoCircleOutlined, TableOutlined } from '@ant-design/icons';
import type { SectionConfig, SectionType, SectionPrintFrequency, AtlDataSource, LabelGridLayout } from '../types';
import { SectionPrintFrequency as PrintFrequency, SectionType as SectionTypeEnum } from '../types';
import { LabelGridLayoutPanel } from './LabelGridLayoutPanel';
import { YPositionConfigurator } from './YPositionConfigurator';
import { suggestYCoordinate } from '../utils/multiContentAreaUtils';

const { Panel } = Collapse;
const { Text } = Typography;

export interface SectionConfigPanelProps {
  sectionType: SectionType;
  config?: SectionConfig;
  dataSources: Record<string, AtlDataSource>;
  onChange: (config: SectionConfig) => void;
  /** 画布宽度（毫米） */
  canvasWidth?: number;
  /** 区域高度（毫米） */
  sectionHeight?: number;
  /** 是否为多内容区域模式 */
  isMultiContentArea?: boolean;
  /** 区域索引（多内容区域模式下） */
  areaIndex?: number;
  /** 前序区域列表（多内容区域模式下） */
  previousAreas?: SectionConfig[];
  /** 页头高度（多内容区域模式下） */
  headerHeight?: number;
  /** 区域元素列表（用于cellTemplate自动填充） */
  sectionElements?: import('../types').AtlElement[];
}

/**
 * SectionConfigPanel - 区域配置面板
 * 使用 Ant Design Form 组件实现配置表单
 */
export const SectionConfigPanel: React.FC<SectionConfigPanelProps> = ({
  sectionType,
  config,
  dataSources,
  onChange,
  canvasWidth = 100,
  sectionHeight = 100,
  isMultiContentArea = false,
  areaIndex = 0,
  previousAreas = [],
  headerHeight = 0,
  sectionElements = [],
}) => {
  const [form] = Form.useForm();
  const isInternalUpdate = useRef(false);

  // 当外部 config 变化时更新表单
  useEffect(() => {
    if (config) {
      form.setFieldsValue(config);
    } else {
      // 如果 config 为空，设置默认值
      form.setFieldsValue({
        printFrequency: PrintFrequency.EveryPage,
        followLoopPagination: true,
      });
    }
  }, [config, form]);

  // 数据源选项
  const dataSourceOptions = Object.keys(dataSources || {}).map(key => ({
    label: dataSources[key].name,
    value: key,
  }));

  // 打印频率选项
  const printFrequencyOptions = [
    {
      value: PrintFrequency.EveryPage,
      label: '每页都打印',
      description: '该区域在每一页都会显示',
    },
    {
      value: PrintFrequency.FirstPageOnly,
      label: '仅首页打印',
      description: '该区域仅在第一页显示',
    },
    {
      value: PrintFrequency.LastPageOnly,
      label: '仅末页打印',
      description: '该区域仅在最后一页显示',
    },
    {
      value: PrintFrequency.None,
      label: '不打印',
      description: '该区域不显示（预留配置）',
    },
  ];

  // 表单值变化时触发
  const handleValuesChange = (_: any, allValues: SectionConfig) => {
    // 如果是内部更新（如网格布局变化），跳过，避免重复触发
    if (isInternalUpdate.current) {
      return;
    }
    // 确保保留 config 中的 id 和 name 字段（表单中没有对应的 Form.Item）
    const completeConfig = {
      ...allValues,
      id: config?.id, // 保留原有的 id
      name: config?.name, // 保留原有的 name
    };
    onChange(completeConfig);
  };

  // 根据打印频率显示提示信息
  const renderFrequencyTip = (frequency: SectionPrintFrequency) => {
    const tips: Record<SectionPrintFrequency, string> = {
      [PrintFrequency.EveryPage]: '该区域将在多页打印时出现在每一页',
      [PrintFrequency.FirstPageOnly]: '该区域仅在第一页显示，适合用于标题、公司信息等',
      [PrintFrequency.LastPageOnly]: '该区域仅在最后一页显示，适合用于合计、签名等',
      [PrintFrequency.None]: '该区域将被隐藏，但配置会保留',
    };
    return tips[frequency];
  };

  // 获取区域名称
  const getSectionName = () => {
    const sectionNames: Record<SectionType, string> = {
      [SectionTypeEnum.Header]: '页头',
      [SectionTypeEnum.Content]: '内容',
      [SectionTypeEnum.Footer]: '页尾',
    };
    const name = sectionNames[sectionType];
    if (!name) {
      console.warn(`[SectionConfigPanel] 收到未知的 sectionType 值:`, sectionType, typeof sectionType);
      return `未知区域 (${sectionType})`;
    }
    return name;
  };

  // 网格布局变化处理
  const handleGridLayoutChange = (gridLayout: LabelGridLayout | undefined) => {
    console.log('[SectionConfigPanel] handleGridLayoutChange 被调用:', {
      gridLayout,
      sectionType,
      当前config: config,
    });

    // 标记为内部更新，防止 handleValuesChange 重复触发
    isInternalUpdate.current = true;

    try {
      // 先获取当前表单值
      const formValues = form.getFieldsValue();
      console.log('[SectionConfigPanel] 当前表单值:', formValues);

      // 创建新的配置对象,确保 labelGridLayout 使用新值，并保留 id 和 name
      const newConfig = {
        ...formValues,
        labelGridLayout: gridLayout,
        id: config?.id, // 保留原有的 id
        name: config?.name, // 保留原有的 name
      };
      console.log('[SectionConfigPanel] 准备调用 onChange，新配置:', newConfig);

      // 更新表单字段（这会触发 onValuesChange，但会被 isInternalUpdate 标记拦截）
      form.setFieldsValue({ labelGridLayout: gridLayout });
      // 直接触发更新
      onChange(newConfig);
    } finally {
      // 重置标记
      setTimeout(() => {
        isInternalUpdate.current = false;
      }, 0);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      initialValues={{
        printFrequency: PrintFrequency.EveryPage,
        followLoopPagination: true,
      }}
    >
      {/* 网格布局字段 - 隐藏的Form.Item用于存储值 */}
      <Form.Item name="labelGridLayout" hidden>
        <input />
      </Form.Item>

      {/* 多内容区域特有字段 */}
      {isMultiContentArea && (
        <>
          {/* 区域名称 */}
          <Form.Item
            label="区域名称"
            name="name"
            tooltip={{
              title: '为内容区域设置一个易于识别的名称',
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input placeholder={`内容区域${areaIndex + 1}`} />
          </Form.Item>

          {/* Y轴定位字段 - 隐藏的Form.Item用于存储值 */}
          <Form.Item name="yPositionMode" hidden>
            <input />
          </Form.Item>
          <Form.Item name="fixedY" hidden>
            <input />
          </Form.Item>
          <Form.Item name="spacingAfterPrevious" hidden>
            <input />
          </Form.Item>

          {/* Y轴定位配置 */}
          <Form.Item
            label="Y轴定位"
            tooltip={{
              title: '配置区域在Y轴的定位方式',
              icon: <InfoCircleOutlined />,
            }}
            shouldUpdate={(prev, curr) =>
              prev.yPositionMode !== curr.yPositionMode ||
              prev.fixedY !== curr.fixedY ||
              prev.spacingAfterPrevious !== curr.spacingAfterPrevious
            }
          >
            {({ getFieldValue, setFieldsValue }) => {
              const currentValue = {
                yPositionMode: getFieldValue('yPositionMode'),
                fixedY: getFieldValue('fixedY'),
                spacingAfterPrevious: getFieldValue('spacingAfterPrevious'),
              };

              const suggestedY = suggestYCoordinate(areaIndex, previousAreas, headerHeight);
              const previousAreaEndY = previousAreas.length > 0
                ? previousAreas.reduce((sum, area) => {
                    const areaHeight = typeof area.height === 'number' ? area.height : 0;
                    return sum + areaHeight;
                  }, headerHeight)
                : headerHeight;

              return (
                <YPositionConfigurator
                  value={currentValue}
                  onChange={(newValue) => {
                    setFieldsValue(newValue);
                    // 立即触发整体更新,确保Y轴定位字段被包含
                    const allFormValues = form.getFieldsValue();
                    const completeConfig = {
                      ...allFormValues,
                      ...newValue,
                      // 确保 labelGridLayout 也被包含
                      labelGridLayout: allFormValues.labelGridLayout,
                      // 确保保留 id 和 name
                      id: config?.id,
                      name: config?.name,
                    };
                    console.log('[SectionConfigPanel] YPositionConfigurator onChange:', {
                      newValue,
                      allFormValues,
                      completeConfig,
                    });
                    onChange(completeConfig);
                  }}
                  isFirst={areaIndex === 0}
                  suggestedY={suggestedY}
                  previousAreaEndY={previousAreaEndY}
                />
              );
            }}
          </Form.Item>
        </>
      )}

      {/* 数据源选择 */}
      <Form.Item
        label="数据源"
        name="dataSourceKey"
        tooltip={{
          title: '为该区域绑定独立的数据源，可以与其他区域使用不同的数据',
          icon: <InfoCircleOutlined />,
        }}
      >
        <Select
          options={dataSourceOptions}
          placeholder="选择数据源（可选）"
          allowClear
        />
      </Form.Item>

      {/* 打印频率 */}
      <Form.Item
        label="打印频率"
        name="printFrequency"
        tooltip={{
          title: '控制该区域在多页打印时的显示规则',
          icon: <InfoCircleOutlined />,
        }}
      >
        <Radio.Group>
          <Space direction="vertical">
            {printFrequencyOptions.map(option => (
              <Radio key={option.value} value={option.value}>
                <Space direction="vertical" size={0}>
                  <Text strong>{option.label}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {option.description}
                  </Text>
                </Space>
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>

      {/* 显示当前选择的打印频率提示 */}
      <Form.Item noStyle shouldUpdate={(prev, curr) => prev.printFrequency !== curr.printFrequency}>
        {({ getFieldValue }) => {
          const frequency = getFieldValue('printFrequency');
          if (frequency !== undefined) {
            return (
              <Alert
                message={renderFrequencyTip(frequency)}
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
            );
          }
          return null;
        }}
      </Form.Item>

      {/* 区域高度 */}
      <Form.Item
        label="区域高度 (mm)"
        name="height"
        tooltip={{
          title: '指定区域的固定高度，留空则根据元素自动计算',
          icon: <InfoCircleOutlined />,
        }}
      >
        <InputNumber
          min={0}
          max={1000}
          placeholder="自动计算"
          style={{ width: '100%' }}
        />
      </Form.Item>

      {/* 高级选项 */}
      <Collapse ghost>
        <Panel
          header={
            <Space>
              <Text strong>高级选项</Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                （循环分页控制）
              </Text>
            </Space>
          }
          key="advanced"
        >
          <Form.Item
            name="followLoopPagination"
            valuePropName="checked"
            tooltip={{
              title: '当内容区域包含循环元素且触发分页时，该区域是否跟随每次循环迭代',
              icon: <InfoCircleOutlined />,
            }}
          >
            <Space>
              <Switch />
              <Text>跟随循环分页</Text>
            </Space>
          </Form.Item>

          <Alert
            message="循环分页说明"
            description="启用时，如果内容区域有循环元素导致分页，该区域会在每次循环迭代时重新渲染。禁用时，该区域仅在溢出分页时渲染一次。"
            type="info"
            showIcon
            icon={<InfoCircleOutlined />}
          />
        </Panel>

        {/* 网格布局配置 */}
        <Panel
          header={
            <Space>
              <TableOutlined />
              <Text strong>网格布局配置</Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                （{getSectionName()}区域）
              </Text>
            </Space>
          }
          key="gridLayout"
        >
          <LabelGridLayoutPanel
            value={config?.labelGridLayout}
            onChange={handleGridLayoutChange}
            dataSources={dataSources}
            sectionName={getSectionName()}
            canvasWidth={canvasWidth}
            sectionElements={sectionElements}
            sectionHeight={sectionHeight}
          />
        </Panel>
      </Collapse>
    </Form>
  );
};
