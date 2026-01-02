# CalendarPro 使用示例

## 📌 基础示例

### 1. 最简使用
```tsx
import { CalendarPro } from '@/pages/appSYS/calendar/_components/CalendarPro';

export default function MyCalendar() {
  return <CalendarPro />;
}
```

**效果**:
- 自动显示当前月份
- 周数列显示在左侧
- 每个日期下方显示农历
- 节日和节气使用红色高亮

---

## 🎯 农历功能示例

### 2. 查看农历信息
```tsx
import { CalendarPro } from '@/pages/appSYS/calendar/_components/CalendarPro';
import { getLunarInfo } from '@/pages/appSYS/calendar/_components/CalendarPro/utils/dateUtils';
import { message } from 'antd';

export default function CalendarWithLunarInfo() {
  const handleDateClick = ({ date }) => {
    const lunar = getLunarInfo(date);

    // 构建提示信息
    let info = `公历: ${date.format('YYYY年MM月DD日')}\\n`;
    info += `农历: ${lunar.lunarDayText}`;

    if (lunar.festival) {
      info += `\\n节日: ${lunar.festival}`;
    }

    if (lunar.solarTerm) {
      info += `\\n节气: ${lunar.solarTerm}`;
    }

    message.info(info);
  };

  return (
    <CalendarPro
      onDateClick={handleDateClick}
    />
  );
}
```

**效果**: 点击日期时显示完整的农历信息

---

## 📅 周数功能示例

### 3. 获取周数信息
```tsx
import { CalendarPro } from '@/pages/appSYS/calendar/_components/CalendarPro';
import { getISOWeekNumber, formatWeekNumber } from '@/pages/appSYS/calendar/_components/CalendarPro/utils/dateUtils';
import { message } from 'antd';

export default function CalendarWithWeekInfo() {
  const handleDateClick = ({ date }) => {
    const weekNum = getISOWeekNumber(date);
    const formatted = formatWeekNumber(weekNum);

    message.info(`${date.format('YYYY-MM-DD')} 是全年的${formatted}`);
  };

  return (
    <CalendarPro
      onDateClick={handleDateClick}
    />
  );
}
```

**效果**: 点击日期时显示该日期是全年第几周

---

## 🎨 自定义样式示例

### 4. 节日高亮增强
```tsx
import { CalendarPro } from '@/pages/appSYS/calendar/_components/CalendarPro';
import { getLunarInfo } from '@/pages/appSYS/calendar/_components/CalendarPro/utils/dateUtils';
import { Badge } from 'antd';

export default function EnhancedCalendar() {
  const cellRender = ({ date, data, isCurrentMonth }) => {
    if (!isCurrentMonth) return null;

    const lunar = getLunarInfo(date);

    return (
      <div style={{ minHeight: '60px', padding: '4px' }}>
        {/* 节日特效 */}
        {lunar.festival && (
          <div
            style={{
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              marginBottom: '4px',
              textAlign: 'center',
            }}
          >
            🎉 {lunar.festival}
          </div>
        )}

        {/* 节气特效 */}
        {lunar.solarTerm && (
          <div
            style={{
              background: 'linear-gradient(135deg, #51cf66 0%, #8ce99a 100%)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              marginBottom: '4px',
              textAlign: 'center',
            }}
          >
            🌱 {lunar.solarTerm}
          </div>
        )}

        {/* 工作日/假期标签 */}
        {data?.isWorkday && (
          <Badge
            status="success"
            text={<span style={{ fontSize: '12px' }}>工作日</span>}
          />
        )}

        {data?.isHoliday && (
          <Badge
            status="error"
            text={<span style={{ fontSize: '12px' }}>假期</span>}
          />
        )}
      </div>
    );
  };

  return (
    <CalendarPro
      cellRender={cellRender}
    />
  );
}
```

**效果**: 节日和节气使用渐变背景卡片样式

---

## 📊 数据统计示例

### 5. 统计月度节日
```tsx
import { CalendarPro } from '@/pages/appSYS/calendar/_components/CalendarPro';
import { getLunarInfo } from '@/pages/appSYS/calendar/_components/CalendarPro/utils/dateUtils';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Card, List } from 'antd';

export default function CalendarWithStats() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [festivals, setFestivals] = useState([]);

  // 统计当月节日
  useEffect(() => {
    const startOfMonth = currentMonth.startOf('month');
    const endOfMonth = currentMonth.endOf('month');
    const festivalList = [];

    let current = startOfMonth;
    while (current.isBefore(endOfMonth) || current.isSame(endOfMonth, 'day')) {
      const lunar = getLunarInfo(current);

      if (lunar.festival || lunar.solarTerm) {
        festivalList.push({
          date: current.format('YYYY-MM-DD'),
          name: lunar.festival || lunar.solarTerm,
          type: lunar.festival ? 'festival' : 'solarTerm',
        });
      }

      current = current.add(1, 'day');
    }

    setFestivals(festivalList);
  }, [currentMonth]);

  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      {/* 日历 */}
      <div style={{ flex: 1 }}>
        <CalendarPro
          onMonthChange={(date) => setCurrentMonth(date)}
        />
      </div>

      {/* 统计面板 */}
      <Card
        title={`${currentMonth.format('YYYY年MM月')} 节日节气`}
        style={{ width: '300px' }}
      >
        <List
          dataSource={festivals}
          renderItem={(item) => (
            <List.Item>
              <div>
                <div style={{ fontWeight: 'bold', color: '#ff4d4f' }}>
                  {item.type === 'festival' ? '🎉' : '🌱'} {item.name}
                </div>
                <div style={{ fontSize: '12px', color: '#999' }}>
                  {item.date}
                </div>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
```

**效果**: 在侧边栏显示当月所有节日和节气列表

---

## 🔍 高级过滤示例

### 6. 节日筛选
```tsx
import { CalendarPro } from '@/pages/appSYS/calendar/_components/CalendarPro';
import { getLunarInfo } from '@/pages/appSYS/calendar/_components/CalendarPro/utils/dateUtils';
import { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default function FilteredCalendar() {
  const [filter, setFilter] = useState('all');

  const cellRender = ({ date, data, isCurrentMonth }) => {
    if (!isCurrentMonth) return null;

    const lunar = getLunarInfo(date);

    // 应用过滤
    if (filter === 'festival' && !lunar.festival) return null;
    if (filter === 'solarTerm' && !lunar.solarTerm) return null;

    return (
      <div style={{ minHeight: '60px', padding: '4px' }}>
        {/* 高亮节日/节气 */}
        {lunar.festival && (
          <div style={{
            color: '#ff4d4f',
            fontWeight: 'bold',
            fontSize: '12px',
            marginBottom: '4px',
          }}>
            🎉 {lunar.festival}
          </div>
        )}

        {lunar.solarTerm && (
          <div style={{
            color: '#52c41a',
            fontWeight: 'bold',
            fontSize: '12px',
            marginBottom: '4px',
          }}>
            🌱 {lunar.solarTerm}
          </div>
        )}

        {/* 原有内容 */}
        {data?.isWorkday && <div style={{ fontSize: '11px' }}>工作日</div>}
        {data?.isHoliday && <div style={{ fontSize: '11px' }}>假期</div>}
      </div>
    );
  };

  return (
    <div>
      {/* 过滤器 */}
      <div style={{ marginBottom: '16px' }}>
        <Select
          value={filter}
          onChange={setFilter}
          style={{ width: 200 }}
        >
          <Option value="all">全部显示</Option>
          <Option value="festival">仅显示节日</Option>
          <Option value="solarTerm">仅显示节气</Option>
        </Select>
      </div>

      {/* 日历 */}
      <CalendarPro cellRender={cellRender} />
    </div>
  );
}
```

**效果**: 可以筛选只显示节日或节气的日期

---

## 🎯 实用工具示例

### 7. 农历生日提醒
```tsx
import { CalendarPro } from '@/pages/appSYS/calendar/_components/CalendarPro';
import { getLunarInfo } from '@/pages/appSYS/calendar/_components/CalendarPro/utils/dateUtils';
import { useState } from 'react';
import { Input, Button, Tag, message } from 'antd';

export default function BirthdayReminder() {
  const [lunarBirthday, setLunarBirthday] = useState(''); // 例: "正月初一"

  const cellRender = ({ date, data, isCurrentMonth }) => {
    if (!isCurrentMonth) return null;

    const lunar = getLunarInfo(date);
    const isBirthday = lunar.lunarDayText === lunarBirthday;

    return (
      <div style={{ minHeight: '60px', padding: '4px' }}>
        {/* 生日提醒 */}
        {isBirthday && (
          <Tag color="magenta" style={{ marginBottom: '4px' }}>
            🎂 生日
          </Tag>
        )}

        {/* 节日 */}
        {lunar.festival && (
          <div style={{ color: '#ff4d4f', fontSize: '12px' }}>
            {lunar.festival}
          </div>
        )}

        {/* 工作日/假期 */}
        {data?.isWorkday && <div style={{ fontSize: '11px' }}>工作日</div>}
        {data?.isHoliday && <div style={{ fontSize: '11px' }}>假期</div>}
      </div>
    );
  };

  const handleSearch = () => {
    if (lunarBirthday) {
      message.success(`已设置农历生日提醒: ${lunarBirthday}`);
    }
  };

  return (
    <div>
      {/* 生日设置 */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
        <Input
          placeholder="输入农历生日 (如: 正月初一)"
          value={lunarBirthday}
          onChange={(e) => setLunarBirthday(e.target.value)}
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={handleSearch}>
          设置提醒
        </Button>
      </div>

      {/* 日历 */}
      <CalendarPro cellRender={cellRender} />
    </div>
  );
}
```

**效果**: 在日历上标记农历生日日期

---

## 📱 响应式示例

### 8. 移动端适配
```tsx
import { CalendarPro } from '@/pages/appSYS/calendar/_components/CalendarPro';
import { getLunarInfo } from '@/pages/appSYS/calendar/_components/CalendarPro/utils/dateUtils';
import { useMediaQuery } from 'react-responsive';

export default function ResponsiveCalendar() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const cellRender = ({ date, data, isCurrentMonth }) => {
    if (!isCurrentMonth) return null;

    const lunar = getLunarInfo(date);

    return (
      <div style={{
        minHeight: isMobile ? '40px' : '60px',
        padding: isMobile ? '2px' : '4px',
        fontSize: isMobile ? '10px' : '12px',
      }}>
        {/* 节日 (移动端仅显示 emoji) */}
        {lunar.festival && (
          <div style={{ color: '#ff4d4f', fontWeight: 'bold' }}>
            {isMobile ? '🎉' : `🎉 ${lunar.festival}`}
          </div>
        )}

        {/* 工作日/假期 */}
        {!isMobile && data?.isWorkday && <div>工作日</div>}
        {!isMobile && data?.isHoliday && <div>假期</div>}
      </div>
    );
  };

  return (
    <CalendarPro
      cellRender={cellRender}
    />
  );
}
```

**效果**: 在移动端自动简化显示内容

---

## 🔧 调试示例

### 9. 农历数据调试
```tsx
import { CalendarPro } from '@/pages/appSYS/calendar/_components/CalendarPro';
import { getLunarInfo, getISOWeekNumber } from '@/pages/appSYS/calendar/_components/CalendarPro/utils/dateUtils';
import { useState } from 'react';
import { Drawer, Descriptions } from 'antd';

export default function DebugCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleDateClick = ({ date }) => {
    setSelectedDate(date);
    setDrawerVisible(true);
  };

  const lunar = selectedDate ? getLunarInfo(selectedDate) : null;
  const weekNum = selectedDate ? getISOWeekNumber(selectedDate) : null;

  return (
    <>
      <CalendarPro onDateClick={handleDateClick} />

      {/* 调试信息抽屉 */}
      <Drawer
        title="日期调试信息"
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={400}
      >
        {selectedDate && lunar && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="公历日期">
              {selectedDate.format('YYYY年MM月DD日')}
            </Descriptions.Item>
            <Descriptions.Item label="星期">
              {selectedDate.format('dddd')}
            </Descriptions.Item>
            <Descriptions.Item label="周数">
              第{weekNum}周
            </Descriptions.Item>
            <Descriptions.Item label="农历日期">
              {lunar.lunarDayText || '无'}
            </Descriptions.Item>
            <Descriptions.Item label="节日">
              {lunar.festival || '无'}
            </Descriptions.Item>
            <Descriptions.Item label="节气">
              {lunar.solarTerm || '无'}
            </Descriptions.Item>
            <Descriptions.Item label="时间戳">
              {selectedDate.valueOf()}
            </Descriptions.Item>
            <Descriptions.Item label="ISO 格式">
              {selectedDate.toISOString()}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </>
  );
}
```

**效果**: 点击日期时在侧边栏显示完整的调试信息

---

## 💡 实用技巧

### 获取当月所有节日
```typescript
import dayjs from 'dayjs';
import { getLunarInfo } from '@/pages/appSYS/calendar/_components/CalendarPro/utils/dateUtils';

function getMonthFestivals(year: number, month: number) {
  const startDate = dayjs(`${year}-${month}-01`);
  const endDate = startDate.endOf('month');
  const festivals = [];

  let current = startDate;
  while (current.isBefore(endDate) || current.isSame(endDate, 'day')) {
    const lunar = getLunarInfo(current);

    if (lunar.festival || lunar.solarTerm) {
      festivals.push({
        date: current.format('YYYY-MM-DD'),
        festival: lunar.festival,
        solarTerm: lunar.solarTerm,
      });
    }

    current = current.add(1, 'day');
  }

  return festivals;
}

// 使用
const festivals = getMonthFestivals(2025, 1);
console.log(festivals);
```

### 计算距离下一个节日的天数
```typescript
import dayjs from 'dayjs';
import { getLunarInfo } from '@/pages/appSYS/calendar/_components/CalendarPro/utils/dateUtils';

function getDaysUntilNextFestival(targetFestival: string) {
  let current = dayjs();
  let daysChecked = 0;
  const maxDays = 365; // 最多查找一年

  while (daysChecked < maxDays) {
    const lunar = getLunarInfo(current);

    if (lunar.festival === targetFestival) {
      return daysChecked;
    }

    current = current.add(1, 'day');
    daysChecked++;
  }

  return -1; // 未找到
}

// 使用
const days = getDaysUntilNextFestival('春节');
console.log(`距离春节还有 ${days} 天`);
```

### 判断是否为重要节日
```typescript
import { getLunarInfo } from '@/pages/appSYS/calendar/_components/CalendarPro/utils/dateUtils';

const MAJOR_FESTIVALS = ['春节', '元宵节', '清明节', '端午节', '中秋节', '重阳节'];

function isMajorFestival(date: Dayjs): boolean {
  const lunar = getLunarInfo(date);
  return lunar.festival ? MAJOR_FESTIVALS.includes(lunar.festival) : false;
}

// 使用
const isMajor = isMajorFestival(dayjs('2025-01-29'));
console.log(isMajor); // true (春节)
```

---

## 📝 注意事项

1. **性能优化**: 大规模渲染时使用 `cellRender` 的 `useMemo` 缓存
2. **错误处理**: `getLunarInfo` 失败时会返回空字符串, 不会抛出异常
3. **时区问题**: 所有日期计算基于本地时区
4. **农历范围**: `lunar-javascript` 支持 1900-2100 年
5. **周数标准**: 使用 ISO 8601 标准 (周一为第一天)
