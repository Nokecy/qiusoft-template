/**
 * RuleBuilder 包装组件
 * 符合项目组件规范,使用 forwardRef
 */

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Alert, Spin } from 'antd';
import { RuleBuilder } from '@nokecy/qc-ui';
import type { RuleBuilderProps, FieldDefinition, FieldDataType, RuleGroupDto } from '@nokecy/qc-ui';
import { LabelPrintFeatureDefinitionGetPropertySchemaAsync } from '@/services/openApi/LabelPrintFeatureDefinition';

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
    // 静默记录错误,不在控制台显示
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
 * 后端: 0=String, 1=Int, 2=Decimal, 3=Boolean, 4=DateTime, 5=Enum
 */
const PROPERTY_TYPE_MAP: Record<number, FieldDataType> = {
  0: 'string',   // String
  1: 'number',   // Int
  2: 'number',   // Decimal
  3: 'boolean',  // Boolean
  4: 'datetime', // DateTime
  5: 'enum',     // Enum
};

/**
 * 将后端 PropertyDto 转换为前端 FieldDefinition
 */
function convertPropertyDtoToFieldDefinition(
  dto: API.BurnAbpLabelManagementLabelPrintFeaturesPropertyDto,
): FieldDefinition {
  const dataType = PROPERTY_TYPE_MAP[dto.type ?? 0] || 'string';

  // 解析枚举值 (后端返回的是 JSON 字符串)
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
 * RuleBuilder 包装组件(使用 forwardRef)
 */
const RuleBuilderWrapper = React.forwardRef<
  HTMLDivElement,
  {
    value?: RuleGroupDto | null;
    onChange?: (value: RuleGroupDto | null) => void;
    disabled?: boolean;
    printFeatureCode?: string; // 新增: 打印功能编码
  }
>((props, ref) => {
  const { value, onChange, disabled, printFeatureCode } = props;

  // 调试日志：查看value prop
  if (process.env.NODE_ENV === 'development') {
    console.log('🎨 RuleBuilderWrapper - value prop:', value);
    console.log('🎨 RuleBuilderWrapper - printFeatureCode:', printFeatureCode);
  }

  // 动态字段状态
  const [fields, setFields] = useState<FieldDefinition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 记录上一次的printFeatureCode，用于判断是否真正切换
  const previousFeatureCodeRef = useRef<string | undefined>(printFeatureCode);

  // 监听打印功能切换,重新加载属性定义
  useEffect(() => {
    // 打印功能为空时,清空字段列表
    if (!printFeatureCode) {
      setFields([]);
      setError(null);
      return;
    }

    const loadFields = async () => {
      setLoading(true);
      setError(null);

      try {
        // 调用后端 API 获取属性定义
        const schema = await LabelPrintFeatureDefinitionGetPropertySchemaAsync({
          feature: printFeatureCode, // 使用当前选择的打印功能编码
        });

        // 转换为前端 FieldDefinition 格式
        if (schema.properties && schema.properties.length > 0) {
          const convertedFields = schema.properties.map(convertPropertyDtoToFieldDefinition);
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
  }, [printFeatureCode]); // 依赖打印功能编码,切换时重新加载

  // 打印功能切换时清空规则配置(避免字段不匹配)
  useEffect(() => {
    // 只有当printFeatureCode真正改变时才清空规则
    const previousCode = previousFeatureCodeRef.current;

    if (printFeatureCode && previousCode && printFeatureCode !== previousCode && value) {
      console.log('🔄 打印功能切换，清空规则配置');
      console.log('   从:', previousCode, '→', printFeatureCode);
      onChange?.(null);
    }

    // 更新ref
    previousFeatureCodeRef.current = printFeatureCode;
  }, [printFeatureCode, value, onChange]);

  // 使用useMemo缓存config对象，避免不必要的重新创建
  const config: RuleBuilderProps['config'] = useMemo(
    () => ({
      staticFields: fields, // 使用动态加载的字段
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
    }),
    [fields],
  );

  // 打印功能为空时的提示
  if (!printFeatureCode) {
    return (
      <div ref={ref}>
        <Alert
          type="info"
          message="请先选择打印功能"
          description="选择打印功能后,系统将自动加载对应的规则配置属性定义"
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
          value={value}
          onChange={onChange}
          readonly={disabled}
          config={config}
        />
      </ErrorBoundary>
    </div>
  );
});

RuleBuilderWrapper.displayName = 'RuleBuilderWrapper';

export { RuleBuilderWrapper };
export default RuleBuilderWrapper;
