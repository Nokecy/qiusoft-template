# 检验执行系统交互流程文档

## 文档概述

本文档详细描述检验执行系统的用户交互流程、数据流向、状态变化和系统响应，基于对代码实现的深度分析，涵盖完整的用户操作路径和系统行为。

**核心功能**：渐进式检验执行，支持检验值录入、缺陷管理、状态跟踪和自动流程控制。

## 1. 总体交互流程图

```
用户进入页面
    ↓
加载检验单数据 ← ─── API调用
    ↓           ┌→ QualityInspectionOrderGetByOneAsync
    ↓           ├→ QualityInspectionOrderGetProjectListAsync  
    ↓           └→ QualityInspectionOrderGetExecutionProgressAsync
显示项目列表
    ↓
选择检验项目 ──→ 切换当前项目 ──→ 初始化表单数据
    ↓                              ↓
执行检验操作                    显示项目详情
    ↓                              ↓
录入检验数据 ←←←←←←←←←←←←←←←←←← 填写检验表单
    ↓                              ↑
提交检验结果 ── API调用 ─────────→ 验证数据
    ↓           QualityInspectionOrder      ↓
状态更新        ExecuteAndNextAsync        数据校验
    ↓                              ↓
进度刷新 ────────────────────────→ 自动跳转下一项
    ↓                              ↓
完成所有项目                      跳转结果页面
```

## 2. 详细交互流程

### 2.1 页面初始化流程

```
[用户] 访问检验执行页面 (带orderId参数)
   ↓
[系统] 验证orderId参数有效性
   ↓
[系统] 并行加载数据 (Promise.all)
   ├─── 加载检验单信息 → transformInspectionOrderDto()
   ├─── 加载项目列表 → 状态计算与排序
   └─── 加载执行进度 → 进度百分比计算
   ↓
[系统] 设置初始状态
   ├─── setOrderInfo(检验单信息)
   ├─── setProjects(排序后的项目列表)  
   ├─── setCurrentIndex(第一个待检验项目)
   └─── setProgress(进度统计)
   ↓
[界面] 渲染完成，显示项目导航和当前项目卡片
```

### 2.2 项目切换交互流程

```
[用户] 点击项目导航中的某个项目
   ↓
[系统] 验证项目切换的有效性
   ↓
[组件] ProjectNavigation.onSelect(index)
   ↓
[主页面] setCurrentIndex(index) 状态更新
   ↓
[组件] CurrentProjectCard 接收新的project参数
   ↓
[表单] 检查项目ID变化，触发重新初始化
   ├─── 如果是已完成项目 → 加载详情数据 + 恢复显示状态
   └─── 如果是未完成项目 → 重置表单为初始状态
   ↓
[界面] 更新项目信息展示 + 表单数据 + 操作按钮状态
```

### 2.3 检验值录入交互流程

```
[用户] 点击"录入检验值"按钮
   ↓
[组件] InspectionValuesDisplay.handleOpenDialog()
   ↓
[弹框] InspectionValuesDialog 打开
   ├─── 显示项目信息和标准范围
   ├─── 加载已有测量值数据 (如果有)
   └─── 初始化表单 (Formily)
   ↓
[用户] 录入测量值
   ├─── 输入测量值 → 实时格式验证
   ├─── 填写备注信息 (可选)
   ├─── 添加多个测量值 → ArrayItems动态增删
   └─── 自动范围验证 → 视觉反馈 (颜色标识)
   ↓
[用户] 点击确定按钮
   ↓
[弹框] 验证表单数据
   ├─── 检查必填字段完整性
   ├─── 验证数值格式合法性  
   └─── 过滤空值记录
   ↓
[组件] 回调 onValuesChange(validatedResults)
   ↓
[主表单] 更新 measurementResults 字段
   ├─── 自动建议检验结果 (基于标准范围)
   └─── 触发表单验证
   ↓
[界面] 关闭弹框，更新检验值显示区域
```

### 2.4 检验结果选择流程

```
[用户] 选择检验结果 (合格/不合格)
   ↓
[表单] Formily 字段值更新 inspectionResult
   ↓
[系统] 触发字段关联验证
   ├─── 如果选择"不合格" → 检查是否有缺陷记录
   └─── 如果选择"合格" → 正常流程
   ↓
[界面] 更新相关UI状态
   ├─── 缺陷区域显示/隐藏逻辑
   ├─── 提交按钮启用状态
   └─── 视觉反馈 (颜色变化)
```

### 2.5 缺陷录入交互流程

```
[用户] 点击"录入缺陷"按钮 (通常在选择不合格后)
   ↓
[组件] DefectsListDisplay.onEditDefects()
   ↓
[弹框] DefectDialog 打开
   ├─── 显示项目基本信息
   ├─── 加载已有缺陷数据 (如果有)
   └─── 初始化缺陷表单
   ↓
[用户] 录入缺陷信息
   ├─── 选择缺陷编码 → 自动填充缺陷名称
   ├─── 输入缺陷位置
   ├─── 设置缺陷数量
   ├─── 选择严重程度 (轻微/重要/致命)
   ├─── 填写缺陷描述
   └─── 支持多个缺陷录入
   ↓
[用户] 点击确定按钮
   ↓
[弹框] 验证缺陷数据完整性
   ↓
[组件] 回调 handleDefectConfirm(newDefects)
   ↓
[主表单] 更新 defectsList 字段
   ↓
[界面] 关闭弹框，更新缺陷显示区域
```

### 2.6 检验结果提交流程

```
[用户] 点击"提交并下一项"按钮
   ↓
[组件] CurrentProjectCard.handleSubmit()
   ↓
[表单] Formily 表单验证
   ├─── 检验结果必填验证
   ├─── 不合格项目缺陷验证
   └─── 其他字段格式验证
   ↓
[系统] 构建API请求数据
   ├─── 映射前端枚举到后端枚举
   ├─── 处理测量值数据结构
   ├─── 格式化缺陷信息
   └─── 构建完整的请求体
   ↓
[API] QualityInspectionOrderExecuteAndNextAsync()
   ├─── 提交检验结果
   ├─── 更新项目状态  
   └─── 获取下一推荐项目
   ↓
[成功响应] 
   ├─── 显示成功提示消息
   ├─── 调用 onComplete 回调
   ├─── 更新本地项目状态
   └─── 重置当前表单
   ↓
[状态更新] handleProjectComplete()
   ├─── 更新 projects 状态
   ├─── 刷新执行进度信息
   ├─── 查找下一个待检验项目
   └─── 自动跳转或完成提示
   ↓
[界面更新]
   ├─── 项目导航状态更新
   ├─── 进度条和统计更新
   ├─── 切换到下一项目 (如果有)
   └─── 或显示完成页面
```

## 3. 数据流图

### 3.1 数据加载流程

```
URL参数 (orderId)
    ↓
API调用层
    ├─── QualityInspectionOrderGetByOneAsync
    ├─── QualityInspectionOrderGetProjectListAsync
    └─── QualityInspectionOrderGetExecutionProgressAsync
    ↓
数据转换层
    ├─── transformInspectionOrderDto() 
    ├─── 项目状态映射和排序
    └─── 进度计算
    ↓
React状态层
    ├─── orderInfo (检验单信息)
    ├─── projects (项目列表)  
    ├─── currentIndex (当前项目索引)
    └─── progress (执行进度)
    ↓
组件属性层
    ├─── InspectionOrderSummaryCard (检验单摘要)
    ├─── ProjectNavigation (项目导航)
    └─── CurrentProjectCard (当前项目)
    ↓
界面展示层
```

### 3.2 表单数据流

```
用户输入
    ↓
Formily表单管理
    ├─── inspectionResult (检验结果)
    ├─── remarks (检验备注)
    ├─── measurementResults (测量值数组)
    └─── defectsList (缺陷列表)
    ↓
数据验证层
    ├─── 必填字段验证
    ├─── 格式验证
    ├─── 业务规则验证
    └─── 关联字段验证
    ↓
API数据结构映射
    ├─── 前端枚举 → 后端枚举
    ├─── 表单字段 → DTO字段
    ├─── 嵌套对象构建
    └─── 数组数据处理
    ↓
后端API调用
    ↓
响应处理和状态更新
```

### 3.3 状态同步流程

```
前端状态变化
    ↓
本地状态更新 (setState)
    ↓
界面立即响应 (optimistic update)
    ↓
后端API调用
    ↓
API响应处理
    ├─── 成功：确认状态，刷新相关数据
    └─── 失败：回滚状态，显示错误信息
    ↓
全局状态刷新
    ├─── 项目状态更新
    ├─── 进度信息刷新
    └─── 导航状态同步
```

## 4. 响应式交互适配

### 4.1 PC端交互特点

```
交互模式: 鼠标 + 键盘
    ↓
布局特点: 双栏并排显示
    ├─── 左侧固定导航栏 (280px)
    └─── 右侧主内容区域 (flex)
    ↓
操作方式: 
    ├─── 侧边栏点击切换项目
    ├─── 主区域表单操作
    ├─── 底部导航按钮
    └─── 弹框模态操作
    ↓
快捷操作:
    ├─── 键盘导航支持
    ├─── 快捷键支持 (可扩展)
    └─── 批量操作优化
```

### 4.2 移动端交互适配

```
交互模式: 触摸屏操作
    ↓
布局特点: 单栏垂直布局
    ├─── 顶部工具栏 (固定)
    ├─── 主内容区域 (滚动)
    └─── 浮动操作按钮
    ↓
操作方式:
    ├─── 抽屉式侧边栏 (左滑或点击菜单)
    ├─── 顶部导航按钮 (上一项/下一项)
    ├─── 浮动按钮组 (快速操作)
    └─── 全屏弹框操作
    ↓
触摸优化:
    ├─── 按钮尺寸适配 (>44px)
    ├─── 触摸反馈动画
    ├─── 滑动手势支持
    └─── 防误触设计
```

## 5. 错误处理和边界情况

### 5.1 数据加载错误处理

```
API调用失败
    ↓
错误类型判断
    ├─── 网络错误 → 显示网络异常提示 + 重试按钮
    ├─── 权限错误 → 显示权限不足提示 + 返回链接  
    ├─── 数据错误 → 显示数据异常提示 + 刷新按钮
    └─── 服务错误 → 显示服务异常提示 + 联系客服
    ↓
用户体验优化
    ├─── 保持已加载的部分数据
    ├─── 提供降级功能
    ├─── 错误信息用户友好
    └─── 提供恢复操作路径
```

### 5.2 表单验证错误处理

```
用户提交表单
    ↓
前端验证
    ├─── 通过 → 继续API调用
    └─── 失败 → 显示验证错误信息
    ↓
API验证  
    ├─── 通过 → 操作成功
    └─── 失败 → 显示服务端错误
    ↓
错误反馈策略
    ├─── 字段级错误 → 红色边框 + 错误文本
    ├─── 表单级错误 → 顶部通知栏
    ├─── 全局错误 → Modal提示框
    └─── 操作指导 → 具体修改建议
```

### 5.3 网络异常处理

```
网络请求失败
    ↓
重试机制
    ├─── 自动重试 (最多3次)
    ├─── 指数退避延迟
    └─── 用户手动重试
    ↓
离线处理
    ├─── 检测网络状态
    ├─── 缓存关键数据
    ├─── 离线提示
    └─── 网络恢复自动同步
    ↓
用户体验
    ├─── Loading状态管理
    ├─── 超时提示
    ├─── 操作指导
    └─── 数据恢复机制
```

## 6. 性能优化策略

### 6.1 渲染性能优化

```
组件级优化
    ├─── React.memo() 防止不必要重渲染
    ├─── useMemo() 缓存计算结果
    ├─── useCallback() 缓存回调函数
    └─── 键值优化 避免列表重新创建
    ↓
状态更新优化
    ├─── 批量更新机制
    ├─── 防抖处理 (输入框)
    ├─── 节流处理 (滚动事件)
    └─── 延迟更新 (非关键状态)
    ↓
数据结构优化
    ├─── 扁平化数据结构
    ├─── 索引映射优化
    ├─── 分页加载
    └─── 虚拟滚动 (大列表)
```

### 6.2 网络请求优化

```
API调用优化
    ├─── 请求合并 (批量接口)
    ├─── 并行请求 (Promise.all)
    ├─── 缓存机制 (相同请求)
    └─── 取消机制 (组件卸载)
    ↓
数据缓存策略
    ├─── 内存缓存 (热数据)
    ├─── localStorage (持久化)
    ├─── sessionStorage (会话级)
    └─── 过期策略 (TTL)
    ↓
加载优化
    ├─── 懒加载 (非关键资源)
    ├─── 预加载 (预测用户行为)
    ├─── 增量加载 (大数据集)
    └─── 压缩优化 (Gzip)
```

## 7. 辅助功能和可用性

### 7.1 键盘导航支持

```
焦点管理
    ├─── Tab键顺序逻辑
    ├─── Shift+Tab反向导航  
    ├─── 焦点可视化指示
    └─── 焦点陷阱 (弹框)
    ↓
快捷键支持
    ├─── Enter 确认操作
    ├─── Escape 取消操作
    ├─── Arrow Keys 列表导航
    └─── Space 选择切换
    ↓
语义化结构
    ├─── 标题层级 (h1-h6)
    ├─── 区域标记 (main, nav, section)
    ├─── 表单标签关联
    └─── 按钮角色定义
```

### 7.2 屏幕阅读器支持

```
ARIA属性配置
    ├─── aria-label 元素描述
    ├─── aria-describedby 关联描述
    ├─── aria-expanded 展开状态
    └─── aria-live 动态更新通知
    ↓
语义化信息
    ├─── 状态变化通知
    ├─── 操作结果反馈
    ├─── 进度信息播报
    └─── 错误信息提示
    ↓
内容结构优化
    ├─── 逻辑阅读顺序
    ├─── 跳转链接提供
    ├─── 内容分组标记
    └─── 重复内容省略
```

## 8. 系统集成接口

### 8.1 后端API接口

```
核心接口映射:
├─── 检验单查询: QualityInspectionOrderGetByOneAsync
├─── 项目列表: QualityInspectionOrderGetProjectListAsync  
├─── 执行进度: QualityInspectionOrderGetExecutionProgressAsync
├─── 项目详情: QualityInspectionOrderGetProjectDetailsAsync
├─── 执行提交: QualityInspectionOrderExecuteAndNextAsync
├─── 标准查询: MaterialInspectionStandardGetListAsync
└─── 下一项推荐: QualityInspectionOrderGetNextProjectAsync

数据转换层:
├─── 前端枚举 ↔ 后端枚举映射
├─── DTO字段映射和格式化
├─── 嵌套对象扁平化处理  
└─── 数组数据结构转换
```

### 8.2 路由和导航集成

```
路由管理:
├─── 主执行页面: /appQms/inspectionOrders/execute/progressive
├─── 结果确认页面: /appQms/inspectionOrders/execute/summary
├─── 返回列表: 动态路由 (基于检验类型)
└─── KeepAlive缓存: 页面状态保持

参数传递:
├─── orderId: URL查询参数
├─── 项目状态: 组件状态传递
├─── 缓存数据: sessionStorage/localStorage
└─── 上下文数据: React Context
```

---

**文档版本**: 1.0  
**创建时间**: 2024-08-29  
**基于代码版本**: 当前最新版本  
**维护人员**: Claude Code Assistant

**关联文档**:
- [检验执行界面线框图文档](./inspection-execution-wireframes.md)
- [Formily表单开发规范](./development-standards/formily-selector-best-practices.md)