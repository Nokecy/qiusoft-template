/**
 * BindingDebugPanel - 属性绑定调试面板
 * 显示模板中所有PropertyBinding的验证状态和详细信息
 */

import React, { useMemo } from 'react';
import { Card, Table, Space, Alert, Tag, Typography, Badge, Collapse } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CheckCircleOutlined, ExclamationCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { AtlTemplate, PropertyBinding, BindingMode } from '../types';
import { validatePropertyBinding, type BindingValidationResult } from '../utils/bindingValidator';

const { Text } = Typography;
const { Panel } = Collapse;

/**
 * 绑定信息接口
 */
interface BindingInfo {
  key: string;
  elementId: string;
  elementType: string;
  property: string;
  binding: PropertyBinding;
  validation: BindingValidationResult;
}

/**
 * BindingDebugPanel组件属性
 */
export interface BindingDebugPanelProps {
  /** 模板对象 */
  template: AtlTemplate;
  /** 点击元素回调 */
  onSelectElement?: (elementId: string) => void;
}

/**
 * 获取绑定模式显示名称
 */
const getModeName = (mode: BindingMode): string => {
  switch (mode) {
    case BindingMode.Static:
      return '静态值';
    case BindingMode.DataPath:
      return '数据路径';
    case BindingMode.Expression:
      return '表达式';
    default:
      return '未知';
  }
};

/**
 * 获取绑定模式标签颜色
 */
const getModeColor = (mode: BindingMode): string => {
  switch (mode) {
    case BindingMode.Static:
      return 'blue';
    case BindingMode.DataPath:
      return 'green';
    case BindingMode.Expression:
      return 'purple';
    default:
      return 'default';
  }
};

/**
 * 获取元素类型显示名称
 */
const getElementTypeName = (type: number): string => {
  const typeNames: Record<number, string> = {
    1: '文本',
    2: '多行文本',
    3: '条码',
    4: '图片',
    5: '图形',
    6: '表格',
    7: '二维码',
    8: '数据矩阵码',
    9: '线条',
  };
  return typeNames[type] || `未知(${type})`;
};

/**
 * 提取模板中的所有PropertyBinding
 */
const extractBindings = (template: AtlTemplate): BindingInfo[] => {
  const bindings: BindingInfo[] = [];

  template.elements.forEach(element => {
    const elementTypeName = getElementTypeName(element.type);

    // 提取元素可见性绑定
    if (element.visible && typeof element.visible === 'object') {
      const binding = element.visible as PropertyBinding;
      bindings.push({
        key: `${element.id}-visible`,
        elementId: element.id,
        elementType: elementTypeName,
        property: 'visible',
        binding,
        validation: validatePropertyBinding(binding, 'boolean'),
      });
    }

    // 提取元素属性中的绑定
    const props = element.properties as any;
    if (props) {
      // 通用属性绑定字段
      const bindingFields = ['text', 'content', 'source'];

      bindingFields.forEach(field => {
        if (props[field] && typeof props[field] === 'object') {
          const binding = props[field] as PropertyBinding;
          bindings.push({
            key: `${element.id}-${field}`,
            elementId: element.id,
            elementType: elementTypeName,
            property: field,
            binding,
            validation: validatePropertyBinding(binding),
          });
        }
      });

      // 表格单元格绑定
      if (props.cells && Array.isArray(props.cells)) {
        props.cells.forEach((row: any[], rowIndex: number) => {
          row.forEach((cell: any, colIndex: number) => {
            if (cell.content && typeof cell.content === 'object') {
              const binding = cell.content as PropertyBinding;
              bindings.push({
                key: `${element.id}-cell-${rowIndex}-${colIndex}`,
                elementId: element.id,
                elementType: elementTypeName,
                property: `cell[${rowIndex},${colIndex}]`,
                binding,
                validation: validatePropertyBinding(binding),
              });
            }
          });
        });
      }
    }
  });

  return bindings;
};

/**
 * BindingDebugPanel组件
 */
export const BindingDebugPanel: React.FC<BindingDebugPanelProps> = ({
  template,
  onSelectElement,
}) => {
  // 提取所有绑定并验证
  const bindingsInfo = useMemo(() => extractBindings(template), [template]);

  // 统计信息
  const stats = useMemo(() => {
    const total = bindingsInfo.length;
    const errors = bindingsInfo.filter(b => !b.validation.isValid).length;
    const warnings = bindingsInfo.filter(b => b.validation.warnings.length > 0).length;
    const valid = total - errors;

    return { total, errors, warnings, valid };
  }, [bindingsInfo]);

  // 表格列定义
  const columns: ColumnsType<BindingInfo> = [
    {
      title: '元素',
      dataIndex: 'elementType',
      width: 120,
      render: (text, record) => (
        <Space>
          <Tag color="blue">{text}</Tag>
          <Typography.Link
            onClick={() => onSelectElement?.(record.elementId)}
            style={{ fontSize: 12 }}
          >
            选择
          </Typography.Link>
        </Space>
      ),
    },
    {
      title: '属性',
      dataIndex: 'property',
      width: 140,
      render: (text) => <Text code>{text}</Text>,
    },
    {
      title: '模式',
      dataIndex: 'binding',
      width: 100,
      render: (binding: PropertyBinding) => (
        <Tag color={getModeColor(binding.mode)}>
          {getModeName(binding.mode)}
        </Tag>
      ),
    },
    {
      title: '值',
      dataIndex: 'binding',
      ellipsis: true,
      render: (binding: PropertyBinding) => {
        switch (binding.mode) {
          case BindingMode.Static:
            return <Text type="secondary">{String(binding.staticValue)}</Text>;
          case BindingMode.DataPath:
            return <Text code>{binding.dataPath}</Text>;
          case BindingMode.Expression:
            return (
              <Text
                code
                ellipsis={{ tooltip: binding.expression }}
                style={{ maxWidth: 200 }}
              >
                {binding.expression}
              </Text>
            );
          default:
            return <Text type="secondary">-</Text>;
        }
      },
    },
    {
      title: '状态',
      dataIndex: 'validation',
      width: 100,
      render: (validation: BindingValidationResult) => {
        if (!validation.isValid) {
          return (
            <Badge status="error" text={<Text type="danger">错误</Text>} />
          );
        }
        if (validation.warnings.length > 0) {
          return (
            <Badge status="warning" text={<Text type="warning">警告</Text>} />
          );
        }
        return (
          <Badge status="success" text={<Text type="success">正常</Text>} />
        );
      },
    },
    {
      title: '详情',
      dataIndex: 'validation',
      width: 80,
      render: (validation: BindingValidationResult, record) => {
        const hasIssues = !validation.isValid || validation.warnings.length > 0;
        if (!hasIssues) {
          return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
        }

        const content = (
          <Space direction="vertical" size="small">
            {validation.errors.map((error, index) => (
              <Text key={`error-${index}`} type="danger">
                <ExclamationCircleOutlined /> {error}
              </Text>
            ))}
            {validation.warnings.map((warning, index) => (
              <Text key={`warning-${index}`} type="warning">
                <WarningOutlined /> {warning}
              </Text>
            ))}
          </Space>
        );

        return (
          <Collapse ghost>
            <Panel
              header={
                validation.isValid ? (
                  <WarningOutlined style={{ color: '#faad14' }} />
                ) : (
                  <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
                )
              }
              key="1"
            >
              {content}
            </Panel>
          </Collapse>
        );
      },
    },
  ];

  return (
    <Card
      title="绑定调试面板"
      size="small"
      style={{ height: '100%', overflow: 'auto' }}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        {/* 统计信息 */}
        <Alert
          message={
            <Space>
              <Text strong>总绑定数:</Text>
              <Text>{stats.total}</Text>
              <Text type="success" strong>正常:</Text>
              <Text type="success">{stats.valid}</Text>
              {stats.errors > 0 && (
                <>
                  <Text type="danger" strong>错误:</Text>
                  <Text type="danger">{stats.errors}</Text>
                </>
              )}
              {stats.warnings > 0 && (
                <>
                  <Text type="warning" strong>警告:</Text>
                  <Text type="warning">{stats.warnings}</Text>
                </>
              )}
            </Space>
          }
          type={stats.errors > 0 ? 'error' : stats.warnings > 0 ? 'warning' : 'success'}
          showIcon
        />

        {/* 绑定列表 */}
        <Table
          columns={columns}
          dataSource={bindingsInfo}
          size="small"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
          rowKey="key"
          bordered
        />

        {/* 帮助信息 */}
        {bindingsInfo.length === 0 && (
          <Alert
            message="暂无属性绑定"
            description="模板中还没有任何属性绑定。开始为元素属性添加数据绑定吧！"
            type="info"
            showIcon
          />
        )}
      </Space>
    </Card>
  );
};

export default BindingDebugPanel;
