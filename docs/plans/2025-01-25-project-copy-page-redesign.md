# 项目复制页面重构设计方案

**日期**: 2025-01-25
**页面路径**: `/appPdm/ProjectManagement/ProjectList/Copy?id={projectId}`
**设计目标**: 将现有的基于Tab的编辑页面重构为垂直布局的项目执行工作台

## 一、整体架构

### 1.1 页面模式
混合模式：
- 基本信息、团队、文件：只读展示
- 任务、风险、问题：可编辑管理（添加/编辑/删除）
- 里程碑管理：可完成里程碑操作

### 1.2 页面布局（自上而下）

```
┌─────────────────────────────────────────────────┐
│ [返回] 复制项目: {项目名称}     [完成里程碑]    │
├─────────────────────────────────────────────────┤
│                                                 │
│  里程碑时间轴（SimpleMilestoneTimeline）        │
│  ○────○────○────●────○  (点击切换当前里程碑)   │
│                                                 │
├─────────────────────────────────────────────────┤
│  项目任务列表（当前里程碑）                      │
│  [+ 添加任务]                                   │
│  ┌───────────────────────────────────────┐     │
│  │ 任务名称 │ 类型 │ 负责人 │ 状态 │ 操作│     │
│  └───────────────────────────────────────┘     │
├─────────────────────────────────────────────────┤
│  项目风险列表（当前里程碑）                      │
│  [+ 添加风险]                                   │
│  ┌───────────────────────────────────────┐     │
│  │ 风险名称 │ 优先级 │ 处理人 │ 操作   │     │
│  └───────────────────────────────────────┘     │
├─────────────────────────────────────────────────┤
│  项目问题列表（当前里程碑）                      │
│  [+ 添加问题]                                   │
│  ┌───────────────────────────────────────┐     │
│  │ 问题名称 │ 严重程度 │ 处理人 │ 操作 │     │
│  └───────────────────────────────────────┘     │
├─────────────────────────────────────────────────┤
│  基本信息                                       │
│  ┌─ 当前里程碑信息 ──────────────────┐         │
│  │ 里程碑：需求分析                  │         │
│  │ 状态：进行中  负责人：张三        │         │
│  │ 任务进度：60% (3/5个任务完成)     │         │
│  └───────────────────────────────────┘         │
│                                                 │
│  ┌─ 项目基本信息（只读）──────────────┐         │
│  │ 项目编码：PRJ-2024-001            │         │
│  │ 项目名称：智能制造系统            │         │
│  │ 项目经理：李四                    │         │
│  └───────────────────────────────────┘         │
│                                                 │
│  ┌─ 团队成员（只读）──────────────────┐         │
│  │ 张三 - 开发工程师                 │         │
│  │ 李四 - 项目经理                   │         │
│  └───────────────────────────────────┘         │
│                                                 │
│  ┌─ 项目文件（只读）──────────────────┐         │
│  │ 需求文档.docx  [下载]             │         │
│  │ 设计方案.pdf   [下载]             │         │
│  └───────────────────────────────────┘         │
│                                                 │
│  ┌─ 审批流程图（条件显示）────────────┐         │
│  │ [基本信息] [审批流图]              │         │
│  │ (当前里程碑有审批流时显示Tab)      │         │
│  └───────────────────────────────────┘         │
└─────────────────────────────────────────────────┘
```

## 二、核心功能设计

### 2.1 状态管理

```typescript
interface PageState {
  project: any;              // 项目完整数据
  milestones: any[];         // 里程碑列表
  selectedMilestone: any;    // 当前选中的里程碑
  loading: boolean;          // 页面加载状态
  completing: boolean;       // 完成里程碑加载状态
}
```

### 2.2 数据加载流程

```typescript
const loadProjectData = async () => {
  setLoading(true);
  try {
    // 1. 加载项目完整数据
    const projectData = await ProjectGetAsync({ id: projectId });
    setProject(projectData);

    // 2. 处理里程碑数据
    // - 转换parentMilestones对象数组为parentCodes名称数组
    // - 按sequence排序
    const processedMilestones = processMilestones(projectData.milestones);
    setMilestones(processedMilestones);

    // 3. 默认选中第一个未完成的里程碑
    const firstIncomplete = processedMilestones.find(
      m => m.status !== 2 // status=2表示已完成
    );
    setSelectedMilestone(firstIncomplete || processedMilestones[0]);

  } catch (error) {
    message.error('加载项目数据失败');
  } finally {
    setLoading(false);
  }
};
```

### 2.3 里程碑切换

**交互方式**: 点击时间轴节点切换

**实现逻辑**:
```typescript
const handleMilestoneClick = (milestone: any) => {
  setSelectedMilestone(milestone);
  // 列表组件会自动响应selectedMilestone变化重新加载数据
};
```

**传递给SimpleMilestoneTimeline的props**:
```typescript
<SimpleMilestoneTimeline
  milestones={milestones}
  onMilestoneClick={handleMilestoneClick}
  selectedMilestoneId={selectedMilestone?.id}
/>
```

### 2.4 完成里程碑功能

**按钮位置**: 页面顶部工具栏右侧

**显示条件**: `selectedMilestone.status !== 2`（未完成状态）

**完成逻辑**:
```typescript
const handleCompleteMilestone = async () => {
  if (!selectedMilestone) return;

  // 1. 检查任务完成率
  const completionRate = selectedMilestone.taskCompletionRate || 0;

  if (completionRate < 100) {
    // 2. 任务未100%完成，显示确认对话框
    Modal.confirm({
      title: '确认完成里程碑？',
      content: `当前里程碑的任务完成率为 ${completionRate.toFixed(0)}%，确定要完成吗？`,
      onOk: async () => {
        await completeMilestone();
      }
    });
  } else {
    // 3. 任务已100%完成，直接完成
    await completeMilestone();
  }
};

const completeMilestone = async () => {
  setCompleting(true);
  try {
    // 调用完成里程碑API
    await ProjectMilestoneCompleteAsync({ id: selectedMilestone.id });
    message.success('里程碑已完成');

    // 刷新数据
    await loadProjectData();

    // loadProjectData会自动选中下一个未完成的里程碑
  } catch (error) {
    message.error('完成里程碑失败');
  } finally {
    setCompleting(false);
  }
};
```

### 2.5 任务/风险/问题列表

**组件复用**: 使用Detail页面的现有组件
- `MilestoneTaskList` - 任务列表
- `MilestoneRiskList` - 风险列表
- `MilestoneIssueList` - 问题列表

**显示范围**: 仅显示当前里程碑的数据

**传递props**:
```typescript
<MilestoneTaskList
  key={`task-${selectedMilestone?.id}`}
  projectId={projectId}
  milestoneId={selectedMilestone?.id}
/>

<MilestoneRiskList
  key={`risk-${selectedMilestone?.id}`}
  projectId={projectId}
  projectCode={project?.projectCode}
  milestoneId={selectedMilestone?.id}
/>

<MilestoneIssueList
  key={`issue-${selectedMilestone?.id}`}
  projectId={projectId}
  milestoneId={selectedMilestone?.id}
/>
```

**添加功能**:
- 每个列表的工具栏提供"添加"按钮
- 添加时自动关联到`selectedMilestone.id`
- 添加成功后刷新列表

## 三、基本信息区域设计

### 3.1 当前里程碑信息卡片

**展示位置**: 基本信息区域顶部

**展示内容**:
```typescript
<Card title="当前里程碑信息" style={{ marginBottom: 16 }}>
  <Descriptions column={2} bordered size="small">
    <Descriptions.Item label="里程碑名称">
      {selectedMilestone.milestoneName}
    </Descriptions.Item>
    <Descriptions.Item label="状态">
      <Tag color={statusColor}>{statusText}</Tag>
    </Descriptions.Item>
    <Descriptions.Item label="负责人">
      {selectedMilestone.responsibleName}
    </Descriptions.Item>
    <Descriptions.Item label="是否需要审批">
      {selectedMilestone.isApproval ? <Tag color="orange">需要审批</Tag> : <Tag>无需审批</Tag>}
    </Descriptions.Item>
    <Descriptions.Item label="计划开始时间">
      {selectedMilestone.plannedStartDate}
    </Descriptions.Item>
    <Descriptions.Item label="计划结束时间">
      {selectedMilestone.plannedEndDate}
    </Descriptions.Item>
    <Descriptions.Item label="任务完成进度" span={2}>
      <div>已完成 {selectedMilestone.completedTaskCount} / 总计 {selectedMilestone.totalTaskCount} 个任务</div>
      <Progress percent={selectedMilestone.taskCompletionRate} />
    </Descriptions.Item>
  </Descriptions>
</Card>
```

### 3.2 项目基本信息

**组件复用**: 使用 `ProjectBasicInfo` 组件

**展示模式**: 只读展示

```typescript
<Card title="项目基本信息" style={{ marginBottom: 16 }}>
  <ProjectBasicInfo project={project} />
</Card>
```

### 3.3 团队成员和文件

**展示方式**: 只读列表

**团队成员**:
```typescript
<Card title="团队成员" style={{ marginBottom: 16 }}>
  <Table
    dataSource={project.teamMembers}
    columns={[
      { title: '成员姓名', dataIndex: 'userName' },
      { title: '项目角色', dataIndex: 'projectRoleName' },
      { title: '备注', dataIndex: 'remark' }
    ]}
    pagination={false}
    size="small"
  />
</Card>
```

**项目文件**:
```typescript
<Card title="项目文件">
  <List
    dataSource={project.documents}
    renderItem={doc => (
      <List.Item
        actions={[
          doc.blobName && <Button size="small" icon={<DownloadOutlined />}>下载</Button>
        ]}
      >
        <List.Item.Meta
          avatar={<FileOutlined />}
          title={doc.documentName}
          description={doc.type === 'File' ? '文件' : '链接'}
        />
      </List.Item>
    )}
  />
</Card>
```

### 3.4 审批流Tab（条件显示）

**显示条件**: `selectedMilestone.workflowDefinitionId` 存在

**无审批流时**: 直接展示上述内容，不显示Tab组件

**有审批流时**: 使用Tabs组件
```typescript
{selectedMilestone?.workflowDefinitionId ? (
  <Tabs>
    <TabPane tab="基本信息" key="basic">
      {/* 当前里程碑信息 + 项目基本信息 + 团队成员 + 文件 */}
    </TabPane>
    <TabPane tab="审批流图" key="workflow">
      {/* 工作流可视化组件 */}
      <WorkflowVisualization
        workflowDefinitionId={selectedMilestone.workflowDefinitionId}
      />
    </TabPane>
  </Tabs>
) : (
  <div>
    {/* 直接展示：当前里程碑信息 + 项目基本信息 + 团队成员 + 文件 */}
  </div>
)}
```

## 四、UI细节规范

### 4.1 布局间距
- 各卡片之间间距: 16px (`style={{ marginBottom: 16 }}`)
- 卡片内部padding: 使用Ant Design默认值
- 页面整体padding: Card组件默认处理

### 4.2 加载状态
```typescript
<Spin spinning={loading}>
  {/* 整个页面内容 */}
</Spin>
```

### 4.3 空状态处理
- 无里程碑: `<Empty description="暂无里程碑数据" />`
- 无任务/风险/问题: 列表组件内部处理空状态

### 4.4 按钮状态

**完成里程碑按钮**:
- 类型: `type="primary"`
- 图标: `<CheckCircleOutlined />`
- 禁用条件: `completing || selectedMilestone.status === 2`
- 显示条件: `selectedMilestone.status !== 2`

## 五、边界情况处理

### 5.1 所有里程碑已完成
- 完成按钮不显示
- 时间轴所有节点标记为完成状态（绿色）
- 默认选中最后一个里程碑

### 5.2 切换里程碑时的数据同步
- 使用 `key` 属性强制刷新列表组件
- `key={task-${selectedMilestone?.id}}`确保数据正确

### 5.3 并发操作保护
- 完成里程碑时，设置 `completing=true`
- 禁用完成按钮防止重复提交

### 5.4 权限控制
- 任务/风险/问题的添加/编辑/删除按钮根据权限显示
- 使用 `<Access accessible={canUpdate}>` 包装

### 5.5 用户体验优化
- 切换里程碑时平滑滚动到顶部: `window.scrollTo({ top: 0, behavior: 'smooth' })`
- 完成里程碑后自动切换到下一个未完成里程碑
- 加载时保持页面结构，避免布局跳动

## 六、技术实现要点

### 6.1 组件复用策略
- 复用 `SimpleMilestoneTimeline` 组件（来自Detail页面）
- 复用 `MilestoneTaskList/RiskList/IssueList` 组件（来自Detail页面）
- 复用 `ProjectBasicInfo` 组件（来自Detail页面）

### 6.2 数据处理
- 里程碑数据处理逻辑复用Edit页面的转换逻辑
- 任务/风险/问题通过 `milestoneId` 参数筛选

### 6.3 API调用
- `ProjectGetAsync` - 获取项目完整数据
- `ProjectMilestoneCompleteAsync` - 完成里程碑

## 七、开发任务清单

### 阶段1：页面结构重构
- [ ] 移除现有的FormTab结构
- [ ] 创建垂直布局的主体结构
- [ ] 添加页面头部（返回按钮 + 标题 + 完成里程碑按钮）

### 阶段2：里程碑功能
- [ ] 集成SimpleMilestoneTimeline组件
- [ ] 实现里程碑切换逻辑
- [ ] 实现完成里程碑功能（带确认提示）

### 阶段3：列表组件集成
- [ ] 集成MilestoneTaskList组件
- [ ] 集成MilestoneRiskList组件
- [ ] 集成MilestoneIssueList组件
- [ ] 确保列表支持添加/编辑/删除操作

### 阶段4：基本信息区域
- [ ] 实现当前里程碑信息卡片
- [ ] 集成ProjectBasicInfo组件
- [ ] 实现团队成员只读展示
- [ ] 实现文件列表只读展示
- [ ] 实现审批流Tab条件显示逻辑

### 阶段5：测试和优化
- [ ] 测试里程碑切换功能
- [ ] 测试完成里程碑功能
- [ ] 测试任务/风险/问题的CRUD操作
- [ ] 测试边界情况
- [ ] 优化加载状态和用户体验

## 八、验收标准

1. ✅ 页面布局符合设计：自上而下排列，无Tab
2. ✅ 里程碑切换流畅，点击时间轴节点正确切换
3. ✅ 完成里程碑功能正常，任务未100%完成时有确认提示
4. ✅ 任务/风险/问题列表正确显示当前里程碑数据
5. ✅ 任务/风险/问题可以正常添加/编辑/删除
6. ✅ 基本信息区域正确展示当前里程碑信息
7. ✅ 团队和文件以只读方式展示
8. ✅ 有审批流时显示Tab，无审批流时不显示Tab
9. ✅ 所有边界情况处理正确
10. ✅ 权限控制正常工作
