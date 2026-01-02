# ParameterMappingEditor 组件

数据源参数映射配置编辑器,支持从模板参数、其他数据源字段引用。

## 功能特性

- ✅ 支持多种引用类型 (模板参数、数据源字段、Scriban表达式、静态值)
- ✅ 智能提示可用的参数和字段
- ✅ 实时验证映射配置
- ✅ 显示验证错误和警告
- ✅ 支持引用路径自动补全
- ✅ 只读模式支持

## 使用示例

### 基础用法

```tsx
import { ParameterMappingEditor } from '@/pages/appSYS/components/PrintTemplateDesigner/components/ParameterMappingEditor';
import { useTemplateState } from '@/pages/appSYS/components/PrintTemplateDesigner/hooks/useTemplateState';

function MyComponent() {
  const {
    template,
    updateDataSourceParameterMapping,
  } = useTemplateState();

  const dataSource = template.dataSources?.['myDataSource'];
  const parameters = (template as any).parameters || {};

  return (
    <ParameterMappingEditor
      dataSourceId="myDataSource"
      dataSourceParameters={['userId', 'startDate', 'departmentId']}
      parameterMappings={dataSource?.parameterMappings || {}}
      availableTemplateParameters={Object.keys(parameters)}
      availableDataSources={[
        { name: 'baseData', fields: ['id', 'name', 'type'] },
        { name: 'department', fields: ['id', 'name'] },
      ]}
      onUpdate={(paramName, mapping) => {
        updateDataSourceParameterMapping('myDataSource', paramName, mapping);
      }}
    />
  );
}
```

### 只读模式

```tsx
<ParameterMappingEditor
  dataSourceId="myDataSource"
  dataSourceParameters={['userId', 'startDate']}
  parameterMappings={mappings}
  availableTemplateParameters={templateParams}
  availableDataSources={dataSources}
  readonly={true}
/>
```

## API

### ParameterMappingEditorProps

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| dataSourceId | 数据源ID(名称) | `string` | - | ✅ |
| dataSourceParameters | 数据源参数名称列表 | `string[]` | - | ✅ |
| parameterMappings | 当前参数映射配置 | `Record<string, string>` | - | ✅ |
| availableTemplateParameters | 可用的模板参数列表 | `string[]` | - | ✅ |
| availableDataSources | 可用的数据源列表 | `Array<{name: string; fields?: string[]}>` | - | ✅ |
| onUpdate | 更新参数映射回调 | `(parameterName: string, mapping: ParameterMapping) => void` | - | ❌ |
| onRemove | 删除参数映射回调 | `(parameterName: string) => void` | - | ❌ |
| readonly | 是否只读模式 | `boolean` | `false` | ❌ |
| loading | 是否显示加载状态 | `boolean` | `false` | ❌ |
| className | 自定义类名 | `string` | - | ❌ |
| style | 自定义样式 | `React.CSSProperties` | - | ❌ |

## 引用类型说明

### 1. 模板参数引用

引用模板级别的参数值。

**语法**: `$parameters.{参数名}`

**示例**:
```
$parameters.userId
$parameters.startDate
$parameters.orderType
```

### 2. 数据源字段引用

引用其他数据源返回的字段值。

**语法**: `$dataSources.{数据源名}.{字段路径}`

**示例**:
```
$dataSources.baseData.id
$dataSources.user.profile.name
$dataSources.department.parentId
```

### 3. Scriban表达式

使用 Scriban 模板语法编写复杂表达式。

**语法**: `{{ expression }}`

**示例**:
```
{{ $parameters.userId * 10 }}
{{ $parameters.startDate | date.format "%Y-%m-%d" }}
{{ $dataSources.baseData.id + 1000 }}
```

### 4. 静态值

直接使用静态值,不进行引用解析。

**示例**:
```
123
"固定字符串"
true
```

## 验证规则

组件会实时验证参数映射配置:

- ✅ 引用表达式格式检查
- ✅ 模板参数存在性检查
- ✅ 数据源存在性检查
- ✅ 字段路径有效性检查
- ✅ Scriban表达式语法检查(基础)

## 智能提示

组件提供智能提示功能:

- **模板参数**: 自动列出所有可用的模板参数
- **数据源字段**: 自动列出所有可用的数据源及其字段
- **表达式模板**: 提供常用的表达式模板
- **静态值**: 提供常用的静态值示例

## 注意事项

1. **引用格式**: 必须严格遵循引用语法格式,否则验证将失败
2. **字段路径**: 数据源字段引用支持嵌套路径,使用 `.` 分隔
3. **表达式语法**: Scriban表达式的完整语法验证需要在运行时进行
4. **循环依赖**: 避免创建循环引用,系统会在依赖图中检测
5. **只读模式**: 在只读模式下,所有编辑和删除操作将被禁用

## 相关组件

- [ParameterEditor](../ParameterEditor/README.md) - 模板参数编辑器
- [DependencyGraphViewer](../DependencyGraphViewer/README.md) - 依赖关系图查看器

## 更新日志

### v1.0.0 (2024-10-18)
- ✅ 初始版本发布
- ✅ 支持4种引用类型
- ✅ 智能提示功能
- ✅ 实时验证功能
