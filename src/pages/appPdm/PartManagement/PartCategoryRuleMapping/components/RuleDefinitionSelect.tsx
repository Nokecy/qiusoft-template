import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { PdmPartNumberRuleDefinitionGetListAsync } from '@/services/pdm/PdmPartNumberRuleDefinition';

interface RuleDefinitionSelectProps {
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

/**
 * 规则定义选择器
 */
const RuleDefinitionSelect: React.FC<RuleDefinitionSelectProps> = (props) => {
  const { value, onChange, disabled } = props;
  const [options, setOptions] = useState<{ label: string; value: number }[]>([]);
  const [loading, setLoading] = useState(false);

  // 加载规则定义列表
  useEffect(() => {
    loadRuleDefinitions();
  }, []);

  const loadRuleDefinitions = async () => {
    setLoading(true);
    try {
      const data = await PdmPartNumberRuleDefinitionGetListAsync({
        Active: true,
        MaxResultCount: 1000,
      });
      const ruleOptions = (data.items || []).map(item => ({
        label: item.displayName || item.name || '',
        value: item.id!,
      }));
      setOptions(ruleOptions);
    } catch (error) {
      console.error('Failed to load rule definitions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      loading={loading}
      disabled={disabled}
      placeholder="请选择规则定义"
      showSearch
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      style={{ width: '100%' }}
    />
  );
};

export default RuleDefinitionSelect;
