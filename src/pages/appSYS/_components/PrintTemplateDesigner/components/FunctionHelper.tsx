/**
 * FunctionHelper - 函数帮助器组件
 * 提供表达式函数的分类展示、参数说明和示例代码
 */

import React, { useState, useMemo } from 'react';
import { Collapse, List, Typography, Space, Button, Input, Tag, message } from 'antd';
import { CopyOutlined, SearchOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import {
  FUNCTIONS,
  getFunctionsByCategory,
  type FunctionDefinition,
} from '../constants/functions';

const { Panel } = Collapse;
const { Text, Paragraph } = Typography;

/**
 * FunctionHelper组件属性
 */
export interface FunctionHelperProps {
  /** 函数选择回调（点击插入按钮时触发） */
  onInsertFunction?: (func: FunctionDefinition) => void;
  /** 是否显示搜索框 */
  showSearch?: boolean;
}

/**
 * FunctionHelper组件
 */
export const FunctionHelper: React.FC<FunctionHelperProps> = ({
  onInsertFunction,
  showSearch = true,
}) => {
  const [searchText, setSearchText] = useState('');

  // 按分类分组函数
  const functionsByCategory = useMemo(() => getFunctionsByCategory(), []);

  // 过滤函数列表
  const filteredFunctions = useMemo(() => {
    if (!searchText.trim()) {
      return functionsByCategory;
    }

    const keyword = searchText.toLowerCase();
    const filtered: Record<string, FunctionDefinition[]> = {};

    Object.entries(functionsByCategory).forEach(([category, functions]) => {
      const matchedFunctions = functions.filter(func =>
        func.name.toLowerCase().includes(keyword) ||
        func.description.toLowerCase().includes(keyword) ||
        func.signature.toLowerCase().includes(keyword)
      );

      if (matchedFunctions.length > 0) {
        filtered[category] = matchedFunctions;
      }
    });

    return filtered;
  }, [functionsByCategory, searchText]);

  /**
   * 复制函数签名到剪贴板
   */
  const handleCopySignature = async (func: FunctionDefinition) => {
    try {
      await navigator.clipboard.writeText(func.signature);
      message.success(`已复制函数签名：${func.signature}`);
    } catch (error) {
      message.error('复制失败，请手动复制');
    }
  };

  /**
   * 插入函数
   */
  const handleInsertFunction = (func: FunctionDefinition) => {
    onInsertFunction?.(func);
  };

  /**
   * 渲染函数参数列表
   */
  const renderParameters = (parameters: FunctionDefinition['parameters']) => {
    if (parameters.length === 0) {
      return <Text type="secondary">无参数</Text>;
    }

    return (
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        {parameters.map((param, index) => (
          <div key={index}>
            <Space>
              <Tag color={param.required ? 'blue' : 'default'}>
                {param.required ? '必填' : '可选'}
              </Tag>
              <Text strong>{param.name}</Text>
              <Text type="secondary">({param.type})</Text>
            </Space>
            <div style={{ marginLeft: 8, marginTop: 4 }}>
              <Text type="secondary">{param.description}</Text>
            </div>
          </div>
        ))}
      </Space>
    );
  };

  /**
   * 渲染函数示例
   */
  const renderExamples = (examples: string[]) => {
    return (
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        {examples.map((example, index) => (
          <div key={index}>
            <Text code>{example}</Text>
          </div>
        ))}
      </Space>
    );
  };

  /**
   * 渲染函数项
   */
  const renderFunctionItem = (func: FunctionDefinition) => {
    return (
      <List.Item>
        <div style={{ width: '100%' }}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {/* 函数头部：名称和操作按钮 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Space>
                <Text strong style={{ fontSize: 16 }}>{func.name}</Text>
                <Text type="secondary">({func.returnType})</Text>
              </Space>
              <Space>
                <Button
                  size="small"
                  icon={<CopyOutlined />}
                  onClick={() => handleCopySignature(func)}
                >
                  复制
                </Button>
                {onInsertFunction && (
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => handleInsertFunction(func)}
                  >
                    插入
                  </Button>
                )}
              </Space>
            </div>

            {/* 函数签名 */}
            <div>
              <Text strong>签名：</Text>
              <br />
              <Text code style={{ fontSize: 14 }}>{func.signature}</Text>
            </div>

            {/* 函数描述 */}
            <div>
              <Text strong>描述：</Text>
              <br />
              <Text>{func.description}</Text>
            </div>

            {/* 参数列表 */}
            <div>
              <Text strong>参数：</Text>
              <div style={{ marginTop: 8 }}>
                {renderParameters(func.parameters)}
              </div>
            </div>

            {/* 示例 */}
            <div>
              <Text strong>示例：</Text>
              <div style={{ marginTop: 8 }}>
                {renderExamples(func.examples)}
              </div>
            </div>
          </Space>
        </div>
      </List.Item>
    );
  };

  // 构建Collapse面板项
  const collapseItems: CollapseProps['items'] = Object.entries(filteredFunctions).map(
    ([category, functions]) => ({
      key: category,
      label: `${category} (${functions.length}个函数)`,
      children: (
        <List
          dataSource={functions}
          renderItem={renderFunctionItem}
          split
        />
      ),
    })
  );

  return (
    <div style={{ width: '100%' }}>
      {/* 搜索框 */}
      {showSearch && (
        <div style={{ marginBottom: 16 }}>
          <Input
            placeholder="搜索函数名称、描述或签名..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </div>
      )}

      {/* 函数列表统计 */}
      <div style={{ marginBottom: 8 }}>
        <Text type="secondary">
          共 {FUNCTIONS.length} 个函数
          {searchText && ` / 筛选出 ${Object.values(filteredFunctions).flat().length} 个函数`}
        </Text>
      </div>

      {/* 函数分类面板 */}
      {Object.keys(filteredFunctions).length > 0 ? (
        <Collapse
          items={collapseItems}
          defaultActiveKey={Object.keys(filteredFunctions)}
          bordered={false}
        />
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Text type="secondary">未找到匹配的函数</Text>
        </div>
      )}

      {/* 使用说明 */}
      <div style={{ marginTop: 24, padding: 16, backgroundColor: '#f5f5f5', borderRadius: 4 }}>
        <Text strong>使用说明：</Text>
        <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li>点击"复制"按钮可以快速复制函数签名到剪贴板</li>
            <li>点击"插入"按钮可以将函数插入到表达式编辑器中</li>
            <li>函数可以嵌套使用，例如：upper(substring(name, 0, 3))</li>
            <li>使用数据路径访问数据，例如：order.customer.name</li>
            <li>条件表达式使用 ==、!=、&gt;、&lt;、&gt;=、&lt;= 等运算符</li>
          </ul>
        </Paragraph>
      </div>
    </div>
  );
};

export default FunctionHelper;
