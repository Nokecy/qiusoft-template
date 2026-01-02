/**
 * 增强版 RegexEditor - 集成高级功能
 * 包含: 编辑器、测试器、可视化、复杂度分析
 */

import React, { useState } from 'react';
import { Card, Tabs, Space, Alert } from 'antd';
import {
  RegexEditor,
  RegexTester,
  RegexRailroadDiagram,
  useRegexValidation
} from '@nokecy/qc-ui';
import type { ValidationResult } from '@nokecy/qc-ui';

const { TabPane } = Tabs;

export interface EnhancedRegexEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  height?: string;
  /** 是否显示复杂度分析 */
  showComplexity?: boolean;
  /** 是否显示测试器 */
  showTester?: boolean;
  /** 是否显示可视化 */
  showVisualization?: boolean;
  /** 默认激活的标签页 */
  defaultActiveTab?: 'editor' | 'tester' | 'visualization';
}

/**
 * 增强版正则表达式编辑器组件
 *
 * 功能特性:
 * - 实时语法验证和错误标注
 * - 正则表达式测试器(支持匹配、替换预览)
 * - Railroad Diagram 可视化
 * - 复杂度分析和性能评分
 * - 优化建议
 */
export const EnhancedRegexEditor: React.FC<EnhancedRegexEditorProps> = ({
  value = '',
  onChange,
  disabled = false,
  readOnly = false,
  placeholder = '请输入正则表达式',
  height = '120px',
  showComplexity = true,
  showTester = true,
  showVisualization = true,
  defaultActiveTab = 'editor',
}) => {
  const [pattern, setPattern] = useState(value);
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  // 验证和复杂度分析
  const { validationResult, complexity } = useRegexValidation(pattern);

  // 处理值变化
  const handleChange = (newValue: string) => {
    setPattern(newValue);
    onChange?.(newValue);
  };

  // 渲染复杂度信息
  const renderComplexityInfo = () => {
    if (!showComplexity || !complexity) return null;

    return (
      <Card size="small" style={{ marginTop: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <strong>复杂度分析:</strong>
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div>
              <span style={{ color: '#666' }}>性能评分: </span>
              <span
                style={{
                  fontWeight: 'bold',
                  color: complexity.performanceScore >= 80 ? '#52c41a' :
                         complexity.performanceScore >= 60 ? '#faad14' : '#ff4d4f'
                }}
              >
                {complexity.performanceScore}
              </span>
            </div>
            <div>
              <span style={{ color: '#666' }}>回溯风险: </span>
              <span
                style={{
                  fontWeight: 'bold',
                  color: complexity.backtrackingRisk === 'low' ? '#52c41a' :
                         complexity.backtrackingRisk === 'medium' ? '#faad14' : '#ff4d4f'
                }}
              >
                {complexity.backtrackingRisk === 'low' ? '低' :
                 complexity.backtrackingRisk === 'medium' ? '中' : '高'}
              </span>
            </div>
            <div>
              <span style={{ color: '#666' }}>节点数: </span>
              <span>{complexity.nodeCount}</span>
            </div>
            <div>
              <span style={{ color: '#666' }}>嵌套深度: </span>
              <span>{complexity.depth}</span>
            </div>
            <div>
              <span style={{ color: '#666' }}>分支数: </span>
              <span>{complexity.alternationCount}</span>
            </div>
            <div>
              <span style={{ color: '#666' }}>量词数: </span>
              <span>{complexity.quantifierCount}</span>
            </div>
          </div>

          {complexity.suggestions && complexity.suggestions.length > 0 && (
            <Alert
              message="优化建议"
              description={
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {complexity.suggestions.map((suggestion, idx) => (
                    <li key={idx}>{suggestion}</li>
                  ))}
                </ul>
              }
              type="info"
              showIcon
            />
          )}
        </Space>
      </Card>
    );
  };

  // 渲染验证错误
  const renderValidationErrors = () => {
    if (!validationResult || validationResult.valid) return null;

    return (
      <Alert
        message="验证错误"
        description={
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {validationResult.errors.map((error, idx) => (
              <li key={idx}>
                {error.message}
                {error.suggestion && <span style={{ color: '#999' }}> - {error.suggestion}</span>}
              </li>
            ))}
          </ul>
        }
        type="error"
        showIcon
        closable
        style={{ marginBottom: 16 }}
      />
    );
  };

  return (
    <div className="enhanced-regex-editor">
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as any)}
        type="card"
      >
        {/* 编辑器标签页 */}
        <TabPane tab="编辑器" key="editor">
          <Space direction="vertical" style={{ width: '100%' }}>
            {renderValidationErrors()}

            <RegexEditor
              value={pattern}
              onChange={handleChange}
              placeholder={placeholder}
              readOnly={readOnly}
              disabled={disabled}
              height={height}
              showComplexity={false} // 使用自定义的复杂度显示
              onValidate={(result: ValidationResult) => {
                console.log('验证结果:', result);
              }}
            />

            {renderComplexityInfo()}
          </Space>
        </TabPane>

        {/* 测试器标签页 */}
        {showTester && (
          <TabPane tab="测试器" key="tester">
            <RegexTester
              pattern={pattern}
              flags={{ global: true }}
              enableReplace={true}
              maxMatches={1000}
              matchTimeout={5000}
              readOnly={readOnly}
            />
          </TabPane>
        )}

        {/* 可视化标签页 */}
        {showVisualization && (
          <TabPane tab="可视化" key="visualization">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Alert
                message="Railroad Diagram 可视化"
                description="以图形方式展示正则表达式的结构,帮助理解复杂的正则表达式。"
                type="info"
                showIcon
                closable
              />

              <RegexRailroadDiagram
                pattern={pattern}
                showTitle={false}
                size="default"
              />
            </Space>
          </TabPane>
        )}
      </Tabs>
    </div>
  );
};

export default EnhancedRegexEditor;
