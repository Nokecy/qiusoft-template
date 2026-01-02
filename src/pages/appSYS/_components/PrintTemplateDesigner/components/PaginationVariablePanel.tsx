/**
 * 分页变量信息面板
 * 显示内置分页变量及其使用方法
 */

import React, { useState } from 'react';
import {
  Card,
  Table,
  Tag,
  Space,
  Button,
  Tooltip,
  Typography,
  message,
  Collapse,
} from 'antd';
import {
  CopyOutlined,
  InfoCircleOutlined,
  CodeOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Text, Paragraph } = Typography;
const { Panel } = Collapse;

// 分页变量定义
interface PaginationVariable {
  key: string;
  name: string;
  type: string;
  description: string;
  example: string;
  usageScenarios: string[];
}

// 内置分页变量数据
const PAGINATION_VARIABLES: PaginationVariable[] = [
  {
    key: 'currentPage',
    name: 'pagination.currentPage',
    type: 'number',
    description: '当前页码(从1开始)',
    example: '3',
    usageScenarios: ['页脚页码显示', '页面标识生成', '条件分页内容'],
  },
  {
    key: 'totalPages',
    name: 'pagination.totalPages',
    type: 'number',
    description: '总页数',
    example: '10',
    usageScenarios: ['页脚页码显示', '进度指示', '分页导航'],
  },
  {
    key: 'isFirstPage',
    name: 'pagination.isFirstPage',
    type: 'boolean',
    description: '是否为首页',
    example: 'true',
    usageScenarios: ['首页特殊内容', '首页Logo显示', '条件渲染'],
  },
  {
    key: 'isLastPage',
    name: 'pagination.isLastPage',
    type: 'boolean',
    description: '是否为末页',
    example: 'false',
    usageScenarios: ['末页汇总信息', '末页签章', '条件渲染'],
  },
];

// 使用示例
const USAGE_EXAMPLES = [
  {
    key: 'simple-page-number',
    title: '简单页码显示',
    description: '在页脚显示"第 X 页,共 Y 页"',
    code: `'第 ' + pagination.currentPage + ' 页,共 ' + pagination.totalPages + ' 页'`,
    result: '第 3 页,共 10 页',
  },
  {
    key: 'formatted-page-number',
    title: '格式化页码',
    description: '显示"Page 01/10"格式',
    code: `'Page ' + string.pad_left(pagination.currentPage, 2, '0') + '/' + string.pad_left(pagination.totalPages, 2, '0')`,
    result: 'Page 03/10',
  },
  {
    key: 'first-page-logo',
    title: '首页Logo显示',
    description: '仅在首页显示公司Logo',
    code: `pagination.isFirstPage`,
    result: 'true (在元素的visible属性中使用)',
  },
  {
    key: 'last-page-summary',
    title: '末页汇总信息',
    description: '仅在末页显示汇总数据',
    code: `pagination.isLastPage ? '总计: ¥' + summaryData.total : ''`,
    result: '总计: ¥9999.99 (仅末页显示)',
  },
];

export interface PaginationVariablePanelProps {
  onInsertVariable?: (variableName: string) => void;
}

export const PaginationVariablePanel: React.FC<PaginationVariablePanelProps> = ({
  onInsertVariable,
}) => {
  const [selectedVariable, setSelectedVariable] = useState<string | null>(null);

  // 复制变量名到剪贴板
  const handleCopy = (variableName: string) => {
    navigator.clipboard.writeText(variableName).then(() => {
      message.success(`已复制: ${variableName}`);
    });
  };

  // 快速插入变量(如果提供了回调)
  const handleInsert = (variableName: string) => {
    if (onInsertVariable) {
      onInsertVariable(variableName);
      message.success(`已插入变量: ${variableName}`);
    } else {
      handleCopy(variableName);
    }
  };

  // 表格列定义
  const columns: ColumnsType<PaginationVariable> = [
    {
      title: '变量名',
      dataIndex: 'name',
      key: 'name',
      width: 220,
      render: (name: string) => (
        <Text
          code
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#1890ff',
            fontFamily: '"Courier New", monospace',
          }}
        >
          {name}
        </Text>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: string) => {
        const colorMap: Record<string, string> = {
          number: 'blue',
          boolean: 'green',
          string: 'orange',
        };
        return <Tag color={colorMap[type] || 'default'}>{type}</Tag>;
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '示例值',
      dataIndex: 'example',
      key: 'example',
      width: 100,
      render: (example: string) => (
        <Text type="secondary" style={{ fontSize: 12 }}>
          {example}
        </Text>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_: any, record: PaginationVariable) => (
        <Space size="small">
          <Tooltip title="复制变量名">
            <Button
              type="text"
              size="small"
              icon={<CopyOutlined />}
              onClick={() => handleCopy(record.name)}
            />
          </Tooltip>
          <Tooltip title={onInsertVariable ? '插入到表达式' : '复制变量名'}>
            <Button
              type="primary"
              size="small"
              icon={<CodeOutlined />}
              onClick={() => handleInsert(record.name)}
            >
              {onInsertVariable ? '插入' : '复制'}
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
      {/* 顶部说明卡片 */}
      <Card
        size="small"
        style={{
          background: '#e6f7ff',
          borderColor: '#91d5ff',
        }}
      >
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Space>
            <InfoCircleOutlined style={{ color: '#1890ff', fontSize: 16 }} />
            <Text strong style={{ color: '#1890ff' }}>
              分页内置变量
            </Text>
          </Space>
          <Paragraph
            style={{ marginBottom: 0, fontSize: 13, color: '#595959' }}
          >
            这些变量在多页打印时自动可用,可用于显示页码、控制首末页特殊内容等场景。
            在元素属性的<Text code>表达式</Text>模式中直接引用即可。
          </Paragraph>
        </Space>
      </Card>

      {/* 变量列表 */}
      <Card
        title={
          <Space>
            <FileTextOutlined />
            <span>可用变量列表</span>
          </Space>
        }
        size="small"
      >
        <Table
          columns={columns}
          dataSource={PAGINATION_VARIABLES}
          pagination={false}
          size="small"
          bordered
          onRow={(record) => ({
            onClick: () => setSelectedVariable(record.key),
            style: {
              cursor: 'pointer',
              background: selectedVariable === record.key ? '#f0f8ff' : undefined,
            },
          })}
        />
      </Card>

      {/* 使用示例折叠面板 */}
      <Card
        title={
          <Space>
            <CodeOutlined />
            <span>使用示例</span>
          </Space>
        }
        size="small"
      >
        <Collapse
          defaultActiveKey={['simple-page-number']}
          size="small"
          items={USAGE_EXAMPLES.map((example) => ({
            key: example.key,
            label: (
              <Space>
                <Text strong>{example.title}</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  - {example.description}
                </Text>
              </Space>
            ),
            children: (
              <div>
                <div style={{ marginBottom: 12 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    表达式代码:
                  </Text>
                  <div
                    style={{
                      marginTop: 4,
                      padding: '8px 12px',
                      background: '#f5f5f5',
                      borderRadius: 4,
                      fontFamily: '"Courier New", monospace',
                      fontSize: 12,
                      wordBreak: 'break-all',
                    }}
                  >
                    {example.code}
                  </div>
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    渲染结果:
                  </Text>
                  <div
                    style={{
                      marginTop: 4,
                      padding: '8px 12px',
                      background: '#e6f7ff',
                      border: '1px solid #91d5ff',
                      borderRadius: 4,
                      fontSize: 13,
                      color: '#1890ff',
                    }}
                  >
                    {example.result}
                  </div>
                </div>
                <div style={{ marginTop: 12, textAlign: 'right' }}>
                  <Button
                    size="small"
                    icon={<CopyOutlined />}
                    onClick={() => {
                      navigator.clipboard.writeText(example.code);
                      message.success('表达式已复制到剪贴板');
                    }}
                  >
                    复制表达式
                  </Button>
                </div>
              </div>
            ),
          }))}
        />
      </Card>

      {/* 快速引用按钮组 */}
      <Card
        title="快速引用"
        size="small"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {PAGINATION_VARIABLES.map((variable) => (
            <Tooltip key={variable.key} title={variable.description}>
              <Button
                size="small"
                onClick={() => handleInsert(variable.name)}
                icon={<CodeOutlined />}
              >
                {variable.name}
              </Button>
            </Tooltip>
          ))}
        </div>
      </Card>
    </div>
  );
};
