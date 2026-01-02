# StandardFormDialog - 标准化表单对话框组件

这是一个标准化的表单对话框组件，基于Formily封装，提供统一的表单创建、编辑和提交体验，旨在减少FormDialog组件的重复代码。

## 功能特性

- ✅ **统一的表单结构**: 基于Formily的标准化表单布局
- ✅ **自动数据加载**: 编辑模式下自动加载数据
- ✅ **智能提交逻辑**: 自动判断新建或编辑模式
- ✅ **标准化错误处理**: 统一的错误提示和处理
- ✅ **灵活的Schema支持**: 支持多种Schema定义方式
- ✅ **高阶组件支持**: 提供便捷的HOC包装器
- ✅ **字段创建工具**: 内置常用字段创建函数

## 基本用法

### 1. 直接使用StandardFormDialog

```tsx
import React from 'react';
import { StandardFormDialog, FieldCreators, createGridSchema } from '@/components/StandardFormDialog';
import { WarehouseGetAsync, WarehouseCreateAsync, WarehouseUpdateAsync } from '@/services/common/Warehouse';

const WarehouseFormDialog = (props) => {
  const businessFields = {
    code: FieldCreators.input('库房编码', true),
    name: FieldCreators.input('库房名称', true),
    address: FieldCreators.textarea('库房地址'),
    contact: FieldCreators.input('联系人'),
    tel: FieldCreators.input('联系电话'),
    memo: FieldCreators.textarea('备注信息')
  };

  return (
    <StandardFormDialog
      formId="Common.Warehouses"
      formSchema={{
        form: {
          labelCol: 6,
          wrapperCol: 18,
          labelWidth: "120px",
          feedbackLayout: "none"
        },
        schema: {
          type: "object",
          properties: createGridSchema(businessFields)
        }
      }}
      apiConfig={{
        get: WarehouseGetAsync,
        create: WarehouseCreateAsync,
        update: WarehouseUpdateAsync
      }}
      {...props}
    />
  );
};
```

### 2. 使用HOC包装器（推荐）

```tsx
import React from 'react';
import { withStandardForm, FieldCreators } from '@/components/StandardFormDialog';
import { WarehouseGetAsync, WarehouseCreateAsync, WarehouseUpdateAsync } from '@/services/common/Warehouse';

const WarehouseFormDialog = withStandardForm({
  formId: 'Common.Warehouses',
  businessFields: {
    code: FieldCreators.input('库房编码', true),
    name: FieldCreators.input('库房名称', true),
    address: FieldCreators.textarea('库房地址'),
    contact: FieldCreators.input('联系人'),
    tel: FieldCreators.input('联系电话'),
    memo: FieldCreators.textarea('备注信息')
  },
  apiConfig: {
    get: WarehouseGetAsync,
    create: WarehouseCreateAsync,
    update: WarehouseUpdateAsync
  },
  defaultDialogConfig: {
    title: '库房信息',
    width: 800
  }
});

export default WarehouseFormDialog;
```

### 3. 快速创建简单表单

```tsx
import { createQuickForm, FieldCreators } from '@/components/StandardFormDialog';

const QuickWarehouseForm = createQuickForm(
  'Common.Warehouses',
  {
    code: FieldCreators.input('库房编码', true),
    name: FieldCreators.input('库房名称', true),
    memo: FieldCreators.textarea('备注')
  },
  {
    get: WarehouseGetAsync,
    create: WarehouseCreateAsync,
    update: WarehouseUpdateAsync
  },
  {
    title: '库房信息',
    width: 600
  }
);
```

## 字段创建工具

### FieldCreators 快捷函数

```tsx
import { FieldCreators } from '@/components/StandardFormDialog';

const businessFields = {
  // 基础输入框
  code: FieldCreators.input('编码', true), // 必填
  name: FieldCreators.input('名称', false), // 非必填
  
  // 文本域
  description: FieldCreators.textarea('描述', 3, 2), // 3行，跨2列
  
  // 数字输入
  quantity: FieldCreators.number('数量', true),
  
  // 选择框
  status: FieldCreators.select('状态', [
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 }
  ], true),
  
  // 日期
  date: FieldCreators.date('日期'),
  
  // 日期时间
  datetime: FieldCreators.datetime('创建时间')
};
```

### 自定义字段创建

```tsx
import { createFormField, createSelectField } from '@/components/StandardFormDialog';

const customFields = {
  // 自定义输入框
  customInput: createFormField('自定义字段', 'Input', {
    required: true,
    placeholder: '请输入自定义内容',
    maxLength: 100,
    gridSpan: 1
  }),
  
  // 自定义选择框
  customSelect: createSelectField('选择字段', [
    { label: '选项1', value: 'option1' },
    { label: '选项2', value: 'option2' }
  ], {
    required: true,
    mode: 'multiple' // 多选
  })
};
```

## 高级用法

### 1. 自定义初始化逻辑

```tsx
const FormDialogWithCustomInit = withStandardForm({
  formId: 'Custom.Form',
  businessFields,
  apiConfig: {
    get: CustomGetAsync,
    create: CustomCreateAsync,
    update: CustomUpdateAsync
  },
  defaultDialogConfig: {
    customInitializer: async (form, entityId) => {
      // 自定义数据加载逻辑
      const data = await CustomGetAsync({ id: entityId });
      // 可以对数据进行预处理
      const processedData = {
        ...data,
        // 复合字段处理示例
        unitInfo: {
          value: data.unitId,
          label: data.unitName
        }
      };
      form.setInitialValues(processedData);
    }
  }
});
```

### 2. 自定义提交逻辑

```tsx
const FormDialogWithCustomSubmit = withStandardForm({
  formId: 'Custom.Form',
  businessFields,
  apiConfig: {
    create: CustomCreateAsync,
    update: CustomUpdateAsync
  },
  defaultDialogConfig: {
    customSubmitHandler: async (values, isEdit) => {
      // 数据预处理
      const processedValues = {
        ...values,
        // 复合字段处理
        unitId: values.unitInfo?.value,
        unitName: values.unitInfo?.label
      };
      
      if (isEdit) {
        await CustomUpdateAsync({ id: values.id }, processedValues);
        message.success('更新成功');
      } else {
        await CustomCreateAsync(processedValues);
        message.success('创建成功');
      }
    }
  }
});
```

### 3. 复杂Schema定义

```tsx
import { useStandardFormSchema, createGridSchema } from '@/components/StandardFormDialog';

const ComplexFormDialog = (props) => {
  const businessFields = {
    basicInfo: {
      type: 'void',
      title: '基础信息',
      'x-component': 'FormGrid',
      'x-component-props': { maxColumns: 2, strictAutoFit: true },
      properties: {
        code: FieldCreators.input('编码', true),
        name: FieldCreators.input('名称', true)
      }
    },
    detailInfo: {
      type: 'void',
      title: '详细信息',
      'x-component': 'FormGrid',
      'x-component-props': { maxColumns: 1 },
      properties: {
        description: FieldCreators.textarea('详细描述', 4, 1)
      }
    }
  };

  const schemaConfig = useStandardFormSchema('Complex.Form', businessFields);

  return (
    <StandardFormDialog
      schemaConfig={schemaConfig}
      apiConfig={apiConfig}
      {...props}
    />
  );
};
```

## API 参考

### StandardFormDialogProps

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| schemaConfig | FormSchemaConfig | ❌ | - | Schema配置对象 |
| formId | string | ❌ | - | 直接传入的表单ID |
| formSchema | object | ❌ | - | 直接传入的Schema对象 |
| apiConfig | FormApiConfig | ✅ | - | API配置 |
| width | number | ❌ | 800 | 对话框宽度 |
| entityId | string/number | ❌ | - | 实体ID（编辑模式） |
| title | string | ❌ | '表单' | 对话框标题 |
| buttonProps | ButtonProps | ❌ | - | 按钮属性 |
| onAfterSubmit | function | ❌ | - | 提交成功回调 |
| portalIdPrefix | string | ❌ | 'Standard' | Portal ID前缀 |
| customInitializer | function | ❌ | - | 自定义初始化函数 |
| customSubmitHandler | function | ❌ | - | 自定义提交函数 |

### FormApiConfig

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| get | function | ❌ | 获取单条记录的API |
| create | function | ✅ | 创建记录的API |
| update | function | ✅ | 更新记录的API |

### FieldCreators 方法

| 方法 | 参数 | 说明 |
|------|------|------|
| input | (title, required?, gridSpan?) | 创建输入框字段 |
| textarea | (title, rows?, gridSpan?) | 创建文本域字段 |
| number | (title, required?, gridSpan?) | 创建数字输入字段 |
| select | (title, options, required?) | 创建选择框字段 |
| date | (title, required?, gridSpan?) | 创建日期字段 |
| datetime | (title, required?, gridSpan?) | 创建日期时间字段 |

## 迁移指南

### 从现有FormDialog迁移

1. **提取业务字段**：
   ```tsx
   // 原Schema
   const originalSchema = {
     properties: {
       grid: {
         properties: {
           code: { /* ... */ },
           name: { /* ... */ }
         }
       }
     }
   };

   // 转换为业务字段
   const businessFields = {
     code: FieldCreators.input('库房编码', true),
     name: FieldCreators.input('库房名称', true)
   };
   ```

2. **配置API**：
   ```tsx
   const apiConfig = {
     get: OriginalGetAsync,
     create: OriginalCreateAsync,
     update: OriginalUpdateAsync
   };
   ```

3. **使用HOC包装**：
   ```tsx
   const NewFormDialog = withStandardForm({
     formId: 'Original.FormId',
     businessFields,
     apiConfig
   });
   ```

## 预期收益

- **代码减少**: 每个FormDialog可减少50-80行重复代码
- **开发提速**: 表单创建时间从1-2小时减少到15-30分钟
- **维护简化**: 统一的组件结构，便于批量修改
- **类型安全**: 完整的TypeScript支持，减少运行时错误