# StandardFormDialog 使用指南

StandardFormDialog 组件提供了两种使用方式，既支持传统的 `businessFields` 内部构建 schema，也支持外部 `schema.ts` 文件导入。

## 🎯 使用方式对比

### 方式一：内部构建Schema（businessFields）
适用于简单表单，快速开发场景。

```tsx
import { withStandardForm, FieldCreators } from '@/components/StandardFormDialog';

const FormDialog = withStandardForm({
  formId: 'Common.Materials',
  businessFields: {
    code: FieldCreators.input('物料编码', true, {
      placeholder: '请输入物料编码'
    }),
    name: FieldCreators.input('物料名称', true, {
      placeholder: '请输入物料名称'
    }),
    type: FieldCreators.select('物料类型', false, {
      placeholder: '请选择物料类型',
      options: [
        { label: '原材料', value: 'raw' },
        { label: '成品', value: 'finished' }
      ]
    }),
    enabled: FieldCreators.switch('是否启用', true),
    description: FieldCreators.textarea('描述', false, {
      rows: 3,
      gridSpan: 2
    })
  },
  apiConfig: {
    get: MaterialGetAsync,
    create: MaterialCreateAsync,
    update: MaterialUpdateAsync
  },
  defaultDialogConfig: {
    width: 800
  }
});
```

### 方式二：外部Schema文件（externalSchema）
适用于复杂表单，需要高级Formily功能的场景。

**schema.ts 文件：**
```typescript
// schema.ts
export const form = {
  labelCol: 6,
  wrapperCol: 16,
  colon: false,
  layout: 'horizontal',
  grid: {
    strictAutoFit: true,
    minColumns: 1,
    maxColumns: 2
  }
};

export const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      'x-component': 'Input',
      'x-display': 'hidden'
    },
    code: {
      type: 'string',
      title: '物料编码',
      required: true,
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入物料编码'
      }
    },
    name: {
      type: 'string',
      title: '物料名称',
      required: true,
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入物料名称'
      }
    },
    // 条件显示字段
    hasSpec: {
      type: 'boolean',
      title: '包含规格',
      'x-component': 'Switch',
      default: false
    },
    spec: {
      type: 'string',
      title: '规格',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入规格'
      },
      // 联动逻辑：仅当hasSpec为true时显示
      'x-reactions': {
        dependencies: ['hasSpec'],
        fulfill: {
          state: {
            visible: '{{$deps[0] === true}}'
          }
        }
      }
    }
  }
};
```

**组件使用：**
```tsx
import { withStandardForm } from '@/components/StandardFormDialog';
import { form, schema } from './schema';

const FormDialog = withStandardForm({
  formId: 'Common.Materials',
  externalSchema: {
    form,
    schema
  },
  apiConfig: {
    get: MaterialGetAsync,
    create: MaterialCreateAsync,
    update: MaterialUpdateAsync
  },
  defaultDialogConfig: {
    width: 800
  }
});
```

## 🔧 FieldCreators 工具函数

内部构建方式提供了丰富的字段创建工具：

```typescript
// 基础字段
FieldCreators.input(title, required, props)     // 输入框
FieldCreators.number(title, required, props)    // 数字输入
FieldCreators.textarea(title, required, props)  // 文本域
FieldCreators.select(title, required, props)    // 选择框
FieldCreators.date(title, required, props)      // 日期选择
FieldCreators.datetime(title, required, props)  // 日期时间选择
FieldCreators.switch(title, defaultValue, props) // 开关
FieldCreators.hidden(defaultValue)              // 隐藏字段

// 高级字段创建
createSelectField(title, options, config)       // 选择字段
createCascaderField(title, options, config)     // 级联选择
```

### FieldCreators 使用示例

```typescript
businessFields: {
  // 基础输入
  code: FieldCreators.input('编码', true, {
    placeholder: '请输入编码',
    maxLength: 50
  }),
  
  // 数字输入
  priority: FieldCreators.number('优先级', false, {
    min: 0,
    max: 100,
    precision: 0
  }),
  
  // 选择框
  status: FieldCreators.select('状态', true, {
    placeholder: '请选择状态',
    options: [
      { label: '启用', value: 'active' },
      { label: '禁用', value: 'inactive' }
    ]
  }),
  
  // 日期时间
  startTime: FieldCreators.datetime('开始时间', false, {
    format: 'YYYY-MM-DD HH:mm:ss',
    showTime: true
  }),
  
  // 开关
  isEnabled: FieldCreators.switch('是否启用', true),
  
  // 文本域（占两列）
  description: FieldCreators.textarea('描述', false, {
    rows: 4,
    maxLength: 500,
    showCount: true,
    gridSpan: 2
  })
}
```

## 🚀 高级功能

### 1. 自定义处理器
```typescript
const FormDialog = withStandardForm({
  formId: 'Common.Materials',
  // ... 其他配置
  customHandlers: {
    // 自定义数据初始化
    initializer: async (form, entityId) => {
      const data = await CustomGetAsync(entityId);
      // 自定义数据处理逻辑
      form.setInitialValues(processedData);
    },
    
    // 自定义提交处理
    submitHandler: async (values, isEdit) => {
      // 自定义提交逻辑
      const processedValues = customProcessing(values);
      if (isEdit) {
        return await CustomUpdateAsync(values.id, processedValues);
      } else {
        return await CustomCreateAsync(processedValues);
      }
    }
  }
});
```

### 2. 配置验证
组件会自动验证配置的完整性：

```typescript
// ❌ 错误：既没有 businessFields 也没有 externalSchema
const FormDialog = withStandardForm({
  formId: 'Test.Form',
  apiConfig: { ... }
}); // 抛出错误

// ✅ 正确：使用 businessFields
const FormDialog = withStandardForm({
  formId: 'Test.Form',
  businessFields: { ... },
  apiConfig: { ... }
});

// ✅ 正确：使用 externalSchema
const FormDialog = withStandardForm({
  formId: 'Test.Form',
  externalSchema: { form, schema },
  apiConfig: { ... }
});
```

### 3. 调试支持
组件会在控制台输出使用的schema方式：

```
✅ withStandardForm: Common.Materials 使用外部Schema配置
✅ withStandardForm: Common.Warehouses 使用内部构建Schema
```

## 📋 最佳实践

### 何时使用内部构建（businessFields）
- ✅ 简单表单（< 10个字段）
- ✅ 快速原型开发
- ✅ 标准字段类型
- ✅ 无复杂联动逻辑

### 何时使用外部Schema（externalSchema）
- ✅ 复杂表单（≥ 10个字段）
- ✅ 需要条件显示/隐藏
- ✅ 字段联动逻辑
- ✅ 自定义校验规则
- ✅ 复杂布局需求
- ✅ 需要复用Schema配置

### 迁移建议
1. **新项目**：优先使用外部Schema方式
2. **现有项目**：可以逐步迁移复杂表单到外部Schema
3. **混合使用**：两种方式可以在同一项目中并存

## 🔄 向后兼容性

重构完全向后兼容，现有使用 `businessFields` 的代码无需任何修改，可以继续正常工作。

```typescript
// 这些现有代码无需修改，继续正常工作
const ExistingFormDialog = withStandardForm({
  formId: 'Common.Existing',
  businessFields: {
    name: FieldCreators.input('名称', true)
  },
  apiConfig: { ... }
});
```