/**
 * 表格单元格编辑对话框
 * 支持设置单元格内容、行列合并、样式等
 */

import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, InputNumber, Select, ColorPicker, Row, Col, Typography, Divider } from 'antd';
import type { TableCell, PropertyBinding } from '../../../types';
import { PropertyBindingEditor } from '../../PropertyBindingEditor';
import { getEffectiveContentBinding } from '../../../utils';

const { Text } = Typography;

export interface CellEditModalProps {
  visible: boolean;
  cell: TableCell | null;
  rowIndex: number;
  colIndex: number;
  maxRowSpan: number;  // 最大可合并行数
  maxColSpan: number;  // 最大可合并列数
  onSave: (rowIndex: number, colIndex: number, updates: Partial<TableCell>) => void;
  onCancel: () => void;
}

/**
 * 单元格编辑对话框组件
 */
export const CellEditModal: React.FC<CellEditModalProps> = ({
  visible,
  cell,
  rowIndex,
  colIndex,
  maxRowSpan,
  maxColSpan,
  onSave,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [contentBinding, setContentBinding] = useState<PropertyBinding | undefined>(undefined);

  // ✅ 使用 useRef 暂存待保存的数据，避免 destroyOnClose 清空 state
  // useRef 的值不会随组件销毁而消失，确保 afterClose 能拿到数据
  const pendingUpdatesRef = useRef<{
    rowIndex: number;
    colIndex: number;
    updates: Partial<TableCell> & Record<string, any>;
  } | null>(null);

  useEffect(() => {
    if (visible && cell) {
      // 初始化表单数据
      const binding = getEffectiveContentBinding(cell);
      setContentBinding(binding);

      form.setFieldsValue({
        // 合并设置
        rowSpan: cell.rowSpan ?? 1,
        colSpan: cell.colSpan ?? 1,

        // 样式设置（扩展字段）
        backgroundColor: (cell as any).backgroundColor ?? '',
        textColor: (cell as any).textColor ?? '',
        fontSize: (cell as any).fontSize ?? 10,
        fontFamily: (cell as any).fontFamily ?? 'Arial',
        bold: (cell as any).bold ?? false,
        italic: (cell as any).italic ?? false,
        textAlign: (cell as any).textAlign ?? 1, // Center
        verticalAlign: (cell as any).verticalAlign ?? 1, // Middle
      });
    }
  }, [visible, cell, form]);

  const handleOk = () => {
    if (!contentBinding) {
      console.error('[CellEditModal] contentBinding is undefined');
      return;
    }

    form.validateFields().then((values) => {
      console.log('[CellEditModal] handleOk - 表单值:', values);

      // 构建更新对象
      const updates: Partial<TableCell> & Record<string, any> = {
        contentBinding,
        rowSpan: values.rowSpan,
        colSpan: values.colSpan,
        merged: false, // 确保当前单元格不是被合并状态

        // 样式属性
        backgroundColor: values.backgroundColor,
        textColor: values.textColor,
        fontSize: values.fontSize,
        fontFamily: values.fontFamily,
        bold: values.bold,
        italic: values.italic,
        textAlign: values.textAlign,
        verticalAlign: values.verticalAlign,
      };

      console.log('[CellEditModal] handleOk - 更新对象:', { rowIndex, colIndex, updates });

      // 先暂存待更新的数据到 ref（不会随组件销毁而消失）
      pendingUpdatesRef.current = { rowIndex, colIndex, updates };
      console.log('[CellEditModal] handleOk - 已暂存到 ref:', pendingUpdatesRef.current);

      onCancel(); // 关闭 Modal，afterClose 会在完全销毁后执行更新
    }).catch((error) => {
      console.error('表单验证失败:', error);
    });
  };

  const handleCancel = () => {
    onCancel();
    // 不在这里重置表单,让 Modal 的 afterClose 或下次打开时重置
  };

  // Modal 完全关闭后的回调
  const handleAfterClose = () => {
    console.log('[CellEditModal] afterClose - ref 内容:', pendingUpdatesRef.current);

    // 如果有待更新的数据，在 Modal 完全销毁后执行更新
    if (pendingUpdatesRef.current) {
      const { rowIndex: r, colIndex: c, updates: u } = pendingUpdatesRef.current;
      console.log('[CellEditModal] afterClose - 准备调用 onSave:', { r, c, u });

      pendingUpdatesRef.current = null; // 清空待更新数据
      onSave(r, c, u); // 执行更新

      console.log('[CellEditModal] afterClose - onSave 已调用');
    } else {
      console.log('[CellEditModal] afterClose - ref 为空，不执行更新');
    }
  };

  return (
    <Modal
      title={`编辑单元格 (${rowIndex + 1}, ${colIndex + 1})`}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      afterClose={handleAfterClose}
      width={600}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          rowSpan: 1,
          colSpan: 1,
          textAlign: 1,
          verticalAlign: 1,
          fontSize: 10,
          fontFamily: 'Arial',
        }}
      >
        {/* 内容绑定 - 使用 PropertyBindingEditor */}
        <Form.Item label="单元格内容" help="支持静态文本、数据绑定和表达式">
          <PropertyBindingEditor
            value={contentBinding}
            onChange={(value) => setContentBinding(value)}
            valueType="string"
            showFormat={true}
            showFallback={true}
          />
        </Form.Item>

        <Divider orientation="left" plain>
          行列合并
        </Divider>

        {/* 合并设置 */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="行合并"
              name="rowSpan"
              rules={[{ required: true, type: 'number', min: 1, max: maxRowSpan }]}
            >
              <InputNumber
                min={1}
                max={maxRowSpan}
                style={{ width: '100%' }}
                addonAfter="行"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="列合并"
              name="colSpan"
              rules={[{ required: true, type: 'number', min: 1, max: maxColSpan }]}
            >
              <InputNumber
                min={1}
                max={maxColSpan}
                style={{ width: '100%' }}
                addonAfter="列"
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left" plain>
          文本样式
        </Divider>
        <Row gutter={16} style={{ marginTop: 8 }}>
          <Col span={12}>
            <Form.Item label="字体大小" name="fontSize">
              <InputNumber min={0.1} max={999} style={{ width: '100%' }} addonAfter="pt" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="字体" name="fontFamily">
              <Select>
                <Select.Option value="Arial">Arial</Select.Option>
                <Select.Option value="SimSun">宋体</Select.Option>
                <Select.Option value="SimHei">黑体</Select.Option>
                <Select.Option value="Microsoft YaHei">微软雅黑</Select.Option>
                <Select.Option value="Courier New">Courier New</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="文本颜色" name="textColor">
              <ColorPicker
                showText
                format="hex"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="背景颜色" name="backgroundColor">
              <ColorPicker
                showText
                format="hex"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="水平对齐" name="textAlign">
              <Select>
                <Select.Option value={0}>左对齐</Select.Option>
                <Select.Option value={1}>居中</Select.Option>
                <Select.Option value={2}>右对齐</Select.Option>
                <Select.Option value={3}>两端对齐</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="垂直对齐" name="verticalAlign">
              <Select>
                <Select.Option value={0}>顶部</Select.Option>
                <Select.Option value={1}>居中</Select.Option>
                <Select.Option value={2}>底部</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="粗体" name="bold" valuePropName="checked">
              <Select>
                <Select.Option value={false}>否</Select.Option>
                <Select.Option value={true}>是</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="斜体" name="italic" valuePropName="checked">
              <Select>
                <Select.Option value={false}>否</Select.Option>
                <Select.Option value={true}>是</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
