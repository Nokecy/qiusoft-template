/**
 * ATL模板DTO转换器单元测试
 *
 * @module dtoConverters.test
 */

import {
  toTemplateDto,
  fromTemplateDto,
  isTemplateDto,
  batchToTemplateDto,
  batchFromTemplateDto,
  ConversionError,
  type AtlTemplateDto,
} from './dtoConverters';
import type { AtlTemplateWithParameters } from '../types';
import { ParameterType } from '../types/parameter';
import { DataSourceType } from '../types';

describe('DTO转换器测试', () => {
  // ==================== 基础转换测试 ====================

  describe('toTemplateDto - 前端对象转DTO', () => {
    it('应该正确序列化parameters字段', () => {
      const template: AtlTemplateWithParameters = {
        version: '1.0',
        metadata: { name: 'Test Template' },
        canvas: { width: 100, height: 50, dpi: 203 },
        layoutType: 0,
        dataSources: {},
        elements: [],
        parameters: {
          orderId: {
            name: 'orderId',
            type: ParameterType.String,
            required: true,
            defaultValue: '',
            description: '订单ID',
          },
          quantity: {
            name: 'quantity',
            type: ParameterType.Int,
            required: false,
            description: '数量',
          },
        },
      };

      const dto = toTemplateDto(template);

      // 验证parameters字段已序列化为字符串
      expect(typeof dto.parameters).toBe('string');
      expect(dto.parameters).toBeTruthy();

      // 验证JSON格式正确
      const parsed = JSON.parse(dto.parameters!);
      expect(parsed.orderId.name).toBe('orderId');
      expect(parsed.quantity.name).toBe('quantity');
    });

    it('应该正确序列化dataSources字段', () => {
      const template: AtlTemplateWithParameters = {
        version: '1.0',
        metadata: {},
        canvas: { width: 100, height: 50, dpi: 203 },
        layoutType: 0,
        dataSources: {
          orderData: {
            name: 'orderData',
            type: DataSourceType.Api,
            url: '/api/orders',
            method: 'GET',
          },
        },
        elements: [],
      };

      const dto = toTemplateDto(template);

      // 验证dataSources字段已序列化为字符串
      expect(typeof dto.dataSources).toBe('string');
      expect(dto.dataSources).toBeTruthy();

      // 验证JSON格式正确
      const parsed = JSON.parse(dto.dataSources!);
      expect(parsed.orderData.name).toBe('orderData');
      expect(parsed.orderData.type).toBe(DataSourceType.Api);
    });

    it('应该处理空parameters和dataSources', () => {
      const template: AtlTemplateWithParameters = {
        version: '1.0',
        metadata: {},
        canvas: { width: 100, height: 50, dpi: 203 },
        layoutType: 0,
        dataSources: {},
        elements: [],
        parameters: {},
      };

      const dto = toTemplateDto(template);

      // 空对象应该序列化为undefined
      expect(dto.parameters).toBeUndefined();
      expect(dto.dataSources).toBeUndefined();
    });
  });

  describe('fromTemplateDto - DTO转前端对象', () => {
    it('应该正确反序列化parameters字段', () => {
      const dto: AtlTemplateDto = {
        version: '1.0',
        metadata: {},
        canvas: { width: 100, height: 50, dpi: 203 },
        layoutType: 0,
        dataSources: undefined,
        elements: [],
        parameters: JSON.stringify({
          orderId: {
            name: 'orderId',
            type: ParameterType.String,
            required: true,
            defaultValue: '',
          },
        }),
      };

      const template = fromTemplateDto(dto);

      // 验证parameters字段已反序列化为对象
      expect(typeof template.parameters).toBe('object');
      expect(template.parameters?.orderId).toBeDefined();
      expect(template.parameters?.orderId.name).toBe('orderId');
    });

    it('应该正确反序列化dataSources字段', () => {
      const dto: AtlTemplateDto = {
        version: '1.0',
        metadata: {},
        canvas: { width: 100, height: 50, dpi: 203 },
        layoutType: 0,
        elements: [],
        dataSources: JSON.stringify({
          orderData: {
            name: 'orderData',
            type: DataSourceType.Api,
            url: '/api/orders',
          },
        }),
      };

      const template = fromTemplateDto(dto);

      // 验证dataSources字段已反序列化为对象
      expect(typeof template.dataSources).toBe('object');
      expect(template.dataSources.orderData).toBeDefined();
      expect(template.dataSources.orderData.name).toBe('orderData');
    });

    it('应该处理空字符串和null', () => {
      const dto: AtlTemplateDto = {
        version: '1.0',
        metadata: {},
        canvas: { width: 100, height: 50, dpi: 203 },
        layoutType: 0,
        elements: [],
        parameters: undefined,
        dataSources: undefined,
      };

      const template = fromTemplateDto(dto);

      // 空值应该转换为空对象
      expect(template.parameters).toEqual({});
      expect(template.dataSources).toEqual({});
    });

    it('应该处理JSON解析错误并提供默认值', () => {
      const dto: any = {
        version: '1.0',
        metadata: {},
        canvas: { width: 100, height: 50, dpi: 203 },
        layoutType: 0,
        elements: [],
        parameters: 'invalid json',
        dataSources: '{broken}',
      };

      // 默认应该提供空对象而不抛出错误
      const template = fromTemplateDto(dto);

      expect(template.parameters).toEqual({});
      expect(template.dataSources).toEqual({});
    });
  });

  // ==================== 往返转换测试 ====================

  describe('双向转换一致性', () => {
    it('应该保持往返转换后数据一致性', () => {
      const original: AtlTemplateWithParameters = {
        version: '1.0',
        metadata: { name: 'Test' },
        canvas: { width: 100, height: 50, dpi: 203 },
        layoutType: 0,
        dataSources: {
          apiData: {
            name: 'apiData',
            type: DataSourceType.Api,
            url: '/api/data',
          },
        },
        elements: [],
        parameters: {
          userId: {
            name: 'userId',
            type: ParameterType.Int,
            required: true,
            defaultValue: 0,
          },
        },
      };

      // 前端 -> DTO -> 前端
      const dto = toTemplateDto(original);
      const restored = fromTemplateDto(dto);

      // 验证parameters字段
      expect(restored.parameters?.userId).toEqual(original.parameters?.userId);

      // 验证dataSources字段
      expect(restored.dataSources.apiData).toEqual(original.dataSources.apiData);
    });
  });

  // ==================== 工具函数测试 ====================

  describe('isTemplateDto - 格式检测', () => {
    it('应该正确识别DTO格式', () => {
      const dto: AtlTemplateDto = {
        version: '1.0',
        metadata: {},
        canvas: { width: 100, height: 50, dpi: 203 },
        layoutType: 0,
        elements: [],
        parameters: '{"test":"value"}',
        dataSources: '{}',
      };

      expect(isTemplateDto(dto)).toBe(true);
    });

    it('应该正确识别前端对象格式', () => {
      const template: AtlTemplateWithParameters = {
        version: '1.0',
        metadata: {},
        canvas: { width: 100, height: 50, dpi: 203 },
        layoutType: 0,
        dataSources: {},
        elements: [],
        parameters: {},
      };

      expect(isTemplateDto(template)).toBe(false);
    });

    it('应该处理undefined/null字段', () => {
      const dto: AtlTemplateDto = {
        version: '1.0',
        metadata: {},
        canvas: { width: 100, height: 50, dpi: 203 },
        layoutType: 0,
        elements: [],
        parameters: undefined,
        dataSources: null as any,
      };

      // undefined和null应该被视为有效的DTO格式
      expect(isTemplateDto(dto)).toBe(true);
    });
  });

  // ==================== 批量转换测试 ====================

  describe('批量转换', () => {
    it('应该批量转换模板数组为DTO数组', () => {
      const templates: AtlTemplateWithParameters[] = [
        {
          version: '1.0',
          metadata: {},
          canvas: { width: 100, height: 50, dpi: 203 },
          layoutType: 0,
          dataSources: {},
          elements: [],
          parameters: {
            param1: {
              name: 'param1',
              type: ParameterType.String,
              required: true,
              defaultValue: '',
            },
          },
        },
        {
          version: '1.0',
          metadata: {},
          canvas: { width: 100, height: 50, dpi: 203 },
          layoutType: 0,
          dataSources: {},
          elements: [],
          parameters: {
            param2: {
              name: 'param2',
              type: ParameterType.Int,
              required: false,
            },
          },
        },
      ];

      const dtos = batchToTemplateDto(templates);

      expect(dtos).toHaveLength(2);
      expect(typeof dtos[0].parameters).toBe('string');
      expect(typeof dtos[1].parameters).toBe('string');
    });

    it('应该批量转换DTO数组为模板数组', () => {
      const dtos: AtlTemplateDto[] = [
        {
          version: '1.0',
          metadata: {},
          canvas: { width: 100, height: 50, dpi: 203 },
          layoutType: 0,
          elements: [],
          parameters: '{"param1":{"name":"param1","type":"string","required":true,"defaultValue":""}}',
        },
        {
          version: '1.0',
          metadata: {},
          canvas: { width: 100, height: 50, dpi: 203 },
          layoutType: 0,
          elements: [],
          parameters: '{"param2":{"name":"param2","type":"int","required":false}}',
        },
      ];

      const templates = batchFromTemplateDto(dtos);

      expect(templates).toHaveLength(2);
      expect(typeof templates[0].parameters).toBe('object');
      expect(typeof templates[1].parameters).toBe('object');
    });
  });

  // ==================== 错误处理测试 ====================

  describe('错误处理', () => {
    it('应该在严格模式下抛出ConversionError', () => {
      const invalidDto: any = {
        version: '1.0',
        metadata: {},
        canvas: { width: 100, height: 50, dpi: 203 },
        layoutType: 0,
        elements: [],
        parameters: 'invalid json',
      };

      // 禁用默认值应该抛出错误
      expect(() => {
        fromTemplateDto(invalidDto, { provideDefaults: false });
      }).toThrow(ConversionError);
    });

    it('ConversionError应该包含字段信息', () => {
      try {
        fromTemplateDto(
          {
            version: '1.0',
            metadata: {},
            canvas: { width: 100, height: 50, dpi: 203 },
            layoutType: 0,
            elements: [],
            parameters: '{invalid',
          },
          { provideDefaults: false }
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ConversionError);
        expect((error as ConversionError).field).toBe('parameters');
      }
    });
  });

  // ==================== 序列化选项测试 ====================

  describe('序列化选项', () => {
    it('应该支持pretty格式化输出', () => {
      const template: AtlTemplateWithParameters = {
        version: '1.0',
        metadata: {},
        canvas: { width: 100, height: 50, dpi: 203 },
        layoutType: 0,
        dataSources: {},
        elements: [],
        parameters: {
          test: {
            name: 'test',
            type: ParameterType.String,
            required: true,
            defaultValue: '',
          },
        },
      };

      const dto = toTemplateDto(template, { pretty: true });

      // 格式化输出应该包含换行符
      expect(dto.parameters).toContain('\n');
    });

    it('应该支持禁用验证', () => {
      const template: AtlTemplateWithParameters = {
        version: '1.0',
        metadata: {},
        canvas: { width: 100, height: 50, dpi: 203 },
        layoutType: 0,
        dataSources: {},
        elements: [],
        parameters: {
          // 无效参数(name不匹配key)
          wrongKey: {
            name: 'correctName',
            type: ParameterType.String,
            required: true,
            defaultValue: '',
          } as any,
        },
      };

      // 禁用验证应该不抛出错误
      expect(() => {
        toTemplateDto(template, { validate: false });
      }).not.toThrow();
    });
  });
});
