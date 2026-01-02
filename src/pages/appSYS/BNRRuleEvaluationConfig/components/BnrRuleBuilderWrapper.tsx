/**
 * BNR RuleBuilder 包装组件
 * 用于序列号规则评估配置
 */

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Alert, Spin } from 'antd';
import { RuleBuilder } from '@nokecy/qc-ui';
import type { RuleBuilderProps, FieldDefinition, FieldDataType, RuleGroupDto } from '@nokecy/qc-ui';
import { BnrRuleDefinitionGetPropertiesByRuleNameAsync } from '@/services/openApi/BnrRuleDefinition';

/**
 * 错误边界组件
 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error('RuleBuilder Error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert
          type="error"
          message="规则构建器渲染错误"
          description={this.state.error?.message || '未知错误'}
          showIcon
        />
      );
    }

    return this.props.children;
  }
}

/**
 * PropertyType 枚举值映射 (后端 → 前端)
 * 0=String, 1=Int, 2=Decimal, 3=Boolean, 4=DateTime, 5=Enum
 */
const PROPERTY_TYPE_MAP: Record<number, FieldDataType> = {
  0: 'string',
  1: 'number',
  2: 'number',
  3: 'boolean',
  4: 'datetime',
  5: 'enum',
};

/**
 * 将后端 PropertyDto 转换为前端 FieldDefinition
 */
function convertPropertyDtoToFieldDefinition(
  dto: API.BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrPropertyDefinitionDto,
): FieldDefinition {
  const dataType = PROPERTY_TYPE_MAP[dto.propertyType ?? 0] || 'string';

  // 解析枚举值
  let enumValues: string[] | undefined;
  if (dataType === 'enum' && dto.enumValues) {
    try {
      const enumObj = JSON.parse(dto.enumValues);
      enumValues = Object.keys(enumObj);
    } catch (error) {
      console.error('Failed to parse enum values:', error);
    }
  }

  return {
    name: dto.name || '',
    displayName: dto.displayName || dto.name || '',
    dataType,
    description: dto.description,
    enumValues,
  };
}

/**
 * BNR RuleBuilder 包装组件
 */
const BnrRuleBuilderWrapper = React.forwardRef<
  HTMLDivElement,
  {
    value?: RuleGroupDto | null;
    onChange?: (value: RuleGroupDto | null) => void;
    disabled?: boolean;
    ruleName?: string; // 规则名称
  }
>((props, ref) => {
  const { value, onChange, disabled, ruleName } = props;

  if (process.env.NODE_ENV === 'development') {
    console.log('🎨 BnrRuleBuilderWrapper - value prop:', value);
    console.log('🎨 BnrRuleBuilderWrapper - ruleName:', ruleName);
    console.log('🎨 BnrRuleBuilderWrapper - value 类型:', typeof value);
    console.log('🎨 BnrRuleBuilderWrapper - value 内容:', JSON.stringify(value, null, 2));
    if (value) {
      console.log('🎨 value.rules:', value.rules);
      console.log('🎨 value.groups:', value.groups);
      console.log('🎨 value.logic:', value.logic);
    }
  }

  // 动态字段状态
  const [fields, setFields] = useState<FieldDefinition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 记录上一次的ruleName和是否首次加载
  const previousRuleNameRef = useRef<string | undefined>(ruleName);
  const isFirstLoadRef = useRef(true);

  // 规范化 value，确保符合 RuleGroupDto 结构（必须在所有条件返回前调用）
  const normalizedValue = React.useMemo(() => {
    if (!value || typeof value !== 'object') {
      return null;
    }

    // 检查是否是空对象或缺少必要属性
    if (Object.keys(value).length === 0 || value.rules === undefined || value.groups === undefined) {
      if (process.env.NODE_ENV === 'development') {
        console.log('⚠️ value 不符合规范，返回 null');
      }
      return null;
    }

    return value;
  }, [value]);

  // 监听规则名称切换,重新加载属性定义
  useEffect(() => {
    if (!ruleName) {
      setFields([]);
      setError(null);
      return;
    }

    const loadFields = async () => {
      setLoading(true);
      setError(null);

      try {
        // 调用后端 API 获取属性定义
        const properties = await BnrRuleDefinitionGetPropertiesByRuleNameAsync({
          ruleName: ruleName,
        });

        // 转换为前端 FieldDefinition 格式
        if (properties && properties.length > 0) {
          const convertedFields = properties.map(convertPropertyDtoToFieldDefinition);
          console.log('🔧 加载的属性定义:', properties);
          console.log('🔧 转换后的字段定义:', convertedFields);
          console.log('🔧 详细字段信息:');
          convertedFields.forEach((field, idx) => {
            console.log(`  字段 ${idx + 1}:`, {
              name: field.name,
              displayName: field.displayName,
              dataType: field.dataType,
              nameType: typeof field.name,
              nameLength: field.name?.length
            });
          });
          setFields(convertedFields);
        } else {
          setError('未获取到可用的属性定义');
        }
      } catch (err: any) {
        console.error('Failed to load dynamic fields:', err);
        setError(err?.message || '加载属性定义失败');
      } finally {
        setLoading(false);
      }
    };

    loadFields();
  }, [ruleName]);

  // 规则名称切换时清空规则配置(排除首次加载和空值变化)
  useEffect(() => {
    const previousName = previousRuleNameRef.current;

    // 首次加载时跳过清空逻辑
    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
      previousRuleNameRef.current = ruleName;
      console.log('🔵 首次加载,ruleName:', ruleName, '不清空规则配置');
      return;
    }

    // 判断是否为有效的规则名称(排除空对象、undefined、null等)
    const isValidRuleName = (name: any): name is string => {
      return typeof name === 'string' && name.length > 0;
    };

    const isPreviousValid = isValidRuleName(previousName);
    const isCurrentValid = isValidRuleName(ruleName);

    // 只有在两个都是有效规则名称且确实变化时才清空
    if (isPreviousValid && isCurrentValid && ruleName !== previousName && value) {
      console.log('🔄 规则名称切换，清空规则配置');
      console.log('   从:', previousName, '→', ruleName);
      // 传递空的规则组对象而不是null，避免RuleBuilder组件报错
      onChange?.({ logic: 0, rules: [], groups: [] });
    }

    previousRuleNameRef.current = ruleName;
  }, [ruleName, value, onChange]);

  // 配置对象
  const config: RuleBuilderProps['config'] = useMemo(
    () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('🔧 RuleBuilder config.staticFields:', fields);
        console.log('🔧 字段数量:', fields.length);
        fields.forEach((field, index) => {
          console.log(`  字段${index + 1}:`, field.name, '-', field.displayName);
        });
      }

      return {
        staticFields: fields,
        maxNestingLevel: 3,
        showJsonPreview: process.env.NODE_ENV === 'development',
        validator: (rule) => {
          if (!rule.rules?.length && !rule.groups?.length) {
            return {
              valid: false,
              message: '规则组至少需要包含一个规则或子组',
            };
          }
          return { valid: true };
        },
      };
    },
    [fields],
  );

  // 规则名称为空时的提示
  if (!ruleName) {
    return (
      <div ref={ref}>
        <Alert
          type="info"
          message="请先选择规则名称"
          description="选择规则名称后,系统将自动加载对应的属性定义"
          showIcon
        />
      </div>
    );
  }

  // 加载中状态
  if (loading) {
    return (
      <div ref={ref} style={{ textAlign: 'center', padding: '20px' }}>
        <Spin tip="正在加载属性定义..." />
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div ref={ref}>
        <Alert
          type="error"
          message="属性定义加载失败"
          description={error}
          showIcon
        />
      </div>
    );
  }

  // 正常渲染
  return (
    <div ref={ref}>
      <ErrorBoundary>
        <RuleBuilder
          value={normalizedValue}
          onChange={onChange}
          readonly={disabled}
          config={config}
        />
      </ErrorBoundary>
    </div>
  );
});

BnrRuleBuilderWrapper.displayName = 'BnrRuleBuilderWrapper';

export { BnrRuleBuilderWrapper };
export default BnrRuleBuilderWrapper;
