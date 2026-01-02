# 问题执行对话框更新指南

本文档说明如何为所有执行操作对话框添加附件上传和备注支持。

## 已创建的通用组件

### AttachmentUpload 组件
位置: `src/pages/appPdm/ProjectManagement/IssueList/_components/AttachmentUpload.tsx`

功能:
- 拖拽或点击上传附件
- 支持多文件上传(默认最多5个)
- 自动返回附件ID列表
- 与 Formily 表单集成

## 需要更新的对话框列表

1. `AssignDialog.tsx` - 指派问题
2. `ConfirmReceiveDialog.tsx` - 确认接收
3. `StartProcessingDialog.tsx` - 开始处理
4. `ResolveDialog.tsx` - 解决问题
5. `CloseDialog.tsx` - 关闭问题
6. `ActivateDialog.tsx` - 激活问题
7. `AddCommentDialog.tsx` - 添加备注

## 更新步骤

### 1. 导入 AttachmentUpload 组件

```typescript
import AttachmentUpload from './AttachmentUpload';
```

### 2. 在 SchemaField 中注册组件

```typescript
const SchemaField = createSchemaField({
  components: {
    FormLayout,
    Input,
    Select,
    AttachmentUpload, // 添加这一行
  },
});
```

### 3. 在 Schema 中添加附件字段

在现有的 schema properties 中添加:

```typescript
attachmentIds: {
  type: 'array',
  title: '附件',
  'x-decorator': 'FormItem',
  'x-component': 'AttachmentUpload',
  'x-component-props': {
    maxCount: 5,
  },
},
```

### 4. 确保 remark 字段存在

所有对话框都应该包含备注字段:

```typescript
remark: {
  type: 'string',
  title: '备注',
  'x-decorator': 'FormItem',
  'x-component': 'Input.TextArea',
  'x-component-props': {
    placeholder: '请输入备注说明',
    rows: 4,
    maxLength: 500,
    showCount: true,
  },
},
```

## 各对话框特殊处理

### AssignDialog.tsx
- 已有 `handlerCode` 字段(必填)
- 添加 `handlerName` 字段(必填)
- 添加 `remark` 和 `attachmentIds`

更新后的 schema:
```typescript
const schema = {
  type: 'object',
  properties: {
    handlerCode: {
      type: 'string',
      title: '处理人编码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入处理人编码',
      },
    },
    handlerName: {
      type: 'string',
      title: '处理人姓名',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入处理人姓名',
      },
    },
    remark: {
      type: 'string',
      title: '备注',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        placeholder: '请输入备注说明',
        rows: 4,
        maxLength: 500,
        showCount: true,
      },
    },
    attachmentIds: {
      type: 'array',
      title: '附件',
      'x-decorator': 'FormItem',
      'x-component': 'AttachmentUpload',
      'x-component-props': {
        maxCount: 5,
      },
    },
  },
};
```

### ConfirmReceiveDialog.tsx
- 只需要 `remark` 和 `attachmentIds`
- 最简单的对话框

### StartProcessingDialog.tsx
- 只需要 `remark` 和 `attachmentIds`

### ResolveDialog.tsx
- 已有 `resolution` 字段(必填)
- 添加 `requiresApproval` 字段(布尔类型)
- 添加 `remark` 和 `attachmentIds`

更新后的 schema:
```typescript
const schema = {
  type: 'object',
  properties: {
    resolution: {
      type: 'string',
      title: '解决方案',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        placeholder: '请详细描述解决方案',
        rows: 6,
        maxLength: 1000,
        showCount: true,
      },
    },
    requiresApproval: {
      type: 'boolean',
      title: '需要审批',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        checkedChildren: '是',
        unCheckedChildren: '否',
      },
      default: false,
    },
    remark: {
      type: 'string',
      title: '备注',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        placeholder: '请输入备注说明',
        rows: 4,
        maxLength: 500,
        showCount: true,
      },
    },
    attachmentIds: {
      type: 'array',
      title: '附件',
      'x-decorator': 'FormItem',
      'x-component': 'AttachmentUpload',
      'x-component-props': {
        maxCount: 5,
      },
    },
  },
};
```

记得在 SchemaField 中添加 Switch 组件:
```typescript
import { Form, Input, Select, Switch } from '@formily/antd-v5';

const SchemaField = createSchemaField({
  components: {
    FormLayout,
    Input,
    Select,
    Switch,
    AttachmentUpload,
  },
});
```

### CloseDialog.tsx
- 只需要 `remark` 和 `attachmentIds`

### ActivateDialog.tsx
- 已有 `activationReason` 字段(必填)
- 添加 `remark` 和 `attachmentIds`

更新后的 schema:
```typescript
const schema = {
  type: 'object',
  properties: {
    activationReason: {
      type: 'string',
      title: '激活原因',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        placeholder: '请说明重新激活此问题的原因',
        rows: 6,
        maxLength: 500,
        showCount: true,
      },
    },
    remark: {
      type: 'string',
      title: '备注',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        placeholder: '请输入备注说明',
        rows: 4,
        maxLength: 500,
        showCount: true,
      },
    },
    attachmentIds: {
      type: 'array',
      title: '附件',
      'x-decorator': 'FormItem',
      'x-component': 'AttachmentUpload',
      'x-component-props': {
        maxCount: 5,
      },
    },
  },
};
```

### AddCommentDialog.tsx
- 已有的备注对话框可能已经有附件支持
- 检查是否需要更新为统一的 AttachmentUpload 组件

## API 调用更新

所有对话框的 `forConfirm` 方法需要传递完整的 DTO:

```typescript
.forConfirm(async (payload, next) => {
  try {
    const dto = {
      id: issueId,
      ...payload.values, // 包含 remark 和 attachmentIds
    };

    // await ApiMethodAsync(dto);
    console.log('执行操作参数：', dto);
    message.warning('API尚未实现，请等待后端更新');

    // message.success('操作成功');
    // onSuccess?.();
    // await next();
  } catch (error) {
    message.error('操作失败');
    throw error;
  }
})
```

## 测试清单

更新完成后,测试以下内容:

- [ ] 所有对话框都能正常打开
- [ ] 备注字段可以正常输入
- [ ] 附件上传组件显示正常
- [ ] 可以拖拽上传文件
- [ ] 可以点击上传文件
- [ ] 上传成功后显示文件列表
- [ ] 可以删除已上传的文件
- [ ] 表单验证正常工作(必填字段)
- [ ] 提交时包含所有字段(remark 和 attachmentIds)

## 注意事项

1. **API 调用**: 当前 API 调用被注释,等待后端实现后取消注释
2. **权限控制**: 保持原有的权限控制逻辑不变
3. **样式一致性**: 确保所有对话框的样式保持一致
4. **错误处理**: 保持原有的错误处理逻辑
5. **国际化**: 如果项目使用国际化,需要添加相应的翻译 key
