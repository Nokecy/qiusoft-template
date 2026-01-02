# 假期集管理模块

## 模块概述

假期集管理模块用于管理法定假日和特殊假期，支持按国家/地区分类。每个假期集包含多个假期项目，每个项目有开始/结束日期。

## 功能特性

### 1. 列表页面 (`index.tsx`)
- ✅ 显示假期集列表
- ✅ 支持新建、编辑、删除、查看操作
- ✅ 显示假期数量统计
- ✅ 启用状态标签展示

### 2. 详情页面 (`detail.tsx`)
- ✅ 基本信息展示
  - 假期集名称、描述
  - 国家/地区标签
  - 启用状态标签

- ✅ 统计信息卡片
  - 假期总数
  - 公共假期数量
  - 假期覆盖天数

- ✅ 假期项目展示（双视图）
  - **列表视图**: 表格形式展示所有假期详情
  - **时间线视图**: 按月份分组的时间线展示

- ✅ 操作功能
  - 返回列表
  - 编辑假期集
  - 删除假期集

### 3. 表单对话框 (`components/formDialog.tsx`)
- ✅ 支持新建和编辑模式
- ✅ 假期集基本信息编辑
- ✅ 假期项目动态管理

## 数据结构

### HolidaySetDto
```typescript
interface HolidaySetDto {
  id?: string;
  name?: string;                    // 假期集名称
  description?: string;             // 描述
  countryOrRegion?: string;         // 国家/地区
  isActive?: boolean;               // 是否启用
  items?: HolidayItemDto[];         // 假期项目列表
}
```

### HolidayItemDto
```typescript
interface HolidayItemDto {
  id?: string;
  name?: string;                    // 假期名称，如"春节"、"国庆节"
  description?: string;             // 描述
  startDate?: string;               // 开始日期 YYYY-MM-DD
  endDate?: string;                 // 结束日期 YYYY-MM-DD
  isPublicHoliday?: boolean;        // 是否公共假期
}
```

## 页面路由

- 列表页: `/appSYS/calendar/holidaySet`
- 详情页: `/appSYS/calendar/holidaySet/detail?id={holidaySetId}`

## 视觉设计

### 颜色规范
- **启用状态**: 绿色 Tag (`success`)
- **禁用状态**: 红色 Tag (`error`)
- **公共假期**: 红色/橙色标识 (`error`)
- **非公共假期**: 默认灰色 Tag (`default`)
- **国家/地区**: 蓝色 Tag (`blue`)

### 统计卡片配色
- **假期总数**: 蓝色 (`#1890ff`)
- **公共假期**: 红色 (`#ff4d4f`)
- **假期天数**: 绿色 (`#52c41a`)

## 使用指南

### 查看假期集详情
1. 在列表页点击"查看"按钮
2. 进入详情页查看完整信息
3. 可切换"列表视图"和"时间线视图"
4. 支持直接编辑和删除操作

### 列表视图
- 表格展示所有假期项目
- 显示假期名称、日期范围、天数、类型、描述
- 公共假期有特殊标识

### 时间线视图
- 按月份分组展示
- 时间线形式直观展示假期分布
- 公共假期用红色标记，其他假期用蓝色

## API接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/calendar-management/holiday-set` | GET | 获取假期集列表 |
| `/api/calendar-management/holiday-set/{id}` | GET | 获取假期集详情 |
| `/api/calendar-management/holiday-set` | POST | 创建假期集 |
| `/api/calendar-management/holiday-set/{id}/update` | POST | 更新假期集 |
| `/api/calendar-management/holiday-set/{id}/delete` | POST | 删除假期集 |

## 权限控制

所有操作按钮均使用 `Access` 组件进行权限控制，可根据实际需求配置具体权限。

## 响应式设计

- 页面支持响应式布局
- 统计信息卡片使用 Grid 布局，自动适配屏幕尺寸
- 表格支持横向滚动
- 适配桌面端和平板设备

## 扩展功能建议

### 可选增强
1. **日历视图**: 使用日历组件可视化展示假期分布
2. **假期冲突检测**: 检测同一假期集内的日期冲突
3. **导入导出**: 支持批量导入假期数据
4. **假期模板**: 提供常见国家/地区的假期模板
5. **假期提醒**: 集成通知功能，提前提醒假期
6. **多语言支持**: 假期名称和描述的多语言版本

## 技术栈

- React 18 + TypeScript
- Ant Design 5 + Pro Components
- UmiJS 4 路由
- dayjs 日期处理

## 开发注意事项

1. **日期格式**: 所有日期使用 `YYYY-MM-DD` 格式
2. **数据校验**: 表单提交前验证日期合法性和范围
3. **错误处理**: 所有API调用包含错误处理逻辑
4. **用户体验**: 删除操作需要二次确认
5. **性能优化**: 使用 `useMemo` 优化列定义和统计计算
