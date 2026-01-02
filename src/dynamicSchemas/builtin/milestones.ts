/**
 * 里程碑动态表单 - 内置 Schema 定义
 *
 * scenarioKey 格式: milestone:{里程碑名称}
 *
 * 示例:
 * - milestone:需求评审
 * - milestone:设计评审
 * - milestone:开发完成
 * - milestone:测试验收
 */

import type { ISchema } from '@formily/react';
import type { DynamicSchemaDefinition } from '../types';

/**
 * 需求评审里程碑表单
 * scenarioKey: milestone:需求评审
 */
export const requirementReviewSchema: DynamicSchemaDefinition = {
  scenarioKey: 'milestone:需求评审',
  label: '需求评审',
  description: '项目需求评审里程碑表单',
  schema: {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
          maxColumns: 2,
          minColumns: 1,
          columnGap: 16,
          strictAutoFit: true,
        },
        properties: {
          // 需求文档信息
          requirementDocTitle: {
            type: 'string',
            title: '需求文档标题',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入需求文档标题',
            },
          },
          requirementDocVersion: {
            type: 'string',
            title: '文档版本',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '如: V1.0',
            },
          },
          // 评审信息
          reviewDate: {
            type: 'string',
            title: '评审日期',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'DatePicker',
            'x-component-props': {
              style: { width: '100%' },
            },
          },
          '{value:reviewerId,label:reviewerName}': {
            type: 'string',
            title: '评审人',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'UserSelect',
            'x-component-props': {
              labelInValue: true,
              placeholder: '请选择评审人',
            },
          },
          // 评审结果
          reviewResult: {
            type: 'string',
            title: '评审结果',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Radio.Group',
            enum: [
              { label: '通过', value: 'passed' },
              { label: '有条件通过', value: 'conditional' },
              { label: '不通过', value: 'rejected' },
            ],
          },
          reviewScore: {
            type: 'number',
            title: '评审评分',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              min: 0,
              max: 100,
              placeholder: '请输入评分(0-100)',
              style: { width: '100%' },
            },
          },
          // 详细信息
          requirementSummary: {
            type: 'string',
            title: '需求概述',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component-props': {
              rows: 3,
              placeholder: '请简要描述主要需求内容',
            },
          },
          reviewComments: {
            type: 'string',
            title: '评审意见',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component-props': {
              rows: 4,
              placeholder: '请填写评审意见和建议',
            },
          },
          issuesFound: {
            type: 'string',
            title: '发现问题',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component-props': {
              rows: 4,
              placeholder: '列出评审中发现的问题',
            },
          },
        },
      },
    },
  },
  form: {
    labelCol: 6,
    wrapperCol: 18,
  },
};

/**
 * 设计评审里程碑表单
 * scenarioKey: milestone:设计评审
 */
export const designReviewSchema: DynamicSchemaDefinition = {
  scenarioKey: 'milestone:设计评审',
  label: '设计评审',
  description: '项目设计评审里程碑表单',
  schema: {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
          maxColumns: 2,
          minColumns: 1,
          columnGap: 16,
          strictAutoFit: true,
        },
        properties: {
          // 设计文档信息
          designDocTitle: {
            type: 'string',
            title: '设计文档标题',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入设计文档标题',
            },
          },
          designDocVersion: {
            type: 'string',
            title: '文档版本',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '如: V1.0',
            },
          },
          designType: {
            type: 'string',
            title: '设计类型',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            enum: [
              { label: '概要设计', value: 'high_level' },
              { label: '详细设计', value: 'detailed' },
              { label: '数据库设计', value: 'database' },
              { label: 'UI设计', value: 'ui' },
            ],
          },
          // 评审信息
          reviewDate: {
            type: 'string',
            title: '评审日期',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'DatePicker',
            'x-component-props': {
              style: { width: '100%' },
            },
          },
          '{value:reviewerId,label:reviewerName}': {
            type: 'string',
            title: '评审人',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'UserSelect',
            'x-component-props': {
              labelInValue: true,
              placeholder: '请选择评审人',
            },
          },
          reviewResult: {
            type: 'string',
            title: '评审结果',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Radio.Group',
            enum: [
              { label: '通过', value: 'passed' },
              { label: '有条件通过', value: 'conditional' },
              { label: '不通过', value: 'rejected' },
            ],
          },
          // 详细信息
          designSummary: {
            type: 'string',
            title: '设计概述',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component-props': {
              rows: 3,
              placeholder: '请简要描述设计方案',
            },
          },
          technicalDecisions: {
            type: 'string',
            title: '技术决策',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component-props': {
              rows: 3,
              placeholder: '记录重要的技术选型和决策',
            },
          },
          reviewComments: {
            type: 'string',
            title: '评审意见',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component-props': {
              rows: 4,
              placeholder: '请填写评审意见和建议',
            },
          },
        },
      },
    },
  },
  form: {
    labelCol: 6,
    wrapperCol: 18,
  },
};

/**
 * 开发完成里程碑表单
 * scenarioKey: milestone:开发完成
 */
export const developmentCompleteSchema: DynamicSchemaDefinition = {
  scenarioKey: 'milestone:开发完成',
  label: '开发完成',
  description: '项目开发完成里程碑表单',
  schema: {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
          maxColumns: 2,
          minColumns: 1,
          columnGap: 16,
          strictAutoFit: true,
        },
        properties: {
          // 完成信息
          completionDate: {
            type: 'string',
            title: '完成日期',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'DatePicker',
            'x-component-props': {
              style: { width: '100%' },
            },
          },
          '{value:developerId,label:developerName}': {
            type: 'string',
            title: '开发负责人',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'UserSelect',
            'x-component-props': {
              labelInValue: true,
              placeholder: '请选择开发负责人',
            },
          },
          codeRepository: {
            type: 'string',
            title: '代码仓库地址',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '如: https://github.com/...',
            },
          },
          commitHash: {
            type: 'string',
            title: '提交哈希',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '如: a1b2c3d4...',
            },
          },
          // 代码质量指标
          codeReviewStatus: {
            type: 'string',
            title: '代码评审状态',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Radio.Group',
            enum: [
              { label: '已通过', value: 'passed' },
              { label: '待修改', value: 'pending' },
              { label: '未评审', value: 'not_reviewed' },
            ],
          },
          unitTestCoverage: {
            type: 'number',
            title: '单元测试覆盖率(%)',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              min: 0,
              max: 100,
              placeholder: '请输入覆盖率',
              style: { width: '100%' },
            },
          },
          // 功能实现
          implementedFeatures: {
            type: 'string',
            title: '已实现功能',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component-props': {
              rows: 4,
              placeholder: '列出已完成的功能点',
            },
          },
          knownIssues: {
            type: 'string',
            title: '已知问题',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component-props': {
              rows: 3,
              placeholder: '列出已知的问题和限制',
            },
          },
          remarks: {
            type: 'string',
            title: '备注说明',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component-props': {
              rows: 3,
              placeholder: '其他需要说明的内容',
            },
          },
        },
      },
    },
  },
  form: {
    labelCol: 6,
    wrapperCol: 18,
  },
};

/**
 * 测试验收里程碑表单
 * scenarioKey: milestone:测试验收
 */
export const testAcceptanceSchema: DynamicSchemaDefinition = {
  scenarioKey: 'milestone:测���验收',
  label: '测试验收',
  description: '项目测试验收里程碑表单',
  schema: {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
          maxColumns: 2,
          minColumns: 1,
          columnGap: 16,
          strictAutoFit: true,
        },
        properties: {
          // 测试信息
          testStartDate: {
            type: 'string',
            title: '测试开始日期',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'DatePicker',
            'x-component-props': {
              style: { width: '100%' },
            },
          },
          testEndDate: {
            type: 'string',
            title: '测试结束日期',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'DatePicker',
            'x-component-props': {
              style: { width: '100%' },
            },
          },
          '{value:testerId,label:testerName}': {
            type: 'string',
            title: '测试负责人',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'UserSelect',
            'x-component-props': {
              labelInValue: true,
              placeholder: '请选择测试负责人',
            },
          },
          testEnvironment: {
            type: 'string',
            title: '测试环境',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '如: UAT环境',
            },
          },
          // 测试结果统计
          totalTestCases: {
            type: 'number',
            title: '测试用例总数',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              min: 0,
              placeholder: '请输入用例数量',
              style: { width: '100%' },
            },
          },
          passedTestCases: {
            type: 'number',
            title: '通过用例数',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              min: 0,
              placeholder: '请输入通过数量',
              style: { width: '100%' },
            },
          },
          bugsFound: {
            type: 'number',
            title: '发现缺陷数',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              min: 0,
              placeholder: '请输入缺陷数量',
              style: { width: '100%' },
            },
          },
          criticalBugs: {
            type: 'number',
            title: '严重缺陷数',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              min: 0,
              placeholder: '请输入严重缺陷数',
              style: { width: '100%' },
            },
          },
          // 验收结果
          acceptanceResult: {
            type: 'string',
            title: '验收结果',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Radio.Group',
            'x-decorator-props': {
              gridSpan: 2,
            },
            enum: [
              { label: '通过验收', value: 'accepted' },
              { label: '有条件通过', value: 'conditional' },
              { label: '不通过', value: 'rejected' },
            ],
          },
          // 详细信息
          testSummary: {
            type: 'string',
            title: '测试总结',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component-props': {
              rows: 4,
              placeholder: '总结测试过程和结果',
            },
          },
          majorIssues: {
            type: 'string',
            title: '主要问题',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component-props': {
              rows: 3,
              placeholder: '列出测试中发现的主要问题',
            },
          },
          recommendations: {
            type: 'string',
            title: '改进建议',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component-props': {
              rows: 3,
              placeholder: '提出改进建议',
            },
          },
        },
      },
    },
  },
  form: {
    labelCol: 6,
    wrapperCol: 18,
  },
};

/**
 * 导出所有里程碑 Schema
 */
export const schemas: DynamicSchemaDefinition[] = [
  requirementReviewSchema,
  designReviewSchema,
  developmentCompleteSchema,
  testAcceptanceSchema,
];
