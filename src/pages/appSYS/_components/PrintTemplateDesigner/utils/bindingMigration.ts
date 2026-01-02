/**
 * PropertyBinding 迁移工具
 * 将旧格式的模板转换为新的PropertyBinding格式
 */

import { AtlTemplate, AtlElement, PropertyBinding, BindingMode, ElementProperties, ConditionConfig } from '../types';

/**
 * 旧格式字段信息
 */
export interface LegacyBindingInfo {
  /** 元素ID */
  elementId: string;
  /** 元素类型 */
  elementType: string;
  /** 属性名称 */
  property: string;
  /** 旧值 */
  oldValue: any;
  /** 新值 */
  newValue: PropertyBinding;
  /** 转换类型 */
  conversionType: 'static' | 'dataPath' | 'expression' | 'condition';
  /** 转换说明 */
  description: string;
}

/**
 * 迁移统计信息
 */
export interface MigrationStats {
  /** 总字段数 */
  totalFields: number;
  /** 需要迁移的字段数 */
  legacyFields: number;
  /** 已迁移的字段数 */
  migratedFields: number;
  /** 失败的字段数 */
  failedFields: number;
  /** 按转换类型分类的统计 */
  byType: Record<string, number>;
}

/**
 * 检测模板中的旧格式字段
 *
 * @param template ATL模板
 * @returns 旧格式字段信息列表
 */
export const detectLegacyBindings = (template: AtlTemplate): LegacyBindingInfo[] => {
  const legacyBindings: LegacyBindingInfo[] = [];

  template.elements.forEach(element => {
    // 检测旧的dataBinding字段
    if (element.dataBinding) {
      legacyBindings.push({
        elementId: element.id,
        elementType: getElementTypeName(element.type),
        property: 'dataBinding',
        oldValue: element.dataBinding,
        newValue: convertToPropertyBinding(element.dataBinding),
        conversionType: detectBindingType(element.dataBinding),
        description: `将旧的dataBinding字段迁移到properties中的对应字段`,
      });
    }

    // 检测旧的condition字段
    if (element.condition) {
      legacyBindings.push({
        elementId: element.id,
        elementType: getElementTypeName(element.type),
        property: 'condition',
        oldValue: element.condition,
        newValue: convertConditionToVisible(element.condition),
        conversionType: 'condition',
        description: `将condition字段转换为visible的PropertyBinding`,
      });
    }

    // 检测properties中的string类型字段
    const propertyBindings = detectLegacyPropertiesBindings(element);
    legacyBindings.push(...propertyBindings);
  });

  return legacyBindings;
};

/**
 * 检测元素properties中的旧格式字段
 *
 * @param element ATL元素
 * @returns 旧格式字段信息列表
 */
const detectLegacyPropertiesBindings = (element: AtlElement): LegacyBindingInfo[] => {
  const legacyBindings: LegacyBindingInfo[] = [];
  const props = element.properties as any;

  // 需要检查的字段列表
  const fieldsToCheck = [
    { key: 'text', propertyName: 'text' },
    { key: 'content', propertyName: 'content' },
    { key: 'source', propertyName: 'source' },
  ];

  fieldsToCheck.forEach(({ key, propertyName }) => {
    if (props[key] !== undefined) {
      // 如果是string类型，则需要迁移
      if (typeof props[key] === 'string') {
        const oldValue = props[key];
        const newValue = convertToPropertyBinding(oldValue);

        legacyBindings.push({
          elementId: element.id,
          elementType: getElementTypeName(element.type),
          property: `properties.${propertyName}`,
          oldValue,
          newValue,
          conversionType: detectBindingType(oldValue),
          description: `将${propertyName}从string类型转换为PropertyBinding`,
        });
      }
      // 如果是对象但没有mode字段，也需要检查
      else if (typeof props[key] === 'object' && props[key].mode === undefined) {
        legacyBindings.push({
          elementId: element.id,
          elementType: getElementTypeName(element.type),
          property: `properties.${propertyName}`,
          oldValue: props[key],
          newValue: convertToPropertyBinding(props[key]),
          conversionType: 'static',
          description: `将${propertyName}转换为标准PropertyBinding格式`,
        });
      }
    }
  });

  return legacyBindings;
};

/**
 * 转换值为PropertyBinding
 *
 * @param value 任意值
 * @returns PropertyBinding对象
 */
export const convertToPropertyBinding = (value: any): PropertyBinding => {
  // 如果已经是PropertyBinding对象，直接返回
  if (typeof value === 'object' && value.mode !== undefined) {
    return value as PropertyBinding;
  }

  // 如果是字符串，分析其内容
  if (typeof value === 'string') {
    const trimmed = value.trim();

    // 检查是否是模板语法 {{ }}
    const templateMatch = trimmed.match(/^\{\{\s*(.+?)\s*\}\}$/);
    if (templateMatch) {
      const content = templateMatch[1].trim();

      // 判断是简单变量还是表达式
      if (isSimpleDataPath(content)) {
        // 简单数据路径
        return {
          mode: BindingMode.DataPath,
          dataPath: content,
          description: `从旧模板语法迁移: ${value}`,
        };
      } else {
        // 复杂表达式
        return {
          mode: BindingMode.Expression,
          expression: content,
          description: `从旧模板语法迁移: ${value}`,
        };
      }
    }

    // 检查是否包含嵌套模板语法 (如: "前缀 {{ var }} 后缀")
    if (trimmed.includes('{{') && trimmed.includes('}}')) {
      // 转换为Expression模式，使用concat函数
      const expression = convertNestedTemplateToExpression(trimmed);
      return {
        mode: BindingMode.Expression,
        expression,
        description: `从嵌套模板语法迁移: ${value}`,
      };
    }

    // 纯文本，使用Static模式
    return {
      mode: BindingMode.Static,
      staticValue: value,
      description: '纯文本值',
    };
  }

  // 其他类型，使用Static模式
  return {
    mode: BindingMode.Static,
    staticValue: value,
    description: '静态值',
  };
};

/**
 * 转换condition到visible的PropertyBinding
 *
 * @param condition 条件配置
 * @returns PropertyBinding对象
 */
export const convertConditionToVisible = (condition: ConditionConfig): PropertyBinding => {
  let expression = condition.expression;

  // 如果需要反转条件
  if (condition.invertCondition) {
    expression = `!(${expression})`;
  }

  return {
    mode: BindingMode.Expression,
    expression,
    description: `从condition字段迁移`,
  };
};

/**
 * 迁移整个模板
 *
 * @param template 原始模板
 * @returns 迁移后的模板
 */
export const migrateTemplate = (template: AtlTemplate): AtlTemplate => {
  const migratedTemplate = JSON.parse(JSON.stringify(template)) as AtlTemplate;

  migratedTemplate.elements = migratedTemplate.elements.map(element => {
    const migratedElement = { ...element };

    // 迁移dataBinding字段
    if (element.dataBinding) {
      const binding = convertToPropertyBinding(element.dataBinding);
      // 根据元素类型，将binding应用到对应的属性
      applyBindingToProperty(migratedElement, binding);
      // 删除旧的dataBinding字段
      delete migratedElement.dataBinding;
    }

    // 迁移condition字段到visible
    if (element.condition) {
      migratedElement.visible = convertConditionToVisible(element.condition);
      // 删除旧的condition字段
      delete migratedElement.condition;
    }

    // 迁移visible字段 - 如果是非PropertyBinding类型（如布尔值），转换为PropertyBinding
    if (element.visible !== undefined) {
      // 检查是否已经是PropertyBinding对象
      if (typeof element.visible !== 'object' || !(element.visible as any).mode) {
        migratedElement.visible = convertToPropertyBinding(element.visible);
      }
    }

    // 迁移properties中的字段
    migratedElement.properties = migrateElementProperties(element.properties);

    return migratedElement;
  });

  return migratedTemplate;
};

/**
 * 迁移元素properties
 *
 * @param properties 元素属性
 * @returns 迁移后的属性
 */
const migrateElementProperties = (properties: ElementProperties): ElementProperties => {
  const migrated = { ...properties } as any;

  // 迁移text字段
  if (migrated.text !== undefined && typeof migrated.text !== 'object') {
    migrated.text = convertToPropertyBinding(migrated.text);
  }

  // 迁移content字段
  if (migrated.content !== undefined && typeof migrated.content !== 'object') {
    migrated.content = convertToPropertyBinding(migrated.content);
  }

  // 迁移source字段
  if (migrated.source !== undefined && typeof migrated.source !== 'object') {
    migrated.source = convertToPropertyBinding(migrated.source);
  }

  // 迁移表格单元格
  if (migrated.cells && Array.isArray(migrated.cells)) {
    migrated.cells = migrated.cells.map((row: any[]) =>
      row.map(cell => {
        if (typeof cell.content !== 'object') {
          return {
            ...cell,
            content: convertToPropertyBinding(cell.content),
          };
        }
        return cell;
      })
    );
  }

  return migrated;
};

/**
 * 将PropertyBinding应用到元素属性
 *
 * @param element 元素
 * @param binding PropertyBinding对象
 */
const applyBindingToProperty = (element: AtlElement, binding: PropertyBinding): void => {
  const props = element.properties as any;

  // 根据元素类型，应用到对应的字段
  switch (element.type) {
    case 1: // Text
    case 2: // MultilineText
      props.text = binding;
      break;
    case 3: // Barcode
    case 7: // QRCode
    case 8: // DataMatrix
      props.content = binding;
      break;
    case 4: // Image
      props.source = binding;
      break;
    default:
      console.warn(`未知的元素类型: ${element.type}`);
  }
};

/**
 * 判断是否是简单数据路径
 *
 * @param text 文本内容
 * @returns 是否是简单数据路径
 */
const isSimpleDataPath = (text: string): boolean => {
  // 简单数据路径只包含字母、数字、点号、下划线和方括号
  const simplePathPattern = /^[a-zA-Z_][\w.[\]]*$/;

  // 不包含函数调用、运算符等
  const hasFunction = /\w+\s*\(/.test(text);
  const hasOperator = /[+\-*/%<>=!&|]/.test(text);

  return simplePathPattern.test(text) && !hasFunction && !hasOperator;
};

/**
 * 转换嵌套模板语法为Expression
 *
 * @param text 包含嵌套模板的文本
 * @returns 表达式字符串
 */
const convertNestedTemplateToExpression = (text: string): string => {
  // 将 "前缀 {{ var }} 后缀" 转换为 concat("前缀", var, "后缀")
  const parts: string[] = [];
  let lastIndex = 0;
  const templatePattern = /\{\{\s*(.+?)\s*\}\}/g;

  let match: RegExpExecArray | null;
  while ((match = templatePattern.exec(text)) !== null) {
    // 添加模板前的文本
    if (match.index > lastIndex) {
      const staticText = text.substring(lastIndex, match.index);
      parts.push(`"${staticText}"`);
    }

    // 添加变量
    parts.push(match[1].trim());

    lastIndex = match.index + match[0].length;
  }

  // 添加最后的文本
  if (lastIndex < text.length) {
    const staticText = text.substring(lastIndex);
    parts.push(`"${staticText}"`);
  }

  // 如果只有一个部分，直接返回
  if (parts.length === 1) {
    return parts[0];
  }

  // 使用concat函数连接
  return `concat(${parts.join(', ')})`;
};

/**
 * 检测绑定类型
 *
 * @param value 值
 * @returns 绑定类型
 */
const detectBindingType = (value: any): 'static' | 'dataPath' | 'expression' | 'condition' => {
  if (typeof value === 'string') {
    const trimmed = value.trim();

    // 检查模板语法
    const templateMatch = trimmed.match(/^\{\{\s*(.+?)\s*\}\}$/);
    if (templateMatch) {
      const content = templateMatch[1].trim();
      return isSimpleDataPath(content) ? 'dataPath' : 'expression';
    }

    // 检查嵌套模板
    if (trimmed.includes('{{') && trimmed.includes('}}')) {
      return 'expression';
    }
  }

  return 'static';
};

/**
 * 获取元素类型名称
 *
 * @param type 元素类型枚举值
 * @returns 类型名称
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
 * 计算迁移统计信息
 *
 * @param legacyBindings 旧格式字段信息列表
 * @returns 统计信息
 */
export const calculateMigrationStats = (legacyBindings: LegacyBindingInfo[]): MigrationStats => {
  const byType: Record<string, number> = {
    static: 0,
    dataPath: 0,
    expression: 0,
    condition: 0,
  };

  legacyBindings.forEach(binding => {
    byType[binding.conversionType] = (byType[binding.conversionType] || 0) + 1;
  });

  return {
    totalFields: legacyBindings.length,
    legacyFields: legacyBindings.length,
    migratedFields: 0,
    failedFields: 0,
    byType,
  };
};

/**
 * 验证迁移结果
 *
 * @param original 原始模板
 * @param migrated 迁移后模板
 * @returns 验证结果
 */
export const validateMigration = (
  original: AtlTemplate,
  migrated: AtlTemplate
): { isValid: boolean; errors: string[]; warnings: string[] } => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 检查元素数量
  if (original.elements.length !== migrated.elements.length) {
    errors.push(`元素数量不匹配: 原始${original.elements.length}, 迁移后${migrated.elements.length}`);
  }

  // 检查每个元素
  original.elements.forEach((originalElement, index) => {
    const migratedElement = migrated.elements[index];

    if (!migratedElement) {
      errors.push(`元素${originalElement.id}在迁移后丢失`);
      return;
    }

    // 检查ID
    if (originalElement.id !== migratedElement.id) {
      errors.push(`元素ID不匹配: ${originalElement.id} -> ${migratedElement.id}`);
    }

    // 检查是否还有旧字段
    if ((migratedElement as any).dataBinding) {
      warnings.push(`元素${migratedElement.id}仍包含旧的dataBinding字段`);
    }

    if ((migratedElement as any).condition) {
      warnings.push(`元素${migratedElement.id}仍包含旧的condition字段`);
    }

    // 检查properties中的字段是否已转换
    const props = migratedElement.properties as any;
    ['text', 'content', 'source'].forEach(key => {
      if (props[key] !== undefined && typeof props[key] !== 'object') {
        warnings.push(`元素${migratedElement.id}的${key}字段未转换为PropertyBinding`);
      }
    });
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};
