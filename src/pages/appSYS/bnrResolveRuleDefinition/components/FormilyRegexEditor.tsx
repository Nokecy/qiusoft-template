/**
 * Formily RegexEditor 包装组件
 * 将增强版 RegexEditor 适配为 Formily 表单组件
 *
 * 功能特性:
 * - 实时语法验证和错误标注
 * - 正则表达式测试器(匹配、替换预览)
 * - Railroad Diagram 可视化
 * - 复杂度分析和性能评分
 * - 优化建议
 */

import React from 'react';
import { connect, mapProps } from '@formily/react';
import { EnhancedRegexEditor } from './EnhancedRegexEditor';

/**
 * Formily 表单适配的增强版 RegexEditor 组件
 *
 * @example
 * ```tsx
 * // 在 Schema 中使用
 * {
 *   expression: {
 *     type: 'string',
 *     title: '表达式',
 *     'x-component': 'FormilyRegexEditor',
 *     'x-component-props': {
 *       placeholder: '请输入正则表达式',
 *       height: '120px',
 *       showComplexity: true,
 *       showTester: true,
 *       showVisualization: true,
 *       defaultActiveTab: 'editor'
 *     }
 *   }
 * }
 * ```
 */
export const FormilyRegexEditor = connect(
  EnhancedRegexEditor,
  mapProps(
    {
      // 将 Formily 的 value 映射到 EnhancedRegexEditor 的 value
      value: 'value',
      // 将 Formily 的 disabled 映射到 EnhancedRegexEditor 的 disabled
      disabled: 'disabled',
      // 将 Formily 的 readOnly 映射到 EnhancedRegexEditor 的 readOnly
      readOnly: 'readOnly',
    },
    (props, field) => {
      // 返回处理后的 props
      return {
        ...props,
        // 确保 onChange 正确传递
        onChange: (value: string) => {
          field.setValue(value);
          // 如果有额外的 onChange 回调，也执行它
          props.onChange?.(value);
        },
      };
    }
  )
);

export default FormilyRegexEditor;
