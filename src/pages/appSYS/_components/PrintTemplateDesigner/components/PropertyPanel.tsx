/**
 * 属性面板组件
 */

import React, { useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Divider,
  Button,
  Space,
  ColorPicker,
  Card,
  Upload,
  message,
  Alert,
  Drawer,
  Collapse,
} from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,
  UploadOutlined,
  LockOutlined,
  UnlockOutlined,
  QuestionCircleOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
} from '@ant-design/icons';
import {
  AtlElement,
  ElementType,
  TextProperties,
  MultilineTextProperties,
  BarcodeProperties,
  ImageProperties,
  ShapeProperties,
  TableProperties,
  TableCell,
  QRCodeProperties,
  DataMatrixProperties,
  LineProperties,
  TextAlignment,
  BarcodeType,
  TextPosition,
  FitMode,
  BorderStyle,
  VerticalAlignment,
  ShapeType,
  TriangleDirection,
  PropertyBinding,
  BindingMode,
  SectionType,
  SectionConfig,
  TemplateSections,
  AtlDataSource,
} from '../types';
import { SectionPropertyPanel } from './SectionPropertyPanel';
import { ContentAreasManager } from './ContentAreasManager';
import {
  getElementTypeName,
  createStaticBinding,
  createDataPathBinding,
  createExpressionBinding,
  ensurePropertyBinding,
  getEffectiveTextBinding,
  getEffectiveContentBinding,
  getEffectiveSourceBinding,
} from '../utils';
import { PropertyBindingEditor } from './PropertyBindingEditor';
import { FunctionHelper } from './FunctionHelper';
import { Colors, Spacing, FontSize } from '../constants/designSystem';

export interface PropertyPanelProps {
  element: AtlElement | null;
  elements?: AtlElement[];  // 所有元素列表，用于cellTemplate配置
  onUpdateElement?: (updates: Partial<AtlElement>) => void;
  onUpdateProperties: (properties: Record<string, any>) => void;
  onUpdatePosition?: (position: { x: number; y: number }) => void;
  onUpdateSize?: (size: { width: number; height: number }) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onMoveToTop: () => void;
  onMoveToBottom: () => void;
  onToggleLock?: () => void;  // 锁定/解锁切换
  // Section-related props
  selectedSection?: SectionType | null;
  sections?: TemplateSections;
  dataSources?: Record<string, AtlDataSource>;
  onUpdateSection?: (sectionType: SectionType, config: SectionConfig) => void;
  onDisableSection?: (sectionType: SectionType) => void;
  onDeselectSection?: () => void;
  // Canvas dimensions
  canvasWidth?: number;  // 画布宽度（毫米）
  canvasHeight?: number; // 画布高度（毫米）
  // 多内容区域支持
  onSectionsChange?: (sections: TemplateSections) => void;  // 区域配置整体更新
  onElementsChange?: (elements: AtlElement[]) => void; // 元素更新回调
  onSectionsAndElementsChange?: (sections: TemplateSections, elements: AtlElement[]) => void; // 原子更新回调
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({
  element,
  elements,
  onUpdateElement,
  onUpdateProperties,
  onUpdatePosition,
  onUpdateSize,
  onMoveUp,
  onMoveDown,
  onMoveToTop,
  onMoveToBottom,
  onToggleLock,
  selectedSection,
  sections,
  dataSources,
  onUpdateSection,
  onDisableSection,
  onDeselectSection,
  canvasWidth = 100,
  canvasHeight = 100,
  onSectionsChange,
  onElementsChange,
  onSectionsAndElementsChange,
}) => {
  // 函数帮助器抽屉状态
  const [functionHelperVisible, setFunctionHelperVisible] = useState(false);

  // 表格单元格选择状态（提升到组件顶层以符合 Hooks 规则）
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [cellSelectionRange, setCellSelectionRange] = useState<{
    startRow: number;
    startCol: number;
    endRow: number;
    endCol: number;
  } | null>(null);

  /**
   * 如果选中了区域,显示区域属性面板
   */
  if (selectedSection !== null && selectedSection !== undefined && sections && dataSources && onUpdateSection && onDisableSection && onDeselectSection) {
    // 如果是内容区域,显示 ContentAreasManager
    if (selectedSection === SectionType.Content && onSectionsChange) {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: Colors.propertyBg,
            display: 'flex',
            flexDirection: 'column',
            padding: Spacing.md,
            overflow: 'auto',
          }}
        >
          <ContentAreasManager
            sections={sections}
            onSectionsChange={onSectionsChange}
            pageHeight={canvasHeight}
            dataSources={dataSources}
            canvasWidth={canvasWidth}
            elements={elements || []}
            onElementsChange={onElementsChange}
            onSectionsAndElementsChange={onSectionsAndElementsChange}
          />
        </div>
      );
    }

    // 页头和页尾显示单区域属性面板
    const sectionConfig = selectedSection === SectionType.Header
      ? sections.header
      : selectedSection === SectionType.Footer
        ? sections.footer
        : undefined;

    // 计算区域高度（如果配置了则使用配置值，否则使用画布高度）
    const sectionHeight = sectionConfig?.height || canvasHeight;

    return (
      <SectionPropertyPanel
        sectionType={selectedSection}
        sections={sections}
        dataSources={dataSources}
        onUpdateSection={onUpdateSection}
        onDisableSection={onDisableSection}
        onDeselectSection={onDeselectSection}
        canvasWidth={canvasWidth}
        sectionHeight={sectionHeight}
      />
    );
  }

  /**
   * 如果没有选中元素,显示提示信息
   */
  if (!element) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: Spacing.md,
          background: Colors.propertyBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: Colors.textDisabled,
        }}
      >
        请选择一个元素或区域
      </div>
    );
  }

  const handlePropertyChange = (key: string, value: any) => {
    onUpdateProperties({ [key]: value });
  };

  const handleNestedPropertyChange = (parentKey: string, childKey: string, value: any) => {
    const parent = (element.properties as any)[parentKey] || {};
    onUpdateProperties({
      [parentKey]: {
        ...parent,
        [childKey]: value,
      },
    });
  };

  // 渲染文本属性
  const renderTextProperties = () => {
    const props = element.properties as TextProperties;

    return (
      <>
        <Form.Item label="文本内容">
          <PropertyBindingEditor
            value={getEffectiveTextBinding(props)}
            onChange={(value) => handlePropertyChange('textBinding', value)}
            valueType="string"
            showFormat={true}
            showFallback={true}
          />
        </Form.Item>

        <Divider orientation="left" plain>
          字体设置
        </Divider>

        <Form.Item label="字体">
          <Space.Compact style={{ width: '100%' }}>
            <Select
              style={{ width: '60%' }}
              value={props.font.family}
              onChange={(value) => handleNestedPropertyChange('font', 'family', value)}
            >
              <Select.Option value="Arial">Arial</Select.Option>
              <Select.Option value="SimSun">宋体</Select.Option>
              <Select.Option value="SimHei">黑体</Select.Option>
              <Select.Option value="Microsoft YaHei">微软雅黑</Select.Option>
            </Select>
            <InputNumber
              style={{ width: '40%' }}
              value={props.font.size}
              onChange={(value) => handleNestedPropertyChange('font', 'size', value || 12)}
              min={0.1}
              max={999}
            />
          </Space.Compact>
        </Form.Item>

        <Form.Item label="样式">
          <Button.Group>
            <Button
              type={props.font.bold ? 'primary' : 'default'}
              icon={<BoldOutlined />}
              onClick={() => handleNestedPropertyChange('font', 'bold', !props.font.bold)}
              title="粗体"
            />
            <Button
              type={props.font.italic ? 'primary' : 'default'}
              icon={<ItalicOutlined />}
              onClick={() => handleNestedPropertyChange('font', 'italic', !props.font.italic)}
              title="斜体"
            />
            <Button
              type={props.font.underline ? 'primary' : 'default'}
              icon={<UnderlineOutlined />}
              onClick={() => handleNestedPropertyChange('font', 'underline', !props.font.underline)}
              title="下划线"
            />
          </Button.Group>
        </Form.Item>

        <Form.Item label="对齐方式">
          <Select
            value={props.alignment}
            onChange={(value) => handlePropertyChange('alignment', value)}
          >
            <Select.Option value={TextAlignment.Left}>左对齐</Select.Option>
            <Select.Option value={TextAlignment.Center}>居中</Select.Option>
            <Select.Option value={TextAlignment.Right}>右对齐</Select.Option>
            <Select.Option value={TextAlignment.Justify}>两端对齐</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="前景色">
          <ColorPicker
            value={props.color}
            onChange={(_, hex) => handlePropertyChange('color', hex)}
          />
        </Form.Item>

        <Form.Item label="背景色">
          <ColorPicker
            value={props.backgroundColor}
            onChange={(_, hex) => handlePropertyChange('backgroundColor', hex)}
          />
        </Form.Item>

        <Form.Item label="强制位图模式" tooltip="用于处理特殊字符，如@#$%等">
          <Switch
            checked={props.forceGraphicMode}
            onChange={(value) => handlePropertyChange('forceGraphicMode', value)}
          />
        </Form.Item>
      </>
    );
  };

  // 渲染多行文本属性
  const renderMultilineTextProperties = () => {
    const props = element.properties as MultilineTextProperties;

    return (
      <>
        <Form.Item label="文本内容">
          <PropertyBindingEditor
            value={getEffectiveTextBinding(props)}
            onChange={(value) => handlePropertyChange('textBinding', value)}
            valueType="string"
            showFormat={true}
            showFallback={true}
          />
        </Form.Item>

        <Divider orientation="left" plain>
          字体设置
        </Divider>

        <Form.Item label="字体">
          <Space.Compact style={{ width: '100%' }}>
            <Select
              style={{ width: '60%' }}
              value={props.font.family}
              onChange={(value) => handleNestedPropertyChange('font', 'family', value)}
            >
              <Select.Option value="Arial">Arial</Select.Option>
              <Select.Option value="SimSun">宋体</Select.Option>
              <Select.Option value="SimHei">黑体</Select.Option>
              <Select.Option value="Microsoft YaHei">微软雅黑</Select.Option>
            </Select>
            <InputNumber
              style={{ width: '40%' }}
              value={props.font.size}
              onChange={(value) => handleNestedPropertyChange('font', 'size', value || 12)}
              min={0.1}
              max={999}
            />
          </Space.Compact>
        </Form.Item>

        <Form.Item label="样式">
          <Button.Group>
            <Button
              type={props.font.bold ? 'primary' : 'default'}
              icon={<BoldOutlined />}
              onClick={() => handleNestedPropertyChange('font', 'bold', !props.font.bold)}
              title="粗体"
            />
            <Button
              type={props.font.italic ? 'primary' : 'default'}
              icon={<ItalicOutlined />}
              onClick={() => handleNestedPropertyChange('font', 'italic', !props.font.italic)}
              title="斜体"
            />
            <Button
              type={props.font.underline ? 'primary' : 'default'}
              icon={<UnderlineOutlined />}
              onClick={() => handleNestedPropertyChange('font', 'underline', !props.font.underline)}
              title="下划线"
            />
          </Button.Group>
        </Form.Item>

        <Form.Item label="对齐方式">
          <Select
            value={props.alignment}
            onChange={(value) => handlePropertyChange('alignment', value)}
          >
            <Select.Option value={TextAlignment.Left}>左对齐</Select.Option>
            <Select.Option value={TextAlignment.Center}>居中</Select.Option>
            <Select.Option value={TextAlignment.Right}>右对齐</Select.Option>
            <Select.Option value={TextAlignment.Justify}>两端对齐</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="前景色">
          <ColorPicker
            value={props.color}
            onChange={(_, hex) => handlePropertyChange('color', hex)}
          />
        </Form.Item>

        <Form.Item label="背景色">
          <ColorPicker
            value={props.backgroundColor}
            onChange={(_, hex) => handlePropertyChange('backgroundColor', hex)}
          />
        </Form.Item>

        <Divider orientation="left" plain>
          多行文本设置
        </Divider>

        <Form.Item label="自动折行">
          <Switch
            checked={props.autoWrap !== false}
            onChange={(value) => handlePropertyChange('autoWrap', value)}
          />
        </Form.Item>

        <Form.Item label="最大行数" help="0表示不限制">
          <InputNumber
            value={props.maxLines || 0}
            onChange={(value) => handlePropertyChange('maxLines', value || 0)}
            min={0}
            max={100}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="行高倍数">
          <InputNumber
            value={props.lineHeight || 1.2}
            onChange={(value) => handlePropertyChange('lineHeight', value || 1.2)}
            min={0.8}
            max={3}
            step={0.1}
            precision={1}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="单词内断行">
          <Switch
            checked={props.breakWords || false}
            onChange={(value) => handlePropertyChange('breakWords', value)}
          />
        </Form.Item>

        <Form.Item label="超出显示省略号">
          <Switch
            checked={props.ellipsis || false}
            onChange={(value) => handlePropertyChange('ellipsis', value)}
          />
        </Form.Item>
      </>
    );
  };

  // 渲染条码属性
  const renderBarcodeProperties = () => {
    const props = element.properties as BarcodeProperties;

    return (
      <>
        <Form.Item label="条码内容">
          <PropertyBindingEditor
            value={getEffectiveContentBinding(props)}
            onChange={(value) => handlePropertyChange('contentBinding', value)}
            valueType="string"
            showFormat={true}
            showFallback={true}
          />
        </Form.Item>

        <Form.Item label="条码类型">
          <Select
            value={props.barcodeType}
            onChange={(value) => handlePropertyChange('barcodeType', value)}
          >
            <Select.Option value={BarcodeType.Code128}>Code128</Select.Option>
            <Select.Option value={BarcodeType.Code39}>Code39</Select.Option>
            <Select.Option value={BarcodeType.EAN13}>EAN13</Select.Option>
            <Select.Option value={BarcodeType.QRCode}>QRCode</Select.Option>
            <Select.Option value={BarcodeType.DataMatrix}>DataMatrix</Select.Option>
            <Select.Option value={BarcodeType.PDF417}>PDF417</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="条码高度">
          <InputNumber
            value={props.height || 10}
            onChange={(value) => handlePropertyChange('height', value || 10)}
            min={5}
            max={100}
            addonAfter="mm"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="显示文本">
          <Switch
            checked={props.showText}
            onChange={(value) => handlePropertyChange('showText', value)}
          />
        </Form.Item>

        {props.showText && (
          <Form.Item label="文本位置">
            <Select
              value={props.textPosition}
              onChange={(value) => handlePropertyChange('textPosition', value)}
            >
              <Select.Option value={TextPosition.None}>无</Select.Option>
              <Select.Option value={TextPosition.Above}>顶部</Select.Option>
              <Select.Option value={TextPosition.Below}>底部</Select.Option>
            </Select>
          </Form.Item>
        )}

        <Form.Item label="模块宽度">
          <InputNumber
            value={props.moduleWidth}
            onChange={(value) => handlePropertyChange('moduleWidth', value || 2)}
            min={1}
            max={10}
          />
        </Form.Item>

        <Divider orientation="left" plain>
          高级设置
        </Divider>

        <Form.Item
          label="强制位图模式"
          tooltip="启用后条码将渲染为图片,用于精确控制尺寸(解决ZPL二维码指令不支持固定尺寸的问题)"
        >
          <Switch
            checked={props.forceGraphicMode || false}
            onChange={(value) => handlePropertyChange('forceGraphicMode', value)}
          />
        </Form.Item>
      </>
    );
  };

  // 渲染图片属性
  const renderImageProperties = () => {
    const props = element.properties as ImageProperties;

    // 处理图片上传
    const handleImageUpload = (file: File) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        handlePropertyChange('sourceBinding', createStaticBinding(base64String));
        message.success('图片上传成功');
      };

      reader.onerror = () => {
        message.error('图片读取失败');
      };

      reader.readAsDataURL(file);
      return false; // 阻止自动上传
    };

    // 解析 source 为字符串值（使用双属性模式）
    const sourceBinding = getEffectiveSourceBinding(props);
    // 在属性面板中，我们只关心静态值用于预览
    const sourceValue = (sourceBinding.mode === BindingMode.Static ? sourceBinding.staticValue : '') as string;

    // 判断是否是 base64 或有效图片源
    const hasImageSource = sourceValue && (
      sourceValue.startsWith('data:image') ||
      sourceValue.startsWith('http') ||
      sourceValue.startsWith('/')
    );

    return (
      <>
        <Form.Item label="图片上传">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Upload
              accept="image/*"
              maxCount={1}
              showUploadList={false}
              beforeUpload={handleImageUpload}
            >
              <Button icon={<UploadOutlined />} block>
                {hasImageSource ? '重新上传图片' : '上传本地图片'}
              </Button>
            </Upload>

            {hasImageSource && (
              <div style={{
                marginTop: 8,
                border: '1px solid #d9d9d9',
                borderRadius: 4,
                padding: 8,
                textAlign: 'center'
              }}>
                <img
                  src={sourceValue}
                  alt="预览"
                  style={{
                    maxWidth: '100%',
                    maxHeight: 200,
                    objectFit: 'contain'
                  }}
                />
              </div>
            )}
          </Space>
        </Form.Item>

        <Form.Item label="图片源" help="支持URL、Base64或数据绑定">
          <PropertyBindingEditor
            value={getEffectiveSourceBinding(props)}
            onChange={(value) => handlePropertyChange('sourceBinding', value)}
            valueType="string"
            showFormat={false}
            showFallback={true}
          />
        </Form.Item>

        <Form.Item label="适配模式">
          <Select
            value={props.fitMode}
            onChange={(value) => handlePropertyChange('fitMode', value)}
          >
            <Select.Option value={FitMode.Contain}>包含</Select.Option>
            <Select.Option value={FitMode.Cover}>覆盖</Select.Option>
            <Select.Option value={FitMode.Fill}>填充</Select.Option>
            <Select.Option value={FitMode.None}>原始</Select.Option>
          </Select>
        </Form.Item>
      </>
    );
  };

  // 渲染表格属性
  const renderTableProperties = () => {
    const props = element.properties as TableProperties;

    // 调整行数
    const handleRowsChange = (newRows: number) => {
      if (!newRows || newRows < 1) return;

      const currentRows = props.rows;
      let newCells = [...props.cells];
      let newRowHeights = [...props.rowHeights];

      if (newRows > currentRows) {
        // 增加行
        for (let i = currentRows; i < newRows; i++) {
          newCells.push(
            Array.from({ length: props.columns }, () => ({
              contentBinding: createStaticBinding(''),
              rowSpan: 1,
              colSpan: 1,
              merged: false,
            }))
          );
          newRowHeights.push(10); // 默认10mm
        }
      } else if (newRows < currentRows) {
        // 减少行
        newCells = newCells.slice(0, newRows);
        newRowHeights = newRowHeights.slice(0, newRows);
      }

      onUpdateProperties({
        rows: newRows,
        cells: newCells,
        rowHeights: newRowHeights,
      });
    };

    // 调整列数
    const handleColumnsChange = (newCols: number) => {
      if (!newCols || newCols < 1) return;

      const currentCols = props.columns;
      let newCells = props.cells.map(row => [...row]);
      let newColWidths = [...props.colWidths];

      if (newCols > currentCols) {
        // 增加列
        newCells = newCells.map(row => [
          ...row,
          ...Array.from({ length: newCols - currentCols }, () => ({
            contentBinding: createStaticBinding(''),
            rowSpan: 1,
            colSpan: 1,
            merged: false,
          }))
        ]);
        for (let i = currentCols; i < newCols; i++) {
          newColWidths.push(30); // 默认30mm
        }
      } else if (newCols < currentCols) {
        // 减少列
        newCells = newCells.map(row => row.slice(0, newCols));
        newColWidths = newColWidths.slice(0, newCols);
      }

      onUpdateProperties({
        columns: newCols,
        cells: newCells,
        colWidths: newColWidths,
      });
    };

    // 合并选中的单元格
    const handleMergeCells = () => {
      if (!cellSelectionRange) return;

      const { startRow, startCol, endRow, endCol } = cellSelectionRange;
      const rowSpan = endRow - startRow + 1;
      const colSpan = endCol - startCol + 1;

      if (rowSpan === 1 && colSpan === 1) return; // 单个单元格无需合并

      const newCells = props.cells.map(row => row.map(cell => ({ ...cell })));

      // 合并内容（使用双属性模式）
      let mergedContent = '';
      for (let r = startRow; r <= endRow; r++) {
        for (let c = startCol; c <= endCol; c++) {
          const cellBinding = getEffectiveContentBinding(newCells[r][c]);
          const cellValue = cellBinding.mode === BindingMode.Static ? cellBinding.staticValue : '';
          if (cellValue) {
            mergedContent += (mergedContent ? ' ' : '') + cellValue;
          }
        }
      }

      // 设置左上角单元格
      newCells[startRow][startCol] = {
        contentBinding: createStaticBinding(mergedContent),
        rowSpan,
        colSpan,
        merged: false,
      };

      // 标记其他单元格为已合并
      for (let r = startRow; r <= endRow; r++) {
        for (let c = startCol; c <= endCol; c++) {
          if (r !== startRow || c !== startCol) {
            newCells[r][c] = {
              contentBinding: createStaticBinding(''),
              rowSpan: 1,
              colSpan: 1,
              merged: true,
            };
          }
        }
      }

      onUpdateProperties({ cells: newCells });
      setCellSelectionRange(null);
    };

    // 拆分单元格
    const handleSplitCell = () => {
      if (!selectedCell) return;

      const { row, col } = selectedCell;
      const cell = props.cells[row][col];

      if (cell.rowSpan === 1 && cell.colSpan === 1) return; // 未合并的单元格无需拆分

      const newCells = props.cells.map(r => r.map(c => ({ ...c })));

      // 恢复被合并的单元格（使用双属性模式）
      for (let r = row; r < row + cell.rowSpan; r++) {
        for (let c = col; c < col + cell.colSpan; c++) {
          newCells[r][c] = {
            contentBinding: r === row && c === col ? (cell.contentBinding || createStaticBinding('')) : createStaticBinding(''),
            rowSpan: 1,
            colSpan: 1,
            merged: false,
          };
        }
      }

      onUpdateProperties({ cells: newCells });
    };

    // 更新单元格内容（使用双属性模式）
    const handleCellContentChange = (row: number, col: number, contentBinding: PropertyBinding) => {
      const newCells = props.cells.map(r => r.map(c => ({ ...c })));
      newCells[row][col].contentBinding = contentBinding;
      onUpdateProperties({ cells: newCells });
    };

    // 调整行高
    const handleRowHeightChange = (rowIndex: number, height: number) => {
      const newRowHeights = [...props.rowHeights];
      newRowHeights[rowIndex] = Math.max(5, height); // 最小5mm
      onUpdateProperties({ rowHeights: newRowHeights });
    };

    // 调整列宽
    const handleColWidthChange = (colIndex: number, width: number) => {
      const newColWidths = [...props.colWidths];
      newColWidths[colIndex] = Math.max(10, width); // 最小10mm
      onUpdateProperties({ colWidths: newColWidths });
    };

    return (
      <>
        <Form.Item label="行数">
          <InputNumber
            value={props.rows}
            onChange={handleRowsChange}
            min={1}
            max={20}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="列数">
          <InputNumber
            value={props.columns}
            onChange={handleColumnsChange}
            min={1}
            max={10}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="显示边框">
          <Switch
            checked={props.showBorders}
            onChange={(value) => handlePropertyChange('showBorders', value)}
          />
        </Form.Item>

        {props.showBorders && (
          <>
            <Form.Item label="边框样式">
              <Select
                value={props.borderStyle ?? BorderStyle.Solid}
                onChange={(value) => handlePropertyChange('borderStyle', value)}
                style={{ width: '100%' }}
              >
                <Select.Option value={BorderStyle.Solid}>实线</Select.Option>
                <Select.Option value={BorderStyle.Dashed}>虚线</Select.Option>
                <Select.Option value={BorderStyle.Dotted}>点线</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="边框宽度">
              <InputNumber
                value={props.borderWidth ?? 0.5}
                onChange={(value) => handlePropertyChange('borderWidth', value ?? 0.5)}
                min={0.1}
                max={5}
                step={0.1}
                precision={1}
                addonAfter="mm"
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item label="边框颜色">
              <ColorPicker
                value={props.borderColor || '#000000'}
                onChange={(_, hex) => handlePropertyChange('borderColor', hex)}
              />
            </Form.Item>
          </>
        )}

        <Form.Item label="单元格内边距">
          <InputNumber
            value={props.cellPadding || 1}
            onChange={(value) => handlePropertyChange('cellPadding', value || 1)}
            min={0}
            max={10}
            step={0.5}
            addonAfter="mm"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="文本对齐">
          <Select
            value={props.alignment ?? TextAlignment.Left}
            onChange={(value) => handlePropertyChange('alignment', value)}
            style={{ width: '100%' }}
          >
            <Select.Option value={TextAlignment.Left}>左对齐</Select.Option>
            <Select.Option value={TextAlignment.Center}>居中</Select.Option>
            <Select.Option value={TextAlignment.Right}>右对齐</Select.Option>
            <Select.Option value={TextAlignment.Justify}>两端对齐</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="垂直对齐">
          <Select
            value={props.verticalAlignment ?? VerticalAlignment.Middle}
            onChange={(value) => handlePropertyChange('verticalAlignment', value)}
            style={{ width: '100%' }}
          >
            <Select.Option value={VerticalAlignment.Top}>顶部对齐</Select.Option>
            <Select.Option value={VerticalAlignment.Middle}>居中对齐</Select.Option>
            <Select.Option value={VerticalAlignment.Bottom}>底部对齐</Select.Option>
          </Select>
        </Form.Item>

        <Divider orientation="left" plain>
          行高设置
        </Divider>

        {props.rowHeights.map((height, index) => (
          <Form.Item key={`row-${index}`} label={`第${index + 1}行`}>
            <InputNumber
              value={height}
              onChange={(value) => handleRowHeightChange(index, value || 10)}
              min={5}
              max={100}
              addonAfter="mm"
              style={{ width: '100%' }}
            />
          </Form.Item>
        ))}

        <Divider orientation="left" plain>
          列宽设置
        </Divider>

        {props.colWidths.map((width, index) => (
          <Form.Item key={`col-${index}`} label={`第${index + 1}列`}>
            <InputNumber
              value={width}
              onChange={(value) => handleColWidthChange(index, value || 30)}
              min={10}
              max={200}
              addonAfter="mm"
              style={{ width: '100%' }}
            />
          </Form.Item>
        ))}

        <Divider orientation="left" plain>
          单元格编辑
        </Divider>

        <Form.Item label="选择单元格">
          <Select
            value={selectedCell ? `${selectedCell.row}-${selectedCell.col}` : undefined}
            onChange={(value) => {
              if (value) {
                const [row, col] = value.split('-').map(Number);
                setSelectedCell({ row, col });
              } else {
                setSelectedCell(null);
              }
            }}
            placeholder="选择要编辑的单元格"
            allowClear
            style={{ width: '100%' }}
          >
            {props.cells.map((row, rowIndex) =>
              row.map((cell, colIndex) =>
                !cell.merged ? (
                  <Select.Option key={`${rowIndex}-${colIndex}`} value={`${rowIndex}-${colIndex}`}>
                    单元格 [{rowIndex + 1}, {colIndex + 1}]
                  </Select.Option>
                ) : null
              )
            )}
          </Select>
        </Form.Item>

        {selectedCell && !props.cells[selectedCell.row][selectedCell.col].merged && (
          <>
            <Form.Item label="单元格内容">
              <PropertyBindingEditor
                value={getEffectiveContentBinding(props.cells[selectedCell.row][selectedCell.col])}
                onChange={(value) => handleCellContentChange(selectedCell.row, selectedCell.col, value)}
                valueType="string"
                showFormat={true}
                showFallback={true}
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  onClick={handleSplitCell}
                  disabled={
                    props.cells[selectedCell.row][selectedCell.col].rowSpan === 1 &&
                    props.cells[selectedCell.row][selectedCell.col].colSpan === 1
                  }
                >
                  拆分单元格
                </Button>
              </Space>
            </Form.Item>
          </>
        )}

        <Divider orientation="left" plain>
          合并单元格
        </Divider>

        <Form.Item label="选择范围" help="格式: 起始行-起始列-结束行-结束列">
          <Input
            placeholder="例如: 0-0-1-1"
            onChange={(e) => {
              const value = e.target.value;
              const match = value.match(/^(\d+)-(\d+)-(\d+)-(\d+)$/);
              if (match) {
                const [, startRow, startCol, endRow, endCol] = match.map(Number);
                if (
                  startRow < props.rows &&
                  endRow < props.rows &&
                  startCol < props.columns &&
                  endCol < props.columns &&
                  startRow <= endRow &&
                  startCol <= endCol
                ) {
                  setCellSelectionRange({ startRow, startCol, endRow, endCol });
                } else {
                  setCellSelectionRange(null);
                }
              } else {
                setCellSelectionRange(null);
              }
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            onClick={handleMergeCells}
            disabled={!cellSelectionRange}
            block
          >
            合并选中单元格
          </Button>
        </Form.Item>
      </>
    );
  };

  // 渲染二维码属性
  const renderQRCodeProperties = () => {
    const props = element.properties as QRCodeProperties;

    return (
      <>
        <Form.Item label="二维码内容">
          <PropertyBindingEditor
            value={getEffectiveContentBinding(props)}
            onChange={(value) => handlePropertyChange('contentBinding', value)}
            valueType="string"
            showFormat={false}
            showFallback={true}
          />
        </Form.Item>

        <Form.Item label="纠错等级">
          <Select
            value={props.errorCorrectionLevel || 2}
            onChange={(value) => handlePropertyChange('errorCorrectionLevel', value)}
          >
            <Select.Option value={0}>L (7%)</Select.Option>
            <Select.Option value={1}>M (15%)</Select.Option>
            <Select.Option value={2}>Q (25%)</Select.Option>
            <Select.Option value={3}>H (30%)</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="模块大小">
          <InputNumber
            value={props.moduleSize || 3}
            onChange={(value) => handlePropertyChange('moduleSize', value || 3)}
            min={2}
            max={10}
            addonAfter="px"
          />
        </Form.Item>

        <Form.Item label="前景色">
          <ColorPicker
            value={props.foregroundColor || '#000000'}
            onChange={(_, hex) => handlePropertyChange('foregroundColor', hex)}
          />
        </Form.Item>

        <Form.Item label="背景色">
          <ColorPicker
            value={props.backgroundColor || '#FFFFFF'}
            onChange={(_, hex) => handlePropertyChange('backgroundColor', hex)}
          />
        </Form.Item>
      </>
    );
  };

  // 渲染数据矩阵码属性
  const renderDataMatrixProperties = () => {
    const props = element.properties as DataMatrixProperties;

    return (
      <>
        <Form.Item label="矩阵码内容">
          <PropertyBindingEditor
            value={getEffectiveContentBinding(props)}
            onChange={(value) => handlePropertyChange('contentBinding', value)}
            valueType="string"
            showFormat={false}
            showFallback={true}
          />
        </Form.Item>

        <Form.Item label="模块大小">
          <InputNumber
            value={props.moduleSize || 3}
            onChange={(value) => handlePropertyChange('moduleSize', value || 3)}
            min={2}
            max={10}
            addonAfter="px"
          />
        </Form.Item>

        <Form.Item label="前景色">
          <ColorPicker
            value={props.foregroundColor || '#000000'}
            onChange={(_, hex) => handlePropertyChange('foregroundColor', hex)}
          />
        </Form.Item>

        <Form.Item label="背景色">
          <ColorPicker
            value={props.backgroundColor || '#FFFFFF'}
            onChange={(_, hex) => handlePropertyChange('backgroundColor', hex)}
          />
        </Form.Item>
      </>
    );
  };

  // 渲染线条属性
  const renderLineProperties = () => {
    const props = element.properties as LineProperties;

    return (
      <>
        <Form.Item label="起始点X">
          <InputNumber
            value={props.startX}
            onChange={(value) => handlePropertyChange('startX', value || 0)}
            addonAfter="mm"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="起始点Y">
          <InputNumber
            value={props.startY}
            onChange={(value) => handlePropertyChange('startY', value || 0)}
            addonAfter="mm"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="终止点X">
          <InputNumber
            value={props.endX}
            onChange={(value) => handlePropertyChange('endX', value || 100)}
            addonAfter="mm"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="终止点Y">
          <InputNumber
            value={props.endY}
            onChange={(value) => handlePropertyChange('endY', value || 0)}
            addonAfter="mm"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="线条宽度">
          <InputNumber
            value={props.strokeWidth || 1}
            onChange={(value) => handlePropertyChange('strokeWidth', value || 0.1)}
            min={0.1}
            max={10}
            step={0.1}
            precision={1}
            addonAfter="mm"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="线条颜色">
          <ColorPicker
            value={props.strokeColor || '#000000'}
            onChange={(_, hex) => handlePropertyChange('strokeColor', hex)}
          />
        </Form.Item>

        <Form.Item label="线条样式">
          <Select
            value={props.strokeStyle ?? BorderStyle.Solid}
            onChange={(value) => handlePropertyChange('strokeStyle', value)}
          >
            <Select.Option value={BorderStyle.Solid}>实线</Select.Option>
            <Select.Option value={BorderStyle.Dashed}>虚线</Select.Option>
            <Select.Option value={BorderStyle.Dotted}>点线</Select.Option>
          </Select>
        </Form.Item>
      </>
    );
  };

  // 渲染图形属性
  const renderShapeProperties = () => {
    const props = element.properties as ShapeProperties;

    return (
      <>
        <Form.Item label="图形类型">
          <Select
            value={props.shapeType}
            onChange={(value) => handlePropertyChange('shapeType', value)}
          >
            <Select.Option value={ShapeType.Rectangle}>矩形</Select.Option>
            <Select.Option value={ShapeType.Circle}>圆形/椭圆</Select.Option>
            <Select.Option value={ShapeType.Line}>直线</Select.Option>
            <Select.Option value={ShapeType.Polygon}>多边形</Select.Option>
            <Select.Option value={ShapeType.Triangle}>三角形</Select.Option>
            <Select.Option value={ShapeType.Diamond}>菱形</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="填充颜色">
          <ColorPicker
            value={props.fillColor || '#FFFFFF'}
            onChange={(_, hex) => handlePropertyChange('fillColor', hex)}
            showText
          />
        </Form.Item>

        <Form.Item label="边框颜色">
          <ColorPicker
            value={props.strokeColor || '#000000'}
            onChange={(_, hex) => handlePropertyChange('strokeColor', hex)}
            showText
          />
        </Form.Item>

        <Form.Item label="边框宽度">
          <InputNumber
            value={props.strokeWidth || 1}
            onChange={(value) => handlePropertyChange('strokeWidth', value || 1)}
            min={0}
            max={10}
            step={0.5}
            addonAfter="mm"
            style={{ width: '100%' }}
          />
        </Form.Item>

        {props.shapeType === ShapeType.Rectangle && (
          <Form.Item label="圆角半径" tooltip="仅矩形有效">
            <InputNumber
              value={props.borderRadius || 0}
              onChange={(value) => handlePropertyChange('borderRadius', value || 0)}
              min={0}
              max={50}
              step={1}
              addonAfter="mm"
              style={{ width: '100%' }}
            />
          </Form.Item>
        )}

        {props.shapeType === ShapeType.Triangle && (
          <Form.Item label="三角形方向" tooltip="仅三角形有效">
            <Select
              value={props.triangleDirection || TriangleDirection.Up}
              onChange={(value) => handlePropertyChange('triangleDirection', value)}
            >
              <Select.Option value={TriangleDirection.Up}>向上 ▲</Select.Option>
              <Select.Option value={TriangleDirection.Down}>向下 ▼</Select.Option>
              <Select.Option value={TriangleDirection.Left}>向左 ◀</Select.Option>
              <Select.Option value={TriangleDirection.Right}>向右 ▶</Select.Option>
            </Select>
          </Form.Item>
        )}
      </>
    );
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: Colors.propertyBg,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <style>
        {`
          .ant-form-item {
            margin-bottom: 12px;
          }
          .ant-form-item:last-child {
            margin-bottom: 0;
          }

          /* 确保 Card 组件支持垂直滚动 */
          .ant-card {
            height: 100%;
            display: flex !important;
            flex-direction: column !important;
            overflow: hidden !important;
          }

          .ant-card-head {
            flex-shrink: 0;
          }

          .ant-card-body {
            flex: 1 !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            min-height: 0 !important;
          }
        `}
      </style>
      <Card
        title={`${getElementTypeName(element.type)}属性`}
        size="small"
        extra={
          <Space size="small">
            <Button size="small" icon={<VerticalAlignTopOutlined />} onClick={onMoveToTop} title="置顶" />
            <Button size="small" icon={<ArrowUpOutlined />} onClick={onMoveUp} title="上移一层" />
            <Button size="small" icon={<ArrowDownOutlined />} onClick={onMoveDown} title="下移一层" />
            <Button size="small" icon={<VerticalAlignBottomOutlined />} onClick={onMoveToBottom} title="置底" />
          </Space>
        }
        style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
        bodyStyle={{ flex: 1, overflow: 'auto', padding: '16px' }}
      >
        <Form
          layout="horizontal"
          size="small"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ marginBottom: 0 }}
        >
          <Collapse
            defaultActiveKey={['basic', 'control', 'properties']}
            ghost
            size="small"
            style={{ background: 'transparent' }}
          >
            {/* 基础信息 */}
            <Collapse.Panel header="基础信息" key="basic">
              <Form.Item label="位置 X">
                <InputNumber
                  value={element.position.x}
                  onChange={(value) => {
                    if (value !== null && onUpdatePosition) {
                      onUpdatePosition({ ...element.position, x: value });
                    }
                  }}
                  min={0}
                  precision={2}
                  style={{ width: '100%' }}
                  addonAfter="mm"
                />
              </Form.Item>

              <Form.Item label="位置 Y">
                <InputNumber
                  value={element.position.y}
                  onChange={(value) => {
                    if (value !== null && onUpdatePosition) {
                      onUpdatePosition({ ...element.position, y: value });
                    }
                  }}
                  min={0}
                  precision={2}
                  style={{ width: '100%' }}
                  addonAfter="mm"
                />
              </Form.Item>

              <Form.Item label="宽度">
                <InputNumber
                  value={element.size.width}
                  onChange={(value) => {
                    if (value !== null && value > 0 && onUpdateSize) {
                      onUpdateSize({ ...element.size, width: value });
                    }
                  }}
                  min={1}
                  precision={2}
                  style={{ width: '100%' }}
                  addonAfter="mm"
                />
              </Form.Item>

              <Form.Item label="高度">
                <InputNumber
                  value={element.size.height}
                  onChange={(value) => {
                    if (value !== null && value > 0 && onUpdateSize) {
                      onUpdateSize({ ...element.size, height: value });
                    }
                  }}
                  min={1}
                  precision={2}
                  style={{ width: '100%' }}
                  addonAfter="mm"
                />
              </Form.Item>

              <Form.Item
                label="元素可见性"
                help="支持静态值、数据路径、条件表达式"
              >
                <PropertyBindingEditor
                  value={ensurePropertyBinding(element.visible, 'boolean')}
                  onChange={(value) => onUpdateElement?.({ visible: value })}
                  valueType="boolean"
                  showFormat={false}
                  showFallback={true}
                />
              </Form.Item>

              <Form.Item label="所属区域" help="选择元素所属的页面区域">
                <Select
                  value={element.section ?? SectionType.Content}
                  onChange={(value) => onUpdateElement?.({ section: value })}
                  style={{ width: '100%' }}
                >
                  <Select.Option value={SectionType.Header}>页头区域</Select.Option>
                  <Select.Option value={SectionType.Content}>内容区域</Select.Option>
                  <Select.Option value={SectionType.Footer}>页尾区域</Select.Option>
                </Select>
              </Form.Item>
            </Collapse.Panel>

            {/* 元素控制 */}
            <Collapse.Panel header="元素控制" key="control">
              <Form.Item label="锁定元素" tooltip="锁定后元素不可拖动和调整大小">
                <Button
                  icon={element.locked ? <LockOutlined /> : <UnlockOutlined />}
                  onClick={onToggleLock}
                  block
                  type={element.locked ? 'primary' : 'default'}
                  danger={element.locked}
                >
                  {element.locked ? '已锁定' : '未锁定'}
                </Button>
              </Form.Item>
            </Collapse.Panel>

            {/* 元素属性 */}
            <Collapse.Panel header="元素属性" key="properties">
              {element.type === ElementType.Text && renderTextProperties()}
              {element.type === ElementType.MultilineText && renderMultilineTextProperties()}
              {element.type === ElementType.Barcode && renderBarcodeProperties()}
              {element.type === ElementType.Image && renderImageProperties()}
              {element.type === ElementType.Shape && renderShapeProperties()}
              {element.type === ElementType.Table && renderTableProperties()}
              {element.type === ElementType.QRCode && renderQRCodeProperties()}
              {element.type === ElementType.DataMatrix && renderDataMatrixProperties()}
              {element.type === ElementType.Line && renderLineProperties()}
            </Collapse.Panel>

            {/* 循环渲染 */}
            <Collapse.Panel header="循环渲染" key="loop">
              <Form.Item label="启用循环">
                <Switch
                  checked={!!element.loop}
                  onChange={(checked) => {
                    if (checked) {
                      onUpdateElement?.({
                        loop: {
                          dataSource: '',
                          itemVariable: 'item',
                          indexVariable: 'index',
                          maxIterations: 100,
                        },
                      });
                    } else {
                      onUpdateElement?.({ loop: undefined });
                    }
                  }}
                />
              </Form.Item>

              {element.loop && (
                <>
                  <Form.Item label="数据源名称">
                    <Input
                      value={element.loop.dataSource || ''}
                      onChange={(e) =>
                        onUpdateElement?.({
                          loop: {
                            ...element.loop!,
                            dataSource: e.target.value,
                          },
                        })
                      }
                      placeholder="数据源名称"
                    />
                  </Form.Item>

                  <Form.Item label="当前项变量">
                    <Input
                      value={element.loop.itemVariable || 'item'}
                      onChange={(e) =>
                        onUpdateElement?.({
                          loop: {
                            ...element.loop!,
                            itemVariable: e.target.value,
                          },
                        })
                      }
                      placeholder="默认: item"
                    />
                  </Form.Item>

                  <Form.Item label="索引变量">
                    <Input
                      value={element.loop.indexVariable || 'index'}
                      onChange={(e) =>
                        onUpdateElement?.({
                          loop: {
                            ...element.loop!,
                            indexVariable: e.target.value,
                          },
                        })
                      }
                      placeholder="默认: index"
                    />
                  </Form.Item>

                  <Form.Item label="最大迭代次数">
                    <InputNumber
                      value={element.loop.maxIterations || 100}
                      onChange={(value) =>
                        onUpdateElement?.({
                          loop: {
                            ...element.loop!,
                            maxIterations: value || 100,
                          },
                        })
                      }
                      min={1}
                      max={1000}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </>
              )}
            </Collapse.Panel>

            {/* 函数帮助 */}
            <Collapse.Panel header="函数帮助" key="help">
              <Form.Item>
                <Button
                  type="dashed"
                  block
                  icon={<QuestionCircleOutlined />}
                  onClick={() => setFunctionHelperVisible(true)}
                >
                  打开函数帮助器
                </Button>
              </Form.Item>
            </Collapse.Panel>
          </Collapse>
        </Form>
      </Card>

      {/* 函数帮助器抽屉 */}
      <Drawer
        title="函数帮助器"
        placement="right"
        width={600}
        open={functionHelperVisible}
        onClose={() => setFunctionHelperVisible(false)}
        destroyOnClose
      >
        <FunctionHelper
          onInsertFunction={(func) => {
            message.success(`已复制函数签名: ${func.signature}`);
            // 可以在此处实现插入到当前正在编辑的表达式中的逻辑
          }}
        />
      </Drawer>
    </div>
  );
};
