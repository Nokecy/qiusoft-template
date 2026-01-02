import React, { useState, useMemo } from 'react';
import { Select, Input, Space, Tag } from 'antd';
import { useAvailableDynamicScenarios } from '@@/plugin-dynamicSchema';
import type { ScenarioInfo } from '@/dynamicSchemas/types';

export interface ScenarioSelectorProps {
  value?: string;
  onChange?: (scenarioKey: string) => void;
  /** 是否允许自定义输入 */
  allowCustom?: boolean;
  /** 占位符 */
  placeholder?: string;
  /** 过滤函数 */
  filter?: (scenario: ScenarioInfo) => boolean;
  /** 样式 */
  style?: React.CSSProperties;
}

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  value,
  onChange,
  allowCustom = true,
  placeholder = '请选择或输入场景',
  filter,
  style,
}) => {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customInput, setCustomInput] = useState('');

  // 获取所有可用场景
  const allScenarios = useAvailableDynamicScenarios();

  // 应用过滤
  const scenarios = useMemo(() => {
    return filter ? allScenarios.filter(filter) : allScenarios;
  }, [allScenarios, filter]);

  // 处理选择变化
  const handleSelectChange = (selectedValue: string) => {
    if (selectedValue === '__custom__') {
      setIsCustomMode(true);
      setCustomInput('');
    } else {
      setIsCustomMode(false);
      onChange?.(selectedValue);
    }
  };

  // 处理自定义输入
  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCustomInput(newValue);
    onChange?.(newValue);
  };

  // 渲染选项标签
  const renderOptionLabel = (scenario: ScenarioInfo) => (
    <Space>
      <span>{scenario.label}</span>
      <Tag color={scenario.source === 'builtin' ? 'blue' : 'green'}>
        {scenario.source === 'builtin' ? '内置' : '自定义'}
      </Tag>
      {scenario.hasBackendOverride && (
        <Tag color="orange">已覆盖</Tag>
      )}
    </Space>
  );

  return (
    <Space direction="vertical" style={{ width: '100%', ...style }}>
      <Select
        value={isCustomMode ? '__custom__' : value}
        onChange={handleSelectChange}
        placeholder={placeholder}
        style={{ width: '100%' }}
        showSearch
        optionFilterProp="label"
      >
        {scenarios.map((scenario) => (
          <Select.Option
            key={scenario.scenarioKey}
            value={scenario.scenarioKey}
            label={scenario.label}
          >
            {renderOptionLabel(scenario)}
          </Select.Option>
        ))}

        {allowCustom && (
          <Select.Option value="__custom__" label="自定义">
            <span style={{ color: '#1890ff' }}>+ 自定义输入...</span>
          </Select.Option>
        )}
      </Select>

      {isCustomMode && (
        <Input
          value={customInput}
          onChange={handleCustomInputChange}
          placeholder="输入场景标识，如: approval:expense"
          addonBefore="ScenarioKey"
        />
      )}
    </Space>
  );
};

export default ScenarioSelector;
