/**
 * LabelGridLayoutPanel - 标签网格布局配置面板
 * 用于配置批量打印的网格布局参数
 *
 * 【2025-10-10 架构调整】
 * 网格布局配置已从模板根级别移动到区域配置中
 * 现在支持为页头(Header)、内容区(Content)、页尾(Footer)独立配置网格布局
 */

import React, { useMemo } from 'react';
import {
  Form,
  InputNumber,
  Select,
  Space,
  Card,
  Divider,
  Typography,
  Alert,
  Tooltip,
  Row,
  Col,
  Input,
  Button,
} from 'antd';
import { InfoCircleOutlined, TableOutlined } from '@ant-design/icons';
import {
  LabelGridLayout,
  GridLayoutMode,
  GridDirection,
  PropertyBinding,
  BindingMode,
  AtlDataSource,
} from '../types';
import { PropertyBindingEditor } from './PropertyBindingEditor';

const { Text, Title } = Typography;

export interface LabelGridLayoutPanelProps {
  /** 网格布局配置 */
  value?: LabelGridLayout;
  /** 值变化回调 */
  onChange?: (value: LabelGridLayout | undefined) => void;
  /** 数据源列表（用于选择） */
  dataSources?: Record<string, AtlDataSource>;
  /** 是否禁用 */
  disabled?: boolean;
  /** 区域名称（用于显示提示信息） */
  sectionName?: string;
  /** 画布宽度（毫米） */
  canvasWidth?: number;
  /** 区域高度（毫米） */
  sectionHeight?: number;
  /** 区域元素列表（用于cellTemplate自动填充） */
  sectionElements?: import('../types').AtlElement[];
}

/**
 * 创建默认的LabelGridLayout配置
 */
const createDefaultGridLayout = (): LabelGridLayout => ({
  mode: GridLayoutMode.Fixed,
  rows: { mode: BindingMode.Static, staticValue: 3 },
  columns: { mode: BindingMode.Static, staticValue: 2 },
  labelWidth: 50,
  labelHeight: 30,
  spacingX: 2,
  spacingY: 2,
  offsetX: 0,
  offsetY: 0,
  dataSourceName: '',
  cellTemplate: [],
  cellVariable: 'cell',
  indexVariable: 'index',
  rowVariable: 'row',
  columnVariable: 'col',
});

/**
 * LabelGridLayoutPanel组件
 */
export const LabelGridLayoutPanel: React.FC<LabelGridLayoutPanelProps> = ({
  value,
  onChange,
  dataSources,
  disabled = false,
  sectionName,
  canvasWidth = 100,
  sectionHeight = 100,
  sectionElements = [],
}) => {
  // 是否启用网格布局
  const isEnabled = !!value;

  // 使用默认值（仅在启用时）
  // 禁用时使用空对象避免触发副作用
  const gridLayout = useMemo(() => {
    if (!value) {
      return createDefaultGridLayout(); // 仅用于UI显示,不会触发onChange
    }
    return value;
  }, [value]);

  // 数据源选项
  const dataSourceOptions = useMemo(() => {
    if (!dataSources) return [];
    return Object.entries(dataSources).map(([key, ds]) => ({
      label: `${key} (${ds.type === 0 ? 'Array' : 'Object'})`,
      value: key,
    }));
  }, [dataSources]);

  // 是否为动态模式
  const isDynamicMode = gridLayout.mode === GridLayoutMode.Dynamic;

  // 是否为固定模式且使用静态行列值
  const isFixedWithStaticValues =
    gridLayout.mode === GridLayoutMode.Fixed &&
    gridLayout.rows.mode === BindingMode.Static &&
    gridLayout.columns.mode === BindingMode.Static;

  // 计算自动标签尺寸（仅用于显示提示）
  const autoLabelSize = useMemo(() => {
    if (!isFixedWithStaticValues) return null;

    const rows = gridLayout.rows.staticValue || 1;
    const columns = gridLayout.columns.staticValue || 1;
    const spacingX = gridLayout.spacingX || 0;
    const spacingY = gridLayout.spacingY || 0;

    // 标签宽 = (画布宽 - (列数-1)*水平间距) / 列数
    const labelWidth = (canvasWidth - (columns - 1) * spacingX) / columns;
    // 标签高 = (区域高 - (行数-1)*垂直间距) / 行数
    const labelHeight = (sectionHeight - (rows - 1) * spacingY) / rows;

    // 使用向下取整确保不超出总尺寸
    // Math.floor(x * 10) / 10 保留1位小数并向下取整
    return {
      width: Math.max(1, Math.floor(labelWidth * 10) / 10),
      height: Math.max(1, Math.floor(labelHeight * 10) / 10),
    };
  }, [isFixedWithStaticValues, gridLayout.rows, gridLayout.columns, gridLayout.spacingX, gridLayout.spacingY, canvasWidth, sectionHeight]);

  /**
   * 同步自动计算的标签尺寸到gridLayout
   * 当行列数或间距变化时,自动更新labelWidth和labelHeight
   */
  React.useEffect(() => {
    // 只有在启用状态下才自动更新尺寸
    if (isEnabled && isFixedWithStaticValues && autoLabelSize && onChange) {
      // 只有当计算值与当前值不同时才更新,避免无限循环
      const needsUpdate =
        Math.abs((gridLayout.labelWidth || 0) - autoLabelSize.width) > 0.1 ||
        Math.abs((gridLayout.labelHeight || 0) - autoLabelSize.height) > 0.1;

      if (needsUpdate) {
        onChange({
          ...gridLayout,
          labelWidth: autoLabelSize.width,
          labelHeight: autoLabelSize.height,
        });
      }
    }
  }, [isEnabled, autoLabelSize, isFixedWithStaticValues]);

  /**
   * 更新网格布局配置
   */
  const updateGridLayout = (updates: Partial<LabelGridLayout>) => {
    onChange?.({ ...gridLayout, ...updates });
  };

  /**
   * 更新行数绑定
   */
  const handleRowsChange = (rows: PropertyBinding) => {
    updateGridLayout({ rows });
  };

  /**
   * 更新列数绑定
   */
  const handleColumnsChange = (columns: PropertyBinding) => {
    updateGridLayout({ columns });
  };

  /**
   * 启用/禁用网格布局
   */
  const handleToggleGridLayout = () => {
    if (isEnabled) {
      // 禁用：删除网格布局配置
      onChange?.(undefined);
    } else {
      // 启用：创建默认配置,并自动填充cellTemplate
      const defaultGridLayout = createDefaultGridLayout();

      // 自动填充cellTemplate: 使用当前区域的所有元素
      if (sectionElements && sectionElements.length > 0) {
        defaultGridLayout.cellTemplate = sectionElements.map(el => ({ ...el }));
        console.log(`[LabelGridLayoutPanel] 启用网格布局,自动填充${sectionElements.length}个元素到cellTemplate`);
      }

      onChange?.(defaultGridLayout);
    }
  };

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <Space direction="vertical" style={{ width: '100%' }} size={8}>
        {/* 标题和说明 */}
        <Alert
          message={
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <span>
                {sectionName ? `${sectionName}区域网格布局` : '网格布局配置'}
                {!isEnabled && ' (未启用)'}
              </span>
              <Button
                type="link"
                size="small"
                onClick={handleToggleGridLayout}
                style={{ padding: 0, height: 'auto' }}
              >
                {isEnabled ? '禁用网格布局' : '启用网格布局'}
              </Button>
            </Space>
          }
          type={isEnabled ? "info" : "warning"}
          showIcon
          icon={<TableOutlined />}
          style={{ padding: '4px 8px', fontSize: 12 }}
        />

        {!isEnabled && (
          <Alert
            message='点击上方"启用"按钮以配置此区域的网格布局'
            type="info"
            style={{ padding: '4px 8px', fontSize: 11 }}
          />
        )}

        {isEnabled && (
          <>

        {/* 基本配置 */}
        <Card
          title={<Text style={{ fontSize: 13 }}>基本配置</Text>}
          size="small"
          styles={{
            header: { minHeight: 32, padding: '0 8px' },
            body: { padding: '8px 12px' }
          }}
        >
          <Space direction="vertical" style={{ width: '100%' }} size={12}>
            {/* 布局模式 */}
            <div>
              <Space style={{ marginBottom: 4 }}>
                <Text style={{ fontSize: 12 }}>布局模式</Text>
                <Tooltip title="固定：手动指定行列；动态：自动计算">
                  <InfoCircleOutlined style={{ fontSize: 12, color: '#999' }} />
                </Tooltip>
              </Space>
              <Select
                value={gridLayout.mode}
                onChange={(mode) => updateGridLayout({ mode })}
                disabled={disabled}
                style={{ width: '100%' }}
                options={[
                  { label: '固定行列', value: GridLayoutMode.Fixed },
                  { label: '动态行列', value: GridLayoutMode.Dynamic },
                ]}
              />
            </div>

            {/* 数据源选择 */}
            <div>
              <Space style={{ marginBottom: 4 }}>
                <Text style={{ fontSize: 12 }}>数据源</Text>
                <Text type="danger">*</Text>
                <Tooltip title="选择Array类型数据源">
                  <InfoCircleOutlined style={{ fontSize: 12, color: '#999' }} />
                </Tooltip>
              </Space>
              <Select
                value={gridLayout.dataSourceName}
                onChange={(dataSourceName) => updateGridLayout({ dataSourceName })}
                disabled={disabled}
                placeholder="请选择数据源"
                style={{ width: '100%' }}
                options={dataSourceOptions}
              />
            </div>
          </Space>
        </Card>

        {/* 行列配置 */}
        <Card
          title={<Text style={{ fontSize: 13 }}>行列配置</Text>}
          size="small"
          styles={{
            header: { minHeight: 32, padding: '0 8px' },
            body: { padding: '8px 12px' }
          }}
        >
          <Space direction="vertical" style={{ width: '100%' }} size={12}>
            {/* 行数配置 */}
            <div>
              <Text style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>行数</Text>
              <PropertyBindingEditor
                value={gridLayout.rows}
                onChange={handleRowsChange}
                valueType="number"
                disabled={disabled || isDynamicMode}
                showFormat={false}
                showFallback={false}
              />
              {isDynamicMode && (
                <Text type="secondary" style={{ fontSize: 11, lineHeight: 1.2, display: 'block', marginTop: 4 }}>
                  动态计算
                </Text>
              )}
            </div>

            {/* 列数配置 */}
            <div>
              <Text style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>列数</Text>
              <PropertyBindingEditor
                value={gridLayout.columns}
                onChange={handleColumnsChange}
                valueType="number"
                disabled={disabled || isDynamicMode}
                showFormat={false}
                showFallback={false}
              />
              {isDynamicMode && (
                <Text type="secondary" style={{ fontSize: 11, lineHeight: 1.2, display: 'block', marginTop: 4 }}>
                  动态计算
                </Text>
              )}
            </div>
          </Space>
        </Card>

        {/* 动态布局配置 */}
        {isDynamicMode && (
          <Card
            title={<Text style={{ fontSize: 13 }}>自动布局</Text>}
            size="small"
            styles={{
              header: { minHeight: 32, padding: '0 8px' },
              body: { padding: '8px 12px' }
            }}
          >
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <div>
                <Space style={{ marginBottom: 4 }}>
                  <Text style={{ fontSize: 12 }}>布局方向</Text>
                  <Tooltip title="行优先：横向；列优先：纵向">
                    <InfoCircleOutlined style={{ fontSize: 12, color: '#999' }} />
                  </Tooltip>
                </Space>
                <Select
                  value={gridLayout.autoLayout?.direction ?? GridDirection.RowFirst}
                  onChange={(direction) =>
                    updateGridLayout({
                      autoLayout: {
                        ...gridLayout.autoLayout,
                        direction,
                        maxCells: gridLayout.autoLayout?.maxCells ?? 1000,
                      },
                    })
                  }
                  disabled={disabled}
                  style={{ width: '100%' }}
                  options={[
                    { label: '行优先（横向排列）', value: GridDirection.RowFirst },
                    { label: '列优先（纵向排列）', value: GridDirection.ColumnFirst },
                  ]}
                />
              </div>

              <div>
                <Space style={{ marginBottom: 4 }}>
                  <Text style={{ fontSize: 12 }}>固定列数</Text>
                  <Tooltip title="固定列数，自动算行（互斥）">
                    <InfoCircleOutlined style={{ fontSize: 12, color: '#999' }} />
                  </Tooltip>
                </Space>
                <InputNumber
                  value={gridLayout.autoLayout?.fixedColumns}
                  onChange={(fixedColumns) =>
                    updateGridLayout({
                      autoLayout: {
                        ...gridLayout.autoLayout,
                        direction: gridLayout.autoLayout?.direction ?? GridDirection.RowFirst,
                        maxCells: gridLayout.autoLayout?.maxCells ?? 1000,
                        fixedColumns: fixedColumns ?? undefined,
                        fixedRows: undefined,
                      },
                    })
                  }
                  disabled={disabled || !!gridLayout.autoLayout?.fixedRows}
                  min={1}
                  max={100}
                  style={{ width: '100%' }}
                  placeholder="自动"
                />
              </div>

              <div>
                <Space style={{ marginBottom: 4 }}>
                  <Text style={{ fontSize: 12 }}>固定行数</Text>
                  <Tooltip title="固定行数，自动算列（互斥）">
                    <InfoCircleOutlined style={{ fontSize: 12, color: '#999' }} />
                  </Tooltip>
                </Space>
                <InputNumber
                  value={gridLayout.autoLayout?.fixedRows}
                  onChange={(fixedRows) =>
                    updateGridLayout({
                      autoLayout: {
                        ...gridLayout.autoLayout,
                        direction: gridLayout.autoLayout?.direction ?? GridDirection.RowFirst,
                        maxCells: gridLayout.autoLayout?.maxCells ?? 1000,
                        fixedRows: fixedRows ?? undefined,
                        fixedColumns: undefined,
                      },
                    })
                  }
                  disabled={disabled || !!gridLayout.autoLayout?.fixedColumns}
                  min={1}
                  max={100}
                  style={{ width: '100%' }}
                  placeholder="自动"
                />
              </div>

              <div>
                <Space style={{ marginBottom: 4 }}>
                  <Text style={{ fontSize: 12 }}>最大单元格</Text>
                  <Tooltip title="防止数据过多">
                    <InfoCircleOutlined style={{ fontSize: 12, color: '#999' }} />
                  </Tooltip>
                </Space>
                <InputNumber
                  value={gridLayout.autoLayout?.maxCells ?? 1000}
                  onChange={(maxCells) =>
                    updateGridLayout({
                      autoLayout: {
                        ...gridLayout.autoLayout,
                        direction: gridLayout.autoLayout?.direction ?? GridDirection.RowFirst,
                        maxCells: maxCells ?? 1000,
                      },
                    })
                  }
                  disabled={disabled}
                  min={1}
                  max={10000}
                  style={{ width: '100%' }}
                />
              </div>
            </Space>
          </Card>
        )}

        {/* 尺寸和间距 */}
        <Card
          title={<Text style={{ fontSize: 13 }}>尺寸间距(mm)</Text>}
          size="small"
          styles={{
            header: { minHeight: 32, padding: '0 8px' },
            body: { padding: '8px 12px' }
          }}
        >
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Form layout="vertical" size="small" colon={false} style={{ marginBottom: -8 }}>
                <Form.Item
                  label={
                    <Space size={4}>
                      <Text style={{ fontSize: 11 }}>标签宽</Text>
                      {isFixedWithStaticValues && (
                        <Tooltip title="静态模式下自动计算">
                          <Text type="secondary" style={{ fontSize: 10 }}>(自动)</Text>
                        </Tooltip>
                      )}
                    </Space>
                  }
                  style={{ marginBottom: 8 }}
                >
                  <InputNumber
                    value={autoLabelSize?.width ?? gridLayout.labelWidth}
                    onChange={(labelWidth) => updateGridLayout({ labelWidth: labelWidth ?? 50 })}
                    disabled={disabled || isFixedWithStaticValues}
                    min={1}
                    max={1000}
                    style={{ width: '100%' }}
                    size="small"
                    controls={false}
                  />
                </Form.Item>
                <Form.Item label={<Text style={{ fontSize: 11 }}>水平间距</Text>} style={{ marginBottom: 8 }}>
                  <InputNumber
                    value={gridLayout.spacingX}
                    onChange={(spacingX) => updateGridLayout({ spacingX: spacingX ?? 2 })}
                    disabled={disabled}
                    min={0}
                    max={100}
                    style={{ width: '100%' }}
                    size="small"
                    controls={false}
                  />
                </Form.Item>
                <Form.Item label={<Text style={{ fontSize: 11 }}>水平偏移</Text>} style={{ marginBottom: 8 }}>
                  <InputNumber
                    value={gridLayout.offsetX}
                    onChange={(offsetX) => updateGridLayout({ offsetX: offsetX ?? 0 })}
                    disabled={disabled}
                    min={0}
                    max={100}
                    style={{ width: '100%' }}
                    size="small"
                    controls={false}
                  />
                </Form.Item>
              </Form>
            </Col>
            <Col span={12}>
              <Form layout="vertical" size="small" colon={false} style={{ marginBottom: -8 }}>
                <Form.Item
                  label={
                    <Space size={4}>
                      <Text style={{ fontSize: 11 }}>标签高</Text>
                      {isFixedWithStaticValues && (
                        <Tooltip title="静态模式下自动计算">
                          <Text type="secondary" style={{ fontSize: 10 }}>(自动)</Text>
                        </Tooltip>
                      )}
                    </Space>
                  }
                  style={{ marginBottom: 8 }}
                >
                  <InputNumber
                    value={autoLabelSize?.height ?? gridLayout.labelHeight}
                    onChange={(labelHeight) => updateGridLayout({ labelHeight: labelHeight ?? 30 })}
                    disabled={disabled || isFixedWithStaticValues}
                    min={1}
                    max={1000}
                    style={{ width: '100%' }}
                    size="small"
                    controls={false}
                  />
                </Form.Item>
                <Form.Item label={<Text style={{ fontSize: 11 }}>垂直间距</Text>} style={{ marginBottom: 8 }}>
                  <InputNumber
                    value={gridLayout.spacingY}
                    onChange={(spacingY) => updateGridLayout({ spacingY: spacingY ?? 2 })}
                    disabled={disabled}
                    min={0}
                    max={100}
                    style={{ width: '100%' }}
                    size="small"
                    controls={false}
                  />
                </Form.Item>
                <Form.Item label={<Text style={{ fontSize: 11 }}>垂直偏移</Text>} style={{ marginBottom: 8 }}>
                  <InputNumber
                    value={gridLayout.offsetY}
                    onChange={(offsetY) => updateGridLayout({ offsetY: offsetY ?? 0 })}
                    disabled={disabled}
                    min={0}
                    max={100}
                    style={{ width: '100%' }}
                    size="small"
                    controls={false}
                  />
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>

        {/* 变量配置 */}
        <Card
          title={<Text style={{ fontSize: 13 }}>变量配置</Text>}
          size="small"
          styles={{
            header: { minHeight: 32, padding: '0 8px' },
            body: { padding: '8px 12px' }
          }}
        >
          <Alert
            message="表达式中可用变量"
            type="info"
            showIcon
            style={{ marginBottom: 8, padding: '4px 8px', fontSize: 11 }}
          />
          <Space direction="vertical" style={{ width: '100%' }} size={12}>
            <div>
              <Space style={{ marginBottom: 4 }}>
                <Text style={{ fontSize: 12 }}>单元格变量</Text>
                <Tooltip title="当前单元格数据">
                  <InfoCircleOutlined style={{ fontSize: 12, color: '#999' }} />
                </Tooltip>
              </Space>
              <Input
                value={gridLayout.cellVariable}
                onChange={(e) => updateGridLayout({ cellVariable: e.target.value || 'cell' })}
                disabled={disabled}
                placeholder="cell"
                size="small"
              />
            </div>

            <div>
              <Space style={{ marginBottom: 4 }}>
                <Text style={{ fontSize: 12 }}>索引变量</Text>
                <Tooltip title="索引（从0开始）">
                  <InfoCircleOutlined style={{ fontSize: 12, color: '#999' }} />
                </Tooltip>
              </Space>
              <Input
                value={gridLayout.indexVariable}
                onChange={(e) => updateGridLayout({ indexVariable: e.target.value || 'index' })}
                disabled={disabled}
                placeholder="index"
                size="small"
              />
            </div>

            <div>
              <Space style={{ marginBottom: 4 }}>
                <Text style={{ fontSize: 12 }}>行号变量</Text>
                <Tooltip title="行号（从0开始）">
                  <InfoCircleOutlined style={{ fontSize: 12, color: '#999' }} />
                </Tooltip>
              </Space>
              <Input
                value={gridLayout.rowVariable}
                onChange={(e) => updateGridLayout({ rowVariable: e.target.value || 'row' })}
                disabled={disabled}
                placeholder="row"
                size="small"
              />
            </div>

            <div>
              <Space style={{ marginBottom: 4 }}>
                <Text style={{ fontSize: 12 }}>列号变量</Text>
                <Tooltip title="列号（从0开始）">
                  <InfoCircleOutlined style={{ fontSize: 12, color: '#999' }} />
                </Tooltip>
              </Space>
              <Input
                value={gridLayout.columnVariable}
                onChange={(e) => updateGridLayout({ columnVariable: e.target.value || 'col' })}
                disabled={disabled}
                placeholder="col"
                size="small"
              />
            </div>
          </Space>
        </Card>

        {/* 使用说明 */}
        <Card
          title={<Text style={{ fontSize: 13 }}>使用说明</Text>}
          size="small"
          styles={{
            header: { minHeight: 32, padding: '0 8px' },
            body: { padding: '8px 12px' }
          }}
        >
          <Space direction="vertical" size={4}>
            <Text style={{ fontSize: 11, lineHeight: 1.4 }}>
              <Text strong>固定模式：</Text>手动设置行列，数据顺序填充
            </Text>
            <Text style={{ fontSize: 11, lineHeight: 1.4 }}>
              <Text strong>动态模式：</Text>自动计算，可固定行或列
            </Text>
            <Text style={{ fontSize: 11, lineHeight: 1.4 }}>
              <Text strong>单元格模板：</Text>画布元素作为模板
            </Text>
            <Text style={{ fontSize: 11, lineHeight: 1.4 }}>
              <Text strong>变量：</Text>
              <Text code style={{ fontSize: 10 }}>{`{{${gridLayout.cellVariable}.name}}`}</Text>
            </Text>
          </Space>
        </Card>
          </>
        )}
      </Space>
    </div>
  );
};

export default LabelGridLayoutPanel;
