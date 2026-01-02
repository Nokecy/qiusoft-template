# CalendarPro 更新日志

## [1.1.0] - 2025-10-17

### ✨ 新增功能

#### 1. 周数显示
- **位置**: 每周第一个单元格的左侧增加独立的周数列
- **样式**:
  - 宽度: 60px
  - 背景色: #f5f5f5
  - 文字: 12px, 深灰色 (#666)
  - 格式: "第XX周"
- **计算方式**: 使用 ISO 8601 标准周数 (dayjs.isoWeek())

#### 2. 农历日期显示
- **位置**: 公历日期下方
- **样式**:
  - 字号: 11px
  - 颜色: 普通日期 #999, 节日/节气 #ff4d4f (红色)
  - 行高: 1.2
- **显示优先级**:
  1. 节日 (农历节日 > 公历节日)
  2. 节气
  3. 农历日期
- **特殊规则**:
  - 初一: 显示月份 (如"正月")
  - 其他: 显示日期 (如"初二", "廿三")

### 🔧 技术实现

#### 新增依赖
- `lunar-javascript@1.7.5`: 农历和节日计算库
- `dayjs/plugin/isoWeek`: ISO 周数支持

#### 新增工具函数 (dateUtils.ts)
```typescript
// 农历信息
export interface LunarInfo {
  lunarDayText: string;  // 农历日期文本
  festival?: string;      // 节日名称
  solarTerm?: string;     // 节气名称
}

export const getLunarInfo = (date: Dayjs): LunarInfo
export const getISOWeekNumber = (date: Dayjs): number
export const formatWeekNumber = (weekNumber: number): string
```

#### 组件修改 (MonthView.tsx)
- 布局从 `repeat(7, 1fr)` 改为 `60px repeat(7, 1fr)`
- 添加周数列头部和内容渲染
- 日期单元格集成农历信息显示
- 优化日期数字和农历的垂直布局

### 📱 响应式设计
- 周数列固定宽度 60px, 保证在各种屏幕下稳定显示
- 农历文字大小 11px, 适配小屏幕
- 保持现有的 hover 和选中状态交互

### 🎨 视觉优化
- 节日和节气使用红色高亮 (#ff4d4f)
- 周数列使用灰色背景区分 (#f5f5f5)
- 保持与现有工作日/假期标签的视觉一致性

### 🔍 测试覆盖
- 农历信息获取测试
- 节日识别测试
- 节气识别测试
- 周数计算测试
- 边界情况和错误处理

### 📖 使用示例
```tsx
import { CalendarPro } from '@/pages/appSYS/calendar/_components/CalendarPro';

// 默认启用周数和农历显示
<CalendarPro
  firstDayOfWeek={0}
  // ... 其他配置
/>
```

### ⚠️ 注意事项
1. 农历计算依赖 `lunar-javascript` 库, 确保已安装
2. 周数使用 ISO 8601 标准, 可能与部分地区的本地周数计算略有差异
3. 节日数据来自 `lunar-javascript` 内置数据库
4. 日期单元格内容区域从 `marginTop: 20px` 调整为 `marginTop: 32px`

### 🐛 已知问题
- 无

### 🔜 后续计划
- [ ] 支持自定义节日配置
- [ ] 支持显示/隐藏农历的开关
- [ ] 支持自定义周数计算起始日
