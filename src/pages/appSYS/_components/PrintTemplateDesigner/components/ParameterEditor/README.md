# ParameterEditor 组件

模板参数列表编辑器,提供参数的增删改查功能。

## 功能特性

- ✅ 支持所有参数类型的编辑 (String, Int, Long, Double, Bool, DateTime, Array)
- ✅ 实时验证参数配置
- ✅ 显示验证错误和警告
- ✅ 支持参数约束条件配置
- ✅ 支持必填项、默认值设置
- ✅ 参数名称唯一性检查
- ✅ 只读模式支持

## 使用示例

### 基础用法

```tsx
import { ParameterEditor } from '@/pages/appSYS/components/PrintTemplateDesigner/components/ParameterEditor';
import { useTemplateState } from '@/pages/appSYS/components/PrintTemplateDesigner/hooks/useTemplateState';

function MyComponent() {
  const {
    template,
    addParameter,
    updateParameter,
    removeParameter,
  } = useTemplateState();

  const parameters = (template as any).parameters || {};

  return (
    <ParameterEditor
      parameters={parameters}
      onAdd={addParameter}
      onUpdate={updateParameter}
      onRemove={removeParameter}
    />
  );
}
```

### 只读模式

```tsx
<ParameterEditor
  parameters={parameters}
  readonly={true}
/>
```

### 自定义样式

```tsx
<ParameterEditor
  parameters={parameters}
  onAdd={addParameter}
  onUpdate={updateParameter}
  onRemove={removeParameter}
  className="custom-parameter-editor"
  style={{ padding: 20 }}
/>
```

## API

### ParameterEditorProps

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| parameters | 参数定义字典 | `Record<string, TemplateParameter>` | - | ✅ |
| onAdd | 添加参数回调 | `(parameter: TemplateParameter) => void` | - | ❌ |
| onUpdate | 更新参数回调 | `(name: string, updates: Partial<TemplateParameter>) => void` | - | ❌ |
| onRemove | 删除参数回调 | `(name: string) => void` | - | ❌ |
| readonly | 是否只读模式 | `boolean` | `false` | ❌ |
| loading | 是否显示加载状态 | `boolean` | `false` | ❌ |
| className | 自定义类名 | `string` | - | ❌ |
| style | 自定义样式 | `React.CSSProperties` | - | ❌ |

## 参数类型支持

| 类型 | 说明 | 约束条件支持 |
|------|------|-------------|
| String | 字符串 | 最小/最大长度, 正则表达式 |
| Int | 整数 | 最小/最大值 |
| Long | 长整数 | 最小/最大值 |
| Double | 双精度 | 最小/最大值 |
| Bool | 布尔 | - |
| DateTime | 日期时间 | - |
| Array | 数组 | 最小/最大项数, 数组项类型 |

## 验证规则

组件使用 `validateParameter` 函数进行实时验证:

- ✅ 参数名称格式检查 (只能包含字母、数字、下划线,且不能以数字开头)
- ✅ 参数名称唯一性检查
- ✅ 必填参数必须有默认值
- ✅ 默认值类型必须与参数类型匹配
- ✅ 约束条件有效性检查

## 注意事项

1. **参数名称规则**: 参数名称必须符合标识符命名规范,只能包含字母、数字和下划线,且不能以数字开头
2. **必填参数**: 必填参数(`required: true`)必须提供默认值
3. **类型匹配**: 默认值的类型必须与参数类型匹配
4. **唯一性**: 参数名称在同一模板中必须唯一
5. **只读模式**: 在只读模式下,所有编辑和删除操作将被禁用

## 相关组件

- [ParameterMappingEditor](../ParameterMappingEditor/README.md) - 参数映射配置编辑器
- [DependencyGraphViewer](../DependencyGraphViewer/README.md) - 依赖关系图查看器

## 更新日志

### v1.0.0 (2024-10-18)
- ✅ 初始版本发布
- ✅ 支持所有参数类型的编辑
- ✅ 实时验证功能
- ✅ 约束条件配置
