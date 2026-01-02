# ATL模板DTO转换器使用示例

## 概述

DTO转换器用于处理前端模板对象与后端DTO格式之间的数据转换。主要功能：

- **前端 → 后端**: 将`parameters`和`dataSources`对象序列化为JSON字符串
- **后端 → 前端**: 将JSON字符串反序列化为对象
- **数据验证**: 确保转换过程中的数据完整性
- **错误处理**: 提供详细的错误信息和安全的默认值

---

## 基础使用

### 1. 保存模板时(前端 → 后端)

```typescript
import { toTemplateDto } from './utils/dtoConverters';
import type { AtlTemplateWithParameters } from './types';

// 前端模板对象
const template: AtlTemplateWithParameters = {
  version: '1.0',
  metadata: { name: '订单标签模板' },
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
      defaultValue: 1,
      description: '打印数量',
    },
  },
};

// 转换为DTO格式
const dto = toTemplateDto(template);

// 调用API保存
await SaveTemplateAsync({
  code: 'ORDER_LABEL_001',
  name: '订单标签',
  template: dto, // parameters和dataSources已序列化为JSON字符串
  targetLanguage: PrintTemplateType.ZPL,
});
```

**转换结果**:
```javascript
{
  version: '1.0',
  metadata: { name: '订单标签模板' },
  canvas: { width: 100, height: 50, dpi: 203 },
  layoutType: 0,
  // parameters和dataSources已序列化为JSON字符串
  parameters: '{"orderId":{"name":"orderId","type":"string","required":true,"defaultValue":"","description":"订单ID"},"quantity":{"name":"quantity","type":"int","required":false,"defaultValue":1,"description":"打印数量"}}',
  dataSources: '{"orderData":{"name":"orderData","type":2,"url":"/api/orders","method":"GET"}}',
  elements: []
}
```

---

### 2. 加载模板时(后端 → 前端)

```typescript
import { fromTemplateDto } from './utils/dtoConverters';

// 从后端加载模板
const response = await GetTemplateAsync({ id: templateId });
const dto = response.data;

// 转换为前端对象
const template = fromTemplateDto(dto);

// 现在可以直接使用parameters和dataSources对象
console.log('参数定义:', template.parameters);
console.log('数据源定义:', template.dataSources);

// 使用示例
if (template.parameters?.orderId) {
  const orderIdParam = template.parameters.orderId;
  console.log('订单ID参数:', orderIdParam.description);
  console.log('是否必填:', orderIdParam.required);
  console.log('默认值:', orderIdParam.defaultValue);
}
```

**转换结果**:
```javascript
{
  version: '1.0',
  metadata: { name: '订单标签模板' },
  canvas: { width: 100, height: 50, dpi: 203 },
  layoutType: 0,
  // parameters和dataSources已反序列化为对象
  parameters: {
    orderId: {
      name: 'orderId',
      type: 'string',
      required: true,
      defaultValue: '',
      description: '订单ID'
    },
    quantity: {
      name: 'quantity',
      type: 'int',
      required: false,
      defaultValue: 1,
      description: '打印数量'
    }
  },
  dataSources: {
    orderData: {
      name: 'orderData',
      type: 2,
      url: '/api/orders',
      method: 'GET'
    }
  },
  elements: []
}
```

---

## 高级用法

### 1. 格式化输出(调试)

```typescript
import { toTemplateDto } from './utils/dtoConverters';

// 启用pretty格式化
const dto = toTemplateDto(template, { pretty: true });

// 输出美化的JSON字符串
console.log('Parameters JSON:');
console.log(dto.parameters);
```

**输出结果**:
```json
{
  "orderId": {
    "name": "orderId",
    "type": "string",
    "required": true,
    "defaultValue": "",
    "description": "订单ID"
  },
  "quantity": {
    "name": "quantity",
    "type": "int",
    "required": false,
    "defaultValue": 1,
    "description": "打印数量"
  }
}
```

---

### 2. 批量转换

```typescript
import { batchToTemplateDto, batchFromTemplateDto } from './utils/dtoConverters';

// 批量保存多个模板
const templates: AtlTemplateWithParameters[] = [template1, template2, template3];
const dtos = batchToTemplateDto(templates);

await Promise.all(
  dtos.map((dto, index) =>
    SaveTemplateAsync({
      code: `TEMPLATE_${index}`,
      name: `模板${index}`,
      template: dto,
      targetLanguage: PrintTemplateType.ZPL,
    })
  )
);

// 批量加载多个模板
const responses = await GetTemplateListAsync();
const loadedTemplates = batchFromTemplateDto(responses.data);

console.log('成功加载模板数量:', loadedTemplates.length);
```

---

### 3. 错误处理

```typescript
import { fromTemplateDto, ConversionError } from './utils/dtoConverters';

try {
  // 严格模式:禁用默认值,JSON解析失败时抛出错误
  const template = fromTemplateDto(dto, {
    provideDefaults: false,
    validate: true,
  });
} catch (error) {
  if (error instanceof ConversionError) {
    console.error('转换失败:', error.message);
    console.error('字段名称:', error.field);
    console.error('原始错误:', error.cause);
  }
}
```

---

### 4. 格式检测

```typescript
import { isTemplateDto } from './utils/dtoConverters';

// 检查对象是否为DTO格式
if (isTemplateDto(data)) {
  console.log('数据为DTO格式,需要反序列化');
  const template = fromTemplateDto(data);
} else {
  console.log('数据已是前端对象格式,无需转换');
  const template = data as AtlTemplateWithParameters;
}
```

---

## 实际应用场景

### 场景1: 模板设计器保存逻辑

```typescript
// src/pages/appSYS/components/PrintTemplateDesigner/hooks/useTemplateSave.ts
import { toTemplateDto } from '../utils/dtoConverters';

export function useTemplateSave() {
  const handleSave = async (template: AtlTemplateWithParameters) => {
    try {
      // 转换为DTO格式
      const dto = toTemplateDto(template);

      // 调用API保存
      const response = await SaveTemplateAsync({
        code: template.metadata.code,
        name: template.metadata.name,
        template: dto,
        targetLanguage: PrintTemplateType.ZPL,
        autoConvertToPrinterCode: true,
      });

      if (response.success) {
        message.success('模板保存成功');
      }
    } catch (error) {
      console.error('保存失败:', error);
      message.error('模板保存失败');
    }
  };

  return { handleSave };
}
```

---

### 场景2: 模板列表加载逻辑

```typescript
// src/pages/appSYS/components/PrintTemplateDesigner/hooks/useTemplateList.ts
import { fromTemplateDto } from '../utils/dtoConverters';

export function useTemplateList() {
  const { data, loading } = useRequest(async () => {
    const response = await GetTemplateListAsync();

    // 批量转换DTO为前端对象
    const templates = response.data.map((dto) => fromTemplateDto(dto));

    return templates;
  });

  return { templates: data, loading };
}
```

---

### 场景3: 模板详情加载逻辑

```typescript
// src/pages/appSYS/components/PrintTemplateDesigner/hooks/useTemplateDetail.ts
import { fromTemplateDto } from '../utils/dtoConverters';

export function useTemplateDetail(templateId: string) {
  const { data, loading } = useRequest(async () => {
    const response = await GetTemplateAsync({ id: templateId });

    // 转换DTO为前端对象
    const template = fromTemplateDto(response.data, {
      verbose: true, // 启用详细日志
      validate: true, // 验证数据完整性
    });

    return template;
  });

  return { template: data, loading };
}
```

---

## 数据流向图

```
┌─────────────────────────────────────────────────────────────┐
│                        前端应用                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  AtlTemplateWithParameters (对象格式)                       │
│  ├─ parameters: Record<string, TemplateParameter>          │
│  └─ dataSources: Record<string, AtlDataSource>             │
│                                                             │
│                          ↓ toTemplateDto()                  │
│                                                             │
│  AtlTemplateDto (DTO格式)                                   │
│  ├─ parameters: string (JSON)                              │
│  └─ dataSources: string (JSON)                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                             ↓ HTTP POST
┌─────────────────────────────────────────────────────────────┐
│                        后端API                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  接收并存储DTO格式数据                                       │
│  ├─ parameters: string (存储到数据库)                       │
│  └─ dataSources: string (存储到数据库)                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                             ↓ HTTP GET
┌─────────────────────────────────────────────────────────────┐
│                        前端应用                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  AtlTemplateDto (DTO格式)                                   │
│  ├─ parameters: string (JSON)                              │
│  └─ dataSources: string (JSON)                             │
│                                                             │
│                          ↓ fromTemplateDto()                │
│                                                             │
│  AtlTemplateWithParameters (对象格式)                       │
│  ├─ parameters: Record<string, TemplateParameter>          │
│  └─ dataSources: Record<string, AtlDataSource>             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 注意事项

1. **数据不可变性**: 转换函数使用深拷贝,不会修改原始对象

2. **错误恢复**: 默认配置下,JSON解析失败会返回空对象而不抛出错误

3. **日志记录**: 所有转换操作都会记录详细日志,便于调试

4. **数据验证**: 转换过程会验证参数名称一致性和必填字段

5. **向后兼容**: 转换器会处理非字符串类型的参数(已解析的对象),保持向后兼容

---

## API参考

### `toTemplateDto(template, options?)`
将前端模板对象转换为DTO格式

**参数**:
- `template`: AtlTemplateWithParameters - 前端模板对象
- `options?`: SerializationOptions - 序列化选项
  - `pretty?: boolean` - 是否格式化输出(默认false)
  - `validate?: boolean` - 是否验证数据(默认true)
  - `strict?: boolean` - 是否严格模式(默认false)

**返回**: AtlTemplateDto

---

### `fromTemplateDto(dto, options?)`
将DTO格式转换为前端模板对象

**参数**:
- `dto`: any - DTO对象
- `options?`: DeserializationOptions - 反序列化选项
  - `validate?: boolean` - 是否验证数据(默认true)
  - `provideDefaults?: boolean` - 是否提供默认值(默认true)
  - `verbose?: boolean` - 是否详细日志(默认true)

**返回**: AtlTemplateWithParameters

---

### `isTemplateDto(obj)`
检查对象是否为DTO格式

**参数**:
- `obj`: any - 待检查对象

**返回**: boolean

---

### `batchToTemplateDto(templates, options?)`
批量转换模板数组为DTO数组

**参数**:
- `templates`: AtlTemplateWithParameters[] - 模板数组
- `options?`: SerializationOptions - 序列化选项

**返回**: AtlTemplateDto[]

---

### `batchFromTemplateDto(dtos, options?)`
批量转换DTO数组为模板数组

**参数**:
- `dtos`: any[] - DTO数组
- `options?`: DeserializationOptions - 反序列化选项

**返回**: AtlTemplateWithParameters[]

---

## 总结

DTO转换器提供了一套完整的前后端数据转换解决方案,确保:

✅ **类型安全**: 完整的TypeScript类型定义
✅ **数据完整性**: 自动验证和错误处理
✅ **易于调试**: 详细的日志记录
✅ **向后兼容**: 处理多种数据格式
✅ **生产就绪**: 经过完整的单元测试验证
