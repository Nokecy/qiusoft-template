# Settings 设置管理页面

## 功能概述

设置管理页面提供系统配置参数的动态管理功能，支持多种配置类型和灵活的数据源格式。

## 核心功能

### 1. 动态表单生成

根据后端配置自动生成表单字段，支持多种类型：

- **text**: 文本输入框
- **number**: 数字输入框
- **dateTime**: 日期时间选择器
- **checkbox**: 复选框
- **select/downInput**: 下拉选择框
- **roleSelect**: 角色选择器
- **自定义组件**: 通过 SettingWidgetComponents 扩展

### 2. DataSource 大小写兼容

#### 问题背景
后端可能返回不同大小写格式的 DataSource 数据：
- 标准格式: `{ Name: "选项1", Value: "1" }`
- 小写格式: `{ name: "选项1", value: "1" }`
- 混合格式: `{ Name: "选项1", value: "1" }`

#### 解决方案
使用 `normalizeDataSourceItem` 函数统一处理：

```typescript
/**
 * 规范化 DataSource 数据项
 */
const normalizeDataSourceItem = (item: DataSourceItem) => {
	return {
		label: item.Name || item.name || '',
		value: item.Value ?? item.value ?? ''
	};
};
```

#### 支持的数据格式

**1. 大写格式（标准）**
```json
{
  "DataSource": [
    { "Name": "选项1", "Value": "1" },
    { "Name": "选项2", "Value": "2" }
  ]
}
```

**2. 小写格式**
```json
{
  "DataSource": [
    { "name": "选项1", "value": "1" },
    { "name": "选项2", "value": "2" }
  ]
}
```

**3. 混合格式**
```json
{
  "DataSource": [
    { "Name": "选项1", "value": "1" },
    { "name": "选项2", "Value": "2" }
  ]
}
```

#### 优先级规则
当同时存在大小写字段时，优先使用大写字段：
- `Name` 优先于 `name`
- `Value` 优先于 `value`

#### Value 类型支持
支持多种值类型：
- 字符串: `"1"`, `"option1"`
- 数字: `1`, `2.5`
- 布尔值: `true`, `false`

### 3. 分组显示

配置按 `Group2` 字段自动分组，每个组独立折叠：

```typescript
const groupInfo = groupBy(infos, info => info.properties!.Group2);
```

每个组使用 `ProCard` 展示，支持折叠功能。

### 4. 数据保存

#### 保存逻辑
```typescript
const handleSave = () => {
    form.validateFields().then((values: any) => {
        // 1. 布尔值转换为字符串 "True"/"False"
        // 2. 添加 "Setting_" 前缀
        // 3. 调用 API 保存
        SettingUiSetSettingValuesAsync(values);
    });
};
```

#### 数据转换
- 布尔值 `true` → `"True"`
- 布尔值 `false` → `"False"`
- 其他类型保持原样

### 5. 重置功能

重置当前表单所有配置为默认值：

```typescript
const handleReset = () => {
    SettingUiResetSettingValuesAsync(Object.keys(values));
};
```

## 组件结构

### 主组件 (index.tsx)

```tsx
<Tabs tabPosition='top'>
    {settingGroups.map(group => (
        <Tabs.TabPane tab={group.groupDisplayName} key={group.groupName}>
            <GenerationForm infos={group.settingInfos!} />
        </Tabs.TabPane>
    ))}
</Tabs>
```

### 表单组件 (generationForm.tsx)

```tsx
<Form form={form} initialValues={getFormValue()}>
    {Object.keys(groupInfo).map(key => (
        <ProCard title={key} collapsible>
            <Row gutter={8}>
                {groupInfo[key].map(info => (
                    <Col span={8}>
                        <FormItem name={info.name}>
                            <Component
                                {...(type === 'select'
                                    ? { options: info.properties?.DataSource?.map(normalizeDataSourceItem) }
                                    : {}
                                )}
                            />
                        </FormItem>
                    </Col>
                ))}
            </Row>
        </ProCard>
    ))}
</Form>
```

## 类型定义

### DataSourceItem

```typescript
interface DataSourceItem {
    Name?: string;
    name?: string;
    Value?: string | number | boolean;
    value?: string | number | boolean;
}
```

### SettingInfo

根据 API 定义，每个配置项包含：
- `name`: 配置键名
- `displayName`: 显示名称
- `description`: 描述信息
- `value`: 当前值
- `properties`: 扩展属性
  - `Type`: 字段类型
  - `Group2`: 分组名称
  - `DataSource`: 选项数据源

## 使用示例

### 后端配置示例

```json
{
  "groupName": "BasicSettings",
  "groupDisplayName": "基础设置",
  "settingInfos": [
    {
      "name": "SystemMode",
      "displayName": "系统模式",
      "description": "选择系统运行模式",
      "value": "Production",
      "properties": {
        "Type": "select",
        "Group2": "系统配置",
        "DataSource": [
          { "Name": "开发模式", "Value": "Development" },
          { "name": "生产模式", "value": "Production" }
        ]
      }
    }
  ]
}
```

### 前端渲染结果

自动生成下拉选择框，支持混合大小写的 DataSource：
- 选项1: 开发模式 (Development)
- 选项2: 生产模式 (Production)

## API 依赖

### SettingUi 服务
- `SettingUiGroupSettingDefinitionsAsync`: 获取设置分组
- `SettingUiSetSettingValuesAsync`: 保存设置
- `SettingUiResetSettingValuesAsync`: 重置设置

## 最佳实践

### 1. DataSource 格式建议
推荐使用大写格式 `{ Name, Value }` 作为标准格式，同时兼容小写格式确保向后兼容。

### 2. 字段类型选择
- 简单文本: `text`
- 数字范围: `number`
- 是/否选项: `checkbox`
- 多选一: `select`
- 日期时间: `dateTime`

### 3. 分组组织
合理使用 `Group2` 字段对相关配置分组，提升用户体验。

### 4. 验证规则
可在 FormItem 中添加 `rules` 属性进行表单验证。

## 扩展功能

### 添加自定义组件

通过 SettingWidgetComponents 注册自定义组件：

```typescript
// umi配置
export default {
  settingWidgets: {
    customComponent: './components/CustomSettingWidget',
  }
};
```

### 国际化支持

组标题支持国际化：

```typescript
title={intl.formatMessage({ id: `${key}` })}
```

## 常见问题

### Q: DataSource 数据格式不一致怎么办？
A: 使用 `normalizeDataSourceItem` 函数自动处理，支持大小写混合格式。

### Q: 如何添加新的字段类型？
A: 在 `Components` 对象中注册新组件，或通过 SettingWidgetComponents 扩展。

### Q: 保存失败如何处理？
A: 检查网络请求和后端返回，确保数据格式正确。

### Q: 如何自定义表单布局？
A: 修改 `formItemLayout` 配置或调整 `Col` 的 `span` 属性。

## 更新日志

### v1.1.0 (2025-09-30)
- ✅ 新增 DataSource 大小写兼容功能
- ✅ 添加完整的类型定义
- ✅ 改进错误处理和用户提示
- ✅ 优化代码规范和可读性
- ✅ 添加详细的文档注释

### v1.0.0
- ✅ 基础设置管理功能
- ✅ 动态表单生成
- ✅ 分组显示
- ✅ 保存和重置功能