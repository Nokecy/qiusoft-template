# 日历管理系统

## 系统概述

日历管理系统是一个企业级的工作日历管理解决方案，支持灵活的工作日配置、假期管理和日期手动调整功能。系统采用现代化的UI设计，提供直观的日历视图和完善的配置管理功能。

## 核心功能

### 1. 日历定义管理
- **功能说明**: 创建和管理多个独立的日历定义
- **应用场景**: 不同部门、不同地区可以使用不同的工作日历
- **主要操作**:
  - 新建日历定义（名称、描述）
  - 编辑日历信息
  - 删除日历定义
  - 查看日历详情

### 2. 日历视图
- **功能说明**: 可视化展示日历数据，直观查看工作日和假期
- **核心特性**:
  - 📅 月份日历视图，支持月份切换
  - 📊 统计信息展示（工作日、假期、手动调整、总工时）
  - 🎨 日期状态可视化（工作日、假期、手动调整标记）
  - ✏️ 点击日期快速调整

### 3. 日期手动调整
- **功能说明**: 对特定日期进行手动调整，覆盖自动计算结果
- **调整内容**:
  - 是否工作日
  - 实际工作时长
  - 备注说明
- **操作方式**:
  - 点击日历中的日期打开调整对话框
  - 填写调整信息并保存
  - 可随时重置为自动计算

### 4. 配置管理
- **假期集配置**: 选择适用的假期集，定义法定假日和特殊假期
- **工作日配置**: 选择工作日配置规则（可多选）
- **配置说明**: 系统自动计算日期状态的优先级规则

### 5. 调整历史
- **功能说明**: 记录所有手动调整的历史记录
- **展示信息**:
  - 调整日期和星期
  - 调整后的状态（工作日/休息日）
  - 实际工时
  - 调整备注
  - 调整时间和调整人

## 技术架构

### 前端技术栈
- **UI框架**: React 18 + Ant Design 5
- **日历组件**: Ant Design Calendar
- **数据展示**: AgGridPlus + ProComponents
- **路由管理**: UmiJS 4

### 核心组件

#### 1. CalendarPro 组件
企业级日历视图组件，独立可复用，负责展示日历数据和交互。

**主要功能**:
- 月份切换和日历渲染
- 日期状态可视化（工作日、假期、手动调整）
- 统计信息展示（工作日、假期、总工时）
- 点击日期触发调整
- 自定义渲染和事件回调
- 异步数据加载

**使用示例**:
```tsx
<CalendarPro
  onLoad={async (startDate, endDate) => {
    const data = await CalendarDefinitionGetDatesAsync({
      id: calendarId,
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
    });
    return data || [];
  }}
  onDateClick={({ date, data }) => {
    // 处理日期点击
  }}
  showStatistics={true}
  showHeader={true}
  showFooter={true}
/>
```

**更多信息**: 参考 `src/pages/appSYS/calendar/_components/CalendarPro/README.md`

#### 2. ManualAdjustmentDialog 组件
日期手动调整对话框组件。

**主要功能**:
- 显示当前日期状态
- 提供调整表单
- 支持重置为自动计算

**使用示例**:
```tsx
<ManualAdjustmentDialog
  visible={dialogVisible}
  dateData={selectedDateData}
  onClose={handleClose}
  onSuccess={handleSuccess}
/>
```

#### 3. ConfigurationPanel 组件
配置管理面板组件。

**主要功能**:
- 假期集选择和保存
- 工作日配置选择和保存
- 配置说明展示

#### 4. AdjustmentHistory 组件
调整历史记录展示组件。

**主要功能**:
- 展示所有手动调整记录
- 支持搜索和排序

## 日历计算规则

系统采用以下优先级计算某一天是否为工作日：

1. **手动调整（最高优先级）**: 如果该日期被手动调整，使用手动设置的值
2. **假期集**: 如果该日期在假期集中定义为假期，则为非工作日
3. **工作日配置**: 根据工作日配置判断该星期几是否为工作日
4. **默认规则（最低优先级）**: 未配置的情况下，默认周一到周五为工作日

## API 接口

### 日历定义相关
- `CalendarDefinitionGetListAsync`: 获取日历定义列表
- `CalendarDefinitionGetAsync`: 获取单个日历定义
- `CalendarDefinitionCreateAsync`: 创建日历定义
- `CalendarDefinitionUpdateAsync`: 更新日历定义
- `CalendarDefinitionDeleteAsync`: 删除日历定义
- `CalendarDefinitionGetDatesAsync`: 获取日历日期数据

### 日期调整相关
- `CalendarDateDefinitionSetManualWorkdayAsync`: 手动设置工作日
- `CalendarDateDefinitionResetToAutoCalculationAsync`: 重置为自动计算
- `CalendarDateDefinitionBatchResetToAutoCalculationAsync`: 批量重置为自动计算
- `CalendarDateDefinitionGetManualAdjustmentHistoryAsync`: 获取手动调整历史

### 配置管理相关
- `CalendarDefinitionSetHolidaySetAsync`: 设置假期集
- `CalendarDefinitionSetWorkdayConfigureAsync`: 设置工作日配置

## 使用指南

### 1. 创建日历定义
1. 进入"系统管理" -> "日历管理" -> "日历定义"
2. 点击"新建日历定义"按钮
3. 填写日历名称和描述
4. 保存

### 2. 配置日历
1. 在日历列表中点击"查看"按钮
2. 进入"配置管理"标签页
3. 选择适用的假期集
4. 选择工作日配置规则（可多选）
5. 点击"保存"按钮

### 3. 查看日历
1. 在日历列表中点击"查看"按钮
2. 默认显示"日历视图"标签页
3. 使用月份切换按钮查看不同月份
4. 查看统计信息了解工作日/假期分布

### 4. 手动调整日期
1. 在日历视图中点击需要调整的日期
2. 在弹出的对话框中查看当前状态
3. 修改工作日状态和工作时长
4. 填写备注说明（可选）
5. 点击"保存调整"按钮

### 5. 重置手动调整
1. 点击已手动调整的日期
2. 在对话框中点击"重置为自动计算"按钮
3. 确认操作

### 6. 查看调整历史
1. 在日历详情页进入"调整历史"标签页
2. 查看所有手动调整记录
3. 可以按日期、调整人等条件搜索

## 数据结构

### CalendarDefinitionDto
```typescript
{
  id: string;                    // 日历ID
  name: string;                  // 日历名称
  description?: string;          // 描述
  holidaySetId?: string;         // 假期集ID
  workdayConfigures?: Array;     // 工作日配置列表
  dates?: Array;                 // 日期数据列表
}
```

### CalendarDateDefinitionDto
```typescript
{
  id: string;                    // 日期记录ID
  calendarDefinitionId: string;  // 所属日历ID
  date: string;                  // 日期
  isWorkdayInConfigure: boolean; // 配置中是否为工作日
  isHoliday: boolean;           // 是否为假期
  holidayName?: string;         // 假期名称
  isWorkday: boolean;           // 实际是否为工作日
  isManuallySet: boolean;       // 是否手动设置
  plannedWorkHours?: number;    // 计划工时
  actualWorkHours?: number;     // 实际工时
  remark?: string;              // 备注
}
```

## 路由配置

```json
{
  "path": "/appSYS/calendar/calendarDefinition",
  "component": "./appSYS/calendar/calendarDefinition",
  "name": "日历定义"
},
{
  "path": "/appSYS/calendar/calendarDefinition/detail/:id",
  "component": "./appSYS/calendar/calendarDefinition/detail",
  "name": "日历详情"
}
```

## 注意事项

1. **手动调整优先级最高**: 手动调整的日期会覆盖自动计算的结果，请谨慎操作
2. **配置变更影响**: 修改假期集或工作日配置后，未手动调整的日期会自动重新计算
3. **调整历史记录**: 所有手动调整都会被记录，可供追溯
4. **工作时长**: 默认工作时长为8小时，可根据实际情况调整
5. **日历独立性**: 每个日历定义相互独立，互不影响

## 后续优化方向

1. **批量操作**: 支持批量手动调整日期
2. **导入导出**: 支持导入导出日历数据
3. **复制功能**: 支持从已有日历复制创建新日历
4. **权限控制**: 细化日历管理和调整的权限控制
5. **通知提醒**: 假期和特殊日期的提醒功能
6. **统计报表**: 更丰富的工时统计和分析报表
