# 问题执行流程重构设计文档

> 创建日期：2025-01-11
> 设计目标：统一问题执行和任务执行的交互方式，支持多周期执行和工作流审批

---

## 一、需求概述

### 1.1 核心需求

1. **执行交互统一化**：问题执行要和任务执行一致，点击"执行"按钮弹出抽屉进行所有操作
2. **支持附件和备注**：所有执行操作（指派、确认接收、开始处理、解决、关闭等）都支持上传附件和备注
3. **界面简化**：列表页和详情页移除所有状态操作按钮，只保留基础的编辑、删除、执行按钮
4. **工作流审批集成**：根据问题类型配置决定是否需要审批流程，需要审批的问题"解决"按钮变为"提交审批"
5. **关联任务功能**：问题表单和详情页支持关联任务，可以点击跳转
6. **多周期执行**：问题可以被多次激活和执行，每次激活创建新的执行周期

### 1.2 设计原则

- 前后端协同：前端和后端需要同步开发，数据结构变更需要后端先行
- 用户体验一致：问题执行流程与任务执行流程保持一致
- 权限精细化：不同角色在不同状态下的操作权限严格控制
- 历史可追溯：执行记录按周期分组展示，清晰呈现问题的完整生命周期

---

## 二、数据结构设计

### 2.1 后端数据结构变更

#### 2.1.1 问题类型配置表（IssueType）新增字段

```csharp
public class IssueType
{
    // ... 现有字段 ...

    /// <summary>
    /// 是否需要审批
    /// </summary>
    public bool RequiresApproval { get; set; }

    /// <summary>
    /// 关联的工作流定义ID（可选）
    /// </summary>
    public Guid? WorkflowDefinitionId { get; set; }
}
```

**说明：**
- `RequiresApproval = true` 时，问题解决需要走审批流程
- `WorkflowDefinitionId` 指定具体的审批工作流

#### 2.1.2 问题状态枚举更新

```csharp
/// <summary>
/// 问题状态
/// </summary>
public enum IssueStatus
{
    /// <summary>
    /// 打开（未指派）
    /// </summary>
    Open = 0,

    /// <summary>
    /// 待接收（已指派未接收）- 🆕 新增
    /// </summary>
    PendingReceive = 5,

    /// <summary>
    /// 处理中
    /// </summary>
    InProgress = 10,

    /// <summary>
    /// 已接收（已接收未开始）- 🆕 新增
    /// </summary>
    Received = 15,

    /// <summary>
    /// 已解决
    /// </summary>
    Resolved = 20,

    /// <summary>
    /// 已关闭
    /// </summary>
    Closed = 30,

    /// <summary>
    /// 已取消
    /// </summary>
    Cancelled = 40,
}
```

**状态流转规则：**
1. 创建/激活 → 打开(Open)
2. 打开 → 指派处理人 → 待接收(PendingReceive)
3. 待接收 → 确认接收 → 已接收(Received)
4. 已接收 → 开始处理 → 处理中(InProgress)
5. 处理中 → 解决/提交审批 → 已解决(Resolved)
6. 已解决 → 关闭 → 已关闭(Closed)
7. 已关闭 → 激活 → 打开(Open, 新周期)

**特殊规则：**
- 处理中状态重新指派：状态保持处理中，只更换处理人
- 已解决状态重新指派：状态保持已解决，指派复核人

#### 2.1.3 问题表（ProjectIssue）新增字段

```csharp
public class ProjectIssue
{
    // ... 现有字段 ...

    /// <summary>
    /// 当前执行周期编号
    /// </summary>
    public int CurrentCycleNumber { get; set; } = 1;

    /// <summary>
    /// 总执行次数
    /// </summary>
    public int TotalCycles { get; set; } = 1;

    /// <summary>
    /// 关联的任务ID列表（JSON字符串或导航属性）
    /// </summary>
    public string? RelatedTaskIds { get; set; }
}
```

#### 2.1.4 问题执行周期表（IssueExecutionCycle）- 🆕 新建表

```csharp
/// <summary>
/// 问题执行周期
/// </summary>
public class IssueExecutionCycle : AuditedAggregateRoot<Guid>
{
    /// <summary>
    /// 问题ID
    /// </summary>
    public Guid IssueId { get; set; }

    /// <summary>
    /// 周期编号（1, 2, 3...）
    /// </summary>
    public int CycleNumber { get; set; }

    /// <summary>
    /// 当前周期状态
    /// </summary>
    public IssueStatus Status { get; set; }

    /// <summary>
    /// 本周期开始时间
    /// </summary>
    public DateTime StartTime { get; set; }

    /// <summary>
    /// 本周期结束时间
    /// </summary>
    public DateTime? EndTime { get; set; }

    /// <summary>
    /// 本周期处理人编码
    /// </summary>
    public string? HandlerCode { get; set; }

    /// <summary>
    /// 本周期处理人名称
    /// </summary>
    public string? HandlerName { get; set; }

    /// <summary>
    /// 本周期解决方案
    /// </summary>
    public string? Resolution { get; set; }

    /// <summary>
    /// 本周期关闭原因
    /// </summary>
    public string? CloseReason { get; set; }

    /// <summary>
    /// 导航属性：问题
    /// </summary>
    public virtual ProjectIssue Issue { get; set; }
}
```

#### 2.1.5 问题执行记录表（IssueExecutionRecord）字段调整

```csharp
public class IssueExecutionRecord
{
    // ... 现有字段 ...

    /// <summary>
    /// 关联的执行周期编号 - 🆕 新增
    /// </summary>
    public int CycleNumber { get; set; }

    /// <summary>
    /// 操作备注 - 🆕 新增
    /// </summary>
    public string? Remark { get; set; }

    /// <summary>
    /// 附件列表（JSON字符串：[{name, url, size}...]）- 🆕 新增
    /// </summary>
    public string? Attachments { get; set; }
}
```

### 2.2 后端接口调整

#### 2.2.1 所有执行操作接口添加附件和备注参数

```csharp
// 指派处理人
public class AssignIssueDto
{
    public Guid IssueId { get; set; }
    public string HandlerCode { get; set; }
    public string? Remark { get; set; }  // 🆕 新增
    public List<AttachmentDto>? Attachments { get; set; }  // 🆕 新增
}

// 确认接收
public class ConfirmReceiveIssueDto
{
    public Guid IssueId { get; set; }
    public string? Remark { get; set; }  // 🆕 新增
    public List<AttachmentDto>? Attachments { get; set; }  // 🆕 新增
}

// 开始处理
public class StartProcessingIssueDto
{
    public Guid IssueId { get; set; }
    public string? Remark { get; set; }  // 🆕 新增
    public List<AttachmentDto>? Attachments { get; set; }  // 🆕 新增
}

// 解决问题
public class ResolveIssueDto
{
    public Guid IssueId { get; set; }
    public string Resolution { get; set; }  // 解决方案
    public string? Remark { get; set; }  // 🆕 新增
    public List<AttachmentDto>? Attachments { get; set; }  // 🆕 新增
}

// 关闭问题
public class CloseIssueDto
{
    public Guid IssueId { get; set; }
    public string? CloseReason { get; set; }
    public string? Remark { get; set; }  // 🆕 新增
    public List<AttachmentDto>? Attachments { get; set; }  // 🆕 新增
}

// 激活问题
public class ActivateIssueDto
{
    public Guid IssueId { get; set; }
    public string? Remark { get; set; }  // 🆕 新增
    public List<AttachmentDto>? Attachments { get; set; }  // 🆕 新增
}

// 附件DTO
public class AttachmentDto
{
    public string Name { get; set; }
    public string Url { get; set; }
    public long Size { get; set; }
}
```

#### 2.2.2 新增接口

```csharp
/// <summary>
/// 获取问题的执行周期列表
/// </summary>
Task<List<IssueExecutionCycleDto>> GetExecutionCyclesAsync(Guid issueId);

/// <summary>
/// 获取指定周期的执行记录
/// </summary>
Task<List<IssueExecutionRecordDto>> GetExecutionRecordsByCycleAsync(Guid issueId, int cycleNumber);

/// <summary>
/// 获取问题关联的任务列表
/// </summary>
Task<List<ProjectTaskDto>> GetRelatedTasksAsync(Guid issueId);

/// <summary>
/// 更新问题关联的任务
/// </summary>
Task UpdateRelatedTasksAsync(Guid issueId, List<Guid> taskIds);
```

---

## 三、前端组件设计

### 3.1 组件文件结构

```
src/pages/appPdm/ProjectManagement/IssueList/
├── index.tsx                           # 列表页（简化操作列）
├── detail.tsx                          # 详情页（简化操作区）
├── form.tsx                            # 表单页（添加关联任务选择）
├── execute.tsx                         # 工作流审批页（已存在）
├── components/
│   ├── IssueExecutionDialog.tsx        # 🆕 问题执行抽屉
│   └── ProjectIssueFormDialog.tsx      # 问题表单对话框（已存在）
├── _components/
│   ├── AssignDialog.tsx                # 指派对话框（改造）
│   ├── ConfirmReceiveDialog.tsx        # 确认接收对话框（改造）
│   ├── StartProcessingDialog.tsx       # 🆕 开始处理对话框（新建）
│   ├── ResolveDialog.tsx               # 解决对话框（改造）
│   ├── CloseDialog.tsx                 # 关闭对话框（改造）
│   ├── ActivateDialog.tsx              # 🆕 激活对话框（新建）
│   ├── ConvertToTaskDialog.tsx         # 转任务对话框（已存在）
│   ├── ExecutionCycleTimeline.tsx      # 🆕 执行周期时间线（新建）
│   ├── ExecutionTimeline.tsx           # 执行记录时间线（已存在）
│   ├── TaskRelationSelector.tsx        # 🆕 任务关联选择器（新建）
│   └── AddCommentDialog.tsx            # 添加备注对话框（已存在）
├── _utils/
│   ├── issueEnums.ts                   # 问题枚举定义（更新）
│   ├── statusUtils.ts                  # 状态判断工具（更新）
│   └── permissionUtils.ts              # 权限判断工具（已存在）
```

### 3.2 核心组件设计

#### 3.2.1 IssueExecutionDialog（问题执行抽屉）

**功能说明：**
- 抽屉包含三个标签页：问题信息、执行操作、执行记录
- 在列表页和详情页都可以通过"执行"按钮触发
- 根据当前状态和权限动态显示可用操作

**组件接口：**
```typescript
interface IssueExecutionDialogProps {
  issueId: string;          // 问题ID
  onRefresh: () => void;    // 刷新回调
  open: boolean;            // 是否打开
  onClose: () => void;      // 关闭回调
}
```

**标签页结构：**

1. **问题信息标签页**
   - 显示问题基本信息（编码、名称、状态、项目等）
   - 显示当前执行周期信息（第X次执行、周期状态、处理人）
   - 只读展示，不可编辑

2. **执行操作标签页**
   - 根据状态和权限显示可用的操作按钮
   - 每个操作按钮点击后弹出对应的对话框
   - 操作成功后自动刷新数据并切换到执行记录标签页

3. **执行记录标签页**
   - 按执行周期分组展示所有执行记录
   - 每条记录显示：时间、操作人、操作类型、备注、附件
   - 支持查看和下载附件

**操作按钮显示规则：**

| 操作 | 显示条件 | 权限要求 |
|-----|---------|---------|
| 指派 | status=打开 OR status=处理中 OR status=已解决 | 创建人或当前处理人 |
| 确认接收 | status=待接收 | 指定的处理人 |
| 开始处理 | status=已接收 | 处理人 |
| 解决/提交审批 | status=处理中 | 处理人 |
| 关闭 | status=已解决 | 创建人或处理人 |
| 激活 | status=已关闭 | 创建人 |
| 转任务 | status!=已关闭 | 创建人或处理人 |

#### 3.2.2 ExecutionCycleTimeline（执行周期时间线）

**功能说明：**
- 按执行周期分组展示执行记录
- 每个周期显示周期编号、状态、起止时间
- 展开每个周期可以看到该周期的所有操作记录

**数据结构：**
```typescript
interface ExecutionCycle {
  cycleNumber: number;          // 周期编号
  status: IssueStatus;          // 周期状态
  startTime: string;            // 开始时间
  endTime?: string;             // 结束时间
  handlerName?: string;         // 处理人
  records: ExecutionRecord[];   // 执行记录列表
}

interface ExecutionRecord {
  id: string;
  actionType: string;           // 操作类型
  operatorName: string;         // 操作人
  operationTime: string;        // 操作时间
  remark?: string;              // 备注
  attachments?: Attachment[];   // 附件列表
}

interface Attachment {
  name: string;                 // 文件名
  url: string;                  // 下载地址
  size: number;                 // 文件大小
}
```

**展示样式：**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  第3次执行 (当前) [进行中]
  2025-01-10 10:00 - 至今
  处理人: 李四
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ├─ 2025-01-10 10:00 张三 激活问题
  │  备注：问题再次出现，需要重新处理
  │  📎 附件：screenshot.png (2.5MB)
  ├─ 2025-01-10 10:30 李四 确认接收
  └─ 2025-01-10 11:00 李四 开始处理
     备注：正在排查原因

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  第2次执行 [已关闭]
  2025-01-05 09:00 - 2025-01-08 17:00
  处理人: 李四
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ├─ 2025-01-05 09:00 张三 激活问题
  ├─ 2025-01-05 10:00 李四 确认接收
  ├─ 2025-01-05 11:00 李四 开始处理
  ├─ 2025-01-06 14:00 李四 解决问题
  │  备注：已修复配置错误
  │  📎 附件：fix-report.pdf (1.2MB)
  └─ 2025-01-08 17:00 张三 关闭问题
     备注：确认问题已解决
```

#### 3.2.3 执行操作对话框改造

所有执行操作对话框（指派、确认接收、开始处理、解决、关闭、激活）都需要添加：

1. **备注输入框**
   - 多行文本输入
   - 字段名：`remark`
   - 可选字段

2. **附件上传组件**
   - 使用 Ant Design 的 Upload 组件
   - 支持多文件上传
   - 显示文件名、大小、上传进度
   - 字段名：`attachments`
   - 可选字段

**表单结构示例（以解决对话框为例）：**
```typescript
// ResolveDialog.tsx
const schema = {
  type: 'object',
  properties: {
    resolution: {
      type: 'string',
      title: '解决方案',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        placeholder: '请输入解决方案',
        rows: 4,
      },
      'x-validator': [{ required: true, message: '请输入解决方案' }],
    },
    remark: {
      type: 'string',
      title: '备注',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        placeholder: '可选：添加备注信息',
        rows: 3,
      },
    },
    attachments: {
      type: 'array',
      title: '附件',
      'x-decorator': 'FormItem',
      'x-component': 'Upload',
      'x-component-props': {
        multiple: true,
        maxCount: 10,
        action: '/api/file/upload',  // 文件上传接口
      },
    },
  },
};
```

#### 3.2.4 TaskRelationSelector（任务关联选择器）

**功能说明：**
- 用于选择关联的任务
- 支持按项目筛选任务
- 支持多选
- 显示任务编码和名称

**组件接口：**
```typescript
interface TaskRelationSelectorProps {
  value?: string[];         // 已选任务ID列表
  onChange?: (value: string[]) => void;  // 值变化回调
  projectCode?: string;     // 限定项目编码（可选）
  disabled?: boolean;       // 是否禁用
}
```

**使用场景：**
1. 问题表单页（form.tsx）：创建或编辑问题时选择关联任务
2. 问题详情页（detail.tsx）：查看关联任务列表，点击可跳转

### 3.3 页面改造

#### 3.3.1 列表页（index.tsx）操作列简化

**保留的按钮：**
- 查看详情（眼睛图标）
- 关注/取消关注（心形图标）
- 编辑（铅笔图标）
- 执行（播放图标）- 🆕 新增
- 删除（删除图标）

**移除的按钮：**
- 确认接收
- 开始处理
- 解决
- 关闭
- 重新激活

**代码示例：**
```tsx
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const [executionDialogOpen, setExecutionDialogOpen] = useState(false);

  return (
    <Space>
      {/* 查看详情 */}
      <Button
        size="small"
        icon={<EyeOutlined />}
        type="link"
        onClick={() => navigate(`/appPdm/ProjectManagement/IssueList/detail?id=${data.id}`)}
      />

      {/* 关注 */}
      <Button
        size="small"
        icon={isWatching ? <HeartFilled /> : <HeartOutlined />}
        type="link"
        onClick={handleWatchToggle}
      />

      {/* 编辑 */}
      <Access accessible={canUpdate}>
        <ProjectIssueFormDialog
          entityId={data.id}
          onAfterSubmit={onRefresh}
          buttonProps={{ icon: <EditOutlined />, type: 'link' }}
        />
      </Access>

      {/* 执行 - 🆕 新增 */}
      <Access accessible={canUpdate}>
        <Button
          size="small"
          icon={<PlayCircleOutlined />}
          type="link"
          title="执行"
          onClick={() => setExecutionDialogOpen(true)}
        />
      </Access>

      {/* 删除 */}
      <Access accessible={canDelete}>
        <DeleteConfirm onConfirm={() => handleDelete(data.id)}>
          <Button size="small" icon={<DeleteOutlined />} type="link" />
        </DeleteConfirm>
      </Access>

      {/* 执行抽屉 */}
      <IssueExecutionDialog
        issueId={data.id}
        open={executionDialogOpen}
        onClose={() => setExecutionDialogOpen(false)}
        onRefresh={onRefresh}
      />
    </Space>
  );
};
```

#### 3.3.2 详情页（detail.tsx）操作区简化

**保留的按钮：**
- 返回
- 编辑
- 删除
- 执行 - 🆕 新增

**移除的按钮：**
- 指派
- 确认
- 解决
- 关闭
- 激活
- 转任务

**新增的显示内容：**
- 关联任务列表（显示在问题详情卡片中）
- 点击任务编码可跳转到任务详情

**代码示例：**
```tsx
const IssueDetail: React.FC<any> = () => {
  const [executionDialogOpen, setExecutionDialogOpen] = useState(false);
  const [relatedTasks, setRelatedTasks] = useState<any[]>([]);

  // 加载关联任务
  useEffect(() => {
    if (issueData?.id) {
      loadRelatedTasks();
    }
  }, [issueData?.id]);

  return (
    <div>
      {/* 基本信息卡片 */}
      <Card
        title="问题详情"
        extra={
          <Space>
            <Button onClick={() => history.goBack()}>返回</Button>
            <Access accessible={hasUpdatePermission}>
              <Button icon={<EditOutlined />} onClick={handleEdit}>编辑</Button>
            </Access>
            <Access accessible={hasDeletePermission}>
              <DeleteConfirm onConfirm={handleDelete}>
                <Button danger icon={<DeleteOutlined />}>删除</Button>
              </DeleteConfirm>
            </Access>
            <Button
              type="primary"
              icon={<PlayCircleOutlined />}
              onClick={() => setExecutionDialogOpen(true)}
            >
              执行
            </Button>
          </Space>
        }
      >
        <Descriptions column={2} bordered>
          {/* ... 其他字段 ... */}

          {/* 关联任务 - 🆕 新增 */}
          <Descriptions.Item label="关联任务" span={2}>
            {relatedTasks.length > 0 ? (
              <Space>
                {relatedTasks.map(task => (
                  <Button
                    key={task.id}
                    type="link"
                    onClick={() => navigate(`/appPdm/ProjectManagement/TaskList/detail?id=${task.id}`)}
                  >
                    {task.taskCode} - {task.taskName}
                  </Button>
                ))}
              </Space>
            ) : '-'}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 执行记录时间线 */}
      <ExecutionCycleTimeline issueId={issueData?.id} />

      {/* 执行抽屉 */}
      <IssueExecutionDialog
        issueId={issueData?.id}
        open={executionDialogOpen}
        onClose={() => setExecutionDialogOpen(false)}
        onRefresh={loadIssueData}
      />
    </div>
  );
};
```

#### 3.3.3 表单页（form.tsx）添加关联任务

**使用 DynamicSchema 方式：**

需要在表单 Schema 中添加关联任务字段：

```typescript
// src/dynamicSchemas/builtin/projectIssue.ts 或者
// src/pages/appPdm/ProjectManagement/IssueList/_dynamicSchemas/issueForm.ts

{
  relatedTaskIds: {
    type: 'array',
    title: '关联任务',
    'x-decorator': 'FormItem',
    'x-component': 'TaskRelationSelector',
    'x-component-props': {
      projectCode: '{{$values.projectCode}}',  // 根据所属项目筛选任务
    },
  },
}
```

**或者直接在表单组件中添加：**

```tsx
// form.tsx
import TaskRelationSelector from './_components/TaskRelationSelector';

// 在表单中添加
<FormItem label="关联任务">
  <TaskRelationSelector
    value={formData.relatedTaskIds}
    onChange={(value) => setFormData({ ...formData, relatedTaskIds: value })}
    projectCode={formData.projectCode}
  />
</FormItem>
```

---

## 四、工作流审批集成

### 4.1 审批流程逻辑

**判断是否需要审批：**
1. 获取问题的 `issueTypeId`
2. 查询问题类型的 `requiresApproval` 字段
3. 如果 `requiresApproval = true`，解决问题时启动审批流程

**审批流程：**
```
处理人点击"提交审批"
    ↓
创建工作流实例（使用 issueType.workflowDefinitionId）
    ↓
问题状态保持"处理中"，等待审批
    ↓
审批通过 → 问题状态变为"已解决"
    ↓
审批拒绝 → 问题状态保持"处理中"，处理人继续处理
```

### 4.2 前端实现

**ResolveDialog 组件调整：**

```tsx
// ResolveDialog.tsx
const ResolveDialog: React.FC<ResolveDialogProps> = ({
  issueId,
  requiresApproval,  // 🆕 是否需要审批
  onSuccess,
}) => {
  const handleSubmit = async (values: any) => {
    if (requiresApproval) {
      // 提交审批
      await ProjectIssueSubmitForApprovalAsync({
        issueId,
        resolution: values.resolution,
        remark: values.remark,
        attachments: values.attachments,
      });
      message.success('已提交审批');
    } else {
      // 直接解决
      await ProjectIssueResolveAsync({
        issueId,
        resolution: values.resolution,
        remark: values.remark,
        attachments: values.attachments,
      });
      message.success('问题已解决');
    }
    onSuccess();
  };

  return (
    <FormDialog>
      <Button type="primary">
        {requiresApproval ? '提交审批' : '解决'}
      </Button>
    </FormDialog>
  );
};
```

**IssueExecutionDialog 中的调用：**

```tsx
// IssueExecutionDialog.tsx
const IssueExecutionDialog: React.FC<IssueExecutionDialogProps> = ({ issueId }) => {
  const [issueData, setIssueData] = useState<any>(null);
  const [issueType, setIssueType] = useState<any>(null);

  useEffect(() => {
    // 加载问题数据
    loadIssueData();
    // 加载问题类型配置
    loadIssueType();
  }, [issueId]);

  return (
    <Drawer>
      {/* 解决按钮 */}
      {canResolve(issueData.status, isHandler) && (
        <ResolveDialog
          issueId={issueId}
          requiresApproval={issueType?.requiresApproval}
          onSuccess={handleActionSuccess}
        />
      )}
    </Drawer>
  );
};
```

### 4.3 后端实现（需要后端配合）

**新增接口：**

```csharp
/// <summary>
/// 提交审批
/// </summary>
Task SubmitForApprovalAsync(SubmitIssueForApprovalDto input);

public class SubmitIssueForApprovalDto
{
    public Guid IssueId { get; set; }
    public string Resolution { get; set; }
    public string? Remark { get; set; }
    public List<AttachmentDto>? Attachments { get; set; }
}
```

**审批通过回调：**

```csharp
/// <summary>
/// 审批通过后的回调处理
/// </summary>
public async Task OnApprovalApprovedAsync(Guid issueId)
{
    var issue = await _issueRepository.GetAsync(issueId);

    // 更新问题状态为已解决
    issue.Status = IssueStatus.Resolved;
    issue.ActualResolutionDate = DateTime.Now;

    // 更新执行周期状态
    var cycle = await _cycleRepository.GetCurrentCycleAsync(issueId);
    cycle.Status = IssueStatus.Resolved;

    // 记录执行记录
    await _recordRepository.InsertAsync(new IssueExecutionRecord
    {
        IssueId = issueId,
        CycleNumber = cycle.CycleNumber,
        ActionType = "审批通过",
        OperatorName = CurrentUser.Name,
        OperationTime = DateTime.Now,
    });

    await CurrentUnitOfWork.SaveChangesAsync();
}
```

---

## 五、状态流转和权限控制

### 5.1 完整状态流转图

```
创建问题
    ↓
[打开 Open]
    ↓ 指派处理人（创建人）
[待接收 PendingReceive]
    ↓ 确认接收（处理人）
[已接收 Received]
    ↓ 开始处理（处理人）
[处理中 InProgress]
    ↓
    ├─ 直接解决（处理人）→ [已解决 Resolved]
    ├─ 提交审批（处理人）→ 等待审批 → [已解决 Resolved]
    └─ 重新指派（创建人/处理人）→ [处理中 InProgress] 更换处理人
    ↓
[已解决 Resolved]
    ↓ 关闭（创建人/处理人）
[已关闭 Closed]
    ↓ 激活（创建人）
[打开 Open] (新周期, CycleNumber + 1)
```

### 5.2 操作权限矩阵

| 操作 | 打开 | 待接收 | 已接收 | 处理中 | 已解决 | 已关闭 | 权限要求 |
|-----|-----|-------|-------|-------|-------|-------|---------|
| 指派 | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | 创建人或当前处理人 |
| 确认接收 | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | 指定的处理人 |
| 开始处理 | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | 处理人 |
| 解决/审批 | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | 处理人 |
| 关闭 | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | 创建人或处理人 |
| 激活 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | 创建人 |
| 转任务 | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | 创建人或处理人 |
| 编辑 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 创建人 |
| 删除 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 创建人 |

### 5.3 权限判断工具函数

```typescript
// _utils/permissionUtils.ts

/**
 * 判断是否可以指派
 */
export const canAssign = (status: IssueStatus, isCreator: boolean, isHandler: boolean): boolean => {
  return (status === IssueStatus.Open && isCreator) ||
         (status === IssueStatus.InProgress && (isCreator || isHandler)) ||
         (status === IssueStatus.Resolved && (isCreator || isHandler));
};

/**
 * 判断是否可以确认接收
 */
export const canConfirmReceive = (status: IssueStatus, isHandler: boolean): boolean => {
  return status === IssueStatus.PendingReceive && isHandler;
};

/**
 * 判断是否可以开始处理
 */
export const canStartProcessing = (status: IssueStatus, isHandler: boolean): boolean => {
  return status === IssueStatus.Received && isHandler;
};

/**
 * 判断是否可以解决
 */
export const canResolve = (status: IssueStatus, isHandler: boolean): boolean => {
  return status === IssueStatus.InProgress && isHandler;
};

/**
 * 判断是否可以关闭
 */
export const canClose = (status: IssueStatus, isCreator: boolean, isHandler: boolean): boolean => {
  return status === IssueStatus.Resolved && (isCreator || isHandler);
};

/**
 * 判断是否可以激活
 */
export const canActivate = (status: IssueStatus, isCreator: boolean): boolean => {
  return status === IssueStatus.Closed && isCreator;
};

/**
 * 判断是否可以转任务
 */
export const canConvertToTask = (status: IssueStatus, isCreator: boolean, isHandler: boolean): boolean => {
  return status !== IssueStatus.Closed && (isCreator || isHandler);
};
```

---

## 六、实施计划

### 6.1 后端任务（需要后端开发）

1. ✅ **数据库迁移**
   - 添加问题类型审批配置字段
   - 创建执行周期表
   - 调整执行记录表结构
   - 更新问题状态枚举
   - 添加问题关联任务字段

2. ✅ **接口开发**
   - 所有执行操作接口添加附件和备注参数
   - 新增执行周期相关接口
   - 新增关联任务相关接口
   - 审批流程集成接口

3. ✅ **业务逻辑调整**
   - 指派逻辑：打开状态指派 → 待接收
   - 确认接收逻辑：待接收 → 已接收
   - 开始处理逻辑：已接收 → 处理中
   - 解决逻辑：支持直接解决和提交审批
   - 激活逻辑：创建新执行周期

### 6.2 前端任务（本次开发）

1. ✅ **基础组件开发**
   - 创建 IssueExecutionDialog 执行抽屉
   - 创建 ExecutionCycleTimeline 周期时间线
   - 创建 TaskRelationSelector 任务关联选择器
   - 创建 StartProcessingDialog 开始处理对话框
   - 创建 ActivateDialog 激活对话框

2. ✅ **现有组件改造**
   - AssignDialog 添加附件和备注
   - ConfirmReceiveDialog 添加附件和备注
   - ResolveDialog 添加附件和备注，支持审批
   - CloseDialog 添加附件和备注

3. ✅ **页面改造**
   - 列表页操作列简化
   - 详情页操作区简化，添加关联任务显示
   - 表单页添加关联任务选择

4. ✅ **枚举和工具更新**
   - 更新问题状态枚举
   - 更新权限判断工具函数
   - 更新状态判断工具函数

5. ✅ **测试验证**
   - 完整流程测试
   - 权限控制测试
   - 审批流程测试
   - 多周期执行测试

---

## 七、注意事项

### 7.1 前后端协作

1. **数据结构优先**：后端需要先完成数据库迁移和接口开发，前端才能开始对接
2. **接口文档同步**：后端开发完成后及时更新 OpenAPI 文档，前端运行 `yarn openapi` 生成类型
3. **字段命名一致**：前后端字段名保持一致，避免映射混乱

### 7.2 兼容性考虑

1. **历史数据迁移**：现有问题需要初始化执行周期数据（cycleNumber = 1）
2. **状态枚举映射**：新增状态需要确保数据库枚举值不冲突
3. **现有工作流**：已有的 execute.tsx 审批页不受影响，继续保留

### 7.3 用户体验

1. **加载性能**：执行记录按周期分页加载，避免一次性加载过多数据
2. **操作反馈**：每个操作都要有明确的成功/失败提示
3. **权限提示**：无权限时禁用按钮并显示提示文字

### 7.4 开发服务器

- **强制使用**：开发期间必须运行 `yarn start`，使用 `run_in_background: true`
- **禁止频繁构建**：严禁在开发过程中反复运行 `yarn build`
- **热更新**：代码修改后自动反映，编译错误直接在浏览器显示

---

## 八、验收标准

### 8.1 功能完整性

- [ ] 列表页和详情页都有"执行"按钮，点击弹出抽屉
- [ ] 执行抽屉包含问题信息、执行操作、执行记录三个标签页
- [ ] 所有执行操作都支持上传附件和备注
- [ ] 执行记录按周期分组展示，支持查看附件
- [ ] 问题可以被多次激活，每次激活创建新周期
- [ ] 需要审批的问题显示"提交审批"按钮
- [ ] 问题详情和表单支持关联任务

### 8.2 状态流转正确

- [ ] 打开 → 指派 → 待接收
- [ ] 待接收 → 确认接收 → 已接收
- [ ] 已接收 → 开始处理 → 处理中
- [ ] 处理中 → 解决/审批 → 已解决
- [ ] 已解决 → 关闭 → 已关闭
- [ ] 已关闭 → 激活 → 打开（新周期）

### 8.3 权限控制正确

- [ ] 只有创建人可以激活已关闭的问题
- [ ] 只有处理人可以确认接收、开始处理、解决问题
- [ ] 创建人和处理人都可以关闭已解决的问题
- [ ] 处理中状态可以重新指派，状态保持处理中

### 8.4 用户体验良好

- [ ] 操作成功后有明确提示
- [ ] 抽屉数据实时刷新
- [ ] 附件可以预览和下载
- [ ] 无权限的按钮禁用并显示提示
- [ ] 移动端适配良好

---

## 九、相关文档

- 项目开发规范：`CLAUDE.md`
- 工作流页面开发：`.claude/skills/workflow-page-builder/SKILL.md`
- 动态表单使用：`src/dynamicSchemas/README.md`
- 任务执行参考：`src/pages/appPdm/ProjectManagement/TaskList/components/TaskExecutionDialog.tsx`

---

**文档结束**
