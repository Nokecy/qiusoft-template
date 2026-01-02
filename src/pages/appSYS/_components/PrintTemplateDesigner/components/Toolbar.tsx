/**
 * 工具栏组件
 */

import React from 'react';
import { Button, Space, Dropdown, InputNumber, Select, message, Upload, Divider, Tooltip, Switch, Alert } from 'antd';
import type { MenuProps } from 'antd';
import {
  SaveOutlined,
  FolderOpenOutlined,
  UndoOutlined,
  RedoOutlined,
  DeleteOutlined,
  DownloadOutlined,
  SettingOutlined,
  CodeOutlined,
  CheckCircleOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignBottomOutlined,
  ColumnWidthOutlined,
  ColumnHeightOutlined,
  CopyOutlined,
  ScissorOutlined,
  SnippetsOutlined,
  PrinterOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Colors, Spacing, FontSize } from '../constants/designSystem';
import type { AtlTemplate, PrintTemplateType } from '../types';

export interface ToolBarProps {
  template: AtlTemplate;
  canUndo: boolean;
  canRedo: boolean;
  selectedElementId: string | null;
  targetLanguage: PrintTemplateType;
  showSectionBoundaries?: boolean;
  showGridBoundaries?: boolean;
  onSave: () => void;
  onExport: () => void;
  onImport: (template: AtlTemplate) => void;
  onConvert?: () => void;
  onValidate?: () => void;
  onTestPrint?: () => void;
  onShowTour?: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onDelete: () => void;
  onCanvasSizeChange: (width: number, height: number) => void;
  onDpiChange: (dpi: number) => void;
  onTargetLanguageChange: (language: PrintTemplateType) => void;
  onAlign?: (type: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => void;
  onDistribute?: (type: 'horizontal' | 'vertical') => void;
  onToggleHeader?: () => void;
  onToggleFooter?: () => void;
  onToggleSectionBoundaries?: (checked: boolean) => void;
  onToggleGridBoundaries?: (checked: boolean) => void;
  onPaperSizeChange?: (paperWidth?: number, paperHeight?: number) => void;
}

export const ToolBar: React.FC<ToolBarProps> = ({
  template,
  canUndo,
  canRedo,
  selectedElementId,
  targetLanguage,
  showSectionBoundaries = true,
  showGridBoundaries = true,
  onSave,
  onExport,
  onImport,
  onConvert,
  onValidate,
  onTestPrint,
  onShowTour,
  onUndo,
  onRedo,
  onDelete,
  onCanvasSizeChange,
  onDpiChange,
  onTargetLanguageChange,
  onAlign,
  onDistribute,
  onToggleHeader,
  onToggleFooter,
  onToggleSectionBoundaries,
  onToggleGridBoundaries,
  onPaperSizeChange,
}) => {
  // 导入模板
  const handleImportFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = e.target?.result as string;
        const template = JSON.parse(json);
        onImport(template);
        message.success('模板导入成功');
      } catch (error) {
        message.error('模板文件格式错误');
      }
    };
    reader.readAsText(file);
    return false; // 阻止自动上传
  };

  // 计算分页信息
  const calculatePaginationInfo = () => {
    const effectivePaperHeight = template.canvas.paperHeight ?? template.canvas.height;
    const willPaginate = template.canvas.height > effectivePaperHeight;

    if (!willPaginate) {
      return { willPaginate: false };
    }

    const estimatedPages = Math.ceil(template.canvas.height / effectivePaperHeight);
    const availableHeightPerPage = effectivePaperHeight;

    return {
      willPaginate: true,
      effectivePaperHeight,
      availableHeightPerPage,
      estimatedPages,
    };
  };

  const paginationInfo = calculatePaginationInfo();

  return (
    <div
      style={{
        padding: `${Spacing.sm}px ${Spacing.md}px`,
        background: Colors.toolbarBg,
        borderBottom: `1px solid ${Colors.border}`,
        display: 'flex',
        flexDirection: 'column',
        gap: `${Spacing.sm}px`,
      }}
    >
      {/* 第一行：操作按钮 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Space split={<Divider type="vertical" />} size="middle">
          {/* 编辑操作组 */}
          <Space size="small">
            <Tooltip title="撤销 (Ctrl+Z)">
              <Button
                icon={<UndoOutlined />}
                disabled={!canUndo}
                onClick={onUndo}
                size="small"
              />
            </Tooltip>
            <Tooltip title="重做 (Ctrl+Y)">
              <Button
                icon={<RedoOutlined />}
                disabled={!canRedo}
                onClick={onRedo}
                size="small"
              />
            </Tooltip>
            <Tooltip title="复制 (Ctrl+C)">
              <Button
                icon={<CopyOutlined />}
                disabled={!selectedElementId}
                size="small"
              />
            </Tooltip>
            <Tooltip title="粘贴 (Ctrl+V)">
              <Button
                icon={<SnippetsOutlined />}
                size="small"
              />
            </Tooltip>
            <Tooltip title="删除 (Delete)">
              <Button
                danger
                icon={<DeleteOutlined />}
                disabled={!selectedElementId}
                onClick={onDelete}
                size="small"
              />
            </Tooltip>
          </Space>

          {/* 对齐工具组 */}
          <Space size="small">
            {onAlign && (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'left',
                      label: '左对齐',
                      icon: <AlignLeftOutlined />,
                      onClick: () => onAlign('left'),
                    },
                    {
                      key: 'center',
                      label: '水平居中',
                      icon: <AlignCenterOutlined />,
                      onClick: () => onAlign('center'),
                    },
                    {
                      key: 'right',
                      label: '右对齐',
                      icon: <AlignRightOutlined />,
                      onClick: () => onAlign('right'),
                    },
                    { type: 'divider' },
                    {
                      key: 'top',
                      label: '顶对齐',
                      icon: <VerticalAlignTopOutlined />,
                      onClick: () => onAlign('top'),
                    },
                    {
                      key: 'middle',
                      label: '垂直居中',
                      icon: <VerticalAlignMiddleOutlined />,
                      onClick: () => onAlign('middle'),
                    },
                    {
                      key: 'bottom',
                      label: '底对齐',
                      icon: <VerticalAlignBottomOutlined />,
                      onClick: () => onAlign('bottom'),
                    },
                  ],
                }}
                disabled={!selectedElementId}
              >
                <Button disabled={!selectedElementId} size="small">
                  对齐
                </Button>
              </Dropdown>
            )}

            {/* 分布工具 */}
            {onDistribute && (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'horizontal',
                      label: '水平分布',
                      icon: <ColumnWidthOutlined />,
                      onClick: () => onDistribute('horizontal'),
                    },
                    {
                      key: 'vertical',
                      label: '垂直分布',
                      icon: <ColumnHeightOutlined />,
                      onClick: () => onDistribute('vertical'),
                    },
                  ],
                }}
                disabled={!selectedElementId}
              >
                <Button disabled={!selectedElementId} size="small">
                  分布
                </Button>
              </Dropdown>
            )}
          </Space>
        </Space>

        <Space split={<Divider type="vertical" />} size="middle">
          {/* 文件操作组 */}
          <Space size="small">
            <Tooltip title="保存 (Ctrl+S)">
              <Button
                data-tour="save-button"
                type="primary"
                icon={<SaveOutlined />}
                onClick={onSave}
                size="small"
              >
                保存
              </Button>
            </Tooltip>

            <Tooltip title="导出模板">
              <Button
                icon={<DownloadOutlined />}
                onClick={onExport}
                size="small"
              />
            </Tooltip>

            <Upload
              accept=".json"
              showUploadList={false}
              beforeUpload={handleImportFile}
            >
              <Tooltip title="导入模板">
                <Button icon={<FolderOpenOutlined />} size="small" />
              </Tooltip>
            </Upload>
          </Space>

          {/* 工具操作组 */}
          <Space size="small">
            {onValidate && (
              <Tooltip title="验证模板">
                <Button
                  icon={<CheckCircleOutlined />}
                  onClick={onValidate}
                  size="small"
                />
              </Tooltip>
            )}

            {onConvert && (
              <Tooltip title="转换为打印机语言">
                <Button
                  icon={<CodeOutlined />}
                  onClick={onConvert}
                  size="small"
                />
              </Tooltip>
            )}

            {onTestPrint && (
              <Tooltip title="测试打印">
                <Button
                  data-tour="preview-button"
                  type="primary"
                  icon={<PrinterOutlined />}
                  onClick={onTestPrint}
                  size="small"
                >
                  测试打印
                </Button>
              </Tooltip>
            )}

            {onShowTour && (
              <Tooltip title="功能引导">
                <Button
                  icon={<QuestionCircleOutlined />}
                  onClick={onShowTour}
                  size="small"
                >
                  引导
                </Button>
              </Tooltip>
            )}
          </Space>
        </Space>
      </div>

      {/* 第二行：画布配置 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: `${Spacing.xs}px 0`,
          borderTop: `1px solid ${Colors.border}`,
        }}
      >
        <Space split={<Divider type="vertical" />} size="middle">
          {/* 画布尺寸组 */}
          <Space size="small">
            <span style={{ fontSize: FontSize.xs, color: Colors.textDisabled }}>设计设置：</span>
            <Space size={4}>
              <span style={{ fontSize: FontSize.xs, color: Colors.textSecondary }}>宽</span>
              <InputNumber
                style={{ width: 85 }}
                size="small"
                min={10}
                max={500}
                value={template.canvas.width}
                onChange={(value) =>
                  onCanvasSizeChange(value || 100, template.canvas.height)
                }
                addonAfter="mm"
              />
            </Space>
            <Space size={4}>
              <span style={{ fontSize: FontSize.xs, color: Colors.textSecondary }}>高</span>
              <InputNumber
                style={{ width: 85 }}
                size="small"
                min={10}
                max={500}
                value={template.canvas.height}
                onChange={(value) =>
                  onCanvasSizeChange(template.canvas.width, value || 50)
                }
                addonAfter="mm"
              />
            </Space>
            <Space size={4}>
              <span style={{ fontSize: FontSize.xs, color: Colors.textSecondary }}>DPI</span>
              <Select
                style={{ width: 90 }}
                size="small"
                value={template.canvas.dpi}
                onChange={(value) => onDpiChange(value)}
                options={[
                  { label: '72', value: 72 },
                  { label: '96', value: 96 },
                  { label: '150', value: 150 },
                  { label: '203', value: 203 },
                  { label: '300', value: 300 },
                  { label: '600', value: 600 },
                ]}
              />
            </Space>
            <Space size={4}>
              <span style={{ fontSize: FontSize.xs, color: Colors.textSecondary }}>打印机语言</span>
              <Select
                style={{ width: 90 }}
                size="small"
                value={targetLanguage}
                onChange={(value) => onTargetLanguageChange(value)}
                options={[
                  { label: 'Report', value: 5 },
                  { label: 'ZPL', value: 10 },
                  { label: 'EPL', value: 15 },
                  { label: 'CPCL', value: 20 },
                  { label: 'TSPL', value: 25 },
                ]}
              />
            </Space>
          </Space>

          {/* 纸张尺寸组 */}
          <Space size="small">
            <span style={{ fontSize: FontSize.xs, color: Colors.textDisabled }}>纸张尺寸：</span>
            <Space size={4}>
              <Tooltip title="实际打印纸张宽度，留空则使用设计宽度">
                <span style={{ fontSize: FontSize.xs, color: Colors.textSecondary }}>宽</span>
              </Tooltip>
              <InputNumber
                style={{ width: 85 }}
                size="small"
                min={10}
                max={1000}
                precision={2}
                step={0.1}
                value={template.canvas.paperWidth}
                onChange={(value) => {
                  if (onPaperSizeChange) {
                    onPaperSizeChange(value || undefined, template.canvas.paperHeight);
                  }
                }}
                placeholder="默认"
                addonAfter="mm"
              />
            </Space>
            <Space size={4}>
              <Tooltip title="实际打印纸张高度，留空则使用设计高度。小于设计高度时会启用分页">
                <span style={{ fontSize: FontSize.xs, color: Colors.textSecondary }}>高</span>
              </Tooltip>
              <InputNumber
                style={{ width: 85 }}
                size="small"
                min={10}
                max={1000}
                precision={2}
                step={0.1}
                value={template.canvas.paperHeight}
                onChange={(value) => {
                  if (onPaperSizeChange) {
                    onPaperSizeChange(template.canvas.paperWidth, value || undefined);
                  }
                }}
                placeholder="默认"
                addonAfter="mm"
              />
            </Space>
          </Space>

          {/* 页头页尾开关组 */}
          {onToggleHeader && onToggleFooter && (
            <Space size="small">
              <Space size={4}>
                <span style={{ fontSize: FontSize.xs, color: Colors.textSecondary }}>启用页头</span>
                <Switch
                  size="small"
                  checked={!!template.sections?.header}
                  onChange={onToggleHeader}
                />
              </Space>
              <Space size={4}>
                <span style={{ fontSize: FontSize.xs, color: Colors.textSecondary }}>启用页尾</span>
                <Switch
                  size="small"
                  checked={!!template.sections?.footer}
                  onChange={onToggleFooter}
                />
              </Space>
            </Space>
          )}

          {/* 区域边界显示开关 */}
          {onToggleSectionBoundaries && (
            <Space size="small">
              <Space size={4}>
                <span style={{ fontSize: FontSize.xs, color: Colors.textSecondary }}>显示区域边界</span>
                <Switch
                  size="small"
                  checked={showSectionBoundaries}
                  onChange={onToggleSectionBoundaries}
                />
              </Space>
            </Space>
          )}

          {/* 网格边界显示开关 */}
          {onToggleGridBoundaries && (
            <Space size="small">
              <Space size={4}>
                <span style={{ fontSize: FontSize.xs, color: Colors.textSecondary }}>显示网格边界</span>
                <Switch
                  size="small"
                  checked={showGridBoundaries}
                  onChange={onToggleGridBoundaries}
                />
              </Space>
            </Space>
          )}
        </Space>
      </div>

      {/* 分页提示 */}
      {paginationInfo.willPaginate && (
        <Alert
          message="强制分页提示"
          description={
            <div>
              设计高度({template.canvas.height}mm) 大于纸张高度({paginationInfo.effectivePaperHeight}mm)，
              内容将自动分页打印。
              <strong> 预计页数：{paginationInfo.estimatedPages} 页</strong>，
              每页可用高度：{paginationInfo.availableHeightPerPage}mm
            </div>
          }
          type="warning"
          showIcon
          closable
          style={{ margin: `${Spacing.xs}px 0` }}
        />
      )}
    </div>
  );
};
